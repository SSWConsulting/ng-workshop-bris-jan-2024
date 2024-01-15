import { Component, OnInit } from '@angular/core';
import { Company } from '../company';

@Component({
  selector: 'fbc-company-list',
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.scss'
})
export class CompanyListComponent implements OnInit{
  companies!: Company[];

  constructor(){}

  ngOnInit(): void {
    this.getCompanies();
  }

  getCompanies() {
    this.companies = [
      { name: 'Company 1', email: 'Email 1', phone: 111 },
      { name: 'Company 2', email: 'Email 2', phone: 222 },
      { name: 'Company 3', email: 'Email 3', phone: 333 },
    ];
  }

}
