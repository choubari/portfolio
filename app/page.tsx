import { Navbar } from "@/components/navbar";
import { About } from "@/components/about";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#191c20] text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Navbar />
        <div className="mt-16">
          <section id="about">
            <About />
          </section>
        </div>
      </div>
    </main>
  );
}
