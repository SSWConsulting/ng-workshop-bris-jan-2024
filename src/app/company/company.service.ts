import { Injectable } from '@angular/core';
import { Company } from './company';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  API_BASE = 'https://app-fbc-crm-api-prod.azurewebsites.net/api';

  companies$ = new BehaviorSubject<Company[]>([]);

  constructor(private readonly httpClient: HttpClient) {
    this.loadCompanies();
  }

  getCompanies(): Observable<Company[]> {
    return this.companies$;
  }

  getCompany(companyId: number): Observable<Company> {
    return this.httpClient
      .get<Company>(`${this.API_BASE}/company/${companyId}`)
      .pipe(catchError(this.errorHandler<Company>));
  }

  addCompany(company: Company): Observable<Company> {
    return this.httpClient
      .post<Company>(`${this.API_BASE}/company`, company)
      .pipe(
        catchError(this.errorHandler<Company>),
        tap(() => this.loadCompanies())
      );
  }

  updateCompany(company: Company): Observable<Company> {
    return this.httpClient
      .put<Company>(`${this.API_BASE}/company/${company.id}`, company)
      .pipe(
        catchError(this.errorHandler<Company>),
        tap(() => this.loadCompanies())
      );
  }

  deleteCompany(companyId: number): Observable<Company> {
    return this.httpClient
      .delete<Company>(`${this.API_BASE}/company/${companyId}`)
      .pipe(
        catchError(this.errorHandler<Company>),
        tap(() => this.loadCompanies())
      );
  }

  private loadCompanies(): void {
    this.httpClient
      .get<Company[]>(`${this.API_BASE}/company`)
      .pipe(catchError(this.errorHandler<Company[]>))
      .subscribe((c) => this.companies$.next(c));
  }

  private errorHandler<T>(error: Error): Observable<T> {
    console.error('implement custom error handler here', error);
    return new Observable<T>();
  }
}
