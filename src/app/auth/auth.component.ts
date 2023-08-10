import { Component, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnDestroy {
  constructor(private authService: AuthService,
    private router: Router) {}
  isLoginMode = true;
  isLoading = false;
  error:string | null = null;
  private closeSub!:Subscription;
  @ViewChild(PlaceholderDirective, {static: false}) alertHost!: PlaceholderDirective

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
        this.showErrorAlert(err);
        this.isLoading=false;
      },
    });

    form.reset();
  }

  onHandleError() {
    this.error = null;
  }

  private showErrorAlert(message: string) {
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(AlertComponent)
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
  ngOnDestroy(): void {
      if(this.closeSub) {
        this.closeSub.unsubscribe();
      }
  }
}
