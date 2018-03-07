import { Injectable } from '@angular/core'
import { Storage } from '@ionic/storage'
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TasksProvider {

  tasks : Array<any>

  constructor (
    private storage : Storage,
    public http: HttpClient
  ) {
    
  }

  getTasks () {
    /*this.storage.get('tasks').then(data => {

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
    })*/

    this.http.get('http://my-json-server.typicode.com/Pokeet/demo-ionic/todos').subscribe(
      // subscribe prend deux callback en parametre, un pour le succes de la requete et un pour l'echec
      data => {
        this.tasks = data
    }, err => {
      console.log(err)
    });
  }

  addTask (task : any) {
    this.http.post('http://my-json-server.typicode.com/Pokeet/demo-ionic/todos/', task).subscribe(
      data => {
        this.tasks.push(data)
      },
      err => {
        console.log(err)
      }
    )
  }

  editTask (id, title : string) {
    if (task != "" && task != null) {
      let task = this.tasks[id]
      let nextTaskState = JSON.parse(JSON.stringify(this.tasks[id]))
      nextTaskState.title = title
      this.http.put('http://my-json-server.typicode.com/Pokeet/demo-ionic/todos/' + task.id, nextTaskState).subscribe(data => {
        this.tasks[id] = data
      }, error => {
        console.log(error)
      })
    }
  }

  toggleTask (id) {
    let task = this.tasks[id]
    let nextTaskState = JSON.parse(JSON.stringify(this.tasks[id]))
    nextTaskState.completed = !task.completed
    this.http.put('http://my-json-server.typicode.com/Pokeet/demo-ionic/todos/' + task.id, nextTaskState).subscribe(data => {
      this.tasks[id] = data
    }, error => {
      console.log(error)
    })
  }

  findTask (text : string) {
    return this.tasks.indexOf(text)
  }

  deleteTask (task : any) {
    let index = this.findTask(task)
    if (index > -1) {
      this.http.delete('http://my-json-server.typicode.com/Pokeet/demo-ionic/todos/' + task.id).subscribe(
        data => {
          this.tasks.splice(index, 1)
        },
        error => {
          console.log(error)
        }
      )
    }
  }

}
