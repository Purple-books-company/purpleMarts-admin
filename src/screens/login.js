import '../assets/login.css';

import { useState } from 'react';
import { ColorTwo } from '../styles/color';
import Nav from '../components/Nav';

// import '././abc.css';
const text = {
  backgroundColor: '#a791b2',
  borderRadius: '10%',
};

function Login({ login }) {
  let initialState = {
    email: '',
    password: '',
  };
  const [detail, setDetail] = useState(initialState);
  function handleChange(e) {
    setDetail({ ...detail, [e.target.name]: e.target.value });
  }
  function handleSubmit() {
    login(detail.email);
  }
  return (
    <>
      <Nav />
      <div className='l_container'>
        <div
          className='l_container'
          id='box'
          style={{ marginLeft: '19%', maxWidth: '50%' }}
        >
          <div className='row'>
            <div className='col-4' id='bg'></div>

            <div className='media-body col-8' id='form-div'>
              <h3
                className='mb-4 text-center'
                id='log'
                style={{ color: '#3d2947' }}
              >
                Log
                <strong>
                  <span style={text}>In</span>
                </strong>
              </h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <div className='input-group py-4'>
                  <span className='input-group-addon'>
                    <i
                      className='far fa-envelope fa-lg'
                      style={{ color: '#a791b2' }}
                      aria-hidden='true'
                    ></i>
                  </span>
                  <input
                    name='email'
                    className='form-control'
                    id='email'
                    type='email'
                    value={detail.email}
                    placeholder='Email'
                    onChange={handleChange}
                  />
                </div>
                <div className='input-group py-4'>
                  <span className='input-group-addon'>
                    <i
                      className='fas fa-lock fa-lg'
                      style={{ color: '#a791b2' }}
                      aria-hidden='true'
                    ></i>
                  </span>
                  <input
                    name='password'
                    className='form-control'
                    id='password'
                    type='password'
                    value={detail.email}
                    placeholder='Password'
                    onChange={handleChange}
                  />
                </div>
                <button type='submit' id='login'>
                  Log in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
