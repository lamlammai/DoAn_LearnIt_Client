/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Footer from "../../../component/Layout/Footer/footer";
import HeaderLayout from "../../../component/Layout/Header/HeaderLayout";
import "./call.scss";

const Call = () => {
  document.title = "Liên hệ với chúng mình";
  return (
    <div>
      <HeaderLayout />
      <div class="call">
        <div class="call-center">
          <div class="call-heading">
            <div class="call-heading-module">
              <h3>Liên hệ</h3>
              <p>
                Learn IT trân trọng mọi ý kiến đóng góp của bạn. Đừng ngại liên
                hệ khi bạn có bất kỳ câu hỏi nào.
              </p>
            </div>
          </div>
          <div class="call-module">
            <div class="call-module-row">
              <section class="index-col">
                <form>
                  <div class="text-input">
                    <label>Họ và tên</label>
                    <div class="input">
                      <input
                        placeholder="Nhập tên của bạn"
                        name="name"
                        maxLength={50}
                      />
                    </div>
                  </div>
                  <div class="text-input">
                    <label>Email</label>
                    <div class="input">
                      <input placeholder="Nhập email của bạn" name="email" />
                    </div>
                  </div>
                  <div class="text-input">
                    <label>Số điện thoại</label>
                    <div class="input">
                      <input
                        placeholder="Nhập số điện thoại của bạn (không bắt buộc)"
                        name="number"
                      />{" "}
                    </div>
                  </div>
                  <div class="text-input">
                    <label>Nội dung</label>
                    <div class="input">
                      <textarea
                        placeholder="Bạn muốn nhắn gì cho Learn IT"
                        name="description"
                      />
                    </div>
                  </div>
                  <button class="call-submit" type="submit">
                    Gửi tin nhắn
                  </button>
                </form>
              </section>
              <section class="index-col">
                <div class="index-border-col">
                  <div class="index-col-right">
                    <a
                      target="_blank"
                      href="https://www.facebook.com/kyo.hiraky"
                      rel="noreferrer"
                    >
                      <i class="fab fa-facebook-square"></i>
                    </a>
                    <a href="#" target="_blank" rel="noreferrer">
                      <i class="fab fa-youtube-square"></i>
                    </a>
                  </div>
                  <div class="index-col-right">
                    <h2>Địa chỉ</h2>
                    <p>
                      Nhà D9, lô A10, Nam Trung Yên, Trung Hòa, Cầu Giấy, Hà Nội
                    </p>
                  </div>
                  <div class="index-col-right">
                    <h2>Email</h2>
                    <p>contact@fullstack.edu.vn</p>
                  </div>
                  <div class="image">
                    <img
                      alt="img"
                      src="https://fullstack.edu.vn/assets/icon/contact.png"
                      height={150}
                    />
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Call;
