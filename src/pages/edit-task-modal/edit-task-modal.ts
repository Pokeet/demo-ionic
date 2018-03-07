import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-edit-task-modal',
  templateUrl: 'edit-task-modal.html',
})
export class EditTaskModalPage {

  taskObject : any

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    let task = this.navParams.get('task')
    if (task != null) {
      this.taskObject = task
    } else {
      this.taskObject = {
        "userId" : 1,
        "id" : -1,
        "title" : "new task",
        "completed" : false
      }
    }
  }

  cancel () {
    this.viewCtrl.dismiss()
  }

  validate () {
    this.viewCtrl.dismiss(this.taskObject)
  }

}
