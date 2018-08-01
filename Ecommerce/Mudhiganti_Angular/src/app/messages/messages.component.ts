

import { Component, OnInit } from '@angular/core';
declare var $: any;

import { NgForm } from '@angular/forms';

import { APIService } from '../services/api.service';
import { MyItems, Message }    from './messages';
import { Router, NavigationEnd } from '@angular/router';
import { Upload }    from '../upload/upload';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styles: [],
  providers: [ APIService ]
})


export class Messages implements OnInit{


  constructor(private apiService: APIService, private router: Router) { }

  msgs: Message[];

  ngOnInit() {
    let self=this;
    if(this.apiService.getCookie('userid')==""){
        this.router.navigate(['loginpopup']);
    }

    this.getMessages();




  }

  getMessages(){
    let self=this;
    let userid = self.apiService.getCookie('userid');
          this.apiService.getMessages(userid)
      .subscribe(msg => {
        self.msgs = msg;
        console.log('msgs:::',msg);
      });
  }

  ngAfterViewChecked() {
    let self=this;
    $('#msgs li:first-child').addClass('active');
    $('#tabContent div:first-child').addClass('in active');


    $('.sendBtn').click(function(){
      let message = $('.sendMsg').val();
      let sender = self.apiService.getCookie('userid');
      let receiver =  $(this).attr('receiver');
      let itemid =  $(this).attr('itemid');
      let msg = {
        "itemid": itemid,
        "sender": sender,
        "receiver": receiver,
        "message": message
      }

      console.log('msg param::',msg);

      self.apiService.sendMessage(msg)
      .subscribe(msgs => {
        window.location.reload();
        //console.log('msgs res:::',msgs)
      });

    });

  }

}
