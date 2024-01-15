import { Component } from '@angular/core';
import { CompanyService } from '../company.service';
import { Router } from '@angular/router';
import { Company } from '../company';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'fbc-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrl: './company-edit.component.scss',
})
export class CompanyEditComponent {
  // formGroup = new FormGroup({
  //   name: new FormControl('', [Validators.required]),
  //   email: new FormControl('', [Validators.required, Validators.email]),
  //   phone: new FormControl('', [Validators.required]),
  // });
  // formGroup = this.fb.group({
  //   name: this.fb.control('', [Validators.required]),
  //   email: this.fb.control('', [Validators.required, Validators.email]),
  //   phone: this.fb.control('', [Validators.required]),
  // });
  formGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
  });

  constructor(
    private readonly companyService: CompanyService,
    private readonly fb: FormBuilder,
    private readonly router: Router
  ) {}

  f() {
    return this.formGroup.controls;
  }

  saveCompany() {
    if (this.formGroup.valid) {
      const company = this.formGroup.value as unknown as Company;
      this.companyService
        .addCompany(company)
        .subscribe(() => this.router.navigate(['/company/list']));
    }
  }
}
