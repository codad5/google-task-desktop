import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaStar, FaWindows, FaApple, FaLinux } from 'react-icons/fa';

// Fetch GitHub stats at build time (SSR)
async function getGitHubStats() {
  try {
    const res = await fetch('https://api.github.com/repos/codad5/google-task-desktop', {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    if (!res.ok) return { stars: 0, forks: 0 };
    const data = await res.json();
    return {
      stars: data.stargazers_count || 0,
      forks: data.forks_count || 0,
    };
  } catch {
    return { stars: 0, forks: 0 };
  }
}

// Fetch latest release version from GitHub
async function getLatestVersion() {
  try {
    const res = await fetch('https://api.github.com/repos/codad5/google-task-desktop/releases/latest', {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    if (!res.ok) return 'latest';
    const data = await res.json();
    return data.tag_name || data.name || 'latest';
  } catch {
    return 'latest';
  }
}

export default async function Hero() {
  const [githubStats, latestVersion] = await Promise.all([
    getGitHubStats(),
    getLatestVersion(),
  ]);

  return (
    <section className="relative flex flex-col items-center justify-center px-6 py-20">
      {/* Background gradient blob */}
      <div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(102, 126, 234, 0.15), transparent)',
        }}
      />

      {/* Content */}
      <div className="relative flex flex-col items-center gap-8 max-w-4xl">
        {/* Unofficial Notice */}
        <div className="px-4 py-2 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
          <p className="text-xs text-yellow-400 text-center">
            ⚠️ Unofficial app • Not affiliated with or endorsed by Google
          </p>
        </div>

        {/* GitHub Badge */}
        <Link 
          href="https://github.com/codad5/google-task-desktop"
          target="_blank"
          className="badge hover:border-[var(--color-accent)] transition-colors"
        >
          <FaGithub className="text-lg" />
          <span>Open Source</span>
          <span className="flex items-center gap-1 text-yellow-400">
            <FaStar />
            {githubStats.stars}
          </span>
        </Link>

        {/* Logo */}
        <div className="animate-float">
          <Image
            src="/google-task.png"
            alt="Google Tasks Desktop"
            width={120}
            height={120}
            className="drop-shadow-2xl"
          />
        </div>

        {/* Title */}
        <div className="flex flex-col items-center gap-4 text-center px-4">
          <h1 className="text-4xl font-bold gradient-text sm:text-5xl md:text-6xl">
            Google Tasks Desktop
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl sm:text-xl">
            A beautiful, lightweight desktop client for Google Tasks. 
            Built with Tauri, React, and Rust for blazing fast performance.
          </p>
        </div>

        {/* Download Buttons */}
        <div className="flex flex-col items-center gap-4 w-full sm:flex-row sm:justify-center">
          <Link 
            href="https://github.com/codad5/google-task-desktop/releases/latest"
            className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            Download {latestVersion}
            <span className="flex items-center gap-1">
              <FaWindows className="text-sm" />
              <FaApple className="text-sm" />
              <FaLinux className="text-sm" />
            </span>
          </Link>
          
          <Link 
            href="https://github.com/codad5/google-task-desktop"
            target="_blank"
            className="btn-secondary flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <FaGithub />
            View on GitHub
          </Link>
        </div>

        {/* Version badge */}
        <p className="text-sm text-[var(--color-text-muted)] text-center">
          {latestVersion !== 'latest' ? latestVersion : ''} • Available for Windows, macOS, and Linux
        </p>
      </div>
    </section>
  );
}