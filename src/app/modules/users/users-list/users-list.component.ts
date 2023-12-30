import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../user-api.service';
import { userModel } from '../users.model';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  p: number = 1;
  searchKey:string=""
  allUser:userModel[]=[]
  constructor(private api:UserApiService,private router:Router){}

  ngOnInit(): void {
    this.getallusers()
  }

  getallusers(){
    this.api.getAllUserAPI().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.allUser=res
      },
      error:(err:any)=>{
        alert(err.message)
      }
    })
  }

  //delete user
  deleteUser(id:any){
    this.api.deleteUserAPI(id).subscribe({
      next:(res:any)=>{
        alert("User removed Successfully")
        this.getallusers()
      },
      error:(err:any)=>{
        alert(err.message)
      }
    })
  }

  sortById(){
    this.allUser.sort((a:any,b:any)=>a.id-b.id)
  }

  sortByName(){
    this.allUser.sort((a:any,b:any)=>a.name.localeCompare(b.name))
  }

  generatePDF(){
    let pdf = new jsPDF()
    let head = [['Id','Username','Email','Status']]
    let body:any = []
    this.allUser.forEach((item:any)=>{
      body.push([item.id,item.name,item.email,item.active])
    })
    pdf.setFontSize(16)
    pdf.text("All Users List",10,10)
    autoTable(pdf,{head,body})
    pdf.output('dataurlnewwindow')
    pdf.save('alluserslist.pdf')
  }

  logOut(){
    localStorage.removeItem('admin_name')
    localStorage.removeItem('admin_password')
    this.router.navigateByUrl('')

  }
}
