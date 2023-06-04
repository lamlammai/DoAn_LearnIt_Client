import React from "react";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import { Link } from "react-router-dom";
import "./Carousel.scss";
import { bg1, bg2, bg3, logo } from "../../constants/images";

const carousel = [
  {
    title: "Lập trình hướng đối tượng trong C++",
    description:
      "Object-Oriented-Programming (Object-Oriented-Programming) là một phương pháp lập trình dựa trên đối tượng để tìm ra bản chất của vấn đề. Khóa học này giúp các lập trình viên học các kỹ thuật lập trình mà tất cả các yêu",
    button: "Học ngay",
    link: "/course/1",
    image: bg2,
    user: "Admin",
    userProfile: logo,
  },
  {
    title: "Kiến thức cơ bản về Python",
    description: "Kiến thức cơ bản về Python",
    button: "Học ngay",

    link: "/course/5",
    image: bg1,
    user: "Admin",
    userProfile: logo,
  },
  {
    title: "Kiến thức cơ bản về JavaScript",
    description:
      "Giúp lập trình viên nâng cao kỹ năng lập trình với các thuật toán mạnh mẽ để giải quyết các vấn đề lập trình phức tạp.",
    button: "Học ngay",

    link: "/course/7",
    image: bg3,
    user: "Admin",
    userProfile: logo,
  },
  {
    title: "Thành quả của Học viên",
    description:
      "Để đạt được kết quả tốt trong mọi việc ta cần xác định mục tiêu rõ ràng cho việc đó. Học lập trình cũng không là ngoại lệ.",
    button: "Xem thêm",
    link: "/blog/san-pham-cua-hoc-vien",
    image: "https://i.imgur.com/bGog30Z.png",
    user: "Học viên",
    userProfile: logo,
  },
];

const Carousel = () => (
  <Slider className="slider-wrapper" autoplay={2000}>
    {carousel.map((item, index) => (
      <div
        key={index}
        className="slider-content"
        style={{ backgroundImage: `url('${item.image}')` }}
      >
        <div className="inner">
          <h1>{item.title}</h1>
          <p>{item.description}</p>
          <button>
            <Link to={item.link}>{item.button}</Link>
          </button>
        </div>
        <section>
          <img src={item.userProfile} alt={item.user} />
          <span>
            Sản phẩm của <strong>{item.user}</strong>
          </span>
        </section>
      </div>
    ))}
  </Slider>
);
export default Carousel;
