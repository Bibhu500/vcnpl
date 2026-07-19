'use client';

import { useEffect } from 'react';
import Link from 'next/link';

const industries = [
  { name: 'Government', points: ['Secure surveillance, command center AV, and communication.', 'Strict compliance and delivery standards.'] },
  { name: 'Education', points: ['Smart classrooms, interactive panels, and campus networking.', 'Integrated deployment for scalable learning environments.'] },
  { name: 'Healthcare', points: ['Critical surveillance, communication systems, and IT infrastructure.', 'Precise planning for sensitive operational environments.'] },
  { name: 'Airports', points: ['Large-scale CCTV, PA systems, and robust networking.', 'High-availability infrastructure for uninterrupted operations.'] },
  { name: 'Smart Cities', points: ['City-wide surveillance, public address, and command centers.', 'Centralized management and scalable networking backbone.'] },
  { name: 'Manufacturing', points: ['Industrial test equipment, rugged networking, and CCTV.', 'High-reliability solutions with commissioning support.'] },
  { name: 'Hospitality', points: ['Guest WiFi, digital signage, AV systems, and security.', 'Seamless technology integration for enhanced guest experiences.'] },
  { name: 'Corporate Offices', points: ['Conference AV, networking backbone, and secure access infrastructure.', 'Complete office technology setup support.'] },
  { name: 'Defence', points: ['Highly secure communication, surveillance, and tactical AV.', 'Mission-critical reliability and stringent security compliance.'] },
  { name: 'Banking', points: ['Secure networking, access control, and branch surveillance.', 'Robust IT infrastructure for financial institutions.'] },
];

function useScrollReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-stagger');
    if (!targets.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    targets.forEach(t => observer.observe(t));
    return () => observer.disconnect();
  });
}

export default function IndustriesPage() {
  useScrollReveal();

  return (
    <>
      <section className="ind-hero">
        <div className="ind-hero-bg" aria-hidden="true" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="tag" style={{ marginBottom: 20, animation: 'fadeUp 0.7s cubic-bezier(0,0,0.2,1) both' }}>Industries We Serve</div>
          <h1 style={{ color: 'var(--white)', fontSize: 'clamp(32px, 5vw, 54px)', maxWidth: 820, marginBottom: 22, letterSpacing: '-0.035em', lineHeight: 1.1, animation: 'fadeUp 0.7s cubic-bezier(0,0,0.2,1) 0.1s both' }}>
            Trusted Across Mission-Critical and High-Performance Environments
          </h1>
          <p style={{ color: 'rgba(255,255,255,.6)', fontSize: 17, maxWidth: 760, lineHeight: 1.8, animation: 'fadeUp 0.7s cubic-bezier(0,0,0.2,1) 0.2s both' }}>
            We deliver requirement-led integration solutions aligned to sector-specific standards,
            operational priorities, and long-term scalability.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="tag" style={{ marginBottom: 14 }}>Sector Expertise</div>
            <h2 style={{ fontSize: 'clamp(28px,4vw,42px)' }}>Solutions Built for Real-World Industry Demands</h2>
          </div>

          <div className="reveal-stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 22 }}>
            {industries.map((industry) => (
              <article key={industry.name} className="card" style={{ padding: '30px 28px 24px' }}>
                <h3 style={{ marginBottom: 16, fontSize: 22, fontFamily: 'var(--font-display)' }}>{industry.name}</h3>
                <ul style={{ listStyle: 'none', display: 'grid', gap: 12 }}>
                  {industry.points.map((point) => (
                    <li key={point} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', color: 'var(--slate)', lineHeight: 1.7, fontSize: 14.5 }}>
                      <span style={{ marginTop: 9, width: 6, height: 6, borderRadius: '50%', background: 'var(--blue)', flexShrink: 0 }} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ind-cta-sec">
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="tag reveal" style={{ marginBottom: 20 }}>Need a Tailored Plan?</div>
          <h2 className="reveal" style={{ color: 'var(--white)', fontSize: 'clamp(28px, 4vw, 44px)', marginBottom: 20, letterSpacing: '-0.03em' }}>
            Let Us Define the Right Technical Roadmap
          </h2>
          <p className="reveal" style={{ color: 'rgba(255,255,255,.55)', maxWidth: 620, margin: '0 auto 36px', lineHeight: 1.8, fontSize: 15.5 }}>
            Share your site requirements and objectives. We will build a precise specification,
            map the right products, and deliver with OEM-backed confidence.
          </p>
          <div className="reveal" style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/solutions" className="btn btn-outline">Browse Solutions</Link>
            <Link href="/contact" className="btn btn-primary">Talk to Our Team</Link>
          </div>
        </div>
      </section>

      <style>{`
        .ind-hero {
          position: relative;
          overflow: hidden;
          padding: 140px 0 80px;
          background: var(--grad-hero);
        }
        .ind-hero-bg {
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(circle at 80% 20%, rgba(59,108,245,0.08) 0%, transparent 40%),
            radial-gradient(circle at 15% 85%, rgba(212,168,67,0.06) 0%, transparent 35%),
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: auto, auto, 60px 60px, 60px 60px;
          pointer-events: none;
        }
        .ind-cta-sec {
          background: var(--ink);
          padding: 88px 0;
        }
        @media (max-width: 900px) {
          section .container > div[style*='grid-template-columns: repeat(2'] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
