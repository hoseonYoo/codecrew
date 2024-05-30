/*global kakao*/
import { useEffect, useRef, useState } from "react";
const { kakao } = window;

export default function KakaoMap() {
  const container = useRef(null);
  const options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 3,
  };

  const [myLocation, setMyLocation] = useState();
  const [map, setMap] = useState("");

  const moveToMyLocation = (lat, lon) => {
    var locPosition = new kakao.maps.LatLng(lat, lon);
    // map.setCenter(locPosition);
  };

  useEffect(() => {
    setMap(new kakao.maps.Map(container.current, options));

    // TODO 사용할지 고민
    /*// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
    const mapTypeControl = new kakao.maps.MapTypeControl();
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.RIGHT);*/

    // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude, // 위도
          lon = position.coords.longitude; // 경도

        setMyLocation({ lat, lon });

        var locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다

        // 마커를 표시합니다
        displayMarker(locPosition);
      });
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

      alert("위치 정보 접근을 허용해주세요.");
      var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
        message = "위치 정보 접근을 허용해주세요.";

      displayMarker(locPosition, message);
    }
    // 지도에 마커와 인포윈도우를 표시하는 함수입니다
    function displayMarker(locPosition) {
      var imageSrc = "assets/imgs/icon/oval.svg", // 마커이미지의 주소입니다
        imageSize = new kakao.maps.Size(50, 50), // 마커이미지의 크기입니다
        imageOption = { offset: new kakao.maps.Point(25, 25) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

      // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
      var markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption,
      );

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        position: locPosition,
        image: markerImage, // 마커이미지 설정
      });

      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(map);

      // 지도 중심좌표를 접속위치로 변경합니다
      map.setCenter(locPosition);
    }

    return () => {};
  }, []);
  return (
    <div
      id="map"
      ref={container}
      style={{ width: "100%", height: "calc(100vh - 52px)" }}
    >
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
      >
        <img
          onClick={moveToMyLocation}
          src="assets/imgs/icon/mylocationBtn.svg"
          alt="myLocation"
        />
      </div>
    </div>
  );
}
