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
import { ISubdetailhead, singleSubDetailheadResponse } from '../../Models/subdetailhead';
import { Idetailhead } from '../../Models/detailhead';
import { HttpService } from '../../Services/detailheadservice';
import { DropdownModule } from 'primeng/dropdown';
import { Message } from 'primeng/api';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-subdetail-form',
  standalone: true,
  imports: [InputTextModule,InputGroupModule,InputGroupAddonModule,CardModule,ButtonModule,ReactiveFormsModule,DialogModule,DropdownModule,PaginatorModule],

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
  messages: Message[] | undefined;
  // constructor(private messageService: MessageService) {}
  
  subdetailheadForm=this.formbuilder.group({
    
    code:['',[Validators.required,Validators.maxLength(2)]],
    name:['',[Validators.required,Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/),Validators.maxLength(150)]],
    detailHeadId:[0,[Validators.required]],
  });
  subdetailheadId!:number;
  isEdit= false;
  disablebutton: boolean = true;
  
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
      this.detailhead = response.result.sort((a, b) => a.name.localeCompare(b.name));

      console.log(response.result);
      this.detailhead = response.result;

    });
      }
    
    
      cancel() {
        this.router.navigate(['/subdetailhead-list']); // Assuming '/' is the route for your form
      }
     
    
      save() {
        console.log(this.subdetailheadForm.value);
        const detail_head: ISubdetailhead = {
          name: this.subdetailheadForm.value.name!,
          code: this.subdetailheadForm.value.code!,
          detailHeadId: this.subdetailheadForm.value.detailHeadId!,
          
        
        }
        if (this.subdetailheadForm.controls['name'].errors && this.subdetailheadForm.controls['name'].errors['maxlength']) {
          alert("Name cannot exceed 150 characters.");
          return; // Stop execution if name exceeds 150 characters
        }
          if (this.isEdit) {
            if (this.subdetailheadForm.valid) {
              this.httpService.updateSubDetailHead(this.subdetailheadId, detail_head).subscribe(() => {
                // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
                // this.messages = [{ severity: 'success', summary: 'Success', detail: 'Message Content' }];
                this.router.navigateByUrl("/subdetailhead-list");
         
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
                // this.messages = [{ severity: 'success', summary: 'Success', detail: 'Message Content' }];
                // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
                
                // console.log("Success");
      
                this.router.navigateByUrl("/subdetailhead-list");
      
              });
            }
            else {
              alert("Please fill the requierd field.");
            }
      
          }
      
        }
        checkCodeExistence() {
          const code = this.subdetailheadForm.value.code;
          if (code && code.length >= 2 && code.length <= 4) {
            this.httpService.getSubdetailByCode(code).subscribe((response: singleSubDetailheadResponse) => {
              if (response && response.result) {
                alert("This code already exists in the database.");
                this.disablebutton=true;
              }
              else{
                this.disablebutton=!this.subdetailheadForm.valid;
              }
              
            });
          }
        }
      }
