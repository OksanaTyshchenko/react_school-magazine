import { legacy_createStore as createStore, AnyAction} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Mark, Student } from '../types';

const LOADING_STUDENTS = 'LOADING_STUDENTS';
const ADD_STUDENT = 'ADD_STUDENT';
const REMOVE_STUDENT = 'REMOVE_STUDENT';
const LOAD_DATE = 'LOAD_DATE';
const ADD_DATE = 'ADD_DATE';
const LOAD_MAIN = 'LOAD_MAIN';
const ADD_MAIN = 'ADD_MAIN';
const ADD_MARK = 'ADD_MARK';

export const actions = {
  loadingStudents: (students: Student[]) => ({
    type: LOADING_STUDENTS,
    students,
  }),
  addStudent: (newStudent: Student) => ({
    type: ADD_STUDENT,
    newStudent,
  }),
  loadDate: (dates: Date[]) => ({
    type: LOAD_DATE,
    dates,
  }),
  addDate: (date: Date) => ({
    type: ADD_DATE,
    date,
  }),
  loadMain: (mainInfo: MainInfo[]) => ({
    type: LOAD_MAIN,
    mainInfo,
  }),
  addMain: (mainInfo: MainInfo) => ({
    type: ADD_MAIN,
    mainInfo,
  }),
  removeStudent: (id: string) => ({
    type: REMOVE_STUDENT,
    id,
  }),
  addMark: (mark: Record<string, Mark>, id: string) => ({
    type: ADD_MARK,
    mark,
    id,
  })
};

export const selectors = {
  loadStudents: (state: RootState) => state.students,
  getDates: (state: RootState) => state.dates,
  loadMainInfo: (state: RootState) => state.mainInfo,
};

type Date = {
  subject: string,
  date: string,
};

type MainInfo = {
  nameClass: string,
  school: string,
  city: string,
  year: string,
};

type RootState = {
  students: Student[],
  dates: Date[],
  mainInfo: MainInfo[],
};

const initialState: RootState = {
  students: [],
  dates: [],
  mainInfo: [],
};

const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case LOADING_STUDENTS:
      return {
        ...state,
        students: action.students,
      };

    case ADD_STUDENT:
      return {
        ...state,
        students: [...state.students, action.newStudent]
      };

    case REMOVE_STUDENT:
      return {
        ...state,
        students: state.students.filter(st => st.id !== action.id),
      }

    case LOAD_DATE:
      return {
        ...state,
        dates: action.dates,
      };

    case ADD_DATE:
      return {
        ...state,
        dates: [...state.dates, action.date],
      }

    case LOAD_MAIN:
      return {
        ...state,
        mainInfo: action.mainInfo,
      };

    case ADD_MAIN:
      return {
        ...state,
        mainInfo: [...state.mainInfo, action.mainInfo],
      };

    case ADD_MARK: {
      const students = [...state.students];
      const index = students.findIndex(student => student.id === action.id);
      students[index].marks = { ...students[index].marks, ...action.mark };
      return {
        ...state,
        students,
      }
    }
    default:
      return state;
  }
};

const store = createStore(
  rootReducer,
  composeWithDevTools()
);

export default store;
