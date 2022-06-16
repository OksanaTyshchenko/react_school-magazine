import { ChangeEvent, SyntheticEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mainDb } from "../databases";
import { actions, selectors } from '../../store';

import './HomePage.css';


export const HomePage = () => {
  const [mainInfo, setMainInfo] = useState({
    nameClass: '',
    school: '',
    city: '',
    year: '',
  });

  const info = useSelector(selectors.loadMainInfo);

  const dispatch = useDispatch();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setMainInfo({
      ...mainInfo,
      [name]: value,
    })
  };

  const saveMainInfo = (event: SyntheticEvent) => {
    event.preventDefault();

    mainDb.collection('main').add(mainInfo);

    dispatch(actions.addMain(mainInfo));
  };

  return (
   <div className="Home__content">
   {info.length > 0 ? (
     <div>
       <h2 className="Home__title2">Міністерство освіти і науки України</h2>
       <h1 className="Home__title1">Класний журнал</h1>
       <p className="Home__info">{`${info[0].nameClass} класу`}</p>
       <p className="Home__info">{`${info[0].school}`}</p>
       <p className="Home__info">{`місто/село: ${info[0].city}`}</p>
       <p className="Home__info">{`на ${info[0].year} навчальний рік`}</p>
       <p className="Home__info">для V-XI класів</p>
     </div>
   ) : (
      <form onSubmit={saveMainInfo} className="Home__form">
        <h2 className="Home__title2">Міністерство освіти і науки України</h2>
        <h1 className="Home__title1">Класний журнал</h1>
        <label className="Home__label">
          <input
            type="text"
            name="nameClass"
            value={mainInfo.nameClass}
            onChange={handleChange}
            className="Home__input"
          />
          класу
        </label>
        
        <label className="Home__school">
          <input
            type="text"
            name="school"
            value={mainInfo.school}
            onChange={handleChange}
            className="Home__inputSchool"
          />
          (назва загальноосвітнього навчального закладу)
        </label>

        <label className="Home__label--city">
          міста/села
          <input 
            type="text"
            name="city"
            value={mainInfo.city}
            onChange={handleChange}
            className="Home__input--city"
          />
        </label>

        <label className="Home__label">
          на
          <input
            type="text"
            name="year"
            value={mainInfo.year}
            onChange={handleChange}
            className="Home__input--year"
          />
          навчальний рік
        </label>
        
        <p className="Home__text">для V-XI класів</p>

        <button
          type="submit"
          className="button is-primary Home__button"
        >
          Зберегти зміни
        </button>
    </form>
   )}
   </div>
  )
}