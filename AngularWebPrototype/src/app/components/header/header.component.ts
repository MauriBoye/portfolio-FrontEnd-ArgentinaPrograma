import { Component } from '@angular/core';
import { StorageService } from '../../_services/storage.service';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  username?: string;
  constructor(private storageService: StorageService, private authService: AuthService) { }
  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.username = user.username;
    }
  }
  logout(): void {
    this.authService.logout().subscribe({
      
      next: res => {
        console.log(res);
        this.isLoggedIn = false;
        window.sessionStorage.clear();
      },
      error: err => {
        console.log(err);
      }
    });
    this.isLoggedIn = false;
    window.sessionStorage.clear();
    window.location.reload();
  }
}
