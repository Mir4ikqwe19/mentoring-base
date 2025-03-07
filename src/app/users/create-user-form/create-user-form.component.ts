import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ICreateUser, IUser } from '../users-interface/users-interface';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateUserDialogComponent } from '../create-user-dialog/create-user-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-create-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule, MatDialogModule,],
  templateUrl: './create-user-form.component.html',
  styleUrl: './create-user-form.component.scss'
})
export class CreateUserFormComponent {
  @Output()
  createUser = new EventEmitter<IUser>();

  readonly dialog = inject(MatDialog);
  public snackBar = inject(MatSnackBar);

  public form = new FormGroup({
    id: new FormControl<number>(new Date().getTime(), {nonNullable: true}),
    name: new FormControl<string>('', {validators: [Validators.required, Validators.minLength(2)], nonNullable: true} ),
    website: new FormControl<string>('', {validators: [Validators.required,], nonNullable: true}),
    email: new FormControl<string>('', {validators: [Validators.required, Validators.email], nonNullable: true}),
    phone: new FormControl<string>('', {validators: [Validators.required, Validators.minLength(4)], nonNullable: true}),
    company: new FormGroup({
      name: new FormControl<string>('', {validators: Validators.required, nonNullable: true}),
    }),
  })

  public submitForm(): void {
    const user: IUser = this.form.getRawValue()
    this.createUser.emit(user);
    this.form.reset();
    this.snackBar.open('Пользователь создан', 'OK', {
      duration: 2000,
    })
  }
}
