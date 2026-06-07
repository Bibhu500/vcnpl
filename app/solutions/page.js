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

export default function SolutionsPage() {
  return (
    <>
      <section style={{ background: 'var(--gradient-hero)', paddingTop: 138, paddingBottom: 74 }}>
        <div className="container">
          <div className="tag" style={{ marginBottom: 18 }}>Products & Solutions</div>
          <h1 style={{ color: 'var(--white)', fontSize: 'clamp(34px, 5vw, 58px)', maxWidth: 840, marginBottom: 22 }}>
            Comprehensive Product Portfolio for Modern Infrastructure
          </h1>
          <p style={{ color: 'rgba(255,255,255,.64)', fontSize: 18, maxWidth: 760, lineHeight: 1.8 }}>
            Direct OEM sourcing, trusted partner collaboration, and technical specification-led delivery
            for complete and reliable system integration.
          </p>
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
