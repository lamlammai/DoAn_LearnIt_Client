/* eslint-disable eqeqeq */
import React, { useEffect, useState, useContext } from "react";
import "./style.scss";
import Slider from "react-slick";
import { message } from "antd";
import { sendGet } from "../../../utils/api";
import { AppContext } from "../../../context/AppContext";
import Layout from "../../../component/Layout/Basic/Layout";
import Carousel from "../../../component/Carousel/Carousel";
import LearningItem from "../../../component/LearningItem/LearningItem";
import FeaturedPost from "../../../component/FeaturedPost/FeaturedPost";
import UnstudyCourses from "../../../component/UnstudyCourse/UnstudyCourse";
import Xemtatca from "../../../component/Button/Xemtatca";
function HomePage() {
  document.title = "Learn IT - Học lập trình để đi làm";
  const [data, setData] = useState([]);

  const [courseVip, setcourseVip] = useState([]);
  const [comingsoon, setcomingsoon] = useState([]);
  const [courseNormal, setcourseNormal] = useState([]);
  const [courseSuitable, setcourseSuitable] = useState([]);

  const Token = localStorage.getItem("accessToken");
  const { settings } = useContext(AppContext);

  const listCourse = async () => {
    const res = await sendGet("/courses");
    if (res.statusCode === 200) {
      setcomingsoon(res.returnValue.data?.filter((item) => item.type == 2));
      setcourseNormal(res.returnValue.data?.filter((item) => item.type == 0));
      setcourseVip(res.returnValue.data?.filter((item) => item.type == 1));
      setcourseSuitable(
        res.returnValue.data?.filter((item) => item.path == "FRONTEND")
      );
    } else {
      message.error("Vui lòng thử lại sau!");
    }
  };
  const userCourse = async () => {
    if (Token) {
      const res = await sendGet("/courses/user/current");
      if (res.statusCode === 200) {
        setData(res.returnValue.data);
      } else {
        message.error("Vui lòng thử lại sau!");
      }
    }
  };
  useEffect(() => {
    listCourse();
    userCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Layout>
        <div className="Home-wrapper">
          <section>
            <Carousel />
            <div className="content-right-body">
              <p>
                <strong>145.436+</strong> người khác cũng học
              </p>
              {/* khóa đang học */}
              {Token ? (
                <div className="SectionList-wrapper">
                  <div className="SectionList-title">
                    <h2>Khóa đang học</h2>
                    <Xemtatca data="/learning" />
                  </div>
                  {data.length <= 0 ? (
                    <div className="Course-main" style={{ height: "auto" }}>
                      <p>Bạn chưa đăng kí khóa học nào</p>
                    </div>
                  ) : (
                    <div className="Course-main">
                      <Slider {...settings}>
                        {data?.map((item, index) => (
                          <LearningItem data={item.course} key={index} />
                        ))}
                      </Slider>
                    </div>
                  )}
                </div>
              ) : null}
              <div className="SectionList-wrapper">
                <div className="SectionList-title">
                  <h2>Sắp ra mắt</h2>
                </div>
                <div className="Course-main">
                  <Slider {...settings}>
                    {comingsoon?.map((item, index) => (
                      <LearningItem data={item} key={index} />
                    ))}
                  </Slider>
                </div>
              </div>
              {/* khóa phù hợp với bạn */}
              {Token && (
                <div className="SectionList-wrapper">
                  <div className="SectionList-title">
                    <h2>Khóa học phù hợp với bạn</h2>
                    <Xemtatca data="/learning" />
                  </div>
                  <div className="UnstudyCourses-main">
                    <Slider {...settings}>
                      {courseSuitable?.map((item, index) => (
                        <LearningItem data={item} key={index} />
                      ))}
                    </Slider>
                  </div>
                </div>
              )}
              {/* khóa trả phí */}
              <div className="SectionList-wrapper">
                <div className="SectionList-title">
                  <h2>Khóa học Vip</h2>
                  <Xemtatca data="/learning" />
                </div>
                <div className="UnstudyCourses-main">
                  <Slider {...settings}>
                    {courseVip?.map((item, index) => (
                      <LearningItem data={item} key={index} />
                    ))}
                  </Slider>
                </div>
              </div>
              {/* Khóa miễn phí */}
              <div className="SectionList-wrapper">
                <div className="SectionList-title">
                  <h2>Khóa học miễn phí</h2>
                  <Xemtatca data="/learning" />
                </div>
                <div className="UnstudyCourses-main">
                  <Slider {...settings}>
                    {courseNormal?.map((item, index) => (
                      <UnstudyCourses key={index} data={item} />
                    ))}
                  </Slider>
                </div>
              </div>
              <FeaturedPost />
              {/* <FeaturedVideo /> */}
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}
export default HomePage;
