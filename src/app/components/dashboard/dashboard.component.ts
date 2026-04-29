import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PortfolioService } from '../../services/portfolio.service';
import { AuthService } from '../../services/auth.service';
import { DashboardStats, User, Project } from '../../models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dash">
      <div class="grid-cross"></div>

      <!-- Header -->
      <div class="dash-head">
        <div class="dh-left">
          <div class="dh-eyebrow">// ANALYTICS COMMAND CENTER</div>
          <h1 class="dh-title">DASH<span>BOARD</span></h1>
          <div class="dh-sub">ROLE: <span [class]="'role-'+auth.currentUser?.role?.toLowerCase()">{{ auth.currentUser?.role }}</span> · {{ auth.currentUser?.username }}</div>
        </div>
        <div class="dh-right">
          <div class="live-badge"><span class="lb-dot"></span>LIVE DATA</div>
          <a routerLink="/admin" *ngIf="auth.isAdmin()" class="btn-admin">
            <span>⚙</span> ADMIN PANEL →
          </a>
        </div>
      </div>

      <!-- KPI Grid -->
      <div class="kpi-row" *ngIf="stats">
        <div class="kpi-card" *ngFor="let k of kpiCards()">
          <div class="kpi-top">
            <div class="kpi-icon" [style.color]="k.color">{{ k.icon }}</div>
            <div class="kpi-trend up" *ngIf="k.trend">↑</div>
          </div>
          <div class="kpi-val" [style.color]="k.color">{{ k.val }}</div>
          <div class="kpi-label">{{ k.label }}</div>
          <div class="kpi-sub">{{ k.sub }}</div>
          <div class="kpi-bar"><div class="kpi-bar-fill" [style.width]="k.pct+'%'" [style.background]="k.color"></div></div>
        </div>
      </div>

      <!-- Charts Row -->
      <div class="charts-row">

        <!-- Skills bar chart -->
        <div class="chart-box">
          <div class="cb-header">
            <span class="cb-title">// SKILL PROFICIENCY MATRIX</span>
            <span class="cb-tag">TOP 10</span>
          </div>
          <div class="skill-bars" *ngIf="skills.length">
            <div class="sb-item" *ngFor="let s of skills.slice(0,10); let i=index">
              <div class="sb-meta">
                <span class="sb-name">{{ s.name }}</span>
                <span class="sb-pct" [style.color]="barColor(s.proficiency)">{{ s.proficiency }}%</span>
              </div>
              <div class="sb-track">
                <div class="sb-fill"
                  [style.width.%]="s.proficiency"
                  [style.background]="'linear-gradient(90deg,'+barColor(s.proficiency)+'44,'+barColor(s.proficiency)+')'">
                </div>
                <div class="sb-marker" [style.left.%]="s.proficiency"></div>
              </div>
            </div>
          </div>
          <div class="cb-empty" *ngIf="!skills.length">Loading skills...</div>
        </div>

        <!-- Donut chart -->
        <div class="chart-box">
          <div class="cb-header">
            <span class="cb-title">// STACK DISTRIBUTION</span>
          </div>
          <div class="donut-area">
            <div class="donut-wrap">
              <svg viewBox="0 0 200 200" class="donut-svg">
                <circle *ngFor="let seg of donutSegs"
                  cx="100" cy="100" r="72" fill="none"
                  [attr.stroke]="seg.color" stroke-width="26"
                  [attr.stroke-dasharray]="seg.dash"
                  [attr.stroke-dashoffset]="seg.offset"
                  transform="rotate(-90 100 100)"
                  style="transition:stroke-dasharray .8s ease"/>
                <!-- Inner content -->
                <circle cx="100" cy="100" r="55" fill="rgba(6,13,26,0.9)" stroke="rgba(0,245,212,.08)" stroke-width="1"/>
                <text x="100" y="93" text-anchor="middle" fill="#00f5d4" font-family="Orbitron,monospace" font-size="20" font-weight="900">5+</text>
                <text x="100" y="112" text-anchor="middle" fill="#475569" font-family="Space Mono,monospace" font-size="8">STACKS</text>
              </svg>
            </div>
            <div class="donut-legend">
              <div class="dl-item" *ngFor="let l of donutLabels">
                <div class="dl-dot" [style.background]="l.color"></div>
                <span class="dl-name">{{ l.name }}</span>
                <span class="dl-pct" [style.color]="l.color">{{ l.pct }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Projects table -->
      <div class="data-table" *ngIf="projects.length">
        <div class="dt-head">
          <span class="cb-title">// RECENT PROJECTS</span>
          <a routerLink="/projects" class="dt-see-all">VIEW ALL →</a>
        </div>
        <div class="dt-body">
          <div class="dt-row header-row">
            <span class="dc idx">#</span>
            <span class="dc">PROJECT</span>
            <span class="dc">CATEGORY</span>
            <span class="dc">STACK</span>
            <span class="dc">STATUS</span>
          </div>
          <div class="dt-row" *ngFor="let p of projects.slice(0,5); let i=index">
            <span class="dc idx muted">{{ i+1 }}</span>
            <span class="dc p-name">{{ p.title }}</span>
            <span class="dc"><div class="p-cat">{{ p.tag }}</div></span>
            <span class="dc stack-row">
              <span class="sp" *ngFor="let t of p.techStack.slice(0,3)">{{ t }}</span>
              <span class="sp more" *ngIf="p.techStack.length>3">+{{ p.techStack.length-3 }}</span>
            </span>
            <span class="dc"><div class="status-live">● ACTIVE</div></span>
          </div>
        </div>
      </div>

      <!-- Users table -->
      <div class="data-table" *ngIf="users.length && auth.isAdmin()">
        <div class="dt-head">
          <span class="cb-title">// USER MANAGEMENT</span>
          <a routerLink="/admin" class="dt-see-all">MANAGE →</a>
        </div>
        <div class="dt-body">
          <div class="dt-row header-row">
            <span class="dc">USER</span>
            <span class="dc">ROLE</span>
            <span class="dc">DEPARTMENT</span>
            <span class="dc">STATUS</span>
          </div>
          <div class="dt-row" *ngFor="let u of users">
            <span class="dc">
              <div class="u-cell">
                <div class="u-av" [style.background]="avatarBg(u.role)">{{ u.avatarInitials }}</div>
                <div>
                  <div class="u-name">{{ u.fullName }}</div>
                  <div class="u-email">{{ u.email }}</div>
                </div>
              </div>
            </span>
            <span class="dc"><div class="role-chip" [class]="'r-'+u.role.toLowerCase()">{{ u.role }}</div></span>
            <span class="dc muted small">{{ u.department }}</span>
            <span class="dc">
              <div class="status-chip" [class]="'s-'+u.status.toLowerCase()">
                <span class="sc-dot"></span>{{ u.status }}
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dash { min-height:100vh; background:#020408; padding:5rem 3.5rem 4rem; position:relative; }
    .grid-cross { position:absolute; inset:0; pointer-events:none; background-image:linear-gradient(rgba(0,245,212,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(0,245,212,.02) 1px,transparent 1px); background-size:60px 60px; }

    /* Header */
    .dash-head { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:2.5rem; flex-wrap:wrap; gap:1rem; position:relative; z-index:1; }
    .dh-eyebrow { font-family:'Space Mono',monospace; font-size:.6rem; letter-spacing:4px; color:#7c3aed; margin-bottom:.4rem; }
    .dh-title { font-family:'Orbitron',monospace; font-size:clamp(1.8rem,4vw,2.8rem); font-weight:900; color:#fff; }
    .dh-title span { color:#00f5d4; }
    .dh-sub { font-family:'Space Mono',monospace; font-size:.65rem; color:#475569; margin-top:.3rem; letter-spacing:1px; }
    .role-admin { color:#a78bfa; } .role-manager { color:#00f5d4; } .role-reviewer { color:#f59e0b; } .role-viewer { color:#94a3b8; }
    .dh-right { display:flex; gap:1rem; align-items:center; }
    .live-badge { display:flex; align-items:center; gap:.4rem; border:1px solid rgba(16,185,129,.3); color:#10b981; font-family:'Space Mono',monospace; font-size:.62rem; padding:.3rem .8rem; }
    .lb-dot { width:6px; height:6px; border-radius:50%; background:#10b981; animation:pulse 1.5s infinite; }
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
    .btn-admin { display:flex; align-items:center; gap:.4rem; background:rgba(124,58,237,.15); border:1px solid rgba(124,58,237,.35); color:#a78bfa; font-family:'Orbitron',monospace; font-size:.65rem; letter-spacing:1px; padding:.45rem 1.1rem; text-decoration:none; transition:all .2s; }
    .btn-admin:hover { background:rgba(124,58,237,.3); }

    /* KPI cards */
    .kpi-row { display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:1.25rem; margin-bottom:2rem; position:relative; z-index:1; }
    .kpi-card { background:rgba(6,13,26,.9); border:1px solid rgba(0,245,212,.1); padding:1.5rem; position:relative; overflow:hidden; transition:transform .3s,box-shadow .3s; }
    .kpi-card::before { content:''; position:absolute; top:0; left:0; right:0; height:1.5px; background:linear-gradient(90deg,transparent,var(--c,#00f5d4),transparent); }
    .kpi-card:hover { transform:translateY(-4px); box-shadow:0 16px 50px rgba(0,0,0,.5),0 0 30px rgba(0,245,212,.06); }
    .kpi-top { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:.5rem; }
    .kpi-icon { font-size:1.5rem; }
    .kpi-trend { font-size:.7rem; color:#10b981; font-family:'Space Mono',monospace; }
    .kpi-val { font-family:'Orbitron',monospace; font-size:2.2rem; font-weight:900; line-height:1; margin-bottom:.3rem; }
    .kpi-label { font-family:'Space Mono',monospace; font-size:.6rem; letter-spacing:2px; color:#475569; }
    .kpi-sub { font-size:.75rem; color:#10b981; margin-top:.2rem; }
    .kpi-bar { height:2px; background:rgba(255,255,255,.05); margin-top:1rem; border-radius:1px; overflow:hidden; }
    .kpi-bar-fill { height:100%; border-radius:1px; transition:width 1s ease; }

    /* Charts */
    .charts-row { display:grid; grid-template-columns:1fr 1fr; gap:1.5rem; margin-bottom:2rem; position:relative; z-index:1; }
    @media(max-width:900px){.charts-row{grid-template-columns:1fr}}
    .chart-box { background:rgba(6,13,26,.9); border:1px solid rgba(0,245,212,.1); padding:1.5rem; }
    .cb-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; }
    .cb-title { font-family:'Orbitron',monospace; font-size:.65rem; letter-spacing:2px; color:#00f5d4; }
    .cb-tag { font-family:'Space Mono',monospace; font-size:.58rem; color:#7c3aed; border:1px solid rgba(124,58,237,.25); padding:.15rem .45rem; }
    .cb-empty { color:#475569; font-family:'Space Mono',monospace; font-size:.7rem; padding:2rem 0; text-align:center; }

    /* Skill bars */
    .skill-bars { display:flex; flex-direction:column; gap:.85rem; }
    .sb-item {}
    .sb-meta { display:flex; justify-content:space-between; margin-bottom:.35rem; }
    .sb-name { font-family:'Space Mono',monospace; font-size:.7rem; color:#94a3b8; }
    .sb-pct { font-family:'Space Mono',monospace; font-size:.7rem; font-weight:700; }
    .sb-track { position:relative; height:4px; background:rgba(255,255,255,.05); border-radius:2px; overflow:hidden; }
    .sb-fill { height:100%; border-radius:2px; transition:width 1.2s ease; }
    .sb-marker { position:absolute; top:-2px; width:2px; height:8px; background:#fff; opacity:.3; border-radius:1px; transform:translateX(-50%); }

    /* Donut */
    .donut-area { display:flex; align-items:center; gap:1.5rem; flex-wrap:wrap; }
    .donut-wrap { flex-shrink:0; }
    .donut-svg { width:150px; height:150px; }
    .donut-legend { display:flex; flex-direction:column; gap:.55rem; }
    .dl-item { display:flex; align-items:center; gap:.5rem; }
    .dl-dot { width:8px; height:8px; border-radius:50%; flex-shrink:0; }
    .dl-name { font-family:'Space Mono',monospace; font-size:.68rem; color:#94a3b8; flex:1; }
    .dl-pct { font-family:'Space Mono',monospace; font-size:.68rem; font-weight:700; }

    /* Data table */
    .data-table { background:rgba(6,13,26,.9); border:1px solid rgba(0,245,212,.1); margin-bottom:1.5rem; position:relative; z-index:1; overflow:hidden; }
    .dt-head { display:flex; justify-content:space-between; align-items:center; padding:1rem 1.5rem; border-bottom:1px solid rgba(0,245,212,.08); }
    .dt-see-all { font-family:'Space Mono',monospace; font-size:.65rem; color:#00f5d4; text-decoration:none; }
    .dt-body { overflow-x:auto; }
    .dt-row { display:grid; grid-template-columns:50px 2fr 1.5fr 2fr 1fr; gap:0; padding:0 1.5rem; align-items:center; border-bottom:1px solid rgba(255,255,255,.025); transition:background .2s; }
    .dt-row.header-row { background:rgba(0,245,212,.02); }
    .dt-row:not(.header-row):hover { background:rgba(0,245,212,.02); }
    .dt-row:last-child { border-bottom:none; }
    .dc { padding:.8rem 0; font-size:.82rem; }
    .header-row .dc { font-family:'Space Mono',monospace; font-size:.58rem; letter-spacing:2px; color:#1e293b; }
    .idx { font-family:'Space Mono',monospace; font-size:.75rem; color:#1e293b; }
    .p-name { color:#e2e8f0; font-weight:600; font-size:.85rem; }
    .p-cat { font-family:'Space Mono',monospace; font-size:.6rem; padding:.2rem .5rem; background:rgba(124,58,237,.1); color:#a78bfa; border:1px solid rgba(124,58,237,.2); display:inline-block; }
    .stack-row { display:flex; flex-wrap:wrap; gap:.25rem; }
    .sp { font-family:'Space Mono',monospace; font-size:.58rem; padding:.15rem .4rem; background:rgba(0,245,212,.05); color:#00f5d4; border:1px solid rgba(0,245,212,.12); }
    .sp.more { color:#f59e0b; border-color:rgba(245,158,11,.2); background:rgba(245,158,11,.04); }
    .status-live { font-family:'Space Mono',monospace; font-size:.62rem; color:#10b981; }
    .muted { color:#475569; }
    .small { font-size:.78rem; }

    /* User cells */
    .u-cell { display:flex; align-items:center; gap:.7rem; }
    .u-av { width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-family:'Orbitron',monospace; font-size:.55rem; font-weight:900; color:#fff; flex-shrink:0; }
    .u-name { font-size:.85rem; color:#e2e8f0; }
    .u-email { font-family:'Space Mono',monospace; font-size:.62rem; color:#475569; }
    .role-chip { font-family:'Space Mono',monospace; font-size:.6rem; padding:.2rem .5rem; border:1px solid; display:inline-block; }
    .r-admin { background:rgba(124,58,237,.15); color:#a78bfa; border-color:rgba(124,58,237,.3); }
    .r-manager { background:rgba(0,245,212,.08); color:#00f5d4; border-color:rgba(0,245,212,.2); }
    .r-reviewer { background:rgba(245,158,11,.08); color:#f59e0b; border-color:rgba(245,158,11,.25); }
    .r-viewer { background:rgba(71,85,105,.15); color:#94a3b8; border-color:rgba(71,85,105,.3); }
    .status-chip { display:flex; align-items:center; gap:.4rem; font-family:'Space Mono',monospace; font-size:.62rem; }
    .sc-dot { width:6px; height:6px; border-radius:50%; flex-shrink:0; }
    .s-active .sc-dot { background:#10b981; box-shadow:0 0 6px #10b981; }
    .s-idle .sc-dot { background:#f59e0b; }
    .s-offline .sc-dot { background:#475569; }
    .s-active { color:#10b981; } .s-idle { color:#f59e0b; } .s-offline { color:#475569; }

    @media(max-width:768px){ .dash{padding:4rem 1.5rem 3rem} .dt-row{grid-template-columns:40px 1fr 1fr} .dt-row .dc:nth-child(4),.dt-row .dc:nth-child(5){display:none} }
  `]
})
export class DashboardComponent implements OnInit {
  stats?: DashboardStats;
  projects: any[] = [];
  skills: any[] = [];
  users: User[] = [];
  donutSegs: any[] = [];
  donutLabels = [
    { name:'Python/ML', pct:35, color:'#00f5d4' },
    { name:'Java/Spring', pct:20, color:'#7c3aed' },
    { name:'Angular', pct:15, color:'#f59e0b' },
    { name:'SQL/ETL', pct:15, color:'#3b82f6' },
    { name:'Other', pct:15, color:'#475569' },
  ];
  constructor(public auth: AuthService, private svc: PortfolioService) {}
  ngOnInit() {
    this.svc.getDashboardStats().subscribe(s => this.stats = s);
    this.svc.getProjects().subscribe(p => this.projects = p);
    this.svc.getSkills().subscribe(s => this.skills = s);
    if (this.auth.isAdmin()) this.svc.getUsers().subscribe(u => this.users = u);
    this.buildDonut();
  }
  buildDonut() {
    const c = 2*Math.PI*72; let offset = 0;
    this.donutSegs = this.donutLabels.map(l => {
      const dash = (l.pct/100)*c;
      const seg = { color:l.color, dash:`${dash} ${c-dash}`, offset:-offset };
      offset += dash; return seg;
    });
  }
  barColor(p:number): string {
    if(p>=90) return '#00f5d4';
    if(p>=80) return '#7c3aed';
    if(p>=70) return '#f59e0b';
    return '#3b82f6';
  }
  avatarBg(role:string): string {
    const m:any = { ADMIN:'linear-gradient(135deg,#7c3aed,#00f5d4)', MANAGER:'linear-gradient(135deg,#f59e0b,#ec4899)', REVIEWER:'linear-gradient(135deg,#10b981,#3b82f6)', VIEWER:'linear-gradient(135deg,#475569,#94a3b8)' };
    return m[role]||m.VIEWER;
  }
  kpiCards() {
    if (!this.stats) return [];
    return [
      { icon:'◈', label:'TOTAL PROJECTS', val:this.stats.totalProjects, sub:'AI · Full-Stack · Data', color:'#00f5d4', pct:Math.min(this.stats.totalProjects*15,100), trend:true },
      { icon:'◎', label:'TOTAL USERS', val:this.stats.totalUsers, sub:`${this.stats.activeUsers} active`, color:'#7c3aed', pct:Math.min(this.stats.activeUsers/this.stats.totalUsers*100,100) },
      { icon:'◆', label:'TECH SKILLS', val:this.stats.totalSkills, sub:'Across all domains', color:'#f59e0b', pct:Math.min(this.stats.totalSkills*5,100), trend:true },
      { icon:'✉', label:'MESSAGES', val:this.stats.unreadMessages, sub:'Unread in inbox', color:'#ec4899', pct:Math.min(this.stats.unreadMessages*20,100) },
    ];
  }
}
