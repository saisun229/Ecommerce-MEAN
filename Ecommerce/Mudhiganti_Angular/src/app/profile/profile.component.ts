

import { Component, OnInit } from '@angular/core';
import { APIService } from '../services/api.service';
import { Updateuser, Profile }    from './profile';
import { NgForm } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [],
  providers: [ APIService ]
})

export class ProfileComponenet implements OnInit{
  //user: Profile;
  constructor(private apiService: APIService, private router: Router) { }
  //user = Updateuser[];
  user: any;
  model = new Updateuser('','','','',1,'');
  ngOnInit() {
  	let self=this;
    if(this.apiService.getCookie('userid')==""){
        this.router.navigate(['loginpopup']);
    }
    this.getUser();
  }

  getUser() {
    let userid = this.apiService.getCookie('userid');
    this.apiService.getUser(userid)
      .subscribe(user => {
        this.updateUser(user);
      });
  }

  updateUser(user){
    this.model = new Updateuser(
        user.firstname,
        user.lastname,
        user.password,
        user.email,
        user.mobile,
        user.address
     );
  }

  onSubmit(f: NgForm) {
    let values = f.value;
    console.log('values::',values);
    this.apiService.updateUser(f.value)
      .subscribe((res) => {
        console.log('update response',res);
        let status = res.ok;
        if(status){
          alert('Informations are updated!')
          //this.router.navigate(['products']);
        }else{
          //this.router.navigate(['info']);
        }
      });
  }

   ngAfterViewChecked() {

  }

}
