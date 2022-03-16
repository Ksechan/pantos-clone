$(function () {
  const modalMapOptions = {
    center: new naver.maps.LatLng(37.3595704, 127.105399),
    zoom: 10,
    // 로고 표시 여부 (2019년부터 로고는 지울 수 없게 바뀌었다고 함)
    logoControl: false,
    // 지도 정보 표시 여부
    mapDataControl: false,
    // 축척 정보 표시 여부
    scaleControl: false,
  };

  const modalMap = new naver.maps.Map("modal_map", modalMapOptions);

  let modalMarkerOption = {
    position: new naver.maps.LatLng(37.3595704, 127.105399),
    map: modalMap,
    icon: {
      url: "./images/icons/running_icon.svg",
      size: new naver.maps.Size(48, 56),
      origin: new naver.maps.Point(0, 0),
      anchor: new naver.maps.Point(11, 35),
    },
  };

  var modalMarker = new naver.maps.Marker(modalMarkerOption);
});
