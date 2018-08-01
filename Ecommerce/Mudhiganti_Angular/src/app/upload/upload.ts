export class Upload {

  constructor(
    public userid: string,
    public keywords: string,
    public description: string,
    public productname: string,
    public price: number,
    public categoryids?: [string],
    public itemid?:string,
    public successmsg?:string,
    public imageid?: string
    
  ) {  }

}


export class UpdateItem {

  constructor(
  	public itemid:string,
    public keywords: string,
    public description: string,
    public productname: string,
    public price: number,
    public status: [string],
    public categoryids?: [string]    
    
  ) {  }

}

export class FileObj {

  constructor(
  	public itemid:string,
    public keywords: string,
    public description: string,
    public productname: string,
    public price: number,
    public status: [string],
    public categoryids?: [string]    
    
  ) {  }

}



