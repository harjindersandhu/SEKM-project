import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {JwtStorageService} from "../../services/jwt-storage.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import { BookingService } from 'src/app/services/booking.service';
import { Booking } from 'src/app/models/booking.model';
import { NavController, PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from '../profile-popover/profile-popover.component';
import { BookingEvent } from 'src/app/models/booking-event.model';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  private  userId: string;
  private user = new User(null,null,null,null,null, null);
  private canRender : boolean = false;
  //private hide: boolean = true;
  //private show: boolean = true;
  //userForm : FormGroup;
  //bookings: BookingEvent[];

  constructor(@Inject(UserService) private _usersService: UserService,
  @Inject(JwtStorageService) private _jwtStorageService: JwtStorageService,
  private router: Router,
  //public navCtrl: NavController,
  private popover: PopoverController,
  /*@Inject(BookingService) private _bookingService: BookingService*/) { }

  ngOnInit() {
    this.userId = this._jwtStorageService.getID();
    this.getUserById();
    //this.getBookings();

  }

  /* GET all bookings
  protected getBookings(){
    this._bookingService.getBookingByUserId(this.userId).subscribe(
      data => {
        this.bookings = data;
        console.log("Prenotazioni", data);
    })
  }*/

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

   /*Open booking clicked
  openBooking(bookingParam : Booking){
    this.navCtrl.navigateForward('booking', {queryParams: {idBooking: bookingParam.id}});
  }*/



}
