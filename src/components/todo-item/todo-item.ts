import { Component, EventEmitter, Input, Output} from '@angular/core';
import { ItemSliding } from 'ionic-angular/components/item/item-sliding';

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
  
  @Output() onEdit = new EventEmitter<string>()
  @Output() onDelete = new EventEmitter<string>()

  complete: boolean

  constructor () {
    this.complete = false
  }

  toggleCompletion () {
    this.complete = !this.complete
  }

  sendDelete (item: ItemSliding) {
    item.close()
    this.onDelete.emit(this.task)
  }

  sendEdit (item: ItemSliding) {
    item.close()
    this.onEdit.emit(this.task)
  }

}
