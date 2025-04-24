import { Mail, Github, Twitter, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Contact() {
  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-bold">Contact</h2>

      <p className="text-xl leading-relaxed max-w-2xl">
        Feel free to reach out if you&apos;re interested in having me speak at your event, collaborate on a project, or
        just want to chat about tech.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button className="bg-teal-400 hover:bg-teal-500 text-black rounded-md flex items-center gap-2 px-6">
          <Mail className="h-5 w-5" />
          <span>Email Me</span>
        </Button>

        <div className="flex gap-3">
          <Button
            variant="outline"
            size="icon"
            className="rounded-md border-gray-700 hover:border-teal-400 hover:text-teal-400"
          >
            <Github className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-md border-gray-700 hover:border-teal-400 hover:text-teal-400"
          >
            <Twitter className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-md border-gray-700 hover:border-teal-400 hover:text-teal-400"
          >
            <Linkedin className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
