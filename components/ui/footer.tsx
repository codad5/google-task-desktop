import Link from 'next/link';
import { FaGithub, FaTwitter, FaHeart } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex flex-col items-center px-6 py-12 border-t border-[var(--color-border)]">
      <div className="flex flex-col items-center gap-8 max-w-4xl w-full">
        {/* Links Row */}
        <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-[var(--color-text-secondary)]">
          <Link 
            href="https://github.com/codad5/google-task-desktop"
            target="_blank"
            className="flex items-center gap-2 hover:text-[var(--color-text-primary)] transition-colors"
          >
            <FaGithub />
            GitHub
          </Link>
          <Link 
            href="https://github.com/codad5/google-task-desktop/releases"
            target="_blank"
            className="hover:text-[var(--color-text-primary)] transition-colors"
          >
            Releases
          </Link>
          <Link 
            href="https://github.com/codad5/google-task-desktop/blob/main/LICENSE"
            target="_blank"
            className="hover:text-[var(--color-text-primary)] transition-colors"
          >
            GPL-3.0 License
          </Link>
          <Link 
            href="https://github.com/codad5/google-task-desktop/blob/main/CONTRIBUTING.md"
            target="_blank"
            className="hover:text-[var(--color-text-primary)] transition-colors"
          >
            Contributing
          </Link>
        </div>

        {/* Author */}
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-sm text-[var(--color-text-muted)]">
            Made with <FaHeart className="inline text-red-500" /> by{' '}
            <Link 
              href="https://codad5.me"
              target="_blank"
              className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
            >
              Codad5
            </Link>
          </p>
          <p className="text-xs text-[var(--color-text-muted)]">
            © {currentYear} Google Tasks Desktop. Not affiliated with Google.
          </p>
        </div>

        {/* Social */}
        <div className="flex items-center gap-4">
          <Link 
            href="https://github.com/codad5"
            target="_blank"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-bg-card)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors"
          >
            <FaGithub className="text-lg" />
          </Link>
          <Link 
            href="https://twitter.com/codaborealise"
            target="_blank"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-bg-card)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors"
          >
            <FaTwitter className="text-lg" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
