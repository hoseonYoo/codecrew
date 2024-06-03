import { useNavigate } from "react-router-dom";

// 페이지 이동 관련 훅
const useCustomMove = () => {
  const navigate = useNavigate();

  // 페이지 이동 함수 작성
  // 예시
  // 리스트로 이동
  /*const moveToList = () => {
        navigate({ pathname: "/list"});
    };*/
  // TODO 이동 관련 함수 추가

  const moveToLogin = () => {
    navigate({ pathname: "/login" });
  };
  const moveToMypage = () => {
    navigate({ pathname: "/mypage" });
  };

  const moveToModify = () => {
    navigate("/mypage/modify");
  };

  const moveToMain = () => {
    navigate("/");
  };

  // 스터디
  const moveToAddPage = () => {
    navigate("/list/add");
  };
  const moveToReadPage = (id) => {
    navigate(`/list/${id}`);
  };
  const moveToModifyPage = (id) => {
    navigate(`/list/modify/${id}`);
  };
  const moveToProfilePage = () => {
    navigate("/list/profile");
  };

  // TODO 함수 작성 후 return 추가
  return { moveToLogin, moveToMypage, moveToModify, moveToMain, moveToAddPage, moveToProfilePage, moveToModifyPage, moveToReadPage };
};
export default useCustomMove;
