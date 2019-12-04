import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { UiStatus } from '../shared/ui-status.enum';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  // subject holding value if some action is going (and therefore i.e. should spinner be visible)
  public isActionInProgress = new Subject<boolean>();

  constructor(private snackBar: MatSnackBar) {}

  public showSnackbar(
    message: string,
    status?: UiStatus,
    { actionButtonLabel = null, duration = 3000 } = {}
  ) {
    this.snackBar.open(message, actionButtonLabel, {
      duration,
      panelClass: status ? `snackbar-${status}` : ''
    });
  }
}
