import { ChangeDetectionStrategy, Component, inject, Injectable } from "@angular/core";
import { TodoApiService } from "../todos-api-service/todos-api.service";
import { TodosCardComponent } from "../todos-card/todo-card.component";
import { AsyncPipe, NgFor } from "@angular/common";
import { Todo,} from "../todos-interface/todos-interface";
import { TodosService } from "../todos-api-service/todos.service";
import { CreateTodoFormComponent } from "../create-todo-form/create-todo-form.component";

@Component({
    selector: 'app-todos-list',
    standalone: true,
    imports: [TodosCardComponent, NgFor, AsyncPipe, CreateTodoFormComponent],
    templateUrl: './todos-list.component.html',
    styleUrl: './todos-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosListComponent {
    readonly todosApiService = inject(TodoApiService)
    readonly todosService = inject(TodosService)

    constructor() {
        this.todosApiService.getTodos().subscribe(
            (response: Todo[]) => {
                this.todosService.setTodos(response)
            }
        )

        this.todosService.todos$.subscribe(
            todos => console.log(todos)
        )
    }

    deleteTodo(id: number){
        this.todosService.deleteTodo(id)
    }

    public createTodo(formData: Todo) {
        this.todosService.createTodo(formData)
    }
}