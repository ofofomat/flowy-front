
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/enviroment';
import { Observable } from 'rxjs';
import { TaskArea } from '../../../../../models/TasksArea.model';

const DEFAULT_URL = `${environment.api}/areas`;

@Injectable()
export class TasksAreaService {

  constructor(private httpClient: HttpClient) { }
  
  getTasksByAreaId(areaId: number): Observable<TaskArea[]> {
    return this.httpClient.get<TaskArea[]>(`${DEFAULT_URL}/${areaId}/tasks`);
  }
  
  getTaskById(areaId: number, taskId: number): Observable<TaskArea> {
    return this.httpClient.get<TaskArea>(`${DEFAULT_URL}/${areaId}/tasks/${taskId}`);
  }

  createTask(areaId: number, task: TaskArea): Observable<TaskArea> {
    return this.httpClient.post<TaskArea>(`${DEFAULT_URL}/${areaId}/tasks`, task);
  }

  updateTask(areaId: number, task: any): Observable<TaskArea> {
    return this.httpClient.put<TaskArea>(`${DEFAULT_URL}/${areaId}/tasks/${task.id}`, {task});
  }

  deleteTask(areaId:number, taskId: number): Observable<TaskArea> {
    return this.httpClient.delete<TaskArea>(`${DEFAULT_URL}/${areaId}/tasks/${taskId}`);
  }

}
