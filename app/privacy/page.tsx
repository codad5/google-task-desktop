export default function PrivacyPage() {
  return (
    <main className="flex flex-col items-center px-6 py-20 pt-24">
      <div className="flex flex-col gap-8 max-w-3xl w-full">
        <h1 className="text-3xl font-bold gradient-text">Privacy Policy</h1>
        
        <div className="flex flex-col gap-6 text-[var(--color-text-secondary)]">
          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">Overview</h2>
            <p>
              Google Tasks Desktop ("the App") is designed with privacy in mind. 
              This policy explains how your data is handled.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">Data Collection</h2>
            <p>
              <strong>We do NOT collect any data.</strong> The App runs entirely on your local machine.
            </p>
            <ul className="flex flex-col gap-2 list-disc list-inside">
              <li>No analytics or tracking</li>
              <li>No user data sent to our servers</li>
              <li>No third-party services except Google Tasks API</li>
            </ul>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">Google Tasks API</h2>
            <p>
              The App uses the Google Tasks API to:
            </p>
            <ul className="flex flex-col gap-2 list-disc list-inside">
              <li>Read your task lists and tasks</li>
              <li>Create, update, and delete tasks</li>
              <li>Sync changes with your Google account</li>
            </ul>
            <p>
              Your Google credentials are handled securely through Google's OAuth 2.0 system. 
              The App never sees or stores your Google password.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">Local Storage</h2>
            <p>
              The App stores the following data locally on your computer:
            </p>
            <ul className="flex flex-col gap-2 list-disc list-inside">
              <li>OAuth access tokens (to stay logged in)</li>
              <li>App settings (notification preferences)</li>
              <li>Starred task IDs (local-only feature)</li>
            </ul>
            <p>
              This data never leaves your device.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">Open Source</h2>
            <p>
              The App is fully open source. You can audit the code yourself at:{' '}
              <a 
                href="https://github.com/codad5/google-task-desktop" 
                target="_blank"
                className="text-[var(--color-accent)] hover:underline"
              >
                github.com/codad5/google-task-desktop
              </a>
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">Contact</h2>
            <p>
              For privacy concerns, contact the developer at:{' '}
              <a 
                href="https://codad5.me" 
                target="_blank"
                className="text-[var(--color-accent)] hover:underline"
              >
                codad5.me
              </a>
            </p>
          </section>

          <p className="text-sm text-[var(--color-text-muted)]">
            Last updated: January 2026
          </p>
        </div>
      </div>
    </main>
  );
}
