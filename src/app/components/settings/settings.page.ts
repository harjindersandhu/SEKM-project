import { Component, OnInit } from '@angular/core';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import {AlertController, ToastController} from '@ionic/angular';
import {UserService} from '../../services/user.service';
import {JwtStorageService} from '../../services/jwt-storage.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  notification_time: any[] = [
    { id: '0', val: '24 ore prima', isChecked: false},
    { id: '1', val: '3 ore prima', isChecked: false},
    { id: '2', val: '1 ora prima', isChecked: false},
    { id: '3', val: '15 minuti prima', isChecked: false},
  ];
  enabled: boolean = true;
  check: boolean = false;
  save: boolean = true;
  constructor(private nativeStorage: NativeStorage, public toastController: ToastController,
              private _userService: UserService, private _tokenService: JwtStorageService, private router: Router,
              public alertController: AlertController){
  }

  ngOnInit() {

    this.nativeStorage.getItem('notification-time').then((res) => {
      if (res){
        this.notification_time = JSON.parse(res);
      }
    });
    this.nativeStorage.getItem('enabled').then((res) => {
      if (res){
        this.enabled = JSON.parse(res);
      }
    });
    this.nativeStorage.getItem('check').then((res) => {
      if (res){
        this.check = JSON.parse(res);
      }
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Le impostazioni sono state salvate. Le modifiche saranno applicate per le prossime prenotazioni.',
      duration: 3000,
      position: 'top',
      color: 'tertiary'
    });
    await toast.present();
  }

  async presentAlertDelete() {
    const alert = await this.alertController.create({
      cssClass: 'alert-style',
      header: 'Eliminazione Account',
      message: 'Vuoi cancellare definitivamente il profilo? (Verrai rimandato alla pagina di Log-In)',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
          }
        }, {
          text: 'Sì',
          handler: () => {
            let id = this._tokenService.getID();
            console.log(id);
            this._userService.deleteUser(id).subscribe(
              data => {
                this._tokenService.remove();
                this.nativeStorage.remove('notification-time');
                this.nativeStorage.remove('check');
                this.nativeStorage.remove('enabled');
                this.router.navigate(['/login']);
                return true;
              }
            );
          }
        }
      ]
    });
    await alert.present();
  }

  notification_toggle(){
    this.save = false;
    this.enabled = !this.enabled;
  }

  checkbox(){
    this.save = false;
  }

  save_settings(){
    this.save = true;
    this.presentToast().then(res => {
      this.nativeStorage.setItem('notification-time', JSON.stringify(this.notification_time))
        .then(
          () => console.log('Stored settings!'),
          error => console.error('Error storing settings', error)
        );
      this.nativeStorage.setItem('enabled', JSON.stringify(this.enabled))
        .then(
          () => console.log('Stored settings!'),
          error => console.error('Error storing settings', error)
        );
      this.nativeStorage.setItem('check', JSON.stringify(this.check))
        .then(
          () => console.log('Stored settings!'),
          error => console.error('Error storing settings', error)
        );
    });
  }

  isLoggedIn(): boolean{
    return this._tokenService.isLoggedIn();
  }
}
