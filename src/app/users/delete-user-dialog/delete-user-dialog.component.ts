import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { User } from '../users-interface/users-interface';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-delete-user-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './delete-user-dialog.component.html',
  styleUrl: './delete-user-dialog.component.scss'
})
export class DeleteUserDialogComponent {
  public readonly data = inject<{user: User}>(MAT_DIALOG_DATA);

  readonly dialog = inject(MatDialog);

  private _snackBar = inject(MatSnackBar);

  durationInSeconds = 5;

  // openSnackBar() {
  //   this._snackBar.openFromComponent(SnackbarComponentComponent, {
  //     duration: this.durationInSeconds * 1000,
  //   });
  // }
}
