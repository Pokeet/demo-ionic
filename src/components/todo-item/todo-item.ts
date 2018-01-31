import { Component, Input } from '@angular/core';

/**
 * Generated class for the TodoItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'todo-item',
  templateUrl: 'todo-item.html'
})
export class TodoItemComponent {

  @Input() task: string
  complete: boolean

  constructor () {
    this.complete = false
  }

  toggleCompletion () {
    this.complete = !this.complete
  }

}
