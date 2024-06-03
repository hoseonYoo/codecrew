import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStudyLocationList } from "../../slices/categorySlice";
const { kakao } = window;

const FinalKakaoMap = () => {
  const [map, setMap] = useState();
  const [isLoadingMap, setIsLoadingMap] = useState(true);
  const [cluster, setCluster] = useState();
  const [myLocation, setMyLocation] = useState({
    lat: 37.57163048751097,
    lng: 126.97591715920376,
    get: false,
    refresh: false,
  });

  // 셀렉터로 카테고리 가져오기
  const categoryFilter = useSelector((state) => state.categorySlice.category);
  const studyLocationList = useSelector(
    (state) => state.categorySlice.studyLocationList,
  );
  const dispatch = useDispatch();

  // 내 위치로 이동
  const moveToMyLocation = () => {
    if (myLocation.refresh === true) {
      myLocation.lat = myLocation.lat + 0.00000000000001;
    } else {
      myLocation.lat = myLocation.lat - 0.00000000000001;
    }
    setMyLocation({ ...myLocation, refresh: !myLocation.refresh });
  };

  // 내 위치 가져오기
  useEffect(() => {
    console.log("위치정보 받아오기");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setMyLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          get: true,
        });
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  // 현위치 가져오면 마커 띄우기
  useEffect(() => {
    if (map && myLocation.get) {
      const markerPosition = new kakao.maps.LatLng(
        myLocation.lat,
        myLocation.lng,
      );
      const markerImage = new kakao.maps.MarkerImage(
        "assets/imgs/icon/oval.svg",
        new kakao.maps.Size(50, 50),
        { offset: new kakao.maps.Point(25, 25) },
      );
      const marker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
      });
      console.log("현위치 마커 생성");
      marker.setMap(map);
    }
  }, [map, myLocation.get]);

  // 카테고리 필터링데이터 가져오기
  useEffect(() => {
    dispatch(getStudyLocationList(categoryFilter)).then(() => {
      console.log("studyLocationList 가져오기");
      // console.log(studyLocationList);
    });
  }, [categoryFilter]);

  // 마커 클러스터 생성
  useEffect(() => {
    if (map && studyLocationList.length > 0) {
      console.log("클러스터 생성");
      const newCluster =new kakao.maps.MarkerClusterer({
            map: map,
            averageCenter: true,
            minLevel: 6,
            disableClickZoom: true,
          });
      setCluster(newCluster);

      const markers = studyLocationList.map((location) => {
        let marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(
            location.locationY,
            location.locationX,
          ),
        });
        return marker;
      });
      console.log("클러스터에 마커 추가");
      newCluster.addMarkers(markers);

      // MarkerClusterer 객체 출력
      console.log(newCluster);

      // 추가된 마커의 수 출력
      console.log(newCluster.getMarkers().length);
    }
  }, [map, studyLocationList]);

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
      setIsLoadingMap(false);

    }
  }, [myLocation]);

  return (
    <>
      <div id="map" style={{ width: "100%", height: "calc(100vh - 52px)" }}>
        {/*내위치 이동 버튼*/}
        <div
          onClick={moveToMyLocation}
          style={{
            position: "fixed",
            top: "20%",
            left: "30%",
            transform: "translate(-50%, -50%)",
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
