import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';
import { Certification } from '../../models';
@Component({
  selector: 'app-certifications', standalone: true, imports: [CommonModule],
  template: `
    <div class="page">
      <div class="grid-cross"></div>
      <div class="sec-header">
        <div class="sec-eyebrow">// 05. VERIFIED CREDENTIALS</div>
        <h1 class="sec-title">Certifi<span>cations</span></h1>
        <div class="sec-line"></div>
      </div>
      <div class="cert-grid">
        <div class="cert-card" *ngFor="let c of certs; let i=index" [style.animation-delay]="(i*0.1)+'s'">
          <div class="cc-cross tl"></div><div class="cc-cross tr"></div><div class="cc-cross bl"></div><div class="cc-cross br"></div>
          <div class="cc-top">
            <div class="cc-icon">{{ c.icon || '🏆' }}</div>
            <div class="cc-badge">CERTIFIED</div>
          </div>
          <div class="cc-issuer">{{ c.issuer }}</div>
          <div class="cc-name">{{ c.name }}</div>
          <div class="cc-footer">
            <span class="cc-date" *ngIf="c.issueDate">{{ c.issueDate | date:'MMM yyyy' }}</span>
            <a [href]="c.credentialUrl || '#'" target="_blank" class="cc-verify" *ngIf="c.credentialUrl">VERIFY →</a>
          </div>
          <div class="cc-glow"></div>
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
    .cert-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:1.5rem; position:relative; z-index:1; }
    .cert-card { background:rgba(6,13,26,.85); border:1px solid rgba(0,245,212,.12); padding:2rem; position:relative; overflow:hidden; animation:fadeUp .5s ease forwards; opacity:0; transition:transform .3s,border-color .3s,box-shadow .3s; }
    .cert-card:hover { transform:translateY(-5px); border-color:rgba(0,245,212,.3); box-shadow:0 16px 50px rgba(0,0,0,.5),0 0 30px rgba(0,245,212,.07); }
    @keyframes fadeUp { to{opacity:1;transform:translateY(0)} from{opacity:0;transform:translateY(16px)} }
    .cc-cross { position:absolute; width:8px; height:8px; }
    .cc-cross::before,.cc-cross::after { content:''; position:absolute; background:rgba(0,245,212,.25); }
    .cc-cross::before{width:100%;height:1px;top:50%}.cc-cross::after{width:1px;height:100%;left:50%;top:0}
    .tl{top:6px;left:6px}.tr{top:6px;right:6px}.bl{bottom:6px;left:6px}.br{bottom:6px;right:6px}
    .cc-top { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:1.25rem; }
    .cc-icon { font-size:2.2rem; }
    .cc-badge { font-family:'Space Mono',monospace; font-size:.55rem; letter-spacing:2px; color:#10b981; border:1px solid rgba(16,185,129,.3); padding:.2rem .5rem; background:rgba(16,185,129,.05); }
    .cc-issuer { font-family:'Space Mono',monospace; font-size:.65rem; letter-spacing:2px; color:#f59e0b; margin-bottom:.4rem; }
    .cc-name { font-size:.92rem; color:#fff; font-weight:600; line-height:1.4; margin-bottom:1.25rem; }
    .cc-footer { display:flex; justify-content:space-between; align-items:center; border-top:1px solid rgba(255,255,255,.05); padding-top:.9rem; }
    .cc-date { font-family:'Space Mono',monospace; font-size:.65rem; color:#475569; }
    .cc-verify { font-family:'Space Mono',monospace; font-size:.62rem; color:#00f5d4; text-decoration:none; border:1px solid rgba(0,245,212,.2); padding:.2rem .6rem; transition:all .2s; }
    .cc-verify:hover { background:rgba(0,245,212,.08); }
    .cc-glow { position:absolute; bottom:0; left:0; right:0; height:1px; background:linear-gradient(90deg,transparent,rgba(0,245,212,.3),transparent); opacity:0; transition:opacity .3s; }
    .cert-card:hover .cc-glow { opacity:1; }
    @media(max-width:768px){.page{padding:4rem 1.5rem 3rem}}
  `]
})
export class CertificationsComponent implements OnInit {
  certs: Certification[] = [];
  constructor(private svc: PortfolioService) {}
  ngOnInit() { this.svc.getCertifications().subscribe(c => this.certs = c); }
}
