import Link from 'next/link';

const industries = [
  {
    name: 'Government & Defense',
    points: [
      'Secure surveillance, command center AV, and communication infrastructure.',
      'Specification-aligned procurement with strict compliance and delivery standards.',
    ],
  },
  {
    name: 'Education & Research Institutes',
    points: [
      'Laboratory test equipment, campus networking, and digital classroom AV systems.',
      'Integrated deployment for scalable learning and research environments.',
    ],
  },
  {
    name: 'Corporate Offices',
    points: [
      'Conference AV, PA systems, networking backbone, and secure access infrastructure.',
      'Complete office technology and furniture setup support through aligned partners.',
    ],
  },
  {
    name: 'Manufacturing & Industrial Facilities',
    points: [
      'Industrial test equipment, rugged networking, CCTV, and power backup systems.',
      'High-reliability solutions with commissioning and maintenance support.',
    ],
  },
  {
    name: 'Telecom',
    points: [
      'Network-grade switching, routing, monitoring, and security infrastructure.',
      'Support for high-availability systems and distributed operations.',
    ],
  },
  {
    name: 'Healthcare',
    points: [
      'Critical surveillance, communication systems, UPS power continuity, and IT infrastructure.',
      'Precise planning and dependable execution for sensitive operational environments.',
    ],
  },
  {
    name: 'Smart Buildings & Infrastructure',
    points: [
      'Integrated AV, PA, security, networking, and centralized management systems.',
      'Future-ready architectures that simplify operations and improve control.',
    ],
  },
  {
    name: 'Data Centers',
    points: [
      'Core networking, monitoring, power distribution, UPS, and security ecosystem support.',
      'Design-to-acceptance services for performance-driven and resilient deployments.',
    ],
  },
];

export default function IndustriesPage() {
  return (
    <>
      <section style={{ background: 'var(--gradient-hero)', paddingTop: 138, paddingBottom: 74 }}>
        <div className="container">
          <div className="tag" style={{ marginBottom: 18 }}>Industries We Serve</div>
          <h1 style={{ color: 'var(--white)', fontSize: 'clamp(34px, 5vw, 58px)', maxWidth: 820, marginBottom: 20 }}>
            Trusted Across Mission-Critical and High-Performance Environments
          </h1>
          <p style={{ color: 'rgba(255,255,255,.64)', fontSize: 18, maxWidth: 760, lineHeight: 1.8 }}>
            We deliver requirement-led integration solutions aligned to sector-specific standards,
            operational priorities, and long-term scalability.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <div className="tag" style={{ marginBottom: 14 }}>Sector Expertise</div>
            <h2 style={{ fontSize: 'clamp(28px,4vw,42px)' }}>Solutions Built for Real-World Industry Demands</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 22 }}>
            {industries.map((industry) => (
              <article key={industry.name} className="card" style={{ padding: '28px 28px 22px' }}>
                <h3 style={{ marginBottom: 14, fontSize: 23 }}>{industry.name}</h3>
                <ul style={{ listStyle: 'none', display: 'grid', gap: 12 }}>
                  {industry.points.map((point) => (
                    <li key={point} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', color: 'var(--slate)', lineHeight: 1.7 }}>
                      <span style={{ marginTop: 9, width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', flexShrink: 0 }} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--ink)', padding: '84px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="tag" style={{ marginBottom: 18 }}>Need a Tailored Plan?</div>
          <h2 style={{ color: 'var(--white)', fontSize: 'clamp(28px, 4vw, 46px)', marginBottom: 18 }}>
            Let Us Define the Right Technical Roadmap
          </h2>
          <p style={{ color: 'rgba(255,255,255,.6)', maxWidth: 620, margin: '0 auto 34px', lineHeight: 1.8 }}>
            Share your site requirements and objectives. We will build a precise specification,
            map the right products, and deliver with OEM-backed confidence.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/solutions" className="btn btn-outline">Browse Solutions</Link>
            <Link href="/contact" className="btn btn-primary">Talk to Our Team</Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          section .container > div[style*='grid-template-columns: repeat(2'] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
