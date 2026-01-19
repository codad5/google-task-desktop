import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaStar } from 'react-icons/fa';

// Fetch GitHub stars at build time
async function getGitHubStars() {
  try {
    const res = await fetch('https://api.github.com/repos/codad5/google-task-desktop', {
      next: { revalidate: 3600 }
    });
    if (!res.ok) return 0;
    const data = await res.json();
    return data.stargazers_count || 0;
  } catch {
    return 0;
  }
}

export default async function Header() {
  const stars = await getGitHubStars();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[var(--color-bg-primary)]/80 backdrop-blur-md border-b border-[var(--color-border)]">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3">
        <Image
          src="/google-task.png"
          alt="Google Tasks"
          width={32}
          height={32}
        />
        <span className="font-bold text-lg hidden sm:block">Google Tasks</span>
      </Link>

      {/* Navigation */}
      <nav className="flex items-center gap-6">
        <Link 
          href="https://github.com/codad5/google-task-desktop/releases"
          target="_blank"
          className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors hidden sm:block"
        >
          Releases
        </Link>
        <Link 
          href="https://github.com/codad5/google-task-desktop"
          target="_blank"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors"
        >
          <FaGithub />
          <span className="hidden sm:block">GitHub</span>
          {stars > 0 && (
            <span className="flex items-center gap-1 text-yellow-400 text-sm">
              <FaStar className="text-xs" />
              {stars}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
}