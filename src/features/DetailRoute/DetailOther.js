/* eslint-disable eqeqeq */
import "./Detail.scss";
import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import Layout from "../../component/Layout/Basic/Layout";
import { sendGet } from "../../utils/api";
import { message } from "antd";
import { Link } from "react-router-dom";
function DetailOther() {
  // const { id } = useParams();
  const [data, setData] = useState([]);

  const listCourse = async () => {
    const res = await sendGet("/courses");
    if (res.statusCode === 200) {
      setData(res.returnValue.data?.filter((item) => item.path == "OTHER"));
    } else {
      message.error("Vui lòng thử lại sau!");
    }
  };
  useEffect(() => {
    listCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Layout>
        <div className="Detail-wrapper">
          <div className="StudyRoute-wrapper">
            <section className="Main-row">
              <div className="Main-left">
                <h1>Lộ trình khác</h1>
                <p>Các khóa học khác trong hệ thống.</p>
                <p>
                  Trong phần này chúng mình sẽ có những khóa học khác, để người
                  học cs thể nâng cao trình độ, kĩ năng cho mình .
                </p>

                <blockquote>
                  <i class="fas fa-quote-left"></i>
                  Các khóa học có thể chưa đầy đủ, chúng mình vẫn đang nỗ lực
                  hoàn thiện trong thời gian sớm nhất.
                </blockquote>
                <div className="Detail-content">
                  <h2>Tìm hiểu về ngành IT</h2>
                  <p>
                    Để theo ngành IT - Phần mềm cần rèn luyện những kỹ năng nào?
                    Bạn đã có sẵn tố chất phù hợp với ngành chưa? Cùng thăm quan
                    các công ty IT và tìm hiểu về văn hóa, tác phong làm việc
                    của ngành này nhé các bạn.
                  </p>
                  <div className="Detail-course Main-left-body">
                    {data?.map((item) => (
                      <div className="card-route">
                        <img alt="Khóa học" src={item?.img} />
                        <div className="card-body">
                          <Link to={`/course/${item?.id}`}>
                            <span>{item?.name}</span>
                          </Link>
                          <p>{item?.description}</p>
                          <Link to={`/course/${item?.id}`}>
                            <button className="btn-info">Xem khóa học</button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="Main-right">
                <div className="Main-right-body">
                  <div className="DetaiInfo-wrapper">
                    <div className="Detail-info">
                      <h2>CÓ PHẢI BẠN ĐÃ TỪNG NGHĨ RẰNG:</h2>
                      <p>
                        <i class="error fas fa-times-circle"></i>Lập trình viên
                        là một nghề rất xa vời?
                      </p>
                      <p>
                        <i class="error fas fa-times-circle"></i>Rất khó để có
                        thể học được nghề lập trình?
                      </p>
                      <p>
                        <i class="error fas fa-times-circle"></i>Công việc lập
                        trình chỉ dành cho những người rất giỏi toán?
                      </p>
                      <p>
                        <i class="error fas fa-times-circle"></i>Phải rất am
                        hiểu về công nghệ thì mới theo được lập trình?
                      </p>
                      <h2>HAY BẠN THÍCH HỌC LẬP TRÌNH NHƯNG KHÁ LO LẮNG:</h2>
                      <p>
                        <i class="question fas fa-question"></i> Mình đã không
                        học hành gì trong nhiều năm nên khó để đi học lại?
                      </p>
                      <p>
                        <i class="question fas fa-question"></i>Học 4 năm đại
                        học còn không xong thì làm sao học được trong vài tháng?
                      </p>
                      <p>
                        <i class="question fas fa-question"></i>Mình lớn tuổi
                        thế này thì bắt đầu có muộn quá không?
                      </p>
                      <p>
                        <i class="question fas fa-question"></i>Mình không biết
                        tiếng Anh thì không biết có học lập trình được không?
                      </p>
                      <p className="text">
                        <i class="tick fas fa-check"></i>Nhiều người cũng có suy
                        nghĩ giống bạn, nhưng sự thật thì để bắt đầu với nghề
                        lập trình thì dễ hơn bạn tưởng tượng nhiều.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default DetailOther;
