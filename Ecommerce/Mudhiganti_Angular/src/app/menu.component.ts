import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: []
})
export class MenuComponent implements OnInit {

  constructor() { }
  isAdmin: boolean = false;
  ngOnInit() {
  	let self=this;


  }

  ngAfterViewChecked() {
    let self = this;
    let adminFlag;
    var user=sessionStorage.getItem("admin");
    console.log("user value:"+user+"Masters");
    if(!user){
    console.log("HIIIIIII");
     let adminFlag = $('#isAdmin').val();
     sessionStorage.setItem("admin", adminFlag);
  }
  else{
     adminFlag=sessionStorage.getItem("admin");
  }
    adminFlag = (adminFlag == 'false' || adminFlag == 'undefined' || !adminFlag.length)?false:true;

    self.isAdmin = adminFlag;
    self.userType=!adminFlag;

  }

}
