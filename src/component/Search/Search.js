import React, { useEffect, useState } from "react";
import Layout from "../Layout/Basic/Layout";
import { message, Tabs } from "antd";
import { sendGet } from "../../utils/api";
import { Link, useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./Search.scss";
const { TabPane } = Tabs;

function Search() {
  const params = useParams();
  const history = useHistory();
  const [course, setCourse] = useState([]);
  const [blog, setBlog] = useState([]);
  const [keyword, setKeyword] = useState(params.id);
  async function handleSearch(e) {
    try {
      const res = await sendGet(`/users/search?keyword=${keyword}`);
      if (res.statusCode === 200) {
        setCourse(res.returnValue?.data?.courses);
        setBlog(res.returnValue?.data?.posts);
        history.push(`/search/${keyword}`);
      } else message.error("Có lỗi xảy ra");
    } catch (error) {
      // message.error("Có lỗi xảy ra");
    }
  }
  function handleInputChange(e) {
    setKeyword(e.target.value);
  }
  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);
  return (
    <div>
      <Layout>
        <div className="Search-wrapper" style={{ margin: "4% 10% 2% 4%" }}>
          <div className="input-search">
            <input
              type="search"
              style={{
                width: "100%",
                border: "none",
                borderBottom: "1px solid #ccc",
                backgroundColor: "#faf9f9",
                fontSize: "29px",
                outline: "none",
              }}
              value={keyword}
              onChange={handleInputChange}
              onSearch={handleSearch}
              placeholder="Tìm kiếm..."
            />
          </div>
          <div className="result">
            <Tabs defaultActiveKey="1">
              <TabPane tab="Khóa học" key="1">
                {course.length === 0 ? (
                  <p>Không có kết quả phù hợp </p>
                ) : (
                  <>
                    {course?.map((i) => (
                      <div className="search-item">
                        <Link to={`/course/${i.id}`}>
                          <img alt="course" src={i.img} />
                        </Link>
                        <p>
                          <Link to={`/course/${i.id}`}>{i.name}</Link>
                        </p>
                      </div>
                    ))}
                  </>
                )}
              </TabPane>
              <TabPane tab="Bài viết" key="2">
                {blog.length === 0 ? (
                  <p>Không có kết quả phù hợp </p>
                ) : (
                  <>
                    {" "}
                    {blog?.map((i) => (
                      <div className="search-item">
                        <img alt="course" src={i.image} />
                        <p>
                          <Link to={`/blog/${i.id}`}>{i.title}</Link>
                        </p>
                      </div>
                    ))}
                  </>
                )}
              </TabPane>
            </Tabs>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default Search;
