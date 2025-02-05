import { Injectable } from "@angular/core";
import { Todo } from "../todos-interface/todos-interface";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn: 'root'})
export class TodosService {
    todosSubject$ = new BehaviorSubject<Todo[]>([]);
    todos$ = this.todosSubject$.asObservable();

    setTodos(todos: Todo[]) {
        this.todosSubject$.next(todos);
    }

    editedTodo(editedTodo: Todo) {
        this.todosSubject$.next(
            this.todosSubject$.value.map(
                todo => todo.id === editedTodo.id ? editedTodo : todo
            )
        )
    }

    createTodo(todo: Todo) {
        const todoIsExisting = this.todosSubject$.value.find(
            currentElement => currentElement.title === todo.title);

            if (todoIsExisting !== undefined) {
                alert('Такой пользователь уже зарегистрирован')
            } else {
                this.todosSubject$.next([...this.todosSubject$.value, todo]);
                alert('Новый пользователь зарегистрирован')
            }
    }

    deleteTodo(id: number) {
        this.todosSubject$.next(
            this.todosSubject$.value.filter(
                item => item.id !== id
            )
        )
    }
}
