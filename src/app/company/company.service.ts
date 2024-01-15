import { Injectable } from '@angular/core';
import { Company } from './company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor() { }

  getCompanies(): Company[] {
    return [
      { name: 'Company 1', email: 'Email 1', phone: 111 },
      { name: 'Company 2', email: 'Email 2', phone: 222 },
      { name: 'Company 3', email: 'Email 3', phone: 333 },
    ];
  }
}
