import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { IUser,} from "../users-interface/users-interface";

@Injectable({providedIn: 'root'})
export class UserApiService {
    readonly apiService = inject(HttpClient);

    getUsers() {
        return this.apiService.get<IUser[]>('https://jsonplaceholder.typicode.com/users')
    }
}