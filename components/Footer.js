'use client';

import Link from 'next/link';

const solutions = ['CCTV & Security', 'Audio-Visual Systems', 'Networking & IT', 'PA Systems', 'Test & Measurement', 'Power Solutions'];
const company = [{ href: '/about', label: 'About Us' }, { href: '/solutions', label: 'Solutions' }, { href: '/industries', label: 'Industries' }, { href: '/contact', label: 'Contact Us' }];

export default function Footer() {
  return (
    <footer style={{ background: 'var(--ink)', color: 'var(--silver)', paddingTop: 72 }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr', gap: 48, paddingBottom: 56, borderBottom: '1px solid rgba(255,255,255,.07)' }}>
          {/* Brand */}
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, color: 'white', marginBottom: 4 }}>Visual Connect</div>
            <div style={{ fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20 }}>Network Pvt. Ltd.</div>
            <p style={{ fontSize: 14, lineHeight: 1.75, color: 'var(--mist)', maxWidth: 280 }}>
              System integrators delivering tailored technology solutions — from CCTV and AV to networking, test equipment, and end-to-end infrastructure.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              {['Li', 'Tw', 'Fb'].map(s => (
                <div key={s} style={{ width: 36, height: 36, borderRadius: 8, border: '1px solid rgba(255,255,255,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: 'var(--mist)', cursor: 'pointer' }}>{s}</div>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, letterSpacing: '.08em', textTransform: 'uppercase', color: 'white', marginBottom: 20 }}>Solutions</div>
            {solutions.map(s => (
              <Link key={s} href="/solutions" style={{ display: 'block', fontSize: 14, color: 'var(--mist)', marginBottom: 10, transition: 'color .2s' }}
                onMouseEnter={e => e.target.style.color = 'var(--gold)'}
                onMouseLeave={e => e.target.style.color = 'var(--mist)'}>
                {s}
              </Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, letterSpacing: '.08em', textTransform: 'uppercase', color: 'white', marginBottom: 20 }}>Company</div>
            {company.map(({ href, label }) => (
              <Link key={href} href={href} style={{ display: 'block', fontSize: 14, color: 'var(--mist)', marginBottom: 10, transition: 'color .2s' }}
                onMouseEnter={e => e.target.style.color = 'var(--gold)'}
                onMouseLeave={e => e.target.style.color = 'var(--mist)'}>
                {label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, letterSpacing: '.08em', textTransform: 'uppercase', color: 'white', marginBottom: 20 }}>Get In Touch</div>
            {[
              { icon: '📞', text: '+91 98765 96016' },
              { icon: '✉️', text: 'sales@vcnpl.net' },
              { icon: '✉️', text: 'info@vcnpl.net' },
            ].map(({ icon, text }) => (
              <div key={text} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 14 }}>
                <span style={{ fontSize: 14 }}>{icon}</span>
                <span style={{ fontSize: 14, color: 'var(--mist)' }}>{text}</span>
              </div>
            ))}
            <Link href="/contact" className="btn btn-primary" style={{ marginTop: 8, fontSize: 13, padding: '10px 20px' }}>
              Request a Quote →
            </Link>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', fontSize: 13, color: 'var(--slate)' }}>
          <span>© 2025 Visual Connect Network Pvt. Ltd. All rights reserved.</span>
          <span>System Integrators · India</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer > div > div:first-child { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          footer > div > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}