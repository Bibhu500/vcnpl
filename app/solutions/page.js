import Link from 'next/link';

const solutionGroups = [
  {
    title: 'Test & Measurement Equipment',
    items: [
      'Electronic test instruments',
      'Calibration equipment',
      'RF and communication test equipment',
      'Multimeters',
      'Oscilloscopes',
      'Spectrum analyzers',
      'Signal generators',
      'Power analyzers',
      'Environmental and industrial testing equipment',
      'Other specialized testing equipment',
    ],
  },
  {
    title: 'Networking & IT Infrastructure',
    items: [
      'Switches',
      'Routers',
      'Wireless access points',
      'Network security appliances',
      'Structured cabling solutions',
      'Data center networking equipment',
      'Network monitoring and management solutions',
    ],
  },
  {
    title: 'Audio-Visual (AV) Systems',
    items: [
      'LED displays',
      'Video walls',
      'Interactive flat panels',
      'Projectors and projection systems',
      'Video conferencing systems',
      'Digital signage solutions',
      'AV control systems',
    ],
  },
  {
    title: 'Public Address (PA) Systems',
    items: [
      'Amplifiers',
      'Speakers',
      'Microphones',
      'Paging systems',
      'Conference and discussion systems',
      'Emergency voice evacuation systems',
    ],
  },
  {
    title: 'CCTV & Security Solutions',
    items: [
      'IP cameras',
      'PTZ cameras',
      'Network video recorders (NVRs)',
      'Digital video recorders (DVRs)',
      'Video management software (VMS)',
      'Access control systems',
      'Surveillance storage solutions',
    ],
  },
  {
    title: 'Computing & Electronics',
    items: [
      'Laptops',
      'Desktop computers',
      'Workstations',
      'Monitors and displays',
      'Printers and peripherals',
      'Tablets and handheld devices',
    ],
  },
  {
    title: 'Power Solutions',
    items: [
      'UPS systems',
      'Industrial UPS',
      'Online UPS',
      'Batteries',
      'Battery banks',
      'Power backup solutions',
      'Power distribution units (PDUs)',
    ],
  },
  {
    title: 'Office Infrastructure',
    items: [
      'Modular office furniture',
      'Workstations',
      'Executive furniture',
      'Conference room furniture',
      'Storage solutions',
      'Complete office setup solutions',
    ],
  },
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
  { value: '8', label: 'Product Categories', detail: 'From test equipment to office infrastructure' },
  { value: 'OEM', label: 'Direct Sourcing', detail: 'Authorised partnerships with leading manufacturers' },
  { value: 'End-to-End', label: 'Integration', detail: 'Specification through commissioning & support' },
];

export default function SolutionsPage() {
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

      <section className="section" style={{ background: 'var(--fog)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <div className="tag" style={{ marginBottom: 14 }}>What We Deliver</div>
            <h2 style={{ fontSize: 'clamp(28px,4vw,42px)' }}>Products Across Eight Core Categories</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 22 }}>
            {solutionGroups.map((group) => (
              <article key={group.title} className="card" style={{ padding: '28px 28px 24px' }}>
                <h3 style={{ fontSize: 24, marginBottom: 14 }}>{group.title}</h3>
                <ul style={{ listStyle: 'none', display: 'grid', gap: 10 }}>
                  {group.items.map((item) => (
                    <li key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', color: 'var(--slate)' }}>
                      <span style={{ marginTop: 9, width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', flexShrink: 0 }} />
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
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <div className="tag" style={{ marginBottom: 14 }}>Integration Services</div>
            <h2 style={{ color: 'var(--white)', fontSize: 'clamp(28px,4vw,42px)' }}>
              End-to-End System Integration
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 2, borderRadius: 18, overflow: 'hidden', border: '1px solid rgba(255,255,255,.08)' }}>
            {integrationServices.map((item) => (
              <div key={item} style={{ background: 'rgba(255,255,255,.03)', padding: 20 }}>
                <div style={{ color: 'rgba(255,255,255,.78)', lineHeight: 1.65 }}>{item}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 36, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 14 }}>
            <Link href="/industries" className="btn btn-outline">View Industries</Link>
            <Link href="/contact" className="btn btn-primary">Request Consultation</Link>
          </div>
        </div>
      </section>

      <style>{`
        .solutions-hero {
          position: relative;
          overflow: hidden;
          padding: 120px 0 80px;
          background: linear-gradient(180deg, #f6f8fc 0%, #ffffff 100%);
          border-bottom: 1px solid #e4e8f0;
        }
        .solutions-hero-bg {
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(circle at 85% 15%, rgba(26, 111, 255, 0.06) 0%, transparent 42%),
            radial-gradient(circle at 10% 80%, rgba(201, 168, 76, 0.08) 0%, transparent 38%),
            linear-gradient(rgba(10, 13, 20, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(10, 13, 20, 0.04) 1px, transparent 1px);
          background-size: auto, auto, 48px 48px, 48px 48px;
          pointer-events: none;
        }
        .solutions-hero-inner { position: relative; z-index: 1; }
        .solutions-hero-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 56px;
          align-items: center;
        }
        .solutions-hero-content .tag { margin-bottom: 20px; }
        .solutions-hero-content h1 {
          font-size: clamp(34px, 4.5vw, 52px);
          font-weight: 800;
          color: var(--ink);
          max-width: 620px;
          margin-bottom: 22px;
          line-height: 1.12;
        }
        .solutions-hero-accent { color: var(--gold); }
        .solutions-hero-lead {
          font-size: 18px;
          color: var(--slate);
          max-width: 560px;
          line-height: 1.75;
          margin-bottom: 32px;
        }
        .solutions-hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
        }
        .solutions-hero-stats {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .solutions-stat-card {
          background: var(--white);
          border: 1px solid #e4e8f0;
          border-radius: var(--radius-lg);
          padding: 22px 24px;
          box-shadow: 0 4px 24px rgba(10, 13, 20, 0.04);
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .solutions-stat-card:hover {
          border-color: rgba(201, 168, 76, 0.45);
          box-shadow: 0 8px 32px rgba(10, 13, 20, 0.07);
        }
        .solutions-stat-value {
          font-family: var(--font-display);
          font-size: 28px;
          font-weight: 800;
          color: var(--ink);
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
          .solutions-hero { padding: 100px 0 64px; }
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
