import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TagInterface } from '../types/tag.interface';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
  httpClient = inject(HttpClient);
  apiUrl = 'http://localhost:3004.com';

  getTags(): Observable<TagInterface[]> {
    return this.httpClient.get<TagInterface[]>(`${this.apiUrl}/tags`);
  }

  createTag(name: string): Observable<TagInterface> {
    return this.httpClient.post<TagInterface>(`${this.apiUrl}/tags`, { name });
  }
}
