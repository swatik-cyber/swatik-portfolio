import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project, Skill, Experience, Certification, DashboardStats, User, ContactMessage } from '../models';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  private api = environment.apiUrl;
  constructor(private http: HttpClient) {}

  // Projects
  getProjects(): Observable<Project[]> { return this.http.get<Project[]>(`${this.api}/projects`); }
  getFeaturedProjects(): Observable<Project[]> { return this.http.get<Project[]>(`${this.api}/projects/featured`); }
  createProject(p: Project): Observable<Project> { return this.http.post<Project>(`${this.api}/projects`, p); }
  updateProject(id: number, p: Project): Observable<Project> { return this.http.put<Project>(`${this.api}/projects/${id}`, p); }
  deleteProject(id: number): Observable<void> { return this.http.delete<void>(`${this.api}/projects/${id}`); }

  // Skills
  getSkills(): Observable<Skill[]> { return this.http.get<Skill[]>(`${this.api}/skills`); }

  // Experiences
  getExperiences(): Observable<Experience[]> { return this.http.get<Experience[]>(`${this.api}/experiences`); }

  // Certifications
  getCertifications(): Observable<Certification[]> { return this.http.get<Certification[]>(`${this.api}/certifications`); }

  // Dashboard
  getDashboardStats(): Observable<DashboardStats> { return this.http.get<DashboardStats>(`${this.api}/dashboard/stats`); }

  // Users
  getUsers(): Observable<User[]> { return this.http.get<User[]>(`${this.api}/users`); }
  updateUserRole(id: number, role: string): Observable<User> { return this.http.put<User>(`${this.api}/users/${id}/role?role=${role}`, {}); }
  deleteUser(id: number): Observable<void> { return this.http.delete<void>(`${this.api}/users/${id}`); }

  // Contact
  sendContact(data: any): Observable<any> { return this.http.post(`${this.api}/contact`, data); }
  getMessages(): Observable<ContactMessage[]> { return this.http.get<ContactMessage[]>(`${this.api}/contact`); }
  markRead(id: number): Observable<any> { return this.http.put(`${this.api}/contact/${id}/read`, {}); }
}
