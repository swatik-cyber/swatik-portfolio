import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortfolioService } from '../../services/portfolio.service';
@Component({
  selector: 'app-contact', standalone: true, imports: [CommonModule, FormsModule],
  template: `
    <div class="page">
      <div class="grid-cross"></div>
      <div class="sec-header">
        <div class="sec-eyebrow">// 06. GET IN TOUCH</div>
        <h1 class="sec-title">Contact <span>Me</span></h1>
        <div class="sec-line"></div>
      </div>
      <div class="contact-wrap">
        <!-- Info panel -->
        <div class="info-panel">
          <div class="ip-title">Open to Opportunities</div>
          <p class="ip-desc">AI/ML Engineering · Data Engineering · Full-Stack Development. Let's build something intelligent.</p>
          <div class="info-cards">
            <a [href]="c.href" target="_blank" class="ic-item" *ngFor="let c of contacts">
              <div class="ic-icon" [style.color]="c.color">{{ c.icon }}</div>
              <div>
                <div class="ic-label">{{ c.label }}</div>
                <div class="ic-val">{{ c.val }}</div>
              </div>
              <span class="ic-arrow">→</span>
            </a>
          </div>
        </div>

        <!-- Form panel -->
        <div class="form-panel">
          <div class="fp-cross tl"></div><div class="fp-cross tr"></div>
          <div class="fp-cross bl"></div><div class="fp-cross br"></div>
          <div class="fp-glow-top"></div>

          <div class="fp-title">// SEND A MESSAGE</div>
          <form (ngSubmit)="send()" class="contact-form">
            <div class="form-row">
              <div class="field">
                <label>YOUR NAME</label>
                <input [(ngModel)]="form.senderName" name="name" required placeholder="Swatik Barik" [class.filled]="form.senderName"/>
              </div>
              <div class="field">
                <label>EMAIL ADDRESS</label>
                <input type="email" [(ngModel)]="form.senderEmail" name="email" required placeholder="you@example.com" [class.filled]="form.senderEmail"/>
              </div>
            </div>
            <div class="field">
              <label>SUBJECT</label>
              <input [(ngModel)]="form.subject" name="subject" required placeholder="Job Opportunity / Collaboration / Project" [class.filled]="form.subject"/>
            </div>
            <div class="field">
              <label>MESSAGE</label>
              <textarea [(ngModel)]="form.message" name="message" required rows="6" placeholder="Tell me about the opportunity or project..." [class.filled]="form.message"></textarea>
            </div>
            <div class="form-footer">
              <button type="submit" class="btn-send" [disabled]="loading" [class.loading]="loading">
                <span class="bs-bg"></span>
                <span class="bs-text">{{ loading ? 'TRANSMITTING...' : 'SEND MESSAGE →' }}</span>
              </button>
              <div class="form-status success" *ngIf="success">
                <span>✓</span> MESSAGE SENT SUCCESSFULLY
              </div>
              <div class="form-status error" *ngIf="error">
                <span>✕</span> FAILED — PLEASE TRY AGAIN
              </div>
            </div>
          </form>
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
    .contact-wrap { display:grid; grid-template-columns:1fr 2fr; gap:2.5rem; position:relative; z-index:1; }
    @media(max-width:900px){.contact-wrap{grid-template-columns:1fr}}
    /* Info panel */
    .info-panel { }
    .ip-title { font-family:'Orbitron',monospace; font-size:.85rem; font-weight:700; color:#fff; margin-bottom:.75rem; }
    .ip-desc { color:#475569; font-size:.88rem; line-height:1.8; margin-bottom:1.75rem; }
    .info-cards { display:flex; flex-direction:column; gap:.75rem; }
    .ic-item { display:flex; align-items:center; gap:.9rem; background:rgba(6,13,26,.8); border:1px solid rgba(0,245,212,.08); padding:1rem 1.1rem; text-decoration:none; transition:all .2s; position:relative; }
    .ic-item:hover { border-color:rgba(0,245,212,.25); background:rgba(0,245,212,.03); }
    .ic-icon { font-size:1.2rem; flex-shrink:0; }
    .ic-label { font-family:'Space Mono',monospace; font-size:.58rem; letter-spacing:2px; color:#1e293b; }
    .ic-val { font-size:.85rem; color:#94a3b8; margin-top:.1rem; }
    .ic-arrow { position:absolute; right:1rem; font-family:'Space Mono',monospace; font-size:.7rem; color:#1e293b; transition:all .2s; }
    .ic-item:hover .ic-arrow { color:#00f5d4; transform:translateX(3px); }
    /* Form panel */
    .form-panel { background:rgba(6,13,26,.85); border:1px solid rgba(0,245,212,.12); padding:2.25rem; position:relative; overflow:hidden; }
    .fp-glow-top { position:absolute; top:0; left:0; right:0; height:1.5px; background:linear-gradient(90deg,transparent,#00f5d4,#7c3aed,transparent); }
    .fp-cross { position:absolute; width:9px; height:9px; }
    .fp-cross::before,.fp-cross::after { content:''; position:absolute; background:rgba(0,245,212,.3); }
    .fp-cross::before{width:100%;height:1px;top:50%}.fp-cross::after{width:1px;height:100%;left:50%;top:0}
    .fp-cross.tl{top:8px;left:8px}.fp-cross.tr{top:8px;right:8px}.fp-cross.bl{bottom:8px;left:8px}.fp-cross.br{bottom:8px;right:8px}
    .fp-title { font-family:'Orbitron',monospace; font-size:.65rem; letter-spacing:2px; color:#00f5d4; margin-bottom:1.75rem; }
    .contact-form { display:flex; flex-direction:column; gap:1.25rem; }
    .form-row { display:grid; grid-template-columns:1fr 1fr; gap:1.25rem; }
    @media(max-width:600px){.form-row{grid-template-columns:1fr}}
    .field { display:flex; flex-direction:column; gap:.4rem; }
    label { font-family:'Space Mono',monospace; font-size:.58rem; letter-spacing:2px; color:#1e293b; transition:color .2s; }
    .field:focus-within label { color:#00f5d4; }
    input, textarea {
      background:rgba(0,0,0,.4); border:1px solid rgba(255,255,255,.06);
      color:#e2e8f0; padding:.75rem 1rem;
      font-family:'Rajdhani',sans-serif; font-size:.95rem;
      outline:none; transition:all .2s; resize:vertical;
      border-radius:1px;
    }
    input:focus, textarea:focus { border-color:rgba(0,245,212,.4); background:rgba(0,245,212,.02); box-shadow:0 0 0 1px rgba(0,245,212,.1) inset; }
    input.filled, textarea.filled { border-color:rgba(0,245,212,.2); }
    input::placeholder, textarea::placeholder { color:#1e293b; }
    .form-footer { display:flex; flex-direction:column; gap:.9rem; }
    .btn-send {
      position:relative; overflow:hidden;
      background:#00f5d4; color:#020408;
      border:none; padding:.9rem 2.5rem;
      font-family:'Orbitron',monospace; font-size:.72rem; font-weight:700; letter-spacing:2px;
      cursor:pointer;
      clip-path:polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%);
      transition:all .2s; align-self:flex-start;
    }
    .btn-send:hover:not(:disabled) { box-shadow:0 0 30px rgba(0,245,212,.4); transform:translateY(-2px); }
    .btn-send:disabled { opacity:.5; cursor:not-allowed; }
    .bs-bg { position:absolute; inset:0; background:linear-gradient(90deg,#00f5d4,#7c3aed); opacity:0; transition:opacity .3s; }
    .btn-send:hover .bs-bg { opacity:1; }
    .bs-text { position:relative; z-index:1; }
    .btn-send.loading .bs-bg { opacity:.5; }
    .form-status { font-family:'Space Mono',monospace; font-size:.7rem; display:flex; align-items:center; gap:.5rem; }
    .form-status.success { color:#10b981; }
    .form-status.error { color:#ef4444; }
    @media(max-width:768px){.page{padding:4rem 1.5rem 3rem}}
  `]
})
export class ContactComponent {
  form = { senderName:'', senderEmail:'', subject:'', message:'' };
  loading = false; success = false; error = false;
  contacts = [
    { icon:'✉', label:'EMAIL', val:'2003swatikbarik@gmail.com', href:'mailto:2003swatikbarik@gmail.com', color:'#00f5d4' },
    { icon:'☎', label:'PHONE', val:'+91 70089 30892', href:'tel:+917008930892', color:'#7c3aed' },
    { icon:'in', label:'LINKEDIN', val:'swatik-barik', href:'https://linkedin.com/in/swatik-barik', color:'#3b82f6' },
    { icon:'⌥', label:'GITHUB', val:'swatik-cyber', href:'https://github.com/swatik-cyber', color:'#f59e0b' },
    { icon:'◎', label:'LOCATION', val:'Bhubaneswar, Odisha, India', href:'#', color:'#ec4899' },
  ];
  constructor(private svc: PortfolioService) {}
  send() {
    this.loading = true; this.success = false; this.error = false;
    this.svc.sendContact(this.form).subscribe({
      next: () => { this.success = true; this.loading = false; this.form = { senderName:'', senderEmail:'', subject:'', message:'' }; },
      error: () => { this.error = true; this.loading = false; }
    });
  }
}
