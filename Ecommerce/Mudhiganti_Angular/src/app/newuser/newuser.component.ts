import { Component, OnInit } from '@angular/core';
import { Newuser }    from './newuser';
import { APIService } from '../services/api.service';
import { NgForm } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styles: [],
  providers: [ APIService ]
})

export class NewuserComponent{

  constructor(private apiService: APIService) { }

  model = new Newuser('', '', '', '', '','','');

  submitted = false;

  onSubmit(f: NgForm) {
    this.submitted = true;
    let values = f.value;

      this.apiService.signup(f.value)
      .subscribe((res) => {
        console.log('response----->',res.firstname)
        console.log('response*****>',res)
        //this.apiService.setCookie('userid',res.userid,1);
        
      },
      this.failure);
   }

   failure(){

   }

  showFormControls(form: any) {
    return form && form.controls['name'] &&
    form.controls['name'].value; // Dr. IQ
  }
}
