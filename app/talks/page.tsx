import { Navbar } from "@/components/navbar"
import { Talks } from "@/components/talks"

export default function TalksPage() {
  return (
    <main className="min-h-screen bg-[#191c20] text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Navbar />
        <div className="mt-16">
          <section id="talks">
            <Talks />
          </section>
        </div>
      </div>
    </main>
  )
} 