import { APP_INITIALIZER, NgModule, isDevMode } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CompanyTableComponent } from './company/company-table/company-table.component';
import { CompanyEditComponent } from './company/company-edit/company-edit.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { companyReducer } from './+store/reducers/company.reducer';
import { CompanyEffects } from './+store/effects/company.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { Observable, tap } from 'rxjs';

function initializeAppFactory(httpClient: HttpClient): () => Observable<any> {
  return () => httpClient.get("https://swapi.dev/api/people/1/")
  .pipe(
    tap(person => console.log(person))
  );
}

@NgModule({
  declarations: [
    AppComponent,
    CompanyListComponent,
    CompanyTableComponent,
    CompanyEditComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
    StoreModule.forRoot(
      {
        companies: companyReducer,
      },
      {}
    ),
    EffectsModule.forRoot([CompanyEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode()
    }),
  ],
  providers: [
    provideClientHydration(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      multi: true,
      deps: [HttpClient]
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
