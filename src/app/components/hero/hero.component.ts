import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="hero-wrap">
      <canvas #canvas class="spider-canvas"></canvas>
      <div class="noise-overlay"></div>
      <div class="scanline"></div>
      <div class="scanline-2"></div>
      <div class="corner tl"><span class="c-h"></span><span class="c-v"></span><span class="c-dot"></span></div>
      <div class="corner tr"><span class="c-h"></span><span class="c-v"></span><span class="c-dot"></span></div>
      <div class="corner bl"><span class="c-h"></span><span class="c-v"></span><span class="c-dot"></span></div>
      <div class="corner br"><span class="c-h"></span><span class="c-v"></span><span class="c-dot"></span></div>
      <div class="vert-line left"></div>
      <div class="vert-line right"></div>
      <div class="bg-orb orb1"></div>
      <div class="bg-orb orb2"></div>
      <div class="bg-orb orb3"></div>
      <div class="hud-tl">
        <div class="hud-line">SYS::PORTFOLIO_v2.0</div>
        <div class="hud-line accent">STATUS::ONLINE</div>
      </div>
      <div class="hud-tr">
        <div class="hud-line">LOC::BHUBANESWAR_IND</div>
        <div class="hud-line accent">OPEN_TO::HIRE</div>
      </div>
      <div class="hero-content">
        <div class="status-bar">
          <span class="s-dot"></span>
          <span class="s-text">AVAILABLE FOR OPPORTUNITIES</span>
          <span class="s-sep">◆</span>
          <span class="s-loc">📍 BHUBANESWAR, INDIA</span>
          <span class="s-sep">◆</span>
          <span class="s-role">MCA 2025 · CGPA 9.77</span>
        </div>
        <div class="name-block">
          <div class="name-line1">
            <span class="bracket">&lt;</span>
            <span class="first-name">Swatik</span>
            <span class="bracket">/&gt;</span>
          </div>
          <div class="name-line2">BARIK</div>
          <div class="name-underline">
            <div class="ul-left"></div>
            <div class="ul-diamond">◆</div>
            <div class="ul-right"></div>
          </div>
        </div>
        <div class="role-line">
          <span class="role-prefix">&#47;&#47; </span>
          <span class="role-text">{{ typedText }}</span>
          <span class="cursor">█</span>
        </div>
        <p class="hero-desc">
          Building intelligent systems at the intersection of <span class="hl cyan">AI/ML</span>,
          <span class="hl violet">Data Engineering</span> &amp; <span class="hl amber">Full-Stack Java</span>.<br>
          Infosys Intern · AWS &amp; Google Certified · 5+ production-grade projects.
        </p>
        <div class="cta-row">
          <a routerLink="/projects" class="cta-primary">
            <span class="cta-glow"></span>
            <span class="cta-text">⚡ VIEW PROJECTS</span>
            <span class="cta-arrow">→</span>
          </a>
          <a routerLink="/resume" class="cta-resume">
            <span class="cta-text">📄 RESUME</span>
          </a>
          <a routerLink="/dashboard" class="cta-secondary">DASHBOARD</a>
          <a routerLink="/contact" class="cta-secondary">CONTACT</a>
        </div>
        <div class="stats-grid">
          <div class="stat-item" *ngFor="let s of stats">
            <div class="stat-val">{{ s.val }}</div>
            <div class="stat-label">{{ s.label }}</div>
            <div class="stat-bar"><div class="stat-bar-fill" [style.width]="s.pct"></div></div>
          </div>
        </div>
        <div class="social-row">
          <a href="mailto:2003swatikbarik@gmail.com" class="soc-link"><span class="soc-icon">✉</span> EMAIL</a>
          <span class="soc-sep">/</span>
          <a href="https://www.linkedin.com/in/swatik-barik-11666927a/" target="_blank" class="soc-link"><span class="soc-icon">in</span> LINKEDIN</a>
          <span class="soc-sep">/</span>
          <a href="https://github.com/swatik-cyber" target="_blank" class="soc-link"><span class="soc-icon">gh</span> GITHUB</a>
          <span class="soc-sep">/</span>
          <a href="tel:+917008930892" class="soc-link"><span class="soc-icon">☎</span> +91 70089 30892</a>
        </div>
      </div>
      <div class="scroll-hint">
        <span class="sh-text">SCROLL DOWN</span>
        <div class="sh-arrow"><div class="sha-line"></div><div class="sha-head">▼</div></div>
      </div>
    </div>
  `,
  styles: [`
    .hero-wrap { min-height:100vh; display:flex; align-items:center; justify-content:center; position:relative; background:#020408; overflow:hidden; }
    .spider-canvas { position:absolute; inset:0; width:100%; height:100%; opacity:.5; pointer-events:none; }
    .noise-overlay { position:absolute; inset:0; pointer-events:none; opacity:.025; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); background-size:200px; }
    .scanline { position:absolute; left:0; right:0; height:2px; z-index:1; pointer-events:none; background:linear-gradient(90deg,transparent,rgba(0,245,212,.08),transparent); animation:scanline 6s linear infinite; }
    .scanline-2 { position:absolute; left:0; right:0; height:1px; z-index:1; pointer-events:none; background:linear-gradient(90deg,transparent,rgba(124,58,237,.06),transparent); animation:scanline 11s linear infinite 3s; }
    @keyframes scanline { 0%{top:-2%}100%{top:102%} }
    .corner { position:absolute; width:36px; height:36px; }
    .corner.tl{top:28px;left:28px} .corner.tr{top:28px;right:28px} .corner.bl{bottom:28px;left:28px} .corner.br{bottom:28px;right:28px}
    .c-h { position:absolute; width:100%; height:1.5px; background:rgba(0,245,212,.75); top:50%; }
    .c-v { position:absolute; width:1.5px; height:100%; background:rgba(0,245,212,.75); left:50%; top:0; }
    .c-dot { position:absolute; width:5px; height:5px; background:#00f5d4; border-radius:50%; top:50%; left:50%; transform:translate(-50%,-50%); box-shadow:0 0 10px rgba(0,245,212,1); animation:pulseDot 2s infinite; }
    @keyframes pulseDot { 0%,100%{box-shadow:0 0 10px rgba(0,245,212,1)}50%{box-shadow:0 0 20px rgba(0,245,212,.5)} }
    .vert-line { position:absolute; top:0; bottom:0; width:1px; pointer-events:none; }
    .vert-line.left { left:80px; background:linear-gradient(180deg,transparent,rgba(0,245,212,.07) 25%,rgba(0,245,212,.07) 75%,transparent); }
    .vert-line.right { right:80px; background:linear-gradient(180deg,transparent,rgba(124,58,237,.07) 25%,rgba(124,58,237,.07) 75%,transparent); }
    .bg-orb { position:absolute; border-radius:50%; pointer-events:none; }
    .orb1 { width:700px; height:700px; top:-200px; left:-200px; background:radial-gradient(circle,rgba(0,245,212,.035) 0%,transparent 70%); }
    .orb2 { width:600px; height:600px; bottom:-150px; right:-150px; background:radial-gradient(circle,rgba(124,58,237,.04) 0%,transparent 70%); }
    .orb3 { width:400px; height:400px; top:40%; left:40%; background:radial-gradient(circle,rgba(245,158,11,.02) 0%,transparent 70%); }
    .hud-tl,.hud-tr { position:absolute; top:80px; font-family:'Space Mono',monospace; font-size:.58rem; letter-spacing:2px; z-index:2; pointer-events:none; }
    .hud-tl{left:80px} .hud-tr{right:80px;text-align:right}
    .hud-line{color:#1e293b;margin-bottom:.25rem} .hud-line.accent{color:rgba(0,245,212,.5)}
    .hero-content { position:relative; z-index:2; text-align:center; padding:2rem 1.5rem; max-width:950px; width:100%; }
    .status-bar { display:inline-flex; align-items:center; gap:.8rem; border:1px solid rgba(0,245,212,.2); padding:.4rem 1.6rem; font-family:'Space Mono',monospace; font-size:.62rem; letter-spacing:2px; color:#64748b; margin-bottom:3rem; background:rgba(0,245,212,.02); animation:glowBorder 3s infinite; }
    @keyframes glowBorder { 0%,100%{border-color:rgba(0,245,212,.2)}50%{border-color:rgba(0,245,212,.5);box-shadow:0 0 20px rgba(0,245,212,.07)} }
    .s-dot { width:7px; height:7px; border-radius:50%; background:#10b981; animation:pulse 1.5s infinite; box-shadow:0 0 8px rgba(16,185,129,.6); }
    @keyframes pulse { 0%,100%{opacity:1}50%{opacity:.3} }
    .s-text{color:#00f5d4;font-weight:700} .s-sep{color:#7c3aed;font-size:.5rem} .s-loc,.s-role{color:#64748b}
    .name-block { margin-bottom:2rem; }
    .name-line1 { font-family:'Orbitron',monospace; font-size:clamp(1.2rem,3vw,2rem); font-weight:400; color:#475569; letter-spacing:8px; display:flex; align-items:center; justify-content:center; gap:.6rem; margin-bottom:.4rem; }
    .bracket{color:#7c3aed;font-size:1.3em} .first-name{color:#fff}
    .name-line2 { font-family:'Orbitron',monospace; font-size:clamp(4.5rem,14vw,11rem); font-weight:900; color:transparent; line-height:.85; -webkit-text-stroke:2px rgba(0,245,212,.75); letter-spacing:10px; text-shadow:0 0 120px rgba(0,245,212,.1),0 0 40px rgba(0,245,212,.05); }
    .name-underline { display:flex; align-items:center; justify-content:center; gap:.6rem; margin-top:1rem; }
    .ul-left { height:1px; width:140px; background:linear-gradient(90deg,transparent,rgba(0,245,212,.5)); }
    .ul-right { height:1px; width:140px; background:linear-gradient(90deg,rgba(0,245,212,.5),transparent); }
    .ul-diamond { color:#00f5d4; font-size:.7rem; }
    .role-line { font-family:'Space Mono',monospace; font-size:clamp(.85rem,2vw,1.05rem); color:#64748b; margin-bottom:2rem; letter-spacing:1px; }
    .role-prefix{color:#7c3aed} .role-text{color:#f59e0b}
    .cursor { color:#00f5d4; animation:blink 1s infinite; }
    @keyframes blink { 0%,100%{opacity:1}50%{opacity:0} }
    .hero-desc { color:#64748b; font-family:'Space Mono',monospace; font-size:.85rem; line-height:2; max-width:600px; margin:0 auto 3rem; }
    .hl{font-weight:700} .hl.cyan{color:#00f5d4} .hl.violet{color:#a78bfa} .hl.amber{color:#f59e0b}
    .cta-row { display:flex; gap:1rem; justify-content:center; flex-wrap:wrap; margin-bottom:3.5rem; }
    .cta-primary { position:relative; display:inline-flex; align-items:center; gap:.6rem; background:#00f5d4; color:#020408; font-family:'Orbitron',monospace; font-size:.75rem; font-weight:900; letter-spacing:2px; padding:.95rem 2.4rem; clip-path:polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%); text-decoration:none; transition:all .25s; overflow:hidden; }
    .cta-primary:hover { box-shadow:0 0 50px rgba(0,245,212,.7),0 0 100px rgba(0,245,212,.2); transform:translateY(-3px) scale(1.02); }
    .cta-glow { position:absolute; inset:0; background:linear-gradient(90deg,#00f5d4,#7c3aed,#00f5d4); background-size:200%; animation:shimmer 3s linear infinite; opacity:0; transition:opacity .3s; }
    .cta-primary:hover .cta-glow { opacity:1; }
    .cta-text,.cta-arrow { position:relative; z-index:1; }
    .cta-resume { display:inline-flex; align-items:center; gap:.5rem; background:rgba(124,58,237,.12); border:1px solid rgba(124,58,237,.4); color:#a78bfa; font-family:'Orbitron',monospace; font-size:.72rem; letter-spacing:2px; padding:.95rem 2rem; text-decoration:none; clip-path:polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%); transition:all .25s; }
    .cta-resume:hover { border-color:#7c3aed; box-shadow:0 0 30px rgba(124,58,237,.3); transform:translateY(-3px); }
    .cta-secondary { display:inline-flex; align-items:center; border:1px solid rgba(0,245,212,.2); color:#00f5d4; font-family:'Orbitron',monospace; font-size:.7rem; letter-spacing:2px; padding:.95rem 1.8rem; text-decoration:none; clip-path:polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%); transition:all .25s; }
    .cta-secondary:hover { border-color:#00f5d4; background:rgba(0,245,212,.07); transform:translateY(-3px); }
    @keyframes shimmer { 0%{background-position:0%}100%{background-position:200%} }
    .stats-grid { display:flex; justify-content:center; flex-wrap:wrap; margin-bottom:3rem; border-top:1px solid rgba(255,255,255,.04); border-bottom:1px solid rgba(255,255,255,.04); }
    .stat-item { text-align:center; flex:1; min-width:90px; padding:1.5rem .5rem; border-right:1px solid rgba(255,255,255,.04); }
    .stat-item:last-child{border-right:none}
    .stat-val { font-family:'Orbitron',monospace; font-size:2rem; font-weight:900; color:#00f5d4; line-height:1; text-shadow:0 0 30px rgba(0,245,212,.5); }
    .stat-label { font-family:'Space Mono',monospace; font-size:.52rem; letter-spacing:2px; color:#475569; margin-top:.3rem; margin-bottom:.6rem; }
    .stat-bar { width:60%; height:2px; background:rgba(255,255,255,.06); margin:0 auto; }
    .stat-bar-fill { height:100%; background:linear-gradient(90deg,#00f5d4,#7c3aed); }
    .social-row { display:flex; align-items:center; gap:.75rem; justify-content:center; flex-wrap:wrap; }
    .soc-link { display:flex; align-items:center; gap:.4rem; font-family:'Space Mono',monospace; font-size:.65rem; letter-spacing:1px; color:#475569; text-decoration:none; transition:color .2s; }
    .soc-link:hover{color:#00f5d4}
    .soc-icon { width:24px; height:24px; border:1px solid rgba(0,245,212,.15); display:flex; align-items:center; justify-content:center; font-size:.6rem; color:#00f5d4; border-radius:2px; transition:all .2s; }
    .soc-link:hover .soc-icon{border-color:#00f5d4;box-shadow:0 0 8px rgba(0,245,212,.3)}
    .soc-sep{color:#1e293b;font-family:'Space Mono',monospace}
    .scroll-hint { position:absolute; bottom:2.5rem; left:50%; transform:translateX(-50%); display:flex; flex-direction:column; align-items:center; gap:.5rem; font-family:'Space Mono',monospace; font-size:.55rem; letter-spacing:3px; color:#1e293b; animation:fadeUpHint 1.5s ease 1.5s forwards; opacity:0; }
    .sh-arrow{display:flex;flex-direction:column;align-items:center}
    .sha-line{width:1px;height:28px;background:linear-gradient(180deg,rgba(0,245,212,.3),transparent)}
    .sha-head{color:#1e293b;font-size:.5rem;animation:bounce 2s infinite}
    @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(4px)}}
    @keyframes fadeUpHint{to{opacity:1;transform:translateX(-50%) translateY(0)}from{opacity:0;transform:translateX(-50%) translateY(8px)}}
    @media(max-width:768px){.stat-item{min-width:45%;border-right:1px solid rgba(255,255,255,.04)}.name-line2{-webkit-text-stroke:1.5px rgba(0,245,212,.6)}.hud-tl,.hud-tr,.vert-line{display:none}}
  `]
})
export class HeroComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  typedText = '';
  stats = [
    { val:'9.77', label:'MCA CGPA', pct:'98%' },
    { val:'2', label:'Internships', pct:'70%' },
    { val:'5+', label:'Projects', pct:'80%' },
    { val:'3', label:'Certifications', pct:'75%' },
    { val:'17+', label:'Tech Skills', pct:'85%' },
    { val:'500K+', label:'Records ETL\'d', pct:'90%' },
  ];
  private phrases = ['Full Stack Java Developer','AI / ML Engineer','Data Engineer','Spring Boot Expert','Angular Developer','Python & ETL Specialist'];
  private pi=0; private ci=0; private del=false;
  private timer:any; private af:any;
  ngOnInit() { this.typeLoop(); }
  ngAfterViewInit() { this.initSpider(); }
  ngOnDestroy() { clearTimeout(this.timer); cancelAnimationFrame(this.af); }
  typeLoop() {
    const cur = this.phrases[this.pi];
    if (!this.del) {
      this.typedText = cur.slice(0,++this.ci);
      if (this.ci===cur.length) { this.del=true; this.timer=setTimeout(()=>this.typeLoop(),2200); return; }
    } else {
      this.typedText = cur.slice(0,--this.ci);
      if (this.ci===0) { this.del=false; this.pi=(this.pi+1)%this.phrases.length; }
    }
    this.timer = setTimeout(()=>this.typeLoop(), this.del?45:80);
  }
  initSpider() {
    const cv = this.canvasRef.nativeElement;
    const ctx = cv.getContext('2d')!;
    let W=cv.width=cv.offsetWidth, H=cv.height=cv.offsetHeight;
    const mouse={x:-999,y:-999};
    const N=150;
    const nodes=Array.from({length:N},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4,r:Math.random()*1.8+.5}));
    window.addEventListener('mousemove',e=>{mouse.x=e.clientX;mouse.y=e.clientY;});
    window.addEventListener('resize',()=>{W=cv.width=cv.offsetWidth;H=cv.height=cv.offsetHeight;});
    const draw=()=>{
      ctx.clearRect(0,0,W,H);
      for(let i=0;i<N;i++){
        const n=nodes[i];
        for(let j=i+1;j<N;j++){const o=nodes[j],dx=n.x-o.x,dy=n.y-o.y,d=Math.sqrt(dx*dx+dy*dy);if(d<140){ctx.beginPath();ctx.strokeStyle=`rgba(0,245,212,${(1-d/140)*.5})`;ctx.lineWidth=.6;ctx.moveTo(n.x,n.y);ctx.lineTo(o.x,o.y);ctx.stroke();}}
        const mx=n.x-mouse.x,my=n.y-mouse.y,md=Math.sqrt(mx*mx+my*my);
        if(md<220){ctx.beginPath();ctx.strokeStyle=`rgba(124,58,237,${(1-md/220)*.8})`;ctx.lineWidth=1;ctx.moveTo(n.x,n.y);ctx.lineTo(mouse.x,mouse.y);ctx.stroke();}
        ctx.beginPath();ctx.arc(n.x,n.y,n.r,0,Math.PI*2);ctx.fillStyle=md<220?'rgba(124,58,237,.9)':'rgba(0,245,212,.8)';ctx.fill();
        n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>W)n.vx*=-1;if(n.y<0||n.y>H)n.vy*=-1;
      }
      this.af=requestAnimationFrame(draw);
    };
    draw();
  }
}
