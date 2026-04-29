import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';
import { Skill } from '../../models';
@Component({
  selector: 'app-skills', standalone: true, imports: [CommonModule],
  template: `
    <div class="page">
      <div class="grid-cross"></div>
      <div class="sec-header">
        <div class="sec-eyebrow">// 03. TECHNICAL ARSENAL</div>
        <h1 class="sec-title">Technical <span>Skills</span></h1>
        <div class="sec-line"></div>
      </div>
      <div class="cat-grid">
        <div class="cat-card" *ngFor="let cat of categories; let ci=index" [style.animation-delay]="(ci*0.1)+'s'">
          <div class="cat-head">
            <div class="cat-icon" [style.color]="cat.color">{{ cat.icon }}</div>
            <div class="cat-label" [style.color]="cat.color">{{ cat.label }}</div>
          </div>
          <div class="cat-corner ctL"></div>
          <div class="cat-corner ctR"></div>
          <div class="skill-list">
            <div class="skill-row" *ngFor="let s of getByCategory(cat.key)">
              <div class="sr-top">
                <span class="sr-name">{{ s.name }}</span>
                <span class="sr-pct" [style.color]="getColor(s.proficiency)">{{ s.proficiency }}%</span>
              </div>
              <div class="sr-track">
                <div class="sr-fill"
                  [style.width.%]="s.proficiency"
                  [style.background]="'linear-gradient(90deg,'+getColor(s.proficiency)+'66,'+getColor(s.proficiency)+')'">
                </div>
              </div>
            </div>
            <div class="empty-cat" *ngIf="getByCategory(cat.key).length===0">No data</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page { min-height:100vh; background:#020408; padding:5rem 4rem 4rem; position:relative; }
    .grid-cross { position:absolute; inset:0; pointer-events:none; background-image:linear-gradient(rgba(0,245,212,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(0,245,212,.02) 1px,transparent 1px); background-size:60px 60px; }
    .sec-eyebrow { font-family:'Space Mono',monospace; font-size:.62rem; letter-spacing:4px; color:#00f5d4; margin-bottom:.5rem; }
    .sec-title { font-family:'Orbitron',monospace; font-size:clamp(1.8rem,4vw,2.8rem); font-weight:900; color:#fff; }
    .sec-title span { color:#00f5d4; }
    .sec-header { margin-bottom:2.5rem; position:relative; z-index:1; }
    .sec-line { width:60px; height:2px; background:linear-gradient(90deg,#00f5d4,#7c3aed); margin-top:.8rem; position:relative; }
    .sec-line::after { content:''; position:absolute; right:-8px; top:-3px; width:8px; height:8px; border:1px solid #00f5d4; transform:rotate(45deg); }
    .cat-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(290px,1fr)); gap:1.5rem; position:relative; z-index:1; }
    .cat-card { background:rgba(6,13,26,.85); border:1px solid rgba(0,245,212,.1); padding:1.5rem; position:relative; animation:fadeUp .5s ease forwards; opacity:0; transition:border-color .3s; }
    .cat-card:hover { border-color:rgba(0,245,212,.25); }
    @keyframes fadeUp { to{opacity:1;transform:translateY(0)} from{opacity:0;transform:translateY(16px)} }
    .cat-head { display:flex; align-items:center; gap:.6rem; margin-bottom:1.25rem; padding-bottom:.8rem; border-bottom:1px solid rgba(255,255,255,.05); }
    .cat-icon { font-size:1.1rem; }
    .cat-label { font-family:'Orbitron',monospace; font-size:.65rem; letter-spacing:2px; font-weight:700; }
    .cat-corner { position:absolute; width:8px; height:8px; }
    .cat-corner::before,.cat-corner::after { content:''; position:absolute; background:rgba(0,245,212,.3); }
    .cat-corner::before { width:100%; height:1px; top:50%; } .cat-corner::after { width:1px; height:100%; left:50%; top:0; }
    .ctL { top:8px; left:8px; } .ctR { top:8px; right:8px; }
    .skill-list { display:flex; flex-direction:column; gap:.8rem; }
    .sr-top { display:flex; justify-content:space-between; margin-bottom:.3rem; }
    .sr-name { font-family:'Space Mono',monospace; font-size:.72rem; color:#94a3b8; }
    .sr-pct { font-family:'Space Mono',monospace; font-size:.72rem; font-weight:700; }
    .sr-track { height:3px; background:rgba(255,255,255,.05); border-radius:2px; overflow:hidden; }
    .sr-fill { height:100%; border-radius:2px; animation:grow 1.4s ease forwards; transform-origin:left; }
    @keyframes grow { from{width:0!important} }
    .empty-cat { font-family:'Space Mono',monospace; font-size:.65rem; color:#1e293b; padding:.5rem 0; }
    @media(max-width:768px){.page{padding:4rem 1.5rem 3rem}}
  `]
})
export class SkillsComponent implements OnInit {
  skills: Skill[] = [];
  categories = [
    { key:'PROGRAMMING',    label:'PROGRAMMING',     icon:'⌨', color:'#00f5d4' },
    { key:'MACHINE_LEARNING', label:'MACHINE LEARNING', icon:'◈', color:'#7c3aed' },
    { key:'DEEP_LEARNING',  label:'DEEP LEARNING',   icon:'◎', color:'#ec4899' },
    { key:'LIBRARIES',      label:'LIBRARIES',       icon:'◆', color:'#f59e0b' },
    { key:'TOOLS',          label:'TOOLS',           icon:'⚙', color:'#3b82f6' },
    { key:'DATABASE',       label:'DATABASE',        icon:'◇', color:'#10b981' },
    { key:'CONCEPTS',       label:'CONCEPTS',        icon:'∑', color:'#a78bfa' },
  ];
  constructor(private svc: PortfolioService) {}
  ngOnInit() { this.svc.getSkills().subscribe(s => this.skills = s); }
  getByCategory(cat: string) { return this.skills.filter(s => s.category === cat); }
  getColor(p: number): string {
    if(p>=90) return '#00f5d4'; if(p>=80) return '#7c3aed'; if(p>=70) return '#f59e0b'; return '#3b82f6';
  }
}
