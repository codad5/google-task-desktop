import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service - Google Tasks Desktop',
  description: 'Terms of Service for Google Tasks Desktop application',
};

export default function TermsPage() {
  return (
    <main className="flex flex-col items-center px-6 py-20 pt-24">
      <div className="flex flex-col gap-8 max-w-3xl w-full">
        <h1 className="text-3xl font-bold gradient-text">Terms of Service</h1>
        <p className="text-sm text-[var(--color-text-muted)]">Last updated: January 19, 2026</p>
        
        <div className="flex flex-col gap-8 text-[var(--color-text-secondary)] leading-relaxed">
          
          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">1. Agreement to Terms</h2>
            <p>
              By downloading, installing, or using Google Tasks Desktop ("the Application"), you agree 
              to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, 
              do not use the Application.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">2. Unofficial Application Disclaimer</h2>
            <p>
              <strong>IMPORTANT:</strong> Google Tasks Desktop is an UNOFFICIAL, third-party application. 
              It is NOT developed, maintained, sponsored, or endorsed by Google LLC or any of its affiliates.
            </p>
            <p>
              "Google Tasks" and related trademarks are the property of Google LLC. The use of Google's 
              name and trademarks is solely for descriptive purposes to indicate compatibility with 
              Google's services.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">3. Use of Google Services</h2>
            <p>
              The Application interfaces with Google Tasks through Google's official APIs. By using 
              this Application, you also agree to:
            </p>
            <ul className="flex flex-col gap-2 list-disc list-inside">
              <li>
                <Link href="https://policies.google.com/terms" target="_blank" className="text-[var(--color-accent)] hover:underline">
                  Google's Terms of Service
                </Link>
              </li>
              <li>
                <Link href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" className="text-[var(--color-accent)] hover:underline">
                  Google API Services User Data Policy
                </Link>
              </li>
              <li>
                <Link href="https://policies.google.com/privacy" target="_blank" className="text-[var(--color-accent)] hover:underline">
                  Google's Privacy Policy
                </Link>
              </li>
            </ul>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">4. License</h2>
            <p>
              Google Tasks Desktop is free, open-source software released under the{' '}
              <Link href="https://www.gnu.org/licenses/gpl-3.0.html" target="_blank" className="text-[var(--color-accent)] hover:underline">
                GNU General Public License v3.0 (GPL-3.0)
              </Link>. 
              You are free to use, modify, and distribute the Application in accordance with this license.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">5. User Responsibilities</h2>
            <p>You agree to:</p>
            <ul className="flex flex-col gap-2 list-disc list-inside">
              <li>Use the Application in compliance with all applicable laws and regulations</li>
              <li>Not use the Application for any illegal or unauthorized purpose</li>
              <li>Not attempt to circumvent any security features of the Application</li>
              <li>Accept responsibility for all activities under your Google account when using this Application</li>
            </ul>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">6. Disclaimer of Warranties</h2>
            <p>
              THE APPLICATION IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, 
              EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY LAW, THE DEVELOPERS DISCLAIM 
              ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul className="flex flex-col gap-2 list-disc list-inside">
              <li>Implied warranties of merchantability and fitness for a particular purpose</li>
              <li>Warranties regarding security, reliability, or availability</li>
              <li>Warranties that the Application will meet your requirements or be error-free</li>
            </ul>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">7. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE DEVELOPERS SHALL NOT BE LIABLE FOR ANY 
              INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT 
              LIMITED TO:
            </p>
            <ul className="flex flex-col gap-2 list-disc list-inside">
              <li>Loss of data or corruption of your Google Tasks</li>
              <li>Issues with your Google account</li>
              <li>Loss of profits or business interruption</li>
              <li>Any damages arising from the use or inability to use the Application</li>
            </ul>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">8. Updates and Changes</h2>
            <p>
              We reserve the right to modify the Application and these Terms at any time. Continued 
              use of the Application after changes constitutes acceptance of the modified Terms. 
              Material changes will be communicated through the Application or our GitHub repository.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">9. Termination</h2>
            <p>
              You may stop using the Application at any time by uninstalling it. We reserve the right 
              to discontinue the Application or revoke access at any time without notice.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">10. Contact</h2>
            <p>
              For questions about these Terms, please contact us at:{' '}
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
