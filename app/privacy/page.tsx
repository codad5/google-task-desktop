import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy - Google Tasks Desktop',
  description: 'Privacy Policy for Google Tasks Desktop application',
};

export default function PrivacyPage() {
  return (
    <main className="flex flex-col items-center px-6 py-20 pt-24">
      <div className="flex flex-col gap-8 max-w-3xl w-full">
        <h1 className="text-3xl font-bold gradient-text">Privacy Policy</h1>
        <p className="text-sm text-[var(--color-text-muted)]">Last updated: January 19, 2026</p>
        
        <div className="flex flex-col gap-8 text-[var(--color-text-secondary)] leading-relaxed">
          
          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">Introduction</h2>
            <p>
              Google Tasks Desktop ("the Application") is committed to protecting your privacy. 
              This Privacy Policy explains how we handle information when you use our Application.
            </p>
            <p>
              <strong>TL;DR:</strong> We don't collect, store, or transmit any of your personal data. 
              The Application runs entirely on your local machine.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">Information We Do NOT Collect</h2>
            <p>The Application does NOT:</p>
            <ul className="flex flex-col gap-2 list-disc list-inside">
              <li>Collect any personal information</li>
              <li>Track your usage or behavior</li>
              <li>Use analytics or tracking services</li>
              <li>Send any data to our servers (we don't have any servers)</li>
              <li>Store your Google password or credentials</li>
              <li>Access any Google data beyond Google Tasks</li>
            </ul>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">Google Tasks API Access</h2>
            <p>
              The Application uses the Google Tasks API to provide its core functionality. 
              When you authorize the Application, you grant it permission to:
            </p>
            <ul className="flex flex-col gap-2 list-disc list-inside">
              <li>View and manage your tasks</li>
              <li>View and manage your task lists</li>
            </ul>
            <p>
              <strong>Important:</strong> The Application only accesses Google Tasks data. It cannot 
              access your emails, calendar, drive, or any other Google services.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">OAuth Authentication</h2>
            <p>
              The Application uses Google's OAuth 2.0 protocol for secure authentication. This means:
            </p>
            <ul className="flex flex-col gap-2 list-disc list-inside">
              <li>You sign in directly with Google - we never see your password</li>
              <li>You can revoke access at any time through your{' '}
                <Link href="https://myaccount.google.com/permissions" target="_blank" className="text-[var(--color-accent)] hover:underline">
                  Google Account settings
                </Link>
              </li>
              <li>OAuth tokens are stored locally on your device only</li>
            </ul>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">Data Stored Locally</h2>
            <p>
              The following data is stored locally on your computer (never transmitted elsewhere):
            </p>
            <ul className="flex flex-col gap-2 list-disc list-inside">
              <li><strong>OAuth Access Tokens:</strong> To keep you logged in between sessions</li>
              <li><strong>Application Settings:</strong> Your preferences (e.g., notification time)</li>
              <li><strong>Starred Task IDs:</strong> A local-only feature to mark important tasks</li>
              <li><strong>List Visibility Preferences:</strong> Which task lists to show/hide</li>
            </ul>
            <p>
              This data is stored using Tauri's secure storage mechanisms and is not accessible 
              to other applications.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">Third-Party Services</h2>
            <p>
              The only third-party service the Application communicates with is Google's API servers:
            </p>
            <ul className="flex flex-col gap-2 list-disc list-inside">
              <li><strong>Google Tasks API:</strong> To sync your tasks</li>
              <li><strong>Google OAuth:</strong> For authentication</li>
            </ul>
            <p>
              Google's handling of your data is governed by{' '}
              <Link href="https://policies.google.com/privacy" target="_blank" className="text-[var(--color-accent)] hover:underline">
                Google's Privacy Policy
              </Link>.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">Open Source Transparency</h2>
            <p>
              Google Tasks Desktop is fully open source. You can audit exactly what the Application 
              does by reviewing our source code:
            </p>
            <p>
              <Link href="https://github.com/codad5/google-task-desktop" target="_blank" className="text-[var(--color-accent)] hover:underline">
                github.com/codad5/google-task-desktop
              </Link>
            </p>
            <p>
              We believe transparency is the best privacy policy. If you have concerns about what 
              the Application does, you can verify it yourself or ask the community.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">Children's Privacy</h2>
            <p>
              The Application is not directed at children under 13. We do not knowingly collect 
              information from children. If you believe a child has used the Application, please 
              contact us.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">Data Deletion</h2>
            <p>
              To remove all locally stored data, simply uninstall the Application. To revoke 
              Google Tasks access:
            </p>
            <ol className="flex flex-col gap-2 list-decimal list-inside">
              <li>Go to{' '}
                <Link href="https://myaccount.google.com/permissions" target="_blank" className="text-[var(--color-accent)] hover:underline">
                  Google Account Permissions
                </Link>
              </li>
              <li>Find "Google Tasks Desktop"</li>
              <li>Click "Remove Access"</li>
            </ol>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this 
              page with an updated revision date. Continued use of the Application after changes 
              constitutes acceptance of the updated policy.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">Contact</h2>
            <p>
              For privacy-related questions or concerns, please contact us at:{' '}
              <Link href="https://codad5.me" target="_blank" className="text-[var(--color-accent)] hover:underline">
                codad5.me
              </Link>
              {' '}or open an issue on our{' '}
              <Link href="https://github.com/codad5/google-task-desktop/issues" target="_blank" className="text-[var(--color-accent)] hover:underline">
                GitHub repository
              </Link>.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
