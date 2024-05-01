import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { HttpService } from '../../Services/detailheadservice';
import { ActivatedRoute, Router } from '@angular/router';
import { Idetailhead } from '../../Models/detailhead';
import { response } from 'express';
import { DialogModule } from 'primeng/dialog';



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
  formbuilder=inject(FormBuilder)
  
  detailheadForm=this.formbuilder.group({
    
    code:['',[Validators.required,Validators.minLength(2)]],
    name:['',[Validators.required,Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
  });
  detailheadId!:number;
  isEdit= false;
  visible: boolean = false;
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
      showDialog() {
        this.visible = true;
    }
      save() {
        console.log(this.detailheadForm.value);
        const detail_head: Idetailhead = {
          name: this.detailheadForm.value.name!,
          code: this.detailheadForm.value.code!,
        
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
              alert("Please fill the requierd field and use only character.");
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
      }
          