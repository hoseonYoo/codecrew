import { useSelector } from "react-redux";
import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "../api/memberAPI";
import useCustomMove from "../hooks/useCustomMove";

const useHandleParticipateCancel = () => {
  const loginState = useSelector((state) => state.loginSlice);
  const userEmail = loginState.email;
  const host = API_SERVER_HOST;
  // 페이지 이동을 위한 함수들
  const { moveToLogin, moveToMain } = useCustomMove();

  const handleParticipateCancel = async (studyId) => {
    // 사용자가 로그인 상태인지 확인
    if (userEmail) {
      // 참가 취소 전에 사용자에게 확인을 요청하는 팝업
      const confirmCancel = window.confirm("스터디 참가를 취소하시겠습니까?");

      // 사용자가 '확인'을 클릭한 경우에만 참가 취소 로직을 실행
      if (confirmCancel) {
        try {
          const response = await jwtAxios.post(
            `${host}/api/study/${studyId}/cancelParticipation`,
            {
              email: userEmail,
            },
          );
          console.log(response.data);
          alert("스터디 참가 취소가 완료되었습니다.");
          moveToMain();
        } catch (error) {
          console.error(error);
          alert("스터디 참가 취소에 실패하였습니다.");
        }
      }
    } else {
      // 사용자가 로그인 상태가 아닌 경우 로그인 페이지로 이동
      moveToLogin();
    }
  };

  return handleParticipateCancel;
};

export default useHandleParticipateCancel;
