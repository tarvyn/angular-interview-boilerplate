import { CellId, SheetState } from './sheet-state.model';

export function coordinatesToId(
  coordinates: Record<'row' | 'column', number>
): CellId {
  return `${coordinates.row}|${coordinates.column}`;
}

export function referenceToId(reference: string): CellId {
  const [char, row] = reference.split('');
  const column = char.charCodeAt(0) - 65;

  return coordinatesToId({ row: parseInt(row) - 1, column });
}

export function resolveCellReferences(
  formula: string,
  cellsMap: SheetState['values']
): string {
  const cellReferences = formula.match(/([a-zA-Z]\d)/g);

  if (!cellReferences) {
    return formula;
  }

  return cellReferences.reduce((result, ref) => {
    const cellId = referenceToId(ref);

    return result.replaceAll(ref, cellsMap[cellId]?.value ?? '');
  }, formula);
}

export function createArray(size: number) {
  return Array(size).fill(null);
}

export function extractExecutable(formula: string): string {
  return formula.replace('=', '');
}

export function isFormula(value: string): boolean {
  return value.startsWith('=');
}
