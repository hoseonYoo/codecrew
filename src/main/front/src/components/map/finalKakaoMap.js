import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStudyLocationList } from "../../slices/categorySlice";
import useCustomMap from "../../hooks/useCustomMap";

const { kakao } = window;

const FinalKakaoMap = ({
  overlayState,
  changeOverlayState,
  changePopup,
  popupInit,
}) => {
  const [map, setMap] = useState();
  const [cluster, setCluster] = useState();
  const {
    myLocation,
    myLocationMarker,
    clustererMarkers,
    createMapClickMarker,
  } = useCustomMap();
  let mapClickMarker = null;
  let dbclickCheck = false;

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

  // 지도 클릭시 실행될 함수
  const mapClickedFunc = (mouseEvent) => {
    console.log("mapClickedFunc 실행");
    console.log("overlayState : ", overlayState);
    if (dbclickCheck === false) {
      mapClickMarker = createMapClickMarker(mouseEvent.latLng);
      mapClickMarker.setMap(map);
      map.panTo(mouseEvent.latLng);
      // 현재 화면 height px값 가져오기
      const height = window.innerHeight;
      console.log("height : ", height);
      //Todo 마커 움직이는 높이 조절 필요
      setTimeout(() => {
        map.panBy(0, height / 8);
      }, 500); // 500ms 후에 실행
      map.setDraggable(false);
      map.setZoomable(false);
      dbclickCheck = true;
      changeOverlayState();
    } else {
      if (mapClickMarker != null) {
        mapClickMarker.setMap(null);
      }
      map.setDraggable(true);
      map.setZoomable(true);
      dbclickCheck = false;
    }
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
        disableDoubleClickZoom: true,
      };
      setMap(new kakao.maps.Map(container, options));
      // 지도 클릭시 실행될 함수
    }
  }, [myLocation]);

  // map 상태가 업데이트될 때마다 이벤트 리스너 추가
  useEffect(() => {
    if (map) {
      // 지도 클릭시 실행될 함수
      kakao.maps.event.addListener(map, "dblclick", function (mouseEvent) {
        mapClickedFunc(mouseEvent);
      });
    }
  }, [map]);

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
