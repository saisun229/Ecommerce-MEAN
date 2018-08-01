export class Category {

  constructor(
    public userid?: string,
    public keywords?: string,
    public latest?: string,
    public categoryids?: string
    
  ) {  }

}

export class AddCategory {

  constructor(
    public categroryDesc: string   
  ) {  }

}

