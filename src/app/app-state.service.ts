import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { AppState } from './app-state.model';
import { initialState } from './app-state.constants';

@Injectable({
  providedIn: 'root',
})
export class AppStateService extends ComponentStore<AppState> {
  constructor() {
    super(initialState);
  }
}
