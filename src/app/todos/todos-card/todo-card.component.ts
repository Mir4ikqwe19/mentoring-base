import { NgFor } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output, } from '@angular/core';
import { ITodo } from '../todos-interface/todos-interface';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { CustomPipe } from '../../pipes/text-replace-pipe';
import { EditTodoDialogComponent } from '../edit-todo-dialog/edit-todo-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteTodoDialogComponent } from '../delete-todo-dialog/delete-todo-dialog.component';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatDialogModule, MatIcon, CustomPipe,],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss'
})
export class TodosCardComponent {
  readonly dialog = inject(MatDialog);
  readonly snackBar = inject(MatSnackBar);

  @Input()
  todo!: ITodo

  @Output()
  deleteTodo = new EventEmitter<number>();

  @Output()
  editTodo = new EventEmitter<ITodo>();

  onDeleteTodo(todoId: number) {
    this.deleteTodo.emit(todoId);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EditTodoDialogComponent, {
      data: { todo: this.todo },
    });
    
    dialogRef.afterClosed().subscribe((editResult: ITodo) => {
      if(!editResult) return;
      this.editTodo.emit(editResult);
      this.snackBar.open('Пользователь изменён', 'OK', {
        duration: 2000,
      })
    });
  }

    public openDeleteDialog(): void {
      const dialogRef = this.dialog.open(DeleteTodoDialogComponent, {
        width: '600px',
        data: { todo: this.todo },
      });
    
      dialogRef.afterClosed().subscribe((result: boolean | undefined) => {
        if (result) {
          this.deleteTodo.emit(this.todo.id);
          this.snackBar.open('Пользователь удалён', 'OK', {
            duration: 2000,
          })
        }
      });
    }
}