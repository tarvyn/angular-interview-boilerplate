export type CellId = `${number}|${number}`;

export interface SheetState {
  gridSize: number;
  editableId: CellId | null;
  values: {
    [id: CellId]: {
      formula: string;
      value: string;
    };
  };
}
