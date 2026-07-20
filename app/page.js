'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

/* ════════ BRAND ASSETS ════════ */
const LOGO_H = '/vcn_logo_without_tagline_horizontalsize.png';
const LOGO_SQ = '/vcn_logo_with_tagline_squaresize.png';
const COMPANY = 'Visual Connect Networks Pvt. Ltd.';

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

const IS_ICON = (paths, vb='0 0 24 24') => (
  <svg viewBox={vb} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths}</svg>
);
const INTEGRATION_SERVICES = [
  { icon: IS_ICON(<><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="22" y2="22"/></>),                                                                       title: 'Requirement Analysis',               color: '#e0f7fe', accent: '#0891b2' },
  { icon: IS_ICON(<><path d="M9 18h6M10 22h4M12 2a7 7 0 0 1 7 7c0 2.6-1.4 4.9-3.5 6.1L15 17H9l-.5-2.1C6.4 13.9 5 11.6 5 9a7 7 0 0 1 7-7z"/></>),                        title: 'Solution Consulting',                color: '#ecfdf5', accent: '#059669' },
  { icon: IS_ICON(<><rect x="2" y="3" width="7" height="7" rx="1"/><rect x="15" y="3" width="7" height="7" rx="1"/><rect x="9" y="16" width="6" height="5" rx="1"/><path d="M5.5 10v3h13V10M12 13v3"/></>),  title: 'System Design & Architecture',       color: '#fdf4ff', accent: '#9333ea' },
  { icon: IS_ICON(<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>), title: 'Technical Specification',            color: '#fff7ed', accent: '#ea580c' },
  { icon: IS_ICON(<><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/></>), title: 'BOQ Preparation',                    color: '#eff6ff', accent: '#2563eb' },
  { icon: IS_ICON(<><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></>),                                                                title: 'Tender & GeM Bid Support',           color: '#f0fdf4', accent: '#16a34a' },
  { icon: IS_ICON(<><path d="M11 15a4 4 0 0 1-8 0V7a4 4 0 0 1 8 0M13 9a4 4 0 0 1 8 0v8a4 4 0 0 1-8 0"/><path d="M7 19v2M17 19v2M9 7h2M13 7h2"/></>),                    title: 'OEM Coordination',                   color: '#fef2f2', accent: '#dc2626' },
  { icon: IS_ICON(<><path d="M9 3h6L13.5 11H17l-5 10-5-10h3.5z"/><path d="M6.5 15h11"/></>),                                                                               title: 'Proof of Concept (POC)',             color: '#fefce8', accent: '#ca8a04' },
  { icon: IS_ICON(<><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></>),                              title: 'Site Survey & Assessment',           color: '#e0f7fe', accent: '#0e7490' },
  { icon: IS_ICON(<><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="14" x2="13" y2="14"/><line x1="8" y1="18" x2="15" y2="18"/></>), title: 'Project Management',                 color: '#f5f3ff', accent: '#7c3aed' },
  { icon: IS_ICON(<><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></>), title: 'Installation & Commissioning',       color: '#ecfdf5', accent: '#0891b2' },
  { icon: IS_ICON(<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></>),                                                      title: 'Testing & Acceptance',               color: '#f0fdf4', accent: '#059669' },
  { icon: IS_ICON(<><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></>),                                                                     title: 'User Training',                      color: '#fff7ed', accent: '#ea580c' },
  { icon: IS_ICON(<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>),            title: 'Annual Maintenance (AMC)',           color: '#fdf4ff', accent: '#9333ea' },
  { icon: IS_ICON(<><path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></>),                    title: 'Preventive & Corrective Maint.',     color: '#eff6ff', accent: '#2563eb' },
  { icon: IS_ICON(<><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></>), title: 'Remote & On-Site Support',           color: '#fef2f2', accent: '#dc2626' },
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
  const [expandedSolution, setExpandedSolution] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formHighlight, setFormHighlight] = useState(false);
  const formRef = useRef(null);
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
            <Image src={LOGO_SQ} alt={COMPANY} width={150} height={32} priority style={{ height: 30, width: 'auto' }} />
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
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              {menuOpen ? (
                <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
              ) : (
                <>
                  <circle cx="12" cy="5" r="1.8" fill="currentColor" />
                  <circle cx="12" cy="12" r="1.8" fill="currentColor" />
                  <circle cx="12" cy="19" r="1.8" fill="currentColor" />
                </>
              )}
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
                <a href="#contact" className="btn-ghost btn-lg" onClick={(e) => { e.preventDefault(); setModalOpen(true); }}>Request Consultation</a>
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
            {SOLUTIONS.map((s, i) => {
              const isOpen = expandedSolution === s.title;
              const relatedGroup = PRODUCT_GROUPS.find(g => g.title.toLowerCase() === s.title.toLowerCase());
              return (
                <motion.div
                  key={s.title}
                  layout="position"
                  className={`sol-card brk ${isOpen ? 'expanded' : ''}`}
                  variants={fadeScale}
                  whileHover={{ y: isOpen ? 0 : -8 }}
                  onClick={() => setExpandedSolution(isOpen ? null : s.title)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setExpandedSolution(isOpen ? null : s.title); } }}
                >
                  <div className="sol-top">
                    <div className="sol-icon">{s.icon}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="idx-tag">{String(i + 1).padStart(2, '0')}/{SOLUTIONS.length}</span>
                      <motion.svg
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25, ease }}
                        width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                        style={{ color: isOpen ? 'var(--cyan)' : 'var(--text-dim)', flexShrink: 0 }}
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </motion.svg>
                    </div>
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>

                  <AnimatePresence initial={false}>
                    {isOpen && relatedGroup && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div className="sol-dropdown">
                          {relatedGroup.img && (
                            <div className="sol-dropdown-img">
                              <img src={relatedGroup.img} alt={relatedGroup.title} loading="lazy" />
                            </div>
                          )}
                          <div className="sol-dropdown-list">
                            <h4>Key Offerings</h4>
                            <ul>
                              {relatedGroup.items.map((item) => (
                                <li key={item}>
                                  <span className="pdot" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <span className="trace" />
                  <span className="sol-glow" />
                </motion.div>
              );
            })}
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
      <section className="sec sec-alt" id="integration">
        <div className="inner">
          <Reveal className="sec-head">
            <Kicker text="Integration Services" dark />
            <h2>End-to-End System Integration</h2>
            <p className="sec-head-sub">Every stage of your project — from first consultation to long-term support — handled by our specialists.</p>
          </Reveal>
          <div className="int-cards-grid">
            {INTEGRATION_SERVICES.map((item, i) => (
              <motion.div
                key={item.title}
                className="int-service-card"
                style={{ '--isc-bg': item.color, '--isc-accent': item.accent }}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: (i % 4) * 0.08 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="isc-icon">{item.icon}</div>
                <div className="isc-title">{item.title}</div>
                <div className="isc-bar" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="sec" id="about">
        <div className="inner">
          <div className="about-grid">
            <Reveal as={motion.div} className="about-img-wrap brk" variant={slideLeft}>
              <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&q=80" alt="VCNPL Team" loading="lazy" />
            </Reveal>
            <Reveal as={motion.div} className="about-copy" variant={slideRight} delay={0.1}>
              <Kicker text="About Us" />
              <h2>We Are <em>Visual Connect Networks</em></h2>
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
              <button
                className="btn-signal btn-lg"
                onClick={() => {
                  formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  setFormHighlight(true);
                  setTimeout(() => setFormHighlight(false), 1600);
                  setTimeout(() => {
                    const first = formRef.current?.querySelector('input, select, textarea');
                    first?.focus();
                  }, 600);
                }}
              >
                ✉️ Request Free Consultation
              </button>
            </div>
          </Reveal>

          {/* ── INLINE CONSULTATION FORM ── */}
          <Reveal className="inline-form-wrap" delay={0.1}>
            {!formSubmitted ? (
              <form
                ref={formRef}
                onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); }}
                className={`inline-enquiry-form${formHighlight ? ' ief-highlight' : ''}`}
              >
                <div className="ief-grid">
                  <div className="form-group">
                    <label htmlFor="ief-name">Full Name *</label>
                    <input type="text" id="ief-name" required placeholder="John Doe" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="ief-email">Business Email *</label>
                    <input type="email" id="ief-email" required placeholder="john@company.com" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="ief-phone">Phone Number *</label>
                    <input type="tel" id="ief-phone" required placeholder="+91 XXXXX XXXXX" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="ief-company">Company / Organization</label>
                    <input type="text" id="ief-company" placeholder="Your company name" />
                  </div>
                  <div className="form-group ief-full">
                    <label htmlFor="ief-solution">Solutions Required *</label>
                    <select id="ief-solution" required defaultValue="">
                      <option value="" disabled>Select a core solution...</option>
                      {SOLUTIONS.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                      <option value="Other">Other / Infrastructure Sourcing</option>
                    </select>
                  </div>
                  <div className="form-group ief-full">
                    <label htmlFor="ief-msg">Brief Project Scope / Message *</label>
                    <textarea id="ief-msg" required rows="3" placeholder="Tell us about your requirements..." />
                  </div>
                </div>
                <button type="submit" className="btn-signal btn-lg ief-submit">
                  ✉️ Submit Enquiry
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
                </button>
              </form>
            ) : (
              <motion.div
                className="ief-success"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="ief-success-icon">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3>Thank You!</h3>
                <p>Your enquiry has been submitted. Our team will contact you within 24 hours.</p>
                <button onClick={() => setFormSubmitted(false)} className="btn-ghost btn-lg" style={{ marginTop: '12px' }}>Submit Another</button>
              </motion.div>
            )}
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
              <div className="ft-brand"><Image src={LOGO_H} alt={COMPANY} width={100} height={80} style={{ height: 80, width: 'auto', objectFit: 'contain' }} /></div>
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

      {/* ── FLOATING WHATSAPP CHAT ── */}
      <a href="https://wa.me/919876596016" target="_blank" rel="noopener noreferrer" className="wa-float" aria-label="Chat on WhatsApp">
        <span className="wa-text">chat with us</span>
        <div className="wa-icon-wrap">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.233-1.371a9.936 9.936 0 0 0 4.779 1.22h.004c5.505 0 9.99-4.478 9.99-9.985C22.007 6.478 17.519 2 12.012 2zm5.845 14.286c-.241.677-1.398 1.325-1.921 1.401-.475.068-.962.336-3.045-.526-2.666-1.102-4.385-3.821-4.518-3.997-.133-.176-1.085-1.442-1.085-2.75 0-1.309.684-1.95 1.085-2.366.241-.25.532-.315.7-.315.176 0 .347.002.497.009.158.007.37-.058.577.443.208.508.708 1.729.77 1.854.062.126.104.271.02.439-.084.167-.126.27-.25.416-.124.147-.26.327-.37.44-.124.125-.254.26-.109.508.145.248.647 1.066 1.385 1.722.954.848 1.758 1.11 2.008 1.235.25.124.394.103.541-.067.147-.17.625-.726.791-.973.167-.247.332-.207.562-.122.229.085 1.455.687 1.705.812.25.125.416.187.478.293.062.106.062.616-.179 1.293z" />
          </svg>
        </div>
      </a>



      <style>{CSS}</style>
    </div>
  );
}

/* ════════ STYLES — mobile-first, single futuristic "signal-grid" theme ════════ */
const CSS = `
.vcn{
  /* ── CYAN LIGHT THEME — clean white/cyan base with cyan accent throughout ── */
  --void:#f0fbff; --void-soft:#e0f7fe; --void-alt:#e6f9fd;
  --panel:rgba(255,255,255,0.9); --panel-hover:rgba(255,255,255,1);
  --line:rgba(6,182,212,0.15); --line-bright:rgba(6,182,212,0.35);
  --cyan:#0891b2; --cyan-dark:#0e7490; --cyan-light:#22d3ee; --amber:#d97706;
  --grad-signal:linear-gradient(120deg,#06b6d4,#0284c7 55%,#0891b2);
  --grad-signal-soft:linear-gradient(120deg,rgba(6,182,212,0.12),rgba(2,132,199,0.1) 55%,rgba(8,145,178,0.08));
  --grad-cta:radial-gradient(ellipse 70% 60% at 50% 0%,rgba(6,182,212,0.18),transparent 65%),linear-gradient(180deg,#e0f7fe,#f0fbff);
  --text-hi:#0c4a6e; --text-mid:#164e63; --text-dim:#4e7d8d;
  --radius-sm:8px; --radius:16px; --radius-lg:24px; --radius-pill:999px;
  --shadow-sm:0 2px 20px rgba(6,182,212,.08); --shadow-md:0 18px 46px rgba(6,182,212,.12);
  --shadow-lg:0 30px 70px rgba(6,182,212,.14); --shadow-glow:0 0 0 1px rgba(6,182,212,.2),0 18px 46px rgba(6,182,212,.1);
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
.vcn .brk::before,.vcn .brk::after{content:'';position:absolute;width:16px;height:16px;border-color:var(--cyan);border-style:solid;opacity:0;transition:opacity .3s var(--ease),transform .3s var(--ease);pointer-events:none;z-index:2;filter:drop-shadow(0 0 6px rgba(6,182,212,.6))}
.vcn .brk::before{top:-1px;left:-1px;border-width:2px 0 0 2px;border-top-left-radius:4px}
.vcn .brk::after{bottom:-1px;right:-1px;border-width:0 2px 2px 0;border-bottom-right-radius:4px;border-color:var(--cyan-light);filter:drop-shadow(0 0 6px rgba(34,211,238,.7))}
.vcn .brk:hover::before,.vcn .brk:hover::after,.vcn .brk:focus-visible::before,.vcn .brk:focus-visible::after{opacity:1}
.vcn .brk:hover::before{transform:translate(-3px,-3px)}
.vcn .brk:hover::after{transform:translate(3px,3px)}
.vcn .hero-panel-card.brk::before,.vcn .hero-panel-card.brk::after,
.vcn .about-img-wrap.brk::before,.vcn .about-img-wrap.brk::after,
.vcn .ind-panel.brk::before,.vcn .ind-panel.brk::after,
.vcn .tier-panel.brk::before,.vcn .tier-panel.brk::after{opacity:.75}

/* SCROLL SIGNAL BAR */
.vcn .scroll-bar{position:fixed;top:0;left:0;right:0;height:3px;background:var(--grad-signal);transform-origin:0% 50%;z-index:300;box-shadow:0 0 14px rgba(6,182,212,.7)}

/* NAV */
.vcn .nav-wrap{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;justify-content:center;padding:12px 14px 0}
.vcn .nav{width:100%;max-width:1080px;display:grid;grid-template-columns:auto 1fr;align-items:center;gap:6px;background:rgba(240,251,255,.85);backdrop-filter:blur(20px) saturate(1.6);border:1px solid var(--line);border-radius:var(--radius);height:56px;padding:0 8px 0 14px;transition:all .35s var(--ease)}
.vcn .nav.scrolled{background:rgba(255,255,255,.95);box-shadow:0 8px 32px rgba(6,182,212,.12);border-color:var(--line-bright)}
.vcn .nav-logo{background:transparent;border:none;cursor:pointer;padding:6px 8px;display:flex;border-radius:8px;flex-shrink:0}
.vcn .nav-links{display:none;justify-content:center;gap:2px}
.vcn .nav-links a{display:flex;align-items:center;gap:6px;color:var(--text-mid);font-size:13px;font-weight:600;text-decoration:none;padding:8px 12px;border-radius:8px;transition:all .2s var(--ease)}
.vcn .nav-dot{width:4px;height:4px;border-radius:50%;background:var(--cyan);opacity:0;transition:opacity .2s var(--ease)}
.vcn .nav-links a:hover{color:var(--text-hi);background:var(--panel)}
.vcn .nav-links a:hover .nav-dot{opacity:1}
.vcn .btn-signal{background:linear-gradient(120deg,#0891b2,#0284c7);color:#ffffff;font-size:12.5px;font-weight:800;padding:10px 18px;border-radius:9px;text-decoration:none;display:inline-flex;align-items:center;gap:7px;border:none;cursor:pointer;transition:transform .25s var(--ease),box-shadow .25s var(--ease);background-size:180% auto}
.vcn .btn-signal:hover{transform:translateY(-2px);box-shadow:0 10px 26px rgba(8,145,178,.4);background-position:100% 50%}
.vcn .btn-signal svg{transition:transform .25s var(--ease)}
.vcn .btn-signal:hover svg{transform:translateX(2px)}
.vcn .nav-cta-desktop{display:none}
.vcn .ham-btn{background:transparent;border:1px solid var(--line);border-radius:9px;cursor:pointer;padding:9px;color:var(--text-hi);display:flex;align-items:center;justify-content:center;justify-self:end}
.vcn .mob-menu{position:fixed;top:74px;left:14px;right:14px;z-index:99;background:rgba(240,251,255,.98);backdrop-filter:blur(24px);border:1px solid var(--line);border-radius:var(--radius);padding:12px;display:flex;flex-direction:column;gap:2px;box-shadow:0 20px 60px rgba(6,182,212,.15)}
.vcn .mob-menu a{color:var(--text-mid);font-size:15px;font-weight:600;text-decoration:none;padding:13px 16px;border-radius:9px;text-align:center}
.vcn .mob-menu a:hover{background:rgba(6,182,212,.08);color:var(--cyan)}
.vcn .mob-menu .btn-signal{justify-content:center;margin-top:6px}

/* HERO */
.vcn .hero{position:relative;overflow:hidden;padding:0 16px;background:linear-gradient(160deg,#f0fbff 0%,#e0f7fe 40%,#f0fbff 100%);border-bottom:1px solid var(--line)}
.vcn .hero-aurora{position:absolute;inset:0;background:radial-gradient(ellipse 55% 45% at 18% 8%,rgba(6,182,212,.2),transparent 60%),radial-gradient(ellipse 50% 45% at 88% 18%,rgba(2,132,199,.15),transparent 60%),radial-gradient(ellipse 45% 40% at 50% 95%,rgba(34,211,238,.1),transparent 60%);pointer-events:none}
.vcn .hero-grid-bg{position:absolute;inset:0;background-image:linear-gradient(rgba(6,182,212,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(6,182,212,.07) 1px,transparent 1px);background-size:44px 44px;mask-image:radial-gradient(ellipse 80% 60% at 50% 20%,#000,transparent 75%);opacity:.7;pointer-events:none}
.vcn .hero-net{position:absolute;inset:0;opacity:.55;pointer-events:none}
.vcn .hero-net svg{width:100%;height:100%}
.vcn .net-lines path{stroke-dasharray:8 6;animation:dash 7s linear infinite}
.vcn .net-node{fill:var(--cyan);animation:pulseNode 2.6s ease-in-out infinite}
@keyframes dash{to{stroke-dashoffset:-140}}
@keyframes pulseNode{0%,100%{opacity:.35;r:3.5}50%{opacity:1;r:5.5}}
.vcn .hero-inner{max-width:1200px;margin:0 auto;position:relative;z-index:1;padding:104px 0 52px}
.vcn .hero-layout{display:flex;flex-direction:column;gap:36px}
.vcn .hero-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.9);border:1px solid rgba(6,182,212,.3);border-radius:var(--radius-pill);padding:7px 15px 7px 11px;font-size:10.5px;font-weight:700;color:var(--cyan);letter-spacing:.06em;text-transform:uppercase;margin-bottom:18px;box-shadow:0 4px 16px rgba(6,182,212,.12);backdrop-filter:blur(10px)}
.vcn .hero-badge-dot{width:7px;height:7px;border-radius:50%;background:var(--cyan-light);animation:pulseNode 2s ease-in-out infinite}
.vcn .hero h1{font-size:clamp(30px,7.2vw,50px);font-weight:600;line-height:1.06;letter-spacing:-.035em;margin-bottom:16px;max-width:620px;color:var(--text-hi)}
.vcn .hero h1 em{font-style:normal;background:linear-gradient(120deg,#0891b2,#22d3ee);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;background-size:200% auto;animation:signalShift 8s ease-in-out infinite}
.vcn .hero-sub{font-size:clamp(14px,2vw,16px);color:var(--text-dim);line-height:1.75;max-width:490px;margin-bottom:26px}
.vcn .hero-btns{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:30px}
.vcn .btn-lg{font-size:13.5px;padding:13px 22px;border-radius:10px}
.vcn .btn-ghost{background:rgba(255,255,255,0.9);color:var(--text-hi);font-weight:600;border:1.5px solid rgba(6,182,212,.25);text-decoration:none;cursor:pointer;display:inline-flex;align-items:center;gap:7px;transition:all .25s var(--ease);backdrop-filter:blur(10px)}
.vcn .btn-ghost:hover{border-color:var(--cyan);color:var(--cyan);transform:translateY(-2px);box-shadow:0 8px 20px rgba(6,182,212,.2)}
.vcn .btn-ghost.light{background:rgba(255,255,255,0.75);color:var(--text-hi);border-color:rgba(6,182,212,.2)}
.vcn .btn-ghost.light:hover{background:rgba(255,255,255,0.95);border-color:var(--cyan)}
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
.vcn .g4{display:grid;grid-template-columns:1fr;gap:12px;align-items:start}
.vcn .sol-card{border-radius:var(--radius);padding:22px 18px;border:1px solid var(--line);background:var(--panel);transition:all .3s var(--ease);overflow:hidden;position:relative;backdrop-filter:blur(10px);cursor:pointer;outline:none}
.vcn .sol-card:hover, .vcn .sol-card.expanded{box-shadow:var(--shadow-glow);border-color:var(--line-bright);background:var(--panel-hover)}
.vcn .sol-glow{position:absolute;top:-40%;right:-30%;width:160px;height:160px;background:radial-gradient(circle,rgba(6,182,212,.2),transparent 70%);opacity:0;transition:opacity .4s var(--ease);pointer-events:none}
.vcn .sol-card:hover .sol-glow, .vcn .sol-card.expanded .sol-glow{opacity:1}
.vcn .sol-top{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:14px}
.vcn .sol-icon{width:42px;height:42px;border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:18px;background:var(--grad-signal-soft);border:1px solid var(--line)}
.vcn .idx-tag{font-family:var(--font-mono);font-size:10px;color:var(--text-dim);letter-spacing:.03em;padding-top:4px}
.vcn .sol-card h3{font-size:13.5px;font-weight:700;margin-bottom:6px;letter-spacing:-.01em;color:var(--text-hi)}
.vcn .sol-card p{font-size:12px;color:var(--text-dim);line-height:1.6}
.vcn .sol-card .trace{position:absolute;left:0;right:0;bottom:0;height:2px;background:var(--grad-signal);transform:scaleX(0);transform-origin:left;transition:transform .35s var(--ease)}
.vcn .sol-card:hover .trace, .vcn .sol-card.expanded .trace{transform:scaleX(1)}

/* SOL DROPDOWN */
.vcn .sol-dropdown{margin-top:20px;padding-top:20px;border-top:1px solid var(--line);display:flex;flex-direction:column;gap:16px;text-align:left}
.vcn .sol-dropdown-img{width:100%;height:140px;border-radius:var(--radius);overflow:hidden;border:1px solid var(--line)}
.vcn .sol-dropdown-img img{width:100%;height:100%;object-fit:cover}
.vcn .sol-dropdown-list h4{font-size:10.5px;font-weight:700;text-transform:uppercase;color:var(--cyan-dark);letter-spacing:.06em;margin-bottom:10px;font-family:var(--font-mono)}
.vcn .sol-dropdown-list ul{list-style:none;padding:0;margin:0;display:grid;gap:8px}
.vcn .sol-dropdown-list li{font-size:11.5px;color:var(--text-mid);display:flex;align-items:flex-start;gap:8px;line-height:1.5}
.vcn .sol-dropdown-list li .pdot{margin-top:6px}

.vcn .center-btn-wrap{text-align:center;margin-top:30px}

/* PRODUCT CATALOGUE — images fully visible, never cropped */
.vcn .prod-section{background:var(--void-alt);padding:16px 0 64px;border-top:1px solid var(--line)}
.vcn .prod-grid{display:grid;grid-template-columns:1fr;gap:16px}
.vcn .prod-card{border-radius:var(--radius-lg);overflow:hidden;border:1px solid var(--line);display:grid;grid-template-columns:1fr;transition:all .3s var(--ease);background:var(--panel);backdrop-filter:blur(10px)}
.vcn .prod-card:hover{box-shadow:var(--shadow-glow);border-color:var(--line-bright)}
.vcn .prod-img{position:relative;display:flex;align-items:center;justify-content:center;padding:22px;min-height:180px;background:radial-gradient(ellipse at center,rgba(6,182,212,.08),rgba(34,211,238,.04) 60%,transparent 100%)}
.vcn .prod-img img{width:100%;height:100%;max-height:220px;object-fit:contain;object-position:center;transition:transform .5s var(--ease)}
.vcn .prod-card:hover .prod-img img{transform:scale(1.04)}
.vcn .prod-body{padding:18px 18px 22px;border-top:1px solid var(--line)}
.vcn .prod-ico{width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:15px;margin-bottom:10px;background:var(--grad-signal-soft);border:1px solid var(--line)}
.vcn .prod-body h3{font-size:14px;font-weight:700;margin-bottom:6px;color:var(--text-hi)}
.vcn .pdesc{font-size:11.5px;color:var(--text-dim);line-height:1.6;margin-bottom:10px}
.vcn .prod-body ul{list-style:none;margin:0;padding:0;display:grid;gap:6px;font-family:var(--font-mono)}
.vcn .prod-body li{font-size:11px;color:var(--text-mid);display:flex;gap:7px;align-items:flex-start;line-height:1.5}
.vcn .pdot{width:4px;height:4px;border-radius:50%;background:var(--cyan);flex-shrink:0;margin-top:6px}

/* INTEGRATION SERVICES CARDS */
.vcn .int-cards-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}
.vcn .int-service-card{background:var(--isc-bg,#e0f7fe);border:1.5px solid transparent;border-radius:var(--radius);padding:20px 18px;display:flex;flex-direction:column;gap:10px;cursor:default;position:relative;overflow:hidden;transition:border-color .25s var(--ease),box-shadow .25s var(--ease)}
.vcn .int-service-card::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,var(--isc-bg,#e0f7fe),rgba(255,255,255,0.6));opacity:0;transition:opacity .25s var(--ease)}
.vcn .int-service-card:hover{border-color:var(--isc-accent,#0891b2);box-shadow:0 8px 28px rgba(0,0,0,.08)}
.vcn .int-service-card:hover::before{opacity:1}
.vcn .isc-icon{width:44px;height:44px;border-radius:10px;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.7);border:1px solid rgba(0,0,0,.06);position:relative;z-index:1;flex-shrink:0}
.vcn .isc-icon svg{width:22px;height:22px;color:var(--isc-accent,#0891b2)}
.vcn .isc-title{font-size:13px;font-weight:700;color:var(--isc-accent,#0891b2);line-height:1.4;position:relative;z-index:1}
.vcn .isc-bar{height:3px;width:32px;border-radius:2px;background:var(--isc-accent,#0891b2);opacity:0.35;margin-top:2px;position:relative;z-index:1;transition:width .3s var(--ease),opacity .3s var(--ease)}
.vcn .int-service-card:hover .isc-bar{width:56px;opacity:0.7}
.vcn .sec-head-sub{font-size:14px;color:var(--text-dim);line-height:1.7;margin-top:10px}
@media(min-width:560px){.vcn .int-cards-grid{grid-template-columns:repeat(3,1fr)}}
@media(min-width:860px){.vcn .int-cards-grid{grid-template-columns:repeat(4,1fr)}}

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
.vcn .cert-pill{padding:8px 14px;border:1.5px solid rgba(6,182,212,.3);border-radius:var(--radius-pill);font-size:11.5px;font-weight:600;color:var(--cyan-dark);background:rgba(6,182,212,.08)}
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
.vcn .portfolio-sector{font-family:var(--font-mono);font-size:10.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--cyan-dark);padding:4px 10px;border:1px solid rgba(6,182,212,.25);border-radius:var(--radius-pill);background:rgba(6,182,212,.08)}
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
.vcn .ind-tab-bg{position:absolute;inset:0;background:linear-gradient(120deg,#0891b2,#0284c7);border-radius:9px;z-index:0}
.vcn .ind-tab-label{position:relative;z-index:1;display:flex;align-items:center;gap:6px;font-family:var(--font-display);font-size:12.5px;font-weight:600;color:var(--text-mid)}
.vcn .ind-tab.active .ind-tab-label{color:#fff;font-weight:800}
.vcn .ind-panel{display:grid;grid-template-columns:1fr;background:var(--panel);border:1px solid var(--line);border-radius:var(--radius-lg);overflow:hidden;box-shadow:var(--shadow-md);backdrop-filter:blur(10px)}
.vcn .ind-panel-img{position:relative;min-height:220px}
.vcn .ind-panel-img img{width:100%;height:100%;object-fit:cover;min-height:220px;filter:saturate(1.05) brightness(.92)}
.vcn .ind-panel-img-overlay{position:absolute;inset:0;background:linear-gradient(160deg,rgba(6,182,212,.25),transparent 55%)}
.vcn .ind-panel-body{padding:26px 22px;display:flex;flex-direction:column;justify-content:center}
.vcn .ind-panel-icon{font-size:28px;margin-bottom:12px}
.vcn .ind-panel-body h3{font-size:clamp(19px,3vw,24px);font-weight:600;margin-bottom:16px}
.vcn .ind-panel-body ul{list-style:none;margin:0;padding:0;display:grid;gap:12px}
.vcn .ind-panel-body li{font-size:13.5px;color:var(--text-mid);display:flex;gap:10px;align-items:flex-start;line-height:1.6}
.vcn .idot{width:6px;height:6px;border-radius:50%;background:var(--cyan);flex-shrink:0;margin-top:7px}

/* SUPPORT & SLA (new) */
.vcn .tier-tabs{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-bottom:20px}
.vcn .tier-tab{font-family:var(--font-mono);font-size:12px;font-weight:700;padding:11px 18px;border-radius:var(--radius-pill);border:1px solid rgba(6,182,212,.2);background:rgba(255,255,255,0.9);color:var(--text-mid);cursor:pointer;transition:all .25s var(--ease)}
.vcn .tier-tab:hover{border-color:var(--cyan);color:var(--cyan)}
.vcn .tier-tab.active{background:linear-gradient(120deg,#0891b2,#0284c7);color:#fff;border-color:transparent}
.vcn .tier-panel{max-width:720px;margin:0 auto;background:var(--panel);border:1px solid var(--line);border-radius:var(--radius-lg);padding:26px 22px;backdrop-filter:blur(10px)}
.vcn .tier-head{display:flex;justify-content:space-between;align-items:flex-start;gap:14px;flex-wrap:wrap;padding-bottom:18px;border-bottom:1px solid var(--line);margin-bottom:18px}
.vcn .tier-head h3{font-size:19px;font-weight:700;margin-bottom:6px}
.vcn .tier-tag{font-size:11.5px;color:var(--amber)}
.vcn .tier-response{text-align:right}
.vcn .tier-response-v{display:block;font-family:var(--font-mono);font-size:26px;font-weight:800;background:var(--grad-signal);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.vcn .tier-response-l{font-size:10.5px;color:var(--text-dim)}
.vcn .tier-grid{display:grid;grid-template-columns:1fr;gap:10px;margin-bottom:18px}
.vcn .tier-stat{background:rgba(6,182,212,.04);border:1px solid rgba(6,182,212,.12);border-radius:11px;padding:12px 14px;display:flex;justify-content:space-between;align-items:center;gap:10px}
.vcn .tier-stat-l{font-size:11.5px;color:var(--text-dim)}
.vcn .tier-stat-v{font-size:12.5px;font-weight:700;color:var(--text-hi);text-align:right}
.vcn .tier-coverage{list-style:none;margin:0;padding:0;display:grid;gap:10px}
.vcn .tier-coverage li{display:flex;gap:9px;align-items:flex-start;font-size:13px;color:var(--text-mid);line-height:1.6}

/* PARTNERS — marquee */
.vcn .partners-sec{padding:60px 0 66px;background:linear-gradient(160deg,#e0f7fe,#f0fbff);border-top:1px solid var(--line)}
.vcn .marquee{overflow:hidden;margin-top:30px;-webkit-mask-image:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent);mask-image:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)}
.vcn .marquee-track{display:flex;gap:12px;width:max-content;animation:marquee 34s linear infinite;padding:0 18px}
.vcn .marquee:hover .marquee-track{animation-play-state:paused}
@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.vcn .p-chip{width:128px;aspect-ratio:16/9;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.9);border:1px solid rgba(6,182,212,.18);border-radius:13px;padding:14px;transition:all .3s var(--ease)}
.vcn .p-chip:hover{background:#fff;border-color:var(--cyan);box-shadow:0 4px 16px rgba(6,182,212,.15)}
.vcn .p-chip img{max-width:86%;max-height:86%;object-fit:contain;filter:grayscale(.2) brightness(1.1) opacity(.9);transition:all .3s var(--ease)}
.vcn .p-chip:hover img{filter:grayscale(0) brightness(1.05) opacity(1)}

@keyframes float-gentle{
  0% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-3px) rotate(0.5deg); }
  50% { transform: translateY(0px) rotate(-0.5deg); }
  75% { transform: translateY(3px) rotate(0.2deg); }
  100% { transform: translateY(0px) rotate(0deg); }
}

@media(max-width:559px){
  .vcn .marquee{-webkit-mask-image:none;mask-image:none;overflow:visible;padding:0 4px}
  .vcn .marquee-track{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;width:100%;animation:none;padding:0 8px}
  .vcn .p-chip{width:100%;aspect-ratio:16/10;animation:float-gentle 6s ease-in-out infinite;flex-shrink:1}
  .vcn .p-chip:nth-child(n+13){display:none}
  .vcn .p-chip:nth-child(2n){animation-delay:-1.5s;animation-duration:7s}
  .vcn .p-chip:nth-child(3n){animation-delay:-3s;animation-duration:8s}
  .vcn .p-chip:nth-child(5n){animation-delay:-4.5s;animation-duration:5.5s}
}

/* CTA / CONTACT */
.vcn .cta-sec{background:linear-gradient(160deg,#e0f7fe 0%,#f0fbff 50%,#e0f7fe 100%);padding:68px 0;position:relative;overflow:hidden;border-top:1px solid rgba(6,182,212,.15)}
.vcn .cta-glow{position:absolute;inset:0;background:radial-gradient(ellipse 60% 50% at 50% 0%,rgba(6,182,212,.15),transparent 65%);pointer-events:none}
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
.vcn .help-window{background:rgba(6,182,212,.04);border:1px solid var(--line);border-radius:10px;padding:13px}
.vcn .help-window strong{display:block;color:var(--text-hi);font-size:11.5px;margin-bottom:4px}
.vcn .help-window span{color:var(--text-dim);font-size:11.5px}

/* INLINE CONSULTATION FORM */
.vcn .inline-form-wrap{max-width:860px;margin:0 auto 40px;position:relative;z-index:1}
.vcn .inline-enquiry-form{background:rgba(255,255,255,0.92);border:1px solid rgba(6,182,212,.2);border-radius:var(--radius-lg);padding:28px 26px;backdrop-filter:blur(16px);box-shadow:0 8px 32px rgba(6,182,212,.1);transition:box-shadow .3s var(--ease),border-color .3s var(--ease)}
.vcn .inline-enquiry-form.ief-highlight{border-color:var(--cyan);box-shadow:0 0 0 3px rgba(6,182,212,.25),0 8px 40px rgba(6,182,212,.25);animation:iefPulse 0.5s ease-in-out 3}
@keyframes iefPulse{0%,100%{box-shadow:0 0 0 3px rgba(6,182,212,.25),0 8px 40px rgba(6,182,212,.2)}50%{box-shadow:0 0 0 6px rgba(6,182,212,.4),0 12px 48px rgba(6,182,212,.35)}}
.vcn .ief-grid{display:grid;grid-template-columns:1fr;gap:14px;margin-bottom:18px}
.vcn .ief-full{grid-column:1/-1}
.vcn .ief-submit{width:100%;justify-content:center;margin-top:2px}
.vcn .ief-success{background:rgba(255,255,255,0.92);border:1px solid rgba(6,182,212,.25);border-radius:var(--radius-lg);padding:40px 26px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:12px;backdrop-filter:blur(16px)}
.vcn .ief-success-icon{width:60px;height:60px;border-radius:50%;background:rgba(6,182,212,.12);color:#0891b2;display:flex;align-items:center;justify-content:center;margin-bottom:4px}
.vcn .ief-success h3{font-size:22px;font-weight:700;color:var(--text-hi)}
.vcn .ief-success p{font-size:13.5px;color:var(--text-mid);line-height:1.6;max-width:340px}
@media(min-width:560px){.vcn .ief-grid{grid-template-columns:1fr 1fr}}

/* FOOTER */
.vcn footer{background:linear-gradient(160deg,#e0f7fe,#f0fbff);padding:44px 18px 22px;border-top:1px solid rgba(6,182,212,.2)}
.vcn .footer-inner{max-width:1200px;margin:0 auto}
.vcn .footer-top{display:grid;grid-template-columns:1fr;gap:30px;padding-bottom:34px;border-bottom:1px solid var(--line)}
.vcn .ft-desc{font-size:12px;color:var(--text-dim);line-height:1.75;max-width:260px;margin-top:12px}
.vcn .ft-col h5{font-size:9.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--text-hi);font-weight:700;margin-bottom:13px}
.vcn .ft-col a,.vcn .ft-contact span{display:block;font-size:12px;color:var(--text-dim);margin-bottom:9px;text-decoration:none;transition:color .2s var(--ease)}
.vcn .ft-col a:hover{color:var(--cyan)}
.vcn .ft-quote{display:inline-block;margin-top:6px;background:linear-gradient(120deg,#0891b2,#0284c7);color:#fff !important;font-size:11.5px;font-weight:700;padding:9px 16px;border-radius:var(--radius-pill)}
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
  .vcn .nav{grid-template-columns:auto 1fr auto}
  .vcn .nav-links{display:flex}
  .vcn .nav-cta-desktop{display:inline-flex}
  .vcn .ham-btn{display:none}
  .vcn .g4{grid-template-columns:repeat(3,1fr)}
  .vcn .prod-card{grid-template-columns:.85fr 1.15fr}
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

/* FLOATING WHATSAPP CHAT */
.vcn .wa-float {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 999;
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: transform 0.3s var(--ease);
}
.vcn .wa-float:hover {
  transform: translateY(-4px);
}
.vcn .wa-text {
  background: rgba(255,255,255, 0.95);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(6,182,212,.3);
  color: var(--text-hi);
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .08em;
  padding: 6px 12px;
  border-radius: var(--radius-pill);
  box-shadow: 0 4px 16px rgba(6,182,212,.12);
  white-space: nowrap;
  pointer-events: none;
  transition: opacity 0.3s var(--ease);
}
.vcn .wa-icon-wrap {
  width: 48px;
  height: 48px;
  background: #25D366;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(37, 211, 102, 0.4), 0 0 0 1px rgba(37, 211, 102, 0.2);
  transition: box-shadow 0.3s var(--ease);
}
.vcn .wa-float:hover .wa-icon-wrap {
  box-shadow: 0 12px 30px rgba(37, 211, 102, 0.6), 0 0 0 3px rgba(37, 211, 102, 0.3);
}
@media (max-width: 559px) {
  .vcn .wa-float {
    bottom: 18px;
    right: 18px;
    gap: 8px;
  }
  .vcn .wa-icon-wrap {
    width: 42px;
    height: 42px;
  }
  .vcn .wa-icon-wrap svg {
    width: 20px;
    height: 20px;
  }
  .vcn .wa-text {
    font-size: 9px;
    padding: 5px 10px;
  }
}

/* MODAL & FORM STYLE */
.vcn .modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(6, 182, 212, 0.08);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}
.vcn .modal-card {
  width: 100%;
  max-width: 580px;
  background: #f0fbff;
  border: 1px solid rgba(6,182,212,.3);
  border-radius: var(--radius-lg);
  padding: 34px 28px;
  position: relative;
  box-shadow: 0 30px 70px rgba(6,182,212,.15);
}
.vcn .modal-close {
  position: absolute;
  top: 18px;
  right: 18px;
  background: transparent;
  border: none;
  color: var(--text-dim);
  cursor: pointer;
  padding: 6px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s var(--ease);
}
.vcn .modal-close:hover {
  background: var(--panel-hover);
  color: var(--text-hi);
}
.vcn .enquiry-form .form-head {
  margin-bottom: 24px;
  text-align: center;
}
.vcn .enquiry-form .form-head h3 {
  font-size: 22px;
  font-weight: 700;
  margin-top: 8px;
  color: var(--text-hi);
}
.vcn .enquiry-form .form-head p {
  font-size: 12px;
  color: var(--text-dim);
  margin-top: 6px;
  line-height: 1.5;
}
.vcn .form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
}
@media (min-width: 480px) {
  .vcn .form-grid {
    grid-template-columns: 1fr 1fr;
  }
  .vcn .form-group.full-width {
    grid-column: span 2;
  }
}
.vcn .form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.vcn .form-group label {
  font-size: 11.5px;
  font-weight: 600;
  color: var(--text-mid);
}
.vcn .form-group input,
.vcn .form-group select,
.vcn .form-group textarea {
  background: var(--void);
  border: 1px solid var(--line);
  border-radius: var(--radius-sm);
  padding: 10px 12px;
  font-size: 12.5px;
  color: var(--text-hi);
  font-family: inherit;
  transition: all 0.2s var(--ease);
}
.vcn .form-group input:focus,
.vcn .form-group select:focus,
.vcn .form-group textarea:focus {
  outline: none;
  border-color: var(--cyan);
  background: rgba(240,251,255,0.8);
  box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.2);
}
.vcn .form-success {
  text-align: center;
  padding: 30px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}
.vcn .success-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(37, 211, 102, 0.1);
  color: #25d366;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
}
.vcn .form-success h3 {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-hi);
}
.vcn .form-success p {
  font-size: 13.5px;
  color: var(--text-mid);
  line-height: 1.6;
  max-width: 320px;
}
`;