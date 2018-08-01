

import { Component, OnInit } from '@angular/core';
declare var $: any;

import { NgForm } from '@angular/forms';

import { APIService } from '../services/api.service';
import { soldItems, Update, Delete }    from './solditems';
import { Router, NavigationEnd } from '@angular/router';
import { Upload }    from '../upload/upload';

@Component({
  selector: 'app-solditems',
  templateUrl: './solditems.component.html',
  styles: [],
  providers: [ APIService ]
})


export class SoldComponenet implements OnInit{


  constructor(private apiService: APIService, private router: Router) { }
  items: soldItems[];
  categories = [];
  ngOnInit() {
    let self=this;
    if(this.apiService.getCookie('userid')==""){
        this.router.navigate(['loginpopup']);
    }  
    this.getsoldProducts();

  }

  getsoldProducts() {
    let userid = this.apiService.getCookie('userid');
    this.apiService.getsoldProducts(userid)
      .subscribe(item => {this.items = item; console.log('sold res:::',item)});
  }

  ngAfterViewChecked() {

  }

}
