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

  addTask () {
    let modal = this.modalCtrl.create('EditTaskModalPage')

    modal.onDidDismiss(data => {
      if (data != null && data != '') {
        this.tasks.push(data)
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
