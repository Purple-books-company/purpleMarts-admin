import { Link, NavLink } from 'react-router-dom';
import '../assets/nav.css';
import { ColorOne } from '../styles/color';

function Nav({ navItems, navLinks, View, Show }) {
  return (
    <nav
      className='navbar sticky-top navbar-light navbar-expand-lg  colour'
      style={{ display: '' }}
    >
      <div className='container'>
        <span className='navbar-brand mb-0 h1  font-weight-bold'>
          <h4 style={{ color: ColorOne }}>Purple Marts Admin</h4>
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
                <span
                  href='#'
                  className='nav-link  mt-2  h6 font-weight-bold'
                  id='navbarDropdown'
                  role='button'
                  data-toggle='dropdown'
                  aria-haspopup='true'
                  aria-expanded='false'
                >
                  View All
                </span>
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
                  <Link
                    to={{ pathname: '/View', state: { show: 'product' } }}
                    className='dropdown-item'
                  >
                    Show Products
                  </Link>
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
                  <option style={{ color: ColorOne }} defaultValue=''>
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
              <li className='nav-item  ' key={index} id='check'>
                <NavLink
                  to='/'
                  className='nav-link  h6 font-weight-bold'
                  id='check'
                >
                  {value === 'logout' ? (
                    <button className='btn btn-danger '>logout</button>
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
