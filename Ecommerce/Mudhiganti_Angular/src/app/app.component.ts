import { Component } from '@angular/core';
declare var $: any;
import { APIService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ APIService ]
})


export class AppComponent {
  title = 'My Angular 2 app works!';
  constructor(private apiService: APIService) { }
  ngOnInit() {   	
  	let amount = this.apiService.getCookie('amount');
	$('#amountDisplay').html('Amount Earned: $ '+amount);

  }


}
