import { Component, OnInit, Inject} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
import {JwtStorageService} from "../../services/jwt-storage.service";
import {MenuController} from "@ionic/angular";
import {FingerprintAIO} from "@ionic-native/fingerprint-aio/ngx"

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  hide: boolean = true;
  loginForm : FormGroup;

  constructor(
    @Inject(LoginService) protected _authService: LoginService,
    private router: Router, 
    private _jwtStorageService: JwtStorageService,
    private menuCtrl: MenuController,
    private faio: FingerprintAIO) {
      this.loginForm = new FormGroup({
        email : new FormControl(null),
        password : new FormControl(null),
      }); }

  ngOnInit() {
    
  }

  ionViewWillEnter(){
    /**
     * If user already logged in, biometric login is applied
     */
     if(this._jwtStorageService.isLoggedIn()){
          this.biometricLogin();
      } else{
      this.menuCtrl.enable(false);
      }

  }

  login(): void {
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

  /**
   * Login using biometric
   */
   biometricLogin() {
    this.faio.isAvailable().then((result) => {
      if (result === "finger" || result === "face" || result === 'biometric') {
        // Fingerprint or Face Auth is available
        this.faio
          .show({
            title: "Fingerprint Login", 
            subtitle: "Fingerprint login", 
            description: "Per favore effettua il login", // optional | Default: null
            fallbackButtonTitle: "Usa PIN", // optional | When disableBackup is false defaults to "Use Pin".
            // When disableBackup is true defaults to "Cancel"
            disableBackup: true, // optional | default: false
          })
          .then((res: any) => {
            // Fingerprint/Face was successfully verified
            this.router.navigate(['/profile']);
          })
          .catch((error: any) => {
            error();
          });
      }
    });
   }

  
   

   
  
}
