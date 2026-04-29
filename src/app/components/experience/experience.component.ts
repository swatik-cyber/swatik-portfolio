import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';
import { Experience } from '../../models';
@Component({
  selector: 'app-experience', standalone: true, imports: [CommonModule],
  template: `
    <div class="page">
      <div class="grid-cross"></div>
      <div class="scanline"></div>
      <div class="bg-orb"></div>
      <div class="sec-header">
        <div class="sec-eyebrow">// 04. PROFESSIONAL JOURNEY</div>
        <h1 class="sec-title">Work <span>Experience</span></h1>
        <div class="sec-line"></div>
      </div>
      <div class="tl-intro">
        <div class="tli-stat" *ngFor="let s of stats">
          <div class="tlis-val">{{ s.val }}</div>
          <div class="tlis-label">{{ s.label }}</div>
        </div>
      </div>
      <div class="timeline">
        <div class="tl-item" *ngFor="let e of experiences; let i=index" [style.animation-delay]="(i*0.15)+'s'">
          <div class="tl-left">
            <div class="tl-dot" [class.current]="e.current">
              <div class="tl-dot-inner"></div>
              <div class="tl-dot-ping" *ngIf="e.current"></div>
            </div>
            <div class="tl-line" *ngIf="i < experiences.length-1"></div>
          </div>
          <div class="tl-card" [class.current-card]="e.current">
            <div class="tc-cross tl"></div>
            <div class="tc-cross tr"></div>
            <div class="tc-glow" *ngIf="e.current"></div>
            <div class="tc-header">
              <div class="tc-dates">
                <span class="tc-date">{{ e.startDate | date:'MMM yyyy' }}</span>
                <span class="tc-sep">—</span>
                <span class="tc-date" [class.present]="e.current">{{ e.current ? 'PRESENT' : (e.endDate | date:'MMM yyyy') }}</span>
              </div>
              <div class="tc-badges">
                <span class="tc-type">{{ e.type }}</span>
                <span class="tc-current" *ngIf="e.current">● ONGOING</span>
              </div>
            </div>
            <h3 class="tc-title">{{ e.title }}</h3>
            <div class="tc-company">
              <span class="tc-comp-name">{{ e.company }}</span>
              <span class="tc-loc">· {{ e.location }}</span>
            </div>
            <div class="tc-highlights" *ngIf="e.highlights?.length">
              <div class="tc-h-item" *ngFor="let h of e.highlights">
                <span class="tc-arrow">▸</span>
                <span>{{ h }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page { min-height:100vh; background:#020408; padding:5rem 4rem 4rem; position:relative; overflow:hidden; }
    .grid-cross { position:absolute; inset:0; pointer-events:none; background-image:linear-gradient(rgba(0,245,212,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(0,245,212,.02) 1px,transparent 1px); background-size:60px 60px; }
    .scanline { position:absolute; left:0; right:0; height:2px; pointer-events:none; background:linear-gradient(90deg,transparent,rgba(0,245,212,.05),transparent); animation:scan 9s linear infinite; z-index:0; }
    @keyframes scan{0%{top:-2%}100%{top:102%}}
    .bg-orb { position:absolute; width:500px; height:500px; top:-100px; right:-100px; border-radius:50%; background:radial-gradient(circle,rgba(124,58,237,.04) 0%,transparent 70%); pointer-events:none; }
    .sec-eyebrow{font-family:'Space Mono',monospace;font-size:.62rem;letter-spacing:4px;color:#00f5d4;margin-bottom:.5rem}
    .sec-title{font-family:'Orbitron',monospace;font-size:clamp(1.8rem,4vw,2.8rem);font-weight:900;color:#fff}
    .sec-title span{color:#00f5d4}
    .sec-header{margin-bottom:2rem;position:relative;z-index:1}
    .sec-line{width:60px;height:2px;background:linear-gradient(90deg,#00f5d4,#7c3aed);margin-top:.8rem;position:relative}
    .sec-line::after{content:'';position:absolute;right:-8px;top:-3px;width:8px;height:8px;border:1px solid #00f5d4;transform:rotate(45deg)}
    .tl-intro{display:flex;gap:0;margin-bottom:3rem;position:relative;z-index:1;border:1px solid rgba(0,245,212,.08);width:fit-content}
    .tli-stat{padding:1rem 2rem;border-right:1px solid rgba(0,245,212,.08);text-align:center}
    .tli-stat:last-child{border-right:none}
    .tlis-val{font-family:'Orbitron',monospace;font-size:1.6rem;font-weight:900;color:#00f5d4;text-shadow:0 0 20px rgba(0,245,212,.4)}
    .tlis-label{font-family:'Space Mono',monospace;font-size:.55rem;letter-spacing:2px;color:#475569;margin-top:.2rem}
    .timeline{position:relative;z-index:1;max-width:900px}
    .tl-item{display:flex;gap:1.5rem;margin-bottom:2.5rem;animation:fadeUp .5s ease forwards;opacity:0}
    @keyframes fadeUp{to{opacity:1;transform:translateY(0)}from{opacity:0;transform:translateY(20px)}}
    .tl-left{display:flex;flex-direction:column;align-items:center;flex-shrink:0}
    .tl-dot{width:22px;height:22px;border-radius:50%;border:2px solid #1e293b;background:#060d1a;display:flex;align-items:center;justify-content:center;position:relative;z-index:1}
    .tl-dot.current{border-color:#00f5d4;box-shadow:0 0 20px rgba(0,245,212,.5)}
    .tl-dot-inner{width:8px;height:8px;border-radius:50%;background:#1e293b}
    .tl-dot.current .tl-dot-inner{background:#00f5d4}
    .tl-dot-ping{position:absolute;inset:-6px;border-radius:50%;border:1px solid rgba(0,245,212,.3);animation:pingDot 2s infinite}
    @keyframes pingDot{0%{transform:scale(1);opacity:.5}100%{transform:scale(1.5);opacity:0}}
    .tl-line{width:1px;flex:1;background:linear-gradient(180deg,rgba(0,245,212,.2),rgba(124,58,237,.1),transparent);min-height:60px;margin-top:4px}
    .tl-card{flex:1;background:rgba(6,13,26,.9);border:1px solid rgba(0,245,212,.08);padding:1.75rem;position:relative;overflow:hidden;transition:border-color .3s,box-shadow .3s}
    .tl-card:hover{border-color:rgba(0,245,212,.2);box-shadow:0 10px 40px rgba(0,0,0,.5)}
    .tl-card.current-card{border-color:rgba(0,245,212,.18)}
    .tc-glow{position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,#00f5d4,#7c3aed,transparent)}
    .tc-cross{position:absolute;width:8px;height:8px}
    .tc-cross::before,.tc-cross::after{content:'';position:absolute;background:rgba(0,245,212,.3)}
    .tc-cross::before{width:100%;height:1px;top:50%}.tc-cross::after{width:1px;height:100%;left:50%;top:0}
    .tc-cross.tl{top:6px;left:6px}.tc-cross.tr{top:6px;right:6px}
    .tc-header{display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:.5rem;margin-bottom:.8rem}
    .tc-dates{display:flex;align-items:center;gap:.5rem}
    .tc-date{font-family:'Space Mono',monospace;font-size:.7rem;color:#475569}
    .tc-date.present{color:#00f5d4;font-weight:700}
    .tc-sep{color:#1e293b}
    .tc-badges{display:flex;align-items:center;gap:.6rem}
    .tc-type{font-family:'Space Mono',monospace;font-size:.6rem;color:#7c3aed;border:1px solid rgba(124,58,237,.3);padding:.15rem .5rem;background:rgba(124,58,237,.08)}
    .tc-current{font-family:'Space Mono',monospace;font-size:.6rem;color:#10b981;animation:blink 1.5s infinite}
    @keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}
    .tc-title{font-family:'Orbitron',monospace;font-size:1.05rem;font-weight:700;color:#fff;margin-bottom:.3rem}
    .tc-company{margin-bottom:1.1rem}
    .tc-comp-name{color:#00f5d4;font-size:.9rem;font-weight:600}
    .tc-loc{color:#475569;font-size:.85rem}
    .tc-highlights{display:flex;flex-direction:column;gap:.45rem}
    .tc-h-item{display:flex;gap:.6rem;font-size:.85rem;color:#64748b;line-height:1.65}
    .tc-arrow{color:#7c3aed;flex-shrink:0;margin-top:.1rem}
    @media(max-width:768px){.page{padding:4rem 1.5rem 3rem}.tl-item{flex-direction:column;gap:.75rem}.tl-left{flex-direction:row}.tl-line{width:40px;height:1px;min-height:0;margin:0 0 0 4px}.tl-intro{flex-wrap:wrap}}
  `]
})
export class ExperienceComponent implements OnInit {
  experiences: Experience[] = [];
  stats = [
    { val: '2', label: 'INTERNSHIPS' },
    { val: '9+', label: 'MONTHS EXP' },
    { val: '500K+', label: 'RECORDS ETL\'d' },
    { val: '30%', label: 'EFFICIENCY GAIN' },
  ];
  constructor(private svc: PortfolioService) {}
  ngOnInit() { this.svc.getExperiences().subscribe(e => this.experiences = e); }
}
