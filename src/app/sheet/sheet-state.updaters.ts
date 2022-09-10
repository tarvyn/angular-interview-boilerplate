import {
  extractExecutable,
  isFormula,
  resolveCellReferences,
} from './sheet-state.utils';
import { CellId, SheetState } from './sheet-state.model';

export function setCellValue(
  state: SheetState,
  id: CellId,
  formula: string
): Partial<SheetState> {
  const value = calculateCellValue(formula, state.values);
  const { [id]: updatingCell, ...remainingCells } = state.values;
  const nextValues = {
    ...remainingCells,
    [id]: { formula, value },
  };
  const nextRemainingCells = updateCellsIteratively(nextValues);

  return {
    values: {
      ...nextRemainingCells,
      [id]: { formula, value },
    },
  };
}

export function setCellError(
  state: SheetState,
  id: CellId,
  formula: string
): Partial<SheetState> {
  return {
    values: {
      ...state.values,
      [id]: { formula, value: '#ERROR' },
    },
  };
}

function calculateCellValue(formula: string, cells: SheetState['values']): string {
  if (!isFormula(formula)) {
    return formula;
  }

  const executable = extractExecutable(formula);

  return eval(resolveCellReferences(executable, cells)).toString();
}

function updateCellsIteratively(
  cells: SheetState['values']
): SheetState['values'] {
  let hasChanged = false;

  const nextCells = Object.fromEntries(
    Object.entries(cells).map(([id, { formula, value }]) => {
      const nextValue = calculateCellValue(formula, cells);

      if (value !== nextValue) {
        hasChanged = true;
      }

      return [
        id,
        {
          formula,
          value: nextValue,
        },
      ];
    })
  );

  if (hasChanged) {
    return updateCellsIteratively(nextCells);
  }

  return nextCells;
}
