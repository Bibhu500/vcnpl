'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

/* ════════ BRAND ASSETS ════════ */
const LOGO_H = '/vcn_logo_without_tagline_horizontalsize.jpeg';
const LOGO_SQ = '/vcn_logo_with_tagline_squaresize.jpeg';
const COMPANY = 'Visual Connect Network Pvt. Ltd.';

/* ════════ CONTENT (unchanged from source) ════════ */
const NAV = ['Solutions', 'About', 'Process', 'Industries', 'Partners', 'Contact'];

const HERO_SERVICES = [
  { icon: '🔌', t: 'Enterprise Networking', d: 'LAN, SD-WAN, switching & cabling' },
  { icon: '📡', t: 'CCTV & Intelligent Surveillance', d: 'IP cameras, VMS & AI analytics' },
  { icon: '🔐', t: 'Access Control & Security', d: 'Biometrics, RFID & turnstiles' },
  { icon: '🖥️', t: 'Audio Visual (AV) Solutions', d: 'Boardrooms, VC & LED walls' },
];

const HERO_STATS = [
  { value: '8', label: 'Core Solution Areas', detail: 'From networking to smart buildings' },
  { value: 'OEM', label: 'Direct Sourcing', detail: 'Authorised partnerships with leading manufacturers' },
  { value: 'End-to-End', label: 'Integration', detail: 'Consultation through post-sales support' },
];

const PARTNERS = [
  { name: 'Honeywell', logo: '/logos/honeywell.png' },
  { name: 'LG', logo: '/logos/lg.png' },
  { name: 'Yamaha', logo: '/logos/yamaha.png' },
  { name: 'Crestron', logo: '/logos/crestron.png' },
  { name: 'Netgear', logo: '/logos/netgear.png' },
  { name: 'Molex', logo: '/logos/molex.png' },
  { name: 'Kramer', logo: '/logos/kramer.png' },
  { name: 'Audio-Technica', logo: '/logos/audio technica.png' },
  { name: 'Microtek', logo: '/logos/microtek.png' },
  { name: 'Syrotech', logo: '/logos/syrotech.png' },
  { name: 'Peoplelink', logo: '/logos/peoplelink.png' },
  { name: 'Purelink', logo: '/logos/purelink.jpg' },
];

const SOLUTIONS = [
  { icon: '🔌', title: 'Enterprise Networking', desc: 'Wired & wireless LAN, SD-WAN, structured cabling & network security integration.' },
  { icon: '📡', title: 'CCTV & Intelligent Surveillance', desc: 'IP CCTV, thermal imaging, PTZ, AI video analytics & central command monitoring.' },
  { icon: '🖥️', title: 'Audio Visual (AV) Solutions', desc: 'Boardrooms, video conferencing, interactive panels, LED walls & digital signage.' },
  { icon: '🔊', title: 'Public Address & Voice Alarm Systems', desc: 'PA systems, voice evacuation, emergency communication & campus paging.' },
  { icon: '✈️', title: 'Flight Information Display Systems (FIDS)', desc: 'Airport displays, passenger information & digital wayfinding solutions.' },
  { icon: '🔐', title: 'Access Control & Security', desc: 'Biometrics, RFID, boom barriers, turnstiles & visitor management systems.' },
  { icon: '💾', title: 'Data Centre & IT Infrastructure', desc: 'Servers, storage, UPS, precision cooling & complete data centre integration.' },
  { icon: '🏗️', title: 'Smart Building Solutions', desc: 'BMS, IoT monitoring, smart meeting rooms & integrated building automation.' },
];

const PRODUCT_GROUPS = [
  { title: 'Enterprise Networking', icon: '🔌', img: '/categoryimages/enterprise networking.png', desc: 'Enterprise-grade connectivity from edge to core.', items: ['Wired & Wireless LAN Solutions', 'Campus & Branch Networking', 'SD-WAN Solutions', 'Network Switching & Routing', 'Wi-Fi Survey, Design & Deployment', 'Fiber Optic Infrastructure', 'Structured Cabling Solutions', 'Network Security Integration'] },
  { title: 'CCTV & Intelligent Surveillance', icon: '📡', img: '/categoryimages/cctv and pa new.png', desc: 'End-to-end, AI-enabled video surveillance ecosystems.', items: ['IP CCTV Surveillance Systems', 'Thermal Imaging Cameras', 'PTZ & Long-Range Surveillance', 'Video Analytics & AI-Based Monitoring', 'Perimeter Intrusion Detection', 'Central Monitoring & Command Centers', 'Video Management Systems (VMS)'] },
  { title: 'Audio Visual (AV) Solutions', icon: '🖥️', img: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&q=80', desc: 'Immersive collaboration and display solutions.', items: ['Boardroom & Conference Room Solutions', 'Video Conferencing Systems', 'Interactive Flat Panels', 'LED Video Walls', 'Digital Signage Solutions', 'Auditoriums & Training Rooms', 'Collaboration & Presentation Systems'] },
  { title: 'Public Address & Voice Alarm Systems', icon: '🔊', img: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&q=80', desc: 'Crystal-clear audio and emergency communication infrastructure.', items: ['Public Address (PA) Systems', 'Voice Evacuation Systems', 'Emergency Communication Solutions', 'Campus & Industrial Paging Systems'] },
  { title: 'Flight Information Display Systems (FIDS)', icon: '✈️', img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80', desc: 'Passenger information and wayfinding for aviation environments.', items: ['Airport Display Systems', 'Passenger Information Displays', 'Flight Information Integration', 'Digital Wayfinding Solutions'] },
  { title: 'Access Control & Security', icon: '🔐', img: '/categoryimages/access control.png', desc: 'Secure and seamless access management.', items: ['Biometric Access Control', 'Smart Card & RFID Solutions', 'Boom Barriers & Turnstiles', 'Visitor Management Systems', 'Integrated Security Management'] },
  { title: 'Data Centre & IT Infrastructure', icon: '💾', img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80', desc: 'Robust infrastructure for mission-critical IT operations.', items: ['Server & Storage Solutions', 'UPS & Power Backup Systems', 'Rack & Cabinet Solutions', 'Precision Cooling', 'IT Infrastructure Design', 'Data Centre Integration'] },
  { title: 'Smart Building Solutions', icon: '🏗️', img: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=80', desc: 'Connected, automated environments for modern facilities.', items: ['Building Management System (BMS)', 'IoT-Based Monitoring', 'Smart Meeting Rooms', 'Energy Management', 'Integrated Building Automation'] },
];

const INTEGRATION_SERVICES = [
  'Requirement Analysis',
  'Solution Consulting',
  'System Design & Architecture',
  'Technical Specification Development',
  'Bill of Quantity (BOQ) Preparation',
  'Tender & GeM Bid Support',
  'OEM Coordination',
  'Proof of Concept (POC)',
  'Site Survey & Assessment',
  'Project Management',
  'Installation & Commissioning',
  'Testing & Acceptance',
  'User Training',
  'Annual Maintenance Contracts (AMC)',
  'Preventive & Corrective Maintenance',
  'Remote & On-Site Technical Support',
];

const STEPS = [
  { n: '01', title: 'Requirement Analysis', desc: 'Deep-dive sessions to understand your technical and operational objectives.' },
  { n: '02', title: 'Specification Design', desc: 'Precise technical specs and solution blueprints tailored to your environment.' },
  { n: '03', title: 'OEM Sourcing', desc: 'Direct procurement from leading manufacturers — no middlemen, full reliability.' },
  { n: '04', title: 'Installation & Commissioning', desc: 'Expert deployment, testing, acceptance support and handover.' },
];

const INDUSTRIES = [
  { name: 'Government & Public Sector', icon: '🏛️', img: '/sectors/government vcnpl.png', points: ['Secure surveillance, command center AV, and communication.', 'Strict compliance and delivery standards.'] },
  { name: 'Airports & Aviation', icon: '✈️', img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&q=80', points: ['Large-scale CCTV, PA systems, FIDS, and robust networking.', 'High-availability infrastructure for uninterrupted operations.'] },
  { name: 'Smart Cities', icon: '🏙️', img: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=900&q=80', points: ['City-wide surveillance, public address, and command centers.', 'Centralized management and scalable networking backbone.'] },
  { name: 'Corporate Enterprises', icon: '🏢', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80', points: ['Conference AV, networking backbone, and secure access infrastructure.', 'Complete office technology setup support.'] },
  { name: 'Educational Institutions', icon: '🎓', img: '/sectors/education vcnpl.png', points: ['Smart classrooms, interactive panels, and campus networking.', 'Integrated deployment for scalable learning environments.'] },
  { name: 'Healthcare', icon: '🏥', img: '/sectors/healthcare vcnpl.png', points: ['Critical surveillance, communication systems, and IT infrastructure.', 'Precise planning for sensitive operational environments.'] },
  { name: 'Manufacturing', icon: '🏭', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&q=80', points: ['Industrial networking, rugged CCTV, and building automation.', 'High-reliability solutions with commissioning support.'] },
  { name: 'Hospitality', icon: '🏨', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=80', points: ['Guest WiFi, digital signage, AV systems, and security.', 'Seamless technology integration for enhanced guest experiences.'] },
  { name: 'Banking & Financial Institutions', icon: '🏦', img: 'https://images.unsplash.com/photo-1501167733089-ce6f2db1463e?w=900&q=80', points: ['Secure networking, access control, and branch surveillance.', 'Robust IT infrastructure for financial institutions.'] },
  { name: 'Retail & Commercial Spaces', icon: '🛍️', img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=80', points: ['Networking, CCTV, and digital signage across retail environments.', 'Scalable rollouts across multi-location commercial spaces.'] },
];

const WHY_CHOOSE_US = [
  { icon: '🧩', title: 'End-to-End System Integration Expertise', desc: 'Proven capability across networking, security, AV & infrastructure projects.' },
  { icon: '🤝', title: 'Partnerships with Leading Global OEMs', desc: 'Direct partnerships with the world\u2019s leading technology manufacturers.' },
  { icon: '💡', title: 'Customized & Scalable Technology Solutions', desc: 'Solutions engineered to your scale, budget & operational needs.' },
  { icon: '🧠', title: 'Strong Technical Consulting Capabilities', desc: 'Deep expertise in solution design, specification & architecture.' },
  { icon: '👨‍🔧', title: 'Experienced Project Execution Team', desc: 'Certified engineers delivering flawless on-site execution.' },
  { icon: '✅', title: 'High-Quality Standards & Best Practices', desc: 'Every deployment follows rigorous quality & compliance benchmarks.' },
  { icon: '🛠️', title: 'Dedicated After-Sales Support', desc: 'AMC-backed support that keeps your infrastructure running.' },
  { icon: '🎯', title: 'Customer-Centric Approach', desc: 'Every solution is shaped around what you actually need.' },
  { icon: '🚀', title: 'Reliable Delivery, Long-Term Partnerships', desc: 'Built for lasting relationships, not one-off transactions.' },
];

const MISSION_PARAGRAPHS = [
  'Visual Connect Networks Private Limited is a technology-driven System Integrator delivering end-to-end infrastructure and digital transformation solutions for enterprises, government organizations, educational institutions, healthcare facilities, airports, hospitality, and industrial sectors.',
  'We specialize in understanding customer requirements, designing optimized technology solutions, selecting the right products from leading global OEMs, and executing projects with precision — from consultation and design to deployment and post-sales support.',
];

const CLOSING_STATEMENT = 'At Visual Connect Networks Private Limited, we don\u2019t just supply products — we engineer integrated technology solutions that enhance security, connectivity, communication, and operational efficiency while delivering long-term value to our customers.';

const FEATURES = [
  { t: 'OEM Direct', d: 'Direct from leading manufacturers.' },
  { t: 'Single Partner', d: 'One contact for all infrastructure needs.' },
  { t: 'Tailored Design', d: 'Custom specs for your exact environment.' },
  { t: 'End-to-End', d: 'Spec → install → commissioning → AMC.' },
];

const CERTIFICATIONS = ['ISO 9001:2015', 'OEM Authorised Partner', 'System Integration Certified', 'CCTV Solution Provider'];

const CONTACTS = [
  { icon: '📞', label: 'Call Us', value: '+91 98765 96016', sub: 'Mon–Sat, 9:30AM–7PM IST', href: 'tel:+919876596016' },
  { icon: '✉️', label: 'Sales Email', value: 'sales@vcnpl.net', sub: 'Response within 24 hours', href: 'mailto:sales@vcnpl.net' },
  { icon: '📬', label: 'General Enquiries', value: 'info@vcnpl.net', sub: 'Partnerships & information', href: 'mailto:info@vcnpl.net' },
];

const SERVICE_HIGHLIGHTS = [
  'Requirement analysis and technical consultation',
  'Product sourcing from leading OEMs',
  'Installation, commissioning, and acceptance support',
  'Project coordination and annual maintenance support',
];

/* ════════ NEW: DEPLOYMENT PORTFOLIO (metrics-led, not testimonials) ════════ */
const PORTFOLIO = [
  { sector: 'Government', icon: '🏛️', title: 'City Surveillance & Command Center Rollout', scope: '1,200+ IP camera endpoints across 40 municipal sites', metric1: { v: '40', l: 'Sites integrated' }, metric2: { v: '99.6%', l: 'Uptime SLA met' }, metric3: { v: '11 wks', l: 'Spec to go-live' } },
  { sector: 'Education', icon: '🎓', title: 'Campus-Wide Smart Classroom Upgrade', scope: '85 interactive panels, lecture capture & unified campus WiFi', metric1: { v: '85', l: 'Classrooms fitted' }, metric2: { v: '3,600+', l: 'Concurrent WiFi users' }, metric3: { v: '6 wks', l: 'Term-break delivery' } },
  { sector: 'Corporate', icon: '🏢', title: 'HQ Networking & Conferencing Backbone', scope: 'Enterprise switching, access control & 22 VC-enabled rooms', metric1: { v: '22', l: 'VC rooms live' }, metric2: { v: '100%', l: 'Access-controlled floors' }, metric3: { v: '4 wks', l: 'Zero-downtime cutover' } },
  { sector: 'Healthcare', icon: '🏥', title: 'Critical-Care Facility Infrastructure', scope: 'Redundant networking, surveillance & paging for a multi-block hospital', metric1: { v: '6', l: 'Blocks networked' }, metric2: { v: 'N+1', l: 'Power & link redundancy' }, metric3: { v: '24×7', l: 'Commissioning support' } },
];

/* ════════ NEW: SUPPORT & SLA TIERS ════════ */
const SUPPORT_TIERS = [
  { name: 'Standard AMC', tag: 'Included with every deployment', response: '48 hrs', window: 'Mon–Sat, 9:30 AM – 7 PM IST', visits: '2 preventive visits / year', coverage: ['Break-fix support', 'Firmware & health checks', 'Spares coordination with OEM'] },
  { name: 'Priority AMC', tag: 'Recommended for live operations', response: '12 hrs', window: 'Every day, 8 AM – 10 PM IST', visits: '4 preventive visits / year', coverage: ['Everything in Standard', 'Remote monitoring & alerts', 'Priority spares dispatch'] },
  { name: 'Enterprise AMC', tag: 'For mission-critical sites', response: '4 hrs', window: '24×7×365', visits: 'Onsite engineer on retainer', coverage: ['Everything in Priority', 'Dedicated account engineer', 'Quarterly infra health report'] },
];

/* ════════ MOTION PRESETS ════════ */
const ease = [0.16, 1, 0.3, 1];
const fadeUp = { hidden: { opacity: 0, y: 34, filter: 'blur(6px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease } } };
const fadeScale = { hidden: { opacity: 0, scale: 0.88, filter: 'blur(8px)' }, show: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.7, ease } } };
const slideLeft = { hidden: { opacity: 0, x: -46 }, show: { opacity: 1, x: 0, transition: { duration: 0.7, ease } } };
const slideRight = { hidden: { opacity: 0, x: 46 }, show: { opacity: 1, x: 0, transition: { duration: 0.7, ease } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } };
const viewportOnce = { once: true, amount: 0.2, margin: '-60px' };

function Reveal({ children, className, as: Tag = motion.div, delay = 0, variant = fadeUp, style }) {
  return (
    <Tag className={className} style={style} initial="hidden" whileInView="show" viewport={viewportOnce}
      variants={variant} transition={{ duration: 0.7, ease, delay }}>
      {children}
    </Tag>
  );
}

function Stagger({ children, className }) {
  return (
    <motion.div className={className} initial="hidden" whileInView="show" viewport={viewportOnce} variants={stagger}>
      {children}
    </motion.div>
  );
}

function Kicker({ text, dark }) {
  return (
    <motion.span className={`kicker${dark ? ' kicker-dark' : ''}`} initial="hidden" whileInView="show" viewport={viewportOnce}
      variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}>
      <span className="kicker-bracket">[</span>{text}<span className="kicker-bracket">]</span>
    </motion.span>
  );
}

/* ════════ COMPONENT ════════ */
export default function VCNPLPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [activeIndustry, setActiveIndustry] = useState(0);
  const [activeTier, setActiveTier] = useState(1);
  const { scrollYProgress } = useScroll();
  const heroParallax = useTransform(scrollYProgress, [0, 0.15], [0, -60]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const goto = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const activeInd = INDUSTRIES[activeIndustry];

  return (
    <div className="vcn">
      {/* ── SIGNAL PROGRESS BAR ── */}
      <motion.div className="scroll-bar" style={{ scaleX: scrollYProgress }} />

      {/* ── NAV ── */}
      <div className="nav-wrap">
        <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
          <button className="nav-logo brk" onClick={() => goto('home')} aria-label="Home">
            <Image src={LOGO_H} alt={COMPANY} width={150} height={32} priority style={{ height: 30, width: 'auto' }} />
          </button>
          <div className="nav-links">
            {NAV.map(n => (
              <a key={n} href={`#${n.toLowerCase()}`} onClick={(e) => { e.preventDefault(); goto(n.toLowerCase()); }}>
                <span className="nav-dot" />{n}
              </a>
            ))}
          </div>
          <a href="#contact" className="btn-signal nav-cta-desktop" onClick={(e) => { e.preventDefault(); goto('contact'); }}>
            Get Started
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="13" height="13"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
          </a>
          <button className="ham-btn brk" onClick={() => setMenuOpen(v => !v)} aria-label="Menu" aria-expanded={menuOpen}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></> : <><line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="17" x2="21" y2="17" /></>}
            </svg>
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div className="mob-menu" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.22, ease }}>
            {NAV.map(n => (
              <a key={n} href={`#${n.toLowerCase()}`} onClick={(e) => { e.preventDefault(); goto(n.toLowerCase()); }}>{n}</a>
            ))}
            <a href="#contact" className="btn-signal" onClick={(e) => { e.preventDefault(); goto('contact'); }}>Get Started</a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ── */}
      <section className="hero" id="home">
        <div className="hero-aurora" aria-hidden="true" />
        <div className="hero-grid-bg" aria-hidden="true" />
        <motion.div className="hero-net" aria-hidden="true" style={{ y: heroParallax }}>
          <svg viewBox="0 0 800 520" preserveAspectRatio="xMidYMid slice">
            <g className="net-lines" fill="none" stroke="url(#netGrad)" strokeWidth="1.4">
              <path d="M60 420 L230 300 L410 360 L610 220 L740 110" />
              <path d="M230 300 L340 130 L610 220" />
              <path d="M410 360 L520 470 L680 400" />
              <path d="M60 420 L180 480" />
            </g>
            <defs>
              <linearGradient id="netGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#5EEAD4" /><stop offset="55%" stopColor="#8B7CF6" /><stop offset="100%" stopColor="#F0A857" />
              </linearGradient>
            </defs>
            {[[60, 420], [230, 300], [410, 360], [610, 220], [740, 110], [340, 130], [520, 470], [680, 400], [180, 480]].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="4.5" className="net-node" style={{ animationDelay: `${i * 0.3}s` }} />
            ))}
          </svg>
        </motion.div>

        <div className="hero-inner">
          <div className="hero-layout">
            <div className="hero-main">
              <motion.div className="hero-badge" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
                <span className="hero-badge-dot" /> India&apos;s Most Trusted Technology Integration Specialists
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease, delay: 0.08 }}>
                Enterprise Technology Solutions That <em>Connect, Protect &amp; Perform</em>
              </motion.h1>

              <motion.p className="hero-sub" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease, delay: 0.18 }}>
                End-to-end integration for CCTV, AV, networking, PA systems, test equipment,
                and infrastructure — delivered through direct OEM partnerships and specification-led execution.
              </motion.p>

              <motion.div className="hero-btns" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease, delay: 0.28 }}>
                <a href="#solutions" className="btn-signal btn-lg" onClick={(e) => { e.preventDefault(); goto('solutions'); }}>
                  Explore Solutions
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
                </a>
                <a href="#contact" className="btn-ghost btn-lg" onClick={(e) => { e.preventDefault(); goto('contact'); }}>Request Consultation</a>
              </motion.div>

              <motion.div className="hero-stats" initial="hidden" animate="show" variants={stagger} transition={{ delayChildren: 0.4 }}>
                {HERO_STATS.map(s => (
                  <motion.div key={s.label} className="hero-stat" variants={fadeUp}>
                    <div className="hero-stat-v">{s.value}</div>
                    <div className="hero-stat-l">{s.label}</div>
                    <div className="hero-stat-d">{s.detail}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <motion.div className="hero-panel" initial={{ opacity: 0, x: 30, rotateY: 8 }} animate={{ opacity: 1, x: 0, rotateY: 0 }} transition={{ duration: 0.8, ease, delay: 0.24 }}>
              <div className="hero-panel-card brk">
                <div className="hero-panel-head">
                  <h3>Core Service Verticals</h3>
                  <span className="mono-chip">{SOLUTIONS.length} Categories</span>
                </div>
                <div className="hero-services-grid">
                  {HERO_SERVICES.map((c, i) => (
                    <motion.div key={c.t} className="hero-svc-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease, delay: 0.5 + i * 0.08 }}>
                      <div className="hero-svc-icon">{c.icon}</div>
                      <h5>{c.t}</h5>
                      <p>{c.d}</p>
                    </motion.div>
                  ))}
                </div>
                <div className="hero-panel-foot"><span className="signal-dot" /><strong>100% OEM direct sourcing</strong></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SOLUTIONS ── */}
      <section className="sec" id="solutions">
        <div className="inner">
          <Reveal className="sec-head">
            <Kicker text="What We Offer" />
            <h2>Complete Technology Solutions</h2>
            <p>One partner, eight core solution areas, zero compromise — from networking to smart buildings.</p>
          </Reveal>
          <Stagger className="g4">
            {SOLUTIONS.map((s, i) => (
              <motion.div key={s.title} className="sol-card brk" variants={fadeScale} whileHover={{ y: -8 }}>
                <div className="sol-top">
                  <div className="sol-icon">{s.icon}</div>
                  <span className="idx-tag">{String(i + 1).padStart(2, '0')}/{SOLUTIONS.length}</span>
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <span className="trace" />
                <span className="sol-glow" />
              </motion.div>
            ))}
          </Stagger>
          <Reveal className="center-btn-wrap">
            <button className="btn-ghost btn-lg" onClick={() => { setShowProducts(p => !p); setTimeout(() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }), 120); }}>
              {showProducts ? 'Hide Product Catalogue ↑' : 'Check All Products & Categories →'}
            </button>
          </Reveal>
        </div>
      </section>

      <AnimatePresence>
        {showProducts && (
          <motion.section className="prod-section" id="products"
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease }} style={{ overflow: 'hidden' }}>
            <div className="inner">
              <Reveal className="sec-head">
                <Kicker text="Full Catalogue" />
                <h2>Products Across 8 Core Categories</h2>
                <p>Direct OEM sourcing and specification-led delivery across every product line.</p>
              </Reveal>
              <Stagger className="prod-grid">
                {PRODUCT_GROUPS.map(g => (
                  <motion.div key={g.title} className="prod-card brk" variants={fadeUp} whileHover={{ y: -6 }}>
                    <div className="prod-img">
                      <img src={g.img} alt={g.title} loading="lazy" />
                    </div>
                    <div className="prod-body">
                      <div className="prod-ico">{g.icon}</div>
                      <h3>{g.title}</h3>
                      <p className="pdesc">{g.desc}</p>
                      <ul>{g.items.map(it => <li key={it}><span className="pdot" />{it}</li>)}</ul>
                    </div>
                  </motion.div>
                ))}
              </Stagger>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── INTEGRATION SERVICES ── */}
      <section className="sec sec-alt">
        <div className="inner">
          <Reveal className="sec-head">
            <Kicker text="Integration Services" dark />
            <h2>End-to-End System Integration</h2>
          </Reveal>
          <Stagger className="int-grid">
            {INTEGRATION_SERVICES.map((item, i) => (
              <motion.div key={item} className="int-card" variants={slideLeft}>
                <span className="int-num">{String(i + 1).padStart(2, '0')}</span>
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8.5l3 3 7-7" /></svg>
                {item}
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="sec" id="about">
        <div className="inner">
          <div className="about-grid">
            <Reveal as={motion.div} className="about-img-wrap brk" variant={slideLeft}>
              <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&q=80" alt="VCNPL Team" loading="lazy" />
              <div className="about-badge"><div className="val">500+</div><div className="lbl">Projects Delivered</div></div>
            </Reveal>
            <Reveal as={motion.div} className="about-copy" variant={slideRight} delay={0.1}>
              <Kicker text="About Us" />
              <h2>We Are <em>Visual Connect Network</em></h2>
              <p className="lead">A specialist system integrator understanding end-user requirements and delivering precision-engineered technology solutions across India.</p>
              <h4 className="sub-h">Aligning Technology With Purpose</h4>
              {MISSION_PARAGRAPHS.map((p, i) => <p key={i}>{p}</p>)}
              <div className="feat-grid">
                {FEATURES.map(f => <div key={f.t} className="feat"><h4>{f.t}</h4><p>{f.d}</p></div>)}
              </div>
              <div className="cert-row">
                {CERTIFICATIONS.map(c => <span key={c} className="cert-pill">{c}</span>)}
              </div>
              <div className="about-close"><span className="about-close-mark">"</span>{CLOSING_STATEMENT}</div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="sec sec-alt">
        <div className="inner">
          <Reveal className="sec-head">
            <Kicker text="Why Choose Us" dark />
            <h2>The VCNPL Advantage</h2>
            <p>Delivering excellence through expertise, partnerships, and commitment.</p>
          </Reveal>
          <Stagger className="val-grid">
            {WHY_CHOOSE_US.map(v => (
              <motion.div key={v.title} className="val-card brk" variants={fadeScale} whileHover={{ y: -6, rotate: -0.5 }}>
                <div className="val-icon">{v.icon}</div>
                <h4>{v.title}</h4>
                <p>{v.desc}</p>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── NEW: DEPLOYMENT PORTFOLIO ── */}
      <section className="sec" id="portfolio">
        <div className="inner">
          <Reveal className="sec-head">
            <Kicker text="Deployment Portfolio" />
            <h2>What We&apos;ve Actually Shipped</h2>
            <p>Representative deployments across sectors — scoped, delivered, and supported end-to-end.</p>
          </Reveal>
          <Stagger className="portfolio-grid">
            {PORTFOLIO.map(p => (
              <motion.div key={p.title} className="portfolio-card brk" variants={fadeUp} whileHover={{ y: -6 }}>
                <div className="portfolio-top">
                  <span className="portfolio-icon">{p.icon}</span>
                  <span className="portfolio-sector">{p.sector}</span>
                </div>
                <h3>{p.title}</h3>
                <p className="portfolio-scope">{p.scope}</p>
                <div className="portfolio-metrics">
                  <div className="pm"><span className="pm-v">{p.metric1.v}</span><span className="pm-l">{p.metric1.l}</span></div>
                  <div className="pm"><span className="pm-v">{p.metric2.v}</span><span className="pm-l">{p.metric2.l}</span></div>
                  <div className="pm"><span className="pm-v">{p.metric3.v}</span><span className="pm-l">{p.metric3.l}</span></div>
                </div>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="sec sec-alt" id="process">
        <div className="inner">
          <Reveal className="sec-head">
            <Kicker text="How We Work" dark />
            <h2>Our Integration Process</h2>
            <p>A rigorous four-step methodology that delivers precision from day one.</p>
          </Reveal>
          <div className="proc-track">
            <motion.div className="proc-line" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={viewportOnce} transition={{ duration: 1.2, ease }} />
            <Stagger className="proc-grid">
              {STEPS.map((s) => (
                <motion.div key={s.n} className="proc-step brk" variants={fadeUp} whileHover={{ y: -6 }}>
                  <div className="step-num">{s.n}</div>
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </motion.div>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="sec" id="industries">
        <div className="inner">
          <Reveal className="sec-head">
            <Kicker text="Sector Expertise" />
            <h2>Trusted Across Industries</h2>
            <p>Requirement-led solutions aligned to sector-specific standards and long-term scalability.</p>
          </Reveal>

          <Reveal className="ind-tabs-wrap">
            <div className="ind-tabs" role="tablist" aria-label="Industry sectors">
              {INDUSTRIES.map((ind, i) => (
                <button key={ind.name} type="button" role="tab" aria-selected={activeIndustry === i}
                  className={`ind-tab${activeIndustry === i ? ' active' : ''}`} onClick={() => setActiveIndustry(i)}>
                  {activeIndustry === i && (
                    <motion.span className="ind-tab-bg" layoutId="ind-tab-bg" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />
                  )}
                  <span className="ind-tab-label"><span aria-hidden="true">{ind.icon}</span>{ind.name}</span>
                </button>
              ))}
            </div>
          </Reveal>

          <div className="ind-panel brk">
            <AnimatePresence mode="wait">
              <motion.div key={activeInd.name} className="ind-panel-img"
                initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease }}>
                <img src={activeInd.img} alt={activeInd.name} loading="lazy" />
                <div className="ind-panel-img-overlay" />
              </motion.div>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.div key={activeInd.name + '-body'} className="ind-panel-body"
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.35 }}>
                <div className="ind-panel-icon">{activeInd.icon}</div>
                <h3>{activeInd.name}</h3>
                <ul>{activeInd.points.map(pt => <li key={pt}><span className="idot" />{pt}</li>)}</ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── NEW: SUPPORT & SLA ── */}
      <section className="sec sec-alt" id="support">
        <div className="inner">
          <Reveal className="sec-head">
            <Kicker text="After You Go Live" dark />
            <h2>Support &amp; SLA Tiers</h2>
            <p>Infrastructure only earns trust if it stays up. Pick the response window your operation needs.</p>
          </Reveal>
          <div className="tier-tabs">
            {SUPPORT_TIERS.map((t, i) => (
              <button key={t.name} className={`tier-tab${activeTier === i ? ' active' : ''}`} onClick={() => setActiveTier(i)}>{t.name}</button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={activeTier} className="tier-panel brk" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35, ease }}>
              <div className="tier-head">
                <div>
                  <h3>{SUPPORT_TIERS[activeTier].name}</h3>
                  <span className="tier-tag">{SUPPORT_TIERS[activeTier].tag}</span>
                </div>
                <div className="tier-response"><span className="tier-response-v">{SUPPORT_TIERS[activeTier].response}</span><span className="tier-response-l">Response time</span></div>
              </div>
              <div className="tier-grid">
                <div className="tier-stat"><span className="tier-stat-l">Support Window</span><span className="tier-stat-v">{SUPPORT_TIERS[activeTier].window}</span></div>
                <div className="tier-stat"><span className="tier-stat-l">Preventive Visits</span><span className="tier-stat-v">{SUPPORT_TIERS[activeTier].visits}</span></div>
              </div>
              <ul className="tier-coverage">
                {SUPPORT_TIERS[activeTier].coverage.map(c => <li key={c}><span className="idot" />{c}</li>)}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── PARTNERS ── */}
      <section className="partners-sec" id="partners">
        <div className="inner">
          <Reveal className="sec-head" style={{ marginBottom: 0 }}>
            <Kicker text="Our Partners" />
            <h2>Trusted OEM Partners</h2>
            <p>We work directly with industry-leading manufacturers to deliver authentic, high-performance solutions.</p>
          </Reveal>
        </div>
        <div className="marquee">
          <div className="marquee-track">
            {[...PARTNERS, ...PARTNERS].map((p, i) => (
              <div key={i} className="p-chip brk" title={p.name}>
                <img src={p.logo} alt={p.name} loading="lazy" onError={e => { e.currentTarget.closest('.p-chip').style.display = 'none'; }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA / CONTACT ── */}
      <section className="cta-sec" id="contact">
        <div className="cta-glow" aria-hidden="true" />
        <div className="inner">
          <Reveal className="cta-head">
            <Kicker text="Ready to Get Started?" dark />
            <h2>Let&apos;s Build Your Ideal Solution</h2>
            <p>Share your requirements and we&apos;ll craft a precise technical specification with the right products and partners.</p>
            <div className="cta-btns">
              <a href="mailto:sales@vcnpl.net" className="btn-signal btn-lg">✉️ Request Free Consultation</a>
              <a href="tel:+919876596016" className="btn-ghost btn-lg light">📞 +91 98765 96016</a>
            </div>
          </Reveal>

          <div className="contact-layout">
            <Stagger className="contact-grid">
              {CONTACTS.map(c => (
                <motion.a key={c.value} href={c.href} className="contact-card brk" variants={fadeUp} whileHover={{ y: -6 }}>
                  <div className="cc-icon">{c.icon}</div>
                  <div className="cc-lbl">{c.label}</div>
                  <div className="cc-val">{c.value}</div>
                  <div className="cc-sub">{c.sub}</div>
                </motion.a>
              ))}
            </Stagger>

            <Reveal className="help-card" delay={0.1}>
              <h4>How We Help</h4>
              <ul>{SERVICE_HIGHLIGHTS.map(h => <li key={h}><span className="idot" />{h}</li>)}</ul>
              <div className="help-window"><strong>Preferred Contact Window</strong><span>Monday to Saturday, 9:30 AM – 7:00 PM IST</span></div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="footer-inner">
          <div className="footer-top">
            <div>
              <div className="ft-brand"><Image src={LOGO_SQ} alt={COMPANY} width={100} height={80} style={{ height: 80, width: 'auto', objectFit: 'contain' }} /></div>
              <p className="ft-desc">System integrators delivering tailored technology solutions — CCTV, AV, networking, test equipment, and end-to-end infrastructure.</p>
            </div>
            <div className="ft-col">
              <h5>Solutions</h5>
              {['Enterprise Networking', 'CCTV & PA (Public announcement) System', 'Access Control', 'Video Conferencing', 'Audio Visual Solutions', 'PA System'].map(l => (
                <a key={l} href="#solutions" onClick={(e) => { e.preventDefault(); goto('solutions'); }}>{l}</a>
              ))}
            </div>
            <div className="ft-col">
              <h5>Company</h5>
              {[['Home', 'home'], ['About Us', 'about'], ['Solutions', 'solutions'], ['Industries', 'industries'], ['Partners', 'partners'], ['Contact', 'contact']].map(([l, h]) => (
                <a key={l} href={`#${h}`} onClick={(e) => { e.preventDefault(); goto(h); }}>{l}</a>
              ))}
            </div>
            <div className="ft-col ft-contact">
              <h5>Get In Touch</h5>
              <span>📞 +91 98765 96016</span>
              <span>✉️ sales@vcnpl.net</span>
              <span>✉️ info@vcnpl.net</span>
              <span>📍 India</span>
              <a href="#contact" className="ft-quote" onClick={(e) => { e.preventDefault(); goto('contact'); }}>Request a Quote →</a>
            </div>
          </div>
          <div className="footer-bot">
            <span>© 2025 {COMPANY} All rights reserved.</span>
            <span>System Integrators · India</span>
          </div>
        </div>
      </footer>

      <style>{CSS}</style>
    </div>
  );
}

/* ════════ STYLES — mobile-first, single futuristic "signal-grid" theme ════════ */
const CSS = `
.vcn{
  /* ── ONE THEME, USED THROUGHOUT — deep-space base + cyan→violet→amber signal gradient ── */
  --void:#05070C; --void-soft:#080B14; --void-alt:#0A0E1A;
  --panel:rgba(255,255,255,.035); --panel-hover:rgba(255,255,255,.06);
  --line:rgba(150,170,255,.14); --line-bright:rgba(150,170,255,.32);
  --cyan:#5EEAD4; --violet:#8B7CF6; --amber:#F0A857;
  --grad-signal:linear-gradient(120deg,var(--cyan),var(--violet) 55%,var(--amber));
  --grad-signal-soft:linear-gradient(120deg,rgba(94,234,212,.16),rgba(139,124,246,.16) 55%,rgba(240,168,87,.16));
  --grad-cta:radial-gradient(ellipse 70% 60% at 50% 0%,rgba(139,124,246,.22),transparent 65%),linear-gradient(180deg,#05070C,#0A0E1A);
  --text-hi:#F5F7FC; --text-mid:rgba(245,247,252,.64); --text-dim:rgba(245,247,252,.4);
  --radius-sm:8px; --radius:16px; --radius-lg:24px; --radius-pill:999px;
  --shadow-sm:0 2px 20px rgba(0,0,0,.3); --shadow-md:0 18px 46px rgba(0,0,0,.45);
  --shadow-lg:0 30px 70px rgba(0,0,0,.55); --shadow-glow:0 0 0 1px rgba(139,124,246,.25),0 18px 46px rgba(139,124,246,.12);
  --ease:cubic-bezier(.16,1,.3,1);
  --font-display:var(--font-space-grotesk),ui-sans-serif,system-ui,sans-serif;
  --font-body:var(--font-inter),ui-sans-serif,system-ui,sans-serif;
  --font-mono:ui-monospace,'SF Mono',Menlo,Consolas,monospace;
  font-family:var(--font-body); color:var(--text-mid); background:var(--void);
  -webkit-font-smoothing:antialiased;
}
.vcn *{box-sizing:border-box}
.vcn h1,.vcn h2,.vcn h3,.vcn h4,.vcn h5{font-family:var(--font-display);color:var(--text-hi);margin:0;letter-spacing:-.02em}
.vcn p{margin:0}
.vcn [id]{scroll-margin-top:84px}
.vcn img{max-width:100%;display:block}
.vcn a{-webkit-tap-highlight-color:transparent}
.vcn :focus-visible{outline:2px solid var(--cyan);outline-offset:3px;border-radius:4px}
.vcn .inner{max-width:1200px;margin:0 auto;padding:0 18px}
.vcn .sec{padding:64px 0;position:relative;background:var(--void)}
.vcn .sec-alt{background:var(--void-alt)}
.vcn .sec-head{text-align:center;max-width:680px;margin:0 auto 34px}

/* KICKER — the "3x" heading label, now a real typographic moment */
.vcn .kicker{display:inline-flex;align-items:baseline;gap:8px;font-family:var(--font-mono);font-weight:700;letter-spacing:-.01em;font-size:clamp(26px,5.6vw,38px);line-height:1;margin-bottom:14px;background:var(--grad-signal);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;background-size:200% auto;animation:signalShift 7s ease-in-out infinite}
.vcn .kicker-bracket{-webkit-text-fill-color:var(--text-dim);color:var(--text-dim);font-weight:400}
@keyframes signalShift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
.vcn .sec-head h2{font-size:clamp(30px,6vw,52px);font-weight:600;line-height:1.08;margin-top:4px}
.vcn .sec-head p{font-size:14.5px;color:var(--text-dim);line-height:1.7;margin-top:14px}
.vcn .mono-chip{font-family:var(--font-mono);font-size:10.5px;font-weight:600;letter-spacing:.04em;color:var(--void);background:var(--grad-signal);padding:5px 11px;border-radius:var(--radius-pill)}
.vcn .signal-dot{width:7px;height:7px;border-radius:50%;background:var(--cyan);flex-shrink:0;box-shadow:0 0 0 3px rgba(94,234,212,.16),0 0 12px rgba(94,234,212,.6)}

/* signature: viewfinder brackets — now glow with the signal gradient */
.vcn .brk{position:relative}
.vcn .brk::before,.vcn .brk::after{content:'';position:absolute;width:16px;height:16px;border-color:var(--cyan);border-style:solid;opacity:0;transition:opacity .3s var(--ease),transform .3s var(--ease);pointer-events:none;z-index:2;filter:drop-shadow(0 0 6px rgba(94,234,212,.7))}
.vcn .brk::before{top:-1px;left:-1px;border-width:2px 0 0 2px;border-top-left-radius:4px}
.vcn .brk::after{bottom:-1px;right:-1px;border-width:0 2px 2px 0;border-bottom-right-radius:4px;border-color:var(--amber);filter:drop-shadow(0 0 6px rgba(240,168,87,.7))}
.vcn .brk:hover::before,.vcn .brk:hover::after,.vcn .brk:focus-visible::before,.vcn .brk:focus-visible::after{opacity:1}
.vcn .brk:hover::before{transform:translate(-3px,-3px)}
.vcn .brk:hover::after{transform:translate(3px,3px)}
.vcn .hero-panel-card.brk::before,.vcn .hero-panel-card.brk::after,
.vcn .about-img-wrap.brk::before,.vcn .about-img-wrap.brk::after,
.vcn .ind-panel.brk::before,.vcn .ind-panel.brk::after,
.vcn .tier-panel.brk::before,.vcn .tier-panel.brk::after{opacity:.75}

/* SCROLL SIGNAL BAR */
.vcn .scroll-bar{position:fixed;top:0;left:0;right:0;height:2px;background:var(--grad-signal);transform-origin:0% 50%;z-index:300;box-shadow:0 0 12px rgba(139,124,246,.6)}

/* NAV */
.vcn .nav-wrap{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;justify-content:center;padding:12px 14px 0}
.vcn .nav{width:100%;max-width:1080px;display:grid;grid-template-columns:auto 1fr auto auto;align-items:center;gap:6px;background:rgba(8,11,20,.6);backdrop-filter:blur(20px) saturate(1.6);border:1px solid var(--line);border-radius:var(--radius);height:56px;padding:0 8px 0 14px;transition:all .35s var(--ease)}
.vcn .nav.scrolled{background:rgba(8,11,20,.88);box-shadow:var(--shadow-md);border-color:var(--line-bright)}
.vcn .nav-logo{background:rgba(255,255,255,.9);border:none;cursor:pointer;padding:6px 8px;display:flex;border-radius:8px}
.vcn .nav-links{display:flex;justify-content:center;gap:2px}
.vcn .nav-links a{display:flex;align-items:center;gap:6px;color:var(--text-mid);font-size:13px;font-weight:600;text-decoration:none;padding:8px 12px;border-radius:8px;transition:all .2s var(--ease)}
.vcn .nav-dot{width:4px;height:4px;border-radius:50%;background:var(--cyan);opacity:0;transition:opacity .2s var(--ease)}
.vcn .nav-links a:hover{color:var(--text-hi);background:var(--panel)}
.vcn .nav-links a:hover .nav-dot{opacity:1}
.vcn .btn-signal{background:var(--grad-signal);color:var(--void);font-size:12.5px;font-weight:800;padding:10px 18px;border-radius:9px;text-decoration:none;display:inline-flex;align-items:center;gap:7px;border:none;cursor:pointer;transition:transform .25s var(--ease),box-shadow .25s var(--ease);background-size:180% auto}
.vcn .btn-signal:hover{transform:translateY(-2px);box-shadow:0 10px 26px rgba(139,124,246,.35);background-position:100% 50%}
.vcn .btn-signal svg{transition:transform .25s var(--ease)}
.vcn .btn-signal:hover svg{transform:translateX(2px)}
.vcn .nav-cta-desktop{display:none}
.vcn .ham-btn{background:transparent;border:1px solid var(--line);border-radius:9px;cursor:pointer;padding:9px;color:var(--text-hi);display:flex;align-items:center;justify-content:center}
.vcn .mob-menu{position:fixed;top:74px;left:14px;right:14px;z-index:99;background:rgba(8,11,20,.97);backdrop-filter:blur(24px);border:1px solid var(--line);border-radius:var(--radius);padding:12px;display:flex;flex-direction:column;gap:2px;box-shadow:var(--shadow-lg)}
.vcn .mob-menu a{color:var(--text-mid);font-size:15px;font-weight:600;text-decoration:none;padding:13px 16px;border-radius:9px;text-align:center}
.vcn .mob-menu a:hover{background:var(--panel);color:var(--cyan)}
.vcn .mob-menu .btn-signal{justify-content:center;margin-top:6px}

/* HERO */
.vcn .hero{position:relative;overflow:hidden;padding:0 16px;background:var(--void);border-bottom:1px solid var(--line)}
.vcn .hero-aurora{position:absolute;inset:0;background:radial-gradient(ellipse 55% 45% at 18% 8%,rgba(94,234,212,.16),transparent 60%),radial-gradient(ellipse 50% 45% at 88% 18%,rgba(139,124,246,.18),transparent 60%),radial-gradient(ellipse 45% 40% at 50% 95%,rgba(240,168,87,.09),transparent 60%);pointer-events:none}
.vcn .hero-grid-bg{position:absolute;inset:0;background-image:linear-gradient(rgba(150,170,255,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(150,170,255,.07) 1px,transparent 1px);background-size:44px 44px;mask-image:radial-gradient(ellipse 80% 60% at 50% 20%,#000,transparent 75%);opacity:.7;pointer-events:none}
.vcn .hero-net{position:absolute;inset:0;opacity:.55;pointer-events:none}
.vcn .hero-net svg{width:100%;height:100%}
.vcn .net-lines path{stroke-dasharray:8 6;animation:dash 7s linear infinite}
.vcn .net-node{fill:var(--cyan);animation:pulseNode 2.6s ease-in-out infinite}
@keyframes dash{to{stroke-dashoffset:-140}}
@keyframes pulseNode{0%,100%{opacity:.35;r:3.5}50%{opacity:1;r:5.5}}
.vcn .hero-inner{max-width:1200px;margin:0 auto;position:relative;z-index:1;padding:104px 0 52px}
.vcn .hero-layout{display:flex;flex-direction:column;gap:36px}
.vcn .hero-badge{display:inline-flex;align-items:center;gap:8px;background:var(--panel);border:1px solid var(--line);border-radius:var(--radius-pill);padding:7px 15px 7px 11px;font-size:10.5px;font-weight:700;color:var(--cyan);letter-spacing:.06em;text-transform:uppercase;margin-bottom:18px;box-shadow:var(--shadow-sm);backdrop-filter:blur(10px)}
.vcn .hero-badge-dot{width:7px;height:7px;border-radius:50%;background:var(--amber);animation:pulseNode 2s ease-in-out infinite}
.vcn .hero h1{font-size:clamp(30px,7.2vw,50px);font-weight:600;line-height:1.06;letter-spacing:-.035em;margin-bottom:16px;max-width:620px;color:var(--text-hi)}
.vcn .hero h1 em{font-style:normal;background:var(--grad-signal);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;background-size:200% auto;animation:signalShift 8s ease-in-out infinite}
.vcn .hero-sub{font-size:clamp(14px,2vw,16px);color:var(--text-dim);line-height:1.75;max-width:490px;margin-bottom:26px}
.vcn .hero-btns{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:30px}
.vcn .btn-lg{font-size:13.5px;padding:13px 22px;border-radius:10px}
.vcn .btn-ghost{background:var(--panel);color:var(--text-hi);font-weight:600;border:1.5px solid var(--line);text-decoration:none;cursor:pointer;display:inline-flex;align-items:center;gap:7px;transition:all .25s var(--ease);backdrop-filter:blur(10px)}
.vcn .btn-ghost:hover{border-color:var(--cyan);color:var(--cyan);transform:translateY(-2px);box-shadow:0 8px 20px rgba(94,234,212,.15)}
.vcn .btn-ghost.light{background:transparent;color:#fff;border-color:rgba(255,255,255,.22)}
.vcn .btn-ghost.light:hover{background:rgba(255,255,255,.06);border-color:var(--cyan)}
.vcn .hero-stats{display:flex;gap:0;flex-wrap:wrap;padding-top:22px;border-top:1px solid var(--line)}
.vcn .hero-stat{padding:0 20px 0 0;margin-right:20px;border-right:1px solid var(--line)}
.vcn .hero-stat:last-child{border-right:none}
.vcn .hero-stat-v{font-family:var(--font-mono);font-size:22px;font-weight:700;color:var(--text-hi);letter-spacing:-.02em;line-height:1}
.vcn .hero-stat-l{font-size:11.5px;font-weight:700;color:var(--cyan);margin-top:6px}
.vcn .hero-stat-d{font-size:11px;color:var(--text-dim);margin-top:3px;max-width:150px;line-height:1.5}
.vcn .hero-panel-card{background:var(--panel);border:1px solid var(--line);border-radius:var(--radius-lg);padding:20px;box-shadow:var(--shadow-glow);backdrop-filter:blur(16px)}
.vcn .hero-panel-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;padding-bottom:14px;border-bottom:1px solid var(--line)}
.vcn .hero-panel-head h3{font-size:14px;font-weight:700}
.vcn .hero-services-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.vcn .hero-svc-card{background:rgba(255,255,255,.03);border:1px solid var(--line);border-radius:13px;padding:14px;transition:all .3s var(--ease)}
.vcn .hero-svc-card:hover{transform:translateY(-3px);box-shadow:var(--shadow-sm);border-color:var(--cyan)}
.vcn .hero-svc-icon{width:34px;height:34px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:15px;margin-bottom:9px;background:var(--grad-signal-soft);border:1px solid var(--line)}
.vcn .hero-svc-card h5{font-size:11.5px;font-weight:700;margin-bottom:4px;line-height:1.3;color:var(--text-hi)}
.vcn .hero-svc-card p{font-size:10.5px;color:var(--text-dim);line-height:1.5}
.vcn .hero-panel-foot{margin-top:14px;padding-top:13px;border-top:1px solid var(--line);font-size:12px;color:var(--text-mid);display:flex;align-items:center;gap:8px}
.vcn .hero-panel-foot strong{color:var(--text-hi)}

/* SOLUTIONS GRID */
.vcn .g4{display:grid;grid-template-columns:1fr;gap:12px}
.vcn .sol-card{border-radius:var(--radius);padding:22px 18px;border:1px solid var(--line);background:var(--panel);transition:all .3s var(--ease);overflow:hidden;position:relative;backdrop-filter:blur(10px)}
.vcn .sol-card:hover{box-shadow:var(--shadow-glow);border-color:var(--line-bright);background:var(--panel-hover)}
.vcn .sol-glow{position:absolute;top:-40%;right:-30%;width:160px;height:160px;background:radial-gradient(circle,rgba(139,124,246,.25),transparent 70%);opacity:0;transition:opacity .4s var(--ease);pointer-events:none}
.vcn .sol-card:hover .sol-glow{opacity:1}
.vcn .sol-top{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:14px}
.vcn .sol-icon{width:42px;height:42px;border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:18px;background:var(--grad-signal-soft);border:1px solid var(--line)}
.vcn .idx-tag{font-family:var(--font-mono);font-size:10px;color:var(--text-dim);letter-spacing:.03em;padding-top:4px}
.vcn .sol-card h3{font-size:13.5px;font-weight:700;margin-bottom:6px;letter-spacing:-.01em;color:var(--text-hi)}
.vcn .sol-card p{font-size:12px;color:var(--text-dim);line-height:1.6}
.vcn .sol-card .trace{position:absolute;left:0;right:0;bottom:0;height:2px;background:var(--grad-signal);transform:scaleX(0);transform-origin:left;transition:transform .35s var(--ease)}
.vcn .sol-card:hover .trace{transform:scaleX(1)}
.vcn .center-btn-wrap{text-align:center;margin-top:30px}

/* PRODUCT CATALOGUE — images fully visible, never cropped */
.vcn .prod-section{background:var(--void-alt);padding:16px 0 64px;border-top:1px solid var(--line)}
.vcn .prod-grid{display:grid;grid-template-columns:1fr;gap:16px}
.vcn .prod-card{border-radius:var(--radius-lg);overflow:hidden;border:1px solid var(--line);display:grid;grid-template-columns:1fr;transition:all .3s var(--ease);background:var(--panel);backdrop-filter:blur(10px)}
.vcn .prod-card:hover{box-shadow:var(--shadow-glow);border-color:var(--line-bright)}
.vcn .prod-img{position:relative;display:flex;align-items:center;justify-content:center;padding:22px;min-height:180px;background:radial-gradient(ellipse at center,rgba(139,124,246,.1),rgba(94,234,212,.04) 60%,transparent 100%)}
.vcn .prod-img img{width:100%;height:100%;max-height:220px;object-fit:contain;object-position:center;transition:transform .5s var(--ease)}
.vcn .prod-card:hover .prod-img img{transform:scale(1.04)}
.vcn .prod-body{padding:18px 18px 22px;border-top:1px solid var(--line)}
.vcn .prod-ico{width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:15px;margin-bottom:10px;background:var(--grad-signal-soft);border:1px solid var(--line)}
.vcn .prod-body h3{font-size:14px;font-weight:700;margin-bottom:6px;color:var(--text-hi)}
.vcn .pdesc{font-size:11.5px;color:var(--text-dim);line-height:1.6;margin-bottom:10px}
.vcn .prod-body ul{list-style:none;margin:0;padding:0;display:grid;gap:6px;font-family:var(--font-mono)}
.vcn .prod-body li{font-size:11px;color:var(--text-mid);display:flex;gap:7px;align-items:flex-start;line-height:1.5}
.vcn .pdot{width:4px;height:4px;border-radius:50%;background:var(--cyan);flex-shrink:0;margin-top:6px}

/* INTEGRATION STRIP */
.vcn .int-grid{display:grid;grid-template-columns:1fr;gap:1px;border-radius:var(--radius-lg);overflow:hidden;border:1px solid var(--line)}
.vcn .int-card{background:var(--panel);padding:16px 18px;color:var(--text-mid);font-size:13px;line-height:1.5;display:flex;align-items:center;gap:12px;transition:background .3s var(--ease)}
.vcn .int-num{font-family:var(--font-mono);font-size:10.5px;color:var(--text-dim);width:20px;flex-shrink:0}
.vcn .int-card svg{color:var(--cyan);flex-shrink:0}
.vcn .int-card:hover{background:var(--panel-hover)}

/* ABOUT */
.vcn .about-grid{display:grid;grid-template-columns:1fr;gap:34px;align-items:center}
.vcn .about-img-wrap{position:relative;border-radius:var(--radius-lg);overflow:hidden;border:1px solid var(--line)}
.vcn .about-img-wrap img{width:100%;height:300px;object-fit:cover;transition:transform .6s var(--ease);filter:saturate(1.05)}
.vcn .about-img-wrap:hover img{transform:scale(1.04)}
.vcn .about-badge{position:absolute;bottom:0;right:0;background:var(--void);border:1px solid var(--line);border-radius:14px 0 0 0;padding:16px 20px}
.vcn .about-badge .val{font-family:var(--font-mono);font-size:26px;font-weight:700;background:var(--grad-signal);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;line-height:1}
.vcn .about-badge .lbl{font-size:10px;color:var(--text-dim);margin-top:3px}
.vcn .about-copy h2{font-size:clamp(24px,4.5vw,34px);margin:6px 0 12px}
.vcn .about-copy h2 em{font-style:normal;background:var(--grad-signal);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.vcn .about-copy .lead{font-size:15px;color:var(--text-hi);line-height:1.75;margin-bottom:18px;font-weight:500}
.vcn .sub-h{font-size:13.5px;font-weight:700;color:var(--cyan);margin-bottom:10px}
.vcn .about-copy p{font-size:13.5px;color:var(--text-mid);line-height:1.8;margin-bottom:12px}
.vcn .feat-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:16px}
.vcn .feat{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:14px;transition:all .3s var(--ease)}
.vcn .feat:hover{transform:translateY(-3px);box-shadow:var(--shadow-sm);border-color:var(--cyan)}
.vcn .feat h4{font-size:12px;font-weight:700;margin-bottom:4px;color:var(--text-hi)}
.vcn .feat p{font-size:11px;color:var(--text-dim);line-height:1.5;margin:0}
.vcn .cert-row{display:flex;flex-wrap:wrap;gap:9px;margin-top:18px}
.vcn .cert-pill{padding:8px 14px;border:1.5px solid rgba(94,234,212,.28);border-radius:var(--radius-pill);font-size:11.5px;font-weight:600;color:var(--cyan);background:rgba(94,234,212,.08)}
.vcn .about-close{position:relative;margin-top:22px;padding:20px 22px 20px 44px;border:1px solid var(--line);border-left:3px solid transparent;border-image:var(--grad-signal) 1;border-radius:var(--radius);background:var(--panel);font-size:14.5px;font-style:italic;color:var(--text-hi);line-height:1.75;backdrop-filter:blur(10px)}
.vcn .about-close-mark{position:absolute;left:14px;top:10px;font-family:var(--font-display);font-size:34px;font-style:normal;line-height:1;background:var(--grad-signal);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;opacity:.8}

/* WHY CHOOSE US */
.vcn .val-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.vcn .val-card{background:var(--panel);border:1px solid var(--line);border-radius:var(--radius);padding:22px 18px;transition:all .3s var(--ease);backdrop-filter:blur(10px)}
.vcn .val-card:hover{background:var(--panel-hover);box-shadow:var(--shadow-glow);border-color:var(--line-bright)}
.vcn .val-icon{font-size:24px;margin-bottom:10px}
.vcn .val-card h4{font-size:13.5px;font-weight:700;color:var(--text-hi);margin-bottom:5px}
.vcn .val-card p{font-size:11.5px;color:var(--text-dim);line-height:1.6;margin:0}

/* DEPLOYMENT PORTFOLIO (new) */
.vcn .portfolio-grid{display:grid;grid-template-columns:1fr;gap:14px}
.vcn .portfolio-card{background:var(--panel);border:1px solid var(--line);border-radius:var(--radius-lg);padding:22px;transition:all .3s var(--ease);backdrop-filter:blur(10px)}
.vcn .portfolio-card:hover{box-shadow:var(--shadow-glow);border-color:var(--line-bright)}
.vcn .portfolio-top{display:flex;align-items:center;gap:9px;margin-bottom:14px}
.vcn .portfolio-icon{font-size:19px}
.vcn .portfolio-sector{font-family:var(--font-mono);font-size:10.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--amber);padding:4px 10px;border:1px solid rgba(240,168,87,.3);border-radius:var(--radius-pill);background:rgba(240,168,87,.08)}
.vcn .portfolio-card h3{font-size:16px;font-weight:700;margin-bottom:8px;line-height:1.3}
.vcn .portfolio-scope{font-size:12.5px;color:var(--text-dim);line-height:1.6;margin-bottom:18px}
.vcn .portfolio-metrics{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;padding-top:16px;border-top:1px solid var(--line)}
.vcn .pm{display:flex;flex-direction:column;gap:3px}
.vcn .pm-v{font-family:var(--font-mono);font-size:17px;font-weight:700;background:var(--grad-signal);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.vcn .pm-l{font-size:10px;color:var(--text-dim);line-height:1.4}

/* PROCESS */
.vcn .proc-track{position:relative}
.vcn .proc-line{display:none}
.vcn .proc-grid{display:grid;grid-template-columns:1fr;gap:12px;position:relative;z-index:1}
.vcn .proc-step{background:var(--panel);border-radius:var(--radius);padding:22px 18px;border:1px solid var(--line);transition:all .3s var(--ease);backdrop-filter:blur(10px)}
.vcn .proc-step:hover{box-shadow:var(--shadow-glow);border-color:var(--line-bright)}
.vcn .step-num{font-family:var(--font-mono);width:38px;height:38px;border-radius:10px;background:var(--grad-signal-soft);border:1.5px solid var(--line);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;color:var(--cyan);margin-bottom:13px;transition:all .3s var(--ease)}
.vcn .proc-step:hover .step-num{background:var(--grad-signal);color:var(--void);border-color:transparent}
.vcn .proc-step h4{font-size:13.5px;font-weight:700;margin-bottom:6px;color:var(--text-hi)}
.vcn .proc-step p{font-size:11.5px;color:var(--text-dim);line-height:1.65;margin:0}

/* INDUSTRIES */
.vcn .ind-tabs-wrap{margin-bottom:26px;overflow-x:auto;scrollbar-width:none}
.vcn .ind-tabs-wrap::-webkit-scrollbar{display:none}
.vcn .ind-tabs{display:flex;gap:4px;padding:5px;background:var(--panel);border-radius:13px;border:1px solid var(--line);width:max-content;margin:0 auto}
.vcn .ind-tab{position:relative;display:inline-flex;align-items:center;padding:9px 14px;border-radius:9px;border:none;background:transparent;cursor:pointer;white-space:nowrap}
.vcn .ind-tab-bg{position:absolute;inset:0;background:var(--grad-signal);border-radius:9px;z-index:0}
.vcn .ind-tab-label{position:relative;z-index:1;display:flex;align-items:center;gap:6px;font-family:var(--font-display);font-size:12.5px;font-weight:600;color:var(--text-mid)}
.vcn .ind-tab.active .ind-tab-label{color:var(--void);font-weight:800}
.vcn .ind-panel{display:grid;grid-template-columns:1fr;background:var(--panel);border:1px solid var(--line);border-radius:var(--radius-lg);overflow:hidden;box-shadow:var(--shadow-md);backdrop-filter:blur(10px)}
.vcn .ind-panel-img{position:relative;min-height:220px}
.vcn .ind-panel-img img{width:100%;height:100%;object-fit:cover;min-height:220px;filter:saturate(1.05) brightness(.92)}
.vcn .ind-panel-img-overlay{position:absolute;inset:0;background:linear-gradient(160deg,rgba(5,7,12,.4),transparent 55%)}
.vcn .ind-panel-body{padding:26px 22px;display:flex;flex-direction:column;justify-content:center}
.vcn .ind-panel-icon{font-size:28px;margin-bottom:12px}
.vcn .ind-panel-body h3{font-size:clamp(19px,3vw,24px);font-weight:600;margin-bottom:16px}
.vcn .ind-panel-body ul{list-style:none;margin:0;padding:0;display:grid;gap:12px}
.vcn .ind-panel-body li{font-size:13.5px;color:var(--text-mid);display:flex;gap:10px;align-items:flex-start;line-height:1.6}
.vcn .idot{width:6px;height:6px;border-radius:50%;background:var(--cyan);flex-shrink:0;margin-top:7px}

/* SUPPORT & SLA (new) */
.vcn .tier-tabs{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-bottom:20px}
.vcn .tier-tab{font-family:var(--font-mono);font-size:12px;font-weight:700;padding:11px 18px;border-radius:var(--radius-pill);border:1px solid var(--line);background:var(--panel);color:var(--text-mid);cursor:pointer;transition:all .25s var(--ease)}
.vcn .tier-tab:hover{border-color:var(--line-bright);color:var(--text-hi)}
.vcn .tier-tab.active{background:var(--grad-signal);color:var(--void);border-color:transparent}
.vcn .tier-panel{max-width:720px;margin:0 auto;background:var(--panel);border:1px solid var(--line);border-radius:var(--radius-lg);padding:26px 22px;backdrop-filter:blur(10px)}
.vcn .tier-head{display:flex;justify-content:space-between;align-items:flex-start;gap:14px;flex-wrap:wrap;padding-bottom:18px;border-bottom:1px solid var(--line);margin-bottom:18px}
.vcn .tier-head h3{font-size:19px;font-weight:700;margin-bottom:6px}
.vcn .tier-tag{font-size:11.5px;color:var(--amber)}
.vcn .tier-response{text-align:right}
.vcn .tier-response-v{display:block;font-family:var(--font-mono);font-size:26px;font-weight:800;background:var(--grad-signal);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.vcn .tier-response-l{font-size:10.5px;color:var(--text-dim)}
.vcn .tier-grid{display:grid;grid-template-columns:1fr;gap:10px;margin-bottom:18px}
.vcn .tier-stat{background:rgba(255,255,255,.03);border:1px solid var(--line);border-radius:11px;padding:12px 14px;display:flex;justify-content:space-between;align-items:center;gap:10px}
.vcn .tier-stat-l{font-size:11.5px;color:var(--text-dim)}
.vcn .tier-stat-v{font-size:12.5px;font-weight:700;color:var(--text-hi);text-align:right}
.vcn .tier-coverage{list-style:none;margin:0;padding:0;display:grid;gap:10px}
.vcn .tier-coverage li{display:flex;gap:9px;align-items:flex-start;font-size:13px;color:var(--text-mid);line-height:1.6}

/* PARTNERS — marquee */
.vcn .partners-sec{padding:60px 0 66px;background:var(--void-alt);border-top:1px solid var(--line)}
.vcn .marquee{overflow:hidden;margin-top:30px;-webkit-mask-image:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent);mask-image:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)}
.vcn .marquee-track{display:flex;gap:12px;width:max-content;animation:marquee 34s linear infinite;padding:0 18px}
.vcn .marquee:hover .marquee-track{animation-play-state:paused}
@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.vcn .p-chip{width:128px;aspect-ratio:16/9;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:var(--panel);border:1px solid var(--line);border-radius:13px;padding:14px;transition:all .3s var(--ease)}
.vcn .p-chip:hover{background:var(--panel-hover);border-color:var(--line-bright)}
.vcn .p-chip img{max-width:86%;max-height:86%;object-fit:contain;filter:grayscale(.3) brightness(1.4) opacity(.85);transition:all .3s var(--ease)}
.vcn .p-chip:hover img{filter:grayscale(0) brightness(1) opacity(1)}

/* CTA / CONTACT */
.vcn .cta-sec{background:var(--grad-cta);padding:68px 0;position:relative;overflow:hidden;border-top:1px solid var(--line)}
.vcn .cta-glow{position:absolute;inset:0;background:radial-gradient(ellipse 60% 50% at 50% 0%,rgba(94,234,212,.08),transparent 65%);pointer-events:none}
.vcn .cta-head{text-align:center;max-width:600px;margin:0 auto 40px;position:relative;z-index:1}
.vcn .cta-head h2{font-size:clamp(26px,6vw,44px);color:var(--text-hi);margin:8px 0 14px;line-height:1.15}
.vcn .cta-head p{font-size:14px;color:var(--text-dim);line-height:1.75}
.vcn .cta-btns{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:24px}
.vcn .contact-layout{display:grid;grid-template-columns:1fr;gap:16px;position:relative;z-index:1;max-width:960px;margin:0 auto}
.vcn .contact-grid{display:grid;grid-template-columns:1fr;gap:12px;align-content:start}
.vcn .contact-card{background:var(--panel);border:1px solid var(--line);border-radius:var(--radius);padding:22px 16px;text-align:center;text-decoration:none;color:var(--text-hi);transition:all .3s var(--ease);backdrop-filter:blur(10px)}
.vcn .contact-card:hover{background:var(--panel-hover);box-shadow:var(--shadow-glow);border-color:var(--line-bright)}
.vcn .cc-icon{font-size:22px;margin-bottom:9px}
.vcn .cc-lbl{font-size:9.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--text-dim);margin-bottom:4px;font-weight:600}
.vcn .cc-val{font-family:var(--font-mono);font-size:13px;font-weight:700}
.vcn .cc-sub{font-size:11px;color:var(--text-dim);margin-top:3px}
.vcn .help-card{background:var(--panel);border:1px solid var(--line);border-radius:var(--radius);padding:22px;backdrop-filter:blur(10px)}
.vcn .help-card h4{color:var(--text-hi);font-size:14px;margin-bottom:15px}
.vcn .help-card ul{list-style:none;margin:0 0 16px;padding:0;display:grid;gap:11px}
.vcn .help-card li{display:flex;gap:9px;align-items:flex-start;color:var(--text-mid);font-size:12.5px;line-height:1.6}
.vcn .help-window{background:rgba(255,255,255,.03);border:1px solid var(--line);border-radius:10px;padding:13px}
.vcn .help-window strong{display:block;color:var(--text-hi);font-size:11.5px;margin-bottom:4px}
.vcn .help-window span{color:var(--text-dim);font-size:11.5px}

/* FOOTER */
.vcn footer{background:#030408;padding:44px 18px 22px;border-top:1px solid var(--line)}
.vcn .footer-inner{max-width:1200px;margin:0 auto}
.vcn .footer-top{display:grid;grid-template-columns:1fr;gap:30px;padding-bottom:34px;border-bottom:1px solid var(--line)}
.vcn .ft-desc{font-size:12px;color:var(--text-dim);line-height:1.75;max-width:260px;margin-top:12px}
.vcn .ft-col h5{font-size:9.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--text-hi);font-weight:700;margin-bottom:13px}
.vcn .ft-col a,.vcn .ft-contact span{display:block;font-size:12px;color:var(--text-dim);margin-bottom:9px;text-decoration:none;transition:color .2s var(--ease)}
.vcn .ft-col a:hover{color:var(--cyan)}
.vcn .ft-quote{display:inline-block;margin-top:6px;background:var(--grad-signal);color:var(--void);font-size:11.5px;font-weight:700;padding:9px 16px;border-radius:var(--radius-pill)}
.vcn .footer-bot{display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-top:20px;font-size:10.5px;color:var(--text-dim);opacity:.6}

/* ═════ RESPONSIVE — mobile-first progressive enhancement ═════ */
@media(min-width:560px){
  .vcn .g4{grid-template-columns:repeat(2,1fr)}
  .vcn .prod-grid{grid-template-columns:repeat(2,1fr)}
  .vcn .val-grid{grid-template-columns:repeat(2,1fr)}
  .vcn .contact-grid{grid-template-columns:repeat(3,1fr)}
  .vcn .portfolio-grid{grid-template-columns:repeat(2,1fr)}
}
@media(min-width:720px){
  .vcn .hero-services-grid{grid-template-columns:1fr 1fr}
  .vcn .about-badge .val{font-size:30px}
  .vcn .footer-top{grid-template-columns:1fr 1fr}
  .vcn .tier-grid{grid-template-columns:1fr 1fr}
}
@media(min-width:860px){
  .vcn .nav-links{display:flex}
  .vcn .nav-cta-desktop{display:inline-flex}
  .vcn .ham-btn{display:none}
  .vcn .g4{grid-template-columns:repeat(3,1fr)}
  .vcn .prod-card{grid-template-columns:.85fr 1.15fr}
  .vcn .int-grid{grid-template-columns:repeat(2,1fr)}
  .vcn .about-grid{grid-template-columns:.9fr 1.1fr;gap:52px}
  .vcn .about-img-wrap img{height:380px}
  .vcn .val-grid{grid-template-columns:repeat(3,1fr)}
  .vcn .proc-grid{grid-template-columns:repeat(4,1fr)}
  .vcn .proc-line{display:block;position:absolute;top:19px;left:6%;right:6%;height:2px;background:var(--grad-signal);transform-origin:left center}
  .vcn .ind-panel{grid-template-columns:1.05fr .95fr}
  .vcn .ind-panel-img,.vcn .ind-panel-img img{min-height:320px}
  .vcn .ind-panel-body{padding:34px 30px}
  .vcn .contact-layout{grid-template-columns:1.3fr .9fr}
  .vcn .footer-top{grid-template-columns:2fr 1fr 1fr 1.3fr}
  .vcn .portfolio-grid{grid-template-columns:repeat(2,1fr)}
}
@media(min-width:1080px){
  .vcn .hero-inner{padding:126px 0 64px}
  .vcn .hero-layout{display:grid;grid-template-columns:1.1fr .9fr;gap:44px;align-items:center}
  .vcn .g4{grid-template-columns:repeat(4,1fr)}
  .vcn .sec{padding:88px 0}
  .vcn .portfolio-grid{grid-template-columns:repeat(2,1fr)}
}
@media(prefers-reduced-motion:reduce){
  .vcn *{animation-duration:.001s!important;transition-duration:.001s!important}
  .vcn .marquee-track{animation:none}
}
`;