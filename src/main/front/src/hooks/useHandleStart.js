import { useCallback } from "react";
import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "../api/studyAPI";

const useHandleStart = () => {
  const handleStart = useCallback(async (study) => {
    // study 객체에 isConfirmed 속성을 true로 설정
    const updatedStudy = { ...study, isConfirmed: true };
    console.log(study);

    try {
      // 서버에 업데이트를 요청하는 API 호출
      const response = await jwtAxios.put(`${API_SERVER_HOST}/study/${study.id}/start`, updatedStudy);
      // 성공적으로 업데이트 되었을 때의 처리
      if (response.status === 200) {
        alert("스터디가 시작되었습니다.");
      }
    } catch (error) {
      // 에러 처리
      console.error("스터디 시작에 실패했습니다.", error);
      alert("스터디 시작에 실패했습니다.");
    }
  }, []);

  return handleStart;
};

export default useHandleStart;
