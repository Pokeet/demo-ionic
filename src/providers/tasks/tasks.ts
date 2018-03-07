import { Injectable } from '@angular/core'
import { Storage } from '@ionic/storage'

@Injectable()
export class TasksProvider {

  tasks : Array<string>

  constructor (
    private storage : Storage
  ) {
    
  }

  getTasks () {
    this.storage.get('tasks').then(data => {

      if (data == null) {
        data = [
          "Hodor !",
          "HOODOOOOOOOOR !!",
          "Hodor ?"
        ]
      }

      this.tasks = data
    }).catch(error => {
      console.log(error)
    })
  }

  saveTasks (tasks : Array<string>) {

  }

  addTask (task : string) {
    this.tasks.push(task)
    this.storage.set('tasks', this.tasks).then(data => {
      this.tasks = data
    }).catch(error => {
      console.log(error)
    })
  }

  editTask (id, task : string) {
    if (task != "" && task != null) {
      this.tasks[id] = task
      this.storage.set('tasks', this.tasks).then(data => {
        this.tasks = data
      }).catch(error => {
        console.log(error)
      })
    }
  }

  findTask (text : string) {
    return this.tasks.indexOf(text)
  }

  deleteTask (task : string) {
    let index = this.findTask(task)
    if (index > -1) {
      this.tasks.splice(index, 1)
      this.storage.set('tasks', this.tasks).then(data => {
        this.tasks = data
      }).catch(error => {
        console.log(error)
      })
    }
  }

}
