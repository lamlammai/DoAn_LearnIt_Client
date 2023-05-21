import React, { useState } from "react";
import axios from "axios";
import MarkdownIt from "markdown-it";
import { message, Select, Tag, Modal } from "antd";
import MdEditor from "react-markdown-editor-lite";
import HeaderLayout from "../../component/Layout/Header/HeaderLayout";
import Footer from "../../component/Layout/Footer/footer";
import "react-markdown-editor-lite/lib/index.css";
import { useHistory } from "react-router-dom";
import "./NewPost.scss";
import { sendPost } from "../../utils/api";
const mdParser = new MarkdownIt();
const options = [
  // thay doi
  { label: "Frontend", value: "FRONTEND" },
  { label: "Backend", value: "BACKEND" },
  { label: "Basic", value: "BASIC" },
  { label: "Mobile", value: "MOBILE" },
  { label: "DEVOPS", value: "DEVOPS" },
  { label: "Other", value: "OTHERS" },
];
function Blogging() {
  document.title = "Viết Blog";
  const [visible, setVisible] = useState(false);
  const history = useHistory();
  const [imageUrl, setImageUrl] = useState();
  const [content, setContent] = useState("");
  const [select, setSelect] = useState('FRONTEND');
  const [title, setTitle] = useState("");
  const handleCancel = () => {
    setVisible(false);
  };
  const handleChange = (value) => {
    setSelect(value)
  };
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImageUrl(URL.createObjectURL(event.target.files[0]));
    }
  };
  const handleGetImage = async () => {
    const { files } = document.querySelector(".img-input");
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "descriptionCourse");
    try {
      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/learnit2022/image/upload",
        formData
      );
      setImageUrl(data.secure_url);
      return data.secure_url;
    } catch (error) {
      console.error(error);
    }
  };
  //nội dung trong mackdown
  function handleEditorChange({ html }) {
    setContent(html);
  }
  function onImageUpload(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (data) => {
        resolve(data.target.result);
      };
      reader.readAsDataURL(file);
    });
  }


  const handleChangeSubmit = async (values) => {
    const data = {
      image: await handleGetImage(),
      title: title,
      topic: select,
      content: content,
    };
    // eslint-disable-next-line no-unused-vars
    const add = await sendPost("/posts/user", data);
    // console.log(add);
    if (add.statusCode === 200) {
      message.success("Bài viết của bạn đang được duyệt");
      history.push("/");
    } else {
      message.error("Lỗi kĩ thuật");
    }
  };

  return (
    <>
      <HeaderLayout />
      <div className="Blogging-wrapper ">
        <div style={{ display: " flex", justifyContent: "flex-end" }}>
          <button className="Xuat-ban" onClick={() => setVisible(true)}>
            Xuất bản
          </button>
        </div>
        <Modal
          className="Modal-publish"
          visible={visible}
          footer={null}
          onCancel={handleCancel}
          destroyOnClose={true}
        >
          <div className="Publish-wrapper">
            <section>
              <strong>Xem trước</strong>
              <label for="img">
                <div
                  className="img"
                  style={{ backgroundImage: `url(${imageUrl})` }}
                >
                  <p style={{ padding: "38px 20px 0" }}>
                    Thêm một ảnh đại diện hấp dẫn sẽ giúp bài viết của bạn cuốn
                    hút hơn với độc giả.
                  </p>
                  <p style={{ color: "red" }}>
                    Kéo thả ảnh vào đây, hoặc bấm để chọn ảnh.
                  </p>
                  <input
                    className="img-input"
                    hidden
                    type="file"
                    id="img"
                    name="img"
                    accept="image/*"
                    onChange={onImageChange}
                  />
                </div>
              </label>
            </section>
            <section>
              <p>Thêm thẻ để độc giả biết bài viết của bạn nói về điều gì.</p>
              {/* topic */}
              <Select placeholder="Chọn Topic"
                onChange={handleChange}
                style={{ width: "100%" }}
                options={options}
              />
              <br></br>
              <div className="button-group">
                <button
                  className="btn-now"
                  type="submit"
                  onClick={handleChangeSubmit}
                >
                  Xuất bản ngay
                </button>
              </div>
            </section>
          </div>
        </Modal>
        <input
          placeholder="Tiêu đề"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* content */}
        <MdEditor
          placeholder="Nội dung viết ở đây"
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onImageUpload={onImageUpload}
          onChange={handleEditorChange}
        />
      </div>
      <Footer />
    </>
  );
}

export default Blogging;
