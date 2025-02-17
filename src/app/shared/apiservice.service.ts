import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private _http : HttpClient ) { }


  PostStudent(data:any)   // data is studentobj
  {
         return this._http.post<any>("http://localhost:3000/posts" ,data).pipe(map((res:any)=>{
          return res;

         
         }))

  }
  getstudent(){
    return  this._http.get<any>("http://localhost:3000/posts").pipe(map((res:any)=>{
        return res;
    }));

  }
     // Put Method For Update Student
     putStudent(data:any, id:number)
     {
       return this._http.put<any>("http://localhost:3000/posts/" + id,data)
     }
   // Delete Method For Update Student
   deleteStudent(id:number)
   {
     return this._http.delete<any>("http://localhost:3000/posts/" + id).pipe(map((res:any)=> {
       return res
     }))
   }
}
