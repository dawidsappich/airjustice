import { DataCollectionService } from './../services/data-collection.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'form-set',
  templateUrl: './form-set.component.html',
  styleUrls: ['./form-set.component.css']
})
export class FormSetComponent implements OnInit {

  airports: any;

  constructor(private dcs: DataCollectionService) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.dcs.getLookups().subscribe(data => this.airports = data.message);
  }

}
