import { Component, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';

import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Router, ActivatedRoute } from '@angular/router';

import { response } from 'express';
import { MajorheadService } from '../../Services/majorhead.service';
import { Majorhead, SingleMajorheadResponse } from '../../Models/majorhead';


@Component({
  selector: 'app-majorhead-form',
  standalone: true,
  imports: [InputTextModule, FormsModule, ButtonModule, ReactiveFormsModule],
  templateUrl: './majorheads-form.component.html',
  styleUrl: './majorheads-form.component.css'
})
export class MajorheadsFormComponent {



  formBuilder = inject(FormBuilder);
  httpService = inject(MajorheadService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  majorHeadsForm = this.formBuilder.group({
    code: ['', [Validators.required, Validators.maxLength(4)]],
    name: ['', [Validators.required, Validators.maxLength(150), Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    // short_name: ['', [Validators.required, Validators.pattern("[a-zA-Z].*")]]
    // ['',[Validators.required,Validators.minLength(2),Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]]
  });


  // majorHeadsForm: FormGroup;
  majorId!: number;
  // code!: string;
  isEdit = false;
  ngOnInit() {


    this.majorId = this.route.snapshot.params['id'];
    console.log(this.majorId);

    if (this.majorId) {
      this.isEdit = true;
      this.httpService.getMajorheads(this.majorId).subscribe(response => {
        console.log(response.result);
        // this.majorHeadsForm.
        this.majorHeadsForm.patchValue(response.result);
        // this.majorHeadsForm.patchValue({
        //   name: response.result.name!,
        //   code: response.result.code
        // });
        // 
      })
    }

  }

  save() {
    // console.log(this.majorHeadsForm.value);
    const majorheads: Majorhead = {
      name: this.majorHeadsForm.value.name!,
      code: this.majorHeadsForm.value.code!,

    }

    if (this.majorHeadsForm.controls['name'].errors && this.majorHeadsForm.controls['name'].errors['maxlength']) {
      alert("Name cannot exceed 150 characters.");
      return;
    }


    if (this.isEdit) {
      if (this.majorHeadsForm.valid) {
        // majorheads.updated_at = new Date();
        this.httpService.updateMajorheads(this.majorId, majorheads).subscribe((response) => {
          console.log(response.statusCode);
          this.router.navigateByUrl("/majorheads-list");

        });
      }
      else {
        alert("Please fill the requierd field and use only character.");
      }
    } else {
      if (this.majorHeadsForm.valid) {
        this.httpService.createMajorheads(majorheads).subscribe((response) => {
          console.log(response.statusCode);

          this.router.navigateByUrl("/majorheads-list");

        });
      }
      else {
        alert("Please fill the requierd field and use only character.");
      }

    }

  }
  cancel() {
    // console.log(id);
    this.router.navigateByUrl("/majorheads-list");

  }

  buttonDisabled: boolean = true;
  checkCodeExistence() {
    const code = this.majorHeadsForm.value.code;
    if (code && code.length <= 4) {
      this.httpService.getMajorheadsCode(code).subscribe((response: SingleMajorheadResponse) => {
        if (response && response.result) {
          alert("This code already exists.");
          this.buttonDisabled = true; // Disable the button if code already exists
        } else {
          this.buttonDisabled = !this.majorHeadsForm.valid; // Enable/disable based on form validity
        }
      });
    }
  }

}
