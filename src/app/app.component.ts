import { Component } from '@angular/core';
import { AppStateService } from './app-state.service';
import { CellId } from './app-state.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AppStateService],
})
export class AppComponent {
  readonly state$ = this.appStateService.state$;
  readonly grid$ = this.appStateService.grid$;
  readonly horizontalHeader$ = this.appStateService.horizontalHeader$;
  readonly verticalHeader$ = this.appStateService.verticalHeader$;
  readonly editableId$ = this.appStateService.editableId$;
  readonly values$ = this.appStateService.values$;

  constructor(private readonly appStateService: AppStateService) {}

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

  applyFormula(formula: string, id: CellId): void {
    this.appStateService.applyFormula(formula, id);
  }
}
