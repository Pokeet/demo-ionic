import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  tasks = []

  constructor (
    public navCtrl: NavController,
    public modalCtrl: ModalController
  ) {
    
  }

  editTask (task) {
    let navParams = null
    let taskId = -1
    if (task != null) {
      navParams = {
        task
      }
      taskId = this.tasks.indexOf(task)
    }
    let modal = this.modalCtrl.create('EditTaskModalPage', navParams)

    modal.onDidDismiss(data => {
      if (data != null && data != '' && taskId == -1) {
        this.tasks.push(data)
      } else {
        this.tasks[taskId] = data
      }
    })

    modal.present()
  }

  deleteTask (task) {
    let index = this.tasks.indexOf(task)
    if (index > -1) {
      this.tasks.splice(index)
    }
  }


}
