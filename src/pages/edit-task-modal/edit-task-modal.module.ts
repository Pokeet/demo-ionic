import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditTaskModalPage } from './edit-task-modal';

@NgModule({
  declarations: [
    EditTaskModalPage,
  ],
  imports: [
    IonicPageModule.forChild(EditTaskModalPage),
  ],
})
export class EditTaskModalPageModule {}
