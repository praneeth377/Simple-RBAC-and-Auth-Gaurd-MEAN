import {
	ITask,
	ITaskResponse,
	ITaskResponse2,
	ITaskResponse3,
	Task,
} from 'src/app/models/tasks';
import { ApiService } from 'src/app/services/api.service';

import {
	Component,
	ElementRef,
	inject,
	OnInit,
	ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  api = inject(ApiService)

  tasks: ITask[] = [];
  taskModel: Task = new Task();
  editMode: boolean = false;
  availableTags: string[] = ['Hobby', 'Holiday', 'Financial', 'Fun', 'Emergency', 'Health', 'Work', 'Education', 'Social', 'Travel'];

  @ViewChild('overlay') overlay!: ElementRef;

  openOverlay() {
    // this.editMode = false;
    // this.taskModel = new Task();
    this.overlay.nativeElement.style.display = 'flex';
  }

  closeOverlay(event?: Event) {
    if (!event || event.target === this.overlay.nativeElement) {
      this.overlay.nativeElement.style.display = 'none';
    }
  }

  ngOnInit(): void {
    this.getTasks()
  }

  getTasks() {
    this.api.getData().subscribe((res: ITaskResponse) => {
      this.tasks = res.data
    })
  }

  toggleTag(tag: string) {
    const index = this.taskModel.tags.indexOf(tag);
    if (index > -1) {
      this.taskModel.tags.splice(index, 1);
    } else {
      this.taskModel.tags.push(tag);
    }
  }

  addTask() {
    this.api.postData(this.taskModel).subscribe((res: ITaskResponse) => {
      if (res.result) {
        alert('Task added successfully')
        window.location.reload()
      } else {
        alert('Failed to add task')
      }
    })
  }

  dateFormatterForDisplay(date: Date, id: string) {
    setTimeout(() => {
      const dat = new Date(date);
      const day = ('0' + dat.getDate()).slice(-2);
      const month = ('0' + (dat.getMonth() + 1)).slice(-2);
      const today = dat.getFullYear() + '-' + (month) + '-' + (day);
      (<HTMLInputElement>document.getElementById(id)).value = today;
    }, 1000)
  }

  idOfTask: string = '';
  editTask(id: string) {
    this.editMode = true;
    this.openOverlay()
    this.api.getDatabyId(id).subscribe((res: ITaskResponse3) => {
      if (res.result) {
        this.taskModel = res.data
        this.idOfTask = res.data._id
        this.dateFormatterForDisplay(res.data.createdDate, 'create-date')
        this.dateFormatterForDisplay(res.data.dueDate, 'due-date')
      } else {
        alert('Failed to fetch task')
      }
    })
  }

  saveTask() {
    this.api.updateData(this.idOfTask, this.taskModel).subscribe((res: ITaskResponse2) => {
      if (res.result) {
        alert(res.message)
        window.location.reload()
      } else {
        alert('Failed to update task')
      }
    })
  }

  deleteTask(id: string) {
    this.api.deleteData(id).subscribe((res: ITaskResponse2) => {
      if (res.result) {
        alert(res.message)
        window.location.reload()
      } else {
        alert('Failed to delete task')
      }
    })
  }
}
