

import { Component, OnInit } from '@angular/core';
declare var $: any;

import { NgForm } from '@angular/forms';

import { APIService } from '../services/api.service';
import { MyItems, Delete }    from './myitems';
import { Router, NavigationEnd } from '@angular/router';
import { Upload }    from '../upload/upload';

@Component({
  selector: 'app-myitems',
  templateUrl: './myitems.component.html',
  styles: [],
  providers: [ APIService ]
})


export class MyitemsComponenet implements OnInit{


  constructor(private apiService: APIService, private router: Router) { }
  items: MyItems[];
  categories = [];
  checkedCategory = {};
  selectedCategory = [];
  imgUrl: string = "";
  private LOGO = require("./../img/test.jpg");
  model = new Upload('', '', '','',1);
  itemid: string = "";
  ngOnInit() {
    let self=this;
    if(this.apiService.getCookie('userid')==""){
        this.router.navigate(['loginpopup']);
    }
    this.getProducts();

  }

  getCategoryList(itemObj){
    this.apiService.getCategory()
      .subscribe(item => {
        this.categories = item;
        this.saveSelectedCategory(itemObj);
      });
  }

  saveSelectedCategory(item){
    //this.selectedCategory = item.categoryids;
    console.log('item.categoryids::',item.categoryids);
    for (let i = 0; i < item.categoryids.length; i++) {
      this.checkedCategory[item.categoryids[i]] = true;
    }
    //console.log('check::',this.checkedCategory);
  }

  getProducts() {
    let userid = this.apiService.getCookie('userid');
    this.apiService.getAvailableProducts(userid)
      .subscribe(item => {this.items = item; console.log('res:::',item)});
  }


  updateProduct(item){
    this.model = new Upload(
        item.sellerid,
        item.keywords.toString(),
        item.description,
        item.productname,
        item.price,
        item.categoryids,
        item.itemid
     );
  }

  ngAfterViewChecked() {
    let self=this;
    $(".myitems .update").click(function(event){
      event.preventDefault();
      console.log('update clicked');

      let itemid = $(this).attr('itemid');
      self.itemid = itemid;
      self.apiService.getItem(itemid)
        .subscribe(item => {
          console.log('when open item res::',item[0]);
          self.getCategoryList(item[0]);
          let itemObj = item[0];
          self.updateProduct(itemObj);

          $('#updateProduct').modal({
            backdrop: 'static',
            keyboard: false
          });
      });

    });
    $(".myitems .delete").click(function(event){
      event.preventDefault();
      $(this).parent().parent().hide();
      let itemid = $(this).attr('name');
      let modal = new Delete(itemid);
      self.apiService.deleteProduct(modal).subscribe();
    });
  }


  addSubmit(f: NgForm) {
    let values = f.value;
    console.log('update item::',values);

    var categoryids = [];
    $.each($("input[name='type']:checked"), function(){
        categoryids.push($(this).attr('categoryid'));
    });
    let userid = this.apiService.getCookie('userid');
    values.sellerid = userid;
    values.itemid = this.itemid;
    values.categoryids = categoryids;

    var isSold = $('#soldItem').is(':checked');

    if(isSold){
      values.status = 'SOLD'
    }

    this.apiService.updateProduct(values)
      .subscribe((res) => {
        if(res.successmsg){
          alert('You have updated!');
          $('#updateProduct').modal('hide');
          this.router.navigate(['myitems']);
        }else{
          alert('Something went wrong!');
          $('#updateProduct').modal('hide');
          this.router.navigate(['myitems']);
        }

      });
  }

}
