import { Injectable } from '@angular/core';
import { Company } from './company';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  API_BASE = 'https://app-fbc-crm-api-prod.azurewebsites.net/api';

  constructor(private readonly httpClient: HttpClient) {}

  getCompanies(): Observable<Company[]> {
    return this.httpClient
      .get<Company[]>(`${this.API_BASE}/company`)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: Error): Observable<Company[]> {
    console.error('implement custom error handler here', error);
    return new Observable<Company[]>();
  }
}