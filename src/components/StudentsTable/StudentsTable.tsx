import { TableRow } from "../TableRow/TableRow";
import { db } from "../databases";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "../../store";
import "./StudentTable.css";

export const StudentsTable = () => {
  const students = useSelector(selectors.loadStudents);
  const dispatch = useDispatch();

  const deleteStudent = (id: string) => {
    db.collection("students").doc({ id: id }).delete();

    dispatch(actions.removeStudent(id));
  };

  return (
    <table className="table is-bordered Table">
      <thead>
        <tr>
          <th>№ з/п</th>
          <th>№ особової справи</th>
          <th>Прізвище, ім'я та по батькові учня(учениці)</th>
          <th>Стать</th>
          <th>Число, місяць, рік народження</th>
          <th>Коли і куди вибув(вибула)</th>
          <th>Прізвище, ім'я та по батькові батька і матері(опікуна)</th>
          <th>Місце роботи батьків, контактний телефон</th>
          <th>Домашня адреса, номер телефону</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {students.map((student, index) => {
          return (
            <tr key={student.id}>
              <td>{index + 1}</td>
              <td>{student.personalNumber}</td>
              <td>{student.personName}</td>
              <td>{student.sex}</td>
              <td>{student.dateBirthday}</td>
              <td>{student.leaveInfo}</td>
              <td>{student.parentNames}</td>
              <td>{student.parentInfo}</td>
              <td>{student.contacts}</td>
              <td>
                <button type="button" onClick={() => deleteStudent(student.id)}>
                  🗑
                </button>
              </td>
            </tr>
          );
        })}
        <TableRow />
      </tbody>
    </table>
  );
};
