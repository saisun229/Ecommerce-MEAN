

import { Component, OnInit } from '@angular/core';
import { APIService } from '../services/api.service';
import { MyProfile }    from './myprofile';
import { Router, NavigationEnd } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styles: [],
  providers: [ APIService ]
})

export class MyProfileComponenet implements OnInit{

  constructor(private apiService: APIService,private router: Router) { }

  ngOnInit() {
  	let self=this;
    if(this.apiService.getCookie('userid')==""){
        this.router.navigate(['loginpopup']);
    }
/*	$("ul.categoryList li").click(function(event){
		event.preventDefault();
		let text = $(this).text();
		let modal = new Category('',text,'','');
		self.apiService.searchProducts(modal).subscribe();
	});*/
  }

   ngAfterViewChecked() {

  }

}
