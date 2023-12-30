import { Component } from '@angular/core';
import { userModel } from '../users.model';
import { UserApiService } from '../user-api.service';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  user:userModel={}
  constructor(private api:UserApiService,private router:Router,private toaster:ToasterService){}
  addUser(){
    this.api.addUserAPI(this.user).subscribe({
      next:(res:userModel)=>{
        console.log(res);
        this.toaster.showSuccess("New User Added Successfully!!!")
        this.router.navigateByUrl('/users')
      },
      error:(err:any)=>{
        alert(err.message)
      }
    })
    
  }
  cancel(){
    this.user = {}
  }
}
