export default function TermsPage() {
  return (
    <main className="flex flex-col items-center px-6 py-20 pt-24">
      <div className="flex flex-col gap-8 max-w-3xl w-full">
        <h1 className="text-3xl font-bold gradient-text">Terms of Service</h1>
        
        <div className="flex flex-col gap-6 text-[var(--color-text-secondary)]">
          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">1. Acceptance of Terms</h2>
            <p>
              By using Google Tasks Desktop ("the App"), you agree to these Terms of Service. 
              If you do not agree, please do not use the App.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">2. Unofficial Application</h2>
            <p>
              This is an UNOFFICIAL application. It is NOT affiliated with, endorsed by, or connected 
              to Google LLC in any way. Google Tasks™ is a trademark of Google LLC.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">3. Use of Google Services</h2>
            <p>
              The App uses the Google Tasks API to sync your tasks. By using this App, you also 
              agree to Google's Terms of Service and API Terms of Service.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">4. No Warranty</h2>
            <p>
              The App is provided "AS IS" without warranty of any kind. The developers are not 
              responsible for any data loss, issues with your Google account, or any other damages.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">5. Open Source</h2>
            <p>
              This App is open source under the GPL-3.0 license. You can view, modify, and 
              distribute the source code according to the license terms.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">6. Changes to Terms</h2>
            <p>
              These terms may be updated at any time. Continued use of the App constitutes 
              acceptance of any changes.
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
