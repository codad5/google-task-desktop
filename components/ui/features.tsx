import { 
  FaStar, 
  FaEdit, 
  FaBell, 
  FaListUl,
  FaGripVertical,
  FaCheckSquare,
  FaCog,
  FaGoogle
} from 'react-icons/fa';

const features = [
  {
    icon: FaGoogle,
    title: 'Google Sync',
    description: 'Full synchronization with your Google Tasks account. Your tasks stay in sync across all devices.',
  },
  {
    icon: FaStar,
    title: 'Starred Tasks',
    description: 'Star important tasks for quick access. View all starred tasks in a dedicated section.',
  },
  {
    icon: FaEdit,
    title: 'Inline Editing',
    description: 'Click any task to edit it in place. Change title, notes, and due dates without opening dialogs.',
  },
  {
    icon: FaGripVertical,
    title: 'Drag & Drop',
    description: 'Reorder tasks effortlessly by dragging them. Organize your workflow your way.',
  },
  {
    icon: FaBell,
    title: 'Notifications',
    description: 'Get desktop notifications on due dates. Configurable reminder time in settings.',
  },
  {
    icon: FaListUl,
    title: 'Multiple Lists',
    description: 'Organize tasks into multiple lists. Create, rename, and manage lists easily.',
  },
  {
    icon: FaCheckSquare,
    title: 'Subtasks',
    description: 'Break down large tasks into subtasks. Keep track of progress on complex projects.',
  },
  {
    icon: FaCog,
    title: 'Customizable',
    description: 'Configure notification times, toggle list visibility, and personalize your experience.',
  },
];

export default function Features() {
  return (
    <section className="flex flex-col items-center px-6 py-20">
      <div className="flex flex-col items-center gap-12 max-w-6xl w-full">
        {/* Section Header */}
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Everything you need
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl">
            A full-featured Google Tasks client with productivity features you'll love.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-6 w-full sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="feature-card flex flex-col gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[var(--color-accent)]/10">
                <feature.icon className="text-xl text-[var(--color-accent)]" />
              </div>
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
