import { Calendar, Clock, Mic, FileText, Code, LinkIcon } from "lucide-react"
import Link from "next/link"

type Talk = {
  id: string
  year: number
  type: string
  duration: string
  conference: string
  location: string
  date: string
  title: string
  links: {
    slides?: string
    code?: string
    demo?: string
  }
}

const talks: Talk[] = [
  {
    id: "1",
    year: 2024,
    type: "Conference",
    duration: "30min",
    conference: "React Africa",
    location: "🇲🇦 Casablanca",
    date: "November 29, 2024",
    title: "Server Components, What's that?",
    links: {
      slides: "#",
      code: "#",
      demo: "#",
    },
  },
  {
    id: "2",
    year: 2024,
    type: "Workshop",
    duration: "2h",
    conference: "Next.js Conf",
    location: "🇺🇸 San Francisco",
    date: "October 15, 2024",
    title: "Building with the App Router",
    links: {
      slides: "#",
      code: "#",
    },
  },
  {
    id: "3",
    year: 2023,
    type: "Meetup",
    duration: "45min",
    conference: "React Meetup",
    location: "🇬🇧 London",
    date: "December 12, 2023",
    title: "State Management in 2023",
    links: {
      slides: "#",
      demo: "#",
    },
  },
  {
    id: "4",
    year: 2023,
    type: "Podcast",
    duration: "1h",
    conference: "JS Party",
    location: "🎙️ Remote",
    date: "August 5, 2023",
    title: "The Future of Frontend Development",
    links: {
      demo: "#",
    },
  },
]

export function Talks() {
  // Group talks by year
  const talksByYear = talks.reduce(
    (acc, talk) => {
      if (!acc[talk.year]) {
        acc[talk.year] = []
      }
      acc[talk.year].push(talk)
      return acc
    },
    {} as Record<number, Talk[]>,
  )

  // Sort years in descending order
  const sortedYears = Object.keys(talksByYear)
    .map(Number)
    .sort((a, b) => b - a)

  return (
    <div className="space-y-12">
      <h2 className="text-4xl font-bold">Talks</h2>

      <div className="space-y-16">
        {sortedYears.map((year) => (
          <div key={year} className="space-y-6">
            <h3 className="text-3xl font-bold text-teal-400">{year}</h3>

            <div className="grid gap-6">
              {talksByYear[year].map((talk) => (
                <div
                  key={talk.id}
                  className="border border-gray-700 rounded-lg p-5 hover:border-teal-400/50 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-gray-300">
                        <div className="inline-flex items-center rounded-full bg-teal-400/20 px-3 py-1 text-sm text-teal-400">
                          <Clock className="mr-1 h-3 w-3" />
                          {talk.duration}
                        </div>
                        <div className="text-sm">{talk.type}</div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 text-xl font-semibold">
                          <span className="underline underline-offset-4">{talk.conference}</span>
                          <span>{talk.location}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-400 mt-1">
                          <Calendar className="h-4 w-4" />
                          <span>{talk.date}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xl font-medium">
                        <Mic className="h-5 w-5 text-teal-400" />
                        <span>{talk.title}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 mt-4">
                    {talk.links.slides && (
                      <Link
                        href={talk.links.slides}
                        className="flex items-center gap-1 text-gray-300 hover:text-teal-400 transition-colors"
                      >
                        <FileText className="h-4 w-4" />
                        <span>Slides</span>
                      </Link>
                    )}

                    {talk.links.code && (
                      <Link
                        href={talk.links.code}
                        className="flex items-center gap-1 text-gray-300 hover:text-teal-400 transition-colors"
                      >
                        <Code className="h-4 w-4" />
                        <span>Code</span>
                      </Link>
                    )}

                    {talk.links.demo && (
                      <Link
                        href={talk.links.demo}
                        className="flex items-center gap-1 text-gray-300 hover:text-teal-400 transition-colors"
                      >
                        <LinkIcon className="h-4 w-4" />
                        <span>Demo</span>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
