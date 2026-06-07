import Link from 'next/link';

const values = [
  { icon: '🎯', title: 'Precision First', desc: 'We develop exact technical specifications before any procurement begins.' },
  { icon: '🤝', title: 'OEM Direct', desc: 'Working directly with leading manufacturers ensures authenticity and quality.' },
  { icon: '🔧', title: 'End-to-End Delivery', desc: 'From design to installation, commissioning and annual maintenance.' },
  { icon: '💡', title: 'Tailored Solutions', desc: 'No off-the-shelf kits — every deployment is custom-engineered to your needs.' },
  { icon: '🌐', title: 'Trusted Partners', desc: 'Where our scope extends, we engage vetted partners to close the gap.' },
  { icon: '📋', title: 'Full Accountability', desc: 'Single point of contact, clear SLAs and transparent project management.' },
];

const certifications = ['ISO 9001:2015', 'OEM Authorised Partner', 'System Integration Certified', 'CCTV Solution Provider'];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: 'var(--gradient-hero)', paddingTop: 140, paddingBottom: 80, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: .04, backgroundImage: 'linear-gradient(rgba(255,255,255,.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.8) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="tag" style={{ marginBottom: 20 }}>About Us</div>
          <h1 style={{ fontSize: 'clamp(32px,5vw,56px)', fontWeight: 800, color: 'white', maxWidth: 640, marginBottom: 24 }}>
            We Are <span style={{ color: 'var(--gold)' }}>Visual Connect Network</span>
          </h1>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,.6)', maxWidth: 600, lineHeight: 1.75 }}>
            A specialist system integrator understanding end-user requirements and delivering precision-engineered technology solutions across India.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>
            <div>
              <div className="tag" style={{ marginBottom: 20 }}>Our Mission</div>
              <h2 style={{ fontSize: 'clamp(26px,3.5vw,38px)', fontWeight: 800, marginBottom: 24 }}>Aligning Technology With Purpose</h2>
              <p style={{ color: 'var(--mist)', lineHeight: 1.8, marginBottom: 20 }}>
                We are a system integrator specialising in understanding end-user requirements and delivering tailored solutions by aligning the right products and partners. Our approach focuses on working closely with clients to develop precise technical specifications and ensure seamless project execution.
              </p>
              <p style={{ color: 'var(--mist)', lineHeight: 1.8, marginBottom: 20 }}>
                We work directly with leading OEMs on most of our offerings, so we can deliver reliable, high-quality solutions. For requirements beyond our direct scope, we collaborate with trusted partners to ensure complete and efficient delivery.
              </p>
              <p style={{ color: 'var(--mist)', lineHeight: 1.8 }}>
                By combining technical expertise with strong industry partnerships, we ensure that every solution is aligned with client needs and delivered with precision and reliability.
              </p>
            </div>
            <div style={{ position: 'relative' }}>
              <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=700&q=80" alt="team" style={{ width: '100%', borderRadius: 20, objectFit: 'cover', height: 400 }} />
              <div style={{ position: 'absolute', bottom: -20, right: -20, background: 'var(--ink)', borderRadius: 16, padding: '24px 28px', border: '1px solid rgba(255,255,255,.07)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 800, color: 'var(--gold)' }}>500+</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,.5)', marginTop: 4 }}>Projects Delivered</div>
              </div>
            </div>
          </div>
        </div>
        <style>{`@media(max-width:768px){section>div>div{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* Values */}
      <section className="section" style={{ background: 'var(--fog)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="tag" style={{ marginBottom: 16 }}>Our Values</div>
            <h2 style={{ fontSize: 'clamp(26px,3.5vw,40px)', fontWeight: 800 }}>What Drives Every Decision</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            {values.map(({ icon, title, desc }) => (
              <div key={title} className="card" style={{ padding: 32 }}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>{icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, marginBottom: 10 }}>{title}</h3>
                <p style={{ fontSize: 14, color: 'var(--mist)', lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:900px){section>div>div:last-child{grid-template-columns:repeat(2,1fr)!important;}}@media(max-width:560px){section>div>div:last-child{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* Expertise areas */}
      <section className="section" style={{ background: 'var(--ink)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="tag" style={{ marginBottom: 16 }}>Core Expertise</div>
            <h2 style={{ fontSize: 'clamp(26px,3.5vw,40px)', fontWeight: 800, color: 'white' }}>Nine Solution Verticals</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2, background: 'rgba(255,255,255,.04)', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,.06)' }}>
            {[
              'Test & Measurement Equipment', 'Networking & IT Infrastructure', 'Audio-Visual (AV) Systems',
              'Public Address (PA) Systems', 'CCTV & Security Solutions', 'Computing & Electronics',
              'Power Solutions (UPS/Battery)', 'Office Infrastructure', 'End-to-End System Integration',
            ].map((area, i) => (
              <div key={area} style={{ padding: '28px 24px', borderRight: (i + 1) % 3 !== 0 ? '1px solid rgba(255,255,255,.06)' : 'none', borderBottom: i < 6 ? '1px solid rgba(255,255,255,.06)' : 'none' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--gold)', marginBottom: 12 }} />
                <span style={{ color: 'rgba(255,255,255,.8)', fontSize: 15, fontWeight: 500 }}>{area}</span>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:700px){section>div>div:last-child{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* Certifications */}
      <section className="section-sm">
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="tag" style={{ marginBottom: 20 }}>Credentials</div>
          <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 32 }}>Quality You Can Trust</h3>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            {certifications.map(c => (
              <div key={c} style={{ padding: '14px 28px', border: '1.5px solid var(--gold)', borderRadius: 100, fontSize: 14, fontWeight: 600, color: 'var(--ink)', background: 'var(--gold-dim)' }}>{c}</div>
            ))}
          </div>
          <div style={{ marginTop: 48 }}>
            <Link href="/contact" className="btn btn-dark" style={{ fontSize: 16, padding: '14px 32px' }}>Get In Touch →</Link>
          </div>
        </div>
      </section>
    </>
  );
}