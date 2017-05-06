import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";

import { SessionModel } from 'app/model/session.model';

import { NgDB, SessionsDB } from "../storage/clinicreg";

@Injectable()
export class SessionsService {

  count(): number {
    return SessionsDB.count();
  }

  fetch(): Observable<SessionModel[]> {
    return NgDB.getCollectionData('sessions');
  }

  remove(session): SessionModel {
    SessionsDB.remove({ id: session.id });
    return session;
  }

  removeByPatient(id): void {
    SessionsDB.remove({ patient_id : id });
  }

  edit(session): SessionModel {
    SessionsDB.update({ id: session.id }, {
      status: true
    });
    return session;
  }

  create(session): SessionModel {
    session.created = new Date(session.created);
    session.status = true;

    let p = SessionsDB.insert(session);
    return p.inserted[0]
  }

  persist() {
    SessionsDB.save();
  }
}
