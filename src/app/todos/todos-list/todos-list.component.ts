import { ChangeDetectionStrategy, Component, inject, Injectable } from "@angular/core";
import { TodoApiService } from "../todos-api-service/todos-api.service";
import { TodosCardComponent } from "../todos-card/todo-card.component";
import { AsyncPipe, NgFor } from "@angular/common";
import { ITodo,} from "../todos-interface/todos-interface";
import { TodosService } from "../todos-api-service/todos.service";
import { CreateTodoFormComponent } from "../create-todo-form/create-todo-form.component";
import { CreateTodoDialogComponent } from "../create-todo-dialog/create-todo-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
    selector: 'app-todos-list',
    standalone: true,
    imports: [TodosCardComponent, NgFor, AsyncPipe, CreateTodoFormComponent],
    templateUrl: './todos-list.component.html',
    styleUrl: './todos-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosListComponent {
    readonly todosApiService = inject(TodoApiService);
    readonly todosService = inject(TodosService);
    readonly dialog = inject(MatDialog);
    public snackBar = inject(MatSnackBar);

    constructor() {
        this.todosApiService.getTodos().subscribe(
            (response: ITodo[]) => {
                this.todosService.setTodos(response)
            }
        )

        this.todosService.todos$.subscribe();
    }

    deleteTodo(id: number){
        this.todosService.deleteTodo(id)
    }

    editTodo(todo: ITodo){
        this.todosService.editTodo(todo);
    }

    public createTodo(formData: ITodo) {
        this.todosService.createTodo(formData)
    }

    public openCreateDialog(): void {
        const dialogRef = this.dialog.open(CreateTodoDialogComponent, {
          width: '600px',
        });
    
        dialogRef.afterClosed().subscribe((result: ITodo) => {
          if (result) {
            this.createTodo(result)
            this.snackBar.open('Пользователь создан', 'OK', {
                duration: 2000,
              })
          }
        });
    }
}