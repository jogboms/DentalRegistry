import {Component, EventEmitter, Output} from "@angular/core";
import {FormGroup, FormBuilder} from "@angular/forms";

@Component({
  selector: 'patient-sessions-create',
  template: `
    <form class="form add-bottom" (submit)="onSubmit($event)" [formGroup]="form">
      <div class="form-group">
        <textarea type="text" formControlName="complaints" class="form-control" placeholder="Complaints"></textarea>
      </div>

      <div class="form-group">
        <textarea type="text" formControlName="diagnosis" class="form-control" placeholder="Diagnosis"></textarea>
      </div>

      <div class="form-group">
        <textarea type="text" formControlName="treatments" class="form-control" placeholder="Treatments"></textarea>
      </div>

      <div class="form-group">
        <label for="">Date</label>
        &nbsp;
        <input type="date" formControlName="created" class="form-control inline" placeholder="yyyy-mm-dd">
        &nbsp;&nbsp;
      </div>

      <button type="submit" class="btn btn-success btn-circle">
        <span class="glyphicon glyphicon-save"></span>
      </button>
    </form>
  `,
  styles: [`
    :host {
      display: block;
      background: white;
      padding: 2rem;
    }
  `]
})
export class PatientsSessionCreate {
  form: FormGroup;
  @Output() create = new EventEmitter<any>();

  constructor(private _form: FormBuilder){}

  ngOnInit(){
    this.form = this._form.group({
      created: [new Date()],
      complaints: [''],
      diagnosis: [''],
      treatments: [''],
    });
  }

  onSubmit(e){
    this.create.emit(this.form.value)

    e.preventDefault()
  }

}
