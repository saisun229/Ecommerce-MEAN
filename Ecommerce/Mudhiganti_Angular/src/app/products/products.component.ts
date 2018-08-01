import { Component, OnInit } from '@angular/core';
declare var $: any;

import { NgForm } from '@angular/forms';

import { APIService } from '../services/api.service';
import { Products, Buynow } from './products';
import { searchObj, UserObj }    from '../header/header';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styles: [],
  providers: [ APIService ]
})





export class ProductsComponent implements OnInit{


  constructor(private apiService: APIService, private router: Router) { }
  items:searchObj;

  imgUrl: string = "";
  private LOGO = require("./../img/test.jpg");
  imgPath = 'http://localhost:3000/downloadimage?id=';
  userData = {
    mobile:'',
    address: '',
    email: '',
    firstname: ''
  };

  buyit = new Buynow('','' ,'' ,'' );

  ngOnInit() {
    let self=this;
    this.getProducts(false);

    $("#lowtohigh").click(function(){
      $(this).addClass('highlight');
      $("#hightolow").removeClass('highlight');
      $("#latest").removeClass('highlight');
       self.getProducts('lh');
    });

    $("#hightolow").click(function(){
      $(this).addClass('highlight');
      $("#lowtohigh").removeClass('highlight');
      $("#latest").removeClass('highlight');
       self.getProducts('hl');
    });

    $("#latest").click(function(){
      $(this).addClass('highlight');
      $("#lowtohigh").removeClass('highlight');
      $("#hightolow").removeClass('highlight');
       self.getProducts(false);
    });

    $('.sendBtn').click(function(){
      let message = $('.sendMsg').val();
      let sender = self.apiService.getCookie('userid');
      let receiver =  $('#modalProduct .sellerIdPopup').html();
      let itemid =  $('#modalProduct .itemIdPopup').html();
      let msg = {
        "itemid": itemid,
        "sender": sender,
        "receiver": receiver,
        "message": message
      }

      self.apiService.sendMessage(msg)
      .subscribe(msgs => {
        $('#myModal').modal('hide');
      });

    });

     $('.buyBtn').click(function(){
       let price = $(this).attr('price');
       self.buyit = new Buynow(price,'' ,'' ,'' );
       $('#myModal').modal('hide');
       $('#buynow').modal('show');

      /*
      let price = $(this).attr('price');
      let userid = self.apiService.getCookie('userid');
      let seller =  $(this).attr('seller');
      let itemid =  $(this).attr('itemid');
      let msg = {
        "userid": userid,
        "amount": price,
        "sellerid": seller,
        "itemid": itemid
      }

      self.apiService.buyNow(msg)
      .subscribe(msgs => {
        $('#myModal').modal('hide');
      });*/

    });





  }

  getProducts(sorting) {
      let userid = this.apiService.getCookie('userid');
      let searchKey = $('#search').val();
      let categoryId = $('#categoryId').val();
      let lh = (sorting == 'lh')?true:false;
      let hl = (sorting == 'hl')?true:false;

      let payload = {
        "userid": userid,
        "keywords": searchKey,
        "categoryids":[categoryId],
        "priceLowToHigh":lh,
        "priceHighToLow":hl
      }
      if(!searchKey.length){
        delete payload.keywords;
      }
      if(!categoryId.length){
        delete payload.categoryids;
      }

      this.apiService.searchProduct(payload)
      .subscribe(item => {
        this.items = item;
        console.log('res:::',item)
      });
  }

  ngAfterViewChecked() {
    let self = this;
    //var sellerid = 1;
    $("ul.productsList li").click(function(){
        let sellerid = $('.sellerid',this).html();
        let itemid = $('.itemid',this).html();
        this.imgUrl = $('img',this).attr('src');
        $('#modalProduct .product').html($('.product',this).attr('product'));
        $('#modalProduct .description').html($('.description',this).attr('des'));
        $('#modalProduct .price').html('Price: $'+$('.price',this).attr('price'));
        $('#modalProduct .sellerIdPopup').html(sellerid);
        $('#modalProduct .itemIdPopup').html(itemid);
        self.getUser(sellerid);
        $('#myModal').modal('show');
        $('.sendMsg').val('');
        $('#imgPath').attr('src',this.imgUrl);
        let priceval = $('.price',this).attr('price');
        $('.buyBtn').attr('price',priceval);
        $('.buyBtn').attr('seller',sellerid);
        $('.buyBtn').attr('itemid',itemid);

     });
  }


  getUser(sellerid) {
    //let userid = this.apiService.getCookie('userid');
    this.apiService.getUser(sellerid)
      .subscribe(user => {
        this.updateuserData(user);
      });
  }

  updateuserData(user){
    this.userData.mobile = user.mobile;
    this.userData.address = user.address;
    this.userData.email = user.email;
    this.userData.firstname = user.firstname;
  }

  buynowSubmit(f: NgForm) {
      let self = this;
      let values = f.value;
      let price = $('.buyBtn').attr('price');
      let userid = self.apiService.getCookie('userid');
      let seller =  $('.buyBtn').attr('seller');
      let itemid =  $('.buyBtn').attr('itemid');
      values.userid = userid;
      values.amount = price;
      values.sellerid = seller;
      values.itemid = itemid;
      console.log('buy::',f.value);

      self.apiService.buyNow(values)
      .subscribe(msgs => {
        $('#buynow').modal('hide');
        self.router.navigate(['products']);
        //window.location.reload();
      });
  }

}
