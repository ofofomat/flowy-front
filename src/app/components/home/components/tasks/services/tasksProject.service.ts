
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/enviroment';
import { Observable } from 'rxjs';
import { TaskProject } from '../../../../../models/TasksProject.model';

const DEFAULT_URL = `${environment.api}/projects`;

@Injectable()
export class TasksProjectService {

  constructor(private httpClient: HttpClient) { }

  
  getTasksByProjectId(projectId: number): Observable<TaskProject[]> {
    return this.httpClient.get<TaskProject[]>(`${DEFAULT_URL}/${projectId}/tasks`);
  }
  
  getTaskById(projectId: number, taskId: number): Observable<TaskProject> {
    return this.httpClient.get<TaskProject>(`${DEFAULT_URL}/${projectId}/tasks/${taskId}`);
  }
  
  createTask(projectId: number, task: TaskProject): Observable<TaskProject> {
    console.log(task);
    return this.httpClient.post<TaskProject>(`${DEFAULT_URL}/${projectId}/tasks`, task);
  }

  updateTask(projectId: number, task: TaskProject): Observable<TaskProject> {
    return this.httpClient.put<TaskProject>(`${DEFAULT_URL}/${projectId}/tasks/${task.tasksProjectId}`, {task});
  }

  deleteTask(projectId:number, taskId: number): Observable<TaskProject> {
    return this.httpClient.delete<TaskProject>(`${DEFAULT_URL}/${projectId}/tasks/${taskId}`);
  }

}
