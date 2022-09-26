import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { SpinnerService } from "src/app/spinner/spinner.service";

@Injectable({
    providedIn: 'root'
  })
export class MyHttpInterceptor implements HttpInterceptor {
  
    constructor(private spinnerService: SpinnerService) {
       
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.spinnerService.requestStarted();
        return this.handle(req, next);
    }

    handle(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
        .pipe(
            tap(
                (event) => {
                    if(event instanceof HttpResponse){
                        console.log(event)
                        this.spinnerService.requestEnded();
                    }
                },
                (error: HttpErrorResponse) => {
                    this.spinnerService.resetSpinner();
                    throw new Error("Error" + error.message);
                }
            ),
        );
    }

}