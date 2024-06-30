import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../../../models/Project.model';
import { environment } from '../../../../environments/enviroment';

const DEFAULT_URL = `${environment.api}/projects`;

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${DEFAULT_URL}`);
  }

  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${DEFAULT_URL}/${id}`);
  }

  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(DEFAULT_URL, project);
  }

  updateProject(id: number, project: Project): Observable<Project> {
    return this.http.put<Project>(`${DEFAULT_URL}/${id}`, project);
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${DEFAULT_URL}/${id}`);
  }

  getArchivedProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${DEFAULT_URL}/archives`);
  }

  updateProjectCheck(projectId: number, checked: boolean): Observable<void> {
    return this.http.post<void>(`${DEFAULT_URL}/${projectId}/checked`, null, {
      params: {
        checked: checked.toString()
      }
    });
  }
}
