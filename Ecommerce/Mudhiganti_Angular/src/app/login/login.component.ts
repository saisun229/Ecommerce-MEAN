import { Component, OnInit } from '@angular/core';
//import { FormBuilder, Validators } from '@angular/forms';
//declare var $: any;
import { Login }    from './login';
import { NgForm } from '@angular/forms';

import { APIService } from '../services/api.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
  providers: [ APIService ]
})





export class LoginComponent{

  users: Login[];

  constructor(private apiService: APIService) { }

  model = new Login('', '');

  submitted = false;

  onSubmit(f: NgForm) {
    this.submitted = false;
    let values = f.value;
    console.log('values::',values);
    this.apiService.login(f.value)
      .subscribe((hero) => {console.log('response',hero)},
      this.failure);
  }

success(){
  console.log('test');
}
failure(){
  console.log('fail');
}


     


private selectedLink: string="";        

setradio(e: string): void   
{  

  this.selectedLink = e;  

}  

isSelected(name: string): boolean   
{  

  if (!this.selectedLink) { // if no radio button is selected, always return false so every nothing is shown  
    return false;  
  }  

  return (this.selectedLink === name);
}

  // TODO: Remove this when we're done
  //get diagnostic() { return JSON.stringify(this.model); }

  /*newHero() {
    this.model = new Hero(42, '', '');
  }

  skyDog(): Hero {
    let myHero =  new Hero(42, 'SkyDog',
                           'Fetch any object at any distance',
                           'Leslie Rollover');
    console.log('My hero is called ' + myHero.name); // "My hero is called SkyDog"
    return myHero;
  }*/

  //////// NOT SHOWN IN DOCS ////////

  // Reveal in html:
  //   Name via form.controls = {{showFormControls(heroForm)}}
  showFormControls(form: any) {
    return form && form.controls['name'] &&
    form.controls['name'].value; // Dr. IQ
  }
 /* doLogin(event) {
    console.log(event);
    //console.log(this.loginForm.value);
  }
  ngAfterViewChecked() {
    let self=this;
    	$("input[name='user']").change(function(){
    		console.log('changed');
    	});
  });*/

}

