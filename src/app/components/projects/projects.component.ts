import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';
import { Project } from '../../models';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page">
      <!-- Cross grid overlay -->
      <div class="grid-cross"></div>

      <div class="sec-header">
        <div class="sec-eyebrow">// 02. FEATURED WORK</div>
        <h1 class="sec-title">Featured <span>Projects</span></h1>
        <div class="sec-line"></div>
      </div>

      <!-- Filters -->
      <div class="filter-row">
        <button *ngFor="let f of filters" (click)="setFilter(f)" [class.active]="activeFilter===f" class="filter-btn">
          <span class="fb-dot"></span>{{ f }}
        </button>
      </div>

      <!-- Loading -->
      <div class="loading-state" *ngIf="loading">
        <div class="load-ring"></div>
        <span>FETCHING PROJECTS...</span>
      </div>

      <!-- No results -->
      <div class="empty-state" *ngIf="!loading && filtered().length===0">
        <span>// NO PROJECTS MATCH FILTER</span>
      </div>

      <!-- Project grid -->
      <div class="proj-grid" *ngIf="!loading && !selected">
        <div class="proj-card card-corners" *ngFor="let p of filtered(); let i=index"
             (click)="select(p)" [class.featured]="p.featured"
             [style.animation-delay]="(i*0.07)+'s'">

          <!-- Corner markers -->
          <div class="cross-tl cm"></div>
          <div class="cross-tr cm"></div>
          <div class="cross-bl cm"></div>
          <div class="cross-br cm"></div>

          <!-- Glow accent -->
          <div class="card-glow"></div>

          <div class="p-inner">
            <div class="p-top-row">
              <span class="p-tag">{{ p.tag }}</span>
              <span class="p-featured" *ngIf="p.featured">★ FEATURED</span>
            </div>
            <h3 class="p-title">{{ p.title }}</h3>
            <p class="p-desc">{{ p.description | slice:0:120 }}{{ p.description.length>120 ? '...' : '' }}</p>
            <div class="p-stack">
              <span class="tech-pill" *ngFor="let t of p.techStack.slice(0,4)">{{ t }}</span>
              <span class="tech-pill more" *ngIf="p.techStack.length>4">+{{ p.techStack.length-4 }}</span>
            </div>
            <div class="p-footer">
              <span class="p-cta">VIEW DETAILS →</span>
              <div class="p-links-mini">
                <a [href]="p.githubUrl || '#'" target="_blank" (click)="$event.stopPropagation()" class="p-link-icon" title="GitHub">⌥ GH</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ═══ PROJECT DETAIL VIEW ═══ -->
      <div class="detail-view" *ngIf="selected">
        <button class="back-btn" (click)="selected=null">
          ← BACK TO ALL PROJECTS
        </button>

        <div class="detail-card">
          <!-- Corner crosses -->
          <div class="d-corner dtl"></div>
          <div class="d-corner dtr"></div>
          <div class="d-corner dbl"></div>
          <div class="d-corner dbr"></div>

          <div class="d-header">
            <div class="d-meta">
              <span class="d-tag">{{ selected.tag }}</span>
              <span class="d-featured" *ngIf="selected.featured">★ FEATURED PROJECT</span>
            </div>
            <h2 class="d-title">{{ selected.title }}</h2>
            <div class="d-id">// PROJECT_{{ selected.id }}</div>
          </div>

          <div class="d-body">
            <div class="d-left">
              <!-- Full description -->
              <div class="d-section">
                <div class="d-sec-label">DESCRIPTION</div>
                <p class="d-desc">{{ selected.description }}</p>
              </div>

              <!-- Tech stack -->
              <div class="d-section">
                <div class="d-sec-label">TECH STACK</div>
                <div class="d-stack">
                  <span class="d-tech" *ngFor="let t of selected.techStack">{{ t }}</span>
                </div>
              </div>

              <!-- Links -->
              <div class="d-section">
                <div class="d-sec-label">LINKS</div>
                <div class="d-link-row">
                  <a [href]="selected.githubUrl || '#'" target="_blank" class="d-btn-link">
                    <span>⌥</span> VIEW ON GITHUB →
                  </a>
                  <a [href]="selected.liveUrl || '#'" target="_blank" class="d-btn-link live" *ngIf="selected.liveUrl && selected.liveUrl !== '#'">
                    <span>◉</span> LIVE DEMO →
                  </a>
                </div>
              </div>
            </div>

            <div class="d-right">
              <!-- Visual card with animated border -->
              <div class="d-visual">
                <div class="dv-tag">{{ selected.tag }}</div>
                <div class="dv-name">{{ selected.title }}</div>
                <div class="dv-metrics">
                  <div class="dv-m" *ngFor="let m of getMetrics(selected)">
                    <div class="dv-m-val">{{ m.val }}</div>
                    <div class="dv-m-label">{{ m.label }}</div>
                  </div>
                </div>
                <div class="dv-status">
                  <span class="dv-dot"></span> PROJECT STATUS: ACTIVE
                </div>
              </div>

              <!-- Navigation between projects -->
              <div class="d-nav">
                <button class="d-nav-btn" (click)="prevProject()" [disabled]="currentIndex()===0">← PREV</button>
                <span class="d-nav-pos">{{ currentIndex()+1 }} / {{ filtered().length }}</span>
                <button class="d-nav-btn" (click)="nextProject()" [disabled]="currentIndex()===filtered().length-1">NEXT →</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page { min-height:100vh; background:#020408; padding:5rem 4rem 4rem; position:relative; }

    /* Grid cross overlay */
    .grid-cross {
      position:absolute; inset:0; pointer-events:none;
      background-image:linear-gradient(rgba(0,245,212,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,245,212,.025) 1px,transparent 1px);
      background-size:60px 60px;
    }

    /* Header */
    .sec-eyebrow { font-family:'Space Mono',monospace; font-size:.62rem; letter-spacing:4px; color:#00f5d4; margin-bottom:.5rem; }
    .sec-title { font-family:'Orbitron',monospace; font-size:clamp(1.8rem,4vw,2.8rem); font-weight:900; color:#fff; }
    .sec-title span { color:#00f5d4; }
    .sec-header { margin-bottom:2.5rem; position:relative; z-index:1; }
    .sec-line { width:60px; height:2px; background:linear-gradient(90deg,#00f5d4,#7c3aed); margin-top:.8rem; position:relative; }
    .sec-line::after { content:''; position:absolute; right:-8px; top:-3px; width:8px; height:8px; border:1px solid #00f5d4; transform:rotate(45deg); }

    /* Filters */
    .filter-row { display:flex; gap:.6rem; flex-wrap:wrap; margin-bottom:2.5rem; position:relative; z-index:1; }
    .filter-btn {
      background:transparent; border:1px solid rgba(255,255,255,.07);
      color:#475569; padding:.4rem 1rem;
      font-family:'Space Mono',monospace; font-size:.62rem; letter-spacing:1px;
      cursor:pointer; transition:all .2s;
      display:flex; align-items:center; gap:.4rem;
    }
    .filter-btn:hover { color:#e2e8f0; border-color:rgba(0,245,212,.2); }
    .filter-btn.active { color:#00f5d4; border-color:#00f5d4; background:rgba(0,245,212,.06); }
    .fb-dot { width:4px; height:4px; border-radius:50%; background:currentColor; opacity:.6; }

    /* Loading */
    .loading-state { display:flex; align-items:center; gap:1rem; padding:4rem; color:#475569; font-family:'Space Mono',monospace; font-size:.75rem; justify-content:center; }
    .load-ring { width:20px; height:20px; border:1.5px solid rgba(0,245,212,.2); border-top-color:#00f5d4; border-radius:50%; animation:spin .8s linear infinite; }
    @keyframes spin { to{transform:rotate(360deg)} }
    .empty-state { text-align:center; padding:4rem; color:#475569; font-family:'Space Mono',monospace; font-size:.75rem; }

    /* Project grid */
    .proj-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(320px,1fr)); gap:1.5rem; position:relative; z-index:1; }
    .proj-card {
      background:rgba(6,13,26,0.8); border:1px solid rgba(0,245,212,.1); border-radius:2px;
      cursor:pointer; position:relative; overflow:hidden;
      animation:fadeUp .5s ease forwards; opacity:0;
      transition:transform .3s, box-shadow .3s, border-color .3s;
    }
    @keyframes fadeUp { to{opacity:1;transform:translateY(0)} from{opacity:0;transform:translateY(20px)} }
    .proj-card:hover { transform:translateY(-6px); border-color:rgba(0,245,212,.3); box-shadow:0 20px 60px rgba(0,0,0,.5),0 0 40px rgba(0,245,212,.08); }
    .proj-card.featured { border-color:rgba(0,245,212,.18); }

    /* Card glow */
    .card-glow { position:absolute; top:0; left:0; right:0; height:1px; background:linear-gradient(90deg,transparent,#00f5d4,transparent); opacity:0; transition:opacity .3s; }
    .proj-card:hover .card-glow { opacity:1; }

    /* Corner crosses */
    .cm { position:absolute; width:10px; height:10px; pointer-events:none; }
    .cm::before,.cm::after { content:''; position:absolute; background:rgba(0,245,212,.3); }
    .cm::before { width:100%; height:1px; top:50%; left:0; }
    .cm::after { width:1px; height:100%; left:50%; top:0; }
    .cross-tl { top:6px; left:6px; }
    .cross-tr { top:6px; right:6px; }
    .cross-bl { bottom:6px; left:6px; }
    .cross-br { bottom:6px; right:6px; }

    /* Card inner */
    .p-inner { padding:1.75rem; }
    .p-top-row { display:flex; justify-content:space-between; align-items:center; margin-bottom:.9rem; }
    .p-tag { font-family:'Space Mono',monospace; font-size:.58rem; letter-spacing:2px; color:#a78bfa; border:1px solid rgba(124,58,237,.3); padding:.15rem .55rem; background:rgba(124,58,237,.08); }
    .p-featured { font-family:'Space Mono',monospace; font-size:.58rem; color:#f59e0b; letter-spacing:1px; }
    .p-title { font-family:'Orbitron',monospace; font-size:.9rem; font-weight:700; color:#fff; margin-bottom:.7rem; line-height:1.3; }
    .p-desc { color:#64748b; font-size:.85rem; line-height:1.7; margin-bottom:1.2rem; }
    .p-stack { display:flex; flex-wrap:wrap; gap:.35rem; margin-bottom:1.25rem; }
    .tech-pill { font-family:'Space Mono',monospace; font-size:.58rem; padding:.2rem .5rem; background:rgba(0,245,212,.04); color:#00f5d4; border:1px solid rgba(0,245,212,.14); }
    .tech-pill.more { color:#f59e0b; border-color:rgba(245,158,11,.2); background:rgba(245,158,11,.04); }
    .p-footer { display:flex; justify-content:space-between; align-items:center; border-top:1px solid rgba(255,255,255,.04); padding-top:.9rem; }
    .p-cta { font-family:'Space Mono',monospace; font-size:.65rem; color:#00f5d4; letter-spacing:1px; }
    .p-link-icon { font-family:'Space Mono',monospace; font-size:.6rem; color:#475569; text-decoration:none; border:1px solid rgba(255,255,255,.08); padding:.2rem .5rem; transition:all .2s; }
    .p-link-icon:hover { color:#00f5d4; border-color:rgba(0,245,212,.3); }

    /* ═══ DETAIL VIEW ═══ */
    .back-btn {
      background:transparent; border:1px solid rgba(0,245,212,.2); color:#00f5d4;
      font-family:'Space Mono',monospace; font-size:.7rem; letter-spacing:1px;
      padding:.5rem 1.2rem; cursor:pointer; margin-bottom:2rem;
      transition:all .2s; position:relative; z-index:1;
    }
    .back-btn:hover { background:rgba(0,245,212,.08); }

    .detail-card {
      background:rgba(6,13,26,0.9); border:1px solid rgba(0,245,212,.15); border-radius:2px;
      position:relative; overflow:hidden;
      animation:fadeUp .4s ease forwards;
    }
    /* Detail corner crosses */
    .d-corner { position:absolute; width:16px; height:16px; }
    .d-corner::before,.d-corner::after { content:''; position:absolute; background:rgba(0,245,212,.5); }
    .d-corner::before { width:100%; height:1px; top:50%; left:0; }
    .d-corner::after { width:1px; height:100%; left:50%; top:0; }
    .dtl{top:10px;left:10px} .dtr{top:10px;right:10px} .dbl{bottom:10px;left:10px} .dbr{bottom:10px;right:10px}

    .d-header { padding:2.5rem 2.5rem 2rem; border-bottom:1px solid rgba(0,245,212,.08); }
    .d-meta { display:flex; align-items:center; gap:1rem; margin-bottom:1rem; }
    .d-tag { font-family:'Space Mono',monospace; font-size:.65rem; letter-spacing:2px; color:#a78bfa; border:1px solid rgba(124,58,237,.3); padding:.25rem .75rem; background:rgba(124,58,237,.1); }
    .d-featured { font-family:'Space Mono',monospace; font-size:.65rem; color:#f59e0b; }
    .d-title { font-family:'Orbitron',monospace; font-size:clamp(1.3rem,3vw,2rem); font-weight:900; color:#fff; margin-bottom:.4rem; }
    .d-id { font-family:'Space Mono',monospace; font-size:.6rem; color:#1e293b; letter-spacing:3px; }

    .d-body { display:grid; grid-template-columns:1fr 360px; gap:2.5rem; padding:2.5rem; }
    @media(max-width:900px) { .d-body { grid-template-columns:1fr; } }

    .d-section { margin-bottom:2rem; }
    .d-sec-label { font-family:'Space Mono',monospace; font-size:.6rem; letter-spacing:3px; color:#7c3aed; margin-bottom:.75rem; border-left:2px solid #7c3aed; padding-left:.5rem; }
    .d-desc { color:#94a3b8; font-size:.95rem; line-height:1.85; }
    .d-stack { display:flex; flex-wrap:wrap; gap:.5rem; }
    .d-tech { font-family:'Space Mono',monospace; font-size:.65rem; padding:.3rem .8rem; background:rgba(0,245,212,.05); color:#00f5d4; border:1px solid rgba(0,245,212,.18); }
    .d-link-row { display:flex; gap:1rem; flex-wrap:wrap; }
    .d-btn-link {
      display:inline-flex; align-items:center; gap:.5rem;
      border:1px solid rgba(0,245,212,.25); color:#00f5d4;
      font-family:'Orbitron',monospace; font-size:.65rem; letter-spacing:1px;
      padding:.6rem 1.4rem; text-decoration:none; transition:all .2s;
      clip-path:polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%);
    }
    .d-btn-link:hover { background:rgba(0,245,212,.1); border-color:#00f5d4; }
    .d-btn-link.live { border-color:rgba(16,185,129,.3); color:#10b981; }
    .d-btn-link.live:hover { background:rgba(16,185,129,.1); }

    /* Visual card on right */
    .d-visual {
      background:rgba(0,245,212,.03); border:1px solid rgba(0,245,212,.12); padding:2rem;
      border-radius:2px; position:relative; overflow:hidden;
    }
    .d-visual::before {
      content:''; position:absolute; top:0; left:0; right:0; height:2px;
      background:linear-gradient(90deg,#00f5d4,#7c3aed,#ec4899);
    }
    .dv-tag { font-family:'Space Mono',monospace; font-size:.6rem; letter-spacing:3px; color:#7c3aed; margin-bottom:.75rem; }
    .dv-name { font-family:'Orbitron',monospace; font-size:1rem; font-weight:700; color:#fff; margin-bottom:1.5rem; line-height:1.3; }
    .dv-metrics { display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-bottom:1.5rem; }
    .dv-m { text-align:center; background:rgba(0,0,0,.3); padding:.8rem .5rem; }
    .dv-m-val { font-family:'Orbitron',monospace; font-size:1.2rem; font-weight:900; color:#00f5d4; }
    .dv-m-label { font-family:'Space Mono',monospace; font-size:.55rem; color:#475569; letter-spacing:1px; margin-top:.2rem; }
    .dv-status { display:flex; align-items:center; gap:.5rem; font-family:'Space Mono',monospace; font-size:.6rem; color:#10b981; }
    .dv-dot { width:6px; height:6px; border-radius:50%; background:#10b981; animation:pulse 1.5s infinite; }
    @keyframes pulse { 0%,100%{opacity:1}50%{opacity:.3} }

    /* Detail nav */
    .d-nav { display:flex; align-items:center; justify-content:space-between; margin-top:1.5rem; }
    .d-nav-btn { background:transparent; border:1px solid rgba(0,245,212,.2); color:#00f5d4; font-family:'Space Mono',monospace; font-size:.65rem; padding:.4rem 1rem; cursor:pointer; transition:all .2s; }
    .d-nav-btn:hover:not(:disabled) { background:rgba(0,245,212,.08); }
    .d-nav-btn:disabled { opacity:.3; cursor:not-allowed; }
    .d-nav-pos { font-family:'Space Mono',monospace; font-size:.7rem; color:#475569; }

    .detail-view { position:relative; z-index:1; }

    @media(max-width:768px) { .page{padding:4rem 1.5rem 3rem} .proj-grid{grid-template-columns:1fr} }
  `]
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  loading = true;
  activeFilter = 'ALL';
  selected: Project | null = null;
  filters = ['ALL','AI / NLP','ETL / ANALYTICS','FULL STACK','DATA SCIENCE','DATA ENGINEERING'];

  constructor(private svc: PortfolioService) {}
  ngOnInit() { this.svc.getProjects().subscribe(p => { this.projects = p; this.loading = false; }); }
  filtered() { return this.activeFilter === 'ALL' ? this.projects : this.projects.filter(p => p.tag === this.activeFilter); }
  setFilter(f: string) { this.activeFilter = f; this.selected = null; }
  select(p: Project) { this.selected = p; window.scrollTo({top:0,behavior:'smooth'}); }
  currentIndex() { return this.filtered().findIndex(p => p.id === this.selected?.id); }
  nextProject() {
    const i = this.currentIndex();
    if (i < this.filtered().length - 1) this.selected = this.filtered()[i + 1];
  }
  prevProject() {
    const i = this.currentIndex();
    if (i > 0) this.selected = this.filtered()[i - 1];
  }
  getMetrics(p: Project) {
    return [
      { val: p.techStack.length + '', label: 'TECHNOLOGIES' },
      { val: p.featured ? '★' : '◇', label: 'FEATURED' },
    ];
  }
}
