import React from 'react';
import { Dropdown, ListGroup } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

import useWindowSize from '../../../../hooks/useWindowSize';
import NavSearch from './NavSearch';
import { is } from 'immutable';

const NavLeft = () => {
  const windowSize = useWindowSize();

  let navItemClass = ['nav-item'];
  if (windowSize.width <= 575) {
    navItemClass = [...navItemClass, 'd-none'];
  }

  const location = useLocation();
  console.log(location.pathname);
  const isSalaryDetailPage = location.pathname === '/app/income/default';

  return (
    <React.Fragment>
      <ListGroup as="ul" bsPrefix=" " className="navbar-nav mr-auto">
        <ListGroup.Item as="li" bsPrefix=" " className={navItemClass.join(' ')}>
          <Dropdown align={'start'}>
            <Dropdown.Toggle variant={'link'} id="dropdown-basic">
              Dropdown
            </Dropdown.Toggle>
            <ul>
              <Dropdown.Menu>
                {isSalaryDetailPage && (
                  <li>
                    <Link to="/app/income/salary/add" className="dropdown-item">
                      Add new salary
                    </Link>
                  </li>
                )}
                {!isSalaryDetailPage && (
                  <li>
                    <Link to="#" className="dropdown-item">
                      Action
                    </Link>
                  </li>
                )}
              </Dropdown.Menu>
            </ul>
          </Dropdown>
        </ListGroup.Item>
        <ListGroup.Item as="li" bsPrefix=" " className="nav-item">
          <NavSearch windowWidth={windowSize.width} />
        </ListGroup.Item>
      </ListGroup>
    </React.Fragment>
  );
};

export default NavLeft;
