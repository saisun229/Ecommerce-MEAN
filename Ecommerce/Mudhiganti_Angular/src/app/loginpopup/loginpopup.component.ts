import { Component, OnInit } from '@angular/core';
//import { FormBuilder, Validators } from '@angular/forms';
declare var $: any;
import { LoginPopup, Newuser, UserInfo }    from './loginpopup';
import { NgForm } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { UserObj }    from '../header/header';

import { APIService } from '../services/api.service';

@Component({
  selector: 'app-loginpopup',
  templateUrl: './loginpopup.component.html',
  styles: [],
  providers: [ APIService ]
})





export class LoginPopupComponent implements OnInit{

  //users: Login[];

  constructor(private apiService: APIService, private router: Router) { }

  ngOnInit() {
    let self=this;
    this.apiService.deleteCookie('userid');
    sessionStorage.clear();
    $('#signuppopup').modal('hide');

    $('#loginpopup').modal({
      backdrop: 'static',
      keyboard: false
    });

    $("#register").click(function(){
          $('#loginpopup').modal('hide');
          $('#signuppopup').modal({
            backdrop: 'static',
            keyboard: false
          });
     });

  }

  model = new LoginPopup('', '', '');

  submitted = false;

  onSubmit(f: NgForm) {
    this.submitted = false;
    let values = f.value;
    console.log('values::',values);
    this.apiService.login(f.value)
      .subscribe((res) => {
        console.log('response',res);
        let userid = res.userid;
        $('#signuppopup').modal('hide');
        $('#loginpopup').modal('hide');
        console.log('in login pop::',res.isAdmin);
        $('#isAdmin').val(res.isAdmin);
        $('#amountId').val(res.amount);
        this.apiService.setCookie('amount',res.amount,1);
        //this.apiService.
        $('#amountDisplay').html('Amount Earned: $ '+res.amount);
        if(userid){
          this.apiService.setCookie('userid',res.userid,1);
          this.router.navigate(['products']);
        //  window.location.reload();
        }else{
          this.router.navigate(['info']);
        }
      },
      this.failure);

  }

  failure(){
    console.log('failed');
  }

  signupSubmit(f: NgForm) {
    let values = f.value;
    this.apiService.signup(f.value)
      .subscribe((res) => {
        console.log('response',res);
        $('#signuppopup').modal('hide');
        $('#loginpopup').modal('hide');
        let userid = res.userid;
        $('#isAdmin').val(res.isAdmin);
        $('#amountId').val(res.amount);
        this.apiService.setCookie('amount',res.amount,1);
        $('#amountDisplay').html('Amount Earned: $ '+res.amount);
        if(userid){
          this.apiService.setCookie('userid',res.userid,1);
          this.router.navigate(['products']);
        }else{
          this.router.navigate(['info']);
        }
      },
      this.failure);
  }

}
