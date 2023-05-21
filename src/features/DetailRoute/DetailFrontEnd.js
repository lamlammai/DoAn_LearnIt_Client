/* eslint-disable eqeqeq */
import "./Detail.scss";
import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import Layout from "../../component/Layout/Basic/Layout";
import { sendGet } from "../../utils/api";
import { message } from "antd";
import { Link } from "react-router-dom";
import { mapfront } from "../../constants/images";
export default function DetailFrontEnd() {
  // const { id } = useParams();
  const [data, setData] = useState([]);

  const listCourse = async () => {
    const res = await sendGet("/courses");
    if (res.statusCode === 200) {
      setData(res.returnValue.data?.filter((item) => item.path == "FRONTEND"));
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
                <h1>Front-end</h1>
                <p>
                  Hầu hết các websites hoặc ứng dụng di động đều có 2 phần là
                  Front-end và Back-end. Front-end là phần giao diện người dùng
                  nhìn thấy và có thể tương tác, đó chính là các ứng dụng mobile
                  hay những website bạn đã từng sử dụng. Vì vậy, nhiệm vụ của
                  lập trình viên Front-end là xây dựng các giao diện đẹp, dễ sử
                  dụng và tối ưu trải nghiệm người dùng.
                </p>
                <p>
                  Tại Việt Nam, lương trung bình cho lập trình viên front-end
                  vào khoảng <strong>16.000.000đ</strong>/ tháng
                </p>
                <p>
                  Dưới đây là các khóa học F8 đã tạo ra dành cho bất cứ ai theo
                  đuổi sự nghiệp trở thành một lập trình viên{" "}
                  <strong>Front-end</strong>.
                </p>
                <blockquote>
                  <i className="fas fa-quote-left"></i>
                  Các khóa học có thể chưa đầy đủ, chúng mình vẫn đang nỗ lực
                  hoàn thiện trong thời gian sớm nhất.
                </blockquote>

                <div className="Detail-content">
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
              <div
                className="Main-right"
                style={{ paddingLeft: "19px", paddingRight: "19px" }}
              >
                <div className="Main-right-body">
                  <div className="DetaiInfo-wrapper">
                    <div
                      className="Detail-info"
                      style={{ padding: "30px 16px" }}
                    >
                      <h3>
                        Ai cũng có thể tham gia khóa học Web Front-End tại LEARN
                        IT, tại đây phù hợp với mọi người muốn học nghề lập
                        trình, một số đối tượng cụ thể:
                      </h3>
                      <p>
                        {" "}
                        <i className="fas fa-user-check"></i>
                        Bạn là sinh viên đang học ở các trường Đại học, muốn bổ
                        sung thêm kiến thức và có nền tảng lập trình vững vàng
                      </p>
                      <p>
                        {" "}
                        <i className="fas fa-user-check"></i>
                        Những người chuyển từ ngành nghề khác sang ngành IT để
                        có công việc tốt hơn
                      </p>
                      <p>
                        {" "}
                        <i className="fas fa-user-check"></i>
                        Các bạn đang băn khoăn không biết chọn nghề nào dành cho
                        mình, đang muốn được định hướng và hỗ trợ để có lựa chọn
                        đúng đắn cho mình
                      </p>
                      <p>
                        {" "}
                        <i className="fas fa-user-check"></i>Đối tượng muốn cập
                        nhật thêm một số công nghệ mới.
                      </p>
                    </div>
                    <a
                      href="https://roadmap.sh/frontend"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img alt="mapFront" src={mapfront} />
                    </a>
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
