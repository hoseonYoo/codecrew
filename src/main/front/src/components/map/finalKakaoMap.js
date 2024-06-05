import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStudyLocationList } from "../../slices/categorySlice";
import { API_SERVER_HOST } from "../../api/studyAPI";
import useCustomMap from "../../hooks/useCustomMap";

const host = API_SERVER_HOST;

const { kakao } = window;

const FinalKakaoMap = ({ changePopup, popupInit }) => {
  const [map, setMap] = useState();
  const [cluster, setCluster] = useState();
  const { myLocation, myLocationMarker, clustererMarkers } = useCustomMap();

  const dispatch = useDispatch();

  // 셀렉터로 카테고리 가져오기
  const categoryFilter = useSelector((state) => state.categorySlice.category);
  const studyLocationList = useSelector(
    (state) => state.categorySlice.studyLocationList,
  );

  // 내 위치로 이동
  const moveToMyLocation = () => {
    const moveLatLon = new kakao.maps.LatLng(myLocation.lat, myLocation.lng);
    map.setCenter(moveLatLon);
  };

  // 현위치 가져오면 마커 띄우기
  useEffect(() => {
    if (map && myLocation.get) {
      console.log("현위치 마커 생성");
      const marker = myLocationMarker();
      marker.setMap(map);
    }
  }, [map, myLocation.get]);

  // 카테고리 필터링데이터 가져오기
  useEffect(() => {
    dispatch(getStudyLocationList(categoryFilter)).then(() => {
      console.log("studyLocationList 가져오기");
    });
  }, [categoryFilter]);

  // 마커 클러스터 생성
  useEffect(() => {
    if (map && studyLocationList.length > 0) {
      console.log("클러스터 생성");

      // 현재 지도의 중심 좌표를 저장합니다.
      const currentCenter = map.getCenter();

      const newCluster = new kakao.maps.MarkerClusterer({
        map: map,
        averageCenter: true,
        minLevel: 7,
        disableClickZoom: true,
      });

      // clusterMarkers함수에 changePopup함수를 인자로 넘겨주어 마커 클릭시 팝업창을 띄울 수 있도록 함
      const markers = clustererMarkers(changePopup);

      // 마커 클러스터에 기존 마커 지우기
      if (cluster != undefined) cluster.clear();

      console.log("클러스터에 마커 추가");

      // 클러스터에 마커 추가
      newCluster.addMarkers(markers);

      setCluster(newCluster);

      // 클러스터가 변경된 후에 이전에 저장한 중심 좌표를 다시 지도의 중심으로 설정합니다.
      map.setCenter(currentCenter);
    }
  }, [map, studyLocationList, categoryFilter]);

  // 지도 렌더링 (내 위치 기준, 현위치 모르면 기본 위치)
  useEffect(() => {
    if (myLocation) {
      console.log("myLocation : ", myLocation);
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(myLocation.lat, myLocation.lng),
        level: 3,
      };
      const map1 = new kakao.maps.Map(container, options);

      setMap(map1);
    }
  }, [myLocation]);

  return (
    <>
      <div
        id="map"
        style={{
          width: "100%",
          height: "calc(100vh - 52px)",
          position: "relative",
        }}
      >
        {/*내위치 이동 버튼*/}
        <div
          onClick={moveToMyLocation}
          style={{
            position: "absolute",
            top: "62px",
            right: "16px",
            zIndex: 10,
            cursor: "pointer",
          }}
        >
          <img src="assets/imgs/icon/mylocationBtn.svg" alt="myLocation" />
        </div>
        {/*내위치 마커 띄우기*/}
      </div>
    </>
  );
};
export default FinalKakaoMap;
