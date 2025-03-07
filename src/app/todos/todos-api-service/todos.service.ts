import { Injectable } from "@angular/core";
import { ITodo } from "../todos-interface/todos-interface";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn: 'root'})
export class TodosService {
    todosSubject$ = new BehaviorSubject<ITodo[]>([]);
    todos$ = this.todosSubject$.asObservable();

    setTodos(todos: ITodo[]) {
        this.todosSubject$.next(todos.slice(0, 14));
    }

    editTodo(editedTodo: ITodo) {
        this.todosSubject$.next(
            this.todosSubject$.value.map(
                todo => todo.id === editedTodo.id ? editedTodo : todo
            )
        )
    }

    createTodo(todo: ITodo) {
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
