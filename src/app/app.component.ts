import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {NumVerifyService} from './num-verify.service';
import {MatSnackBar} from '@angular/material/snack-bar';

interface Food {
  value: string;
  viewValue: string;
}
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
  // this.list = this.phones.getData().subscribe(data=>{
  //   console.warn(data)
  // })
 }

 foods: Food[] = [
  {value: 'steak-0', viewValue: 'Steak'},
  {value: 'pizza-1', viewValue: 'Pizza'},
  {value: 'tacos-2', viewValue: 'Tacos'}
];

 phoneForm = this.formBuilder.group({
  //  firstName:['',[Validators.required]],
  //  lastName:['',[Validators.required]],
  //  address:['',[Validators.required]],
  //  dob:['',[Validators.required]],
  //  gender:['',[Validators.required]],
   accessKey:['',[Validators.required]],
   phone:['',[Validators.required, Validators.pattern("^[0-9]*$")]],
   country:['',]
 });

 ngOnInit() {
  this.myservice.getData().subscribe((res: any) => {
    console.log(res);
    this.list = res;
    // for (let index = 0; index < this.list.length; index++) {
    //   this.listc[name]=this.list[index];
    //   console.log(this.listc);
    // }
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
