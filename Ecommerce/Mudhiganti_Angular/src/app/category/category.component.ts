

import { Component, OnInit } from '@angular/core';
import { APIService } from '../services/api.service';
import { Category, AddCategory }    from './category';
import { Router, NavigationEnd } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styles: [],
  providers: [ APIService ]
})

export class CategoryComponent implements OnInit{

  constructor(private apiService: APIService, private router: Router) { }
  items = [
    new AddCategory('Electronics'),
    new AddCategory('Books'),
    new AddCategory('Sports'),
    new AddCategory('Mobiles'),
    new AddCategory('Vechiles'),
    new AddCategory('Others')
  ];
  categories = [];
  categoryLength: number = 0;
  ngOnInit() {
  	let self=this;


       //self.apiService.getCategory(this.items[i]).subscribe();

       self.apiService.getCategory()
      .subscribe(item => {
        this.categoryLength = item.length;
        console.log('category length::',this.categoryLength);
        if(this.categoryLength == 0){
          for (let i = 0; i < this.items.length; i++) {
            console.log('add category');
            self.apiService.addCategory(this.items[i]).subscribe();
          }
          this.getCategoryList();
        }else{
          this.categories = item;
        }

      });
  }

  getCategoryList(){
    let self=this;
    setTimeout(function(){
      self.apiService.getCategory()
      .subscribe(item => {
        self.categories = item;
      });
    }, 1000);
  }

  ngAfterViewChecked() {
    var self = this;
    $("ul.categoryList li").click(function(event){
          event.preventDefault();
          $('#search').val('');
          let categoryid = $('span',this).attr('categoryid');
          $('#categoryId').val(categoryid);
          self.router.navigate(['products']);
    });

  }

}
