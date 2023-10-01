import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { HttpResponse } from '../models/http.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  http = inject(HttpClient);

  private api = environment.apiUrl + '/api';

  constructor() { }

  get(route: string, params: { [key: string]: any; } = {}) {
    return this.http.get<HttpResponse>(this.api + route, { params });
  }

  post(route: string, body: { [key: string]: any; }) {
    console.log(environment.apiUrl)
    return this.http.post<HttpResponse>(this.api + route, body);
  }

  put(route: string, body: { [key: string]: any; }) {
    return this.http.put<HttpResponse>(this.api + route, body);
  }

  del(route: string, params: { [key: string]: any; } = {}) {
    return this.http.delete<HttpResponse>(this.api + route, { params });
  }
}
