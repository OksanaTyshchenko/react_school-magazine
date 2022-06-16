import { NavLink } from 'react-router-dom';

export const MainNavigation = () => {
  return (
    <nav className="navbar is-primary is-spaced">
     <div className="navbar-brand">
        <NavLink 
          to="/"
          exact
          className="navbar-item is-tab"
          activeClassName="is-active"
        >
          Головна
        </NavLink>

        <NavLink 
          to="/students"
          className="navbar-item is-tab"
          activeClassName="is-active"
        >
          Учні
        </NavLink>

        <NavLink 
          to="/marks"
          className="navbar-item is-tab"
          activeClassName="is-active"
        >
          Оцінки
        </NavLink>

        <NavLink 
          to="/rating"
          className="navbar-item is-tab"
          activeClassName="is-active"
        >
          Рейтинг
        </NavLink>
      </div>
    </nav>
  );
}

