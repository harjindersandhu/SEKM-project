import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingEvent } from '../models/booking-event.model';
import { Booking } from '../models/booking.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private bookings: string = 'http://localhost:8000/bookings';
  private booking: string = 'http://localhost:8000/booking';
  //private bookings: string = 'https://961eb56983b7.ngrok.io/bookings';
  //private booking: string = 'https://961eb56983b7.ngrok.io/booking';

  constructor(@Inject(HttpClient) protected http: HttpClient) { }

  // send a GET request for bookings
  public getBookingByUserId(userId): Observable<BookingEvent[]>{
    return this.http.get<any>(this.bookings + "/" + userId);
  }
  // send a GET request for booking with id
  public getBookingById(id: number): Observable<Booking>{
    return this.http.get<any>(this.booking + "/" + id);
  }
  // send a POST request to the API to create a new Booking
  public addBooking(booking): Observable<BookingEvent> {
    // Setting different timezone issue
    let event = {... booking};
    event.start.setHours(event.start.getHours() + 2);
    event.end.setHours(event.end.getHours() + 2);

    const body = JSON.stringify(event);
    return this.http.post<BookingEvent>(this.bookings, body, httpOptions);
  }

  // send a PUT request to the API to update a data object
  public updateBooking(booking): Observable<BookingEvent> {
    // Setting different timezone issue
    let event = {... booking};
    event.start.setHours(event.start.getHours() + 2);
    event.end.setHours(event.end.getHours() + 2);
    const body = JSON.stringify(event);
    return this.http.put<BookingEvent>(this.booking + '/' + booking.id, body, httpOptions);
  }

  // send a DELETE request to the API to delete a data object
  public deleteBooking(bookingId): Observable<BookingEvent> {
    return this.http.delete<BookingEvent>(this.booking + '/' + bookingId);
  }




}
