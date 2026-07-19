'use client';

import { useEffect } from 'react';
import Link from 'next/link';

const contacts = [
  { label: 'Call Us', value: '+91 98765 96016', href: 'tel:+919876596016' },
  { label: 'Sales Email', value: 'sales@vcnpl.net', href: 'mailto:sales@vcnpl.net' },
  { label: 'General Email', value: 'info@vcnpl.net', href: 'mailto:info@vcnpl.net' },
];

const serviceHighlights = [
  'Requirement analysis and technical consultation',
  'Product sourcing from leading OEMs',
  'Installation, commissioning, and acceptance support',
  'Project coordination and annual maintenance support',
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

export default function ContactPage() {
  useScrollReveal();

  return (
    <>
      <section className="contact-hero">
        <div className="contact-hero-bg" aria-hidden="true" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="tag" style={{ marginBottom: 20, animation: 'fadeUp 0.7s cubic-bezier(0,0,0.2,1) both' }}>Contact Us</div>
          <h1 style={{ color: 'var(--white)', fontSize: 'clamp(32px, 5vw, 54px)', maxWidth: 760, marginBottom: 22, letterSpacing: '-0.035em', lineHeight: 1.1, animation: 'fadeUp 0.7s cubic-bezier(0,0,0.2,1) 0.1s both' }}>
            Connect With Our Integration Experts
          </h1>
          <p style={{ color: 'rgba(255,255,255,.6)', fontSize: 17, maxWidth: 700, lineHeight: 1.8, animation: 'fadeUp 0.7s cubic-bezier(0,0,0.2,1) 0.2s both' }}>
            Tell us your requirement. We will align the right products, partners, and execution plan
            to deliver a precise, reliable, end-to-end solution.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-layout">
            <div className="card reveal-left" style={{ padding: 34 }}>
              <div className="tag" style={{ marginBottom: 18 }}>Reach Us Directly</div>
              <h2 style={{ marginBottom: 22, fontSize: 32, fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }}>Let Us Discuss Your Project</h2>
              <p style={{ color: 'var(--mist)', marginBottom: 28, lineHeight: 1.8, fontSize: 14.5 }}>
                For RFQs, technical consultation, or complete infrastructure planning, get in touch using
                the contact points below. We respond quickly with practical and technically sound recommendations.
              </p>

              <div style={{ display: 'grid', gap: 14, marginBottom: 28 }}>
                {contacts.map((contact) => (
                  <a
                    key={contact.value}
                    href={contact.href}
                    className="contact-link-card"
                  >
                    <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--mist)', marginBottom: 3, fontWeight: 600 }}>
                      {contact.label}
                    </div>
                    <div style={{ fontWeight: 700, color: 'var(--ink)', fontFamily: 'var(--font-display)', fontSize: 15 }}>{contact.value}</div>
                  </a>
                ))}
              </div>

              <div style={{ background: 'var(--fog-warm)', border: '1px solid rgba(10,14,26,0.04)', borderRadius: 14, padding: 20 }}>
                <div style={{ fontWeight: 700, marginBottom: 8, fontFamily: 'var(--font-display)', fontSize: 14 }}>Preferred Contact Window</div>
                <p style={{ color: 'var(--mist)', fontSize: 14 }}>
                  Monday to Saturday, 9:30 AM - 7:00 PM IST
                </p>
              </div>
            </div>

            <div className="card-dark reveal-right" style={{ padding: 34 }}>
              <div className="tag" style={{ marginBottom: 18 }}>How We Help</div>
              <h3 style={{ color: 'var(--white)', fontSize: 28, marginBottom: 18, fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }}>From Requirement to Delivery</h3>
              <p style={{ color: 'rgba(255,255,255,.55)', marginBottom: 26, lineHeight: 1.8, fontSize: 14.5 }}>
                Every project begins with understanding your operational goals and technical constraints.
                We then define specifications and execute with OEM-backed quality.
              </p>

              <ul style={{ listStyle: 'none', display: 'grid', gap: 14, marginBottom: 32 }}>
                {serviceHighlights.map((item) => (
                  <li key={item} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', color: 'rgba(255,255,255,.75)', fontSize: 14.5 }}>
                    <span style={{ marginTop: 9, width: 6, height: 6, borderRadius: '50%', background: 'var(--blue)', flexShrink: 0 }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div style={{ display: 'grid', gap: 12 }}>
                <Link href="/solutions" className="btn btn-outline" style={{ justifyContent: 'center' }}>
                  Explore Solutions
                </Link>
                <Link href="/industries" className="btn btn-primary" style={{ justifyContent: 'center' }}>
                  View Industries
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .contact-hero {
          position: relative;
          overflow: hidden;
          padding: 140px 0 80px;
          background: var(--grad-hero);
        }
        .contact-hero-bg {
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
        .contact-layout {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 28px;
        }
        .contact-link-card {
          border: 1px solid rgba(10,14,26,0.05);
          border-radius: 14px;
          padding: 16px 18px;
          display: block;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
        }
        .contact-link-card:hover {
          border-color: rgba(59,108,245,0.2);
          box-shadow: 0 8px 24px rgba(10,14,26,0.06);
          transform: translateY(-2px);
        }
        @media (max-width: 900px) {
          .contact-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
