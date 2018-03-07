import { Component } from '@angular/core'
import { NavController, ModalController } from 'ionic-angular'
import { TasksProvider } from '../../providers/tasks/tasks'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor (
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public tasksProvider : TasksProvider
  ) {
    this.tasksProvider.getTasks();
  }

  editTask (task) {
    let navParams = null
    let taskId = -1
    if (task != null) {
      navParams = {
        task
      }
      taskId = this.tasksProvider.findTask(task)
    }
    let modal = this.modalCtrl.create('EditTaskModalPage', navParams)

    modal.onDidDismiss(data => {
      if (data != null && data != '' && taskId == -1) {
        this.tasksProvider.addTask(data)
      } else {
        this.tasksProvider.editTask(taskId, data)
      }
    })

    modal.present()
  }

  deleteTask (task) {
    this.tasksProvider.deleteTask(task)
  }

  toggleTask (task) {
    let taskID = this.tasksProvider.findTask(task)
    this.tasksProvider.toggleTask(taskID)
  }


}
