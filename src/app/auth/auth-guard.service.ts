import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { Injectable, inject } from "@angular/core";
import { Observable, map, take } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private authService: AuthService,
    private router:Router) {}

  canActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> => {

    return this.authService.user.pipe(take(1),
        map(user=>
            {
                const isAuth = !!user;
                if(isAuth) {
                    return true;
                }
                return this.router.createUrlTree(['/auth'])
            })
    );
  }
}
