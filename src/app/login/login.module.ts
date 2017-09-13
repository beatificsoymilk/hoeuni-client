import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Ng2BootstrapModule } from 'ng2-bootstrap';

@NgModule({
    imports: [CommonModule, RouterModule, FormsModule, HttpModule, Ng2BootstrapModule],
    declarations: [LoginComponent],
    exports: [LoginComponent]
})

export class LoginModule { }
