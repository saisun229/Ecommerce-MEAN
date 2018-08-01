import { Injectable } from '@angular/core';
export class LoginPopup {

  constructor(
    public email: string,
    public password: string,
    public userid: string,
    public firstname?: string,
    public isAdmin?:boolean,
    public amount?:number
  ) {  }
  test(msg){
  	console.log('error occured',msg);
  }

}

export class Newuser {

  constructor(
    public firstname: string,
    public lastname: string,
    public password: string,
    public email: string,
    public mobile: number,
    public address: string,
    public userid: string,
    public isAdmin?:boolean,
    public amount?:number
    
  ) {  }
  test(msg){
  	console.log('error occured',msg);
  }

}

@Injectable()
export class UserInfo {

  constructor(
    public firstname: string,
    public userid: string,
    public email: string    
  ) {  }

}
