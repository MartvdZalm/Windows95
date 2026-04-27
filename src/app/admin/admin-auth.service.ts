import { Injectable, inject } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { Observable, of, shareReplay, switchMap } from 'rxjs';

export type AdminClaimState =
  | { status: 'signed_out' }
  | { status: 'signed_in_not_admin'; user: User }
  | { status: 'admin'; user: User };

@Injectable({ providedIn: 'root' })
export class AdminAuthService {
  private readonly auth = inject(Auth);
  private static readonly ADMIN_UID = 'WZTJW46HUeWOB4Tucx1ydsyozYD2';

  public readonly user$ = authState(this.auth).pipe(
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  public readonly adminState$: Observable<AdminClaimState> = this.user$.pipe(
    switchMap((user) => {
      if (!user) return of({ status: 'signed_out' } as const);
      return of(
        user.uid === AdminAuthService.ADMIN_UID
          ? ({ status: 'admin', user } as const)
          : ({ status: 'signed_in_not_admin', user } as const),
      );
    }),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  public async signInWithEmailPassword(
    email: string,
    password: string,
  ): Promise<void> {
    await signInWithEmailAndPassword(this.auth, email, password);
  }

  public signOut(): Promise<void> {
    return signOut(this.auth);
  }
}
