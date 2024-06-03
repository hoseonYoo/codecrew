import React, { useEffect, useState } from "react";
import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";
import { useSelector, useDispatch } from "react-redux";
import { getStudyLocationList } from "../../slices/categorySlice";

const NewKakaoMap = () => {
  // 내 현재 주소 가져올 수 있게 해주는 state
  const [mylocation, setMylocation] = useState({
    center: { lat: 37.57163048751097, lng: 126.97591715920376 },
    errMsg: null,
    isLoading: true,
  });

  const dispatch = useDispatch();

  // 지도의 위치를 변경해주는 state
  const [mapLocation, setMapLocation] = useState({
    // 지도의 초기 위치
    center: { lat: mylocation.center.lat, lng: mylocation.center.lng },
    // 지도 위치 변경시 panto를 이용할지에 대해서 정의
    isPanto: false,
  });
  // 셀렉터로 카테고리 가져오기
  const categoryFilter = useSelector((state) => state.categorySlice.category);
  const studyLocationList = useSelector(
    (state) => state.categorySlice.studyLocationList,
  );

  const setStudyLocationList = () => {
    // 카테고리별로 가져온 마커들의 위치와 id값을 저장
    // mapAPI.js에서 가져온 데이터를 저장
    dispatch(getStudyLocationList());
  };

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
        },
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
    // TODO 오류 수정 필요
    // setStudyLocationList();
  }, [categoryFilter]);

  return (
    <Map
      center={mapLocation.center}
      style={{ width: "100%", height: "calc(100vh - 52px)" }}
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
          position: "fixed",
          top: "20%",
          left: "30%",
          transform: "translate(-50%, -50%)",
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
          console.log(studyLocationList);
        }}
      >
        <img src="assets/imgs/icon/mylocationBtn.svg" alt="myLocation" />
      </div>

      {/*<MarkerClusterer
        averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
        minLevel={10} // 클러스터 할 최소 지도 레벨
      >
        {studyLocationList.stream().map((studyLocation) => (
          <MapMarker
            key={`${studyLocation.locationX}-${studyLocation.locationY}`}
            position={{
              lat: studyLocation.locationX,
              lng: studyLocation.locationY,
            }}
          />
        ))}
      </MarkerClusterer>*/}
    </Map>
  );
};
export default NewKakaoMap;
