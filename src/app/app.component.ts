import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from './../models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public mode = 'list';
  public tasks: Todo[] = [];
  public title: string = 'Minhas tarefas:';
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    });

    this.load();
  }

  add() {
    const title = this.form.controls['title'].value;
    const id = this.tasks.length + 1;
    this.tasks.push(new Todo(id, false, title));
    this.save();
    this.clear();
  }

  clear() {
    this.form.reset();
  }

  remove(task: Todo) {
    const index = this.tasks.indexOf(task);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
    this.save();
  }

  markAsDone(task: Todo) {
    task.done = true;
    this.save();
  }

  markAsUndone(task: Todo) {
    task.done = false;
    this.save();
  }

  save() {
    const data = JSON.stringify(this.tasks);
    localStorage.setItem('tasks', data);
    this.mode= 'list'
  }

  load() {
    const data = localStorage.getItem('tasks');
    if (data) {
      this.tasks = JSON.parse(data);
    } else {
      this.tasks = [];
    }
  }

  changeMode(mode: string) {
    this.mode = mode
  }
}
