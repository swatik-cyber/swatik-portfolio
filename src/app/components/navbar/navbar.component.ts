import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav [class.scrolled]="scrolled">
      <div class="nav-inner">
        <div class="nav-logo" routerLink="/">
          <span class="logo-bracket">[</span>SB<span class="logo-bracket">]</span>
          <span class="logo-pulse"></span>
        </div>
        <ul class="nav-links">
          <li *ngFor="let l of links">
            <a [routerLink]="l.path" routerLinkActive="active" [routerLinkActiveOptions]="{exact:l.exact||false}">
              <span class="link-num">{{ l.num }}</span>{{ l.label }}
            </a>
          </li>
          <li><a routerLink="/resume" routerLinkActive="active"><span class="link-num">07</span>Resume</a></li>
          <li *ngIf="auth.isLoggedIn()"><a routerLink="/dashboard" routerLinkActive="active"><span class="link-num">08</span>Dashboard</a></li>
          <li *ngIf="auth.isAdmin()"><a routerLink="/admin" routerLinkActive="active"><span class="link-num">09</span>Admin</a></li>
        </ul>
        <div class="nav-right">
          <div *ngIf="auth.isLoggedIn(); else loginBtn" class="user-pill" (click)="logout()">
            <div class="u-avatar">{{ auth.currentUser?.avatarInitials }}</div>
            <span class="u-name">{{ auth.currentUser?.username }}</span>
            <span class="u-role">{{ auth.currentUser?.role }}</span>
            <span class="u-exit">⏏</span>
          </div>
          <ng-template #loginBtn>
            <a routerLink="/login" class="btn-login">
              <span class="btn-br tl"></span><span class="btn-br tr"></span>
              LOGIN
              <span class="btn-br bl"></span><span class="btn-br br"></span>
            </a>
          </ng-template>
        </div>
        <button class="hamburger" (click)="menuOpen=!menuOpen" [class.open]="menuOpen">
          <span></span><span></span><span></span>
        </button>
      </div>
      <div class="mobile-menu" [class.open]="menuOpen">
        <a *ngFor="let l of links" [routerLink]="l.path" (click)="menuOpen=false">{{ l.label }}</a>
        <a routerLink="/resume" (click)="menuOpen=false">Resume</a>
        <a *ngIf="auth.isLoggedIn()" routerLink="/dashboard" (click)="menuOpen=false">Dashboard</a>
        <a *ngIf="auth.isAdmin()" routerLink="/admin" (click)="menuOpen=false">Admin</a>
        <a *ngIf="auth.isLoggedIn()" (click)="logout();menuOpen=false" class="logout-link">Logout</a>
        <a *ngIf="!auth.isLoggedIn()" routerLink="/login" (click)="menuOpen=false">Login</a>
      </div>
    </nav>
  `,
  styles: [`
    nav { position:fixed; top:0; left:0; right:0; z-index:500; transition:all .3s; }
    .nav-inner { display:flex; align-items:center; justify-content:space-between; padding:.9rem 3rem; background:rgba(2,4,8,0.65); backdrop-filter:blur(24px); border-bottom:1px solid rgba(0,245,212,0.07); transition:all .3s; }
    nav.scrolled .nav-inner { padding:.65rem 3rem; background:rgba(2,4,8,0.96); border-bottom-color:rgba(0,245,212,0.14); box-shadow:0 8px 40px rgba(0,0,0,.7); }
    .nav-logo { font-family:'Orbitron',monospace; font-weight:900; font-size:1.3rem; color:#fff; cursor:pointer; letter-spacing:2px; display:flex; align-items:center; gap:4px; }
    .logo-bracket { color:#00f5d4; }
    .logo-pulse { width:6px; height:6px; border-radius:50%; background:#00f5d4; margin-left:4px; animation:pulse 1.5s infinite; box-shadow:0 0 6px rgba(0,245,212,.7); }
    @keyframes pulse { 0%,100%{opacity:1}50%{opacity:.2} }
    .nav-links { display:flex; gap:.1rem; list-style:none; margin:0; padding:0; }
    .nav-links a { display:flex; align-items:center; gap:.35rem; color:#475569; text-decoration:none; font-family:'Space Mono',monospace; font-size:.62rem; letter-spacing:1.5px; padding:.4rem .7rem; transition:all .2s; text-transform:uppercase; position:relative; }
    .nav-links a::after { content:''; position:absolute; bottom:-1px; left:0; right:0; height:1px; background:#00f5d4; transform:scaleX(0); transition:transform .2s; }
    .nav-links a:hover, .nav-links a.active { color:#00f5d4; }
    .nav-links a:hover::after, .nav-links a.active::after { transform:scaleX(1); }
    .link-num { font-size:.52rem; color:#7c3aed; opacity:.6; }
    .user-pill { display:flex; align-items:center; gap:.5rem; cursor:pointer; background:rgba(0,245,212,.05); border:1px solid rgba(0,245,212,.15); padding:.3rem .8rem .3rem .4rem; border-radius:20px; transition:all .2s; }
    .user-pill:hover { border-color:rgba(0,245,212,.4); box-shadow:0 0 16px rgba(0,245,212,.15); }
    .u-avatar { width:26px; height:26px; border-radius:50%; background:linear-gradient(135deg,#7c3aed,#00f5d4); display:flex; align-items:center; justify-content:center; font-family:'Orbitron',monospace; font-size:.55rem; font-weight:900; color:#fff; }
    .u-name { font-size:.75rem; color:#e2e8f0; }
    .u-role { font-size:.6rem; color:#00f5d4; font-family:'Space Mono',monospace; background:rgba(0,245,212,.1); padding:.1rem .35rem; }
    .u-exit { font-size:.7rem; color:#475569; }
    .btn-login { position:relative; font-family:'Orbitron',monospace; font-size:.65rem; letter-spacing:2px; color:#00f5d4; padding:.45rem 1.2rem; text-decoration:none; transition:all .2s; }
    .btn-login:hover { background:rgba(0,245,212,.06); }
    .btn-br { position:absolute; width:5px; height:5px; border-color:rgba(0,245,212,.6); border-style:solid; transition:all .2s; }
    .btn-br.tl{top:0;left:0;border-width:1px 0 0 1px} .btn-br.tr{top:0;right:0;border-width:1px 1px 0 0}
    .btn-br.bl{bottom:0;left:0;border-width:0 0 1px 1px} .btn-br.br{bottom:0;right:0;border-width:0 1px 1px 0}
    .btn-login:hover .btn-br { width:8px; height:8px; border-color:#00f5d4; }
    .hamburger { display:none; background:none; border:none; cursor:pointer; flex-direction:column; gap:4px; padding:4px; }
    .hamburger span { display:block; width:22px; height:1.5px; background:#00f5d4; transition:all .3s; }
    .hamburger.open span:nth-child(1){transform:translateY(5.5px) rotate(45deg)} .hamburger.open span:nth-child(2){opacity:0} .hamburger.open span:nth-child(3){transform:translateY(-5.5px) rotate(-45deg)}
    .mobile-menu { display:none; flex-direction:column; gap:.5rem; background:rgba(2,4,8,0.98); border-top:1px solid rgba(0,245,212,.1); padding:1rem 1.5rem; max-height:0; overflow:hidden; transition:max-height .3s; }
    .mobile-menu.open{max-height:500px}
    .mobile-menu a { color:#94a3b8; font-family:'Space Mono',monospace; font-size:.75rem; padding:.5rem 0; border-bottom:1px solid rgba(255,255,255,.03); text-decoration:none; }
    .mobile-menu a:hover{color:#00f5d4} .logout-link{color:#ef4444!important;cursor:pointer}
    @media(max-width:1000px){.nav-links,.nav-right{display:none} .hamburger{display:flex} .mobile-menu{display:flex} .nav-inner{padding:.9rem 1.5rem}}
  `]
})
export class NavbarComponent {
  scrolled = false;
  menuOpen = false;
  links = [
    { path:'/', label:'Home', num:'01', exact:true },
    { path:'/projects', label:'Projects', num:'02' },
    { path:'/skills', label:'Skills', num:'03' },
    { path:'/experience', label:'Experience', num:'04' },
    { path:'/certifications', label:'Certs', num:'05' },
    { path:'/contact', label:'Contact', num:'06' },
  ];
  constructor(public auth: AuthService, private router: Router) {}
  @HostListener('window:scroll') onScroll() { this.scrolled = window.scrollY > 40; }
  logout() { this.auth.logout(); this.router.navigate(['/']); }
}
