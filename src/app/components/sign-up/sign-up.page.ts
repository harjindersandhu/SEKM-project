import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models/user.model";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {Observable} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  user = new User(null,null,null,null,null, null);
  addUserForm : FormGroup;
  hide : boolean = true;

  constructor(@Inject(UserService) private _usersService: UserService, private router: Router, private toastController: ToastController) { }

  ngOnInit() {
    this.addUserForm = new FormGroup({
      name : new FormControl(null, [Validators.required, Validators.maxLength(30),Validators.minLength(2)]),
      surname : new FormControl(null, [Validators.required, Validators.maxLength(30),Validators.minLength(2)]),
      email : new FormControl(null, [Validators.required, Validators.email]),
      address : new FormControl(null, [Validators.required]),
      password : new FormControl(null,[Validators.required])
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'La registrazione è stata effettuata! Puoi utilizzare le credeziali per accedere al servizio.',
      duration: 4000,
      position: 'top',
      color: 'tertiary'
    });
    await toast.present();
  }

  // POST Request for add a user
  createUser(): void{
    this.user.name = this.addUserForm.value['name'];
    this.user.surname = this.addUserForm.value['surname'];
    this.user.email  = this.addUserForm.value['email'];
    this.user.password = this.addUserForm.value['password'];
    this.user.address = this.addUserForm.value['address'];
    this._usersService.createUser(this.user).subscribe(
      data => {
        this.presentToast();
        this.router.navigate(['/login']);
        return true;
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if(err.status === 401) {
            this.router.navigate(['/login']);
          }
          if(err.status === 403) {
            this.router.navigate(['/login']);
          }
        }
        console.error("Error saving user!");
        return Observable.throw(err);
      }
    );
  }
  returnToLogin(){
    this.addUserForm.reset();
    this.router.navigate(['/login']);
  }

  //ERROR message for name
  getErrorMessageName() {
    return this.addUserForm.get('name').hasError('required') ? 'You must enter a value' :
      this.addUserForm.get('name').hasError('maxlength') ? 'Name cannot have more than 30 characters' :
        this.addUserForm.get('name').hasError('minlength') ? 'Name must have at least 2 characters' :
          '';
  }
  //ERROR message for surname
  getErrorMessageSurname() {
    return this.addUserForm.get('surname').hasError('required') ? 'You must enter a value' :
      this.addUserForm.get('surname').hasError('maxlength') ? 'Surname cannot have more than 30 characters' :
        this.addUserForm.get('surname').hasError('minlength') ? 'Surname must have at least 3 characters' :
          '';
  }
  //ERROR message for email
  getErrorMessageEmail() {
    return this.addUserForm.get('email').hasError('required') ? 'You must enter a value' :
      this.addUserForm.get('email').hasError('email') ? 'Not a valid email' :
        '';
  }
  //ERROR message for password
  getErrorMessagePassword()
  {
    return this.addUserForm.get('password').hasError('required') ? 'You must enter a value' :
      '';
  }

}
