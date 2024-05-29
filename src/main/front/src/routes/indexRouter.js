import { useRoutes } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoadingPage from "../components/common/LoadingPage";
import studyRouter from "./studyRouter";
import mypageRouter from "./mypageRouter";

// 지연 로딩 (lazy loading)을 위한 import
const Main = lazy(() => import("../pages/MainPage"));
const Login = lazy(() => import("../pages/LoginPage"));
const Search = lazy(() => import("../pages/search/SearchIndex"));
const StudyList = lazy(() => import("../pages/study/StudyIndex"));
const Mypage = lazy(() => import("../pages/mypage/MypageIndex"));
const KakaoRedirect = lazy(() => import("../pages/study/KakaoRedirectPage"));

// 경로 매핑 하는곳 (root)
const Router = () => {
  return useRoutes([
    {
      path: "",
      element: (
        // Suspense 컴포넌트로 감싸서 로딩 중일 때 보여줄 컴포넌트를 지정
        <Suspense fallback={<LoadingPage />}>
          <Main />
        </Suspense>
      ),
    },
    {
      path: "/login",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: "/search",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <Search />
        </Suspense>
      ),
    },
    {
      path: "/list",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <StudyList />
        </Suspense>
      ),
      children: studyRouter(),
    },
    {
      path: "/mypage",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <Mypage />
        </Suspense>
      ),
      children: mypageRouter(),
    },
    {
      path: "/member/kakao",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <KakaoRedirect />
        </Suspense>
      ),
    },
  ]);
};
export default Router;
