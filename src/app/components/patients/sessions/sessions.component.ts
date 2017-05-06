import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'patient-sessions',
  templateUrl: './sessions.html',
  styleUrls: ['./sessions.scss'],
})
export class PatientsSessions {
  @Input() patient;
  @Output() actions = new EventEmitter<Object>();
  
  show_session_create = false;
  create_session_success = false;

  toggle_show_create = () => this.show_session_create = !this.show_session_create;

  remove = (session) => this.actions.emit({ type: 'session_remove', payload: session });

  edit = (session) => this.actions.emit({ type: 'session_edit', payload: session });

  toggle = (session) => this.actions.emit({ type: 'session_toggle', payload: session });

  create(session){
    this.actions.emit({type: 'session_create', payload: Object.assign(session, {
      patient_id: this.patient.id,
    })})

    setTimeout(() => this.create_session_success = true, 2000)
    this.toggle_show_create();
  }
}
