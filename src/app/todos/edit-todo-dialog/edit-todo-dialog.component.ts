import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IUser } from '../../users/users-interface/users-interface';
import { ITodo } from '../todos-interface/todos-interface';
import { CustomPipe } from '../../pipes/text-replace-pipe';

@Component({
  selector: 'app-edit-todo-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, MatDialogClose, CustomPipe],
  templateUrl: './edit-todo-dialog.component.html',
  styleUrl: './edit-todo-dialog.component.scss'
})
export class EditTodoDialogComponent {
  readonly data = inject<{todo: ITodo}>(MAT_DIALOG_DATA);

  public form = new FormGroup({
    userId: new FormControl<number>(this.data.todo.userId,{validators: Validators.required, nonNullable: true}),
    id: new FormControl<number>(this.data.todo.id, {nonNullable: true}),
    completed: new FormControl<boolean>(this.data.todo.completed, {validators: [Validators.required, Validators.maxLength(3)], nonNullable: true}), 
    title: new FormControl<string>(this.data.todo.title, {validators: Validators.required, nonNullable: true},),
  })

  get todoWithUpdatedFields() {
    return{
      ...this.form.value,
      id: this.data.todo.id,
    }
  }
}
