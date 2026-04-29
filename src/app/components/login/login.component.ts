import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="login-bg">
      <canvas id="lc"></canvas>
      <div class="login-card">
        <div class="login-header">
          <div class="logo">S<span>.</span>B</div>
          <h1>PORTFOLIO LOGIN</h1>
          <p>Access Dashboard & Admin Panel</p>
        </div>
        <form (ngSubmit)="login()" #f="ngForm" class="login-form">
          <div class="field">
            <label>USERNAME</label>
            <input type="text" [(ngModel)]="username" name="username" required placeholder="swatik" autocomplete="username"/>
          </div>
          <div class="field">
            <label>PASSWORD</label>
            <input [type]="showPwd ? 'text':'password'" [(ngModel)]="password" name="password" required placeholder="••••••••" autocomplete="current-password"/>
            <button type="button" class="eye-btn" (click)="showPwd=!showPwd">{{ showPwd ? '🙈':'👁' }}</button>
          </div>
          <div class="error" *ngIf="error">{{ error }}</div>
          <button type="submit" class="btn-submit" [disabled]="loading">
            <span *ngIf="!loading">ACCESS SYSTEM →</span>
            <span *ngIf="loading">AUTHENTICATING...</span>
          </button>
        </form>
        <div class="demo-creds">
          <div class="dc-title">Demo Credentials</div>
          <div class="dc-row" *ngFor="let c of demos" (click)="fillCred(c)">
            <span class="dc-role">{{ c.role }}</span>
            <span class="dc-user">{{ c.user }}</span>
            <span class="dc-pwd">{{ c.pwd }}</span>
          </div>
        </div>
        <a routerLink="/" class="back-link">← Back to Portfolio</a>
      </div>
    </div>
  `,
  styles: [`
    .login-bg {
      min-height:100vh; display:flex; align-items:center; justify-content:center;
      background:#030712; position:relative; overflow:hidden;
    }
    canvas { position:absolute; top:0; left:0; width:100%; height:100%; opacity:0.3; }
    .login-card {
      background:rgba(10,15,30,0.9); border:1px solid rgba(0,245,212,0.2);
      border-radius:4px; padding:3rem; width:100%; max-width:480px;
      position:relative; z-index:1;
      box-shadow: 0 0 60px rgba(0,245,212,0.1);
    }
    .login-header { text-align:center; margin-bottom:2rem; }
    .logo { font-family:'Orbitron',monospace; font-size:2.5rem; font-weight:900; color:#00f5d4; }
    .logo span { color:#7c3aed; }
    h1 { font-family:'Orbitron',monospace; font-size:0.9rem; letter-spacing:3px; color:#e2e8f0; margin-top:0.5rem; }
    p { color:#64748b; font-size:0.8rem; margin-top:0.25rem; font-family:'Space Mono',monospace; }
    .login-form { display:flex; flex-direction:column; gap:1.25rem; margin-bottom:2rem; }
    .field { position:relative; }
    label { display:block; font-family:'Space Mono',monospace; font-size:0.65rem; letter-spacing:2px; color:#64748b; margin-bottom:0.4rem; }
    input {
      width:100%; background:rgba(255,255,255,0.03); border:1px solid rgba(0,245,212,0.15);
      color:#e2e8f0; padding:0.75rem 1rem; font-family:'Space Mono',monospace;
      font-size:0.85rem; outline:none; transition:border-color 0.2s;
    }
    input:focus { border-color:#00f5d4; }
    .eye-btn { position:absolute; right:0.75rem; bottom:0.75rem; background:none; border:none; cursor:pointer; font-size:1rem; }
    .btn-submit {
      background:#00f5d4; color:#030712; border:none; padding:0.9rem;
      font-family:'Orbitron',monospace; font-size:0.75rem; letter-spacing:2px; font-weight:700;
      cursor:pointer; transition:all 0.2s; clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%);
    }
    .btn-submit:hover:not(:disabled) { box-shadow:0 0 20px rgba(0,245,212,0.4); }
    .btn-submit:disabled { opacity:0.6; cursor:not-allowed; }
    .error { color:#f87171; font-family:'Space Mono',monospace; font-size:0.75rem; text-align:center; }
    .demo-creds { border-top:1px solid rgba(0,245,212,0.1); padding-top:1.5rem; }
    .dc-title { font-family:'Space Mono',monospace; font-size:0.65rem; color:#64748b; letter-spacing:2px; margin-bottom:0.75rem; }
    .dc-row {
      display:flex; gap:1rem; align-items:center; padding:0.5rem;
      cursor:pointer; transition:background 0.2s; font-size:0.8rem;
    }
    .dc-row:hover { background:rgba(0,245,212,0.05); }
    .dc-role { font-family:'Space Mono',monospace; font-size:0.65rem; color:#7c3aed; border:1px solid rgba(124,58,237,0.3); padding:0.1rem 0.4rem; }
    .dc-user { color:#00f5d4; }
    .dc-pwd { color:#64748b; font-family:'Space Mono',monospace; font-size:0.75rem; }
    .back-link { display:block; text-align:center; margin-top:1.5rem; color:#64748b; font-family:'Space Mono',monospace; font-size:0.75rem; text-decoration:none; }
    .back-link:hover { color:#00f5d4; }
  `]
})
export class LoginComponent {
  username = '';
  password = '';
  loading = false;
  error = '';
  showPwd = false;

  demos = [
    { role: 'ADMIN', user: 'swatik', pwd: 'Admin@123' },
    { role: 'MANAGER', user: 'hr_manager', pwd: 'Manager@123' },
    { role: 'VIEWER', user: 'guest', pwd: 'Guest@123' }
  ];

  constructor(private auth: AuthService, private router: Router) {}

  fillCred(c: any) { this.username = c.user; this.password = c.pwd; }

  login() {
    if (!this.username || !this.password) return;
    this.loading = true; this.error = '';
    this.auth.login({ username: this.username, password: this.password }).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (e) => {
        this.error = e.error?.message || 'Invalid credentials';
        this.loading = false;
      }
    });
  }
}
