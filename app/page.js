'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const LOGO_H = '/vcn_logo_without_tagline_horizontalsize.jpeg';
const LOGO_SQ = '/vcn_logo_with_tagline_squaresize.jpeg';
const COMPANY = 'Visual Connect Network Pvt. Ltd.';

/* ─── PARTNER LOGOS (public CDN / Wikimedia / official) ─── */
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

/* ─── DATA ─────────────────────────────────────────────── */
const NAV = ['Solutions', 'About', 'Process', 'Industries', 'Partners', 'Contact'];

const SOLUTIONS = [
  { icon: '📡', color: '#dbeafe', title: 'CCTV & Security', desc: 'IP cameras, PTZ, NVRs, DVRs, VMS software, access control & surveillance storage.' },
  { icon: '🖥️', color: '#fce7f3', title: 'Audio-Visual Systems', desc: 'LED walls, video conferencing, interactive panels, projectors & digital signage.' },
  { icon: '🔌', color: '#dcfce7', title: 'Networking & IT', desc: 'Switches, routers, access points, structured cabling & data centre networking.' },
  { icon: '🔊', color: '#fef9c3', title: 'PA Systems', desc: 'Amplifiers, speakers, paging, conference systems & emergency evacuation.' },
  { icon: '🧪', color: '#ede9fe', title: 'Test & Measurement', desc: 'Oscilloscopes, spectrum analysers, signal generators & calibration equipment.' },
  { icon: '⚡', color: '#ffedd5', title: 'Power Solutions', desc: 'UPS systems, battery banks, PDUs & uninterrupted power backup solutions.' },
  { icon: '💻', color: '#cffafe', title: 'Computing & Electronics', desc: 'Laptops, workstations, monitors, printers, tablets & handheld devices.' },
  { icon: '🪑', color: '#fdf2f8', title: 'Office Infrastructure', desc: 'Modular furniture, workstations, conference rooms & complete office setups.' },
];

const PRODUCT_GROUPS = [
  {
    title: 'Test & Measurement Equipment', icon: '🧪', color: '#ede9fe',
    img: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&q=80',
    desc: 'Precision instruments for electronic, RF, and industrial measurement.',
    items: ['Electronic test instruments', 'Calibration equipment', 'RF & communication test equipment', 'Multimeters', 'Oscilloscopes', 'Spectrum analyzers', 'Signal generators', 'Power analyzers', 'Environmental testing equipment']
  },
  {
    title: 'Networking & IT Infrastructure', icon: '🔌', color: '#dcfce7',
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80',
    desc: 'Enterprise-grade connectivity from edge to core.',
    items: ['Switches', 'Routers', 'Wireless access points', 'Network security appliances', 'Structured cabling', 'Data center networking', 'Network monitoring solutions']
  },
  {
    title: 'Audio-Visual (AV) Systems', icon: '🖥️', color: '#fce7f3',
    img: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&q=80',
    desc: 'Immersive display, conferencing, and signage solutions.',
    items: ['LED displays & video walls', 'Interactive flat panels', 'Projectors & projection systems', 'Video conferencing systems', 'Digital signage solutions', 'AV control systems']
  },
  {
    title: 'Public Address (PA) Systems', icon: '🔊', color: '#fef9c3',
    img: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&q=80',
    desc: 'Crystal-clear audio infrastructure for any environment.',
    items: ['Amplifiers', 'Speakers', 'Microphones', 'Paging systems', 'Conference & discussion systems', 'Emergency voice evacuation']
  },
  {
    title: 'CCTV & Security Solutions', icon: '📡', color: '#dbeafe',
    img: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=600&q=80',
    desc: 'End-to-end surveillance and access control ecosystems.',
    items: ['IP cameras', 'PTZ cameras', 'NVRs & DVRs', 'Video management software (VMS)', 'Access control systems', 'Surveillance storage']
  },
  {
    title: 'Computing & Electronics', icon: '💻', color: '#cffafe',
    img: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80',
    desc: 'Workstations, laptops, and peripherals for every workflow.',
    items: ['Laptops', 'Desktop computers', 'Workstations', 'Monitors & displays', 'Printers & peripherals', 'Tablets & handheld devices']
  },
  {
    title: 'Power Solutions', icon: '⚡', color: '#ffedd5',
    img: 'https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=600&q=80',
    desc: 'Uninterrupted power infrastructure from rack to building.',
    items: ['UPS systems', 'Industrial & Online UPS', 'Batteries & battery banks', 'Power distribution units (PDUs)', 'Power backup solutions']
  },
  {
    title: 'Office Infrastructure', icon: '🪑', color: '#fdf2f8',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
    desc: 'Complete workplace fit-outs from furniture to tech.',
    items: ['Modular office furniture', 'Executive & workstation furniture', 'Conference room furniture', 'Storage solutions', 'Complete office setup']
  },
];

const STEPS = [
  { n: '01', title: 'Requirement Analysis', desc: 'Deep-dive sessions to understand your technical and operational objectives.' },
  { n: '02', title: 'Specification Design', desc: 'Precise technical specs and solution blueprints tailored to your environment.' },
  { n: '03', title: 'OEM Sourcing', desc: 'Direct procurement from leading manufacturers — no middlemen, full reliability.' },
  { n: '04', title: 'Installation & Commissioning', desc: 'Expert deployment, testing, acceptance support and handover.' },
];

const INDUSTRIES = [
  { name: 'Government & Defense', icon: '🏛️', img: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=900&q=80', points: ['Secure surveillance, command center AV, and communication infrastructure.', 'Specification-aligned procurement with strict compliance and delivery standards.'] },
  { name: 'Education & Research', icon: '🎓', img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900&q=80', points: ['Laboratory test equipment, campus networking, and digital classroom AV systems.', 'Integrated deployment for scalable learning and research environments.'] },
  { name: 'Corporate Offices', icon: '🏢', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80', points: ['Conference AV, PA systems, networking backbone, and secure access infrastructure.', 'Complete office technology and furniture setup support through aligned partners.'] },
  { name: 'Manufacturing', icon: '🏭', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&q=80', points: ['Industrial test equipment, rugged networking, CCTV, and power backup systems.', 'High-reliability solutions with commissioning and maintenance support.'] },
  { name: 'Telecom', icon: '📶', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80', points: ['Network-grade switching, routing, monitoring, and security infrastructure.', 'Support for high-availability systems and distributed operations.'] },
  { name: 'Healthcare', icon: '🏥', img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&q=80', points: ['Critical surveillance, communication systems, UPS power continuity, and IT infrastructure.', 'Precise planning and dependable execution for sensitive operational environments.'] },
  { name: 'Smart Buildings', icon: '🏗️', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80', points: ['Integrated AV, PA, security, networking, and centralized management systems.', 'Future-ready architectures that simplify operations and improve control.'] },
  { name: 'Data Centers', icon: '💾', img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&q=80', points: ['Core networking, monitoring, power distribution, UPS, and security ecosystem support.', 'Design-to-acceptance services for performance-driven and resilient deployments.'] },
];

const HERO_SERVICES = [
  { icon: '📡', color: '#dbeafe', t: 'CCTV & Security', d: 'IP cameras, NVRs & access control' },
  { icon: '🖥️', color: '#fce7f3', t: 'Audio-Visual', d: 'LED walls & conferencing systems' },
  { icon: '🔌', color: '#dcfce7', t: 'Networking & IT', d: 'Switches, cabling & Wi-Fi' },
  { icon: '🧪', color: '#ede9fe', t: 'Test & Measurement', d: 'Oscilloscopes & analysers' },
];

const VALUES = [
  { icon: '🎯', title: 'Precision First', desc: 'Exact technical specifications before any procurement begins.' },
  { icon: '🤝', title: 'OEM Direct', desc: 'Direct from leading manufacturers — authentic and reliable.' },
  { icon: '🔧', title: 'End-to-End', desc: 'Design, installation, commissioning and annual maintenance.' },
  { icon: '💡', title: 'Tailored Solutions', desc: 'Every deployment custom-engineered to your exact needs.' },
  { icon: '🌐', title: 'Trusted Partners', desc: 'Vetted ecosystem of partners to close any scope gap.' },
  { icon: '📋', title: 'Full Accountability', desc: 'Single point of contact, clear SLAs, transparent management.' },
];

const STATS = [
  { v: '500+', l: 'Projects Delivered' },
  { v: '9', l: 'Solution Verticals' },
  { v: '8+', l: 'Industries Served' },
  { v: '100%', l: 'OEM Direct Sourcing' },
];

/* ─── CSS ───────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Space+Grotesk:wght@400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --ink:#07080f;--fog:#f4f6fb;--mist:#5e6a84;--gold:#f59e0b;--blue:#3b5bfc;
  /* Megn exact gradient colours */
  --g1:#1a1aff;--g2:#3d1aff;--g3:#7c3aed;--g4:#e0197d;
  --grad:linear-gradient(135deg,var(--g1) 0%,var(--g2) 25%,var(--g3) 55%,var(--g4) 100%);
}
html{scroll-behavior:smooth;font-size:16px}
body{font-family:'Space Grotesk',sans-serif;color:var(--ink);background:#fff;overflow-x:hidden}
h1,h2,h3,h4,h5{font-family:'DM Sans',sans-serif;font-weight:600;letter-spacing:-.025em}

/* ── PROFESSIONAL LIGHT HERO ── */
.hero{
  position:relative;overflow:hidden;
  padding:0 5vw 0;
  background:linear-gradient(165deg,#f8fafc 0%,#ffffff 45%,#f1f5fb 100%);
  border-bottom:1px solid #e4eaf4;
}
.hero::before{
  content:'';position:absolute;inset:0;pointer-events:none;
  background:
    radial-gradient(ellipse 55% 45% at 92% 8%, rgba(59,91,252,.07) 0%, transparent 55%),
    radial-gradient(ellipse 40% 40% at 4% 92%, rgba(245,158,11,.06) 0%, transparent 50%),
    linear-gradient(rgba(7,8,15,.035) 1px,transparent 1px),
    linear-gradient(90deg,rgba(7,8,15,.035) 1px,transparent 1px);
  background-size:auto,auto,52px 52px,52px 52px;
}
.hero::after{
  content:'';position:absolute;top:0;left:0;width:4px;height:100%;
  background:linear-gradient(180deg,var(--gold) 0%,var(--blue) 100%);
  opacity:.85;
}
.hero-inner{
  max-width:1200px;margin:0 auto;width:100%;
  position:relative;z-index:1;
  padding:120px 0 56px;
}
.hero-grid{
  display:grid;grid-template-columns:1.05fr .95fr;
  grid-template-rows:auto auto;
  gap:56px 56px;align-items:start;
}
.hero-main{grid-column:1;grid-row:1}
.hero-panel{grid-column:2;grid-row:1/span 2;align-self:center}
.hero-trust{grid-column:1;grid-row:2}

/* ── NAV — centered frosted pill (exact Megn style) ── */
.nav-wrap{
  position:fixed;top:16px;left:50%;transform:translateX(-50%);
  z-index:99;width:calc(100% - 32px);max-width:1040px;
  pointer-events:none;
}
.nav{
  pointer-events:all;
  display:grid;
  grid-template-columns:auto 1fr auto auto;
  align-items:center;
  gap:0;
  background:rgba(255,255,255,.94);
  backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);
  border:1px solid rgba(7,8,15,.08);
  border-radius:100px;
  height:56px;padding:0 10px 0 16px;
  width:100%;
  box-shadow:0 4px 24px rgba(7,8,15,.06);
  transition:background .35s,box-shadow .35s,border-color .35s;
}
.nav.scrolled{
  background:rgba(255,255,255,.98);
  border-color:rgba(7,8,15,.1);
  box-shadow:0 8px 32px rgba(7,8,15,.1);
}
.nav-logo{display:flex;align-items:center;cursor:pointer;flex-shrink:0;padding:4px 0}
.nav-logo img{height:34px;width:auto;object-fit:contain;display:block}
.logo-text{font-family:'DM Sans',sans-serif;font-size:16px;font-weight:700;color:var(--ink);letter-spacing:-.02em;white-space:nowrap}
.logo-sub{font-size:6px;letter-spacing:.18em;text-transform:uppercase;color:var(--mist);display:block;margin-top:1px}
/* center links in the middle column */
.nav-links{
  display:flex;align-items:center;justify-content:center;
  gap:4px;
}
.nav-links a{
  color:var(--ink);font-size:14.5px;font-weight:600;
  text-decoration:none;transition:color .2s,background .2s,box-shadow .2s;white-space:nowrap;
  padding:8px 14px;border-radius:100px;
  background:linear-gradient(135deg,rgba(59,91,252,.06) 0%,rgba(245,158,11,.05) 100%);
  border:1px solid rgba(59,91,252,.12);
}
.nav-links a:hover{
  color:var(--blue);background:rgba(59,91,252,.1);
  border-color:rgba(59,91,252,.25);box-shadow:0 2px 12px rgba(59,91,252,.12);
}
.btn-cta{
  background:linear-gradient(135deg,var(--blue) 0%,#2f4fe0 100%);color:#fff;
  font-size:13.5px;font-weight:700;
  padding:10px 20px;border-radius:100px;
  text-decoration:none;white-space:nowrap;
  transition:opacity .2s,transform .2s,box-shadow .2s;letter-spacing:.01em;
  display:inline-flex;align-items:center;gap:6px;
  margin-left:10px;flex-shrink:0;
  box-shadow:0 4px 16px rgba(59,91,252,.28);
  border:1px solid rgba(255,255,255,.15);
}
.btn-cta:hover{opacity:.95;transform:scale(1.03);box-shadow:0 6px 22px rgba(59,91,252,.35)}
.btn-cta svg{width:14px;height:14px;flex-shrink:0}
.nav-cta-desktop{display:inline-flex}

/* hamburger — takes the cta slot on mobile */
.ham-btn{display:none;background:var(--fog);border:1px solid #e4eaf4;
  border-radius:100px;cursor:pointer;padding:8px 12px;color:var(--ink);margin-left:8px;
  align-items:center;justify-content:center;gap:4px}
.mob-menu{
  display:none;position:fixed;top:78px;
  left:50%;transform:translateX(-50%);
  width:calc(100% - 24px);max-width:420px;
  z-index:98;
  background:rgba(255,255,255,.98);backdrop-filter:blur(28px);
  border:1px solid #e4eaf4;
  border-radius:24px;padding:16px;flex-direction:column;gap:4px;
  box-shadow:0 16px 48px rgba(7,8,15,.12);
}
.mob-menu.open{display:flex}
.mob-menu a{color:var(--mist);font-size:15px;font-weight:500;text-decoration:none;
  padding:12px 16px;border-radius:12px;transition:background .2s;text-align:center}
.mob-menu a:hover{background:var(--fog);color:var(--ink)}
.mob-menu .btn-cta{
  width:auto;align-self:center;display:inline-flex;
  margin-top:8px;padding:10px 22px;font-size:13.5px;
}
.mob-menu-logo{display:flex;justify-content:center;margin-bottom:8px;padding:8px 0}
.mob-menu-logo img{height:48px;width:auto;object-fit:contain}

/* ── HERO CONTENT ── */
.hero-copy{text-align:left}
.hero-badge{
  display:inline-flex;align-items:center;gap:8px;
  background:#fff;border:1px solid #e4eaf4;
  border-radius:100px;padding:5px 16px 5px 10px;
  font-size:11px;font-weight:700;color:var(--blue);letter-spacing:.1em;text-transform:uppercase;
  margin-bottom:22px;box-shadow:0 2px 12px rgba(7,8,15,.04);
}
.hero-badge-dot{width:6px;height:6px;border-radius:50%;background:var(--gold)}
.hero h1{
  font-size:clamp(32px,4.6vw,54px);font-weight:600;color:var(--ink);
  line-height:1.12;letter-spacing:-.03em;margin-bottom:18px;max-width:560px;
}
.hero h1 em{
  font-style:normal;color:var(--blue);font-weight:600;
}
.hero-sub{
  font-size:clamp(15px,1.8vw,17px);color:var(--mist);line-height:1.75;
  max-width:520px;margin-bottom:28px;
}
.hero-btns{display:flex;gap:12px;flex-wrap:wrap;justify-content:flex-start}
.btn-hero-primary{
  background:var(--blue);color:#fff;
  font-size:14px;font-weight:700;
  padding:14px 26px;border-radius:10px;
  text-decoration:none;
  transition:transform .2s,box-shadow .2s,background .2s;
  display:flex;align-items:center;gap:8px;
}
.btn-hero-primary:hover{transform:translateY(-2px);box-shadow:0 10px 28px rgba(59,91,252,.28);background:#2f4fe0}
.btn-hero-secondary{
  background:#fff;color:var(--ink);
  font-size:14px;font-weight:600;
  padding:13px 26px;border-radius:10px;
  border:1.5px solid #d8dee9;
  text-decoration:none;
  transition:background .2s,border-color .2s;
}
.btn-hero-secondary:hover{background:var(--fog);border-color:#b8c4d9}
.hero-trust{
  display:flex;gap:28px;flex-wrap:wrap;margin-top:0;
  padding-top:28px;border-top:1px solid #e4eaf4;
}
.hero-trust-item{min-width:88px}
.hero-trust-v{
  font-family:'DM Sans',sans-serif;font-size:26px;font-weight:700;
  color:var(--ink);letter-spacing:-.03em;line-height:1;
}
.hero-trust-l{font-size:11px;color:var(--mist);margin-top:5px;line-height:1.4;max-width:120px}

/* hero service panel */
.hero-panel{position:relative}
.hero-panel-card{
  background:#fff;border:1px solid #e4eaf4;border-radius:20px;
  padding:24px;box-shadow:0 16px 48px rgba(7,8,15,.07);
}
.hero-panel-head{
  display:flex;align-items:center;justify-content:space-between;
  margin-bottom:18px;padding-bottom:16px;border-bottom:1px solid #edf0f7;
}
.hero-panel-head h3{
  font-family:'DM Sans',sans-serif;font-size:15px;font-weight:600;color:var(--ink);
  letter-spacing:-.02em;
}
.hero-panel-head span{
  font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;
  color:var(--gold);background:#fffbeb;border:1px solid #fde68a;
  padding:4px 10px;border-radius:100px;
}
.hero-services-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.hero-svc-card{
  background:var(--fog);border:1px solid #e6ebf5;border-radius:14px;
  padding:16px;transition:border-color .25s,box-shadow .25s,transform .25s;
}
.hero-svc-card:hover{
  border-color:rgba(59,91,252,.35);box-shadow:0 8px 24px rgba(7,8,15,.06);
  transform:translateY(-2px);
}
.hero-svc-icon{
  width:40px;height:40px;border-radius:10px;
  display:flex;align-items:center;justify-content:center;
  font-size:18px;margin-bottom:10px;
}
.hero-svc-card h5{
  font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;
  color:var(--ink);margin-bottom:4px;letter-spacing:-.01em;
}
.hero-svc-card p{font-size:11.5px;color:var(--mist);line-height:1.5}
.hero-panel-foot{
  margin-top:16px;padding-top:14px;border-top:1px solid #edf0f7;
  display:flex;align-items:center;gap:10px;font-size:12px;color:var(--mist);
}
.hero-panel-foot strong{color:var(--ink);font-weight:600}

/* ── STATS BAR ── */
.stats-bar{background:#fff;border-bottom:1px solid #edf0f7}
.stats-inner{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);padding:0 5vw}
.stat{padding:26px 16px;text-align:center;border-right:1px solid #edf0f7}
.stat:last-child{border-right:none}
.stat-v{font-family:'DM Sans',sans-serif;font-size:clamp(28px,3.5vw,40px);font-weight:700;letter-spacing:-.03em;
  color:var(--blue);line-height:1}
.stat-l{font-size:11px;color:var(--mist);margin-top:5px;letter-spacing:.03em;text-transform:uppercase}

/* ── GENERIC SECTION ── */
.sec{padding:80px 5vw}
.sec-fog{background:var(--fog)}
.sec-dark{background:var(--ink)}
.inner{max-width:1200px;margin:0 auto}
.sec-head{text-align:center;margin-bottom:52px}
.stag{display:inline-block;font-size:clamp(13px,1.6vw,16px);font-weight:700;letter-spacing:.14em;
  text-transform:uppercase;padding:8px 18px;border-radius:100px;margin-bottom:16px;font-family:'DM Sans',sans-serif}
.stag-blue  {background:#eff6ff;color:#2563eb;border:1px solid #bfdbfe}
.stag-pink  {background:#fdf2f8;color:#db2777;border:1px solid #fbcfe8}
.stag-purple{background:#f5f3ff;color:#7c3aed;border:1px solid #ddd6fe}
.stag-teal  {background:#f0fdfa;color:#0d9488;border:1px solid #99f6e4}
.stag-amber {background:#fffbeb;color:#b45309;border:1px solid #fde68a}
.stag-white {background:rgba(255,255,255,.1);color:#fff;border:1px solid rgba(255,255,255,.2)}
.sec-head h2{font-size:clamp(26px,3.8vw,46px);font-weight:600;letter-spacing:-.03em;line-height:1.15}
.sec-head h2.on-dark{color:#fff}
.sec-head p{font-size:15px;color:var(--mist);max-width:500px;margin:12px auto 0;line-height:1.72}
.sec-head p.on-dark{color:rgba(255,255,255,.5)}

/* ── SOLUTIONS GRID ── */
.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.sol-card{border-radius:18px;padding:24px 18px 20px;border:1px solid #e6ebf5;background:#fff;
  transition:transform .28s,box-shadow .28s}
.sol-card:hover{transform:translateY(-5px);box-shadow:0 16px 40px rgba(0,0,0,.07)}
.sol-icon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;margin-bottom:13px}
.sol-card h3{font-family:'DM Sans',sans-serif;font-size:14px;font-weight:600;margin-bottom:6px;letter-spacing:-.01em}
.sol-card p{font-size:12px;color:var(--mist);line-height:1.65}

/* products catalogue */
.prod-section{padding:80px 5vw;background:#fff}
.prod-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px}
.prod-card{border-radius:20px;overflow:hidden;border:1px solid #e6ebf5;display:grid;grid-template-columns:1fr 1fr;transition:box-shadow .28s}
.prod-card:hover{box-shadow:0 14px 40px rgba(0,0,0,.08)}
.prod-img img{width:100%;height:100%;object-fit:cover;display:block;min-height:210px;transition:transform .5s}
.prod-card:hover .prod-img img{transform:scale(1.05)}
.prod-body{padding:22px 20px}
.prod-ico{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;margin-bottom:11px}
.prod-body h3{font-family:'DM Sans',sans-serif;font-size:15px;font-weight:600;margin-bottom:6px;letter-spacing:-.02em}
.prod-body .pdesc{font-size:11.5px;color:var(--mist);line-height:1.6;margin-bottom:10px}
.prod-body ul{list-style:none;display:flex;flex-direction:column;gap:4px}
.prod-body li{font-size:11px;color:var(--mist);display:flex;align-items:flex-start;gap:6px;line-height:1.5}
.pdot{width:4px;height:4px;border-radius:50%;background:var(--blue);flex-shrink:0;margin-top:5px}

/* ── ABOUT ── */
.about-grid{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center}
.about-img-wrap{position:relative}
.about-img-wrap img{width:100%;height:400px;object-fit:cover;display:block;border-radius:20px}
.about-badge{position:absolute;bottom:-14px;right:-14px;background:var(--ink);border-radius:14px;
  padding:18px 22px;border:1px solid rgba(255,255,255,.08)}
.about-badge .val{font-family:'DM Sans',sans-serif;font-size:36px;font-weight:700;color:var(--gold);line-height:1;letter-spacing:-.03em}
.about-badge .lbl{font-size:11px;color:rgba(255,255,255,.45);margin-top:4px}
.about-copy h2{font-family:'DM Sans',sans-serif;font-size:clamp(22px,3vw,38px);font-weight:600;letter-spacing:-.03em;margin:12px 0 16px}
.about-copy p{font-size:14px;color:var(--mist);line-height:1.82;margin-bottom:13px}
.feat-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:22px}
.feat{background:var(--fog);border:1px solid #e6ebf5;border-radius:12px;padding:16px}
.feat h4{font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;margin-bottom:4px}
.feat p{font-size:11.5px;color:var(--mist);line-height:1.6}

/* ── VALUES ── */
.val-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.val-card{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:18px;padding:28px 22px;transition:background .2s}
.val-card:hover{background:rgba(255,255,255,.08)}
.val-icon{font-size:26px;margin-bottom:12px}
.val-card h4{font-family:'DM Sans',sans-serif;font-size:14px;font-weight:600;color:#fff;margin-bottom:6px}
.val-card p{font-size:12px;color:rgba(255,255,255,.46);line-height:1.65}

/* ── PROCESS ── */
.proc-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.proc-step{background:#fff;border-radius:18px;padding:24px 18px;border:1px solid #e6ebf5;position:relative}
.step-num{font-family:'DM Sans',sans-serif;width:40px;height:40px;border-radius:10px;
  background:linear-gradient(135deg,#eff6ff,#fce7f3);border:1.5px solid #bfdbfe;
  display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;color:var(--blue);margin-bottom:14px}
.proc-step h4{font-family:'DM Sans',sans-serif;font-size:14px;font-weight:600;margin-bottom:6px}
.proc-step p{font-size:12px;color:var(--mist);line-height:1.65}
.proc-arr{position:absolute;top:30px;right:-11px;width:22px;height:22px;
  background:#fff;border:1px solid #e6ebf5;border-radius:50%;
  display:flex;align-items:center;justify-content:center;font-size:9px;color:var(--mist);z-index:2}

/* ── INDUSTRIES — tabbed sector expertise ── */
.ind-tabs-wrap{margin-bottom:36px}
.ind-tabs{
  display:flex;flex-wrap:wrap;gap:8px;justify-content:center;
  padding:6px;background:var(--fog);border-radius:16px;border:1px solid #e6ebf5;
}
.ind-tab{
  display:inline-flex;align-items:center;gap:7px;
  padding:10px 16px;border-radius:12px;border:1px solid transparent;
  background:transparent;color:var(--mist);
  font-family:'DM Sans',sans-serif;font-size:13.5px;font-weight:600;
  cursor:pointer;transition:all .22s;white-space:nowrap;
}
.ind-tab:hover{color:var(--ink);background:rgba(255,255,255,.7)}
.ind-tab.active{
  background:#fff;color:var(--blue);
  border-color:rgba(59,91,252,.25);
  box-shadow:0 4px 16px rgba(59,91,252,.12);
}
.ind-tab-icon{font-size:16px;line-height:1}
.ind-panel{
  display:grid;grid-template-columns:1.05fr .95fr;gap:40px;
  align-items:center;background:#fff;border:1px solid #e6ebf5;
  border-radius:24px;overflow:hidden;
  box-shadow:0 12px 40px rgba(7,8,15,.06);
}
.ind-panel-img{position:relative;min-height:320px;height:100%}
.ind-panel-img img{width:100%;height:100%;object-fit:cover;display:block;min-height:320px}
.ind-panel-img-overlay{
  position:absolute;inset:0;
  background:linear-gradient(135deg,rgba(7,8,15,.15) 0%,transparent 60%);
  pointer-events:none;
}
.ind-panel-body{padding:36px 32px 36px 8px}
.ind-panel-body .ind-panel-icon{font-size:36px;margin-bottom:14px}
.ind-panel-body h3{
  font-family:'DM Sans',sans-serif;font-size:clamp(22px,2.8vw,32px);
  font-weight:600;margin-bottom:20px;letter-spacing:-.03em;color:var(--ink);
}
.ind-panel-body ul{list-style:none;display:flex;flex-direction:column;gap:14px}
.ind-panel-body li{
  font-size:clamp(15px,1.6vw,17px);color:var(--mist);
  display:flex;gap:10px;align-items:flex-start;line-height:1.65;
}
.ind-panel-body .idot{width:6px;height:6px;border-radius:50%;background:var(--blue);flex-shrink:0;margin-top:9px}
.ind-grid{display:none}

/* ── PARTNERS — flag wave grid ── */
.partners-sec{padding:72px 5vw;background:#fff;border-top:1px solid #edf0f7;perspective:1000px}
.partners-grid-wrap{margin-top:44px;max-width:1000px;margin-left:auto;margin-right:auto;animation:tableFlagWave 4s ease-in-out infinite;transform-style:preserve-3d}
.partners-grid{display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:16px}
@keyframes tableFlagWave{
  0%,100%{transform:rotateY(-3deg) rotateX(1deg)}
  50%{transform:rotateY(3deg) rotateX(-1deg)}
}
.p-chip{
  display:flex;align-items:center;justify-content:center;
  height:60px;padding:0 28px;
  background:var(--fog);border:1px solid #e6ebf5;border-radius:100px;
  transition:all .22s;gap:10px;
}
.p-chip:hover{background:#eff6ff;border-color:#bfdbfe}
.p-chip img{height:22px;width:auto;object-fit:contain;transition:transform .22s}
.p-chip:hover img{transform:scale(1.1)}
.p-chip-name{font-size:13px;font-weight:700;color:var(--ink);white-space:nowrap;letter-spacing:.01em}

/* ── CTA ── */
.cta-sec{background:var(--grad);padding:90px 5vw;text-align:center;position:relative;overflow:hidden}
.cta-sec::before{content:'';position:absolute;inset:0;
  background:
    radial-gradient(ellipse 60% 60% at 50% 50%,rgba(255,255,255,.08) 0%,transparent 65%),
    radial-gradient(ellipse 80% 50% at 80% 80%,rgba(255,80,180,.3) 0%,transparent 55%);
  pointer-events:none}
.cta-sec h2{font-family:'DM Sans',sans-serif;font-size:clamp(26px,4vw,54px);font-weight:600;color:#fff;
  letter-spacing:-.04em;max-width:660px;margin:12px auto 18px;position:relative;z-index:1;line-height:1.1}
.cta-sec>p{font-size:16px;color:rgba(255,255,255,.68);max-width:460px;margin:0 auto 36px;line-height:1.78;position:relative;z-index:1}
.cta-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;position:relative;z-index:1;margin-bottom:52px}
.contact-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;max-width:820px;margin:0 auto;position:relative;z-index:1}
.contact-card{background:#fff;border:1px solid #e6ebf5;border-radius:18px;padding:24px 20px;text-align:center;
  transition:all .24s;text-decoration:none;color:var(--ink)}
.contact-card:hover{border-color:#bfdbfe;box-shadow:0 10px 28px rgba(59,91,252,.12);transform:translateY(-3px)}
.cc-icon{font-size:28px;margin-bottom:10px}
.cc-lbl{font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--mist);margin-bottom:4px}
.cc-val{font-family:'DM Sans',sans-serif;font-size:13.5px;font-weight:600}
.cc-sub{font-size:11px;color:var(--mist);margin-top:3px}

/* ── FOOTER ── */
footer{background:#060810;padding:56px 5vw 24px}
.footer-inner{max-width:1200px;margin:0 auto}
.footer-top{display:grid;grid-template-columns:2fr 1fr 1fr 1.4fr;gap:36px;
  padding-bottom:40px;border-bottom:1px solid rgba(255,255,255,.06)}
.ft-brand{display:flex;align-items:flex-start;margin-bottom:12px}
.ft-brand img{height:96px;width:auto;max-width:120px;object-fit:contain;display:block}
.ft-brand-text{font-family:'DM Sans',sans-serif;font-size:17px;font-weight:700;color:#fff;letter-spacing:-.02em;line-height:1.2}
.ft-sub{font-size:7.5px;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);display:block;margin:3px 0 12px}
.ft-desc{font-size:12px;color:rgba(255,255,255,.36);line-height:1.78;max-width:230px}
.ft-col h5{font-size:9.5px;letter-spacing:.16em;text-transform:uppercase;color:#fff;font-weight:700;margin-bottom:14px}
.ft-col a,.ft-contact span{display:block;font-size:12px;color:rgba(255,255,255,.4);margin-bottom:9px;text-decoration:none;transition:color .2s}
.ft-col a:hover{color:var(--gold)}
.footer-bot{display:flex;justify-content:space-between;align-items:center;margin-top:20px;font-size:11px;color:rgba(255,255,255,.2)}

/* ── RESPONSIVE ── */
@media(max-width:1024px){
  .g4{grid-template-columns:repeat(2,1fr)}
  .proc-grid{grid-template-columns:repeat(2,1fr)}.proc-arr{display:none}
  .ind-panel{grid-template-columns:1fr}
  .ind-panel-img{min-height:240px}
  .ind-panel-img img{min-height:240px}
  .ind-panel-body{padding:28px 24px}
  .prod-grid{grid-template-columns:1fr}
  .nav-links a{font-size:13.5px;padding:7px 11px}
}
@media(max-width:768px){
  .nav-links{display:none}
  .nav-cta-desktop{display:none}
  .ham-btn{display:flex}
  .about-grid{grid-template-columns:1fr}
  .stats-inner{grid-template-columns:repeat(2,1fr)}
  .val-grid{grid-template-columns:1fr 1fr}
  .footer-top{grid-template-columns:1fr 1fr}
  .contact-grid{grid-template-columns:1fr}
  .hero-inner{padding:104px 0 48px}
  .hero-grid{
    grid-template-columns:1fr;grid-template-rows:auto;
    gap:28px;
  }
  .hero-main,.hero-panel,.hero-trust{grid-column:1;grid-row:auto}
  .hero-main{order:1}
  .hero-panel{order:2}
  .hero-trust{order:3}
  .hero-copy{text-align:center}
  .hero h1{margin-left:auto;margin-right:auto}
  .hero-sub{margin-left:auto;margin-right:auto}
  .hero-btns{justify-content:center}
  .hero-trust{justify-content:center;margin-top:0}
  .ind-tabs{gap:6px;padding:5px}
  .ind-tab{font-size:12.5px;padding:8px 12px}
  .ind-panel-body{padding:24px 20px}
}
@media(max-width:540px){
  .nav{padding:0 8px 0 12px;height:52px}
  .nav-logo img{height:28px}
  .g4,.val-grid,.proc-grid{grid-template-columns:1fr}
  .footer-top{grid-template-columns:1fr}
  .footer-bot{flex-direction:column;gap:6px;text-align:center}
  .feat-grid{grid-template-columns:1fr}
  .prod-card{grid-template-columns:1fr}
  .hero-services-grid{grid-template-columns:1fr 1fr;gap:10px}
  .hero-svc-card p{font-size:11px}
  .hero-trust{gap:20px}
  .about-badge{bottom:-10px;right:-4px}
  .stats-inner{grid-template-columns:repeat(2,1fr)}
}
`;

/* ─── COMPONENT ─────────────────────────────────────────── */
export default function VCNPLPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [activeIndustry, setActiveIndustry] = useState(0);
  const styleInjected = useRef(false);

  useEffect(() => {
    const styleId = 'vcnpl-page-styles';
    let styleEl = document.getElementById(styleId);
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = CSS;
    styleInjected.current = true;

    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const goto = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  // Double array for seamless marquee
  const chips2 = [...PARTNERS, ...PARTNERS];
  const activeInd = INDUSTRIES[activeIndustry];

  const heroPanel = (
    <div className="hero-panel-card">
      <div className="hero-panel-head">
        <h3>Core Service Verticals</h3>
        <span>8 Categories</span>
      </div>
      <div className="hero-services-grid">
        {HERO_SERVICES.map((c) => (
          <div key={c.t} className="hero-svc-card">
            <div className="hero-svc-icon" style={{ background: c.color }}>{c.icon}</div>
            <h5>{c.t}</h5>
            <p>{c.d}</p>
          </div>
        ))}
      </div>
      <div className="hero-panel-foot">
        <strong>100% OEM direct sourcing</strong>
      </div>
    </div>
  );

  return (
    <>
      {/* ── FLOATING NAV (Megn-style pill) ── */}
      <div className="nav-wrap">
        <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
          <div className="nav-logo" onClick={() => goto('home')}>
            <Image src={LOGO_H} alt={COMPANY} width={160} height={34} priority style={{ height: 34, width: 'auto' }} />
          </div>

          <div className="nav-links">
            {NAV.map(n => (
              <a key={n} href={`#${n.toLowerCase()}`}>{n}</a>
            ))}
          </div>

          <a href="#contact" className="btn-cta nav-cta-desktop">
            <svg viewBox="0 0 16 16" fill="currentColor"><path d="M2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H9l-3 3v-3H4a2 2 0 0 1-2-2V4z" /></svg>
            <span>Get Started</span>
          </a>

          <button className="ham-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {menuOpen
              ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="8" x2="21" y2="8" /><line x1="3" y1="16" x2="21" y2="16" /></svg>
            }
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <div className={`mob-menu${menuOpen ? ' open' : ''}`}>
        <div className="mob-menu-logo">
          <Image src={LOGO_SQ} alt={COMPANY} width={120} height={48} style={{ height: 48, width: 'auto' }} />
        </div>
        {NAV.map(n => <a key={n} href={`#${n.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{n}</a>)}
        <a href="#contact" className="btn-cta" onClick={() => setMenuOpen(false)}>
          <svg viewBox="0 0 16 16" fill="currentColor"><path d="M2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H9l-3 3v-3H4a2 2 0 0 1-2-2V4z" /></svg>
          <span>Get Started</span>
        </a>
      </div>

      {/* ── HERO ── */}
      <section className="hero" id="home">
        <div className="hero-inner">
          <div className="hero-grid">
            <div className="hero-main hero-copy">
              <div className="hero-badge">
                <span className="hero-badge-dot" />
                India&apos;s Most Trusted Technology Integration Specialists
              </div>

              <h1>Enterprise Technology Solutions That <em>Connect, Protect &amp; Perform</em></h1>

              <p className="hero-sub">
                End-to-end integration for CCTV, AV, networking, PA systems, test equipment,
                and infrastructure — delivered through direct OEM partnerships and specification-led execution.
              </p>

              <div className="hero-btns">
                <a href="#solutions" className="btn-hero-primary">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  Explore Solutions
                </a>
                <a href="#contact" className="btn-hero-secondary">Request Consultation</a>
              </div>
            </div>

            <div className="hero-panel">{heroPanel}</div>


          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div className="stats-bar">
        <div className="stats-inner">
          {STATS.map(s => (
            <div key={s.v} className="stat">
              <div className="stat-v">{s.v}</div>
              <div className="stat-l">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SOLUTIONS ── */}
      <section className="sec sec-fog" id="solutions">
        <div className="inner">
          <div className="sec-head">
            <span className="stag stag-blue">What We Offer</span>
            <h2>Complete Technology Solutions</h2>
            <p>One partner, nine verticals, zero compromise — from security to power infrastructure.</p>
          </div>
          <div className="g4">
            {SOLUTIONS.map(s => (
              <div key={s.title} className="sol-card">
                <div className="sol-icon" style={{ background: s.color }}>{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 38 }}>
            <button
              onClick={() => { setShowProducts(p => !p); setTimeout(() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }), 100); }}
              style={{ background: 'var(--ink)', color: '#fff', fontSize: 13.5, fontWeight: 700, padding: '13px 28px', borderRadius: 100, border: 'none', cursor: 'pointer', letterSpacing: '.01em' }}>
              {showProducts ? 'Hide Product Catalogue ↑' : 'Check All Products & Categories →'}
            </button>
          </div>
        </div>
      </section>

      {/* ── PRODUCT CATALOGUE ── 


        { name:'Honeywell',    logo:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Honeywell_logo.svg/320px-Honeywell_logo.svg.png' },
  { name:'LG',           logo:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/LG_logo_%282015%29.svg/320px-LG_logo_%282015%29.svg.png' },
  { name:'Samsung',      logo:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/320px-Samsung_Logo.svg.png' },
  { name:'Yamaha',       logo:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Yamaha_logo.svg/320px-Yamaha_logo.svg.png' },
  { name:'Crestron',     logo:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Crestron_logo.svg/320px-Crestron_logo.svg.png' },
  { name:'Netgear',      logo:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Netgear_logo.svg/320px-Netgear_logo.svg.png' },
  { name:'Molex',        logo:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Molex_logo.svg/320px-Molex_logo.svg.png' },
  { name:'Kramer',       logo:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Kramer_Electronics_logo.svg/320px-Kramer_Electronics_logo.svg.png' },
  { name:'Audio-Technica',logo:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Audio-Technica_Logo.svg/320px-Audio-Technica_Logo.svg.png' },
  { name:'Microtek',     logo:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Microtek_logo.svg/320px-Microtek_logo.svg.png' },
  { name:'Syrotech',     logo:'https://syrotech.com/wp-content/uploads/2021/03/syrotech-logo.png' },
  { name:'Peoplelink',   logo:'https://www.peoplelink.com/wp-content/uploads/2020/09/peoplelink-logo.png' },
  { name:'Purelink',     logo:'https://www.purelink.de/wp-content/uploads/2019/01/purelink-logo.png' },
  { name:'Duranet',      logo:null },
  { name:'Atlas ED',     logo:null },
  { name:'Brio Touch',   logo:null },
  { name:'Audiovan',     logo:null },
  { name:'EIS',          logo:null },
  { name:'Avvik',        logo:null },
  { name:'360T',         logo:null },
  { name:'Watchdog',     logo:null },
  { name:'Tycon',        logo:null },
  { name:'HBL',          logo:null },
   */}

      {/* ── PRODUCT CATALOGUE ── */}
      {showProducts && (
        <section className="prod-section" id="products">
          <div className="inner">
            <div className="sec-head">
              <span className="stag stag-purple">Full Catalogue</span>
              <h2>Products Across Eight Core Categories</h2>
              <p>Direct OEM sourcing and specification-led delivery across every product line.</p>
            </div>
            <div className="prod-grid">
              {PRODUCT_GROUPS.map(g => (
                <div key={g.title} className="prod-card">
                  <div className="prod-img"><img src={g.img} alt={g.title} /></div>
                  <div className="prod-body">
                    <div className="prod-ico" style={{ background: g.color }}>{g.icon}</div>
                    <h3>{g.title}</h3>
                    <p className="pdesc">{g.desc}</p>
                    <ul>{g.items.map(it => (
                      <li key={it}><span className="pdot" /><span>{it}</span></li>
                    ))}</ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── ABOUT ── */}
      <section className="sec" id="about">
        <div className="inner">
          <div className="about-grid">
            <div className="about-img-wrap">
              <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&q=80" alt="VCNPL Team" />
              <div className="about-badge">
                <div className="val">500+</div>
                <div className="lbl">Projects Delivered</div>
              </div>
            </div>
            <div className="about-copy">
              <span className="stag stag-pink" style={{ marginBottom: 14, display: 'inline-block' }}>Who We Are</span>
              <h2>Precision-Driven System Integration</h2>
              <p>We specialise in understanding end-user requirements and delivering tailored solutions by aligning the right products and partners. Working directly with leading OEMs, we ensure reliable, high-quality outcomes on every project.</p>
              <p>Our expertise spans test equipment, networking, AV systems, PA solutions, CCTV, computing, power infrastructure and complete office setups — delivered with precision and accountability.</p>
              <div className="feat-grid">
                {[
                  { t: 'OEM Direct', d: 'Direct from leading manufacturers.' },
                  { t: 'Single Partner', d: 'One contact for all infrastructure needs.' },
                  { t: 'Tailored Design', d: 'Custom specs for your exact environment.' },
                  { t: 'End-to-End', d: 'Spec → install → commissioning → AMC.' },
                ].map(f => (
                  <div key={f.t} className="feat"><h4>{f.t}</h4><p>{f.d}</p></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="sec sec-dark">
        <div className="inner">
          <div className="sec-head">
            <span className="stag stag-white">Our Values</span>
            <h2 className="on-dark">What Drives Every Decision</h2>
            <p className="on-dark">Rooted in precision, accountability, and long-term client success.</p>
          </div>
          <div className="val-grid">
            {VALUES.map(v => (
              <div key={v.title} className="val-card">
                <div className="val-icon">{v.icon}</div>
                <h4>{v.title}</h4>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="sec sec-fog" id="process">
        <div className="inner">
          <div className="sec-head">
            <span className="stag stag-purple">How We Work</span>
            <h2>Our Integration Process</h2>
            <p>A rigorous four-step methodology that delivers precision from day one.</p>
          </div>
          <div className="proc-grid">
            {STEPS.map((s, i) => (
              <div key={s.n} className="proc-step">
                {i < STEPS.length - 1 && <div className="proc-arr">→</div>}
                <div className="step-num">{s.n}</div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="sec" id="industries">
        <div className="inner">
          <div className="sec-head">
            <span className="stag stag-teal">Sector Expertise</span>
            <h2>Trusted Across Industries</h2>
            <p>Requirement-led solutions aligned to sector-specific standards and long-term scalability.</p>
          </div>

          <div className="ind-tabs-wrap">
            <div className="ind-tabs" role="tablist" aria-label="Industry sectors">
              {INDUSTRIES.map((ind, i) => (
                <button
                  key={ind.name}
                  type="button"
                  role="tab"
                  aria-selected={activeIndustry === i}
                  className={`ind-tab${activeIndustry === i ? ' active' : ''}`}
                  onClick={() => setActiveIndustry(i)}
                >
                  <span className="ind-tab-icon" aria-hidden="true">{ind.icon}</span>
                  <span className="ind-tab-label">{ind.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="ind-panel" role="tabpanel">
            <div className="ind-panel-img">
              <img src={activeInd.img} alt={activeInd.name} key={activeInd.name} />
              <div className="ind-panel-img-overlay" />
            </div>
            <div className="ind-panel-body">
              <div className="ind-panel-icon">{activeInd.icon}</div>
              <h3>{activeInd.name}</h3>
              <ul>
                {activeInd.points.map(pt => (
                  <li key={pt}><span className="idot" /><span>{pt}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── PARTNERS MARQUEE ── */}
      <section className="partners-sec" id="partners">
        <div className="inner">
          <div className="sec-head" style={{ marginBottom: 0 }}>
            <span className="stag stag-amber">OUR PARTNERS</span>
            <h2>Trusted OEM Partners</h2>
            <p>We work directly with industry-leading manufacturers to deliver authentic, high-performance solutions.</p>
          </div>
        </div>
        <div className="partners-grid-wrap">
          <div className="partners-grid">
            {PARTNERS.map((p, i) => (
              <div key={i} className="p-chip">
                {p.logo
                  ? <img src={p.logo} alt={p.name} onError={e => { e.currentTarget.style.display = 'none' }} />
                  : null
                }
                <span className="p-chip-name">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-sec" id="contact">
        <span className="stag stag-white" style={{ position: 'relative', zIndex: 1 }}>Ready to Get Started?</span>
        <h2>Let's Build Your Ideal Solution</h2>
        <p>Share your requirements and we'll craft a precise technical specification with the right products and partners.</p>
        <div className="cta-btns">
          <a href="mailto:sales@vcnpl.net" className="btn-hero-primary">✉️ Request Free Consultation</a>
          <a href="tel:+919876596016" className="btn-hero-secondary">📞 +91 98765 96016</a>
        </div>
        <div className="contact-grid">
          {[
            { icon: '📞', lbl: 'Call Us', val: '+91 98765 96016', sub: 'Mon–Sat, 9:30AM–7PM IST', href: 'tel:+919876596016' },
            { icon: '✉️', lbl: 'Sales Email', val: 'sales@vcnpl.net', sub: 'Response within 24 hours', href: 'mailto:sales@vcnpl.net' },
            { icon: '📬', lbl: 'General Enquiries', val: 'info@vcnpl.net', sub: 'Partnerships & information', href: 'mailto:info@vcnpl.net' },
          ].map(c => (
            <a key={c.val} href={c.href} className="contact-card">
              <div className="cc-icon">{c.icon}</div>
              <div className="cc-lbl">{c.lbl}</div>
              <div className="cc-val">{c.val}</div>
              <div className="cc-sub">{c.sub}</div>
            </a>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="footer-inner">
          <div className="footer-top">
            <div>
              <div className="ft-brand">
                <Image src={LOGO_SQ} alt={COMPANY} width={120} height={96} style={{ height: 96, width: 'auto', maxWidth: 120, objectFit: 'contain' }} />
              </div>
              <p className="ft-desc">System integrators delivering tailored technology solutions — CCTV, AV, networking, test equipment, and end-to-end infrastructure.</p>
            </div>
            <div className="ft-col">
              <h5>Solutions</h5>
              {['CCTV & Security', 'Audio-Visual', 'Networking & IT', 'PA Systems', 'Test & Measurement', 'Power Solutions'].map(l => <a key={l} href="#solutions">{l}</a>)}
            </div>
            <div className="ft-col">
              <h5>Company</h5>
              {[['Home', '#home'], ['About Us', '#about'], ['Solutions', '#solutions'], ['Industries', '#industries'], ['Partners', '#partners'], ['Contact', '#contact']].map(([l, h]) => <a key={l} href={h}>{l}</a>)}
            </div>
            <div className="ft-col ft-contact">
              <h5>Get In Touch</h5>
              <span>📞 +91 98765 96016</span>
              <span>✉️ sales@vcnpl.net</span>
              <span>✉️ info@vcnpl.net</span>
              <span>📍 India</span>
              <a href="#contact" style={{ display: 'inline-block', marginTop: 10, background: 'linear-gradient(135deg,#c9a84c,#e8c96a)', color: '#07080f', fontSize: 12, fontWeight: 700, padding: '9px 18px', borderRadius: 100, textDecoration: 'none' }}>
                Request a Quote →
              </a>
            </div>
          </div>
          <div className="footer-bot">
            <span>© 2025 {COMPANY} All rights reserved.</span>
            <span>System Integrators · India</span>
          </div>
        </div>
      </footer>
    </>
  );
}