'use client';

import Link from 'next/link';

const solutions = ['Enterprise Networking', 'CCTV & PA (Public announcement) System', 'Access Control', 'Video Conferencing', 'Audio Visual Solutions', 'PA System'];
const company = [{ href: '/about', label: 'About Us' }, { href: '/solutions', label: 'Solutions' }, { href: '/industries', label: 'Industries' }, { href: '/contact', label: 'Contact Us' }];

export default function Footer() {
  return (
    <footer className="vcn-footer">
      <div className="container">
        <div className="vcn-footer-grid">
          {/* Brand */}
          <div>
            <div className="vcn-footer-brand">
              <img src="/vcn_logo_without_tagline_horizontalsize.png" alt="Visual Connect Networks Pvt. Ltd." />
            </div>
            <p className="vcn-footer-desc">
              System integrators delivering tailored technology solutions — from CCTV and AV to networking, test equipment, and end-to-end infrastructure.
            </p>
            <div className="vcn-footer-socials">
              {['Li', 'Tw', 'Fb'].map(s => (
                <div key={s} className="vcn-footer-social">{s}</div>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <div>
            <div className="vcn-footer-heading">Solutions</div>
            {solutions.map(s => (
              <Link key={s} href="/solutions" className="vcn-footer-link">
                {s}
              </Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <div className="vcn-footer-heading">Company</div>
            {company.map(({ href, label }) => (
              <Link key={href} href={href} className="vcn-footer-link">
                {label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div className="vcn-footer-heading">Get In Touch</div>
            {[
              { icon: '📞', text: '+91 98765 96016' },
              { icon: '✉️', text: 'sales@vcnpl.net' },
              { icon: '✉️', text: 'info@vcnpl.net' },
            ].map(({ icon, text }) => (
              <div key={text} className="vcn-footer-contact-item">
                <span>{icon}</span>
                <span>{text}</span>
              </div>
            ))}
            <Link href="/contact" className="vcn-footer-cta">
              Request a Quote →
            </Link>
          </div>
        </div>

        <div className="vcn-footer-bottom">
          <span>© 2025 Visual Connect Networks Pvt. Ltd. All rights reserved.</span>
          <span>System Integrators · India</span>
        </div>
      </div>

      <style>{`
        .vcn-footer {
          background: #060810;
          color: var(--silver);
          padding: 72px 0 0;
        }
        .vcn-footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 48px;
          padding-bottom: 56px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .vcn-footer-brand {
          margin-bottom: 18px;
        }
        .vcn-footer-brand img {
          height: 96px;
          width: auto;
          max-width: 120px;
          object-fit: contain;
          display: block;
        }
        .vcn-footer-desc {
          font-size: 13px;
          line-height: 1.8;
          color: rgba(255,255,255,0.3);
          max-width: 280px;
        }
        .vcn-footer-socials {
          display: flex;
          gap: 10px;
          margin-top: 24px;
        }
        .vcn-footer-social {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.07);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          color: rgba(255,255,255,0.35);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
        }
        .vcn-footer-social:hover {
          border-color: rgba(59,108,245,0.3);
          color: var(--blue);
          background: rgba(59,108,245,0.06);
        }
        .vcn-footer-heading {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 12px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: white;
          margin-bottom: 22px;
        }
        .vcn-footer-link {
          display: block;
          font-size: 13.5px;
          color: rgba(255,255,255,0.35);
          margin-bottom: 11px;
          text-decoration: none;
          transition: color 0.25s cubic-bezier(0.4,0,0.2,1), transform 0.25s cubic-bezier(0.4,0,0.2,1);
          position: relative;
        }
        .vcn-footer-link:hover {
          color: var(--blue);
          transform: translateX(3px);
        }
        .vcn-footer-contact-item {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          margin-bottom: 14px;
          font-size: 13.5px;
          color: rgba(255,255,255,0.35);
        }
        .vcn-footer-cta {
          display: inline-flex;
          align-items: center;
          margin-top: 14px;
          background: linear-gradient(135deg, var(--blue) 0%, #2a57d4 100%);
          color: #fff;
          font-size: 12px;
          font-weight: 700;
          padding: 10px 22px;
          border-radius: var(--radius-pill, 100px);
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
          box-shadow: 0 4px 16px rgba(59,108,245,0.2);
        }
        .vcn-footer-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(59,108,245,0.3);
        }
        .vcn-footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 22px 0;
          font-size: 12px;
          color: rgba(255,255,255,0.15);
        }
        @media (max-width: 768px) {
          .vcn-footer-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 480px) {
          .vcn-footer-grid { grid-template-columns: 1fr; }
          .vcn-footer-bottom { flex-direction: column; gap: 6px; text-align: center; }
        }
      `}</style>
    </footer>
  );
}