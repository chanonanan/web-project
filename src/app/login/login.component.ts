import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit, OnInit {

  loginForm: FormGroup;
  isLoading:boolean;
  constructor(private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    this.isLoading = false;
  }
  ngAfterViewInit() {
    
  }
  onSubmitForm(){
    if(!this.loginForm.valid){
      alert('กรุณากรอกชื่อผู้ใช้และรหัสผ่าน');
      return;
    }
    this.isLoading = true;
    // this.authService.auth(this.loginForm.value.username,this.loginForm.value.password)
    // .subscribe((data)=>{
    //   let res:any;
    //   res = data as any;
    //   this.tHelper.setToken(res.token);
    //   this.isLoading = false;
    //   console.log('success');
    //   this.router.navigate(['/']);
    //   console.log('success',2);
      
    // },(err)=>{
    //   alert('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    //   this.isLoading = false;
    // });
    
  }
}
