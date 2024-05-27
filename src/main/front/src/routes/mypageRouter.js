import { lazy, Suspense } from "react";
import LoadingPage from "../components/common/LoadingPage";

const Mypage = lazy(() => import("../pages/mypage/ReadPage"));
const ModifyPage = lazy(() => import("../pages/mypage/ModifyPage"));

const mypageRouter = () => {
  return [
    {
      path: "",
      element: (
        // Suspense 컴포넌트로 감싸서 로딩 중일 때 보여줄 컴포넌트를 지정
        <Suspense fallback={<LoadingPage />}>
          <Mypage />
        </Suspense>
      ),
    },
    {
      path: "modify",
      element: (
        // Suspense 컴포넌트로 감싸서 로딩 중일 때 보여줄 컴포넌트를 지정
        <Suspense fallback={<LoadingPage />}>
          <ModifyPage />
        </Suspense>
      ),
    },
  ];
};

export default mypageRouter;
