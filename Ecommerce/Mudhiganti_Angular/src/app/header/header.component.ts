import { Component, OnInit } from '@angular/core';
declare var $: any;
import { APIService } from '../services/api.service';
import { Router, NavigationEnd } from '@angular/router';
import { searchObj }    from './header';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
  providers: [ APIService ]
})
export class HeaderComponent implements OnInit {

  constructor(private apiService: APIService, private router: Router) { }
  model = new searchObj('','');
  ngOnInit() {
  	let self = this;
  	$("#logout").click(function(){
         sessionStorage.clear();
         console.log("value"+sessionStorage.getItem("admin"));
         self.apiService.deleteCookie('userid');
         self.apiService.deleteCookie('amount');
         self.router.navigate(['loginpopup']);
         $('#isAdmin').val('');
         $('#amountId').val('');

    });


    $("#searchBtn").click(function(event){
      $('#categoryId').val('');
      self.router.navigate(['products']);
    });

    this.router.routeReuseStrategy.shouldReuseRoute = function(){
        return false;
    };

    this.router.events.subscribe((evt) => {
        if (evt instanceof NavigationEnd) {
            this.router.navigated = false;
            window.scrollTo(0, 0);
        }
    });



  }

  ngAfterViewChecked() {
    let self=this;
    /*$("#searchBtn").click(function(event){

      self.router.navigate(['login']);
      self.router.navigate(['products']);
    });*/
  }
}
