import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogModule } from '@angular/material/dialog';
import { ITodo } from '../todos-interface/todos-interface';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-delete-todo-dialog',
  standalone: true,
  imports: [MatButtonModule, MatIcon, MatDialogModule],
  templateUrl: './delete-todo-dialog.component.html',
  styleUrl: './delete-todo-dialog.component.scss'
})
export class DeleteTodoDialogComponent {
    public readonly data = inject<{todo: ITodo}>(MAT_DIALOG_DATA);
  
    readonly dialog = inject(MatDialog);
}
