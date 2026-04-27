import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminAuthService } from '../admin-auth.service';
import { take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  imports: [FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss',
})
export class AdminLoginComponent implements OnInit {
  private readonly adminAuth = inject(AdminAuthService);
  private readonly router = inject(Router);

  protected isSigningIn = false;
  protected emailInput = '';
  protected passwordInput = '';

  public ngOnInit(): void {
    this.adminAuth.adminState$.pipe(take(1)).subscribe((state) => {
      if (state.status === 'admin') {
        this.router.navigateByUrl('/admin');
      }
    });
  }

  protected async login(): Promise<void> {
    this.isSigningIn = true;
    try {
      await this.adminAuth.signInWithEmailPassword(
        this.emailInput.trim(),
        this.passwordInput,
      );
    } finally {
      this.isSigningIn = false;
      this.router.navigateByUrl('/admin');
    }
  }

  protected async logout(): Promise<void> {
    await this.adminAuth.signOut();
  }
}
