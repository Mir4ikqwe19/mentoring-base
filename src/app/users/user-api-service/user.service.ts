import { Injectable } from "@angular/core";
import { IUser } from "../users-interface/users-interface";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn: 'root'})
export class UsersService {
    usersSubject$ = new BehaviorSubject<IUser[]>([]);
    users$ = this.usersSubject$.asObservable();

    setUsers(users: IUser[]) {
        this.usersSubject$.next(users);
    }

    editUser(editedUser: IUser) {
        this.usersSubject$.next(
            this.usersSubject$.value.map(
                user => user.id === editedUser.id ? editedUser : user
            )
        )
    }

    createUser(user: IUser) {
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