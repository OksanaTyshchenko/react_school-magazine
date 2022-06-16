import Localbase from 'localbase';

export let mainDb = new Localbase('main');
export let db = new Localbase('students');
export let dbDates = new Localbase('dates');