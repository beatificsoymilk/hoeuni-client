import { Component, OnInit } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Router} from  '@angular/router';

/**
*  This class represents the lazy loaded LoginComponent.
*/

@Component({
  selector: 'app-login-cmp',
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
  id = '';
  password = '';
  alerts = [];

  constructor(private http: Http, private router: Router) {}

  ngOnInit() {
    this.http.post('/api/hello', {}, {}).subscribe();
  }

  login() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.post('/uaa/loginProcess', { id : this.id, password : this.password }, { headers: headers })
    .map(response => response.json())
    .subscribe(
      (response) => {
        if (response.success) {
          this.router.navigateByUrl(response.targetUrl);
        } else {
          this.alerts.push( { type: 'warning', msg: '로그인에 실패하였습니다.' } );
        }
      },
      (error) => { this.alerts.push( { type: 'danger', msg: error } ); },
    );
  }

  public closeAlert(i: number): void {
    this.alerts.splice(i, 1);
  }

}
