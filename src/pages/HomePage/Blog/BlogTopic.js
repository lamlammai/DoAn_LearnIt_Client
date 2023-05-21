// thay doi
import React, { useEffect, useState } from "react";
import "./Blog.scss";
import "../StudyRoute/StudyRoute.scss";
import Layout from "../../../component/Layout/Basic/Layout";
import { Link, useParams } from "react-router-dom";
import BlogItemTopic from "./BlogItemTopic";
import { sendGet } from "../../../utils/api";
import { Skeleton, message } from "antd";

const topic = [
  // thay doi
  { name: "Frontend", link: "FRONTEND" },
  { name: "Backend", link: "BACKEND" },
  { name: "Basic", link: "BASIC" },
  { name: "Mobile", link: "MOBILE" },
  { name: "DEVOPS", link: "DEVOPS" },
  { name: "Other", link: "OTHERS" },
];
export default function BlogTopic() {
  document.title = "Bài viết theo chủ đề";
  let params = useParams();
  const [data, setData] = useState();

  const listBlog = async () => {
    const res = await sendGet("/posts/user", { topic: params.id });
    if (res.statusCode == 200) {
      setData(res?.returnValue?.data.data);
    } else {
      message.error("Cập nhật khóa học thất bại");
    }
  };

  useEffect(() => {
    listBlog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(`data`, data);
  // if (!Object.keys(data).length)
  //   return (
  //     <>
  //       <Skeleton />
  //     </>
  //   );
  return (
    <>
      <Layout>
        <div className="StudyRoute-wrapper">
          <section className="Main-row">
            <div className="Main-left">
              <p>Danh sách các bài viết khác</p>
              <div className="Blog-wrapper">
                {data &&
                  data?.map((item, index) => (
                    <BlogItemTopic item={item} key={index} />
                  ))}
              </div>
            </div>
            <div className="Main-right">
              <div className="Blog-topic">
                <h3>Các chủ đề được đề xuất</h3>
                <div className="Topic-list">
                  {topic.map((item, key) => (
                    <div className="Topic-item" key={key}>
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
