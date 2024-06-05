// 삭제하기 구현
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "../api/memberAPI";

const useHandleDelete = () => {
  const navigate = useNavigate();
  const loginState = useSelector((state) => state.loginSlice);
  const userEmail = loginState.email;
  const host = API_SERVER_HOST;

  const handleDelete = async (studyId, studyUserEmail) => {
    if (userEmail === studyUserEmail) {
      const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
      if (confirmDelete) {
        try {
          const response = await jwtAxios.delete(
            `${host}/api/study/${studyId}`,
          );
          console.log(response.data);
          alert("스터디 모임이 삭제되었습니다.");
          navigate("/"); // 메인 페이지로 리다이렉트
          return "success";
        } catch (error) {
          console.error(error);
          alert("삭제 중 오류가 발생했습니다.");
        }
      }
    } else {
      alert("본인이 작성한 글만 삭제할 수 있습니다.");
    }
  };

  return handleDelete;
};

export default useHandleDelete;
