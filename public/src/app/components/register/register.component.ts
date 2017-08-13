import { Router } from '@angular/router';
import { DataCollectionService } from './../../services/data-collection.service';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  message: string;
  success: boolean;

  constructor(private fb: FormBuilder, private dcs: DataCollectionService, private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      username: ['', Validators.compose([
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])]
    })
  }

  register() {

    const user = {
      email: this.form.get('email').value,
      username: this.form.get('username').value,
      password: this.form.get('password').value
    }

    this.dcs.registerUser(user).subscribe(res => {
      this.success = res.success;
      this.message = res.message;
    });

    setTimeout(() => {
      this.router.navigate(['home'])
    }, 2000);

  }

}
