

import { Component, OnInit } from '@angular/core';
import { APIService } from '../services/api.service';
import { Updateuser, Profile }    from './admin';
import { NgForm } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';

declare var $ : any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styles: [],
  providers: [ APIService ]
})

export class AdminComponenet implements OnInit{

  constructor(private apiService: APIService, private router: Router) { }

  users: any;

  ngOnInit() {

    if(this.apiService.getCookie('userid')==""){
        this.router.navigate(['loginpopup']);
    }
  	let self=this;
    this.getAllUser();
  }

  getAllUser() {

    this.apiService.getAllUser()
      .subscribe(users => {

        this.users = users;

        setTimeout(function(){ $('#example').DataTable(); }, 50);

      });
  }

   ngAfterViewChecked() {

  }

}
