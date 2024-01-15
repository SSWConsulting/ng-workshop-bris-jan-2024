import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './models/appState';
import { selectCompanyCount } from './+store/selectors/company.selectors';
import { environment } from '../environments/environment';

@Component({
  selector: 'fbc-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'firebootcamp-crm';
  isProduction = environment.isProduction;

  companyCount$!: Observable<number>;

  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {
    this.companyCount$ = this.store.select(selectCompanyCount);
  }
}
