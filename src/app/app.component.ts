import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';


interface EMPLOYEE {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  jsonURL = 'assets/data.json'
  loaded = false;
  users: EMPLOYEE[] = [];

  constructor(private httpClient: HttpClient){}

  ngOnInit(){
    //load()
  }

  public getJSON(): Observable<any> {
    return this.httpClient.get(this.jsonURL);
  }

  public load(){
    this.users = [];
    this.getJSON().subscribe(data =>{
      console.log(data);
      if(data){
        this.users = data;
        this.loaded = true;
      }
    })
  }
  
}
