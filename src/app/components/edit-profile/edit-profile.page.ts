import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Observable} from "rxjs";
import { User } from 'src/app/models/user.model';
import { JwtStorageService } from 'src/app/services/jwt-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  private  userId: string;
  private user = new User(null,null,null,null,null, null);
  canRender : boolean = false;
  hide: boolean = true;
  show: boolean = true;
  userForm : FormGroup;

  constructor(
    @Inject(UserService) private _usersService: UserService,
    @Inject(JwtStorageService) private _jwtStorageService: JwtStorageService,
    private router: Router) { }

  ngOnInit() {
    this.userId = this._jwtStorageService.getID();
    this.getUserById();
  }

  // GET Request for user selected
  protected getUserById(): void {
    this._usersService.getUserByID(this.userId).subscribe(
      data => {
        this.user = data;
        this.userForm = new FormGroup({
          name: new FormControl(this.user.name, [Validators.required, Validators.maxLength(30), Validators.minLength(2)]),
          surname: new FormControl(this.user.surname, [Validators.required, Validators.maxLength(30), Validators.minLength(2)]),
          email: new FormControl(this.user.email, [Validators.required, Validators.email]),
          address: new FormControl(this.user.address, [Validators.required]),
          password: new FormControl(this.user.password)
        });
        this.canRender = true;
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['/login']);
          }
          if (err.status === 403) {
            this.router.navigate(['/login']);
          }
        }
      },
      () => console.log('done loading user'),
    );
  }

  //PUT Request for update user
  protected updateUser(): void{
    this.user.name = this.userForm.value['name'];
    this.user.surname = this.userForm.value['surname'];
    this.user.email  = this.userForm.value['email'];
    this.user.password = this.userForm.value['password'];
    this.user.address = this.userForm.value['address'];
    this._usersService.updateUser(this.user).subscribe(
      data => {
        this.router.navigate(['/profile']);
        return true;
      },
      error => {
        console.error("Error saving user!");
        return Observable.throw(error);
      }
    );
  }

  //SHOW password field
  protected pswField(): void {
    this.show = !this.show;
  }
  // Error message for name
  getErrorMessageName() {
    return this.userForm.get('name').hasError('required') ? 'Devi inserire un nome' :
      this.userForm.get('name').hasError('maxlength') ? 'Il nome non può avere più di 30 caratteri' :
        this.userForm.get('name').hasError('minlength') ? 'Il nome deve avere almeno 2 caratteri' :
          '';
  }
  // Error message for surname
  getErrorMessageSurname() {
    return this.userForm.get('surname').hasError('required') ? 'Devi inserire un cognome' :
      this.userForm.get('surname').hasError('maxlength') ? 'Il cognome non può avere più di 30 caratteri' :
        this.userForm.get('surname').hasError('minlength') ? 'Il cognome deve avere almeno 2 caratteri' :
          '';
  }
  // Error message for email
  getErrorMessageEmail() {
    return this.userForm.get('email').hasError('required') ? 'Devi inserire una mail' :
      this.userForm.get('email').hasError('email') ? 'La mail deve essere valida' :
        '';
  }

}
