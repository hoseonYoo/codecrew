import React, { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const NewKakaoMap = () => {
  // 내 현재 주소 가져올 수 있게 해주는 state
  const [mylocation, setMylocation] = useState({
    center: { lat: 37.57163048751097, lng: 126.97591715920376 },
    errMsg: null,
    isLoading: true,
  });

  // 지도의 위치를 변경해주는 state
  const [mapLocation, setMapLocation] = useState({
    // 지도의 초기 위치
    center: { lat: mylocation.center.lat, lng: mylocation.center.lng },
    // 지도 위치 변경시 panto를 이용할지에 대해서 정의
    isPanto: false,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMylocation((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
            refresh: true,
          }));

          console.log("위치정보 받아오기");
        },
        (err) => {
          setMylocation((prev) => ({
            ...prev,
            errMsg: err.message,
          }));
        }
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setMylocation((prev) => ({
        ...prev,
        errMsg: "위치 정보 접근을 허용해주세요.",
      }));
    }
    setMapLocation({
      center: { lat: mylocation.center.lat, lng: mylocation.center.lng },
      isPanto: false,
      refresh: !mapLocation.refresh,
    });
  }, []);
  return (
    <Map
      center={mapLocation.center}
      style={{ width: "100%", height: "calc(100vh - 52px)", position: "relative" }}
      level={3} // 지도의 확대 레벨
    >
      {/*현재 좌표를 사용할수 있다면 현위치 아이콘 생성*/}
      {!mylocation.isLoading ? (
        <MapMarker // 마커를 생성합니다
          position={{
            // 마커가 표시될 위치입니다
            lat: mylocation.center.lat,
            lng: mylocation.center.lng,
          }}
          image={{
            src: "assets/imgs/icon/oval.svg", // 마커이미지의 주소입니다
            size: {
              width: 50,
              height: 50,
            }, // 마커이미지의 크기입니다
            options: {
              offset: {
                x: 25,
                y: 25,
              }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
            },
          }}
        />
      ) : null}

      {/*TODO 위치 변경 필요*/}
      <div
        style={{
          position: "absolute",
          top: "64px",
          right: "16px",
          zIndex: 10,
          cursor: "pointer",
        }}
        onClick={() => {
          if (mylocation.refresh === true) {
            mylocation.center.lat = mylocation.center.lat + 0.00000000000001;
          } else {
            mylocation.center.lat = mylocation.center.lat - 0.00000000000001;
          }
          setMapLocation({
            center: { ...mylocation.center },
            isPanto: false,
            refresh: !mapLocation.refresh,
          });
        }}
      >
        <img src="assets/imgs/icon/mylocationBtn.svg" alt="myLocation" />
      </div>
    </Map>
  );
};
export default NewKakaoMap;
