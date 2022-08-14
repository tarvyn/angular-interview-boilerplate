import { Component } from '@angular/core';
import { AppStateService } from './app-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AppStateService],
})
export class AppComponent {
  readonly state$ = this.appStateService.state$;

  constructor(private readonly appStateService: AppStateService) {}
}
