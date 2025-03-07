import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ITodo } from "../todos-interface/todos-interface";

@Injectable({providedIn: 'root'})
export class TodoApiService {
    readonly apiService = inject(HttpClient)

    getTodos() {
        return this.apiService.get<ITodo[]>('https://jsonplaceholder.typicode.com/todos')
    }
}