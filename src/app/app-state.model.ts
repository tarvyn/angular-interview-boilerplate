export type CellId = `${number}|${number}`;

export interface AppState {
  gridSize: number;
  values: {
    [id: CellId]: {
      formula: string;
      value: string;
    }
  }
  editableId: CellId | null;
}
