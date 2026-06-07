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

export default function ContactPage() {
  return (
    <>
      <section style={{ background: 'var(--gradient-hero)', paddingTop: 138, paddingBottom: 74 }}>
        <div className="container">
          <div className="tag" style={{ marginBottom: 18 }}>Contact Us</div>
          <h1 style={{ color: 'var(--white)', fontSize: 'clamp(34px, 5vw, 58px)', maxWidth: 760, marginBottom: 20 }}>
            Connect With Our Integration Experts
          </h1>
          <p style={{ color: 'rgba(255,255,255,.64)', fontSize: 18, maxWidth: 700, lineHeight: 1.8 }}>
            Tell us your requirement. We will align the right products, partners, and execution plan
            to deliver a precise, reliable, end-to-end solution.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr .9fr', gap: 24 }}>
            <div className="card" style={{ padding: 30 }}>
              <div className="tag" style={{ marginBottom: 16 }}>Reach Us Directly</div>
              <h2 style={{ marginBottom: 20, fontSize: 34 }}>Let Us Discuss Your Project</h2>
              <p style={{ color: 'var(--slate)', marginBottom: 24, lineHeight: 1.8 }}>
                For RFQs, technical consultation, or complete infrastructure planning, get in touch using
                the contact points below. We respond quickly with practical and technically sound recommendations.
              </p>

              <div style={{ display: 'grid', gap: 12, marginBottom: 24 }}>
                {contacts.map((contact) => (
                  <a
                    key={contact.value}
                    href={contact.href}
                    style={{
                      border: '1px solid #e5e9f2',
                      borderRadius: 12,
                      padding: '14px 16px',
                      display: 'block',
                      transition: 'all .2s ease',
                    }}
                  >
                    <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--mist)', marginBottom: 2 }}>
                      {contact.label}
                    </div>
                    <div style={{ fontWeight: 600, color: 'var(--ink)' }}>{contact.value}</div>
                  </a>
                ))}
              </div>

              <div style={{ background: 'var(--fog)', border: '1px solid #e7ebf4', borderRadius: 12, padding: 18 }}>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>Preferred Contact Window</div>
                <p style={{ color: 'var(--slate)' }}>
                  Monday to Saturday, 9:30 AM - 7:00 PM IST
                </p>
              </div>
            </div>

            <div className="card-dark" style={{ padding: 30 }}>
              <div className="tag" style={{ marginBottom: 16 }}>How We Help</div>
              <h3 style={{ color: 'var(--white)', fontSize: 30, marginBottom: 16 }}>From Requirement to Delivery</h3>
              <p style={{ color: 'rgba(255,255,255,.6)', marginBottom: 22, lineHeight: 1.8 }}>
                Every project begins with understanding your operational goals and technical constraints.
                We then define specifications and execute with OEM-backed quality.
              </p>

              <ul style={{ listStyle: 'none', display: 'grid', gap: 12, marginBottom: 28 }}>
                {serviceHighlights.map((item) => (
                  <li key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', color: 'rgba(255,255,255,.78)' }}>
                    <span style={{ marginTop: 9, width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', flexShrink: 0 }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div style={{ display: 'grid', gap: 10 }}>
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
        a[href^='tel'], a[href^='mailto'] { text-decoration: none; }
        a[href^='tel']:hover, a[href^='mailto']:hover {
          border-color: var(--gold) !important;
          box-shadow: 0 10px 26px rgba(10,13,20,.08);
          transform: translateY(-1px);
        }
        @media (max-width: 900px) {
          section .container > div[style*='grid-template-columns: 1.1fr .9fr'] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
