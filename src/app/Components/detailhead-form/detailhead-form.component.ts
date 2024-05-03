import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

import { ActivatedRoute, Router } from '@angular/router';

import { response } from 'express';
import { DialogModule } from 'primeng/dialog';
import { HttpService } from '../../Services/detailheadservice';
import { Idetailhead, singleDetailheadResponse } from '../../Models/detailhead';



@Component({
  selector: 'app-detailhead-form',
  standalone: true,
  imports: [InputTextModule,InputGroupModule,InputGroupAddonModule,CardModule,ButtonModule,ReactiveFormsModule,DialogModule],
  templateUrl: './detailhead-form.component.html',
  styleUrl: './detailhead-form.component.css'
})
export class DetailheadFormComponent {
  httpService=inject(HttpService);
  router=inject(Router);
  route=inject(ActivatedRoute);
  formbuilder=inject(FormBuilder);
  
  detailheadForm=this.formbuilder.group({
    
    code:['',[Validators.required,Validators.maxLength(2)]],
    name:['',[Validators.required,Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/),Validators.maxLength(150)]],
  });
  detailheadId!:number;
  isEdit= false;
  disablebutton: boolean = true;
  ngOnInit(){
    this.detailheadId=this.route.snapshot.params['id'];
    if(this.detailheadId){
      this.isEdit = true;
      this.httpService.getDetailHead(this.detailheadId).subscribe(response=>{
        console.log(response.result);
        this.detailheadForm.patchValue(response.result);
      })
    }
      }
      cancel() {
        this.router.navigate(['/detailhead-list']); // Assuming '/' is the route for your form
      }
     
      save() {
        console.log(this.detailheadForm.value);
        const detail_head: Idetailhead = {
          name: this.detailheadForm.value.name!,
          code: this.detailheadForm.value.code!,
        
        }
        if (this.detailheadForm.controls['name'].errors && this.detailheadForm.controls['name'].errors['maxlength']) {
          alert("Name cannot exceed 150 characters.");
          return; // Stop execution if name exceeds 150 characters
        }
          if (this.isEdit) {
            if (this.detailheadForm.valid) {
              this.httpService.updateDetailHead(this.detailheadId, detail_head).subscribe(() => {
                this.router.navigateByUrl("/detailhead-list");
         
                });
                // this.detailheadForm.reset();
      
                
      
                // console.log("Success");
      
              
            }
            else {
              alert("Please fill the requierd field.");
            }
          } else {
            if (this.detailheadForm.valid) {
              this.httpService.createDetailHead(detail_head).subscribe(() => {
               
                
                // console.log("Success");
      
                this.router.navigateByUrl("/detailhead-list");
      
              });
            }
            else {
              alert("Please fill the requierd field and use only character.");
            }
      
          }
      
        }
        checkCodeExistence() {
          const code = this.detailheadForm.value.code;
          if (code && code.length >= 2 && code.length <= 4) {
            this.httpService.getdetailByCode(code).subscribe((response: singleDetailheadResponse) => {
              if (response && response.result) {
                alert("This code already exists in the database.");
                this.disablebutton=true;

              }
              else{
                this.disablebutton=!this.detailheadForm.valid;
              }
            });
          }
        }
      }
          