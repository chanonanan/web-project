import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'service/auth.service';
import { TokenHelper } from 'authorization/token.helper';
import { ApiResponse } from 'model/apiResponse';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  isLoading: boolean;
  repassword: string;
  roles = [
    { value: 0, viewValue: 'Coach', select: true },
    { value: 1, viewValue: 'Athlete', select: false },
  ];
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private tHelper: TokenHelper
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      repassword: [null, [Validators.required]],
      firstname: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      role_id: [null, [Validators.required]]
    });
    this.isLoading = false;
  }

  passwordValid() {
    if (this.registerForm.get('password').value == this.registerForm.get('repassword').value) return true;
    return false;
  }

  onSubmitForm() {
    this.isLoading = true;
    this.authService.register(this.registerForm.value).subscribe(res => {
      let result: ApiResponse;
      result = res as ApiResponse;
      if(result.successful){
        this.authService.auth(this.registerForm.value.username, this.registerForm.value.password)
        .subscribe((data) => {
          let res: any;
          res = data as any;
          this.tHelper.setToken(res.token);
          this.isLoading = false;
          console.log('success');
          this.router.navigate(['/']);
          console.log('success', 2);

        }, (err) => {
          alert('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
          this.isLoading = false;
        });
      }else{
        alert(result.message);
      }
    }, (err) => {
      alert('สมัครสมาชิกไม่สำเร็จ');
      this.isLoading = false;
    });
      
      

  }

}
