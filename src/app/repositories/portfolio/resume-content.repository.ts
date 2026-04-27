import {
  Injectable,
  Injector,
  inject,
  runInInjectionContext,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Firestore, doc, onSnapshot, setDoc } from '@angular/fire/firestore';
import { ResumeContent } from '../../models/portfolio/resume-content.model';

@Injectable({ providedIn: 'root' })
export class ResumeContentRepository {
  private readonly firestore = inject(Firestore);
  private readonly injector = inject(Injector);
  private readonly resumeDocRef = doc(this.firestore, 'siteConfig/resume');

  public getResumeContent$(): Observable<ResumeContent | undefined> {
    return new Observable<ResumeContent | undefined>((subscriber) => {
      const unsubscribe = runInInjectionContext(this.injector, () =>
        onSnapshot(
          this.resumeDocRef,
          (snapshot) =>
            subscriber.next(snapshot.data() as ResumeContent | undefined),
          (error) => subscriber.error(error),
        ),
      );

      return () => unsubscribe();
    });
  }

  public saveResumeContent(content: ResumeContent): Promise<void> {
    return setDoc(
      this.resumeDocRef,
      {
        ...content,
        updatedAt: new Date().toISOString(),
      },
      { merge: true },
    );
  }
}
