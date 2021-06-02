// import logo from './logo.svg';
import '././abc.css';
const text={
  backgroundColor:'#a791b2',
  borderRadius: '10%'
};

function App() {
  return (
    <div className="container" style={{backgroundColor:'red'}}>
      <div className="container" id="box">
      <div className="row">
        <div className="col-4" id="bg"></div>

        <div className="media-body col-8" id="form-div">
          <h3 className="mb-4 text-center" id="log" style={{color: '#3d2947'}}>Log<strong><span style={text}>In</span></strong></h3>
          <form action="" method="post">
            <div className="input-group py-4">
              <span className="input-group-addon">
                <i className="far fa-envelope fa-lg" style={{color: '#a791b2'}} aria-hidden="true"></i>
              </span>
              <input name="email" className="form-control" id="email" type="email" placeholder="Email" />
          </div>
              <div className="input-group py-4">
                <span className="input-group-addon">
                  <i className="fas fa-lock fa-lg" style={{color: '#a791b2'}} aria-hidden="true"></i>
                </span>
                <input name="password" className="form-control" id="password" type="password" placeholder="Password" />
      
      </div>
                <button type="submit" id="login">Log in</button>
</form>
            </div>
    </div>




          
</div>
        </div>
  );
}

export default App;
