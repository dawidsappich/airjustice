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

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      user: ['', Validators.required],
      pass: ['', Validators.required]
    })
  }

  login() {
    this.processing = true;
    this.disableForm();
  }

  disableForm() {
    this.form.get('user').disable();
    this.form.get('pass').disable();
  }

}
