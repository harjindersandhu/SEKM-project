import { Component, OnInit, Inject} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
import {JwtStorageService} from "../../services/jwt-storage.service";
import {MenuController} from "@ionic/angular";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  hide: boolean = true;
  loginForm : FormGroup;

  constructor(@Inject(LoginService) protected _authService: LoginService, private router: Router, private _jwtStorageService: JwtStorageService, private menuCtrl: MenuController) { }

  ngOnInit() {
    if(this._jwtStorageService.isLoggedIn()){
      this.router.navigate(['/profile']);
    }
    else{
      this.menuCtrl.enable(false);
      this.loginForm = new FormGroup({
        email : new FormControl(null),
        password : new FormControl(null),
      });
    }
  }

  LogIn(): void {
    let credentials = { "email": this.loginForm.value['email'], "password": this.loginForm.value['password'] };
    this._authService.login(credentials).subscribe(
      res => {
        console.log(res);
        this._jwtStorageService.store(res.token);
        if(this._jwtStorageService.noAccountUser())
        {
          this._jwtStorageService.removeNoAccountUser();
        }
        this.menuCtrl.enable(true);
        this.router.navigate(['/profile']);
      },
      error => {
        console.error("Error saving during login!");
      }
    );
  }
  
}
