'use client';

import { useEffect } from 'react';
import Link from 'next/link';

const solutionGroups = [
  {
    title: 'Enterprise Networking',
    items: ['Router', 'Switches', 'Cabling & Wi-Fi', 'RF link', 'End-to-end solution delivery', 'Soldering and De-soldering station']
  },
  {
    title: 'CCTV & PA (Public announcement) System',
    items: ['IP Cameras (Bullet, Dome, PTZ)', 'Network Video Recorders (NVR)', 'Video Management Software (VMS)', 'Video Analytics', 'Surveillance Storage']
  },
  {
    title: 'Access Control',
    items: ['Biometric Scanners', 'RFID Card Readers', 'Turnstiles & Flap Barriers', 'Visitor Management', 'Door Interlocking Systems']
  },
  {
    title: 'Video Conferencing',
    items: ['PTZ Cameras', 'Speakerphones & Microphones', 'All-in-One VC Soundbars', 'Wireless Presentation Systems', 'Room Booking Solutions']
  },
  {
    title: 'Audio Visual Solutions',
    items: ['Projectors & Screens', 'Digital Signage', 'AV Matrix Switchers', 'Video Processors', 'Control Systems']
  },
  {
    title: 'PA System',
    items: ['Amplifiers & Mixers', 'Ceiling & Wall Speakers', 'Horn Speakers', 'Paging Microphones', 'Voice Evacuation Systems']
  },
  {
    title: 'WiFi Solutions',
    items: ['Indoor Access Points', 'Outdoor Access Points', 'Wireless LAN Controllers', 'Point-to-Point Wireless', 'Guest WiFi Management']
  },
  {
    title: 'Data Center',
    items: ['Server & Network Racks', 'Intelligent PDUs', 'Precision Cooling Systems', 'Data Center UPS', 'Environmental Monitoring']
  },
  {
    title: 'Interactive Panels',
    items: ['Interactive Flat Panels', 'Smart Whiteboards', 'OPS Modules', 'Mobile Stands', 'Interactive Software']
  },
  {
    title: 'LED Display',
    items: ['Indoor LED Video Walls', 'Outdoor LED Displays', 'Transparent LED', 'Flexible LED Screens', 'LED Controllers']
  },
  {
    title: 'Smart Classrooms',
    items: ['Digital Podiums', 'Lecture Capture Systems', 'Document Cameras', 'Classroom Audio Systems', 'Student Response Systems']
  },
  {
    title: 'Command & Control Centers',
    items: ['Video Wall Controllers', 'Operator Consoles & Furniture', 'KVM Switches', 'Crisis Management Software', 'Visualization Solutions']
  },
  {
    title: 'Test equipments',
    items: ['Oscilloscopes', 'Spectrum Analyzers', 'Signal Generators', 'Multimeters', 'Power Analyzers', 'Soldering and De-soldering station']
  }
];

const integrationServices = [
  'Requirement analysis',
  'Technical specification development',
  'Product sourcing and procurement',
  'Solution design',
  'Installation and commissioning',
  'Testing and acceptance support',
  'OEM coordination and project management',
  'Annual maintenance and support services',
];

const heroStats = [
  { value: '13', label: 'Product Categories', detail: 'From networking to command centers' },
  { value: 'OEM', label: 'Direct Sourcing', detail: 'Authorised partnerships with leading manufacturers' },
  { value: 'End-to-End', label: 'Integration', detail: 'Specification through commissioning & support' },
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

export default function SolutionsPage() {
  useScrollReveal();

  return (
    <>
      <section className="solutions-hero">
        <div className="solutions-hero-bg" aria-hidden="true" />
        <div className="container solutions-hero-inner">
          <div className="solutions-hero-grid">
            <div className="solutions-hero-content">
              <div className="tag">Products & Solutions</div>
              <h1>
                Comprehensive Product Portfolio for{' '}
                <span className="solutions-hero-accent">Modern Infrastructure</span>
              </h1>
              <p className="solutions-hero-lead">
                Direct OEM sourcing, trusted partner collaboration, and technical specification-led
                delivery for complete and reliable system integration.
              </p>
              <div className="solutions-hero-actions">
                <Link href="/contact" className="btn btn-primary">Request Consultation</Link>
                <Link href="/industries" className="btn btn-dark">View Industries</Link>
              </div>
            </div>

            <div className="solutions-hero-stats">
              {heroStats.map((stat) => (
                <div key={stat.label} className="solutions-stat-card">
                  <div className="solutions-stat-value">{stat.value}</div>
                  <div className="solutions-stat-label">{stat.label}</div>
                  <div className="solutions-stat-detail">{stat.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--fog-warm)' }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="tag" style={{ marginBottom: 14 }}>What We Deliver</div>
            <h2 style={{ fontSize: 'clamp(28px,4vw,42px)' }}>Products Across 13 Core Categories</h2>
          </div>

          <div className="reveal-stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 22 }}>
            {solutionGroups.map((group) => (
              <article key={group.title} className="card" style={{ padding: '30px 28px 26px' }}>
                <h3 style={{ fontSize: 22, marginBottom: 16, fontFamily: 'var(--font-display)' }}>{group.title}</h3>
                <ul style={{ listStyle: 'none', display: 'grid', gap: 10 }}>
                  {group.items.map((item) => (
                    <li key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', color: 'var(--slate)' }}>
                      <span style={{ marginTop: 9, width: 6, height: 6, borderRadius: '50%', background: 'var(--blue)', flexShrink: 0 }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--ink)' }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="tag" style={{ marginBottom: 14 }}>Integration Services</div>
            <h2 style={{ color: 'var(--white)', fontSize: 'clamp(28px,4vw,42px)' }}>
              End-to-End System Integration
            </h2>
          </div>

          <div className="reveal-stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 2, borderRadius: 'var(--radius-xl)', overflow: 'hidden', border: '1px solid rgba(255,255,255,.06)' }}>
            {integrationServices.map((item) => (
              <div key={item} style={{ background: 'rgba(255,255,255,.03)', padding: 22, transition: 'background 0.3s ease' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.06)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,.03)'}
              >
                <div style={{ color: 'rgba(255,255,255,.78)', lineHeight: 1.65, fontSize: 14.5 }}>{item}</div>
              </div>
            ))}
          </div>

          <div className="reveal" style={{ marginTop: 40, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 14 }}>
            <Link href="/industries" className="btn btn-outline">View Industries</Link>
            <Link href="/contact" className="btn btn-primary">Request Consultation</Link>
          </div>
        </div>
      </section>

      <style>{`
        .solutions-hero {
          position: relative;
          overflow: hidden;
          padding: 130px 0 84px;
          background: linear-gradient(168deg, #f6f8fd 0%, #ffffff 40%, #f0f4fb 100%);
          border-bottom: 1px solid rgba(10,14,26,0.04);
        }
        .solutions-hero-bg {
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(circle at 85% 15%, rgba(59,108,245,0.05) 0%, transparent 42%),
            radial-gradient(circle at 10% 80%, rgba(212,168,67,0.06) 0%, transparent 38%),
            linear-gradient(rgba(10,14,26,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(10,14,26,0.025) 1px, transparent 1px);
          background-size: auto, auto, 56px 56px, 56px 56px;
          pointer-events: none;
          mask-image: radial-gradient(ellipse 70% 70% at 50% 30%, black 0%, transparent 70%);
          -webkit-mask-image: radial-gradient(ellipse 70% 70% at 50% 30%, black 0%, transparent 70%);
        }
        .solutions-hero-inner { position: relative; z-index: 1; }
        .solutions-hero-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 56px;
          align-items: center;
        }
        .solutions-hero-content .tag { margin-bottom: 22px; }
        .solutions-hero-content h1 {
          font-size: clamp(32px, 4.5vw, 50px);
          font-weight: 700;
          color: var(--ink);
          max-width: 620px;
          margin-bottom: 22px;
          line-height: 1.1;
          letter-spacing: -0.035em;
          animation: fadeUp 0.7s cubic-bezier(0,0,0.2,1) both;
        }
        .solutions-hero-accent {
          background: linear-gradient(135deg, var(--blue) 0%, #7c3aed 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .solutions-hero-lead {
          font-size: 16.5px;
          color: var(--mist);
          max-width: 560px;
          line-height: 1.8;
          margin-bottom: 34px;
          animation: fadeUp 0.7s cubic-bezier(0,0,0.2,1) 0.1s both;
        }
        .solutions-hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          animation: fadeUp 0.7s cubic-bezier(0,0,0.2,1) 0.2s both;
        }
        .solutions-hero-stats {
          display: flex;
          flex-direction: column;
          gap: 14px;
          animation: fadeInRight 0.8s cubic-bezier(0,0,0.2,1) 0.2s both;
        }
        .solutions-stat-card {
          background: var(--white);
          border: 1px solid rgba(10,14,26,0.05);
          border-radius: var(--radius-lg);
          padding: 24px 26px;
          box-shadow: var(--shadow-sm);
          transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
        }
        .solutions-stat-card:hover {
          border-color: rgba(59,108,245,0.2);
          box-shadow: var(--shadow-md);
          transform: translateY(-3px);
        }
        .solutions-stat-value {
          font-family: var(--font-display);
          font-size: 30px;
          font-weight: 700;
          color: var(--blue);
          line-height: 1;
          margin-bottom: 6px;
        }
        .solutions-stat-label {
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 700;
          color: var(--ink);
          margin-bottom: 6px;
        }
        .solutions-stat-detail {
          font-size: 13px;
          color: var(--mist);
          line-height: 1.55;
        }

        @media (max-width: 960px) {
          .solutions-hero { padding: 110px 0 64px; }
          .solutions-hero-grid { grid-template-columns: 1fr; gap: 40px; }
          .solutions-hero-stats {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 14px;
          }
        }
        @media (max-width: 720px) {
          .solutions-hero-stats { grid-template-columns: 1fr; }
        }
        @media (max-width: 900px) {
          section .container > div[style*='grid-template-columns: repeat(2'] { grid-template-columns: 1fr !important; }
          section .container > div[style*='grid-template-columns: repeat(4'] { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        }
        @media (max-width: 600px) {
          section .container > div[style*='grid-template-columns: repeat(4'] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
