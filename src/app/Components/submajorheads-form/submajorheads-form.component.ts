import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubmajorheadService } from '../../Services/submajorhead.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SingleSubmajorheadResponse, Submajorhead } from '../../Models/submajorhead';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TreeSelectModule } from 'primeng/treeselect';
import { MajorheadService } from '../../Services/majorhead.service';
import { Majorhead, MajorheadResponse } from '../../Models/majorhead';
import { TreeNode } from 'primeng/api/treenode';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-submajorheads-form',
  standalone: true,
  imports: [InputTextModule, FormsModule, ButtonModule, ReactiveFormsModule, TreeSelectModule, DropdownModule],
  templateUrl: './submajorheads-form.component.html',
  styleUrl: './submajorheads-form.component.css'
})
export class SubmajorheadsFormComponent {

  formBuilder = inject(FormBuilder);
  httpService = inject(SubmajorheadService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  submajorHeadsForm = this.formBuilder.group({
    code: ['', [Validators.required, Validators.maxLength(2)]],
    name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    majorHeadId: [0, [Validators.required]],
    // short_name: ['', [Validators.required, Validators.pattern("[a-zA-Z].*")]]
    // ['',[Validators.required,Validators.minLength(2),Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]]
  });
  majorheads: Majorhead[] = [];
  constructor(public majorService: MajorheadService) { }

  submajorId!: number;
  isEdit = false;
  ngOnInit() {

    this.submajorId = this.route.snapshot.params['id'];
    console.log(this.submajorId);

    if (this.submajorId) {
      this.isEdit = true;
      this.httpService.getSubMajorheads(this.submajorId).subscribe(response => {
        console.log(response.result);
        // this.majorHeadsForm.
        this.submajorHeadsForm.patchValue(response.result);
        // this.majorHeadsForm.patchValue({
        //   name: response.result.name!,
        //   code: response.result.code
        // });
        // 
      })
    }

    this.majorService.getAllMajorheads().subscribe(majors => {

      console.log(majors.result);
      // this.majorheads = majors.result;
      this.majorheads = majors.result.sort((a, b) => a.name.localeCompare(b.name));
    });

  }

  save() {
    // console.log(this.majorHeadsForm.value);
    const submajorheads: Submajorhead = {
      name: this.submajorHeadsForm.value.name!,
      code: this.submajorHeadsForm.value.code!,
      majorHeadId: this.submajorHeadsForm.value.majorHeadId!,

    }

    if (this.submajorHeadsForm.controls['name'].errors && this.submajorHeadsForm.controls['name'].errors['maxlength']) {
      alert("Name cannot exceed 150 characters.");
      return;
    }

    if (this.isEdit) {
      if (this.submajorHeadsForm.valid) {
        // majorheads.updated_at = new Date();
        this.httpService.updateSubMajorheads(this.submajorId, submajorheads).subscribe((response) => {
          console.log(response.statusCode);
          this.router.navigateByUrl("/submajorheads-list");

        });
      }
      else {
        alert("Please fill the requierd field.");
      }
    } else {
      if (this.submajorHeadsForm.valid) {
        this.httpService.createSubMajorheads(submajorheads).subscribe((response) => {
          console.log(response.statusCode);

          this.router.navigateByUrl("/submajorheads-list");

        });
      }
      else {
        alert("Please fill the requierd field.");
      }

    }

  }
  cancel() {
    // console.log(id);
    this.router.navigateByUrl("/submajorheads-list");

  }
  // buttonDisabled: boolean = true;
  // checkCodeExistence() {
  //   const code = this.submajorHeadsForm.value.code;
  //   if (code && code.length <= 4) {
  //     this.httpService.getSubMajorheadsCode(code).subscribe((response: SingleSubmajorheadResponse) => {
  //       if (response && response.result) {
  //         alert("This code already exists.");
  //         this.buttonDisabled = true; // Disable the button if code already exists
  //       } else {
  //         this.buttonDisabled = !this.submajorHeadsForm.valid; // Enable/disable based on form validity
  //       }
  //     });
  //   }
  // }
  buttonDisabled: boolean = true;
  checkCodeExistence() {
    const code = this.submajorHeadsForm.value.code;
    const majorHeadId = this.submajorHeadsForm.value.majorHeadId;
    if (code && majorHeadId && code.length <= 4) {
      this.httpService.getSubMajorheadsCodemajorHeadId(code, majorHeadId).subscribe((response: SingleSubmajorheadResponse) => {
        if (response && response.result) {
          alert("This code already exists for the selected major head.");
          this.buttonDisabled = true; // Disable the button if code already exists
        } else {
          this.buttonDisabled = !this.submajorHeadsForm.valid; // Enable/disable based on form validity
        }
      });
    }
  }
}
