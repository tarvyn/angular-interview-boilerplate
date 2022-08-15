import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { AppState, CellId } from './app-state.model';
import { initialState } from './app-state.constants';
import { coordinatesToId, resolveCellReferences } from './app-state.utils';

@Injectable({
  providedIn: 'root',
})
export class AppStateService extends ComponentStore<AppState> {
  readonly gridSize$ = this.select((state) => state.gridSize);
  readonly values$ = this.select((state) => state.values);
  readonly editableId$ = this.select((state) => state.editableId);
  readonly grid$ = this.select(this.gridSize$, (gridSize) => {
    const grid = Array(gridSize)
      .fill(null)
      .map((...[, row]) =>
        Array(gridSize)
          .fill(null)
          .map((...[, column]) => coordinatesToId({ row, column }))
      );

    return grid;
  });
  readonly horizontalHeader$ = this.select(this.gridSize$, (gridSize) => {
    return Array(gridSize)
      .fill(null)
      .map((...[, index]) => String.fromCharCode(65 + index));
  });
  readonly verticalHeader$ = this.select(this.gridSize$, (gridSize) => {
    return Array(gridSize)
      .fill(null)
      .map((...[, index]) => index + 1);
  });

  constructor() {
    super(initialState);
    this.state$.subscribe(console.log);
  }

  applyFormula(formula: string, id: CellId): void {
    try {
      this.patchState((state) => {
        const value = eval(resolveCellReferences(formula, state.values));
        const { [id]: updatingCell, ...remainingCells } = state.values;
        const nextValues = {
          ...remainingCells,
          [id]: { formula, value },
        };
        const nextRemainingCells = Object.fromEntries(
          Object.entries(remainingCells).map(([id, { formula, value }]) => [
            id,
            {
              formula,
              value: eval(resolveCellReferences(formula, nextValues)),
            },
          ])
        );

        return {
          values: {
            ...nextRemainingCells,
            [id]: { formula, value },
          },
        };
      });
    } catch (e) {}
  }
}
