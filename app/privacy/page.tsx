import type { Metadata } from "next";
import {
  CLINIC_ADDRESS,
  CONTACT_EMAIL,
  PRIVACY_LAST_UPDATED,
  SITE_NAME,
  WHATSAPP_DISPLAY,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy — DG Clinic, Jakarta",
  description:
    "How DG Clinic collects, uses, and protects your personal data, including data handled through WhatsApp and other messaging channels.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="hero container">
        <span className="eyebrow">Privacy Policy</span>
        <h1>How We Handle Your Data</h1>
        <p className="lede">
          {SITE_NAME} (&ldquo;DG Clinic,&rdquo; &ldquo;we,&rdquo;
          &ldquo;us&rdquo;) is committed to protecting your privacy. This
          policy explains what personal data we collect, how we use it, and
          the choices you have. Last updated: {PRIVACY_LAST_UPDATED}.
        </p>
      </section>

      <section className="section-tight container">
        <div className="story-block">
          <h2>1. Who We Are</h2>
          <p>
            DG Clinic is a doctor-led home-care wellness clinic operating in
            Greater Jakarta, located at {CLINIC_ADDRESS}. For any question
            about this policy or your data, contact us at {CONTACT_EMAIL} or
            via WhatsApp at {WHATSAPP_DISPLAY}.
          </p>
        </div>

        <div className="story-block">
          <h2>2. Data We Collect</h2>
          <p>We collect only the data needed to provide our services:</p>
          <ul>
            <li>
              <strong>Contact details</strong> — your name, phone number, and
              any contact information you share when you message us.
            </li>
            <li>
              <strong>Message content</strong> — the contents of
              conversations you have with us on WhatsApp, Instagram, or
              other channels, including the treatments you ask about.
            </li>
            <li>
              <strong>Health information you volunteer</strong> — details
              you choose to share so our doctors can advise you safely
              (for example symptoms, allergies, or current medication).
            </li>
            <li>
              <strong>Visit details</strong> — your address and scheduling
              information when you book a home-care visit.
            </li>
            <li>
              <strong>Basic technical data</strong> — standard website logs
              (such as pages visited and device type) used to keep the site
              working and secure. When you click certain links (for example,
              to start a WhatsApp conversation about a lab test), we set a
              first-party functional cookie so we don&rsquo;t count the same
              visit twice. Our website does not require an account and does
              not use advertising trackers.
            </li>
          </ul>
        </div>

        <div className="story-block">
          <h2>3. How We Use Your Data</h2>
          <ul>
            <li>To respond to your enquiries and provide consultations.</li>
            <li>To schedule and deliver treatments and follow-up care.</li>
            <li>To send you information you request, such as pricing.</li>
            <li>To maintain medical records as required by law.</li>
            <li>To improve our services and keep our systems secure.</li>
          </ul>
          <p>
            We do not sell your personal data, and we do not use your health
            information for advertising.
          </p>
        </div>

        <div className="story-block">
          <h2>4. WhatsApp and Meta</h2>
          <p>
            We communicate with patients through the WhatsApp Business
            Platform, operated by Meta Platforms, Inc. When you message us on
            WhatsApp, your messages are transmitted and processed by
            WhatsApp/Meta in accordance with their own terms and privacy
            policies, including the{" "}
            <a
              href="https://www.whatsapp.com/legal/business-data-transfer-addendum"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp Business terms
            </a>{" "}
            and the{" "}
            <a
              href="https://www.whatsapp.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp Privacy Policy
            </a>
            . We use the data received through WhatsApp only for the purposes
            described in this policy, and we comply with the platform
            policies that govern business messaging, including Meta&rsquo;s
            requirements on the responsible handling of customer data.
          </p>
        </div>

        <div className="story-block">
          <h2>5. Sharing Your Data</h2>
          <p>Your data is shared only with:</p>
          <ul>
            <li>
              <strong>Our medical team</strong> — the licensed doctors and
              staff involved in your care.
            </li>
            <li>
              <strong>Service providers</strong> — platforms we use to
              operate, such as WhatsApp (messaging) and our website hosting
              provider, each bound by their own data-protection obligations.
            </li>
            <li>
              <strong>Authorities</strong> — where disclosure is required by
              Indonesian law.
            </li>
          </ul>
        </div>

        <div className="story-block">
          <h2>6. Data Retention and Security</h2>
          <p>
            We keep personal data only as long as needed for your care, for
            legitimate business purposes, or as required by Indonesian
            medical-record regulations. Access to patient information is
            restricted to authorized personnel, and we apply appropriate
            technical and organizational safeguards to protect it.
          </p>
        </div>

        <div className="story-block">
          <h2>7. Your Rights</h2>
          <p>
            Under Indonesia&rsquo;s Personal Data Protection Law (Law No. 27
            of 2022), you have the right to access, correct, or request
            deletion of your personal data, and to withdraw consent to its
            processing. To exercise any of these rights — or to stop
            receiving messages from us at any time — contact us at{" "}
            {CONTACT_EMAIL} or message us on WhatsApp at {WHATSAPP_DISPLAY}.
            We will respond within a reasonable period.
          </p>
        </div>

        <div className="story-block">
          <h2>8. Children</h2>
          <p>
            Our services are intended for adults. We only process a
            minor&rsquo;s data with the consent and involvement of a parent
            or legal guardian.
          </p>
        </div>

        <div className="story-block">
          <h2>9. Changes to This Policy</h2>
          <p>
            We may update this policy from time to time. The latest version
            will always be available on this page, with the effective date
            shown at the top.
          </p>
        </div>
      </section>
    </>
  );
}
