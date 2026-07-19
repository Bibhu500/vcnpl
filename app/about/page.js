'use client';

import { useEffect } from 'react';
import Link from 'next/link';

const whyChooseUs = [
  { icon: '👨‍🔧', title: 'Certified Engineers', desc: 'Trained and certified technical experts for flawless execution.' },
  { icon: '🤝', title: 'OEM Partnerships', desc: 'Direct sourcing from industry-leading manufacturers.' },
  { icon: '🇮🇳', title: 'PAN India Support', desc: 'Seamless service and support across the nation.' },
  { icon: '⚙️', title: 'End-to-End Execution', desc: 'From requirement analysis to final handover.' },
  { icon: '🛡️', title: 'Annual Maintenance', desc: 'Comprehensive AMC services for long-term reliability.' },
  { icon: '💡', title: 'Customized Solutions', desc: 'Tailored technology integration for your unique needs.' },
  { icon: '🚀', title: 'Fast Delivery', desc: 'Timely procurement and deployment of all systems.' },
  { icon: '📊', title: 'Project Management', desc: 'Dedicated teams ensuring on-time project completion.' },
];

const certifications = ['ISO 9001:2015', 'OEM Authorised Partner', 'System Integration Certified', 'CCTV Solution Provider'];

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

export default function AboutPage() {
  useScrollReveal();

  return (
    <>
      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-bg" aria-hidden="true" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="tag" style={{ marginBottom: 22, animation: 'fadeUp 0.7s cubic-bezier(0,0,0.2,1) both' }}>About Us</div>
          <h1 style={{ fontSize: 'clamp(32px,5vw,54px)', fontWeight: 700, color: 'white', maxWidth: 640, marginBottom: 24, letterSpacing: '-0.035em', lineHeight: 1.1, animation: 'fadeUp 0.7s cubic-bezier(0,0,0.2,1) 0.1s both' }}>
            We Are <span style={{ background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Visual Connect Network</span>
          </h1>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,.6)', maxWidth: 600, lineHeight: 1.8, animation: 'fadeUp 0.7s cubic-bezier(0,0,0.2,1) 0.2s both' }}>
            A specialist system integrator understanding end-user requirements and delivering precision-engineered technology solutions across India.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="section">
        <div className="container">
          <div className="about-mission-grid">
            <div className="reveal-left">
              <div className="tag" style={{ marginBottom: 22 }}>Our Mission</div>
              <h2 style={{ fontSize: 'clamp(26px,3.5vw,38px)', fontWeight: 700, marginBottom: 24, letterSpacing: '-0.03em' }}>Aligning Technology With Purpose</h2>
              <p style={{ color: 'var(--mist)', lineHeight: 1.85, marginBottom: 20, fontSize: 14.5 }}>
                We are a system integrator specialising in understanding end-user requirements and delivering tailored solutions by aligning the right products and partners. Our approach focuses on working closely with clients to develop precise technical specifications and ensure seamless project execution.
              </p>
              <p style={{ color: 'var(--mist)', lineHeight: 1.85, marginBottom: 20, fontSize: 14.5 }}>
                We work directly with leading OEMs on most of our offerings, so we can deliver reliable, high-quality solutions. For requirements beyond our direct scope, we collaborate with trusted partners to ensure complete and efficient delivery.
              </p>
              <p style={{ color: 'var(--mist)', lineHeight: 1.85, fontSize: 14.5 }}>
                By combining technical expertise with strong industry partnerships, we ensure that every solution is aligned with client needs and delivered with precision and reliability.
              </p>
            </div>
            <div className="reveal-right" style={{ position: 'relative' }}>
              <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
                <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=700&q=80" alt="team" style={{ width: '100%', borderRadius: 'var(--radius-xl)', objectFit: 'cover', height: 400, transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1)' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                  onMouseLeave={e => e.currentTarget.style.transform = ''}
                />
              </div>
              <div style={{ position: 'absolute', bottom: -20, right: -20, background: 'var(--ink)', borderRadius: 18, padding: '24px 28px', border: '1px solid rgba(255,255,255,.06)', boxShadow: '0 12px 32px rgba(10,14,26,0.3)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 42, fontWeight: 700, color: 'var(--gold)', lineHeight: 1, letterSpacing: '-0.03em' }}>500+</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,.4)', marginTop: 4 }}>Projects Delivered</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{ background: 'var(--fog-warm)' }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="tag" style={{ marginBottom: 16 }}>Why Choose Us</div>
            <h2 style={{ fontSize: 'clamp(26px,3.5vw,40px)', fontWeight: 700 }}>The VCNPL Advantage</h2>
          </div>
          <div className="about-values-grid reveal-stagger">
            {whyChooseUs.map(({ icon, title, desc }) => (
              <div key={title} className="card" style={{ padding: 32 }}>
                <div style={{ fontSize: 34, marginBottom: 16, transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)' }}>{icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, marginBottom: 10 }}>{title}</h3>
                <p style={{ fontSize: 13.5, color: 'var(--mist)', lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise areas */}
      <section className="section" style={{ background: 'var(--ink)' }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="tag" style={{ marginBottom: 16 }}>Core Expertise</div>
            <h2 style={{ fontSize: 'clamp(26px,3.5vw,40px)', fontWeight: 700, color: 'white' }}>13 Solution Verticals</h2>
          </div>
          <div className="about-expertise-grid reveal-stagger">
            {[
              'Enterprise Networking', 'CCTV & PA (Public announcement) System', 'Access Control',
              'Video Conferencing', 'Audio Visual Solutions', 'PA System',
              'WiFi Solutions', 'Data Center', 'Interactive Panels',
              'LED Display', 'Smart Classrooms', 'Command & Control Centers',
              'Test equipments',
            ].map((area, i) => (
              <div key={area} className="about-expertise-item" style={{ borderRight: (i + 1) % 3 !== 0 ? '1px solid rgba(255,255,255,.05)' : 'none', borderBottom: i < 10 ? '1px solid rgba(255,255,255,.05)' : 'none' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--blue)', marginBottom: 14, transition: 'transform 0.3s ease' }} />
                <span style={{ color: 'rgba(255,255,255,.78)', fontSize: 14.5, fontWeight: 500 }}>{area}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-sm">
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="tag reveal" style={{ marginBottom: 22 }}>Credentials</div>
          <h3 className="reveal" style={{ fontSize: 26, fontWeight: 700, marginBottom: 36, fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>Quality You Can Trust</h3>
          <div className="reveal-stagger" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            {certifications.map(c => (
              <div key={c} style={{ padding: '14px 28px', border: '1.5px solid rgba(59,108,245,0.2)', borderRadius: 'var(--radius-pill)', fontSize: 14, fontWeight: 600, color: 'var(--ink)', background: 'var(--blue-dim)', transition: 'all 0.3s ease' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--blue)'; e.currentTarget.style.boxShadow = 'var(--shadow-blue)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(59,108,245,0.2)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = ''; }}
              >{c}</div>
            ))}
          </div>
          <div className="reveal" style={{ marginTop: 52 }}>
            <Link href="/contact" className="btn btn-dark" style={{ fontSize: 15, padding: '14px 34px' }}>Get In Touch →</Link>
          </div>
        </div>
      </section>

      <style>{`
        .about-hero {
          position: relative;
          overflow: hidden;
          padding: 140px 0 84px;
          background: var(--grad-hero);
        }
        .about-hero-bg {
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(circle at 75% 20%, rgba(59,108,245,0.08) 0%, transparent 40%),
            radial-gradient(circle at 15% 85%, rgba(212,168,67,0.06) 0%, transparent 35%),
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: auto, auto, 60px 60px, 60px 60px;
          pointer-events: none;
        }
        .about-mission-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 72px;
          align-items: center;
        }
        .about-values-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        .about-expertise-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
          background: rgba(255,255,255,0.03);
          border-radius: var(--radius-xl);
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.05);
        }
        .about-expertise-item {
          padding: 28px 24px;
          transition: background 0.3s ease;
        }
        .about-expertise-item:hover {
          background: rgba(255,255,255,0.04);
        }
        @media (max-width: 900px) {
          .about-values-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .about-mission-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 700px) {
          .about-expertise-grid { grid-template-columns: 1fr !important; }
          .about-expertise-item { border-right: none !important; }
        }
        @media (max-width: 560px) {
          .about-values-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}