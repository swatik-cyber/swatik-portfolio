import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="page">
      <div class="grid-cross"></div>
      <div class="scanline"></div>

      <!-- Corner crosses -->
      <div class="page-corner pc-tl"></div>
      <div class="page-corner pc-tr"></div>
      <div class="page-corner pc-bl"></div>
      <div class="page-corner pc-br"></div>

      <!-- Header -->
      <div class="sec-header">
        <div class="sec-eyebrow">// 07. CURRICULUM VITAE</div>
        <h1 class="sec-title">My <span>Resume</span></h1>
        <div class="sec-line"></div>
        <div class="header-actions">
          <a href="mailto:2003swatikbarik@gmail.com?subject=Resume Request" class="btn-action primary">
            <span>⚡</span> REQUEST FULL PDF
          </a>
          <a href="https://www.linkedin.com/in/swatik-barik-11666927a/" target="_blank" class="btn-action secondary">
            <span>in</span> LINKEDIN PROFILE
          </a>
        </div>
      </div>

      <!-- Resume card -->
      <div class="resume-wrap">

        <!-- Identity panel -->
        <div class="identity-panel">
          <div class="ip-cross tl"></div>
          <div class="ip-cross tr"></div>
          <div class="ip-glow-top"></div>

          <div class="id-avatar">
            <div class="av-ring"></div>
            <div class="av-inner">SB</div>
            <div class="av-status"></div>
          </div>

          <div class="id-name">Swatik Barik</div>
          <div class="id-title">Full Stack Java Developer<br>& AI/ML Engineer</div>

          <div class="id-contacts">
            <div class="idc-item" *ngFor="let c of contacts">
              <span class="idc-icon" [style.color]="c.color">{{ c.icon }}</span>
              <span class="idc-val">{{ c.val }}</span>
            </div>
          </div>

          <div class="id-section-title">// LINKS</div>
          <div class="id-links">
            <a href="https://github.com/swatik-cyber" target="_blank" class="idl-item">
              <span class="idl-dot cyan"></span>GitHub: swatik-cyber
            </a>
            <a href="https://linkedin.com/in/swatik-barik" target="_blank" class="idl-item">
              <span class="idl-dot violet"></span>LinkedIn: swatik-barik
            </a>
          </div>

          <div class="id-section-title">// CERTIFICATIONS</div>
          <div class="id-certs">
            <div class="cert-badge" *ngFor="let c of certBadges">
              <div class="cb-icon">{{ c.icon }}</div>
              <div class="cb-info">
                <div class="cb-name">{{ c.name }}</div>
                <div class="cb-issuer">{{ c.issuer }}</div>
              </div>
            </div>
          </div>

          <div class="id-section-title">// EDUCATION</div>
          <div class="id-edu">
            <div class="edu-item" *ngFor="let e of education">
              <div class="edu-deg">{{ e.degree }}</div>
              <div class="edu-col">{{ e.college }}</div>
              <div class="edu-meta">
                <span class="edu-cgpa">{{ e.cgpa }}</span>
                <span class="edu-year">{{ e.year }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Main content -->
        <div class="main-panel">

          <!-- Summary -->
          <div class="res-section">
            <div class="rs-label">
              <span class="rs-icon">◈</span>
              PROFESSIONAL SUMMARY
            </div>
            <p class="summary-text">
              Full Stack Java Developer and MCA 2025 graduate (<span class="hl">CGPA: 9.77/10</span>) with strong expertise in
              <span class="hl cyan">Java Spring Boot</span>, <span class="hl violet">Angular</span>,
              <span class="hl amber">Python</span>, ETL pipelines, AI/ML integration, and REST APIs.
              Currently interning at <span class="hl">Infosys</span> building enterprise full-stack applications with
              JWT auth, MySQL, Docker, CI/CD. Experienced in Linear Regression, Logistic Regression, LLM APIs,
              and prompt engineering. Strong in OOP, DSA, SDLC, Git, and Agile/Scrum.
            </p>
          </div>

          <!-- Experience -->
          <div class="res-section">
            <div class="rs-label">
              <span class="rs-icon">◈</span>
              PROFESSIONAL EXPERIENCE
            </div>
            <div class="exp-timeline">
              <div class="exp-item" *ngFor="let e of experience">
                <div class="ei-dot" [class.current]="e.current"></div>
                <div class="ei-line" *ngIf="!e.last"></div>
                <div class="ei-card" [class.current-card]="e.current">
                  <div class="eic-glow" *ngIf="e.current"></div>
                  <div class="eic-header">
                    <div class="eic-left">
                      <div class="eic-title">{{ e.title }}</div>
                      <div class="eic-company">
                        <span class="eic-co">{{ e.company }}</span>
                        <span class="eic-loc">· {{ e.location }}</span>
                      </div>
                    </div>
                    <div class="eic-right">
                      <span class="eic-period">{{ e.period }}</span>
                      <span class="eic-badge" [class.current-badge]="e.current">{{ e.type }}</span>
                    </div>
                  </div>
                  <ul class="eic-points">
                    <li *ngFor="let p of e.points">
                      <span class="ep-arrow">▸</span> {{ p }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- Skills -->
          <div class="res-section">
            <div class="rs-label">
              <span class="rs-icon">◈</span>
              TECHNICAL SKILLS
            </div>
            <div class="skills-matrix">
              <div class="sm-row" *ngFor="let cat of skillCategories">
                <div class="sm-cat">{{ cat.label }}</div>
                <div class="sm-tags">
                  <span class="sm-tag" *ngFor="let t of cat.tags" [style.borderColor]="cat.color+'44'" [style.color]="cat.color">{{ t }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Projects -->
          <div class="res-section">
            <div class="rs-label">
              <span class="rs-icon">◈</span>
              KEY PROJECTS
            </div>
            <div class="proj-list">
              <div class="pl-item" *ngFor="let p of projects">
                <div class="pli-cross tl"></div>
                <div class="pli-cross tr"></div>
                <div class="pli-header">
                  <div class="pli-name">{{ p.name }}</div>
                  <div class="pli-links">
                    <a [href]="p.github" target="_blank" class="pli-link" *ngIf="p.github !== '#'">GH →</a>
                    <a [href]="p.live" target="_blank" class="pli-link live" *ngIf="p.live !== '#'">LIVE →</a>
                  </div>
                </div>
                <p class="pli-desc">{{ p.desc }}</p>
                <div class="pli-stack">
                  <span class="pli-tech" *ngFor="let t of p.stack">{{ t }}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  `,
  styles: [`
    .page { min-height:100vh; background:#020408; padding:5rem 4rem 5rem; position:relative; overflow:hidden; }
    .grid-cross { position:absolute; inset:0; pointer-events:none; background-image:linear-gradient(rgba(0,245,212,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(0,245,212,.02) 1px,transparent 1px); background-size:60px 60px; }
    .scanline { position:absolute; left:0; right:0; height:2px; pointer-events:none; background:linear-gradient(90deg,transparent,rgba(0,245,212,.06),transparent); animation:scan 8s linear infinite; z-index:0; }
    @keyframes scan { 0%{top:-2%}100%{top:102%} }
    /* Page corners */
    .page-corner { position:absolute; width:20px; height:20px; }
    .page-corner::before,.page-corner::after { content:''; position:absolute; background:rgba(0,245,212,.4); }
    .page-corner::before{width:100%;height:1px;top:50%} .page-corner::after{width:1px;height:100%;left:50%;top:0}
    .pc-tl{top:20px;left:20px} .pc-tr{top:20px;right:20px} .pc-bl{bottom:20px;left:20px} .pc-br{bottom:20px;right:20px}
    /* Header */
    .sec-eyebrow{font-family:'Space Mono',monospace;font-size:.62rem;letter-spacing:4px;color:#00f5d4;margin-bottom:.5rem}
    .sec-title{font-family:'Orbitron',monospace;font-size:clamp(2rem,4vw,3rem);font-weight:900;color:#fff}
    .sec-title span{color:#00f5d4}
    .sec-header{margin-bottom:3rem;position:relative;z-index:1}
    .sec-line{width:60px;height:2px;background:linear-gradient(90deg,#00f5d4,#7c3aed);margin:.8rem 0 1.5rem;position:relative}
    .sec-line::after{content:'';position:absolute;right:-8px;top:-3px;width:8px;height:8px;border:1px solid #00f5d4;transform:rotate(45deg)}
    .header-actions{display:flex;gap:1rem;flex-wrap:wrap}
    .btn-action{display:inline-flex;align-items:center;gap:.5rem;font-family:'Orbitron',monospace;font-size:.7rem;letter-spacing:1.5px;padding:.6rem 1.4rem;text-decoration:none;transition:all .2s;clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)}
    .btn-action.primary{background:#00f5d4;color:#020408;font-weight:700}
    .btn-action.primary:hover{box-shadow:0 0 30px rgba(0,245,212,.5);transform:translateY(-2px)}
    .btn-action.secondary{border:1px solid rgba(0,245,212,.25);color:#00f5d4}
    .btn-action.secondary:hover{background:rgba(0,245,212,.07);transform:translateY(-2px)}
    /* Resume layout */
    .resume-wrap{display:grid;grid-template-columns:320px 1fr;gap:2rem;position:relative;z-index:1}
    /* Identity panel */
    .identity-panel{background:rgba(6,13,26,.9);border:1px solid rgba(0,245,212,.12);padding:2rem;position:relative;overflow:hidden;height:fit-content}
    .ip-cross{position:absolute;width:10px;height:10px}
    .ip-cross::before,.ip-cross::after{content:'';position:absolute;background:rgba(0,245,212,.4)}
    .ip-cross::before{width:100%;height:1px;top:50%} .ip-cross::after{width:1px;height:100%;left:50%;top:0}
    .ip-cross.tl{top:8px;left:8px} .ip-cross.tr{top:8px;right:8px}
    .ip-glow-top{position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,#00f5d4,#7c3aed,transparent)}
    /* Avatar */
    .id-avatar{display:flex;justify-content:center;margin-bottom:1.25rem;position:relative;width:fit-content;margin:0 auto 1.25rem}
    .av-ring{position:absolute;inset:-4px;border:1px solid rgba(0,245,212,.3);border-radius:50%;animation:spinRing 8s linear infinite}
    @keyframes spinRing{to{transform:rotate(360deg)}}
    .av-inner{width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,rgba(0,245,212,.15),rgba(124,58,237,.15));border:2px solid rgba(0,245,212,.3);display:flex;align-items:center;justify-content:center;font-family:'Orbitron',monospace;font-size:1.4rem;font-weight:900;color:#00f5d4}
    .av-status{position:absolute;bottom:4px;right:4px;width:12px;height:12px;background:#10b981;border-radius:50%;border:2px solid #020408;animation:pulse 1.5s infinite}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
    .id-name{font-family:'Orbitron',monospace;font-size:1.1rem;font-weight:900;color:#fff;text-align:center;margin-bottom:.25rem}
    .id-title{font-family:'Space Mono',monospace;font-size:.65rem;color:#64748b;text-align:center;line-height:1.7;margin-bottom:1.5rem;letter-spacing:1px}
    .id-contacts{display:flex;flex-direction:column;gap:.5rem;margin-bottom:1.5rem;padding-bottom:1.5rem;border-bottom:1px solid rgba(255,255,255,.04)}
    .idc-item{display:flex;align-items:center;gap:.6rem}
    .idc-icon{font-size:.9rem}
    .idc-val{font-family:'Space Mono',monospace;font-size:.65rem;color:#94a3b8}
    .id-section-title{font-family:'Space Mono',monospace;font-size:.58rem;letter-spacing:3px;color:#7c3aed;margin-bottom:.75rem;border-left:2px solid #7c3aed;padding-left:.5rem}
    .id-links{display:flex;flex-direction:column;gap:.4rem;margin-bottom:1.5rem;padding-bottom:1.5rem;border-bottom:1px solid rgba(255,255,255,.04)}
    .idl-item{display:flex;align-items:center;gap:.5rem;font-family:'Space Mono',monospace;font-size:.65rem;color:#64748b;text-decoration:none;transition:color .2s}
    .idl-item:hover{color:#00f5d4}
    .idl-dot{width:5px;height:5px;border-radius:50%;flex-shrink:0}
    .idl-dot.cyan{background:#00f5d4} .idl-dot.violet{background:#a78bfa}
    .id-certs{display:flex;flex-direction:column;gap:.75rem;margin-bottom:1.5rem;padding-bottom:1.5rem;border-bottom:1px solid rgba(255,255,255,.04)}
    .cert-badge{display:flex;align-items:center;gap:.7rem}
    .cb-icon{font-size:1.3rem}
    .cb-name{font-family:'Space Mono',monospace;font-size:.65rem;color:#e2e8f0;line-height:1.4}
    .cb-issuer{font-family:'Space Mono',monospace;font-size:.58rem;color:#f59e0b;margin-top:.1rem}
    .id-edu{display:flex;flex-direction:column;gap:.9rem}
    .edu-item{}
    .edu-deg{font-family:'Space Mono',monospace;font-size:.7rem;color:#fff;font-weight:700}
    .edu-col{font-size:.65rem;color:#64748b;font-family:'Space Mono',monospace;margin:.15rem 0}
    .edu-meta{display:flex;justify-content:space-between;align-items:center}
    .edu-cgpa{font-family:'Orbitron',monospace;font-size:.7rem;color:#00f5d4;font-weight:700}
    .edu-year{font-family:'Space Mono',monospace;font-size:.6rem;color:#475569}
    /* Main panel */
    .main-panel{display:flex;flex-direction:column;gap:2rem}
    .res-section{background:rgba(6,13,26,.7);border:1px solid rgba(0,245,212,.08);padding:1.75rem;position:relative}
    .res-section::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,#00f5d4,transparent)}
    .rs-label{font-family:'Space Mono',monospace;font-size:.65rem;letter-spacing:3px;color:#00f5d4;margin-bottom:1.25rem;display:flex;align-items:center;gap:.6rem}
    .rs-icon{color:#7c3aed;font-size:.8rem}
    /* Summary */
    .summary-text{color:#94a3b8;font-size:.9rem;line-height:1.85}
    .hl{font-weight:700;color:#e2e8f0} .hl.cyan{color:#00f5d4} .hl.violet{color:#a78bfa} .hl.amber{color:#f59e0b}
    /* Experience timeline */
    .exp-timeline{display:flex;flex-direction:column;gap:0}
    .exp-item{display:flex;gap:1rem;position:relative}
    .ei-dot{width:14px;height:14px;border-radius:50%;border:2px solid rgba(0,245,212,.3);background:#060d1a;flex-shrink:0;margin-top:4px;z-index:1;transition:all .3s}
    .ei-dot.current{border-color:#00f5d4;background:rgba(0,245,212,.2);box-shadow:0 0 12px rgba(0,245,212,.5);animation:pulseDot 2s infinite}
    @keyframes pulseDot{0%,100%{box-shadow:0 0 8px rgba(0,245,212,.4)}50%{box-shadow:0 0 20px rgba(0,245,212,.8)}}
    .ei-line{position:absolute;left:7px;top:20px;bottom:-20px;width:1px;background:linear-gradient(180deg,rgba(0,245,212,.2),transparent)}
    .ei-card{flex:1;margin-bottom:1.5rem;padding:1.25rem;background:rgba(0,0,0,.2);border:1px solid rgba(255,255,255,.05);position:relative;overflow:hidden}
    .ei-card.current-card{border-color:rgba(0,245,212,.15)}
    .eic-glow{position:absolute;top:0;left:0;right:0;height:1.5px;background:linear-gradient(90deg,transparent,#00f5d4,transparent)}
    .eic-header{display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:.5rem;margin-bottom:1rem}
    .eic-title{font-family:'Orbitron',monospace;font-size:.9rem;font-weight:700;color:#fff;margin-bottom:.2rem}
    .eic-co{color:#00f5d4;font-size:.85rem;font-weight:600}
    .eic-loc{color:#475569;font-size:.8rem}
    .eic-right{display:flex;flex-direction:column;align-items:flex-end;gap:.3rem}
    .eic-period{font-family:'Space Mono',monospace;font-size:.65rem;color:#475569}
    .eic-badge{font-family:'Space Mono',monospace;font-size:.58rem;color:#7c3aed;border:1px solid rgba(124,58,237,.3);padding:.15rem .5rem;background:rgba(124,58,237,.08)}
    .eic-badge.current-badge{color:#10b981;border-color:rgba(16,185,129,.3);background:rgba(16,185,129,.08)}
    .eic-points{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:.4rem}
    .eic-points li{display:flex;gap:.5rem;font-size:.83rem;color:#64748b;line-height:1.65}
    .ep-arrow{color:#7c3aed;flex-shrink:0;margin-top:.1rem}
    /* Skills matrix */
    .skills-matrix{display:flex;flex-direction:column;gap:.8rem}
    .sm-row{display:flex;align-items:flex-start;gap:1rem}
    .sm-cat{font-family:'Space Mono',monospace;font-size:.6rem;letter-spacing:1px;color:#475569;min-width:120px;padding-top:.3rem;flex-shrink:0}
    .sm-tags{display:flex;flex-wrap:wrap;gap:.35rem}
    .sm-tag{font-family:'Space Mono',monospace;font-size:.6rem;padding:.2rem .55rem;background:rgba(255,255,255,.03);border:1px solid;border-radius:0}
    /* Projects */
    .proj-list{display:flex;flex-direction:column;gap:1.25rem}
    .pl-item{padding:1.25rem;background:rgba(0,0,0,.2);border:1px solid rgba(0,245,212,.08);position:relative;transition:border-color .2s}
    .pl-item:hover{border-color:rgba(0,245,212,.2)}
    .pli-cross{position:absolute;width:7px;height:7px}
    .pli-cross::before,.pli-cross::after{content:'';position:absolute;background:rgba(0,245,212,.3)}
    .pli-cross::before{width:100%;height:1px;top:50%} .pli-cross::after{width:1px;height:100%;left:50%;top:0}
    .pli-cross.tl{top:5px;left:5px} .pli-cross.tr{top:5px;right:5px}
    .pli-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:.5rem}
    .pli-name{font-family:'Orbitron',monospace;font-size:.85rem;font-weight:700;color:#fff}
    .pli-links{display:flex;gap:.4rem}
    .pli-link{font-family:'Space Mono',monospace;font-size:.6rem;color:#00f5d4;text-decoration:none;border:1px solid rgba(0,245,212,.2);padding:.15rem .45rem;transition:all .2s}
    .pli-link:hover{background:rgba(0,245,212,.08)}
    .pli-link.live{color:#10b981;border-color:rgba(16,185,129,.2)}
    .pli-desc{color:#64748b;font-size:.82rem;line-height:1.7;margin-bottom:.75rem}
    .pli-stack{display:flex;flex-wrap:wrap;gap:.3rem}
    .pli-tech{font-family:'Space Mono',monospace;font-size:.58rem;padding:.15rem .45rem;background:rgba(0,245,212,.04);color:#00f5d4;border:1px solid rgba(0,245,212,.14)}
    @media(max-width:900px){.resume-wrap{grid-template-columns:1fr}.identity-panel{order:1}.main-panel{order:2}.page{padding:4rem 1.5rem 4rem}}
    @media(max-width:600px){.sm-row{flex-direction:column;gap:.4rem}.sm-cat{min-width:auto}.eic-header{flex-direction:column}}
  `]
})
export class ResumeComponent {
  contacts = [
    { icon: '✉', val: '2003swatikbarik@gmail.com', color: '#00f5d4' },
    { icon: '☎', val: '+91 70089 30892', color: '#a78bfa' },
    { icon: '📍', val: 'Bhubaneswar, Odisha, India', color: '#f59e0b' },
  ];

  certBadges = [
    { icon: '🏆', name: 'Associate IT Foundation', issuer: 'Infosys' },
    { icon: '☁️', name: 'AWS Machine Learning Foundations', issuer: 'Amazon Web Services' },
    { icon: '📊', name: 'Google Data Analytics Professional', issuer: 'Google' },
  ];

  education = [
    { degree: 'MCA – Computer Science', college: 'GITA Autonomous College', cgpa: '9.77/10', year: '2023–2025' },
    { degree: 'B.Sc Computer Science', college: 'Derabish Degree College', cgpa: '8.77/10', year: '2020–2023' },
  ];

  experience = [
    {
      title: 'Full Stack Java Developer Intern',
      company: 'Infosys',
      location: 'Bhubaneswar',
      period: 'Jul 2025 – Present',
      type: 'INTERNSHIP',
      current: true,
      last: false,
      points: [
        'Designed Java Spring Boot backend with REST APIs, Hibernate/JPA, and JWT + Spring Security authentication; built Angular responsive frontends with TypeScript, HTML5, CSS3, Bootstrap.',
        'Designed MySQL schemas; wrote complex SQL queries with joins, stored procedures, indexing; managed Docker containerized deployments with Git CI/CD pipelines.',
        'Built Python ETL pipelines (Pandas, NumPy) processing 500K+ records; applied AI/ML models (Linear Regression, Logistic Regression) — reduced discrepancies by 30%.',
        'Integrated LLM APIs and prompt engineering for AI-powered features; followed Agile/Scrum sprint planning, code reviews, and documentation standards.',
      ]
    },
    {
      title: 'Data Engineer Intern',
      company: 'Revature',
      location: 'Remote',
      period: 'Feb 2025 – Jun 2025',
      type: 'INTERNSHIP',
      current: false,
      last: true,
      points: [
        'Built Python + SQL ETL data pipelines with data validation and reporting; applied Git Flow workflows — reduced processing time by 25%.',
        'Developed reusable data transformation modules and automated reporting dashboards for stakeholder visibility.',
      ]
    },
  ];

  skillCategories = [
    { label: 'Java Backend', color: '#00f5d4', tags: ['Java', 'Spring Boot', 'Hibernate/JPA', 'REST APIs', 'Spring Security', 'JWT', 'Maven'] },
    { label: 'Frontend', color: '#a78bfa', tags: ['Angular', 'TypeScript', 'JavaScript ES6+', 'HTML5', 'CSS3', 'Bootstrap'] },
    { label: 'Python & ETL', color: '#f59e0b', tags: ['Python', 'Pandas', 'NumPy', 'ETL Pipelines', 'Snowflake', 'Data Wrangling'] },
    { label: 'AI / ML', color: '#ec4899', tags: ['Linear Regression', 'Logistic Regression', 'LLM APIs', 'Prompt Engineering', 'TensorFlow'] },
    { label: 'DevOps', color: '#10b981', tags: ['Git', 'GitHub', 'Docker', 'CI/CD', 'AWS', 'VS Code', 'Postman'] },
    { label: 'Databases', color: '#f97316', tags: ['MySQL', 'MS SQL', 'MongoDB', 'Schema Design', 'Stored Procedures', 'Indexing'] },
  ];

  projects = [
    {
      name: 'NeoBank 360 — Full Stack Banking Application',
      desc: 'Complete digital banking platform with Spring Boot REST APIs, Angular frontend, JWT authentication, MySQL database, and Docker deployment. Features include account management, transactions, and secure user flows — demonstrates production-grade Java full stack capability.',
      stack: ['Java', 'Spring Boot', 'Angular', 'MySQL', 'JWT', 'Docker'],
      github: '#',
      live: '#',
    },
    {
      name: 'Restaurant Management System',
      desc: 'Full stack enterprise application with Spring Boot Microservices, Angular UI, Hibernate/JPA, JWT auth, and CI/CD deployment — 35% faster order processing with clean OOP architecture.',
      stack: ['Spring Boot', 'Angular', 'Microservices', 'Hibernate', 'JWT', 'CI/CD'],
      github: 'https://github.com/swatik-cyber',
      live: '#',
    },
    {
      name: 'AI Health Assistant',
      desc: 'Production AI/ML application with LLM API integration, prompt engineering, Linear/Logistic Regression, NLP preprocessing. Live deployed — demonstrates end-to-end Python AI/ML capability.',
      stack: ['Python', 'LLM APIs', 'Streamlit', 'Scikit-learn', 'NLP'],
      github: 'https://github.com/swatik-cyber',
      live: 'https://github.com/swatik-cyber',
    },
    {
      name: 'IPL Match Prediction',
      desc: 'Applied Linear Regression, Logistic Regression, and statistical modelling on large IPL datasets; built ETL pipeline with feature engineering and predictive model for match outcome forecasting.',
      stack: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Statistical Analysis'],
      github: 'https://github.com/swatik-cyber',
      live: '#',
    },
  ];
}
