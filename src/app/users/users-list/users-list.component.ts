import { ChangeDetectionStrategy, Component, EventEmitter, inject, Injectable, Output } from "@angular/core";
import { HeaderComponent } from "../../header/header.component";
import { RouterLink, RouterOutlet } from "@angular/router";
import { AsyncPipe, NgFor } from "@angular/common";
import { UserApiService } from "../user-api-service/users-api.service";
import { UserCardComponent } from "../user-card/user-card.component";
import { IUser,} from "../users-interface/users-interface";
import { UsersService } from "../user-api-service/user.service";
import { CreateUserFormComponent } from "../create-user-form/create-user-form.component";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from '@angular/material/card';
import { CreateUserDialogComponent } from "../create-user-dialog/create-user-dialog.component";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import {MatIconModule} from '@angular/material/icon';

@Component({
    selector: 'app-users-list',
    imports: [
    NgFor,
    UserCardComponent,
    AsyncPipe,
    CreateUserFormComponent,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule
],
    standalone: true,
    templateUrl: './users-list.component.html',
    styleUrl: './users-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent {
    readonly usersApiService = inject(UserApiService)
    readonly usersService = inject(UsersService)
    readonly dialog = inject(MatDialog)
    public snackBar = inject(MatSnackBar);

    constructor() {
        this.usersApiService.getUsers().subscribe(
            (response: IUser[]) => {
                this.usersService.setUsers(response);
            }
        )

        this.usersService.users$.subscribe();
    }
    
    deleteUser(id: number) {
        this.usersService.deleteUser(id)
    }

    editUser(user: IUser) {
        this.usersService.editUser(user);
    }

    public createUser(formData: IUser) {
        this.usersService.createUser(formData)
    }

    public openCreateDialog(): void {
        const dialogRef = this.dialog.open(CreateUserDialogComponent, {
          width: '600px',
        });
    
        dialogRef.afterClosed().subscribe((result: IUser) => {
          if (result) {
            this.createUser(result)
            this.snackBar.open('Пользователь создан', 'OK', {
                duration: 2000,
              })
          }
        });
    }
}