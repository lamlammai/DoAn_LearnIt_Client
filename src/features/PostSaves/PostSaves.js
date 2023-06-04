import React, { useEffect, useState } from "react";
import { message, Tabs } from "antd";
import { Link } from "react-router-dom";
import Header from "../../component/Layout/Header/HeaderLayout";
import "./PostSaves.scss";
import { sendDelete, sendGet } from "../../utils/api";

const { TabPane } = Tabs;
function PostSaves() {
  const formatterDate = new Intl.DateTimeFormat("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const [save, setSave] = useState([]);
  // const [name, setName] = useState([]);
  const Savepost = async () => {
    const res = await sendGet(`/posts/get-user-post`);
    if (res.statusCode === 200) {
      setSave(res.returnValue.data?.data);
    } else {
      message.error("Vui lòng thử lại sau");
    }
  };
  const handleDelete = async (values) => {
    const res = await sendDelete(`/posts/user/${values}`);
    if (res.statusCode === 200) {
      await Savepost();
      message.success("Xóa thành công!");
    } else {
      message.error("Vui lòng thử lại sau!");
    }
  };
  useEffect(() => {
    Savepost();
  }, []);
  return (
    <>
      <div className="Post-wrapper">
        <Header />
        <div className="Post-container">
          <h1>Bài viết của tôi</h1>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Đã xuất bản" key="1">
              {save.length > 0 ? (
                <ul>
                  {save.map((item, index) => (
                    <li key={index}>
                      <h3>{item?.title}</h3>
                      <p>
                        <span>
                          {formatterDate.format(Date.parse(item?.createdAt))}
                        </span>{" "}
                        <strong>.</strong>Tác giả:
                        <span className="author-name">
                          {item?.author?.username}
                        </span>
                        <i class="fas fa-ellipsis-h">
                          <ul>
                            <li onClick={() => handleDelete(item.id)}>Xóa</li>
                            <li>
                              <Link to={`/edit-post/${item.id}`}> Sửa</Link>
                            </li>
                          </ul>
                        </i>
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <>
                  {" "}
                  <p>Chưa có xuất bản nào.</p>
                  <p>
                    Bạn có thể <Link to="#">viết bài mới</Link> hoặc{" "}
                    <Link to="#">đọc bài viết</Link> khác trên FULLSTACK nhé.
                  </p>
                </>
              )}
            </TabPane>
            {/* <TabPane tab="Đã lưu" key="2">
              <ul>
                {result.map((item) => (
                  <>
                    <li>
                      <h3>{item.title}</h3>
                      <p>
                        <span>{item.created_at}</span> <strong>.</strong>Tác
                        giả:
                        <span className="author-name">{item.name}</span>
                        <i class="fas fa-ellipsis-h">
                          <ul>
                            <li onClick={() => handleDelete(item.id)}>Xóa</li>
                          </ul>
                        </i>
                      </p>
                    </li>
                  </>
                ))}
              </ul>
              <p>Chưa lưu bài viết nào.</p>
              <p>
                Bạn có thể <Link to="#">viết bài mới</Link> hoặc{" "}
                <Link to="#">đọc bài viết</Link> khác trên LEARNIT nhé.
              </p>
            </TabPane> */}
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default PostSaves;
