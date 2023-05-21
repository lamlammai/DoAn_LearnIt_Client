import React from "react";
import "./Footer.scss";
import { logo } from "../../../constants/images";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <div className="footer-wrapper">
        <div class="footer-row">
          <div class=" footer-col footer__col1">
            <div>
              <Link to="/" class="footer-link">
                <img src={logo} alt="logo" height={50} />
              </Link>
              <h2>
                Học lập trình để đi làm <p>Learn IT</p>
              </h2>
            </div>
            <ul>
              <li>
                <span>Email: contact@fullstack.edu.vn</span>
              </li>
              <li>
                <span>
                  Địa chỉ: Nhà D9, lô A10, Nam Trung Yên, Yên Hòa, Cầu Giấy, Hà
                  Nội.
                </span>
              </li>
            </ul>
          </div>
          <div class="footer-col footer__col2">
            <h3>Hỗ trợ</h3>
            <ul>
              <li>
                <Link to="/call" class="footer-link">
                  Liên hệ
                </Link>
              </li>
              <li>
                {" "}
                <Link class="footer-link" to="/security">
                  Bảo mật
                </Link>
              </li>
              <li>
                <Link to="/rules" class="footer-link">
                  Điều khoản
                </Link>
              </li>
            </ul>
          </div>
          <div class=" footer-col footer__col3">
            <h3>Về Learn IT</h3>
            <ul>
              <li>
                <Link to="/about" class="footer-link">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link to="/job" class="footer-link">
                  Cơ hội việc làm
                </Link>
              </li>
              <li>
                <a
                  href="http://www.actvn.edu.vn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="footer-link"
                >
                  Đối tác
                </a>
              </li>
            </ul>
          </div>
          <div class="footer-col footer__col1">
            <h3>Đơn vị chủ quản</h3>
            <ul>
              <li>
                <span>Đơn vị chủ quản: HỌC VIỆN KỸ THUẬT MẬT MÃ</span>
              </li>
              <li>
                <span>Ngày thành lập: 23/12/2022</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
