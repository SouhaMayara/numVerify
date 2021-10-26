import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {NumVerifyService} from './num-verify.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'numVerify';
  list=[];
  listc=[];
 constructor(private formBuilder:FormBuilder,private myservice:NumVerifyService, private snackBar: MatSnackBar){
 }
 phoneForm = this.formBuilder.group({
   accessKey:['',[Validators.required]],
   phone:['',[Validators.required, Validators.pattern("^[0-9]*$")]],
   country:['',]
 });
 ngOnInit() {
  this.myservice.getData().subscribe((res: any) => {
    console.log(res);
    this.list = res;
  });
 }
 verify(){
   if(this.phoneForm.valid){
     this.myservice.verify(this.phoneForm.value.accessKey,this.phoneForm.value.phone,this.phoneForm.value.country).subscribe((res: any) => {
        console.log(res);
        if(res.valid==true)
        this.snackBar.open('Phone number is valid','', 
        {duration:8000, verticalPosition: 'top', panelClass: ['green-snackBar']});
        else if(res.valid==false){
          this.snackBar.open('Phone number is not valid','', 
          {duration:8000, verticalPosition: 'top', panelClass: ['try-snackBar']});
        }
        else{
          this.snackBar.open('ERROR '+res.error.code+' : '+res.error.info,'', 
          {duration:8000, verticalPosition: 'top', panelClass: ['red-snackBar']});
        }
      });
   }
 }

 get f(){
  return this.phoneForm.controls;
}
}