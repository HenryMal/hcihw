import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class UserdataService {
  private userDataKey = 'userData';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  setUserData(data: any) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.userDataKey, JSON.stringify(data));
    }
  }

  getUserData(): any {
    if (isPlatformBrowser(this.platformId)) {
      const data = localStorage.getItem(this.userDataKey);
      return data ? JSON.parse(data) : null;
    }
    return null;
  }

  clearUserData() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.userDataKey);
    }
  }
}
