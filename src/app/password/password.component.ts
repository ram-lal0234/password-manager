import { Component, OnInit } from '@angular/core';
import { PasswordService } from '../services/password.service';
import { MatTableDataSource } from '@angular/material/table';
import { UntypedFormBuilder, Validators,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})

export class PasswordComponent implements OnInit {

  userDataForm :any;
  public isCopied = false;

  constructor (private passService:PasswordService,private fb: UntypedFormBuilder,) {}

  ngOnInit(): void {
    this.getData()
    this.userDataForm=this.fb.group({
      website:['',[Validators.required]],
      username:['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }

  displayedColumns: string[] = ['website', 'username', 'password', 'actions'];
  dataSource!: MatTableDataSource<[]>;

  getData():void{
    this.passService.getData().subscribe((res:any)=>{
        this.dataSource = new MatTableDataSource(res);
    },
    (err)=>{
      console.log(err);
      
    })
  }

  addPassword():any{
    this.passService.addData(this.userDataForm.value).subscribe((res)=>{
      this.getData();
      this.userDataForm.reset();
    },(err)=>{
      console.log(err);
    })
  }

  deleteItem(id:any,element:any){
    this.passService.deleteData(id,element).subscribe((res)=>{
      console.log(res);
      this.getData()
    },
    (err)=>{
      console.log(err);
      
    })
  }

  hashPassword(password: any){
    return "*".repeat(password.length)
  }


  showCopiedMessage() {
    this.isCopied = true;
    setTimeout(() => {
      this.isCopied = false;
    }, 2000); // Hide the message after 2 seconds (adjust as needed)
  }
}
