/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import "./Blog.scss";
import "../StudyRoute/StudyRoute.scss";
import Layout from "../../../component/Layout/Basic/Layout";
import { Link } from "react-router-dom";
import { Tabs, message } from "antd";
import BlogItem from "./BlogItem";
import { sendGet } from "../../../utils/api";

const topic = [
  // thay doi
  { name: "Frontend", link: "FRONTEND" },
  { name: "Backend", link: "BACKEND" },
  { name: "Basic", link: "BASIC" },
  { name: "Mobile", link: "MOBILE" },
  { name: "DEVOPS", link: "DEVOPS" },
  { name: "Other", link: "OTHERS" },
];
const { TabPane } = Tabs;
export default function Blog() {
  document.title = "Danh sách các bài viết về IT";
  const [data, setData] = useState([]);
  const [dataSuitable, setDataSuitable] = useState([]);

  const Token = localStorage.getItem("accessToken");
  const listBlog = async () => {
    try {
      const res = await sendGet("/posts/user");
      if (res.statusCode === 200) {
        setData(res.returnValue?.data?.data);
        setDataSuitable(
          res.returnValue?.data?.data?.filter((item) => item.topic == "BACKEND")
        );
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
      <Layout>
        <div className="StudyRoute-wrapper">
          <section className="Main-row">
            <div className="Main-left">
              <Tabs defaultActiveKey="1">
                <TabPane tab="Mới nhất" key="1">
                  <div className="Blog-wrapper">
                    {data &&
                      data?.map((item, index) => (
                        <BlogItem item={item} key={index} />
                      ))}
                  </div>
                </TabPane>
                <TabPane tab="Phù hợp với bạn" key="2">
                  {Token ? (
                    <div className="Blog-wrapper">
                      {dataSuitable &&
                        dataSuitable?.map((item, index) => (
                          <BlogItem item={item} key={index} />
                        ))}
                    </div>
                  ) : (
                    <p>
                      Bạn cần <Link to="/Signin">đăng nhập </Link> để xem các
                      bài viết phù hợp
                    </p>
                  )}
                </TabPane>
              </Tabs>
            </div>
            <div className="Main-right">
              <div className="Blog-topic">
                <h3>Các chủ đề được đề xuất</h3>
                <div className="Topic-list">
                  {topic.map((item, index) => (
                    <div className="Topic-item" key={index}>
                      <Link to={`/topic/${item.link}`}>{item.name}</Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}
