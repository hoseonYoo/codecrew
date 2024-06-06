import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStudyLocationList } from "../../slices/categorySlice";
import useCustomMap from "../../hooks/useCustomMap";

const { kakao } = window;

const KakaoMap = ({
                           overlayState,
                           changeOverlayState,
                           changePopup,
                           popupInit,
                       }) => {

    // 셀렉터로 카테고리 가져오기
    const categoryFilter = useSelector((state) => state.categorySlice.category);
    const studyLocationList = useSelector(
        (state) => state.categorySlice.studyLocationList,
    );
    const dispatch = useDispatch();

    const {
        myLocation,
        myLocationMarker,
        clustererMarkers,
        createMapClickMarker,

    } = useCustomMap();

    let nowLocationMarker = null;
    // 지도 중복 렌더링 방지 위해 state로 관리
    const [renderCheck, setRenderCheck] = useState(false);
    const [map, setMap] = useState(null);


    useEffect(() => {
        if (renderCheck){
            // 지도 생성

                console.log("실제 지도 렌더링");
                const container = document.getElementById("map");
                const options = {
                    center: new kakao.maps.LatLng(myLocation.lat, myLocation.lng),
                    level: 3,
                    disableDoubleClickZoom: true,
                };
                setMap(new kakao.maps.Map(container, options));
        }
    }, [renderCheck]);

    // 현재 위치 받아 오면 마커 생성
    useEffect(() => {
        if (myLocation.get) {
            console.log("현위치 마커 생성");
            nowLocationMarker = myLocationMarker();
        }
    }, [myLocation.get]);

    // 카테고리 필터링데이터 가져오기
    useEffect(() => {
        dispatch(getStudyLocationList(categoryFilter)).then(() => {
            console.log("studyLocationList 가져오기");
        });
        setRenderCheck(true);
    }, [categoryFilter]);



    useEffect(() => {
        if (map!==null){
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
export default KakaoMap;
