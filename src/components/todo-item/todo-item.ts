import { Component, EventEmitter, Output, Input} from '@angular/core';
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

  @Output() onEdit = new EventEmitter<any>()
  @Output() onDelete = new EventEmitter<any>()
  @Output() onToggle = new EventEmitter<any>()

  @Input() item : any

  complete: boolean

  constructor () {
    this.complete = false
  }

  toggleCompletion () {
    this.onToggle.emit()
    // this.item.completed = !this.item.completed
  }

  sendDelete (item: ItemSliding) {
    item.close()
    this.onDelete.emit()
  }

  sendEdit (item: ItemSliding) {
    item.close()
    this.onEdit.emit()
  }

}
