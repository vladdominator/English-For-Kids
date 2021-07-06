import React from "react";
import "./Footer.scss";

const Footer: React.FC = () => (
  <footer className="footer">
    <div className="footer__container">
      <div className="footer__information_creator">
        <a className="creater" href="https://github.com/vladdominator">
          <img className="creater" src="../img/user.jpg" alt="user" />
        </a>
        <span className="date__creater">2021</span>
      </div>
      <a className="logo__rs-school" href="https://rs.school/">
        <img
          className="logo__rs-school"
          src="https://rs.school/images/rs_school_js.svg"
          alt="rs-school"
        />
      </a>
    </div>
  </footer>
);
export default Footer;
