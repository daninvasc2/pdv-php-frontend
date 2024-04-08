import { Component, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  constructor(private http: HttpClient) { }
  title = 'pdv-php-frontend';

  apiCall() {
    this.http.get('http://localhost:8080/api/produtos').subscribe(data => {
      console.log(data);
    });
  }
}
