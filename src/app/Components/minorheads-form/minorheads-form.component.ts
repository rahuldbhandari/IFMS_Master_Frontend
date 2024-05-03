import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MinorheadService } from '../../Services/minorhead.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Minorhead, SingleMinorheadResponse } from '../../Models/minorhead';
import { SubmajorheadService } from '../../Services/submajorhead.service';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TreeSelectModule } from 'primeng/treeselect';
import { Submajorhead } from '../../Models/submajorhead';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-minorheads-form',
  standalone: true,
  imports: [FormsModule, InputTextModule, ButtonModule, ReactiveFormsModule, TreeSelectModule, DropdownModule],
  templateUrl: './minorheads-form.component.html',
  styleUrl: './minorheads-form.component.css'
})
export class MinorheadsFormComponent {
  formBuilder = inject(FormBuilder);
  httpService = inject(MinorheadService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  minorHeadsForm = this.formBuilder.group({
    code: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
    name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    subMajorId: [0, [Validators.required]],
    // short_name: ['', [Validators.required, Validators.pattern("[a-zA-Z].*")]]
    // ['',[Validators.required,Validators.minLength(2),Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]]
  });
  submajorheads: Submajorhead[] = [];
  constructor(public submajorService: SubmajorheadService) { }

  minorId!: number;
  isEdit = false;
  ngOnInit() {

    this.minorId = this.route.snapshot.params['id'];
    console.log(this.minorId);

    if (this.minorId) {
      this.isEdit = true;
      this.httpService.getMinorHeads(this.minorId).subscribe(response => {
        console.log(response.result);
        // this.majorHeadsForm.
        this.minorHeadsForm.patchValue(response.result);
        // this.majorHeadsForm.patchValue({
        //   name: response.result.name!,
        //   code: response.result.code
        // });
        // 
      })
    }

    this.submajorService.getAllSubMajorheads().subscribe(submajors => {

      console.log(submajors.result);
      this.submajorheads = submajors.result;

    });

  }

  save() {
    // console.log(this.majorHeadsForm.value);
    const minorheads: Minorhead = {
      name: this.minorHeadsForm.value.name!,
      code: this.minorHeadsForm.value.code!,
      subMajorId: this.minorHeadsForm.value.subMajorId!,

    }



    if (this.isEdit) {
      if (this.minorHeadsForm.valid) {
        // majorheads.updated_at = new Date();
        this.httpService.updateMinorHeads(this.minorId, minorheads).subscribe((response) => {
          console.log(response.statusCode);
          this.router.navigateByUrl("/minorheads-list");

        });
      }
      else {
        alert("Please fill the requierd field and use only character.");
      }
    } else {
      if (this.minorHeadsForm.valid) {
        this.httpService.createMinorHeads(minorheads).subscribe((response) => {
          console.log(response.statusCode);

          this.router.navigateByUrl("/minorheads-list");

        });
      }
      else {
        alert("Please fill the requierd field and use only character.");
      }

    }

  }
  cancel() {
    // console.log(id);
    this.router.navigateByUrl("/minorheads-list");

  }

  checkCodeExistence() {
    const code = this.minorHeadsForm.value.code;
    if (code && code.length >= 2 && code.length <= 4) {
      this.httpService.getMinorHeadsCode(code).subscribe((response: SingleMinorheadResponse) => {
        if (response && response.result) {
          alert("This code already exists in the database.");
        }
      });
    }
  }

}
