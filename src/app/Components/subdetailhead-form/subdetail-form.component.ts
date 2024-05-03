import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { subdetailservice } from '../../Services/subdetailhead.services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ISubdetailhead } from '../../Models/subdetailhead';
import { Idetailhead } from '../../Models/detailhead';
import { HttpService } from '../../Services/detailheadservice';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-subdetail-form',
  standalone: true,
  imports: [InputTextModule,InputGroupModule,InputGroupAddonModule,CardModule,ButtonModule,ReactiveFormsModule,DialogModule,DropdownModule],

  templateUrl: './subdetail-form.component.html',
  styleUrl: './subdetail-form.component.css'
})
export class SubdetailFormComponent {
  httpService=inject(subdetailservice);
  router=inject(Router);
  route=inject(ActivatedRoute);
  formbuilder=inject(FormBuilder)
  detailhead! : Idetailhead[];
  httpServicess=inject(HttpService)
  
  subdetailheadForm=this.formbuilder.group({
    
    code:['',[Validators.required,Validators.minLength(2)]],
    name:['',[Validators.required,Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    detailheadId:[0,[Validators.required]],
  });
  subdetailheadId!:number;
  isEdit= false;
  visible: boolean = false;
  ngOnInit(){
    this.subdetailheadId=this.route.snapshot.params['id'];
    if(this.subdetailheadId){
      this.isEdit = true;
      this.httpService.getSubDetailHead(this.subdetailheadId).subscribe(response=>{
        console.log(response.result);
        this.subdetailheadForm.patchValue(response.result);
      })
    }
    this.httpServicess.getAllDetailHead().subscribe(response => {

      console.log(response.result);
      this.detailhead = response.result;

    });
      }
    
    
      cancel() {
        this.router.navigate(['/detailhead-list']); // Assuming '/' is the route for your form
      }
      showDialog() {
        this.visible = true;
    }
    
      save() {
        console.log(this.subdetailheadForm.value);
        const detail_head: ISubdetailhead = {
          name: this.subdetailheadForm.value.name!,
          code: this.subdetailheadForm.value.code!,
          detailHeadId: this.subdetailheadForm.value.detailheadId!,
        
        }
          if (this.isEdit) {
            if (this.subdetailheadForm.valid) {
              this.httpService.updateSubDetailHead(this.subdetailheadId, detail_head).subscribe(() => {
                this.router.navigateByUrl("/detailhead-list");
         
                });
                // this.detailheadForm.reset();
      
                
      
                // console.log("Success");
      
              
            }
            else {
              alert("Please fill the requierd field and use only character.");
            }
          } else {
            if (this.subdetailheadForm.valid) {
              this.httpService.createSubDetailHead(detail_head).subscribe(() => {
               
                
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
