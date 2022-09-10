import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SheetStateService } from './sheet-state.service';
import { CellId } from './sheet-state.model';

@Component({
  standalone: true,
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.scss'],
  imports: [CommonModule],
  providers: [SheetStateService],
})
export class SheetComponent {
  readonly grid$ = this.appStateService.grid$;
  readonly horizontalHeader$ = this.appStateService.horizontalHeader$;
  readonly verticalHeader$ = this.appStateService.verticalHeader$;
  readonly editableId$ = this.appStateService.editableId$;
  readonly values$ = this.appStateService.values$;

  constructor(private readonly appStateService: SheetStateService) {}

  setEditableId(id: CellId, input: HTMLInputElement): void {
    this.appStateService.patchState({
      editableId: id,
    });

    requestAnimationFrame(() => {
      input.focus();
    });
  }

  clearEditableId(): void {
    this.appStateService.patchState({
      editableId: null,
    });
  }

  setCellValue(formula: string, id: CellId): void {
    this.appStateService.setCellValue(formula, id);
  }
}
