import DB from './ngdb';

declare const window;

export const NgDB = new DB('dental');

export const PatientsDB = NgDB.setCollection('patients', { primaryKey: "id" });
export const SessionsDB = NgDB.setCollection('sessions', { primaryKey: "id" });

NgDB.loadCollectionData();

window.DB = NgDB.getDb();
