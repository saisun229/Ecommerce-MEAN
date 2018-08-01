
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
declare var $: any;


import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';

import { Login } from '../login/login';
import { Category, AddCategory } from '../category/category';
import { MyProfile } from '../myprofile/myprofile';
import { LoginPopup, Newuser, UserInfo } from '../loginpopup/loginpopup';

import { MyItems, Update, Delete } from '../myitems/myitems';

import { Products, Message, BuyProduct } from '../products/products';
import { Updateuser, Profile } from '../profile/profile';

import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { Upload, FileObj } from '../upload/upload';
import { searchObj, UserObj }    from '../header/header';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token',
    'Access-Control-Allow-Origin': '*'
  })
};

const httpOptionsImg = {
  headers: new HttpHeaders({
    'Content-Type':  'multipart/form-data',
    'Authorization': 'my-auth-token',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable()
export class APIService {
  loginUrl = 'http://localhost:3000/login';  // URL to web api
  signupUrl = 'http://localhost:3000/signup';
  deleteItemUrl = 'http://localhost:3000/deleteproduct';
  getProductsUrl = 'http://localhost:3000/getavailableproducts?userid=';
  getItemUrl = 'http://localhost:3000/getproduct?itemid=';

  downloadImgUrl = 'http://localhost:3000/downloadimage?id=';
  getUserUrl = 'http://localhost:3000/getuser?userid=';
  updateUserUrl = 'http://localhost:3000/updateuser';
  addProductUrl = 'http://localhost:3000/addproduct';
  searchUrl = 'http://localhost:3000/searchproducts';
  updateProductUrl = 'http://localhost:3000/updateproduct?itemid=';
  getCategoryUrl = 'http://localhost:3000/getcategories';
  addCategoryUrl = 'http://localhost:3000/addcategory';
  uploadImgUrl = 'http://localhost:3000/uploadImage';
  soldItemUrl = 'http://localhost:3000/getsoldproducts?userid=';
  getMessagesUrl = 'http://localhost:3000/getmessages?userid='
  sendMessageUrl = 'http://localhost:3000/sendMesage';
  getAllUsersUrl = 'http://localhost:3000/getallusers';
  buyUrl = 'http://localhost:3000/buyproduct';




  //loginUrl = 'api/test';
  private handleError: HandleError;
  private itemid: '';

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('HeroesService');
  }

  //////// Save methods //////////


  buyNow(user: BuyProduct): Observable<BuyProduct> {
    return this.http.post<BuyProduct>(this.buyUrl, user, httpOptions)
      .pipe(
        catchError(this.handleError('buy', user))
      );
  }

  getAllUser (): Observable<Profile[]> {
    return this.http.get<Profile[]>(this.getAllUsersUrl)
      .pipe(
        catchError(this.handleError('getUser', []))
      );
  }

  /** POST: add a new hero to the database */
  login(user: LoginPopup): Observable<LoginPopup> {
    console.log('user::',user);
    return this.http.post<LoginPopup>(this.loginUrl, user, httpOptions)
      .pipe(
        catchError(this.handleError('login', user))
      );
  }
  /** POST: add a new hero to the database */
  signup(user: Newuser): Observable<Newuser> {
    console.log('user::',user);
    return this.http.post<Newuser>(this.signupUrl, user, httpOptions)
      .pipe(
        catchError(this.handleError('signup', user))
      );
  }

  getsoldProducts (userid): Observable<Products[]> {
    return this.http.get<Products[]>(this.soldItemUrl+userid)
      .pipe(
        catchError(this.handleError('getsoldProducts', []))
      );
  }

  uploadImg(img: File) {
    var formData: FormData = new FormData();
    formData.append("image", img, img.name);

    var xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", (ev: ProgressEvent) => {

    });
    xhr.open("POST", this.uploadImgUrl, true);

    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let resobj = JSON.parse(this.responseText);
        $('#uploadImg').val(resobj.id);
      }
    };

    xhr.send(formData);
  }

  addCategory(category: AddCategory): Observable<AddCategory> {
    console.log('user::',category);
    return this.http.post<AddCategory>(this.addCategoryUrl, category, httpOptions)
      .pipe(
        catchError(this.handleError('signup', category))
      );
  }

  getCategory (): Observable<Products[]> {
    return this.http.get<Products[]>(this.getCategoryUrl)
      .pipe(
        catchError(this.handleError('getCategory', []))
      );
  }

  sendMessage(msg: Message): Observable<Message> {
    console.log('user::',msg);
    return this.http.post<Message>(this.sendMessageUrl, msg, httpOptions)
      .pipe(
        catchError(this.handleError('signup', msg))
      );
  }

  getMessages (userid): Observable<Message[]> {
    return this.http.get<Message[]>(this.getMessagesUrl+userid)
      .pipe(
        catchError(this.handleError('getMessages', []))
      );
  }


  deleteProduct(key: Delete): Observable<Delete> {
    console.log('user::',key);
    return this.http.delete<Delete>(this.deleteItemUrl+'?itemid='+key.itemid, httpOptions)
      .pipe(
        catchError(this.handleError('searchProducts', key))
      );
  }
  getAvailableProducts (userid): Observable<Products[]> {
    return this.http.get<Products[]>(this.getProductsUrl+userid)
      .pipe(
        catchError(this.handleError('getAvailableProducts', []))
      );
  }
  getItem (itemid): Observable<Products[]> {
    return this.http.get<Products[]>(this.getItemUrl+itemid)
      .pipe(
        catchError(this.handleError('getItem', []))
      );
  }
  downloadImg (imgid): Observable<Products[]> {
    return this.http.get<Products[]>(this.downloadImgUrl+imgid)
      .pipe(
        catchError(this.handleError('downloadImg', []))
      );
  }

  getUser (userid): Observable<Profile[]> {
    return this.http.get<Profile[]>(this.getUserUrl+userid)
      .pipe(
        catchError(this.handleError('getUser', []))
      );
  }

  updateUser (user: Updateuser): Observable<Updateuser> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');

    return this.http.put<Updateuser>(this.updateUserUrl, user, httpOptions)
      .pipe(
        catchError(this.handleError('updateUser', user))
      );
  }

  addProduct(item: Upload): Observable<Upload> {
    console.log('user::',item);
    return this.http.post<Upload>(this.addProductUrl, item, httpOptions)
      .pipe(
        catchError(this.handleError('addProduct', item))
      );
  }

  /** POST: add a new hero to the database */
  searchProduct(item: searchObj): Observable<searchObj> {
    console.log('user::',item);
    return this.http.post<searchObj>(this.searchUrl, item, httpOptions)
      .pipe(
        catchError(this.handleError('searchProduct', item))
      );
  }

  updateProduct (user: Upload): Observable<Upload> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');

    return this.http.put<Upload>(this.updateProductUrl+user.itemid, user, httpOptions)
      .pipe(
        catchError(this.handleError('updateProduct', user))
      );
  }



  setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  getCookie(cname){
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
  }
  deleteCookie(cname){
    this.setCookie(cname,"",-1);
  }

}
