import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../users-interface/users-interface';


@Component({
  selector: 'app-create-user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-user-form.component.html',
  styleUrl: './create-user-form.component.scss'
})
export class CreateUserFormComponent {
  @Output()
  createUser = new EventEmitter<User>();

  public form = new FormGroup({
    id: new FormControl<number>(new Date().getTime(), {nonNullable: true}),
    name: new FormControl<string>('', {validators: [Validators.required, Validators.minLength(2)], nonNullable: true} ),
    website: new FormControl<string>('', {validators: [Validators.required,], nonNullable: true}),
    email: new FormControl<string>('', {validators: [Validators.required, Validators.email], nonNullable: true}),
    company: new FormGroup({
      name: new FormControl<string>('', {validators: Validators.required, nonNullable: true}),
    }),
  })

  public submitForm(): void {
    const user: User = this.form.getRawValue()
    this.createUser.emit(user);
    this.form.reset();
  }
}
