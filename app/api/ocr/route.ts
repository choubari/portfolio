import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL;
const GITHUB_ADMIN_USERNAME = process.env.GITHUB_ADMIN_USERNAME;

export async function POST(req: NextRequest) {
  // Check authentication
  const session = await getServerSession(authOptions);

  // Only allow the admin to publish testimonials
  if (!session || (session.user as any)?.login !== GITHUB_ADMIN_USERNAME) {
    return NextResponse.redirect(
      new URL(`${BASE_URL}/testimonials?error=unauthorized`)
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get("screenshot") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No image file uploaded" },
        { status: 400 }
      );
    }

    // Convert the file to a Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Convert to base64
    const base64Image = buffer.toString("base64");

    // Prepare prompt for Gemini
    const prompt = `
    You are an OCR and information extraction assistant specialized in testimonials. 
    Analyze this screenshot of a testimonial or recommendation and classify it in a JSON object with these fields:
    
    - name (mandatory): The full name of the person giving the testimonial
    - message (mandatory): The full testimonial message content
    - position: Their job title or position (if available)
    - company: Their company or organization (if available)
    - source (mandatory): The social media platform you think this image is from, pick ONE from this list, return the TESTIMONIAL_SOURCE key:
    
    export enum TESTIMONIAL_SOURCE {
      LINKEDIN = "LinkedIn",
      TWITTER_X = "X",
      EMAIL = "Email",
      YOUTUBE = "YouTube",
      INSTAGRAM = "Instagram",
      FACEBOOK = "Facebook",
      WHATSAPP = "Whatsapp",
      OTHER = "Other",
    }
    
     - date: Any date mentioned in YYYY-MM-DD format. If there's a date in another format or there's just a month and year, use the first day of the month. If there's just a year, use January 1st of that year.
    
    - categories (mandatory): Classification of the testimonial, pick 1-3 categories that best match the content, return the KEYS of the TESTIMONIAL_CATEGORY in an array:
    
    export enum TESTIMONIAL_CATEGORY {
      WORK = "Work & Expertise", // Professional skills, technical abilities, work quality, or industry knowledge
      LEADERSHIP = "Leadership & Soft Skills", // Communication, management, teamwork, or interpersonal abilities
      GROWTH = "Growth & Learning", // Improvement, adaptation, learning ability, or professional development
      COMMUNITY = "Community & Volunteering", // Community involvement, volunteering, helping others, mentorship
      DESIGN = "Design & Creativity", // Design skills, creative thinking, artistic abilities, or innovative ideas
    }
    
    Output the information in a clean JSON format. If any field is not present in the image, use null for that field except mandatory fields.
    For source, default to "OTHER" if unclear.
    For categories, default to ["WORK"] if unclear.
    
    Example output:
    {
      "name": "John Smith",
      "position": "Senior Developer",
      "company": "Tech Company",
      "message": "Great work on the project. Very professional and delivered on time.",
      "source": "LINKEDIN",
      "date": "2023-05-15",
      "categories": ["WORK", "LEADERSHIP"]
    }
    `;

    // Process with Gemini
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: file.type,
                data: base64Image,
              },
            },
          ],
        },
      ],
    });

    const response = result.response;
    const text = response.text();

    // Extract the JSON part of the response
    let jsonData;
    try {
      // Find JSON content between curly braces
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        jsonData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No valid JSON found in response");
      }
    } catch (error) {
      console.error("Failed to parse JSON response:", error);
      return NextResponse.json(
        { error: "Failed to parse extracted data" },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: jsonData });
  } catch (error) {
    console.error("OCR processing error:", error);
    return NextResponse.json(
      { error: "Failed to process image" },
      { status: 500 }
    );
  }
}
