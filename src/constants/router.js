export const ROUTES = {
  HOME: "/",
  ERROR: "*",
  SIGN_IN: "/signin",
  SIGN_UP: "/register",
  STUDY_ROUTE: "/studyRoute", //lộ trình
  LEARNING: "/learning", //khóa đang học
  DOCUMENT: "/document", //tài liệu lập trình
  BLOG: "/blog",
  // thay doi nhưng chua chay dc
  BLOGTOPIC: "/topic/:id",
  INFO: "/about", //thông tin trang web
  JOB: "/job", //cơ hội việc làm
  CALL: "/call", //liên hệ
  POSTSAVES: "/me/bookmark/posts",
  NEWPOST: "/new-post",
  ACCOUNT: "/account",
  ADMIN: "/admin",
  UNLEARN: "/course/:link", //khóa chưa học
  LEARN: "/learn/:link/:id", //khóa đang học
  RULES: "/rules", //điều khoản
  RULES1: "/rules1", //điều khoản nhỏ
  SECURITY: "/security",
  // test thử
  LESSON: "/lesson/:id",
  EXERCISE: "/exercise/:lessonid/:id",
  PAY: "/thanh-toan",
  FORGOT: "/forgotPassword",
  RESETPASS: "/doi-mat-khau",
  ACTIVE: "/active/:token",
  SEARCH: "/search/:id",
  ACTIVECOURSE: "/update-pay",
  ONBOARD: "/onboard",
  HISTORYPAY: "/tra-cuu-giao-dich",
  EDITPOST: "/edit-post/:link",
};
