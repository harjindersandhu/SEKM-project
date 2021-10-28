export class User{
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  address: string;

  constructor(id?: number, name?: string, surname?: string, email?: string, password?: string, address?: string) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password = password;
    this.address = address;
  }
}
