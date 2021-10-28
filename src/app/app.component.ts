import {Component, Inject} from '@angular/core';
import {JwtStorageService} from "./services/jwt-storage.service";
import {Router} from "@angular/router";
import {MenuController} from "@ionic/angular";


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(@Inject(JwtStorageService) private _jwtStorageService: JwtStorageService, private router: Router, private menuCtrl: MenuController) {
  }

  logout(): void {
    this._jwtStorageService.remove();
    this.menuCtrl.enable(false);
    this.router.navigate(['/login']);
  }
  login(): void{
    this._jwtStorageService.removeNoAccountUser();
    this.menuCtrl.enable(false);
    this.router.navigate(['/login']);
  }

  checkToken(): boolean{
    return this._jwtStorageService.isLoggedIn();
  }
}
