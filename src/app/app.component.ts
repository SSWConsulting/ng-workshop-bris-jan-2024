import { Component, OnInit } from '@angular/core';
import { CompanyService } from './company/company.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'fbc-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'firebootcamp-crm';

  companyCount$!: Observable<number>;

  constructor(private readonly companyService: CompanyService) {}

  ngOnInit(): void {
    this.companyCount$ = this.companyService
      .getCompanies()
      .pipe(map((c) => c.length));
  }
}
