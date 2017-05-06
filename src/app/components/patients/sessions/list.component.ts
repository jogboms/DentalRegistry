import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector: 'patient-sessions-list',
  templateUrl: './list.html',
  styleUrls: ['./list.scss']
})
export class PatientsSessionList {
  @Input() session;
  @Output() remove = new EventEmitter<any>();
  @Output() toggle = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  toggle_edit: boolean = false;

  onEdit = () => this.toggle_edit = !this.toggle_edit;

  onDelete = () => this.remove.emit(this.session);

  onToggle = () => this.toggle.emit(this.session);

  ngOnInit() {
    console.log(this.session);
  }

  onSave(i){
    this.session.created = new Date(i.value);
    this.edit.emit(this.session)

    this.onEdit();
  }
}
