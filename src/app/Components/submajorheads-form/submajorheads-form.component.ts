import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubmajorheadService } from '../../Services/submajorhead.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Submajorhead } from '../../Models/submajorhead';
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
    code: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
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
      this.majorheads = majors.result;

    });

  }

  save() {
    // console.log(this.majorHeadsForm.value);
    const submajorheads: Submajorhead = {
      name: this.submajorHeadsForm.value.name!,
      code: this.submajorHeadsForm.value.code!,
      majorHeadId: this.submajorHeadsForm.value.majorHeadId!,

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
        alert("Please fill the requierd field and use only character.");
      }
    } else {
      if (this.submajorHeadsForm.valid) {
        this.httpService.createSubMajorheads(submajorheads).subscribe((response) => {
          console.log(response.statusCode);

          this.router.navigateByUrl("/submajorheads-list");

        });
      }
      else {
        alert("Please fill the requierd field and use only character.");
      }

    }

  }
  cancel() {
    // console.log(id);
    this.router.navigateByUrl("/submajorheads-list");

  }
}
