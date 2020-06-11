import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SnackMessageService {

  constructor(private snackBar: MatSnackBar) { }

  showError(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['red-snackbar'];
    config.duration = 4000;
    config.verticalPosition = 'top';
    this.snackBar.open(message, null, config);
  }

  showSuccess(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['gree-snackbar'];
    config.duration = 4000;
    config.verticalPosition = 'top';
    this.snackBar.open(message, null, config);
  }
}
