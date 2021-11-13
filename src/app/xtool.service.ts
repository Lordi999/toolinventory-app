import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { XTool } from './interface/xtool';
import { environment } from 'src/environments/environment';
import { Type } from './enum/type.enum';

@Injectable({
  providedIn: 'root'
})
export class XtoolService {
  private apiServerUrl = environment.apiBaseUrl;  

  constructor(private http: HttpClient) { }

  public getTools(): Observable<XTool[]>{
    return this.http.get<XTool[]>(`${this.apiServerUrl}/tool/all`);
  }

  public addTool(tool: XTool): Observable<XTool>{
    return this.http.post<XTool>(`${this.apiServerUrl}/tool/add`,tool);
  }

  public updateTool(tool: XTool): Observable<XTool>{
    return this.http.put<XTool>(`${this.apiServerUrl}/tool/update`,tool);
  }

  public deleteTool(toolid: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/tool/delete/${toolid}`);
  }

  public filterTools(type: Type): Observable<XTool[]>{
    return this.http.get<XTool[]>(`${this.apiServerUrl}/tool/find/type/${type}`);
  }
}
