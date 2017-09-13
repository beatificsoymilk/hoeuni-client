import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from  '@angular/router';

declare var $: any;

@Component({
    selector: 'app-top-nav',
    templateUrl: 'topnav.html',
})

export class TopNavComponent {

  constructor(private http: Http, private router: Router) {}

  changeTheme(color: string): void {
    let link: any = $('<link>');
    link
      .appendTo('head')
      .attr({type : 'text/css', rel : 'stylesheet'})
      .attr('href', 'themes/app-' + color + '.css');
  }

  rtl(): void {
    let body: any = $('body');
    body.toggleClass('rtl');
  }

  sidebarToggler(): void  {
    let sidebar: any = $('#sidebar');
    let mainContainer: any = $('.main-container');
    sidebar.toggleClass('sidebar-left-zero');
    mainContainer.toggleClass('main-container-ml-zero');
  }

  logout(): void {

    this.http.post('/uaa/logout', {}, {})
    .forEach(response => console.log(response));
    this.router.navigateByUrl('/login');
  }
}
