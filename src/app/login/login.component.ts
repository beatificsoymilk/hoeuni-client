import {Component, OnInit} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Router} from '@angular/router';

/**
*  This class represents the lazy loaded LoginComponent.
*/

@Component({
  selector: 'app-login-cmp',
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
  id = 'beatific';
  password = '1234567';
  alerts = [];

  constructor(private http: Http, private router: Router) {}

  ngOnInit() {

    if (this.isNotExistsXsrfCookie()) {
      this.http.post('/api/hello', {}, {}).subscribe();
    }
  }

  private isNotExistsXsrfCookie() {
    let ca: Array<string> = document.cookie.split(';');
    let caLen: number = ca.length;
    let cookieName = 'XSRF-TOKEN=';
    let c: string;

    console.log(document.cookie);
    for (let i = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s+/g, '');
      console.log(c);
      if (c.indexOf(cookieName) === 0) {
        return false;
      }
    }
    return true;
  }

  login() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.post('/uaa/loginProcess', {id: this.id, password: this.password}, {headers: headers})
      .map(response => response.json())
      .subscribe(
      (response) => {
        if (response.success) {
          this.router.navigateByUrl(response.targetUrl);
        } else {
          this.alerts.push({type: 'warning', msg: '濡쒓렇�씤�뿉 �떎�뙣�븯���뒿�땲�떎.'});
        }
      },
      (error) => {this.alerts.push({type: 'danger', msg: error});},
    );
  }

  public closeAlert(i: number): void {
    this.alerts.splice(i, 1);
  }

}
