import { Link, NavLink } from 'react-router-dom';
import '../assets/nav.css';
import { ColorOne, ColorTwo } from '../styles/color';
import { ErrorText, Imageview, Title } from '../styles/styled';
import Logo from '../assets/logo/logo.png';

function Nav({ navItems, navLinks, View, Show }) {
  return (
    <nav className='navbar navbar-light navbar-expand-lg sticky-top colour'>
      <div className='container'>
        <span className='navbar-brand mb-0 h1  font-weight-bold'>
          <h4 style={{ color: 'white' }}>Purple Marts Admin</h4>
        </span>
        <button
          className='navbar-toggler text-light bg-light'
          type='button'
          data-toggle='collapse'
          data-target='#navbarNavDropdown'
          aria-controls='navbarNavDropdown'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon text-light'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNavDropdown'>
          <ul className='navbar-nav  mx-auto mt-2 nav-fill w-75'>
            {View && (
              <li className='nav-item dropdown'>
                <a
                  href='#'
                  className='nav-link text-light mt-2  h6 font-weight-bold'
                  id='navbarDropdown'
                  role='button'
                  data-toggle='dropdown'
                  aria-haspopup='true'
                  aria-expanded='false'
                  id='check'
                >
                  View All
                </a>
                <div className='dropdown-menu' aria-labelledby='navbarDropdown'>
                  <Link
                    to={{ pathname: '/View', state: { show: 'category' } }}
                    className='dropdown-item'
                  >
                    Show Category
                  </Link>
                  <Link
                    to={{ pathname: '/View', state: { show: 'supplier' } }}
                    className='dropdown-item'
                    href='#'
                  >
                    Show Suppliers
                  </Link>
                  <a className='dropdown-item' href='#'>
                    Something else here
                  </a>
                </div>
              </li>
            )}
            {Show && (
              <li className='text-center'>
                <select
                  onChange={Show}
                  id='check'
                  style={{
                    border: 'none',
                    backgroundColor: 'transparent',
                    outline: 'none',
                    marginTop: '15px',
                    minWidth: 'auto',
                    color: 'white',
                  }}
                >
                  <option style={{ color: ColorOne }} defaultvalue=''>
                    Show Items
                  </option>
                  <option style={{ color: ColorOne }} value='category'>
                    Show Catagory
                  </option>
                  <option style={{ color: ColorOne }} value='supplier'>
                    Show Supplier
                  </option>
                  <option style={{ color: ColorOne }} value='product'>
                    Show Products
                  </option>
                </select>
              </li>
            )}

            {navItems.map((value, index) => (
              <li className='nav-item text-light ' id='check'>
                <NavLink
                  to='/'
                  className='nav-link text-light h6 font-weight-bold'
                  id='check'
                >
                  {value == 'logout' ? (
                    <button class='btn btn-danger '>logout</button>
                  ) : (
                    <p style={{ marginTop: '7px' }}>{value}</p>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
