import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Company } from '../company';

@Component({
  selector: 'fbc-company-table',
  templateUrl: './company-table.component.html',
  styleUrl: './company-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyTableComponent implements OnChanges {
  @Input({ required: true })
  companies!: Company[];

  @Output()
  deleteCompanyClicked = new EventEmitter<Company>();

  ngOnChanges(changes: SimpleChanges): void {
    console.log('change detected', changes);
  }

  deleteCompany(company: Company) {
    this.deleteCompanyClicked.emit(company);
  }
}
