import Link from "next/link";
import { ProjectNav } from "@/app/components/project-nav";
import { sectionX } from "@/lib/site-layout";

export default function ProjectNotFound() {
  return (
    <div className="relative flex min-h-full flex-col bg-[#fffdf8]">
      <ProjectNav />
      <main className={`flex flex-1 flex-col items-center justify-center py-32 text-center ${sectionX}`}>
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#8b7355]">
          Not found
        </p>
        <h1 className="mt-4 font-serif text-3xl font-medium text-[#2a2622]">Project not found</h1>
        <Link
          href="/#work"
          className="mt-8 text-sm font-medium uppercase tracking-[0.2em] text-[#6f6760] transition-colors hover:text-[#2a2622]"
        >
          ← Back to work
        </Link>
      </main>
    </div>
  );
}
