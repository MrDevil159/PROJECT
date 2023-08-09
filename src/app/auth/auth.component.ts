import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  constructor(private authService: AuthService,
    private router: Router) {}
  isLoginMode = true;
  isLoading = false;
  error:string | null = null;

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.isLoading = true;
    const email = form.value.email;
    const password = form.value.password;

    let authObs!: Observable<AuthResponseData>;

    if(this.isLoginMode) {
     authObs = this.authService.logIn(email, password);

    } else {
      authObs = this.authService.signUp(email, password)
    }

    authObs.subscribe({
      next: (resData) => {
        console.log(resData);
        this.isLoading=false;
        this.router.navigate(['/recipes']);
      },
      error: (err) => {
        console.error(err);
        this.error = err;
        this.isLoading=false;
      },
    });

    form.reset();
  }
}
