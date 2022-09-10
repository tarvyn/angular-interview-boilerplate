import { SheetState } from './sheet-state.model';
import { setCellValue } from './sheet-state.updaters';

const emptyState = {
  values: {},
} as SheetState;

describe('applyFormula function', () => {
  it('should return an updated state with an evaluated formula', () => {
    const { values } = setCellValue(emptyState, '1|1', '=1+1');

    expect(values).toEqual({ '1|1': { formula: '=1+1', value: '2' } });
  });

  it('should return an updated state with an evaluated formula referencing other cells', () => {
    const state = {
      values: {
        '1|1': {
          formula: '2',
          value: '2',
        },
      },
    };
    const { values } = setCellValue(state as any, '1|2', '=B2+2');

    expect(values).toEqual({
      ...state.values,
      '1|2': { formula: '=B2+2', value: '4' },
    });
  });

  it('should return an updated state with recalculated cells referencing updated cell', () => {
    const state = {
      values: {
        '1|1': {
          formula: '2',
          value: '2',
        },
        '1|2': {
          formula: '=B2+2',
          value: '4',
        },
        '1|3': {
          formula: '=B2+C2',
          value: '6',
        },
      },
    };
    const { values } = setCellValue(state as any, '1|1', '3');

    expect(values).toEqual({
      '1|1': {
        formula: '3',
        value: '3',
      },
      '1|2': {
        formula: '=B2+2',
        value: '5',
      },
      '1|3': {
        formula: '=B2+C2',
        value: '8',
      },
    });
  });

  it('should throw if an evaluated formula has syntax errors', () => {
    expect(() => setCellValue(emptyState, '1|1', '=z7')).toThrow();
  });
});
