import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Area } from '../../../models/Area.model';
import { environment } from '../../../../environments/enviroment';

const DEFAULT_URL = `${environment.api}/areas`;

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  constructor(private http: HttpClient) { }

  getAllAreas(): Observable<Area[]> {
    return this.http.get<Area[]>(`${DEFAULT_URL}`);
  }

  getAreaById(id: number): Observable<Area> {
    return this.http.get<Area>(`${DEFAULT_URL}/${id}`);
  }

  createArea(area: Area): Observable<Area> {
    return this.http.post<Area>(DEFAULT_URL, area);
  }

  updateArea(id: number, area: Area): Observable<Area> {
    return this.http.put<Area>(`${DEFAULT_URL}/${id}`, area);
  }

  deleteArea(id: number): Observable<void> {
    return this.http.delete<void>(`${DEFAULT_URL}/${id}`);
  }
}
