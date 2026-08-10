import type { Metadata } from "next";
import Image from "next/image";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Our Story — DG Clinic, Jakarta",
  description:
    "How DG Clinic began: a pandemic-era commitment to accessible, private home-care, founded by dr. Denish Gunawan, MPH.",
};

export default function OurStoryPage() {
  return (
    <>
      <section className="hero container">
        <Image
          src="/images/founder.avif"
          alt="dr. Denish Gunawan, MPH — founder of Denish Gunawan Clinic"
          className="portrait-photo"
          width={200}
          height={200}
          priority
        />
        <span className="eyebrow">Our Story</span>
        <h1>Meet the Man Behind DG Clinic</h1>
        <p className="lede">
          Dr. Denish Gunawan began his medical journey at Atma Jaya
          University, earning his degree as a medical doctor.
        </p>
      </section>

      <section className="section-tight container">
        <div className="story-block">
          <span className="eyebrow">The Origin</span>
          <h2>Care That Came to the Patient</h2>
          <p>
            During the COVID-19 pandemic, he saw firsthand how critical
            accessible care had become. So he started visiting patients
            directly — treating them in the safety and privacy of their own
            homes.
          </p>
          <p>
            From that mission, DG Clinic was born: a space created to connect
            more doctors with patients, delivering care that feels personal,
            yet remains grounded in medical professionalism.
          </p>
        </div>

        <div className="story-block">
          <span className="eyebrow">Growth</span>
          <h2>Mind, Body, and Spirit Together</h2>
          <p>
            Recognizing the importance of treating mind, body, and spirit
            together, Dr. Denish continued his studies on scholarship at Brown
            University in the United States, earning a Master&rsquo;s in
            Public Health with a concentration in Mindfulness.
          </p>
        </div>

        <div className="story-block">
          <span className="eyebrow">Today</span>
          <h2>Back in Jakarta, Leading DG Clinic</h2>
          <p>
            Now back in Jakarta, Dr. Denish leads DG Clinic with a deeper
            understanding, greater compassion, and a renewed commitment to the
            community that shaped his mission.
          </p>
        </div>
      </section>

      {/* Signed founder statement block */}
      <section className="navy-block">
        <div className="container quote-block">
          <blockquote>
            &ldquo;Healing begins with understanding that one&rsquo;s
            suffering needs to be heard.&rdquo;
          </blockquote>
          <cite>— dr. Denish Gunawan, MPH</cite>
        </div>
      </section>

      <section className="section container">
        <div className="cta-band">
          <h2>Your Care, On Your Terms</h2>
          <p>
            Every DG Clinic visit carries this founding commitment — private,
            doctor-led care that listens first.
          </p>
          <WhatsAppButton
            label="Talk to us about your care — message on WhatsApp →"
            variant="light"
          />
        </div>
      </section>
    </>
  );
}
