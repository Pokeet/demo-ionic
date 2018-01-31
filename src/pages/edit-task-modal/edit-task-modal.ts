import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the EditTaskModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-task-modal',
  templateUrl: 'edit-task-modal.html',
})
export class EditTaskModalPage {

  taskText : any

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    let text = this.navParams.get('task')
    if (text != null) {
      this.taskText = text
    }
  }

  cancel () {
    this.viewCtrl.dismiss()
  }

  validate () {
    let data = 
    this.viewCtrl.dismiss(this.taskText)
  }

}
