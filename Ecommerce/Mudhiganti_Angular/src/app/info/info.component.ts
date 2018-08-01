

import { Component, OnInit } from '@angular/core';
import { APIService } from '../services/api.service';
import { InfoMsg }    from './info';
import { Router, NavigationEnd } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styles: [],
  providers: [ APIService ]
})

export class InfoMsgComponenet implements OnInit{

  constructor(private apiService: APIService, private router: Router) { }
  model = new InfoMsg('');
  ngOnInit() {
  	let self=this;
    if(this.apiService.getCookie('userid')==""){
        this.router.navigate(['loginpopup']);
    }

    $('#infopopup').modal({
      backdrop: 'static',
      keyboard: false
    });
    //Button for re-login
  	$("#loginAgain").click(function(event){
  		event.preventDefault();
  		$('#infopopup').modal('hide');
      self.router.navigate(['loginpopup']);
  	});
  }

   ngAfterViewChecked() {

  }

}
