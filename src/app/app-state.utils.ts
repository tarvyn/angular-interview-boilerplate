import { AppState, CellId } from './app-state.model';

export function idToCoordinates(id: CellId): Record<'row' | 'column', number> {
  const [row, column] = id.split('|');

  return { row: parseInt(row), column: parseInt(column) };
}

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
  cellsMap: AppState['values']
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
