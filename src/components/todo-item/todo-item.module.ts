import { NgModule } from '@angular/core'
import { IonicModule } from 'ionic-angular'
import { TodoItemComponent } from './todo-item'

@NgModule({
    declarations: [
        TodoItemComponent,
    ],
    imports: [
        IonicModule,
    ],
    exports: [
        TodoItemComponent
    ]
})
export class TodoItemComponentModule {}