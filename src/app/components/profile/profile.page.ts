import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {JwtStorageService} from "../../services/jwt-storage.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import { NavController, PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from '../profile-popover/profile-popover.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  private  userId: string;
  private user = new User(null,null,null,null,null, null);
  private canRender : boolean = false;


  constructor(@Inject(UserService) private _usersService: UserService,
  @Inject(JwtStorageService) private _jwtStorageService: JwtStorageService,
  private router: Router,
  private popover: PopoverController,
  ) { }

  ngOnInit() {
    this.userId = this._jwtStorageService.getID();
    this.getUserById();

  }


  // GET Request for user selected
  protected getUserById(): void {
    this._usersService.getUserByID(this.userId).subscribe(
      data => {
        this.user = data;
        console.log(this.user);
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

  // Open popover
  async openPopover(event){
    const popover = await this.popover.create({
      component: ProfilePopoverComponent,
      event,
    })
    await popover.present();
  }



}
