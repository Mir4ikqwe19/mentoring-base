import { Injectable } from "@angular/core";
import { User } from "../users-interface/users-interface";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn: 'root'})
export class UsersService {
    usersSubject$ = new BehaviorSubject<User[]>([]);
    users$ = this.usersSubject$.asObservable();

    setUsers(users: User[]) {
        this.usersSubject$.next(users);
    }

    editUser(editedUser: User) {
        this.usersSubject$.next(
            this.usersSubject$.value.map(
                user => user.id === editedUser.id ? editedUser : user
            )
        )
    }

    createUser(user: User) {
        const userIsExisting = this.usersSubject$.value.find(
            currentElement => currentElement.email === user.email);

            if (userIsExisting !== undefined) {
                alert('Такой email уже зарегистрирован');
            } else {
                this.usersSubject$.next([...this.usersSubject$.value, user]);
                alert('Новый пользователь успешно добавлен');
            }
    }

    deleteUser(id: number) {
        this.usersSubject$.next(
            this.usersSubject$.value.filter(
                item => id !== item.id
            )
        )
    }
}