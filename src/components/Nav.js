import { Link, NavLink } from 'react-router-dom';
import '../assets/nav.css';
import { ColorOne } from '../styles/color';
// import logo from '../assets/logo/logo.png';
function Nav({ navItems, navLinks, View, Show, logout }) {
  function handleLogout() {
    let isconfirm = window.confirm('Are you sure for logout');
    if (isconfirm) logout();
  }
  return (
    <nav
      className='navbar sticky-top navbar-light navbar-expand-lg colour '
      style={{ display: '', backgroundColor: '#e9e3f4' }}
    >
      <div className='container'>
        <span className='navbar-brand mb-0 h1  font-weight-bold'>
          <img
            src='https://raw.githubusercontent.com/Purple-books-company/purple-marts-user-ui/main/src/assets/images/logo.png'
            style={{ height: '45px', textAlign: 'center' }}
            alt="Purple marts"
          />
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
          <span className='navbar-toggler-icon text-right text-light'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNavDropdown'>
          <ul className='navbar-nav  mx-auto mt-2 nav-fill w-75'>
            {View && (
              <li className='nav-item dropdown'>
                <a
                  href='#'
                  className='nav-link  mt-2 purple-text   h6 font-weight-bold'
                  id='navbarDropdown '
                  role='button'
                  data-toggle='dropdown'
                  aria-haspopup='true'
                  aria-expanded='false'
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
                  <Link
                    to={{ pathname: '/View', state: { show: 'product' } }}
                    className='dropdown-item'
                  >
                    Show Products
                  </Link>
                </div>
              </li>
            )}
            {Show && Show !== null && (
              <li className='text-center purple-text'>
                <select
                  onChange={Show}
                  style={{
                    border: 'none',
                    backgroundColor: 'transparent',
                    outline: 'none',
                    marginTop: '15px',
                    minWidth: 'auto',
                    color: 'black',
                  }}
                >
                  <option style={{ color: ColorOne }} value='' defaultValue=''>
                    Show Items
                  </option>
                  <option style={{ color: ColorOne }} value='category'>
                    Category
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

            {navItems &&
              navItems.map((value, index) => (
                <li className='nav-item  ' key={index} id='check'>
                  <NavLink
                    to={navLinks[index]}
                    className='nav-link purple-text  h6 font-weight-bold'
                    id='check'
                  >
                    {value === 'logout' ? (
                      <button className='btn btn-danger' onClick={handleLogout}>
                        logout
                      </button>
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
