import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private count = 0;
  private spinner$ = new BehaviorSubject<string>('');
  //Way 2
  private isLoading$: Observable<boolean> = this.spinner$.pipe(
    switchMap( value =>{
     if(value !== 'start'){
       return of(false)
     }
     return of(true).pipe(delay(500))
    })
   );
  private timeOut: any;

  constructor() { }

  // Way 1
  getSpinnerObserver(): Observable<string> {
    return this.spinner$.asObservable();
  }

  getIsLoading(): Observable<boolean> {
    return this.isLoading$;
  }

  requestStarted() {
    if (++this.count === 1) {
      //this.timeOut = setTimeout(() => {
        this.spinner$.next('start');
      //}, 1000);
    }
  }

  requestEnded() {
    if (this.count === 0 || --this.count === 0) {
      this.spinner$.next('stop');
      //clearTimeout(this.timeOut)
    }
  }

  resetSpinner() {
    this.count = 0;
    this.spinner$.next('stop');
  }

}
