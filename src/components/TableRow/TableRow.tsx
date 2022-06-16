import { useState, ChangeEvent } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Row } from '../../types';
import { db } from '../databases';
import { actions } from '../../store';

import './TableRow.css';
import { useDispatch } from "react-redux";

export const TableRow = () => {
  const [row, setRow] = useState<Row>({
    personalNumber: 0,
    personName: '',
    sex: 'ч',
    dateBirthday: '',
    leaveInfo: '',
    parentNames: '',
    parentInfo: '',
    contacts: '',
  });
  const dispatch = useDispatch();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setRow({
      ...row,
      [name]: value,
    });
  };

  const addStudent = () => {
    const newStudent = {
      id: uuidv4(),
      marks: {},
      ...row,
    };

    db.collection('students').add(newStudent);

    dispatch(actions.addStudent(newStudent));
    setRow({
      personalNumber: 0,
      personName: '',
      sex: 'ч',
      dateBirthday: '',
      leaveInfo: '',
      parentNames: '',
      parentInfo: '',
      contacts: '',
    });
  }

  return (
    <tr>
      <td></td>

      <td>
        <input
          type="text"
          name="personalNumber"
          value={+row.personalNumber}
          onChange={handleChange}
        />
      </td>

      <td>
        <input
          type="text"
          name="personName"
          value={row.personName}
          onChange={handleChange}
        />
      </td>

      <td>
        <label className="Table__radio">
          <input
            type="radio"
            value="ч"
            onChange={() => setRow({...row, sex: 'ч'})}
            checked={row.sex === 'ч'}
          />
           ч
        </label>

        <label className="Table__radio">
          <input
            type="radio"
            value="ж"
            onChange={() => setRow({...row, sex: 'ж'})}
            checked={row.sex === 'ж'}
          />
           ж
        </label>
      </td>

      <td>
        <input
          type="date"
          name="dateBirthday"
          value={row.dateBirthday}
          onChange={handleChange}
        />
      </td>

      <td>
        <input
          type="text"
          name="leaveInfo"
          value={row.leaveInfo}
          onChange={handleChange}
        />
      </td>

      <td>
        <input
          type="text"
          name="parentNames"
          value={row.parentNames}
          onChange={handleChange}
        />
      </td>

      <td>
        <input
          type="text"
          name="parentInfo"
          value={row.parentInfo}
          onChange={handleChange}
        />
      </td>

      <td>
        <input
          type="text"
          name="contacts"
          value={row.contacts}
          onChange={handleChange}
        />
      </td>

      <td>
        <button
          type="button"
          onClick={() => addStudent()}
          className="TableRow__addButton"
        >
          ➕
        </button>
      </td>
    </tr>
  )
}