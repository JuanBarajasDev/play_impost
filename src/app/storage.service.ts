import { Inject, Injectable, InjectionToken, inject } from '@angular/core';

export const BROWSER_STORAGE = new InjectionToken<Storage>('browser storage', {
    providedIn: 'root',
    factory: () => localStorage
  })
  
  @Injectable({
    providedIn: 'root'
  })
export class BrowserStorageService{

    public storage = inject(BROWSER_STORAGE)
    
    get(key: string): string | null {
        return this.storage.getItem(key)
    }
    
    set(key: string, value: string): void{
        this.storage.setItem(key, JSON.stringify(value))
    }
    remove(key: string): void{
      this.storage.removeItem(key)
    }
}

