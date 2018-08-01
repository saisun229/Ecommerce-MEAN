export class Products {

  constructor(
    public firstName: string,
    public lastName: string,
    public categoryids?: [string]
    
  ) {  }

}

export class Message {

  constructor(
    public itemid: string,
    public sender: string,
    public receiver: string,
    public message: string
    
  ) {  }

}


export class Buynow {

  constructor(
    
    public price: string, 
    public card: string,
    public cvv: string,
    public month?: string,
    public year?: string
    
  ) {  }

}

export class BuyProduct {

  constructor(
    
    public userid: string,
    public amount: string,
    public sellerid?: string,
    public itemid?: string
    
  ) {  }

}

