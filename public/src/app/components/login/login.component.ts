import { Router } from '@angular/router';
import { DataCollectionService } from './../../services/data-collection.service';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  processing = false;
  message: string;

  constructor(private fb: FormBuilder, private dcs: DataCollectionService, private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login() {
    this.processing = true;
    this.disableForm();

    const user = {
      username: this.form.get('username').value,
      password: this.form.get('password').value
    }

    this.dcs.loginUser(user).subscribe(res => {
      this.message = res.message;
      if (!res.success) {
        this.processing = false;
        this.enableForm();
      } else {
        this.dcs.storeUserdata(res.token, res.user);
        setTimeout(() => {
          this.router.navigate(['home']);
        }, 2000);
      }
    });



  }

  disableForm() {
    this.form.get('username').disable();
    this.form.get('password').disable();
  }

  enableForm() {
    this.form.get('username').enable();
    this.form.get('password').enable();
  }

}
