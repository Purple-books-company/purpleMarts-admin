
import '././css/nav.css';


function Nav() {
    return (
         
<nav className="navbar navbar-light navbar-expand-lg sticky-top colour">
  <div className="container">
  <span className="navbar-brand mb-0 h1 text-light font-weight-bold">Purple Marts</span>
  <button className="navbar-toggler text-light bg-light" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon text-light"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavDropdown">
     <ul className="navbar-nav mx-auto nav-fill w-75">
      <li className="nav-item">
        <a className="nav-link text-light h6 font-weight-bold" href="#">Home</a>
      </li>
      <li className="nav-item">
        <a className="nav-link text-light h6 font-weight-bold" href="#">Link2</a>
      </li>
      <li className="nav-item">
        <a className="nav-link text-light h6 font-weight-bold" href="#">Link3</a>
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link text-light h6 font-weight-bold" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <a className="dropdown-item" href="#">Action</a>
          <a className="dropdown-item" href="#">Another action</a>
          <a className="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link text-light h6 font-weight-bold" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <a className="dropdown-item" href="#">Action</a>
          <a className="dropdown-item" href="#">Another action</a>
          <a className="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link text-light h6" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fas fa-search"></i></a>
        <div className="dropdown-menu colour justify-content-center" aria-labelledby="navbarDropdown">
          <form className="form-inline colour text-center justify-content-center">

    <input className="form-control mr-sm-2 text-center justify-content-center" style={{width: 'auto'}} type="search" placeholder="Search" aria-label="Search" />
   
    <button className="btn btn-dark my-2 my-sm-0 colour" type="submit"><i className="fas fa-search"></i></button>
  </form>
        </div>
      </li>
    </ul>
    <ul className="navbar-nav">
      <li className="nav-item text-center">
        <a href="#" className="nav-link text-light h6 a"><i className="fas fa-sign-out-alt"></i></a>
      </li>
    </ul>
     
  </div>
  </div>
</nav>

    );
  }
  
  export default Nav;