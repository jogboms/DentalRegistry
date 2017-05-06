import { Component } from "@angular/core";
import { transition, animate, trigger, state, style } from "@angular/animations";

import { Store } from '@ngrx/store';
import { AppState } from 'app/reducers';
import { getPatientsData } from 'app/reducers';
import { getSorter } from 'app/reducers';
import { PatientActions, SearchsActions, FilterActions, SortActions } from 'app/actions';
import { PatientModel } from 'app/model/patient.model';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'patients-main-container',
  template: `
    <div class="container-fluid contain">
      <patients-searchbar
        [count]="isSearching ? total : count"
        (cancel)="onSearchCancel()"
        (search)="onSearch($event)"
        (sort)="onSort($event)"
        (create)="onCreate()"
       ></patients-searchbar>

      <h5 [hidden]="isSearching == false">
        <small>Searching:</small> {{searchkey}}
        <small class="pull-right">({{count}} results)</small>
      </h5>

      <br />

      <div *ngIf="!fetched" class="text-center">
        <br /><br /><br />
        <progress-bar></progress-bar>
      </div>
      
      <div class="add-bottom clearfix">
        <div class="clearfix col-md-8">
          <patients-main (delete)="onDelete($event)" [patients]="patients$ | async" ></patients-main>
        </div>
  
        <div class="clearfix col-md-4">
          <patients-create @toggle *ngIf="showCreate"></patients-create>
        </div>
      </div>
    </div>
  `,
  animations: [
    trigger('toggle', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateX(100%)',
        }),
        animate('750ms cubic-bezier(0.44, 1.49, 1, 1)', style({
          opacity: 1,
          transform: 'translateX(0%)',
        }))
      ]),
      transition(':leave', [
        animate('750ms cubic-bezier(0.44, 1.49, 1, 1)', style({
          opacity: 0,
          transform: 'translateX(100%)',
        }))
      ]),
    ])
  ],

})
export class PatientsMainContainer {
  patients$: Observable<PatientModel[]>;
  fetched: boolean = false;
  total: number = 0;
  count: number = 0;
  searchkey: string;
  isSearching: boolean = false;
  showCreate: boolean = false;

  onCreate = () => this.showCreate = !this.showCreate;

  onSort = (type) => this.store.dispatch(this.sortActions[type]());

  onSearchCancel = () => this.store.dispatch(this.searchsActions.cancel());

  constructor(
    private store: Store<AppState>,
    private sortActions: SortActions,
    private filterActions: FilterActions,
    private patientActions: PatientActions,
    private searchsActions: SearchsActions,
    ){}

  ngOnInit() {
    const sort$ = this.store.let(getSorter());
    const filter$ = this.store.select(state => state.filter);
    const searchs$ = this.store.select(state => state.searchs);
    const patients$ = this.store.let(getPatientsData());

    this.patients$ = Observable.combineLatest(patients$, searchs$, filter$, sort$)
      .map(([patients, searchs, filter, sort]) => {
        this.total = patients.length;
        this.fetched = true;
        const data = (this.isSearching = searchs.searching) ? searchs.patients : patients;
        return data.filter(filter).sort(sort);
      })
      .do(data => this.count = data.length)

  }

  onDelete(id) {
    if(confirm(`Are you sure you wish to remove all records including Payments & Sessions?`)){
      this.store.dispatch(this.patientActions.delete(id));
    }
  }

  onSearch(search) {
    this.searchkey = search.value;

    this.store.dispatch(this.searchsActions.search(search))
  }
}
