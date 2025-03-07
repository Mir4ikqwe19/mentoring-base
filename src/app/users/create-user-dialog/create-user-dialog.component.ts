import { Component, EventEmitter, inject, Input, model, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { ICreateUser, IUser } from '../users-interface/users-interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UsersService } from '../user-api-service/user.service';

@Component({
  selector: 'app-create-user-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './create-user-dialog.component.html',
  styleUrl: './create-user-dialog.component.scss'
})
export class CreateUserDialogComponent {
  readonly dialog = inject(MatDialog);
  private dialogRef = inject(MatDialogRef<CreateUserDialogComponent>);

  @Output()
  createUser = new EventEmitter<IUser>();

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
    this.dialogRef.close(this.form.value)
  }
}
