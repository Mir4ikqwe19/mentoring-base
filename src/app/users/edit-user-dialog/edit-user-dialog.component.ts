import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import { User } from '../users-interface/users-interface';

@Component({
  selector: 'app-edit-user-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule,MatFormFieldModule, MatInputModule, FormsModule, MatDialogClose],
  templateUrl: './edit-user-dialog.component.html',
  styleUrl: './edit-user-dialog.component.scss'
})
export class EditUserDialogComponent {
  readonly data = inject<{user: User }>(MAT_DIALOG_DATA);

   public form = new FormGroup({
      id: new FormControl<number>(new Date().getTime(), {nonNullable: true}),
      name: new FormControl<string>(this.data.user.name, {validators: [Validators.required, Validators.minLength(2)], nonNullable: true} ),
      website: new FormControl<string>(this.data.user.website, {validators: [Validators.required,], nonNullable: true}),
      email: new FormControl<string>(this.data.user.email, {validators: [Validators.required, Validators.email], nonNullable: true}),
      company: new FormGroup({
        name: new FormControl<string>(this.data.user.company.name, {validators: Validators.required, nonNullable: true}),
      }),
    })

    get userWithUpdatedFields() {
      return{
        ...this.form.value,
        id: this.data.user.id,
      }
    }
}
