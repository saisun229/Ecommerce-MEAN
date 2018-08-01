

import { Component, OnInit } from '@angular/core';
import { APIService } from '../services/api.service';
import { Upload }    from './upload';
import { NgForm } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styles: [],
  providers: [ APIService ]
})

export class UploadComponenet implements OnInit{

  constructor(private apiService: APIService, private router: Router) { }
  categories = [];
  model = new Upload('', '', '','',1);
  ngOnInit() {
  //  new FormControl(field.fieldValue || '', [Validators.required, this.noWhitespaceValidator]);
  	let self=this;
    if(this.apiService.getCookie('userid')==""){
        this.router.navigate(['loginpopup']);
    }
    this.getCategoryList();

    $('#inputfile').change(function(e){
            self.readURL(this);
    });
  }

  getCategoryList(){
    this.apiService.getCategory()
      .subscribe(item => {
        this.categories = item;
      });
  }

   ngAfterViewChecked() {
     let self = this;
     $('.categoryCheckbox label:last-child input').attr('checked',true);

      /*$('#inputfile').change(function(e){
            //var fileName = e.target.files[0].name;
            //console.log('The file "' + fileName +  '" has been selected.');
            self.readURL(e.target);
      });*/
  }
  /*public noWhitespaceValidator(control: FormControl) {
      let isWhitespace = (control.value || '').trim().length === 0;
      let isValid = !isWhitespace;
      return isValid ? null : { 'whitespace': true }
  }*/
  addSubmit(f: NgForm) {
    let values = f.value;

    values.productname = values.productname.toString().trim();
    console.log('add item cccghcg::',values.productname);
    var categoryids = [];
    $.each($("input[name='category']:checked"), function(){
        categoryids.push($(this).attr('categoryid'));
    });
    let userid = this.apiService.getCookie('userid');
    values.sellerid = userid;
    values.categoryids = categoryids;
    values.imageid = $('#uploadImg').val();
//console.log('values.imageid',values.imageid);
    if(!values.imageid.length){
      alert('please choose the image file!');
      return false;
    }
    //this.readURL($('#inputfile')[0]);
    this.apiService.addProduct(values)
      .subscribe((res) => {
        console.log('add item response',res);
        let itemid = res.itemid;
        if(itemid){
          this.router.navigate(['myitems']);
          //window.location.reload();
        }else{
          alert('something went wrong');
          //this.router.navigate(['info']);
        }
      });
  }


  readURL(input) {
    let self = this;
      if (input.files && input.files[0]) {
        self.apiService.uploadImg(input.files[0]);
      }
  }

}
