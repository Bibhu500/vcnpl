'use client';
import { useState, useEffect, useRef } from 'react';

/* ─── PARTNER LOGOS (public CDN / Wikimedia / official) ─── */
const PARTNERS = [
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
];

/* ─── DATA ─────────────────────────────────────────────── */
const NAV = ['Solutions','About','Process','Industries','Partners','Contact'];

const SOLUTIONS = [
  { icon:'📡', color:'#dbeafe', title:'CCTV & Security',       desc:'IP cameras, PTZ, NVRs, DVRs, VMS software, access control & surveillance storage.' },
  { icon:'🖥️', color:'#fce7f3', title:'Audio-Visual Systems',  desc:'LED walls, video conferencing, interactive panels, projectors & digital signage.' },
  { icon:'🔌', color:'#dcfce7', title:'Networking & IT',        desc:'Switches, routers, access points, structured cabling & data centre networking.' },
  { icon:'🔊', color:'#fef9c3', title:'PA Systems',             desc:'Amplifiers, speakers, paging, conference systems & emergency evacuation.' },
  { icon:'🧪', color:'#ede9fe', title:'Test & Measurement',     desc:'Oscilloscopes, spectrum analysers, signal generators & calibration equipment.' },
  { icon:'⚡', color:'#ffedd5', title:'Power Solutions',        desc:'UPS systems, battery banks, PDUs & uninterrupted power backup solutions.' },
  { icon:'💻', color:'#cffafe', title:'Computing & Electronics',desc:'Laptops, workstations, monitors, printers, tablets & handheld devices.' },
  { icon:'🪑', color:'#fdf2f8', title:'Office Infrastructure',  desc:'Modular furniture, workstations, conference rooms & complete office setups.' },
];

const PRODUCT_GROUPS = [
  { title:'Test & Measurement Equipment', icon:'🧪', color:'#ede9fe',
    img:'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&q=80',
    desc:'Precision instruments for electronic, RF, and industrial measurement.',
    items:['Electronic test instruments','Calibration equipment','RF & communication test equipment','Multimeters','Oscilloscopes','Spectrum analyzers','Signal generators','Power analyzers','Environmental testing equipment'] },
  { title:'Networking & IT Infrastructure', icon:'🔌', color:'#dcfce7',
    img:'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80',
    desc:'Enterprise-grade connectivity from edge to core.',
    items:['Switches','Routers','Wireless access points','Network security appliances','Structured cabling','Data center networking','Network monitoring solutions'] },
  { title:'Audio-Visual (AV) Systems', icon:'🖥️', color:'#fce7f3',
    img:'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&q=80',
    desc:'Immersive display, conferencing, and signage solutions.',
    items:['LED displays & video walls','Interactive flat panels','Projectors & projection systems','Video conferencing systems','Digital signage solutions','AV control systems'] },
  { title:'Public Address (PA) Systems', icon:'🔊', color:'#fef9c3',
    img:'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&q=80',
    desc:'Crystal-clear audio infrastructure for any environment.',
    items:['Amplifiers','Speakers','Microphones','Paging systems','Conference & discussion systems','Emergency voice evacuation'] },
  { title:'CCTV & Security Solutions', icon:'📡', color:'#dbeafe',
    img:'https://images.unsplash.com/photo-1494526585095-c41746248156?w=600&q=80',
    desc:'End-to-end surveillance and access control ecosystems.',
    items:['IP cameras','PTZ cameras','NVRs & DVRs','Video management software (VMS)','Access control systems','Surveillance storage'] },
  { title:'Computing & Electronics', icon:'💻', color:'#cffafe',
    img:'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80',
    desc:'Workstations, laptops, and peripherals for every workflow.',
    items:['Laptops','Desktop computers','Workstations','Monitors & displays','Printers & peripherals','Tablets & handheld devices'] },
  { title:'Power Solutions', icon:'⚡', color:'#ffedd5',
    img:'https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=600&q=80',
    desc:'Uninterrupted power infrastructure from rack to building.',
    items:['UPS systems','Industrial & Online UPS','Batteries & battery banks','Power distribution units (PDUs)','Power backup solutions'] },
  { title:'Office Infrastructure', icon:'🪑', color:'#fdf2f8',
    img:'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
    desc:'Complete workplace fit-outs from furniture to tech.',
    items:['Modular office furniture','Executive & workstation furniture','Conference room furniture','Storage solutions','Complete office setup'] },
];

const STEPS = [
  { n:'01', title:'Requirement Analysis',       desc:'Deep-dive sessions to understand your technical and operational objectives.' },
  { n:'02', title:'Specification Design',        desc:'Precise technical specs and solution blueprints tailored to your environment.' },
  { n:'03', title:'OEM Sourcing',                desc:'Direct procurement from leading manufacturers — no middlemen, full reliability.' },
  { n:'04', title:'Installation & Commissioning',desc:'Expert deployment, testing, acceptance support and handover.' },
];

const INDUSTRIES = [
  { name:'Government & Defense',    icon:'🏛️', points:['Secure surveillance, command center AV, and communication infrastructure.','Specification-aligned procurement with strict compliance and delivery standards.'] },
  { name:'Education & Research',    icon:'🎓', points:['Laboratory test equipment, campus networking, and digital classroom AV systems.','Integrated deployment for scalable learning and research environments.'] },
  { name:'Corporate Offices',       icon:'🏢', points:['Conference AV, PA systems, networking backbone, and secure access infrastructure.','Complete office technology and furniture setup support through aligned partners.'] },
  { name:'Manufacturing',           icon:'🏭', points:['Industrial test equipment, rugged networking, CCTV, and power backup systems.','High-reliability solutions with commissioning and maintenance support.'] },
  { name:'Telecom',                 icon:'📶', points:['Network-grade switching, routing, monitoring, and security infrastructure.','Support for high-availability systems and distributed operations.'] },
  { name:'Healthcare',              icon:'🏥', points:['Critical surveillance, communication systems, UPS power continuity, and IT infrastructure.','Precise planning and dependable execution for sensitive operational environments.'] },
  { name:'Smart Buildings',         icon:'🏗️', points:['Integrated AV, PA, security, networking, and centralized management systems.','Future-ready architectures that simplify operations and improve control.'] },
  { name:'Data Centers',            icon:'💾', points:['Core networking, monitoring, power distribution, UPS, and security ecosystem support.','Design-to-acceptance services for performance-driven and resilient deployments.'] },
];

const VALUES = [
  { icon:'🎯', title:'Precision First',     desc:'Exact technical specifications before any procurement begins.' },
  { icon:'🤝', title:'OEM Direct',          desc:'Direct from leading manufacturers — authentic and reliable.' },
  { icon:'🔧', title:'End-to-End',          desc:'Design, installation, commissioning and annual maintenance.' },
  { icon:'💡', title:'Tailored Solutions',  desc:'Every deployment custom-engineered to your exact needs.' },
  { icon:'🌐', title:'Trusted Partners',    desc:'Vetted ecosystem of partners to close any scope gap.' },
  { icon:'📋', title:'Full Accountability', desc:'Single point of contact, clear SLAs, transparent management.' },
];

const STATS = [
  { v:'500+', l:'Projects Delivered' },
  { v:'9',    l:'Solution Verticals' },
  { v:'8+',   l:'Industries Served'  },
  { v:'100%', l:'OEM Direct Sourcing'},
];

/* ─── CSS ───────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Outfit:wght@400;600;700;800;900&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --ink:#07080f;--fog:#f4f6fb;--mist:#5e6a84;--gold:#f59e0b;--blue:#3b5bfc;
  /* Megn exact gradient colours */
  --g1:#1a1aff;--g2:#3d1aff;--g3:#7c3aed;--g4:#e0197d;
  --grad:linear-gradient(135deg,var(--g1) 0%,var(--g2) 25%,var(--g3) 55%,var(--g4) 100%);
}
html{scroll-behavior:smooth;font-size:16px}
body{font-family:'Space Grotesk',sans-serif;color:var(--ink);background:#fff;overflow-x:hidden}
h1,h2,h3{font-family:'Outfit',sans-serif}

/* ── MEGA HERO GRADIENT (exact Megn electric blue → violet → hot pink) ── */
.hero{
  min-height:100svh;
  display:flex;flex-direction:column;
  background:var(--grad);
  position:relative;overflow:hidden;
  padding:0 5vw;
}
/* animated colour blobs that create the swirling aura effect */
.hero::before{
  content:'';position:absolute;inset:0;pointer-events:none;
  background:
    radial-gradient(ellipse 90% 70% at 80% 55%, rgba(255,80,180,.45) 0%, transparent 55%),
    radial-gradient(ellipse 70% 80% at 10% 70%, rgba(60,30,255,.55) 0%, transparent 50%),
    radial-gradient(ellipse 55% 55% at 55% 5%,  rgba(120,60,255,.30) 0%, transparent 55%),
    radial-gradient(ellipse 40% 50% at 90% 10%, rgba(255,40,140,.25) 0%, transparent 50%);
  animation:blob 12s ease-in-out infinite alternate;
}
@keyframes blob{
  0%  {opacity:.85;transform:scale(1) rotate(0deg)}
  50% {opacity:1;  transform:scale(1.05) rotate(2deg)}
  100%{opacity:.90;transform:scale(.98) rotate(-1deg)}
}

/* ── NAV — centered frosted pill (exact Megn style) ── */
.nav-wrap{
  position:fixed;top:16px;left:50%;transform:translateX(-50%);
  z-index:99;width:calc(100% - 40px);max-width:860px;
  pointer-events:none;
}
.nav{
  pointer-events:all;
  display:grid;
  grid-template-columns:auto 1fr auto auto;
  align-items:center;
  gap:0;
  background:rgba(255,255,255,.15);
  backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);
  border:1px solid rgba(255,255,255,.3);
  border-radius:100px;
  height:52px;padding:0 8px 0 20px;
  width:100%;
  transition:background .35s,box-shadow .35s,border-color .35s;
}
.nav.scrolled{
  background:rgba(8,8,22,.78);
  border-color:rgba(255,255,255,.1);
  box-shadow:0 8px 40px rgba(0,0,0,.35);
}
.logo-text{font-family:'Outfit',sans-serif;font-size:16px;font-weight:800;color:#fff;letter-spacing:-.02em;white-space:nowrap}
.logo-sub{font-size:6px;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.55);display:block;margin-top:1px}
/* center links in the middle column */
.nav-links{
  display:flex;align-items:center;justify-content:center;
  gap:6px;
}
.nav-links a{
  color:rgba(255,255,255,.8);font-size:12.5px;font-weight:500;
  text-decoration:none;transition:color .2s,background .2s;white-space:nowrap;
  padding:6px 12px;border-radius:100px;
}
.nav-links a:hover{color:#fff;background:rgba(255,255,255,.1)}
.btn-cta{
  background:#fff;color:var(--ink);
  font-size:12px;font-weight:700;
  padding:8px 18px;border-radius:100px;
  text-decoration:none;white-space:nowrap;
  transition:opacity .2s,transform .2s;letter-spacing:.01em;
  display:flex;align-items:center;gap:6px;
  margin-left:8px;
}
.btn-cta:hover{opacity:.88;transform:scale(1.03)}
.btn-cta svg{width:12px;height:12px}

/* hamburger — takes the cta slot on mobile */
.ham-btn{display:none;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.25);
  border-radius:100px;cursor:pointer;padding:8px 12px;color:#fff;margin-left:8px;
  align-items:center;justify-content:center;gap:4px}
.mob-menu{
  display:none;position:fixed;top:78px;
  left:50%;transform:translateX(-50%);
  width:calc(100% - 24px);max-width:420px;
  z-index:98;
  background:rgba(8,8,22,.94);backdrop-filter:blur(28px);
  border:1px solid rgba(255,255,255,.1);
  border-radius:24px;padding:16px;flex-direction:column;gap:4px;
}
.mob-menu.open{display:flex}
.mob-menu a{color:rgba(255,255,255,.82);font-size:15px;font-weight:500;text-decoration:none;
  padding:12px 16px;border-radius:12px;transition:background .2s;text-align:center}
.mob-menu a:hover{background:rgba(255,255,255,.1);color:#fff}
.mob-cta{margin-top:6px;background:#fff!important;color:var(--ink)!important;
  font-weight:700!important;justify-content:center;border-radius:100px!important}

/* ── HERO CONTENT ── */
.hero-content{
  max-width:860px;margin:0 auto;width:100%;
  display:flex;flex-direction:column;align-items:center;
  text-align:center;
  padding-top:130px;padding-bottom:80px;
  position:relative;z-index:1;
}
.hero-badge{
  display:inline-flex;align-items:center;gap:8px;
  background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.28);
  border-radius:100px;padding:5px 16px 5px 10px;
  font-size:11.5px;font-weight:600;color:#fff;letter-spacing:.08em;text-transform:uppercase;
  margin-bottom:24px;backdrop-filter:blur(10px);
}
.hero-badge-dot{width:6px;height:6px;border-radius:50%;background:#7effd4}
.hero h1{
  font-size:clamp(38px,7vw,80px);font-weight:900;color:#fff;
  line-height:1.06;letter-spacing:-.04em;margin-bottom:20px;
}
.hero h1 em{
  font-style:normal;
  background:linear-gradient(90deg,#a5c8ff 0%,#ffb3e6 100%);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
}
.hero-sub{font-size:clamp(15px,2vw,18px);color:rgba(255,255,255,.72);line-height:1.75;max-width:580px;margin-bottom:36px}
.hero-btns{display:flex;gap:12px;flex-wrap:wrap;justify-content:center}
.btn-hero-primary{
  background:#fff;color:var(--ink);
  font-size:14px;font-weight:700;
  padding:14px 28px;border-radius:100px;
  text-decoration:none;
  transition:transform .2s,box-shadow .2s;
  display:flex;align-items:center;gap:8px;
}
.btn-hero-primary:hover{transform:translateY(-2px);box-shadow:0 12px 32px rgba(0,0,0,.2)}
.btn-hero-secondary{
  background:rgba(255,255,255,.13);color:#fff;
  font-size:14px;font-weight:600;
  padding:13px 28px;border-radius:100px;
  border:1.5px solid rgba(255,255,255,.32);
  text-decoration:none;
  transition:background .2s;backdrop-filter:blur(10px);
}
.btn-hero-secondary:hover{background:rgba(255,255,255,.22)}

/* hero floating feature chips */
.hero-chips{
  display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-top:44px;
}
.hero-chip{
  background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);
  border-radius:12px;padding:12px 18px;backdrop-filter:blur(12px);
  display:flex;align-items:center;gap:10px;
  transition:background .25s;
}
.hero-chip:hover{background:rgba(255,255,255,.18)}
.hc-icon{font-size:20px}
.hc-text h5{font-family:'Outfit',sans-serif;font-size:12.5px;font-weight:700;color:#fff;margin-bottom:1px}
.hc-text p{font-size:10.5px;color:rgba(255,255,255,.58);line-height:1.4}

/* ── STATS BAR ── */
.stats-bar{background:#fff;border-bottom:1px solid #edf0f7}
.stats-inner{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);padding:0 5vw}
.stat{padding:26px 16px;text-align:center;border-right:1px solid #edf0f7}
.stat:last-child{border-right:none}
.stat-v{font-family:'Outfit',sans-serif;font-size:clamp(28px,3.5vw,40px);font-weight:900;letter-spacing:-.03em;
  background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;line-height:1}
.stat-l{font-size:11px;color:var(--mist);margin-top:5px;letter-spacing:.03em;text-transform:uppercase}

/* ── GENERIC SECTION ── */
.sec{padding:80px 5vw}
.sec-fog{background:var(--fog)}
.sec-dark{background:var(--ink)}
.inner{max-width:1200px;margin:0 auto}
.sec-head{text-align:center;margin-bottom:52px}
.stag{display:inline-block;font-size:10px;font-weight:700;letter-spacing:.18em;
  text-transform:uppercase;padding:5px 14px;border-radius:100px;margin-bottom:14px;font-family:'Space Grotesk',sans-serif}
.stag-blue  {background:#eff6ff;color:#2563eb;border:1px solid #bfdbfe}
.stag-pink  {background:#fdf2f8;color:#db2777;border:1px solid #fbcfe8}
.stag-purple{background:#f5f3ff;color:#7c3aed;border:1px solid #ddd6fe}
.stag-teal  {background:#f0fdfa;color:#0d9488;border:1px solid #99f6e4}
.stag-amber {background:#fffbeb;color:#b45309;border:1px solid #fde68a}
.stag-white {background:rgba(255,255,255,.1);color:#fff;border:1px solid rgba(255,255,255,.2)}
.sec-head h2{font-size:clamp(22px,3.5vw,42px);font-weight:800;letter-spacing:-.03em;line-height:1.15}
.sec-head h2.on-dark{color:#fff}
.sec-head p{font-size:15px;color:var(--mist);max-width:500px;margin:10px auto 0;line-height:1.72}
.sec-head p.on-dark{color:rgba(255,255,255,.5)}

/* ── SOLUTIONS GRID ── */
.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.sol-card{border-radius:18px;padding:24px 18px 20px;border:1px solid #e6ebf5;background:#fff;
  transition:transform .28s,box-shadow .28s}
.sol-card:hover{transform:translateY(-5px);box-shadow:0 16px 40px rgba(0,0,0,.07)}
.sol-icon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;margin-bottom:13px}
.sol-card h3{font-family:'Outfit',sans-serif;font-size:14px;font-weight:700;margin-bottom:6px;letter-spacing:-.01em}
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
.prod-body h3{font-family:'Outfit',sans-serif;font-size:15px;font-weight:700;margin-bottom:6px;letter-spacing:-.02em}
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
.about-badge .val{font-family:'Outfit',sans-serif;font-size:36px;font-weight:900;color:var(--gold);line-height:1;letter-spacing:-.03em}
.about-badge .lbl{font-size:11px;color:rgba(255,255,255,.45);margin-top:4px}
.about-copy h2{font-family:'Outfit',sans-serif;font-size:clamp(22px,3vw,38px);font-weight:800;letter-spacing:-.03em;margin:12px 0 16px}
.about-copy p{font-size:14px;color:var(--mist);line-height:1.82;margin-bottom:13px}
.feat-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:22px}
.feat{background:var(--fog);border:1px solid #e6ebf5;border-radius:12px;padding:16px}
.feat h4{font-family:'Outfit',sans-serif;font-size:13px;font-weight:700;margin-bottom:4px}
.feat p{font-size:11.5px;color:var(--mist);line-height:1.6}

/* ── VALUES ── */
.val-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.val-card{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:18px;padding:28px 22px;transition:background .2s}
.val-card:hover{background:rgba(255,255,255,.08)}
.val-icon{font-size:26px;margin-bottom:12px}
.val-card h4{font-family:'Outfit',sans-serif;font-size:14px;font-weight:700;color:#fff;margin-bottom:6px}
.val-card p{font-size:12px;color:rgba(255,255,255,.46);line-height:1.65}

/* ── PROCESS ── */
.proc-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.proc-step{background:#fff;border-radius:18px;padding:24px 18px;border:1px solid #e6ebf5;position:relative}
.step-num{font-family:'Outfit',sans-serif;width:40px;height:40px;border-radius:10px;
  background:linear-gradient(135deg,#eff6ff,#fce7f3);border:1.5px solid #bfdbfe;
  display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;color:var(--blue);margin-bottom:14px}
.proc-step h4{font-family:'Outfit',sans-serif;font-size:14px;font-weight:700;margin-bottom:6px}
.proc-step p{font-size:12px;color:var(--mist);line-height:1.65}
.proc-arr{position:absolute;top:30px;right:-11px;width:22px;height:22px;
  background:#fff;border:1px solid #e6ebf5;border-radius:50%;
  display:flex;align-items:center;justify-content:center;font-size:9px;color:var(--mist);z-index:2}

/* ── INDUSTRIES ── */
.ind-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.ind-card{background:#fff;border:1px solid #e6ebf5;border-radius:18px;padding:22px 18px;transition:all .26s}
.ind-card:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(0,0,0,.07);border-color:#bfdbfe}
.ind-card-icon{font-size:26px;margin-bottom:10px}
.ind-card h4{font-family:'Outfit',sans-serif;font-size:14px;font-weight:700;margin-bottom:9px;letter-spacing:-.02em}
.ind-card ul{list-style:none;display:flex;flex-direction:column;gap:6px}
.ind-card li{font-size:11.5px;color:var(--mist);display:flex;gap:7px;align-items:flex-start;line-height:1.55}
.idot{width:4px;height:4px;border-radius:50%;background:var(--blue);flex-shrink:0;margin-top:5px}

/* ── PARTNERS — logo marquee ── */
.partners-sec{padding:72px 5vw;background:#fff;border-top:1px solid #edf0f7}
.marquee-wrap{overflow:hidden;position:relative;margin-top:44px}
.marquee-wrap::before,.marquee-wrap::after{
  content:'';position:absolute;top:0;bottom:0;width:100px;z-index:2;pointer-events:none}
.marquee-wrap::before{left:0;background:linear-gradient(90deg,#fff,transparent)}
.marquee-wrap::after {right:0;background:linear-gradient(270deg,#fff,transparent)}
.marquee-track{display:flex;gap:16px;animation:scrollL 32s linear infinite;width:max-content}
.marquee-track:hover{animation-play-state:paused}
@keyframes scrollL{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
.p-chip{
  display:flex;align-items:center;justify-content:center;
  height:60px;padding:0 28px;
  background:var(--fog);border:1px solid #e6ebf5;border-radius:100px;
  flex-shrink:0;transition:all .22s;gap:10px;
}
.p-chip:hover{background:#eff6ff;border-color:#bfdbfe}
.p-chip img{height:22px;width:auto;object-fit:contain;filter:grayscale(1) opacity(.65);transition:filter .22s}
.p-chip:hover img{filter:grayscale(0) opacity(1)}
.p-chip-name{font-size:13px;font-weight:700;color:var(--ink);white-space:nowrap;letter-spacing:.01em}

/* ── CTA ── */
.cta-sec{background:var(--grad);padding:90px 5vw;text-align:center;position:relative;overflow:hidden}
.cta-sec::before{content:'';position:absolute;inset:0;
  background:
    radial-gradient(ellipse 60% 60% at 50% 50%,rgba(255,255,255,.08) 0%,transparent 65%),
    radial-gradient(ellipse 80% 50% at 80% 80%,rgba(255,80,180,.3) 0%,transparent 55%);
  pointer-events:none}
.cta-sec h2{font-family:'Outfit',sans-serif;font-size:clamp(26px,4vw,54px);font-weight:900;color:#fff;
  letter-spacing:-.04em;max-width:660px;margin:12px auto 18px;position:relative;z-index:1;line-height:1.1}
.cta-sec>p{font-size:16px;color:rgba(255,255,255,.68);max-width:460px;margin:0 auto 36px;line-height:1.78;position:relative;z-index:1}
.cta-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;position:relative;z-index:1;margin-bottom:52px}
.contact-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;max-width:820px;margin:0 auto;position:relative;z-index:1}
.contact-card{background:#fff;border:1px solid #e6ebf5;border-radius:18px;padding:24px 20px;text-align:center;
  transition:all .24s;text-decoration:none;color:var(--ink)}
.contact-card:hover{border-color:#bfdbfe;box-shadow:0 10px 28px rgba(59,91,252,.12);transform:translateY(-3px)}
.cc-icon{font-size:28px;margin-bottom:10px}
.cc-lbl{font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--mist);margin-bottom:4px}
.cc-val{font-family:'Outfit',sans-serif;font-size:13.5px;font-weight:700}
.cc-sub{font-size:11px;color:var(--mist);margin-top:3px}

/* ── FOOTER ── */
footer{background:#060810;padding:56px 5vw 24px}
.footer-inner{max-width:1200px;margin:0 auto}
.footer-top{display:grid;grid-template-columns:2fr 1fr 1fr 1.4fr;gap:36px;
  padding-bottom:40px;border-bottom:1px solid rgba(255,255,255,.06)}
.ft-brand{font-family:'Outfit',sans-serif;font-size:19px;font-weight:900;color:#fff;letter-spacing:-.03em}
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
  .ind-grid{grid-template-columns:repeat(2,1fr)}
  .prod-grid{grid-template-columns:1fr}
}
@media(max-width:768px){
  .nav-links{display:none}.ham-btn{display:block}
  .about-grid{grid-template-columns:1fr}
  .stats-inner{grid-template-columns:repeat(2,1fr)}
  .val-grid{grid-template-columns:1fr 1fr}
  .footer-top{grid-template-columns:1fr 1fr}
  .contact-grid{grid-template-columns:1fr}
  .hero-chips{gap:8px}
  .hero-content{padding-top:110px;padding-bottom:60px}
}
@media(max-width:540px){
  .nav{padding:0 8px 0 14px}
  .logo-sub{display:none}
  .logo-text{font-size:14px}
  .btn-cta span{display:none}
  .g4,.val-grid,.proc-grid,.ind-grid{grid-template-columns:1fr}
  .footer-top{grid-template-columns:1fr}
  .footer-bot{flex-direction:column;gap:6px;text-align:center}
  .feat-grid{grid-template-columns:1fr}
  .prod-card{grid-template-columns:1fr}
  .hero-chip .hc-text p{display:none}
  .about-badge{bottom:-10px;right:-4px}
  .stats-inner{grid-template-columns:repeat(2,1fr)}
}
`;

/* ─── COMPONENT ─────────────────────────────────────────── */
export default function VCNPLPage() {
  const [scrolled, setScrolled]       = useState(false);
  const [menuOpen, setMenuOpen]       = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const styleInjected = useRef(false);

  useEffect(() => {
    if (!styleInjected.current) {
      const s = document.createElement('style');
      s.textContent = CSS;
      document.head.appendChild(s);
      styleInjected.current = true;
    }
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const goto = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior:'smooth' });
    setMenuOpen(false);
  };

  // Double array for seamless marquee
  const chips2 = [...PARTNERS, ...PARTNERS];

  return (
    <>
      {/* ── FLOATING NAV (Megn-style pill) ── */}
      <div className="nav-wrap">
        <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
          <div onClick={() => goto('home')} style={{ cursor:'pointer' }}>
            <span className="logo-text">VCNPL</span>
            <span className="logo-sub">Visual Connect Network Pvt. Ltd.</span>
          </div>

          <div className="nav-links">
            {NAV.map(n => (
              <a key={n} href={`#${n.toLowerCase()}`}>{n}</a>
            ))}
          </div>

          <a href="#contact" className="btn-cta">
            <svg viewBox="0 0 16 16" fill="currentColor"><path d="M2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H9l-3 3v-3H4a2 2 0 0 1-2-2V4z"/></svg>
            <span>Get started</span>
          </a>

          <button className="ham-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {menuOpen
              ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="8" x2="21" y2="8"/><line x1="3" y1="16" x2="21" y2="16"/></svg>
            }
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <div className={`mob-menu${menuOpen ? ' open' : ''}`}>
        {NAV.map(n => <a key={n} href={`#${n.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{n}</a>)}
        <a href="#contact" className="btn-cta" onClick={() => setMenuOpen(false)}>Get a Quote →</a>
      </div>

      {/* ── HERO ── */}
      <section className="hero" id="home">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot"/>
            System Integration Specialists
          </div>

          <h1>Technology That<br/><em>Connects, Protects</em><br/>&amp; Performs</h1>

          <p className="hero-sub">
            End-to-end system integration for CCTV, AV, networking, PA systems,
            test equipment and infrastructure — working directly with leading OEMs.
          </p>

          <div className="hero-btns">
            <a href="#solutions" className="btn-hero-primary">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              Explore Solutions
            </a>
            <a href="#contact" className="btn-hero-secondary">Talk to an Expert</a>
          </div>

          <div className="hero-chips">
            {[
              { icon:'📡', t:'CCTV & Security',    d:'IP cameras · NVRs · VMS' },
              { icon:'🖥️', t:'Audio-Visual',        d:'LED walls · Conferencing' },
              { icon:'🔌', t:'Networking & IT',     d:'Switches · Cabling · WiFi' },
              { icon:'🧪', t:'Test & Measurement',  d:'Oscilloscopes · Analysers' },
            ].map(c => (
              <div key={c.t} className="hero-chip">
                <span className="hc-icon">{c.icon}</span>
                <div className="hc-text">
                  <h5>{c.t}</h5>
                  <p>{c.d}</p>
                </div>
              </div>
            ))}
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
                <div className="sol-icon" style={{ background:s.color }}>{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign:'center', marginTop:38 }}>
            <button
              onClick={() => { setShowProducts(p=>!p); setTimeout(()=>document.getElementById('products')?.scrollIntoView({ behavior:'smooth' }),100); }}
              style={{ background:'var(--ink)', color:'#fff', fontSize:13.5, fontWeight:700, padding:'13px 28px', borderRadius:100, border:'none', cursor:'pointer', letterSpacing:'.01em' }}>
              {showProducts ? 'Hide Product Catalogue ↑' : 'Check All Products & Categories →'}
            </button>
          </div>
        </div>
      </section>

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
                  <div className="prod-img"><img src={g.img} alt={g.title}/></div>
                  <div className="prod-body">
                    <div className="prod-ico" style={{ background:g.color }}>{g.icon}</div>
                    <h3>{g.title}</h3>
                    <p className="pdesc">{g.desc}</p>
                    <ul>{g.items.map(it=>(
                      <li key={it}><span className="pdot"/><span>{it}</span></li>
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
              <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&q=80" alt="VCNPL Team"/>
              <div className="about-badge">
                <div className="val">500+</div>
                <div className="lbl">Projects Delivered</div>
              </div>
            </div>
            <div className="about-copy">
              <span className="stag stag-pink" style={{ marginBottom:14,display:'inline-block' }}>Who We Are</span>
              <h2>Precision-Driven System Integration</h2>
              <p>We specialise in understanding end-user requirements and delivering tailored solutions by aligning the right products and partners. Working directly with leading OEMs, we ensure reliable, high-quality outcomes on every project.</p>
              <p>Our expertise spans test equipment, networking, AV systems, PA solutions, CCTV, computing, power infrastructure and complete office setups — delivered with precision and accountability.</p>
              <div className="feat-grid">
                {[
                  { t:'OEM Direct',     d:'Direct from leading manufacturers.' },
                  { t:'Single Partner', d:'One contact for all infrastructure needs.' },
                  { t:'Tailored Design',d:'Custom specs for your exact environment.' },
                  { t:'End-to-End',     d:'Spec → install → commissioning → AMC.' },
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
            {STEPS.map((s,i) => (
              <div key={s.n} className="proc-step">
                {i < STEPS.length-1 && <div className="proc-arr">→</div>}
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
          <div className="ind-grid">
            {INDUSTRIES.map(ind => (
              <div key={ind.name} className="ind-card">
                <div className="ind-card-icon">{ind.icon}</div>
                <h4>{ind.name}</h4>
                <ul>{ind.points.map(pt=>(
                  <li key={pt}><span className="idot"/><span>{pt}</span></li>
                ))}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNERS MARQUEE ── */}
      <section className="partners-sec" id="partners">
        <div className="inner">
          <div className="sec-head" style={{ marginBottom:0 }}>
            <span className="stag stag-amber">Ecosystem</span>
            <h2>Trusted OEM Partners</h2>
            <p>We work directly with industry-leading manufacturers to deliver authentic, high-performance solutions.</p>
          </div>
        </div>
        <div className="marquee-wrap">
          <div className="marquee-track">
            {chips2.map((p, i) => (
              <div key={i} className="p-chip">
                {p.logo
                  ? <img src={p.logo} alt={p.name} onError={e=>{e.currentTarget.style.display='none'}}/>
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
        <span className="stag stag-white" style={{ position:'relative',zIndex:1 }}>Ready to Get Started?</span>
        <h2>Let's Build Your Ideal Solution</h2>
        <p>Share your requirements and we'll craft a precise technical specification with the right products and partners.</p>
        <div className="cta-btns">
          <a href="mailto:sales@vcnpl.net" className="btn-hero-primary">✉️ Request Free Consultation</a>
          <a href="tel:+919876596016" className="btn-hero-secondary">📞 +91 98765 96016</a>
        </div>
        <div className="contact-grid">
          {[
            { icon:'📞', lbl:'Call Us',          val:'+91 98765 96016', sub:'Mon–Sat, 9:30AM–7PM IST', href:'tel:+919876596016' },
            { icon:'✉️', lbl:'Sales Email',       val:'sales@vcnpl.net',  sub:'Response within 24 hours',     href:'mailto:sales@vcnpl.net'  },
            { icon:'📬', lbl:'General Enquiries', val:'info@vcnpl.net',   sub:'Partnerships & information',    href:'mailto:info@vcnpl.net'   },
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
              <div className="ft-brand">VCNPL</div>
              <span className="ft-sub">Visual Connect Network Pvt. Ltd.</span>
              <p className="ft-desc">System integrators delivering tailored technology solutions — CCTV, AV, networking, test equipment, and end-to-end infrastructure.</p>
            </div>
            <div className="ft-col">
              <h5>Solutions</h5>
              {['CCTV & Security','Audio-Visual','Networking & IT','PA Systems','Test & Measurement','Power Solutions'].map(l=><a key={l} href="#solutions">{l}</a>)}
            </div>
            <div className="ft-col">
              <h5>Company</h5>
              {[['Home','#home'],['About Us','#about'],['Solutions','#solutions'],['Industries','#industries'],['Partners','#partners'],['Contact','#contact']].map(([l,h])=><a key={l} href={h}>{l}</a>)}
            </div>
            <div className="ft-col ft-contact">
              <h5>Get In Touch</h5>
              <span>📞 +91 98765 96016</span>
              <span>✉️ sales@vcnpl.net</span>
              <span>✉️ info@vcnpl.net</span>
              <span>📍 India</span>
              <a href="#contact" style={{ display:'inline-block',marginTop:10,background:'linear-gradient(135deg,#c9a84c,#e8c96a)',color:'#07080f',fontSize:12,fontWeight:700,padding:'9px 18px',borderRadius:100,textDecoration:'none' }}>
                Request a Quote →
              </a>
            </div>
          </div>
          <div className="footer-bot">
            <span>© 2025 Visual Connect Network Pvt. Ltd. All rights reserved.</span>
            <span>System Integrators · India</span>
          </div>
        </div>
      </footer>
    </>
  );
}