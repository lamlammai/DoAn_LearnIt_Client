import { lazy } from "react";
import { ROUTES } from "../constants/router";
// pages
const Home = lazy(() => import("../pages/HomePage/Home/index"));
const Learning = lazy(() => import("../pages/HomePage/Learning/Learning"));
const Signin = lazy(() => import("../pages/SignIn/SignIn"));
const Signup = lazy(() => import("../pages/SignUp/SignUp"));
const Infomation = lazy(() =>
  import("../pages/HomePage/Infomation/Infomation")
);
const BlogTopic = lazy(() => import("../pages/HomePage/Blog/BlogTopic"));
const RouterBlog = lazy(() => import("../pages/HomePage/Blog/router"));
const NestedRouter = lazy(() => import("../pages/HomePage/StudyRoute/router"));
const PostSaves = lazy(() => import("../features/PostSaves/PostSaves"));
const Job = lazy(() => import("../pages/HomePage/Job/Job"));
const Call = lazy(() => import("../pages/HomePage/Call/call"));
const Document = lazy(() => import("../pages/HomePage/Document/document"));
const NewPost = lazy(() => import("../features/NewPost/NewPost"));
const InfoCourse = lazy(() => import("../features/InfoCourse/InfoCourse"));
const Lesson = lazy(() => import("../features/LayoutLesson/LayoutLesson"));
const Account = lazy(() => import("../features/InfoUser/InfoUser"));
const PageError = lazy(() => import("../pages/NotFround/PageError"));
const Exercise = lazy(() =>
  import("../features/LayoutLesson/component/Exercise/Exercise")
); //test thử
const Rules = lazy(() => import("../features/Rules/Rules"));
const Rules1 = lazy(() => import("../features/Rules/Rules1"));
const Security = lazy(() => import("../features/Security/Security"));
const Pay = lazy(() => import("../features/Pay/introduce.js"));
const Search = lazy(() => import("../component/Search/Search"));
const EditPost = lazy(() => import("../features/NewPost/EditPost"));
const ActiveUser = lazy(() => import("../pages/SignUp/ActiveUser"));
const ForgotPass = lazy(() => import("../pages/SignIn/ForgotPass"));
const resetPassword = lazy(() =>
  import("../pages/SignIn/Component/FormResetPass/FormResetPass")
);
const activeCourse = lazy(() => import("../features/Pay/activeCourse"));
const Onboarding = lazy(() => import("../pages/SignIn/Onboard"));
const historyPay = lazy(() => import("../features/Pay/historyPay"));

/**
 * define main pages routes
 */
const RoutePage = [
  {
    path: ROUTES.HOME,
    exact: true,
    component: Home,
    // authen: true,
  },
  {
    path: ROUTES.SIGN_IN,
    exact: true,
    component: Signin,
  },
  {
    path: ROUTES.SIGN_UP,
    exact: true,
    component: Signup,
  },
  {
    path: ROUTES.STUDY_ROUTE,
    // exact: true,
    component: NestedRouter,
    // authen: true,
  },
  {
    path: ROUTES.LEARNING,
    exact: true,
    component: Learning,
    // authen: true,
  },
  {
    path: ROUTES.BLOG,
    // exact: true,
    component: RouterBlog,
    // authen: true,
  },
  {
    path: ROUTES.INFO,
    exact: true,
    component: Infomation,
    // authen: true,
  },
  {
    path: ROUTES.POSTSAVES,
    exact: true,
    component: PostSaves,
    authen: true,
  },
  {
    path: ROUTES.ACTIVECOURSE,
    exact: true,
    component: activeCourse,
    // authen: true,
  },
  {
    path: ROUTES.ONBOARD,
    exact: true,
    component: Onboarding,
    authen: true,
  },
  {
    path: ROUTES.HISTORYPAY,
    exact: true,
    component: historyPay,
    authen: true,
  },
  {
    path: ROUTES.JOB,
    exact: true,
    component: Job,
    // authen: true,
  },
  {
    path: ROUTES.CALL,
    exact: true,
    component: Call,
    // authen: true,
  },
  {
    path: ROUTES.DOCUMENT,
    exact: true,
    component: Document,
    // authen: true,
  },
  {
    path: ROUTES.NEWPOST,
    exact: true,
    component: NewPost,
    authen: true,
  },
  {
    path: ROUTES.ACCOUNT,
    exact: true,
    component: Account,
    authen: true,
  },
  {
    path: ROUTES.UNLEARN,
    exact: true,
    component: InfoCourse,
    // authen: true,
  },
  {
    path: ROUTES.BLOGTOPIC,
    exact: true,
    component: BlogTopic,
    // authen: true,
  },
  {
    path: ROUTES.LEARN,
    exact: true,
    component: Lesson,
    authen: true,
  },
  {
    path: ROUTES.RULES,
    exact: true,
    component: Rules,
  },
  {
    path: ROUTES.RULES1,
    exact: true,
    component: Rules1,
  },
  {
    path: ROUTES.SECURITY,
    exact: true,
    component: Security,
  },
  {
    path: ROUTES.EXERCISE,
    exact: true,
    component: Exercise,
    // authen: true,
  },
  {
    path: ROUTES.PAY,
    exact: true,
    component: Pay,
    authen: true,
  },
  {
    path: ROUTES.FORGOT,
    // exact: true,
    component: ForgotPass,
    // authen: true,
  },
  {
    path: ROUTES.RESETPASS,
    // exact: true,
    component: resetPassword,
    // authen: true,
  },
  {
    path: ROUTES.ACTIVE,
    exact: true,
    component: ActiveUser,
  },
  {
    path: ROUTES.SEARCH,
    exact: true,
    component: Search,
  },
  {
    path: ROUTES.EDITPOST,
    exact: true,
    component: EditPost,
    authen: true,
  },
  {
    path: ROUTES.ERROR,
    exact: true,
    component: PageError,
  },
];
export default RoutePage;
