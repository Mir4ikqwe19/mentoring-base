import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output, Pipe } from "@angular/core";
import { ICreateUser, IUser } from "../users-interface/users-interface";
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogModule,
    MatDialogRef,
    MatDialogTitle,
  } from '@angular/material/dialog';
import { EditUserDialogComponent } from "../edit-user-dialog/edit-user-dialog.component";
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { DeleteUserDialogComponent } from "../delete-user-dialog/delete-user-dialog.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatIcon } from "@angular/material/icon";
import { CustomPipe } from "../../pipes/text-replace-pipe";
import { NgFor, SlicePipe } from "@angular/common";
import { CustomNumberPipe } from "../../pipes/number-replace-pipe";
import { pipe } from "rxjs";

@Component({
    selector: 'app-user-card',
    standalone: true,
    templateUrl: './user-card.component.html',
    styleUrl: './user-card.component.scss',
    imports: 
    [
      MatButtonModule,
      MatCardModule,
      MatDialogModule,
      MatIcon,
      CustomPipe,
      CustomNumberPipe
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCardComponent {
  readonly dialog = inject(MatDialog);
  readonly snackBar = inject(MatSnackBar);

  @Input()
  user!: IUser;

  @Output()
  deleteUser = new EventEmitter<number>();

  @Output()
  editUser = new EventEmitter<IUser>();

  public openDeleteDialog(): void {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      width: '600px',
      data: { user: this.user},
    });
  
    dialogRef.afterClosed().subscribe((result: boolean | undefined) => {
      if (result) {
        this.deleteUser.emit(this.user.id);
        this.snackBar.open('Пользователь удалён', 'OK', {
          duration: 2000,
        })
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: { user: this.user },
    });
  
    dialogRef.afterClosed().subscribe((editResult: IUser) => {
      if(!editResult) return;
      this.editUser.emit(editResult);
      this.snackBar.open('Пользователь изменён', 'OK', {
        duration: 2000,
      })
    });
  }
}