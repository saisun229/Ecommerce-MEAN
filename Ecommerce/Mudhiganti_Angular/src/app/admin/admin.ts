
export interface Profile {
	firstname?: string,
	lastname?: string,
	password?: string,
	email?: string,
	mobile?: string,
	address?: string,
	ok?: boolean
}

export class Updateuser {

  constructor(
    public firstname: string,
    public lastname: string,
    public password: string,
    public email: string,
    public mobile: string,
    public address: string,
    public ok?: boolean
    
  ) {  }

}