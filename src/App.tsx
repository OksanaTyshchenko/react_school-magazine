import { Route, Switch } from "react-router-dom";
import "./App.css";

import { MainNavigation } from "./components/MainNavigation/MainNavigation";
import { HomePage } from "./components/HomePage/HomePage";
import { MarksList } from "./components/MarksList/MarksList";
import { StudentsTable } from "./components/StudentsTable/StudentsTable";
import { Rating } from "./components/Rating";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actions } from "./store";
import { dbDates, db, mainDb } from "./components/databases";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function response() {
      const [datesFromBase, infoFromServer, studentsFromBase] = await Promise.all([
        dbDates.collection("dates").get(),
        mainDb.collection("main").get(),
        db.collection("students").get(),
      ]);

      dispatch(actions.loadingStudents(studentsFromBase));
      dispatch(actions.loadMain(infoFromServer));
      dispatch(actions.loadDate(datesFromBase));
    }

    response();
  }, [dispatch]);

  return (
    <div className="App">
      <MainNavigation />

      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>

        <Route path="/students">
          <StudentsTable />
        </Route>

        <Route path="/marks">
          <MarksList />
        </Route>

        <Route path="/rating">
          <Rating />
        </Route>

        <p>Not found page</p>
      </Switch>
    </div>
  );
}

export default App;
