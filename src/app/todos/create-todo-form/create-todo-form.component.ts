import { Component, EventEmitter, Output } from '@angular/core';
import { Form, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Todo } from '../todos-interface/todos-interface';
import { identifierName } from '@angular/compiler';

@Component({
  selector: 'app-create-todo-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-todo-form.component.html',
  styleUrl: './create-todo-form.component.scss'
})
export class CreateTodoFormComponent {
  @Output()
  createTodo = new EventEmitter<Todo>()

  public form = new FormGroup({
    userId: new FormControl<number>(0,{validators: Validators.required, nonNullable: true}),
    id: new FormControl<number>(new Date().getTime(), {nonNullable: true}),
    completed: new FormControl<boolean>(false, {validators: [Validators.required, Validators.maxLength(3)], nonNullable: true}), 
    title: new FormControl<string>('', {validators: Validators.required, nonNullable: true},),
  })

  public submitForm(): void {
    const todo: Todo = this.form.getRawValue();
    this.createTodo.emit(todo);
    this.form.reset();
  }
}
