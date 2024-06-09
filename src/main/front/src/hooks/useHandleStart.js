import { useCallback } from "react";
import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "../api/studyAPI";

// useHandleStart.js
const useHandleStart = () => {
  const handleStart = useCallback(async (study) => {
    return new Promise((resolve, reject) => {
      const confirmStart = window.confirm("정말로 시작하시겠습니까?");

      if (confirmStart) {
        const updatedStudy = { ...study, isConfirmed: true };
        jwtAxios
          .put(`${API_SERVER_HOST}/api/study/${study.id}/start`, updatedStudy)
          .then((response) => {
            if (response.status === 200) {
              alert("스터디가 시작되었습니다.");
              resolve("SUCCESS");
            }
          })
          .catch((error) => {
            console.error("스터디 시작에 실패했습니다.", error);
            alert("스터디 시작에 실패했습니다.");
            reject("FAILURE");
          });
      } else {
        console.log("스터디 취소");
        resolve("CANCELLED");
      }
    });
  }, []);

  return handleStart;
};

export default useHandleStart;
