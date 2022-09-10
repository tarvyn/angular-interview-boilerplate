import { coordinatesToId, createArray } from './sheet-state.utils';
import { CellId } from './sheet-state.model';

export function selectGrid(gridSize: number): CellId[][] {
  return createArray(gridSize).map((...[, row]) =>
    createArray(gridSize).map((...[, column]) =>
      coordinatesToId({ row, column })
    )
  );
}

export function selectHorizontalHeader(gridSize: number): string[] {
  return createArray(gridSize).map((...[, index]) =>
    String.fromCharCode(65 + index)
  );
}

export function selectVerticalHeader(gridSize: number): number[] {
  return createArray(gridSize).map((...[, index]) => index + 1);
}
