// useProfileImage.js
import { useEffect, useState } from "react";
import { deleteImage, uploadImage } from "../api/imageAPI";

const useProfileImage = (printInItImage, originalImage) => {
  const [file, setFile] = useState(null);
  const [imgSrc, setImgSrc] = useState(printInItImage);

  useEffect(() => {
    setImgSrc(printInItImage);
  }, [printInItImage]);

  // 이미지 업로드시 배경 변경
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImgSrc(URL.createObjectURL(file));
    }
    setFile(file);
  };

  const saveFile = async () => {
    const formData = new FormData();

    if (!originalImage.startsWith("http:")) {
      console.log("기존 이미지 파일 삭제");
      try {
        const res = await deleteImage(originalImage);
        console.log(res);
      } catch (err) {}
    }

    formData.append("file", file);

    try {
      const res = await uploadImage(formData);
      console.log("이미지 업로드 성공");
      return res;
    } catch (err) {
      console.error(err);
    }
  };

  return { imgSrc, handleFileChange, saveFile };
};

export default useProfileImage;
