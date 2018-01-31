import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { HomePage } from './home'

import { EditTaskModalPageModule } from '../edit-task-modal/edit-task-modal.module'
import { TodoItemComponentModule } from '../../components/todo-item/todo-item.module'

@NgModule({
    declarations: [
        HomePage
    ],
    imports: [
        IonicPageModule.forChild(HomePage),
        EditTaskModalPageModule,
        TodoItemComponentModule
    ],
    entryComponents: [
        HomePage
    ]
})
export class HomePageModule { }