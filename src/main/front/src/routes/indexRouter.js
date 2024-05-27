import { useRoutes } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoadingPage from "../components/common/LoadingPage";

// 지연 로딩 (lazy loading)을 위한 import
const Main = lazy(() => import("../pages/MainPage"));
const Login = lazy(() => import("../pages/LoginPage"));
const Search = lazy(() => import("../pages/search/SearchIndex"));
const TestMember = lazy(() => import("../pages/TestMemberPage"));

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
      path: "/testMember",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <TestMember />
        </Suspense>
      ),
    },
  ]);
};
export default Router;
