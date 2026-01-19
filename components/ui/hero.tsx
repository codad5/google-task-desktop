import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaStar, FaWindows, FaApple, FaLinux } from 'react-icons/fa';
import { getLatestVersionDataFOrThisPlatform } from '@/libs/helper';

// Fetch GitHub stars at build time (SSR)
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

export default async function Hero() {
  const [platformData, githubStats] = await Promise.all([
    getLatestVersionDataFOrThisPlatform(),
    getGitHubStats(),
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
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-5xl font-bold gradient-text md:text-6xl">
            Google Tasks Desktop
          </h1>
          <p className="text-xl text-[var(--color-text-secondary)] max-w-2xl">
            A beautiful, lightweight desktop client for Google Tasks. 
            Built with Tauri, React, and Rust for blazing fast performance.
          </p>
        </div>

        {/* Download Buttons */}
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          {platformData?.url ? (
            <Link href={platformData.url} className="btn-primary flex items-center gap-2">
              Download {platformData.version}
              {platformData.platform === 'windows' && <FaWindows />}
              {platformData.platform === 'mac' && <FaApple />}
              {platformData.platform === 'linux' && <FaLinux />}
            </Link>
          ) : (
            <Link 
              href="https://github.com/codad5/google-task-desktop/releases"
              className="btn-primary flex items-center gap-2"
            >
              Download Latest
            </Link>
          )}
          
          <Link 
            href="https://github.com/codad5/google-task-desktop"
            target="_blank"
            className="btn-secondary flex items-center gap-2"
          >
            <FaGithub />
            View on GitHub
          </Link>
        </div>

        {/* Version badge */}
        <p className="text-sm text-[var(--color-text-muted)]">
          v1.0.0 • Available for Windows, macOS, and Linux
        </p>
      </div>
    </section>
  );
}