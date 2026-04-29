import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortfolioService } from '../../services/portfolio.service';
import { AuthService } from '../../services/auth.service';
import { User, Project, ContactMessage } from '../../models';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin">
      <div class="admin-header">
        <h1>ADMIN <span>PANEL</span></h1>
        <p class="sub">// SECURE ROLE-BASED MANAGEMENT · LOGGED IN AS {{ auth.currentUser?.username?.toUpperCase() }}</p>
      </div>

      <!-- Tab nav -->
      <div class="tabs">
        <button *ngFor="let t of tabs" (click)="activeTab=t.key" [class.active]="activeTab===t.key" class="tab-btn">{{ t.label }}</button>
      </div>

      <!-- USERS TAB -->
      <div *ngIf="activeTab==='users'">
        <div class="section-bar"><span class="ct">// USER MANAGEMENT</span><span class="badge">{{ users.length }} users</span></div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>ID</th><th>Name</th><th>Username</th><th>Email</th><th>Department</th><th>Role</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              <tr *ngFor="let u of users">
                <td class="muted">{{ u.id }}</td>
                <td>
                  <div class="u-row">
                    <div class="av" [style.background]="getAvatarBg(u.role)">{{ u.avatarInitials }}</div>
                    {{ u.fullName }}
                  </div>
                </td>
                <td class="mono">{{ u.username }}</td>
                <td class="muted mono small">{{ u.email }}</td>
                <td class="muted">{{ u.department }}</td>
                <td>
                  <select *ngIf="editingUser===u.id" [(ngModel)]="u.role" (change)="updateRole(u)" class="role-select">
                    <option *ngFor="let r of roles">{{ r }}</option>
                  </select>
                  <span *ngIf="editingUser!==u.id" class="role-badge" [class]="'r-'+u.role.toLowerCase()">{{ u.role }}</span>
                </td>
                <td><span class="status-dot" [class]="'s-'+u.status.toLowerCase()"></span>{{ u.status }}</td>
                <td>
                  <button class="act-btn edit" (click)="editingUser=editingUser===u.id?null:u.id">{{ editingUser===u.id ? 'Save':'Edit' }}</button>
                  <button class="act-btn del" (click)="deleteUser(u.id)" *ngIf="u.username!=='swatik'">Del</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- PROJECTS TAB -->
      <div *ngIf="activeTab==='projects'">
        <div class="section-bar"><span class="ct">// PROJECT MANAGEMENT</span><span class="badge">{{ projects.length }} projects</span></div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>ID</th><th>Title</th><th>Tag</th><th>Featured</th><th>Tech Stack</th><th>Links</th></tr></thead>
            <tbody>
              <tr *ngFor="let p of projects">
                <td class="muted">{{ p.id }}</td>
                <td class="ptitle">{{ p.title }}</td>
                <td><span class="tag-badge">{{ p.tag }}</span></td>
                <td><span [class]="p.featured ? 'feat-yes':'feat-no'">{{ p.featured ? '⭐ Yes':'No' }}</span></td>
                <td class="stack-cell"><span class="pill" *ngFor="let t of p.techStack.slice(0,3)">{{ t }}</span></td>
                <td>
                  <a [href]="p.githubUrl||'#'" target="_blank" class="lk" *ngIf="p.githubUrl">GH</a>
                  <a [href]="p.liveUrl||'#'" target="_blank" class="lk" *ngIf="p.liveUrl">Live</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- MESSAGES TAB -->
      <div *ngIf="activeTab==='messages'">
        <div class="section-bar"><span class="ct">// CONTACT MESSAGES</span><span class="badge">{{ messages.length }} messages</span></div>
        <div class="msg-list">
          <div class="msg-card" *ngFor="let m of messages" [class.unread]="!m.read">
            <div class="msg-head">
              <div>
                <div class="msg-from">{{ m.senderName }} <span class="msg-email">{{ m.senderEmail }}</span></div>
                <div class="msg-subject">{{ m.subject }}</div>
              </div>
              <div class="msg-right">
                <div class="msg-date">{{ m.sentAt | date:'dd MMM yyyy' }}</div>
                <span class="unread-badge" *ngIf="!m.read">NEW</span>
                <button class="act-btn edit" (click)="markRead(m)" *ngIf="!m.read">Mark Read</button>
              </div>
            </div>
            <div class="msg-body">{{ m.message }}</div>
          </div>
          <div class="empty" *ngIf="messages.length===0">No messages yet.</div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin { min-height:100vh; background:#030712; padding:3rem; }
    .admin-header { margin-bottom:2rem; }
    h1 { font-family:'Orbitron',monospace; font-size:1.8rem; font-weight:900; color:#fff; }
    h1 span { color:#00f5d4; }
    .sub { color:#64748b; font-family:'Space Mono',monospace; font-size:.68rem; letter-spacing:2px; margin-top:.3rem; }
    .tabs { display:flex; gap:.5rem; margin-bottom:2rem; flex-wrap:wrap; }
    .tab-btn { background:rgba(255,255,255,0.03); border:1px solid rgba(0,245,212,.12); color:#64748b; padding:.5rem 1.25rem; font-family:'Orbitron',monospace; font-size:.68rem; letter-spacing:1px; cursor:pointer; transition:all .2s; }
    .tab-btn.active, .tab-btn:hover { color:#00f5d4; border-color:#00f5d4; background:rgba(0,245,212,.06); }
    .section-bar { display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem; }
    .ct { font-family:'Orbitron',monospace; font-size:.7rem; color:#00f5d4; letter-spacing:2px; }
    .badge { font-family:'Space Mono',monospace; font-size:.65rem; color:#7c3aed; border:1px solid rgba(124,58,237,.3); padding:.2rem .6rem; background:rgba(124,58,237,.1); }
    .table-wrap { overflow-x:auto; }
    table { width:100%; border-collapse:collapse; background:rgba(255,255,255,0.02); border:1px solid rgba(0,245,212,.1); }
    th { padding:.7rem 1rem; text-align:left; font-family:'Space Mono',monospace; font-size:.62rem; color:#64748b; letter-spacing:1px; background:rgba(0,245,212,.03); border-bottom:1px solid rgba(0,245,212,.08); }
    td { padding:.8rem 1rem; border-bottom:1px solid rgba(255,255,255,.03); font-size:.85rem; color:#e2e8f0; vertical-align:middle; }
    tr:hover td { background:rgba(0,245,212,.02); }
    .muted { color:#64748b; }
    .mono { font-family:'Space Mono',monospace; font-size:.75rem; }
    .small { font-size:.72rem; }
    .u-row { display:flex; align-items:center; gap:.6rem; }
    .av { width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-family:'Orbitron',monospace; font-size:.58rem; font-weight:700; color:#fff; flex-shrink:0; }
    .role-badge { font-size:.62rem; font-family:'Space Mono',monospace; padding:.18rem .5rem; border:1px solid; }
    .r-admin { background:rgba(124,58,237,.2); color:#a78bfa; border-color:rgba(124,58,237,.3); }
    .r-manager { background:rgba(0,245,212,.08); color:#00f5d4; border-color:rgba(0,245,212,.25); }
    .r-reviewer { background:rgba(245,158,11,.1); color:#f59e0b; border-color:rgba(245,158,11,.3); }
    .r-viewer { background:rgba(100,116,139,.15); color:#94a3b8; border-color:rgba(100,116,139,.3); }
    .role-select { background:#0a0f1e; border:1px solid #00f5d4; color:#00f5d4; padding:.2rem .5rem; font-family:'Space Mono',monospace; font-size:.7rem; }
    .status-dot { display:inline-block; width:7px; height:7px; border-radius:50%; margin-right:5px; }
    .s-active { background:#10b981; box-shadow:0 0 6px #10b981; }
    .s-idle { background:#f59e0b; }
    .s-offline { background:#64748b; }
    .act-btn { font-family:'Space Mono',monospace; font-size:.65rem; padding:.25rem .6rem; cursor:pointer; border:1px solid; background:transparent; margin-right:.3rem; transition:all .2s; }
    .edit { color:#00f5d4; border-color:rgba(0,245,212,.3); }
    .edit:hover { background:rgba(0,245,212,.08); }
    .del { color:#f87171; border-color:rgba(248,113,113,.3); }
    .del:hover { background:rgba(248,113,113,.08); }
    .tag-badge { font-family:'Space Mono',monospace; font-size:.6rem; padding:.15rem .5rem; background:rgba(124,58,237,.1); color:#a78bfa; border:1px solid rgba(124,58,237,.3); }
    .ptitle { color:#e2e8f0; font-weight:600; max-width:200px; }
    .stack-cell { display:flex; flex-wrap:wrap; gap:.3rem; }
    .pill { font-size:.62rem; padding:.1rem .4rem; background:rgba(0,245,212,.05); color:#00f5d4; border:1px solid rgba(0,245,212,.15); font-family:'Space Mono',monospace; }
    .feat-yes { color:#f59e0b; font-size:.8rem; }
    .feat-no { color:#64748b; font-size:.8rem; }
    .lk { font-family:'Space Mono',monospace; font-size:.65rem; color:#00f5d4; text-decoration:none; border:1px solid rgba(0,245,212,.2); padding:.15rem .5rem; margin-right:.3rem; }
    .msg-list { display:flex; flex-direction:column; gap:1rem; }
    .msg-card { background:rgba(255,255,255,0.02); border:1px solid rgba(0,245,212,.1); border-radius:4px; padding:1.25rem; }
    .msg-card.unread { border-color:rgba(0,245,212,.3); background:rgba(0,245,212,.02); }
    .msg-head { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:.75rem; flex-wrap:wrap; gap:.5rem; }
    .msg-from { font-size:.9rem; color:#e2e8f0; font-weight:600; }
    .msg-email { color:#64748b; font-family:'Space Mono',monospace; font-size:.72rem; margin-left:.5rem; }
    .msg-subject { color:#00f5d4; font-size:.82rem; font-family:'Space Mono',monospace; margin-top:.2rem; }
    .msg-right { display:flex; flex-direction:column; align-items:flex-end; gap:.3rem; }
    .msg-date { font-family:'Space Mono',monospace; font-size:.65rem; color:#64748b; }
    .unread-badge { background:#00f5d4; color:#030712; font-size:.6rem; padding:.1rem .4rem; font-family:'Orbitron',monospace; }
    .msg-body { color:#94a3b8; font-size:.85rem; line-height:1.7; }
    .empty { text-align:center; color:#64748b; font-family:'Space Mono',monospace; padding:3rem; }
    @media(max-width:768px) { .admin { padding:2rem 1.5rem; } }
  `]
})
export class AdminComponent implements OnInit {
  users: User[] = [];
  projects: Project[] = [];
  messages: ContactMessage[] = [];
  activeTab = 'users';
  editingUser: number | null = null;
  roles = ['ADMIN', 'MANAGER', 'REVIEWER', 'VIEWER'];
  tabs = [
    { key: 'users', label: '👥 USERS' },
    { key: 'projects', label: '🚀 PROJECTS' },
    { key: 'messages', label: '✉️ MESSAGES' }
  ];

  constructor(public auth: AuthService, private svc: PortfolioService) {}

  ngOnInit() {
    this.svc.getUsers().subscribe(u => this.users = u);
    this.svc.getProjects().subscribe(p => this.projects = p);
    this.svc.getMessages().subscribe(m => this.messages = m);
  }

  updateRole(u: User) { this.svc.updateUserRole(u.id, u.role).subscribe(); }
  deleteUser(id: number) {
    if (confirm('Delete this user?')) {
      this.svc.deleteUser(id).subscribe(() => this.users = this.users.filter(u => u.id !== id));
    }
  }
  markRead(m: ContactMessage) { this.svc.markRead(m.id).subscribe(() => m.read = true); }

  getAvatarBg(role: string): string {
    const m: any = { ADMIN: 'linear-gradient(135deg,#7c3aed,#00f5d4)', MANAGER: 'linear-gradient(135deg,#f59e0b,#ef4444)', REVIEWER: 'linear-gradient(135deg,#10b981,#3b82f6)', VIEWER: 'linear-gradient(135deg,#64748b,#94a3b8)' };
    return m[role] || m.VIEWER;
  }
}
