import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../../services/notification/notification.service';
import { Company } from '../../services/company/company';

@Component({
  selector: 'my-company-edit',
  templateUrl: './company-edit-form.component.html',
  styleUrls: ['./company-edit-form.component.scss'],
  providers: [NotificationService]
})
export class CompanyEditComponent implements OnInit {
  editForm: FormGroup;
  public company: Company;
  public test: string;

  editCompany(any?) {
    console.log('invoked');
  }
  constructor(
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.buildForm();
  }
  buildForm(): void {
    this.editForm = this.fb.group({
      'voice-licences': ['', [
        Validators.required,
        Validators.maxLength(24)
      ]],
      'digital-licences': ['', [
        Validators.required,
        Validators.maxLength(24)
      ]]
    });
  }
}
