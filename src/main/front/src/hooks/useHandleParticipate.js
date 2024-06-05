// useHandleParticipate.js
import { useSelector } from "react-redux";
import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "../api/memberAPI";
import useCustomMove from "../hooks/useCustomMove";

const useHandleParticipate = () => {
  const loginState = useSelector((state) => state.loginSlice);
  const userEmail = loginState.email;
  const host = API_SERVER_HOST;
  // 페이지 이동을 위한 함수들
  const { moveToLogin } = useCustomMove();

  const handleParticipate = async (studyId) => {
    if (userEmail) {
      try {
        const response = await jwtAxios.post(
          `${host}/api/study/${studyId}/participate`,
          {
            email: userEmail,
          },
        );
        console.log(response.data);
        alert("스터디 참가신청이 완료되었습니다.");
      } catch (error) {
        console.error(error);
        alert("스터디 참가신청이 실패하였습니다.");
      }
    } else {
      moveToLogin();
    }
  };

  return handleParticipate;
};

export default useHandleParticipate;
