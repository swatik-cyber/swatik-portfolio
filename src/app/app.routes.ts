import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./components/hero/hero.component').then(m => m.HeroComponent) },
  { path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) },
  { path: 'projects', loadComponent: () => import('./components/projects/projects.component').then(m => m.ProjectsComponent) },
  { path: 'skills', loadComponent: () => import('./components/skills/skills.component').then(m => m.SkillsComponent) },
  { path: 'experience', loadComponent: () => import('./components/experience/experience.component').then(m => m.ExperienceComponent) },
  { path: 'certifications', loadComponent: () => import('./components/certifications/certifications.component').then(m => m.CertificationsComponent) },
  { path: 'contact', loadComponent: () => import('./components/contact/contact.component').then(m => m.ContactComponent) },
  { path: 'resume', loadComponent: () => import('./components/resume/resume.component').then(m => m.ResumeComponent) },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadComponent: () => import('./components/admin/admin.component').then(m => m.AdminComponent),
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN', 'MANAGER'] }
  },
  { path: '**', redirectTo: '' }
];
