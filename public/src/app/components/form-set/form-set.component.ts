import { DataCollectionService } from './../../services/data-collection.service';
import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-form-set',
  templateUrl: './form-set.component.html',
  styleUrls: ['./form-set.component.css']
})
export class FormSetComponent implements OnInit {

  airports: any;
  subscription: Subscription;
  form: FormGroup;
  disabled: boolean;
  loading = true;

  problemType = {};
  flightType = {}
  @Input() test: string;

  constructor(
    private dcs: DataCollectionService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.loadFormFieldDescription();
    this.initForms();
  }

  initForms() {
    this.form = this.fb.group({
      flightNr: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(10),
        this.isAplhpaNumeric
      ])],
      flightDate: ['', Validators.compose([
        Validators.required,
        this.isValidDate
      ])],
      flightType: ['', Validators.compose([
        Validators.required
      ])],
      flightProblemCase: ['', Validators.required]
    })
    $('#select').dropdown();
    $('#select2').dropdown();
  }

  loadFormFieldDescription() {
    this.dcs.getFormFieldDescription('problem').subscribe(payload => {
      this.problemType = payload;
    })
    this.dcs.getFormFieldDescription('flightType').subscribe(payload => {
      this.flightType = payload;
    })
  }

  isAplhpaNumeric(controls) {
    const regex = new RegExp(/^[a-zA-Z0-9]+$/);
    return (regex.test(controls.value)) ? null : { notValidFlightNumber: true };
  }

  isValidDate(controls) {
    // https://stackoverflow.com/a/20773488
    const regex = new RegExp(/(^(((0[1-9]|1[0-9]|2[0-8])\.(0[1-9]|1[012]))|((29|30|31)\.(0[13578]|1[02]))|((29|30)\.(0[4,6,9]|11)))\.(19|[2-9][0-9])\d\d$)|(^29\.02\.(19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/);
    return (regex.test(controls.value)) ? null : { notValidDate: true };
  }

}
