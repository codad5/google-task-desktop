import { SiTauri, SiReact, SiRust, SiTypescript } from 'react-icons/si';

const techStack = [
  { icon: SiTauri, name: 'Tauri', description: 'Native desktop framework' },
  { icon: SiReact, name: 'React', description: 'UI library' },
  { icon: SiRust, name: 'Rust', description: 'Backend language' },
  { icon: SiTypescript, name: 'TypeScript', description: 'Type-safe JavaScript' },
];

export default function TechStack() {
  return (
    <section className="flex flex-col items-center px-6 py-20 bg-[var(--color-bg-secondary)]">
      <div className="flex flex-col items-center gap-12 max-w-4xl w-full">
        {/* Section Header */}
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Built with Modern Tech
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)]">
            Leveraging the best tools for performance, reliability, and developer experience.
          </p>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-2 gap-6 w-full sm:grid-cols-4">
          {techStack.map((tech) => (
            <div 
              key={tech.name} 
              className="flex flex-col items-center gap-3 p-6 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors"
            >
              <tech.icon className="text-4xl text-[var(--color-accent)]" />
              <span className="font-semibold">{tech.name}</span>
              <span className="text-xs text-[var(--color-text-muted)] text-center">
                {tech.description}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
