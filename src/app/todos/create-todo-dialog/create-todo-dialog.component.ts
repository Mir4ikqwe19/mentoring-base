import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ITodo } from '../todos-interface/todos-interface';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-todo-dialog',
  standalone: true,
  imports: [MatFormFieldModule, MatLabel, ReactiveFormsModule, FormsModule,],
  templateUrl: './create-todo-dialog.component.html',
  styleUrl: './create-todo-dialog.component.scss'
})
export class CreateTodoDialogComponent {
  public snackBar = inject(MatSnackBar);
  private dialogRef = inject(MatDialogRef<CreateTodoDialogComponent>);

  @Output()
  createTodo = new EventEmitter<ITodo>()

  public form = new FormGroup({
    userId: new FormControl<number>(0,{validators: Validators.required, nonNullable: true}),
    id: new FormControl<number>(new Date().getTime(), {nonNullable: true}),
    completed: new FormControl<boolean>(false, {validators: [Validators.required, Validators.maxLength(3)], nonNullable: true}), 
    title: new FormControl<string>('', {validators: Validators.required, nonNullable: true},),
  })

  public submitForm(): void {
    this.dialogRef.close(this.form.value)
    this.snackBar.open('Пользователь создан', 'OK', {
      duration: 2000,
    })
  }
}
