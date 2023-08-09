import {
  Component,
  OnInit,
  OnDestroy,
  EventEmitter,
  Output,
} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub!: Subscription;
  isAuthenticated = false;
  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(
      user => {
        this.isAuthenticated = !user ? false : true;
      }
    );
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
  onLogout() {
    this.authService.logout();
  }
  onSaveData() {
    this.dataStorageService.storeRecipe();
  }
  onFetchData() {
    this.dataStorageService.fetchRecipe().subscribe();
  }
}
