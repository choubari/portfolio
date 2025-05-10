"use client";

import {
  TESTIMONIAL_CATEGORY,
  TESTIMONIAL_SOURCE,
  AdminTestimonialFormData,
} from "@/types/testimonial";
import {
  useState,
  ChangeEvent,
  FormEvent,
  DragEvent,
  useEffect,
  useRef,
} from "react";
import { toast } from "sonner";

const initialFormData: AdminTestimonialFormData = {
  name: "",
  position: "",
  company: "",
  source: "",
  date: new Date().toISOString().split("T")[0],
  link: "",
  categories: [],
  message: "",
  status: "draft",
};

export default function TestimonialForm() {
  const [formData, setFormData] =
    useState<AdminTestimonialFormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [isOcrProcessing, setIsOcrProcessing] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [screenshotPreviewUrl, setScreenshotPreviewUrl] = useState<
    string | null
  >(null);
  const dropZoneRef = useRef<HTMLLabelElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const categoryKey = value as keyof typeof TESTIMONIAL_CATEGORY;
    setFormData((prev) => ({
      ...prev,
      categories: checked
        ? [...prev.categories, categoryKey]
        : prev.categories.filter((cat) => cat !== categoryKey),
    }));
  };

  const clearScreenshot = () => {
    if (screenshotPreviewUrl) {
      URL.revokeObjectURL(screenshotPreviewUrl);
    }
    setScreenshotPreviewUrl(null);
    setFormData((prev) => ({ ...prev, screenshot: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const processFile = (file: File | null) => {
    if (screenshotPreviewUrl && (file || file === null)) {
      URL.revokeObjectURL(screenshotPreviewUrl);
      setScreenshotPreviewUrl(null);
    }

    if (file && file.type.startsWith("image/")) {
      setFormData((prev) => ({ ...prev, screenshot: file }));
      const previewUrl = URL.createObjectURL(file);
      setScreenshotPreviewUrl(previewUrl);
      toast.success(`Image selected: ${file.name}`);
    } else if (file) {
      toast.error("Invalid file type. Please upload an image.");
      setFormData((prev) => ({ ...prev, screenshot: null }));
    } else {
      setFormData((prev) => ({ ...prev, screenshot: null }));
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    processFile(e.target.files && e.target.files[0] ? e.target.files[0] : null);
  };

  const handleDragEnter = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (
      dropZoneRef.current &&
      !dropZoneRef.current.contains(e.relatedTarget as Node)
    ) {
      setIsDraggingOver(false);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(true);
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      if (e.dataTransfer.files.length > 1) {
        toast.error("Please drop only one file.");
        processFile(null);
      } else {
        processFile(e.dataTransfer.files[0]);
      }
      e.dataTransfer.clearData();
    }
  };

  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      const activeElement = document.activeElement;
      const isDropZoneTargeted =
        dropZoneRef.current && dropZoneRef.current.contains(activeElement);
      const isInputFocused =
        activeElement instanceof HTMLInputElement ||
        activeElement instanceof HTMLTextAreaElement;

      if (isDropZoneTargeted || !isInputFocused) {
        const items = event.clipboardData?.items;
        if (items) {
          for (let i = 0; i < items.length; i++) {
            if (items[i].type.startsWith("image/")) {
              const file = items[i].getAsFile();
              if (file) {
                event.preventDefault();
                processFile(file);
                return;
              }
            }
          }
        }
      }
    };

    document.addEventListener("paste", handlePaste);
    return () => {
      document.removeEventListener("paste", handlePaste);
    };
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const submissionFormData = new FormData();
    submissionFormData.append("name", formData.name);
    submissionFormData.append("position", formData.position);
    submissionFormData.append("company", formData.company);
    if (
      formData.source &&
      TESTIMONIAL_SOURCE[formData.source as keyof typeof TESTIMONIAL_SOURCE]
    ) {
      submissionFormData.append(
        "source",
        TESTIMONIAL_SOURCE[formData.source as keyof typeof TESTIMONIAL_SOURCE]
      );
    } else {
      submissionFormData.append("source", "");
    }
    submissionFormData.append("date", formData.date);
    submissionFormData.append("link", formData.link);
    submissionFormData.append("message", formData.message);
    submissionFormData.append("status", formData.status);

    formData.categories.forEach((category) =>
      submissionFormData.append("categories", category)
    );

    try {
      const response = await fetch("/api/admin/testimonials", {
        method: "POST",
        body: submissionFormData,
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message || "Testimonial submitted successfully!");
        setFormData(initialFormData);
        clearScreenshot();
      } else {
        let errorMessage = "Failed to submit testimonial.";
        if (result.error && result.error.message) {
          errorMessage = result.error.message;
          if (
            result.error.details &&
            result.error.details.errors &&
            result.error.details.errors.length > 0
          ) {
            const specificErrors = result.error.details.errors
              .map((err: any) => `${err.path.join(".")}: ${err.message}`)
              .join("; ");
            errorMessage += ` Details: ${specificErrors}`;
          }
        } else if (result.message) {
          errorMessage = result.message;
        }
        toast.error(errorMessage, { duration: 8000 });
        console.error("Submission error details:", result);
      }
    } catch (error) {
      console.error("Network or other error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyles =
    "mt-1 block w-full px-3 py-2 bg-transparent border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] sm:text-sm text-white disabled:opacity-70 disabled:cursor-not-allowed";
  const labelStyles = "block text-sm font-medium text-gray-300";

  const dropZoneClasses = `mt-1 flex flex-col justify-center items-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md h-64 text-center cursor-pointer relative ${
    isDraggingOver
      ? "border-[var(--color-accent)] bg-[var(--color-accent)] bg-opacity-10"
      : "border-gray-600 hover:border-[var(--color-accent)]"
  }`;

  useEffect(() => {
    return () => {
      if (screenshotPreviewUrl) {
        URL.revokeObjectURL(screenshotPreviewUrl);
      }
    };
  }, [screenshotPreviewUrl]);

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-2xl mx-auto bg-[var(--color-background)] p-6 sm:p-8 rounded-lg shadow-xl"
    >
      <div>
        <label className={`${labelStyles} mb-1`}>
          Upload Screenshot (Optional)
        </label>
        <label
          htmlFor="screenshot"
          ref={dropZoneRef}
          className={dropZoneClasses}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          tabIndex={0}
        >
          <input
            type="file"
            name="screenshot"
            id="screenshot"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="sr-only"
            accept="image/*"
            disabled={isLoading}
          />
          {screenshotPreviewUrl ? (
            <div className="relative w-full h-full flex justify-center items-center p-2">
              <img
                src={screenshotPreviewUrl}
                alt="Screenshot Preview"
                className="max-h-full max-w-full object-contain rounded-md shadow-md"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  clearScreenshot();
                }}
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition-colors z-10 shadow-lg"
                aria-label="Remove screenshot"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <span className="font-medium text-[var(--color-accent)] hover:text-opacity-80">
                Click to upload or drag and drop
              </span>
              <p className="text-xs text-gray-400 mt-1">
                PNG, JPG, GIF up to 10MB. Or paste image.
              </p>
            </div>
          )}
        </label>
      </div>

      <hr className="border-gray-700" />

      <div>
        <label htmlFor="name" className={labelStyles}>
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          className={inputStyles}
          required
          disabled={isLoading || isOcrProcessing}
        />
      </div>

      <div>
        <label htmlFor="position" className={labelStyles}>
          Position
        </label>
        <input
          type="text"
          name="position"
          id="position"
          value={formData.position}
          onChange={handleChange}
          className={inputStyles}
          disabled={isLoading || isOcrProcessing}
        />
      </div>

      <div>
        <label htmlFor="company" className={labelStyles}>
          Company
        </label>
        <input
          type="text"
          name="company"
          id="company"
          value={formData.company}
          onChange={handleChange}
          className={inputStyles}
          disabled={isLoading || isOcrProcessing}
        />
      </div>

      <div>
        <label htmlFor="source" className={labelStyles}>
          Source <span className="text-red-500">*</span>
        </label>
        <select
          name="source"
          id="source"
          value={formData.source}
          onChange={handleChange}
          className={inputStyles}
          required
          disabled={isLoading || isOcrProcessing}
        >
          <option value="" disabled>
            Select a source
          </option>
          {Object.entries(TESTIMONIAL_SOURCE).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="date" className={labelStyles}>
          Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          name="date"
          id="date"
          value={formData.date}
          onChange={handleChange}
          className={inputStyles}
          required
          disabled={isLoading || isOcrProcessing}
        />
      </div>

      <div>
        <label htmlFor="link" className={labelStyles}>
          Link (URL)
        </label>
        <input
          type="url"
          name="link"
          id="link"
          value={formData.link}
          onChange={handleChange}
          className={inputStyles}
          placeholder="https://example.com"
          disabled={isLoading || isOcrProcessing}
        />
      </div>

      <div>
        <label htmlFor="message" className={labelStyles}>
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          name="message"
          id="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className={inputStyles}
          required
          disabled={isLoading || isOcrProcessing}
        />
      </div>

      <div>
        <label className={labelStyles}>
          Categories <span className="text-red-500">*</span>
        </label>
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {Object.entries(TESTIMONIAL_CATEGORY).map(([key, value]) => (
            <label
              key={key}
              className="flex items-center space-x-2 text-gray-300 hover:text-white cursor-pointer"
            >
              <input
                type="checkbox"
                name="categories"
                value={key}
                checked={formData.categories.includes(
                  key as keyof typeof TESTIMONIAL_CATEGORY
                )}
                onChange={handleCategoryChange}
                className="form-checkbox h-4 w-4 text-[var(--color-accent)] bg-gray-700 border-gray-600 rounded focus:ring-[var(--color-accent)] focus:ring-offset-gray-800"
                disabled={isLoading}
              />
              <span>{value}</span>
            </label>
          ))}
        </div>
        {formData.categories.length === 0 && (
          <p className="text-xs text-red-500 mt-1"></p>
        )}
      </div>

      <div>
        <label className={labelStyles}>Status</label>
        <div className="mt-2 flex space-x-4">
          <label className="flex items-center space-x-2 text-gray-300 hover:text-white cursor-pointer">
            <input
              type="radio"
              name="status"
              value="draft"
              checked={formData.status === "draft"}
              onChange={handleChange}
              className="form-radio h-4 w-4 text-[var(--color-accent)] bg-gray-700 border-gray-600 focus:ring-[var(--color-accent)] focus:ring-offset-gray-800"
              disabled={isLoading}
            />
            <span>Draft</span>
          </label>
          <label className="flex items-center space-x-2 text-gray-300 hover:text-white cursor-pointer">
            <input
              type="radio"
              name="status"
              value="published"
              checked={formData.status === "published"}
              onChange={handleChange}
              className="form-radio h-4 w-4 text-[var(--color-accent)] bg-gray-700 border-gray-600 focus:ring-[var(--color-accent)] focus:ring-offset-gray-800"
              disabled={isLoading}
            />
            <span>Publish</span>
          </label>
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading || formData.categories.length === 0}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-[var(--color-accent)] hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-accent)] focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Submitting..." : "Submit Testimonial"}
        </button>
      </div>
    </form>
  );
}
