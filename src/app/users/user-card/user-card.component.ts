import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { User } from "../users-interface/users-interface";
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
import { elementAt } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
    selector: 'app-user-card',
    standalone: true,
    templateUrl: './user-card.component.html',
    styleUrl: './user-card.component.scss',
    imports: 
    [
      MatButtonModule,
      MatCardModule,
      MatDialogModule
    ]
})
export class UserCardComponent {
  readonly dialog = inject(MatDialog);
  readonly snackBar = inject(MatSnackBar);
  
    @Input()
    user!: User

    @Output()
    deleteUser = new EventEmitter<number>();

    @Output()
    editUser = new EventEmitter<User>();

    public openDeleteDialog(): void {
      const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
          width: '600px',
          data: { user: this.user},
      });
  
      dialogRef.afterClosed().subscribe((result: boolean | undefined) => {
        if (result) {
          this.deleteUser.emit(this.user.id);
          console.log('Пользователь удалён', this.user.id);
          this.snackBar.open('Пользователь удалён', 'OK', {
            duration: 2000,
          })
        } 
        else return console.log('Отмена удаления');
        console.log(result)
      });
    }

    openDialog(): void {
      const dialogRef = this.dialog.open(EditUserDialogComponent, {
        data: { user: this.user },
      });
  
      dialogRef.afterClosed().subscribe((editResult: User) => {
        console.log('Модалка закрылась, Значение формы:', editResult);
        if(!editResult) return;
        this.editUser.emit(editResult);
        this.snackBar.open('Пользователь изменён', 'OK', {
          duration: 2000,
        })
      });
    }
}