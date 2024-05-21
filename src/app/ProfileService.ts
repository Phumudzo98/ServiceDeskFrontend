import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private profileImageUrlSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  profileImageUrl$ = this.profileImageUrlSubject.asObservable();

  constructor() {}

  updateProfileImage(imageUrl: string): void {
    this.profileImageUrlSubject.next(imageUrl);
  }
}
