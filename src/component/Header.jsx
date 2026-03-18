import packLogo from '../assets/Icon_PackMaster.ico';
import loginButton from '../assets/loginButton.png';
import '../css/Header.css';

function Header() {
  return (
    <div className="header">
      <div className="header-item-left">
        <a target="_blank">
          <img src={packLogo} className="logo mertrack" alt="Mertrack Logo" />
        </a>
      </div>

      <div className="header-item">Menu 1</div>
      <div className="header-item">Menu 2</div>
      <div className="header-item">Menu 3</div>
      <div className="header-item-right">
        <button className="login button">
          <img src={loginButton} />
        </button>
      </div>
    </div>
  );
}

export default Header;
