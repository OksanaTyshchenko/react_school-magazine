import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "../../store";
import { subjects } from "../../subjects";
import { db, dbDates } from "../databases";
import { MarkInput } from "../MarkInput/MarkInput";

import "./MarksList.css";

export const MarksList = () => {
  const [marks, setMarks] = useState<Record<string, number | string>>({})
  const studentsList = useSelector(selectors.loadStudents);
  const datesFromStore = useSelector(selectors.getDates);
  const [subject, setSubject] = useState("Алгебра");
  const [date, setDate] = useState("");
  const dispatch = useDispatch();

  const saveDate = () => {
    const newDate = {
      date,
      subject,
    };

    dbDates.collection("dates").add(newDate);
    dispatch(actions.addDate(newDate));
    setDate("");
  };

  const updateMark = () => {
    saveDate();
    
    Object.entries(marks).forEach(([id, mark]) => {
      const isValid = mark === 'н' || (mark >= 1 && mark <= 12); 
      if (!isValid) return;

      const newMark = {
        [date]: {
          subject,
          mark,
        },
      };

      const student = studentsList.find(el => el.id === id);

      const newObjMarks = { ...(student?.marks || {}), ...newMark };

      db.collection("students").doc({ id }).update({
        marks: newObjMarks,
      });

      dispatch(actions.addMark(newMark, id));
    });

    setMarks({});
  };

  const filteredDates = datesFromStore.filter(
    (date) => date.subject === subject
  );

  return (
    <div className="MarksList__content">
      <div className="select is-primary MarksList__Select">
        <select
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
        >
          {subjects.map((subject) => (
            <option key={subject}>{subject}</option>
          ))}
        </select>
      </div>

      <table className="table is-bordered">
        <thead>
          <tr>
            <th>№ з/п</th>
            <th>ПІБ учня(учениці)</th>
            {filteredDates.map((date) => (
              <th key={`header${date.date}`}>{date.date}</th>
            ))}
            <th>
              <div className="MarksList__wrapper">
                <input
                  type="date"
                  name="date"
                  value={date || ''}
                  onChange={(event) => setDate(event.target.value)}
                  className="MarksList__input"
                />

                <button
                  type="button"
                  onClick={updateMark}
                  className="MarksList__buttonSave"
                  disabled={Boolean(!date || datesFromStore.find(dateObj => dateObj.date === date))}
                >
                  ✅
                </button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {studentsList.map((student, index) => (
            <tr key={student.id}>
              <td>{index + 1}</td>
              <td>{student.personName}</td>

              {filteredDates.map((date) => (
                <td key={date.date}>{student.marks[date.date]?.mark || ''}</td>
              ))}

              <td>
                <MarkInput
                  value={marks[student.id]}
                  setValue={(value) => setMarks({ ...marks, [student.id]: value })}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
