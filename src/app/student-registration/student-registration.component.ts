import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentModel } from './student';
import {ApiserviceService } from '../shared/apiservice.service';

@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.css']
})
export class StudentRegistrationComponent {
  formValue!: FormGroup; 

  studentobj : StudentModel = new StudentModel;

  constructor(private formbuilder : FormBuilder , private  api:ApiserviceService){}

  btnSaveShow:boolean=true;
  btnUpdateShow:boolean=false;


    ngOnInit():void{


          this.formValue = this.formbuilder.group({
                name:[''],
                class:[''],
                email:[''],
                address:[''],
                city:[''],
                password:['']
             
          })
          this.AllStudent();
    }


    AddStudent()
    {
  this.studentobj.address = this.formValue.value.address;
  this.studentobj.city=this.formValue.value.city;
  this.studentobj.name=this.formValue.value.name;
  this.studentobj.email=this.formValue.value.email;
  this.studentobj.password=this.formValue.value.password;
  this.studentobj.class=this.formValue.value.class;
         
                     this.api.PostStudent(this.studentobj).subscribe({
                          next:(v)=>{console.log("object in key value par   ",  v)},

                          error: (e)=>{
                               alert("Error")
                          },
                          complete :() =>{
                              console.log("completed")
                              // alert("data saved")
                              this.AllStudent();

                              this.formValue.reset();

                          }



                     })
    }

      allstudent:any[]=[];
    AllStudent(){

         this.api.getstudent().subscribe(res=>{
             this.allstudent=res
         })
    }
  
    EditStudent(data:any){
      this.formValue.controls['name'].setValue(data.name);
      this.formValue.controls['city'].setValue(data.city);
      this.formValue.controls['address'].setValue(data.address);
      this.formValue.controls['email'].setValue(data.email);
      this.formValue.controls['class'].setValue(data.class);
      this.formValue.controls['password'].setValue(data.password);
      this.studentobj.id = data.id;
      this.UpdateShowBtn();

      

    }

    SaveShowBtn()
    {
      this.btnUpdateShow = false;
      this.btnSaveShow = true;
    }
    UpdateShowBtn(){
      this.btnUpdateShow = true;
      this.btnSaveShow = false;
      
    }



    UpdateStudent(){

      this.studentobj.address = this.formValue.value.address;
      this.studentobj.city=this.formValue.value.city;
      this.studentobj.name=this.formValue.value.name;
      this.studentobj.email=this.formValue.value.email;
      this.studentobj.password=this.formValue.value.password;
      this.studentobj.class=this.formValue.value.class;

           this.api.putStudent(this.studentobj,this.studentobj.id).subscribe(res=>{
            // alert("data update");
            console.log(res)
            this.AllStudent();
            this.SaveShowBtn();


           })



    }

   
    DeleteStudent(data:any){
      this.api.deleteStudent(data.id).subscribe(res => {
        // alert("Record Deleted");
        this.AllStudent();
      })
    
    }

}
