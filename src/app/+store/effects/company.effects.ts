import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CompanyService } from '../../company/company.service';
import {
  deleteCompany,
  loadCompanies,
  loadCompaniesSuccess,
} from '../actions/company.actions';
import { exhaustMap, map, switchMap } from 'rxjs';
import { Company } from '../../company/company';

@Injectable()
export class CompanyEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly companyService: CompanyService
  ) {}

  loadCompanies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCompanies.type),
      switchMap(() =>
        this.companyService
          .getCompanies()
          .pipe(map((companies) => loadCompaniesSuccess(companies)))
      )
    )
  );

  deleteCompany$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteCompany.type),
      map(action => (action as any).payload as Company),
      switchMap(company =>
        this.companyService
          .deleteCompany(company.id)
          .pipe(map(() => loadCompanies()))
      )
    )
  );
}
