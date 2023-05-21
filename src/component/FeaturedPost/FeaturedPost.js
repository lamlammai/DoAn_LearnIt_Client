import React, { useContext, useEffect, useState } from "react";
import Xemtatca from "../Button/Xemtatca";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { imgErr, avt, logo } from "../../constants/images";
import { AppContext } from "../../context/AppContext";
import { sendGet } from "../../utils/api";
import { message } from "antd";
function Posts() {
  const { settings } = useContext(AppContext);
  const [data, setData] = useState([]);
  const formatterDate = new Intl.DateTimeFormat("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const listBlog = async () => {
    try {
      const res = await sendGet("/posts/user");
      if (res.statusCode === 200) {
        setData(res.returnValue?.data?.data);
      } else {
        message.error("Cập nhật khóa học thất bại");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    listBlog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="SectionList-wrapper">
        <div className="SectionList-title">
          <h2>Bài viết gần đây</h2>
          <Xemtatca data="/blog" />
        </div>
        <div className=" Post-main">
          <Slider {...settings}>
            {data.slice(0, 4)?.map((item) => (
              <div className="Post-item Learning-item">
                <Link to={item?.id}>
                  <div className="img-item">
                    <img
                      alt="course"
                      src={item?.image}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `${imgErr}`;
                      }}
                    />
                  </div>
                </Link>

                <h3>{item.title}</h3>
                <div className="Author">
                  <img
                    alt="author"
                    src={item?.author?.avt ? item?.author?.avt : logo}

                  />
                  <p>{item?.author?.username}</p>
                  <p>{formatterDate.format(Date.parse(item?.createdAt))}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}

export default Posts;
