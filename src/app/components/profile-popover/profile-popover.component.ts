import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-profile-popover',
  templateUrl: './profile-popover.component.html',
  styleUrls: ['./profile-popover.component.scss'],
})
export class ProfilePopoverComponent implements OnInit {

  constructor(
    private navCtrl: NavController,
    private popover: PopoverController,
  ) {
   }

  ngOnInit() {}


  openEditProfile(){
    this.navCtrl.navigateForward('edit-profile');
    this.popover.dismiss();
  }



}
