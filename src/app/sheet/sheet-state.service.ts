import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { CellId, SheetState } from './sheet-state.model';
import { initialState } from './sheet-state.constants';
import { setCellValue, setCellError } from './sheet-state.updaters';
import {
  selectGrid,
  selectHorizontalHeader,
  selectVerticalHeader,
} from './sheet-state.selectors';

@Injectable({
  providedIn: 'root',
})
export class SheetStateService extends ComponentStore<SheetState> {
  readonly gridSize$ = this.select((state) => state.gridSize);
  readonly values$ = this.select((state) => state.values);
  readonly editableId$ = this.select((state) => state.editableId);
  readonly grid$ = this.select(this.gridSize$, selectGrid);
  readonly verticalHeader$ = this.select(this.gridSize$, selectVerticalHeader);
  readonly horizontalHeader$ = this.select(
    this.gridSize$,
    selectHorizontalHeader
  );

  constructor() {
    super(initialState);
    this.state$.subscribe(console.log);
  }

  setCellValue(value: string, id: CellId): void {
    try {
      this.patchState((state) => setCellValue(state, id, value));
    } catch (e) {
      this.patchState((state) => setCellError(state, id, value));
    }
  }
}
