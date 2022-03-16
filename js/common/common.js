$(function () {
  // 이벤트 모달 열기
  // $(".modal_event").fadeIn(200);
  // $("#modal_background").fadeIn(200);
  // // 이벤트 모달 창 닫기
  // $(".modal_event_btn").click(function (e) {
  //   event.preventDefault();
  //   $(".modal_event").fadeOut(200);
  //   $("#modal_background").fadeOut(200);
  // });
  // 다음~!~!

  // select plugin
  $("select").niceSelect();
  // input[type=date] 30일 제한

  const today = new Date();
  const todayCurrentDate = today.getFullYear() + "-" + ("00" + (today.getMonth() + 1)).toString().slice(-2) + "-" + ("00" + today.getDate()).toString().slice(-2);
  $("input[type=date]").attr("value", todayCurrentDate);

  const arr1 = todayCurrentDate.split("-");
  const todayPlusDate = new Date(arr1[0], arr1[1], arr1[2]);
  todayPlusDate.getDate() + 30;
  const todayMaxDate = todayPlusDate.getFullYear() + "-" + ("00" + (todayPlusDate.getMonth() + 1)).toString().slice(-2) + "-" + ("00" + todayPlusDate.getDate()).toString().slice(-2);
  $(".home_search_date_max").attr("min", todayCurrentDate);
  $(".home_search_date_max").attr("max", todayMaxDate);

  $(".home_search_date_min").change(function () {
    const minDate = $(".home_search_date_min").val();
    $(".home_search_date_min").attr("value", minDate);
    const arr2 = minDate.split("-");
    const plusDate = new Date(arr2[0], arr2[1], arr2[2]);

    plusDate.getDate() + 30;

    const maxDate = plusDate.getFullYear() + "-" + ("00" + (plusDate.getMonth() + 1)).toString().slice(-2) + "-" + ("00" + plusDate.getDate()).toString().slice(-2);

    $(".home_search_date_max").attr("min", minDate);
    $(".home_search_date_max").attr("max", maxDate);
  });

  // 체크박스 체크 여부 배정버튼 활성화

  $("#order_list_table_checkbox_1, #order_list_table_checkbox_2").click(function () {
    const checked1 = $("#order_list_table_checkbox_1").is(":checked");
    const checked2 = $("#order_list_table_checkbox_2").is(":checked");

    if (checked1 == true || checked2 == true) {
      $(".favorite_table_fix_head button").addClass("abled_btn_80_border");
    } else {
      $(".favorite_table_fix_head button").removeClass("abled_btn_80_border");
    }
  });

  // 패스워드 변경 모달

  $(".modal_change_pw_input, .modal_change_pw_check_input").on("keyup", function () {
    const pwInput = $(".modal_change_pw_input").val();
    const pwCheckInput = $(".modal_change_pw_check_input").val();

    // 입력 조건
    if (pwInput.length >= 6) {
      $(".modal_change_pw_dialog").show();
    } else {
      $(".modal_change_pw_dialog").hide();
    }
    if (pwInput == pwCheckInput && pwInput.length >= 6) {
      $(".modal_change_pw_check_dialog").show();
      $(".modal_change_pw_error_dialog").hide();
      $(".modal_change_password_btn").attr("disabled", false);
      $(".modal_change_password_btn").removeClass("disabled_btn_288");
      $(".modal_change_password_btn").addClass("abled_btn_288");
    } else if (pwInput != pwCheckInput && pwCheckInput.length >= 6) {
      $(".modal_change_pw_check_dialog").hide();
      $(".modal_change_pw_error_dialog").show();
      $(".modal_change_password_btn").attr("disabled", true);
      $(".modal_change_password_btn").removeClass("abled_btn_288");
      $(".modal_change_password_btn").addClass("disabled_btn_288");
    } else if (pwCheckInput.length < 6) {
      $(".modal_change_pw_error_dialog").hide();
      $(".modal_change_pw_check_dialog").hide();
      $(".modal_change_password_btn").attr("disabled", true);
      $(".modal_change_password_btn").removeClass("abled_btn_288");
      $(".modal_change_password_btn").addClass("disabled_btn_288");
    }
  });

  // 아이디 찾기 모달
  const modalFindIdNameInput = $(".modal_find_id_name_input");
  const modalFindIdInput1 = $(".modal_find_id_input1");
  const modalFindIdInput2 = $(".modal_find_id_input2");
  const modalFindIdInput3 = $(".modal_find_id_input3");
  modalFindIdInput1.on("propertychange change keyup paste input", function () {
    if ($(this).val().length >= 3) {
      $(this).next().next().focus();
      $(this).val($(this).val().substring(0, 3));
    }
  });
  modalFindIdInput2.on("propertychange change keyup paste input", function () {
    if ($(this).val().length >= 4) {
      $(this).next().next().focus();
      $(this).val($(this).val().substring(0, 4));
    }
  });

  $(modalFindIdInput1)
    .add(modalFindIdInput2)
    .add(modalFindIdInput3)
    .add(modalFindIdNameInput)
    .on("propertychange change keyup paste input", function () {
      if (modalFindIdInput1.val().length >= 3 && modalFindIdInput2.val().length >= 4 && modalFindIdInput3.val().length >= 4 && modalFindIdNameInput.val().length >= 1) {
        $(".find_id_phone_number_check_btn").addClass("abled_btn_120").removeClass("disabled_btn_120").attr("disabled", false);
      } else {
        $(".find_id_phone_number_check_btn").addClass("disabled_btn_120").removeClass("abled_btn_120").attr("disabled", true);
        $(".find_id_phone_number_check_btn").html("인증");
      }
    });

  // 인증번호 타이머

  let timer = 0;
  let display = $(".time");

  $(".find_id_phone_number_check_btn").on("click", function (e) {
    e.preventDefault();
    $(".find_id_phone_number_check_btn").html("재전송");
    $(".modal_find_id").addClass("modal_find_id_height");
    $(".modal_find_id_phonenumber_input_box, .modal_find_id_text_box2").css({ padding: "16px 20px 16px 16px", height: "132px" });
    $(".modal_check_input_box").addClass("modal_check_input_visible");
    // 버튼 텍스트 변경
    $(".modal_btn").text("재전송");

    //   // 유효시간 설정
    let leftSec = 180;

    // 버튼 클릭 시 시간 연장
    if (timer != 0) {
      clearInterval(timer);
      leftSec = 180;
      display.html("");
      startTimer(leftSec, display);
    } else {
      clearInterval(timer);
      startTimer(leftSec, display);
      leftSec = 180;
    }
  });

  function startTimer(count, display) {
    let minutes, seconds;
    timer = setInterval(function () {
      minutes = parseInt(count / 60, 10);
      seconds = parseInt(count % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.html(minutes + ":" + seconds);

      // 타이머 끝
      if (--count < 0) {
        clearInterval(timer);
        display.html("시간초과");
        timer = 0;
      }
    }, 1000);
  }
  $(".modal_check_input").on("propertychange change keyup paste input", function () {
    if ($(".modal_check_input").val().length >= 6) {
      $(".modal_find_id_btn").addClass("abled_btn_288").removeClass("disabled_btn_288").attr("disabled", false);
    } else {
      $(".modal_find_id_btn").addClass("disabled_btn_288").removeClass("abled_btn_288").attr("disabled", true);
    }
  });
  // 회원 정보가 없을때 에러메시지

  $(".modal_find_id_btn").click(function () {
    $(".modal_find_id_dialog_text").show();
    $(".modal_find_id_btn").addClass("modal_find_id_btn_no_margin");
    $(".modal_find_id").addClass("modal_find_id_plus_height");
  });

  // 전자인수증 미리보기 모달 창 띄우기 & 닫기

  $(".receipt_btn").click(function () {
    $(".modal_receipt").fadeIn(200);
    $("#modal_background").fadeIn(200);
    $("body").addClass("no-scroll");
  });

  $(".modal_close").click(function () {
    $(".modal_receipt").fadeOut(200);
    $("#modal_background").fadeOut(200);
    $("body").removeClass("no-scroll");
  });

  const modalOrderRegisterLoadingNumber1 = $(".modal_order_register_loading_number1");
  const modalOrderRegisterLoadingNumber2 = $(".modal_order_register_loading_number2");
  const modalOrderRegisterUnloadingNumber1 = $(".modal_order_register_unloading_number1");
  const modalOrderRegisterUnloadingNumber2 = $(".modal_order_register_unloading_number2");
  modalOrderRegisterLoadingNumber1.on("propertychange change keyup paste input", function () {
    if ($(this).val().length >= 3) {
      $(this).next().next().focus();
      $(this).val($(this).val().substring(0, 3));
    }
  });
  modalOrderRegisterLoadingNumber2.on("propertychange change keyup paste input", function () {
    if ($(this).val().length >= 4) {
      $(this).next().next().focus();
      $(this).val($(this).val().substring(0, 4));
    }
  });
  modalOrderRegisterUnloadingNumber1.on("propertychange change keyup paste input", function () {
    if ($(this).val().length >= 3) {
      $(this).next().next().focus();
      $(this).val($(this).val().substring(0, 3));
    }
  });
  modalOrderRegisterUnloadingNumber2.on("propertychange change keyup paste input", function () {
    if ($(this).val().length >= 4) {
      $(this).next().next().focus();
      $(this).val($(this).val().substring(0, 4));
    }
  });

  // 오더 상세 모달

  $(".modal_order_detail .tabs_area .tabs li a").on("click", function () {
    // 해당 요소를 클릭하는 내 자신의 index 번호를 가져온다. [0], [1]
    const num = $(".modal_order_detail .tabs_area .tabs li a").index($(this));
    // 기존에 적용되어 있는 on class 삭제
    $(".modal_order_detail .tabs_area .tabs li").removeClass("on");
    $(".modal_order_detail .tabs_area .tab_box").removeClass("on");
    // 다음 요소 클릭시 on class 추가
    $(".modal_order_detail .tabs_area .tabs li:eq(" + num + ")").addClass("on");
    $(".modal_order_detail .tabs_area .tab_box:eq(" + num + ")").addClass("on");

    if (num == 0) {
      $(".modal_order_detail").css({ height: "872px" });
    } else if (num == 1) {
      $(".modal_order_detail").css({ height: "660px" });
    } else if (num == 2) {
      $(".modal_order_detail").css({ height: "808px" });
    } else if (num == 3 || num == 4) {
      $(".modal_order_detail").css({ height: "788px" });
    }
  });

  const orderDetailToday = new Date();
  const orderDetailTodayCurrentDate =
    orderDetailToday.getFullYear() + "-" + ("00" + (orderDetailToday.getMonth() + 1)).toString().slice(-2) + "-" + ("00" + orderDetailToday.getDate()).toString().slice(-2);
  $(".order_detail_arrive_date").attr("value", orderDetailTodayCurrentDate);

  $(".order_detail_arrive_time").on("propertychange change keyup paste input", function () {
    if ($(this).val() >= 59) {
      $(this).val(59);
    }
  });

  const modalOrderDetailLoadingNumber1 = $(".modal_order_detail_loading_number1");
  const modalOrderDetailLoadingNumber2 = $(".modal_order_detail_loading_number2");
  const modalOrderDetailTakeOverNumber1 = $(".modal_order_detail_take_over_number1");
  const modalOrderDetailTakeOverNumber2 = $(".modal_order_detail_take_over_number2");
  modalOrderDetailLoadingNumber1.on("propertychange change keyup paste input", function () {
    if ($(this).val().length >= 3) {
      $(this).next().next().focus();
      $(this).val($(this).val().substring(0, 3));
    }
  });
  modalOrderDetailLoadingNumber2.on("propertychange change keyup paste input", function () {
    if ($(this).val().length >= 4) {
      $(this).next().next().focus();
      $(this).val($(this).val().substring(0, 4));
    }
  });
  modalOrderDetailTakeOverNumber1.on("propertychange change keyup paste input", function () {
    if ($(this).val().length >= 3) {
      $(this).next().next().focus();
      $(this).val($(this).val().substring(0, 3));
    }
  });
  modalOrderDetailTakeOverNumber2.on("propertychange change keyup paste input", function () {
    if ($(this).val().length >= 4) {
      $(this).next().next().focus();
      $(this).val($(this).val().substring(0, 4));
    }
  });

  const orderDetailNecessaryInput1 = $(".order_detail_load_name");
  const orderDetailNecessaryInput2 = $(".order_detail_load_place_code");
  const orderDetailNecessaryInput3 = $(".order_detail_unload_name");
  const orderDetailNecessaryInput4 = $(".order_detail_unload_place_code");
  $(orderDetailNecessaryInput1)
    .add(orderDetailNecessaryInput2)
    .add(orderDetailNecessaryInput3)
    .add(orderDetailNecessaryInput4)
    .on("propertychange change keyup paste input", function () {
      if (
        orderDetailNecessaryInput1.val().length >= 1 &&
        orderDetailNecessaryInput2.val().length >= 1 &&
        orderDetailNecessaryInput3.val().length >= 1 &&
        orderDetailNecessaryInput4.val().length >= 1
      ) {
        $(".modal_order_detail_order_btn").addClass("abled_btn_288").removeClass("disabled_btn_288").attr("disabled", false);
      } else {
        $(".modal_order_detail_order_btn").addClass("disabled_btn_288").removeClass("abled_btn_288").attr("disabled", true);
      }
    });

  // 오더 상세 제품정보 탭 테이블 해당 로우 클릭시 색상 변경
  $("#modal_order_detail_product_info_table tbody tr").click(function (e) {
    const target = $(e.currentTarget);
    $("#modal_order_detail_product_info_table tbody tr").not(target).removeClass("table_background");
    target.toggleClass("table_background");
  });

  // 오더 상세
  $(".accident_history_visible_btn").click(function (e) {
    e.preventDefault();
    $("#modal_order_detail_accident_history_table_wrapper").toggle();
  });

  $(".dispatch_history_visible_btn").click(function (e) {
    e.preventDefault();
    $("#modal_order_detail_dispatch_history_table_wrapper, .modal_order_detail_dispatch_history_table_title").toggle();
  });

  // 오더 상세 배차정보 탭 사고 이력 테이블 해당 로우 클릭시 색상 변경
  $("#modal_order_detail_accident_history_table tbody tr").click(function (e) {
    const target = $(e.currentTarget);
    $("#modal_order_detail_accident_history_table tbody tr").not(target).removeClass("table_background");
    target.toggleClass("table_background");
  });

  // 오더 상세 제품정보 탭 배차이력 테이블 해당 로우 클릭시 색상 변경
  $("#modal_order_detail_dispatch_history_table tbody tr").click(function (e) {
    const target = $(e.currentTarget);
    $("#modal_order_detail_dispatch_history_table tbody tr").not(target).removeClass("table_background");
    target.toggleClass("table_background");
  });

  // 오더 취소 모달

  $(".modal_order_detail_cancel").click(function () {
    $(".modal_order_cancel").fadeIn(200);
    $(".modal_order_detail").fadeOut(200);
    $("body").addClass("no-scroll");
  });

  $(".modal_order_cancel_header_close").click(function () {
    $(".modal_order_cancel").fadeOut(200);
    $(".modal_order_detail").fadeIn(200);
  });

  $(".modal_order_cancel_input").on("keyup", function () {
    if ($(".modal_order_cancel_input").val() != "") {
      $(".modal_order_cancel_btn").addClass("abled_btn_288").removeClass("disabled_btn_288");
    } else {
      $(".modal_order_cancel_btn").addClass("disabled_btn_288").removeClass("abled_btn_288");
    }
  });

  $(".modal_order_cancel_btn").click(function () {
    $(".modal_order_cancel").fadeOut(200);
    $(".modal_check").fadeOut(200);
    $("body").removeClass("no-scroll");
  });

  // 데이터 테이블

  $("#modal_order_detail_product_info_table").DataTable({
    scrollY: 360,
    scrollX: true,
    lengthChange: false,
    // 검색 기능 숨기기
    searching: false,
    // 정렬 기능 숨기기
    ordering: false,
    // 정보 표시 숨기기
    info: true,
    // 페이징 기능 숨기기
    paging: false,

    language: {
      emptyTable: "데이터가 없습니다.",
      info: "_TOTAL_",
    },

    dom: `<".modal_order_detail_product_info_table_title"><".modal_order_detail_product_info_table_sub_title">it`,
  });

  $(".modal_order_detail_product_info_table_title").html(
    `<span class="modal_order_detail_product_info_table_title noto-medium font-size-14 font-color-deep-black" style="float: left;">Order No.125000</span>`
  );
  $(".modal_order_detail_product_info_table_sub_title").html(
    `<span class="modal_order_detail_product_info_table_sub_title noto-regular font-size-14 font-color-grey" style="float: left;">Total : </span>`
  );

  $("#order_list_table").DataTable({
    lengthChange: true,
    // 검색 기능 숨기기
    searching: false,
    ordering: false,
    info: true,
    scrollY: 312,
    scrollX: true,
    lengthMenu: [30, 50, 100],
    pagingType: "simple_numbers",
    language: {
      emptyTable: "데이터가 없습니다.",
      lengthMenu: "페이지 당 데이터 건수 _MENU_",
      info: "_TOTAL_",
      paginate: {
        next: ">",
        previous: "<",
      },
    },

    dom: `<".order_list_table_title"><".order_list_table_sub_title"><".layout_btn"><".order_register_btn">iltp`,
  });

  $(".order_list_table_title").html(`<span class="order_list_table_title noto-medium font-size-14 font-color-deep-black" style="float: left;">오더목록</span>`);
  $(".order_list_table_sub_title").html(`<span class="order_list_table_sub_title noto-regular font-size-14 font-color-grey" style="float: left;">Total : </span>`);
  $(".layout_btn").html(`<button class="abled_btn_80" class="layout_btn" style="float: right;"><img src="./images/icons/arrow_left_icon.svg" /></button>`);
  $(".order_register_btn").html(`<button class="abled_btn_120" class="order_register_btn" style="float: right; margin: 0 8px 16px 8px">오더 등록</button>`);

  // 페이지 레이아웃 변경 버튼

  togglebtn = false;
  $(function () {
    $("#order_manage_company_fav_table_wrapper").hide();
  });

  $(".layout_btn").click(function () {
    if (togglebtn) {
      togglebtn = false;
      $(".layout_btn").html(`<button class="abled_btn_80" class="layout_btn" style="float: right;"><img src="./images/icons/arrow_left_icon.svg" /></button>`);
      $("#order_manage_company_fav_table_wrapper").hide();
      $(".order_list_block").removeClass("order_list_block_width");
    } else {
      togglebtn = true;
      $(".layout_btn").html(`<button class="abled_btn_80" class="layout_btn" style="float: right;"><img src="./images/icons/arrow_right_icon.svg" /></button>`);
      $("#order_manage_company_fav_table_wrapper").show();
      $(".order_list_block").addClass("order_list_block_width");
    }
  });

  // 오더목록 테이블 해당 로우 클릭시 색상 변경

  $("#order_list_table tbody tr").click(function (e) {
    const target = $(e.currentTarget);
    $("#order_list_table tbody tr").not(target).removeClass("table_background");
    target.toggleClass("table_background");
  });

  // 제품목록 테이블

  $("#product_list_table").DataTable({
    lengthChange: false,
    // 검색 기능 숨기기
    searching: false,
    ordering: false,
    paginate: false,
    info: true,
    scrollY: 156,
    scrollX: true,

    language: {
      emptyTable: "데이터가 없습니다.",
      info: "_TOTAL_",
    },

    dom: `<".product_list_table_title"><".product_list_table_sub_title">i<".order_register_btn">t`,
  });

  $(".product_list_table_title").html(`<span class="order_list_table_title noto-medium font-size-14 font-color-deep-black" style="float: left;">제품목록</span>`);
  $(".product_list_table_sub_title").html(`<span class="order_list_table_sub_title noto-regular font-size-14 font-color-grey" style="float: left;">Total : </span>`);

  // 제품목록 테이블 해당 로우 클릭시 색상 변경

  $("#product_list_table tbody tr").click(function (e) {
    const target = $(e.currentTarget);
    $("#product_list_table tbody tr").not(target).removeClass("table_background");
    target.toggleClass("table_background");
  });

  // 운송사 즐겨찾기 테이블

  $("#order_manage_company_fav_table").DataTable({
    scrollY: 624,
    scrollX: false,
    lengthChange: false,
    searching: false,
    ordering: false,
    paginate: false,
    info: true,

    language: {
      emptyTable: "데이터가 없습니다.",
      info: "_TOTAL_",
    },

    dom: `<".order_manage_company_fav_title"><".order_manage_company_fav_sub_title"><".order_manage_company_fav_btn">it`,
  });

  $(".order_manage_company_fav_title").html(`<span class="order_manage_company_fav_title noto-medium font-size-14 font-color-deep-black" style="float: left; margin-top:22px;">운송사즐겨찾기</span>`);
  $(".order_manage_company_fav_sub_title").html(`<span class="order_manage_company_fav_sub_title noto-regular font-size-14 font-color-grey" style="float: left;">Total : </span>`);
  $(".order_manage_company_fav_btn").html(`<button class="abled_btn_120 order_register_btn" style="float: right;  margin: 0 8px 16px 8px;">즐겨찾기 추가</button>`);

  // 운송사즐겨찾기 테이블 해당 로우 클릭시 색상 변경

  $("#order_manage_company_fav_table tbody tr").click(function (e) {
    const target = $(e.currentTarget);
    $("#order_manage_company_fav_table tbody tr").not(target).removeClass("table_background");
    target.toggleClass("table_background");
  });

  // modal order_detail 사고이력 테이블

  $("#modal_order_detail_accident_history_table").DataTable({
    lengthChange: false,
    // 검색 기능 숨기기
    searching: false,
    ordering: false,
    paginate: false,
    info: false,
  });

  // modal order_detail 배차이력 테이블

  $("#modal_order_detail_dispatch_history_table").DataTable({
    lengthChange: false,
    // 검색 기능 숨기기
    searching: false,
    ordering: false,
    paginate: false,
    info: false,
  });

  // 오더등록 모달 창 띄우기 & 닫기(닫을 때 확인 모달)

  $(".order_register_btn").click(function () {
    $(".modal_order_register").fadeIn(200);
    $("#modal_background").fadeIn(200);
    $("body").addClass("no-scroll");
  });

  $(".modal_header_close").click(function () {
    $(".modal_order_register").fadeOut(200);
    $("#modal_background").fadeOut(200);
    $("body").removeClass("no-scroll");
  });

  // 오더 등록 완료 시 알림
  $(".modal_order_register_btn").click(function () {
    $(".modal_order_register_complete").fadeIn(200);
    $(".modal_order_register").fadeOut(200);
    $("body").addClass("no-scroll");
  });

  $(".modal_order_register_complete_btn").click(function () {
    $(".modal_order_register_complete").fadeOut(200);
    $("#modal_background").fadeOut(200);
    $("body").removeClass("no-scroll");
  });

  const current_page = jQuery(location).attr("pathname");

  //load가 되었을때 실행
  $(".header_menu_container .gnb_menu > li").siblings("li").removeClass("active_current_page"); //다른 active가 있으면 지워준다.

  if (current_page.indexOf("home") > -1) {
    //url에 home이라는 글자가 있으면 실행
    $(".header_menu_container .gnb_menu > li").eq(0).addClass("active_current_page");
  } else if (current_page.indexOf("template") > -1) {
    //url에 contact라는 글자가 있으면 실행
    $(".header_menu_container .gnb_menu > li").eq(1).addClass("active_current_page");
  } else if (current_page.indexOf("template") > -1) {
    $(".header_menu_container .gnb_menu > li").eq(2).addClass("active_current_page");
  } else if (current_page.indexOf("template") > -1) {
    $(".header_menu_container .gnb_menu > li").eq(2).addClass("active_current_page");
  }

  const orderRegisterToday = new Date();
  const orderRegisterTodayCurrentDate =
    orderRegisterToday.getFullYear() + "-" + ("00" + (orderRegisterToday.getMonth() + 1)).toString().slice(-2) + "-" + ("00" + orderRegisterToday.getDate()).toString().slice(-2);
  $(".order_register_date").attr("value", orderRegisterTodayCurrentDate);

  $(".order_register_time").on("propertychange change keyup paste input", function () {
    if ($(this).val() >= 59) {
      $(this).val(59);
    }
  });

  // 오더상세 모달 오더 등록 버튼 유효성검사

  const orderRegisterNecessaryInput1 = $(".order_register_load_name");
  const orderRegisterNecessaryInput2 = $(".order_register_load_place_code");
  const orderRegisterNecessaryInput3 = $(".order_register_unload_name");
  const orderRegisterNecessaryInput4 = $(".order_register_unload_place_code");
  $(orderRegisterNecessaryInput1)
    .add(orderRegisterNecessaryInput2)
    .add(orderRegisterNecessaryInput3)
    .add(orderRegisterNecessaryInput4)
    .on("propertychange change keyup paste input", function () {
      if (
        orderRegisterNecessaryInput1.val().length >= 1 &&
        orderRegisterNecessaryInput2.val().length >= 1 &&
        orderRegisterNecessaryInput3.val().length >= 1 &&
        orderRegisterNecessaryInput4.val().length >= 1
      ) {
        $(".modal_order_register_btn").addClass("abled_btn_288").removeClass("disabled_btn_288").attr("disabled", false);
      } else {
        $(".modal_order_register_btn").addClass("disabled_btn_288").removeClass("abled_btn_288").attr("disabled", true);
      }
    });

  // modal_sending_acquisition_history.html - 전자인수증 관리_오더관리_오더상세_인수내역전송(SMS)
  // modal_sending_acquisition_history.html - 전자인수증 관리_오더관리_오더상세_인수내역전송(SMS)
  // modal_sending_acquisition_history.html - 전자인수증 관리_오더관리_오더상세_인수내역전송(SMS)

  $(".modal_sending_acquisition_history_phoneNumber1, .modal_sending_acquisition_history_phoneNumber2").keyup(function () {
    const sending_phoneNumber1 = $(".modal_sending_acquisition_history_phoneNumber1").val();
    const sending_phoneNumber2 = $(".modal_sending_acquisition_history_phoneNumber2").val();
    if (sending_phoneNumber1.length == 3) {
      $(".modal_sending_acquisition_history_phoneNumber2").focus();
    }
    if (sending_phoneNumber2.length == 4) {
      $(".modal_sending_acquisition_history_phoneNumber3").focus();
    }
  });

  $(`input:radio[name="sending_choice"]`).change(function () {
    if ($(`input:radio[name="sending_choice"]:checked`).val() == "SMS") {
      $(".sending_SMS_block").css({ display: "flex" });
      $(".sending_email_block").css({ display: "none" });

      $(".sending_acquisition_history_btn").addClass("disabled_btn_288").removeClass("abled_btn_288");
      $(".sending_email_block input").val("");
    } else {
      $(".sending_SMS_block").css({ display: "none" });
      $(".sending_email_block").css({ display: "flex" });

      $(".sending_acquisition_history_btn").addClass("disabled_btn_288").removeClass("abled_btn_288");
      $(".sending_SMS_block input").val("");
    }
  });

  if ($(`input:radio[name="sending_choice"]:checked`).val() == "SMS") {
    $(".sending_SMS_block, sending_email_block input").on("propertychange change keyup paste input", function () {
      const SMSInputLength = $(".sending_SMS_block input:last-child").val();
      if (SMSInputLength.length >= 4) {
        $(".sending_acquisition_history_btn").addClass("abled_btn_288").removeClass("disabled_btn_288");
      } else {
        $(".sending_email_block input, sending_SMS_block input").on("propertychange change keyup paste input", function () {
          const emailInputLength = $(".sending_email_block input").val();
          if (emailInputLength.length >= 1) {
            $(".sending_acquisition_history_btn").addClass("abled_btn_288").removeClass("disabled_btn_288");
          }
        });
      }
    });
  }

  // modal_load_unload_registration
  // 상하차지 등록
  let loadUnloadCloneCount = 1;
  $(".modal_load_unload_registration_plus_person_in_charge_btn").click(function (e) {
    e.preventDefault();

    const newElem = $("#input_box").clone().appendTo(".input_box_container").find("input:radio").end();
    $(newElem)
      .find("input:radio, label")
      .each(function (index, attr) {
        $(this).attr("id", $(this).attr("id") + loadUnloadCloneCount);
        $(this).attr("for", $(this).attr("for") + loadUnloadCloneCount);
      });
    loadUnloadCloneCount++;
  });

  $(".load_unload_place_name_input, .load_unload_code_input").on("propertychange change keyup paste input", function () {
    const placeNameLength = $(".load_unload_place_name_input").val();
    const codeLength = $(".load_unload_code_input").val();
    if (placeNameLength.length >= 1 && codeLength >= 1) {
      $(".modal_load_unload_registration_btn").attr("disabled", false).addClass("abled_btn_288").removeClass("disabled_btn_288");
    } else {
      $(".modal_load_unload_registration_btn").attr("disabled", true).addClass("disabled_btn_288").removeClass("abled_btn_288");
    }
  });

  /* shipper template managing page */
  const display_button = $(".shipper_template_display_button");
  const display_section = $(".shipper_template_display_container");
  display_button.on("click", function () {
    if (display_section.hasClass("unfold")) {
      display_section.removeClass("unfold");
    } else {
      display_section.addClass("unfold");
    }

    if (display_button.hasClass("meatball_menu")) {
      display_button.removeClass("meatball_menu");
      display_button.addClass("kebab_menu");
    } else {
      display_button.removeClass("kebab_menu");
      display_button.addClass("meatball_menu");
    }
  });

  // 템플릿모달

  $(".template_register_btn").click(function () {
    $(".modal_template_registration").fadeIn(200);
    $("#modal_background").fadeIn(200);
    $("body").addClass("no-scroll");
  });
  $(".modal_template_registration_close").click(function () {
    $(".modal_template_registration").fadeOut(200);
    $("#modal_background").fadeOut(200);
    $("body").removeClass("no-scroll");
  });

  /* shipper order side slide menu */
  /* 오더 관리 사이드 메뉴 - 화주 */
  /* shipper_order.html */

  $("#shipper_fav_company_datatable").DataTable({
    scrollY: "624px",
    scrollX: false,
    searching: false,
    lengthChange: false,
    info: true,
    paginate: false,

    language: {
      emptyTable: "데이터가 없습니다.",
      lengthMenu: "페이지당 데이터 건수 _MENU_",
      info: "_TOTAL_",
      zeroRecords: "해당 검색 데이터가 없습니다.",
    },

    oLanguage: {
      sInfoEmpty: "0",
    },

    // DOM custom for button, menu
    dom: `<".shipper_fav_company_total_title"><".shipper_fav_company_total_sub_title"><".shipper_fav_company_add_button">ilt`,
  });
  // custom dom css
  $(".shipper_fav_company_total_title").html(`<span class="shipper_fav_company_total_title noto-medium font-size-14 font-color-deep-black" style="float: left;">운송사 즐겨찾기</span>`);
  $(".shipper_fav_company_total_sub_title").html(`<span class="shipper_fav_company_total_sub_title noto-regular font-size-14 font-color-grey" style="float: left;">Total : </span>`);
  $(".shipper_fav_company_add_button").html(`<button class="abled_btn_160" class="shipper_fav_company_add_button" style="float: right;">운송사 즐겨찾기 추가</button>`);


});

// ///////////////// admin js ///////////////////////
// ///////////////// admin js ///////////////////////
// ///////////////// admin js ///////////////////////
$(function () {
  $(".admin_login").submit(function (event) {
    event.preventDefault();

    const adminLoginId = $(".admin_login_id_input").val();
    const adminLoginPwd = $(".admin_login_pwd_input").val();
    const adminLoginResult = $(".admin_login_fail");
    const adminLoginFailText = "아이디 및 패스워드를 입력해주세요.";

    if (adminLoginId === "") {
      adminLoginResult.text(adminLoginFailText);
      $(".admin_login_id_input").focus();
    } else if (adminLoginPwd === "") {
      adminLoginResult.text(adminLoginFailText);
      $(".admin_login_pwd_input").focus();
    } else {
      // 로그인 로직 구현
    }
  });

  // 어드민 상위계정 등록

  $(".modal_upper_account_registration .tabs_area .tabs li a").on("click", function () {
    // 해당 요소를 클릭하는 내 자신의 index 번호를 가져온다. [0], [1]
    const upperAccountRegistrationNumber = $(".modal_upper_account_registration .tabs_area .tabs li a").index($(this));

    // 기존에 적용되어 있는 on class 삭제
    $(".modal_upper_account_registration .tabs_area .tabs li").removeClass("on");
    $(".modal_upper_account_registration .tabs_area .tab_box").removeClass("on");
    // 다음 요소 클릭시 on class 추가
    $(".modal_upper_account_registration .tabs_area .tabs li:eq(" + upperAccountRegistrationNumber + ")").addClass("on");
    $(".modal_upper_account_registration .tabs_area .tab_box:eq(" + upperAccountRegistrationNumber + ")").addClass("on");

    if ($(".modal_upper_account_registration .tabs_area .tabs li:eq(" + upperAccountRegistrationNumber + ")").hasClass("on")) {
      $(".modal_upper_account_registration .tabs_area .tabs li:eq(" + upperAccountRegistrationNumber + ")").removeClass("complete_tab");
    }

    if (upperAccountRegistrationNumber == 0) {
      $(".modal_upper_account_registration").css({ height: "616px" });
      $(".tabs").css({ height: "560px" });
    } else if (upperAccountRegistrationNumber == 1) {
      $(".modal_upper_account_registration").css({ height: "872px" });
      $(".tabs").css({ height: "816px" });
    } else if (upperAccountRegistrationNumber == 2) {
      $(".modal_upper_account_registration").css({ height: "552px" });
      $(".tabs").css({ minHeight: "496px" });
      $(".tabs").css({ height: "496px" });
    } else if (upperAccountRegistrationNumber == 3) {
      $(".modal_upper_account_registration").css({ height: "760px" });
      $(".tabs").css({ height: "704px" });
    } else if (upperAccountRegistrationNumber == 4 || upperAccountRegistrationNumber == 5) {
      $(".modal_upper_account_registration").css({ height: "488px" });
      $(".tabs").css({ minHeight: "432px" });
      $(".tabs").css({ height: "432px" });
    }
  });

  // 어드민 상위계정 등록 법인 정보 탭
  const companyRegistrationNumber1 = $(".company_registration_number1");
  const companyRegistrationNumber2 = $(".company_registration_number2");
  const companyRegistrationNumber3 = $(".company_registration_number3");
  let companyRegistrationNumber = false;
  $(".company_registration_number1, .company_registration_number2, .company_registration_number3").keyup(function () {
    if (companyRegistrationNumber1.val().length >= 3) {
      $(".company_registration_number2").focus();
    }
    if (companyRegistrationNumber2.val().length >= 2) {
      $(".company_registration_number3").focus();
    }

    if (companyRegistrationNumber1.val().length >= 3 && companyRegistrationNumber2.val().length >= 2 && companyRegistrationNumber3.val().length >= 6) {
      $(".company_registration_number_btn").addClass("abled_btn_120").removeClass("disabled_btn_120").attr("disabled", false);
      companyRegistrationNumber = true;
    } else {
      $(".company_registration_number_btn").addClass("disabled_btn_120").removeClass("abled_btn_120").attr("disabled", true);
      companyRegistrationNumber = false;
      $("#corporate_none_duplicate").css({ display: "none" });
    }
    $(".company_registration_number_btn").click(function (e) {
      e.preventDefault();
      $("#corporate_none_duplicate").css({ display: "block" });
    });
  });

  const bossNumber1 = $(".boss_number1");
  const bossNumber2 = $(".boss_number2");
  const bossNumber3 = $(".boss_number3");
  const faxNumber1 = $(".FAX_number1");
  const faxNumber2 = $(".FAX_number2");
  const faxNumber3 = $(".FAX_number3");
  let bossNumberCompelte = false;
  $(".boss_number1, .boss_number2, .boss_number3").keyup(function () {
    if (bossNumber1.val().length >= 3) {
      $(".boss_number2").focus();
    }
    if (bossNumber2.val().length >= 4) {
      $(".boss_number3").focus();
    }
    if (bossNumber1.val().length >= 3 && bossNumber2.val().length >= 4 && bossNumber3.val().length >= 4) {
      bossNumberCompelte = true;
    } else {
      bossNumberCompelte = false;
    }
  });

  $(".FAX_number1, .FAX_number2, .FAX_number3").keyup(function () {
    if (faxNumber1.val().length >= 3) {
      $(".FAX_number2").focus();
    }
    if (faxNumber2.val().length >= 4) {
      $(".FAX_number3").focus();
    }
  });

  // 어드민 상위계정 등록 계정 정보 탭

  $(".company_name_input").keyup(function () {
    if ($(".company_name_input").val().length >= 1) {
      $(".company_name_btn").addClass("abled_btn_120").removeClass("disabled_btn_120").attr("disabled", false);
    } else {
      $(".company_name_btn").addClass("disabled_btn_120").removeClass("abled_btn_120").attr("disabled", true);
      e.preventDefault();
      $("#company_none_duplicate").css({ display: "none" });
    }
    $(".company_name_btn").click(function (e) {
      e.preventDefault();
      $("#company_none_duplicate").css({ display: "block" });
    });
  });

  // 로고 이미지 업로드

  let logoImgCount = 0;
  let logoImgDeleteCount = 0;
  function readInputFile(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        const closeSrc = "./images/icons/img_close_icon.svg";
        const img_radio = "<input type=" + "radio" + " id=" + "logo_img_radio" + " name=" + "logo_img" + " value=" + "logo" + " checked />";
        const img_radio_label = "<label for=" + "logo_img_radio" + "><span></span>대표이미지</label>";

        $(".logo_image_block").append("<div><img class=" + "img_delete_btn" + logoImgDeleteCount + " src=" + closeSrc + "><img src=" + e.target.result + "></div>");
        logoImgDeleteCount++;

        // 이미지 삭제 기능
        $(".logo_image_block div:last-child").append(img_radio);
        $(".logo_image_block div img:first-child").click(function (e) {
          $(this).parent().remove();
          // console.log($(".img_delete_btn").parent().remove());
        });

        $(".logo_image_block div:last-child")
          .append(img_radio_label)
          .find("input:radio, label")
          .each(function (index, attr) {
            $(this).attr("id", $(this).attr("id") + logoImgCount);
            $(this).attr("for", $(this).attr("for") + logoImgCount);
          });
      };
      reader.readAsDataURL(input.files[0]);
      logoImgCount++;
    }
  }

  $("#logo_img_upload").on("change", function () {
    readInputFile(this);
  });

  // 인장 이미지 업로드

  let sealImgCount = 0;
  let sealImgDeleteCount = 0;
  function sealReadInputFile(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        const closeSrc = "./images/icons/img_close_icon.svg";
        const img_radio = "<input type=" + "radio" + " id=" + "seal_img_radio" + " name=" + "seal_img" + " value=" + "seal" + " checked />";
        const img_radio_label = "<label for=" + "seal_img_radio" + "><span></span>대표이미지</label>";

        $(".seal_image_block").append("<div><img class=" + "img_delete_btn" + sealImgDeleteCount + " src=" + closeSrc + "><img src=" + e.target.result + "></div>");
        sealImgDeleteCount++;

        // 이미지 삭제 기능
        $(".seal_image_block div:last-child").append(img_radio);
        $(".seal_image_block div img:first-child").click(function (e) {
          $(this).parent().remove();
          // console.log($(".img_delete_btn").parent().remove());
        });

        $(".seal_image_block div:last-child")
          .append(img_radio_label)
          .find("input:radio, label")
          .each(function (index, attr) {
            $(this).attr("id", $(this).attr("id") + sealImgCount);
            $(this).attr("for", $(this).attr("for") + sealImgCount);
          });
      };
      reader.readAsDataURL(input.files[0]);
      sealImgCount++;
    }
  }

  $("#seal_img_upload").on("change", function () {
    sealReadInputFile(this);
  });

  // 어드민 상위계정 등록 step

  const corporationInfoInput = $(".corporation_info_input");
  const corporationTabEmailInput = $(".corporation_tab_email_input");
  const corporationTabBossNameInput = $(".corporation_tab_boss_name_input");
  $(companyRegistrationNumber)
    .add(bossNumberCompelte)
    .add(companyRegistrationNumber1)
    .add(companyRegistrationNumber2)
    .add(companyRegistrationNumber3)
    .add(bossNumber1)
    .add(bossNumber2)
    .add(bossNumber3)
    .add(corporationInfoInput)
    .add(corporationTabEmailInput)
    .add(corporationTabBossNameInput)
    .on("keyup", function () {
      if (
        companyRegistrationNumber == true &&
        bossNumberCompelte == true &&
        corporationInfoInput.val().length >= 1 &&
        corporationTabEmailInput.val().length >= 1 &&
        corporationTabBossNameInput.val().length >= 1
      ) {
        $(".upper_account_corporation_tab_btn").addClass("abled_btn_120").removeClass("disable_btn_120").attr("disabled", false);
      } else {
        $(".upper_account_corporation_tab_btn").addClass("disabled_btn_120").removeClass("abled_btn_120").attr("disabled", true);
      }
    });

  // 상위계정등록 다음 단계

  $(".upper_account_corporation_tab_btn").click(function (e) {
    e.preventDefault();
    $(".upper_account_tab2").addClass("on");
    $(".upper_account_tab1").removeClass("on");
    $(".upper_account_tab1").addClass("complete_tab");
    $(".modal_upper_account_registration").css({ height: "872px" });
    $(".tabs").css({ height: "816px" });

    $(".upper_account_account_tab_btn").click(function (e) {
      e.preventDefault();
      $(".upper_account_tab3").addClass("on");
      $(".upper_account_tab2").removeClass("on");
      $(".upper_account_tab2").addClass("complete_tab");
      $(".modal_upper_account_registration").css({ height: "552px" });
      $(".tabs").css({ minHeight: "496px" });
      $(".tabs").css({ height: "496px" });
    });

    $(".upper_account_registration_tab_btn").click(function (e) {
      e.preventDefault();
      $(".upper_account_tab4").addClass("on");
      $(".upper_account_tab3").removeClass("on");
      $(".upper_account_tab3").addClass("complete_tab");
      $(".modal_upper_account_registration").css({ height: "760px" });
      $(".tabs").css({ height: "704px" });
    });

    $(".upper_account_calculate_tab_btn").click(function (e) {
      e.preventDefault();
      $(".upper_account_tab5").addClass("on");
      $(".upper_account_tab4").removeClass("on");
      $(".upper_account_tab4").addClass("complete_tab");
      $(".modal_upper_account_registration").css({ height: "488px" });
      $(".tabs").css({ minHeight: "432px" });
      $(".tabs").css({ height: "432px" });
    });

    $(".upper_account_API_tab_btn").click(function (e) {
      e.preventDefault();
      $(".upper_account_tab6").addClass("on");
      $(".upper_account_tab5").removeClass("on");
      $(".upper_account_tab5").addClass("complete_tab");
      $(".modal_upper_account_registration").css({ height: "488px" });
      $(".tabs").css({ minHeight: "432px" });
      $(".tabs").css({ height: "432px" });
    });
  });

  // 계정정보탭 담당자 추가

  const accountPersonInChargeNumber1 = $(".account_person_in_charge_number1");
  const accountPersonInChargeNumber2 = $(".account_person_in_charge_number2");
  const accountPersonInChargeNumber3 = $(".account_person_in_charge_number3");
  const accountPersonInChargeName = $(".account_person_in_charge_name");
  const accountPersonInChargeEmail = $(".account_person_in_charge_email");
  $(accountPersonInChargeNumber1)
    .add(accountPersonInChargeNumber2)
    .on("keyup", function () {
      if (accountPersonInChargeNumber1.val().length >= 3) {
        $(".account_person_in_charge_number2").focus();
      }
      if (accountPersonInChargeNumber2.val().length >= 4) {
        $(".account_person_in_charge_number3").focus();
      }
    });

  $(accountPersonInChargeNumber1)
    .add(accountPersonInChargeNumber2)
    .add(accountPersonInChargeNumber3)
    .add(accountPersonInChargeName)
    .add(accountPersonInChargeEmail)
    .on("keyup", function () {
      if (
        accountPersonInChargeNumber1.val().length >= 3 &&
        accountPersonInChargeNumber2.val().length >= 4 &&
        accountPersonInChargeNumber3.val().length >= 4 &&
        accountPersonInChargeName.val().length >= 1 &&
        accountPersonInChargeEmail.val().length >= 1
      ) {
        $(".account_plus_person_in_charge_btn").addClass("abled_btn_120").removeClass("disabled_btn_120").attr("disabled", false);
        $(".account_delete_person_in_charge_btn").addClass("abled_btn_120_border").removeClass("disabled_btn_120_border_grey").attr("disabled", false);
      } else {
        $(".account_plus_person_in_charge_btn").removeClass("abled_btn_120").addClass("disabled_btn_120").attr("disabled", true);
        $(".account_delete_person_in_charge_btn").removeClass("abled_btn_120_border").addClass("disabled_btn_120_border_grey").attr("disabled", true);
      }
    });

  let CloneCount = 1;
  $(".account_plus_person_in_charge_btn").click(function (e) {
    e.preventDefault();
    const newElem = $("#upper_account_input_box").clone().appendTo(".modal_upper_account_registration_account_tab_content .input_box_container").find("input:radio").end();
    $(newElem)
      .find("input:radio, label, button")
      .each(function (index, attr) {
        $(this).attr("id", $(this).attr("id") + CloneCount);
        $(this).attr("for", $(this).attr("for") + CloneCount);
        $(this).addClass("btn_number" + CloneCount);
        $(".person_in_charge_container button").click(function () {
          $(this).parent().parent().parent().remove();
          $("#upper_account_input_box").attr("id", $("#upper_account_input_box").attr("id") + --CloneCount);
        });
      });
    $("#upper_account_input_box").attr("id", $("#upper_account_input_box").attr("id") + CloneCount);
    CloneCount++;
  });

  $(".company_number1, .company_number2, .company_number3").keyup(function () {
    const companyNumber1 = $(".company_number1").val();
    const companyNumber2 = $(".company_number2").val();
    const companyNumber3 = $(".company_number3").val();

    if (companyNumber1.length >= 3) {
      $(".company_number2").focus();
    }
    if (companyNumber2.length >= 4) {
      $(".company_number3").focus();
    }
  });

  $(".company_fax_number1, .company_fax_number2, .company_fax_number3").keyup(function () {
    const companyFaxNumber1 = $(".company_fax_number1").val();
    const companyFaxNumber2 = $(".company_fax_number2").val();
    const companyFaxNumber3 = $(".company_fax_number3").val();

    if (companyFaxNumber1.length >= 3) {
      $(".company_fax_number2").focus();
    }
    if (companyFaxNumber2.length >= 4) {
      $(".company_fax_number3").focus();
    }
  });

  $(".abled_id_check_btn").click(function (e) {
    e.preventDefault();
    $(".abled_id").css({ display: "block" });
  });

  const modalUpperAccountRegistrationDate = new Date();
  const modalUpperAccountRegistrationToday =
    modalUpperAccountRegistrationDate.getFullYear() +
    "-" +
    ("00" + (modalUpperAccountRegistrationDate.getMonth() + 1)).toString().slice(-2) +
    "-" +
    ("00" + modalUpperAccountRegistrationDate.getDate()).toString().slice(-2);
  $(".modal_upper_account_registration_registration_info_tab_date").attr("value", modalUpperAccountRegistrationToday);
  // 다시
  $(".account_customer_PW")
    .add($(".account_customer_PW_check"))
    .on("keyup", function () {
      if ($(".account_customer_PW").val().length >= 6) {
        $(".modal_change_pw_dialog").show();
      } else {
        $(".modal_change_pw_dialog").hide();
      }
      if ($(".account_customer_PW").val() == $(".account_customer_PW_check").val() && $(".account_customer_PW_check").val().length >= 6) {
        $(".modal_change_pw_error_dialog").hide();
        $(".modal_change_pw_check_dialog").show();
      } else if ($(".account_customer_PW").val() != $(".account_customer_PW_check").val() && $(".account_customer_PW_check").val().length >= 6) {
        $(".modal_change_pw_check_dialog").hide();
        $(".modal_change_pw_error_dialog").show();
      } else {
        $(".modal_change_pw_check_dialog").hide();
        $(".modal_change_pw_error_dialog").hide();
      }
    });

  // 계정정보 다음단계 버튼 활성화

  $(".account_company_name_input")
    .add($(".company_number1"))
    .add($(".company_number2"))
    .add($(".company_number3"))
    .add($(".account_company_email"))
    .add($(".account_person_in_charge_name"))
    .add($(".account_person_in_charge_email"))
    .add($(".account_person_in_charge_number1"))
    .add($(".account_person_in_charge_number2"))
    .add($(".account_person_in_charge_number3"))
    .add($(".account_customer_ID"))
    .add($(".account_customer_PW"))
    .add($(".account_customer_PW_check"))
    .on("keyup", function () {
      if (
        $(".account_company_name_input").val().length >= 1 &&
        $(".company_number1").val().length >= 1 &&
        $(".company_number2").val().length >= 1 &&
        $(".company_number3").val().length >= 1 &&
        $(".account_company_email").val().length >= 1 &&
        $(".account_person_in_charge_name").val().length >= 1 &&
        $(".account_person_in_charge_email").val().length >= 1 &&
        $(".account_person_in_charge_number1").val().length >= 1 &&
        $(".account_person_in_charge_number2").val().length >= 1 &&
        $(".account_person_in_charge_number3").val().length >= 1 &&
        $(".account_customer_ID").val().length >= 1 &&
        $(".account_customer_PW").val().length >= 1 &&
        $(".account_customer_PW_check").val().length >= 1
      ) {
        $(".upper_account_account_tab_btn").addClass("abled_btn_120").removeClass("disabled_btn_120").attr("disabled", false);
      } else {
        $(".upper_account_account_tab_btn").addClass("disabled_btn_120").removeClass("abled_btn_120").attr("disabled", true);
      }
    });

  // 가입정보 탭
  // 파일추가
  let serviceContract = false;
  let businessLicense = false;
  $("#service_contract").change(function () {
    if ($(this).get(0).files.length !== 0) {
      const file = $("#service_contract")[0].files[0].name;
      $(this).next("span").text(file);
      if ($("#service_contract").length >= 1) {
        serviceContract = true;
      }
    }
  });

  $("#business_license").change(function () {
    if ($(this).get(0).files.length !== 0) {
      const file = $("#business_license")[0].files[0].name;
      $(this).next("span").text(file);
      if ($("#service_contract").length >= 1) {
        businessLicense = true;
      }
    }
  });

  $("#service_contract")
    .add($("#business_license"))
    .on("change", function () {
      if (serviceContract == true && businessLicense == true) {
        $(".upper_account_registration_tab_btn").addClass("abled_btn_120").removeClass(".disabled_btn_120").attr("disabled", false);
      } else {
        $(".upper_account_registration_tab_btn").removeClass("abled_btn_120").addClass(".disabled_btn_120").attr("disabled", true);
      }
    });

  // 정산정보 탭 담당자 input 유효성 검사

  const calculatePersonInChargeNumber1 = $(".calculate_person_in_charge_number1");
  const calculatePersonInChargeNumber2 = $(".calculate_person_in_charge_number2");
  const calculatePersonInChargeNumber3 = $(".calculate_person_in_charge_number3");
  const calculatePersonInChargeName = $(".calculate_person_in_charge_name");
  const calculatePersonInChargeEmail = $(".calculate_person_in_charge_email");
  const MDMCode = $(".MDM_code_input");

  $(calculatePersonInChargeNumber1)
    .add(calculatePersonInChargeNumber2)
    .add(calculatePersonInChargeNumber3)
    .on("keyup", function () {
      if (calculatePersonInChargeNumber1.val().length >= 3) {
        $(".calculate_person_in_charge_number2").focus();
      }
      if (calculatePersonInChargeNumber2.val().length >= 4) {
        $(".calculate_person_in_charge_number3").focus();
      }
    });

  $(calculatePersonInChargeNumber1)
    .add(calculatePersonInChargeNumber2)
    .add(calculatePersonInChargeNumber3)
    .add(calculatePersonInChargeName)
    .add(calculatePersonInChargeEmail)
    .on("keyup", function () {
      if (
        calculatePersonInChargeNumber1.val().length >= 3 &&
        calculatePersonInChargeNumber2.val().length >= 4 &&
        calculatePersonInChargeNumber3.val().length >= 4 &&
        calculatePersonInChargeName.val().length >= 1 &&
        calculatePersonInChargeEmail.val().length >= 1
      ) {
        $(".calculate_plus_person_in_charge_btn").addClass("abled_btn_120").removeClass("disabled_btn_120").attr("disabled", false);
      }
    });

  // 정산정보 탭 담당자 추가

  let calculateCloneCount = 1;
  $(".calculate_plus_person_in_charge_btn").click(function (e) {
    e.preventDefault();

    const calculateNewElem = $("#upper_calculate_input_box")
      .clone()
      .appendTo(".modal_upper_account_registration_calculate_tab_content > ul > li > .calculate_input_box_container")
      .find(".calculate_input_box_container input:radio")
      .end();
    $(calculateNewElem)
      .find("input:radio, label")
      .each(function (index, item) {
        $(this).attr("id", $(this).attr("id") + calculateCloneCount);
        $(this).attr("for", $(this).attr("for") + calculateCloneCount);
        // $(".calculate_plus_person_in_charge_delete_btn").attr("id", "abled_btn_120_border").attr("disabled", false);
      });
    calculateCloneCount++;
  });

  // 정산정보 탭 input[type="date"] default 날짜 설정

  const calculateCurrentDate = new Date();
  const calculateCurrentToday =
    calculateCurrentDate.getFullYear() + "-" + ("00" + (calculateCurrentDate.getMonth() + 1)).toString().slice(-2) + "-" + ("00" + calculateCurrentDate.getDate()).toString().slice(-2);
  $(".modal_upper_account_registration_calculate_tab_date").attr("value", calculateCurrentToday);

  // 정산정보 탭 다음단계 버튼 활성화
  // 필수부분 중 연락처 제외하고 나머지 모든 인풋이 한글자라도 들어가면 활성화

  $(calculatePersonInChargeNumber1)
    .add(calculatePersonInChargeNumber2)
    .add(calculatePersonInChargeNumber3)
    .add(calculatePersonInChargeName)
    .add(calculatePersonInChargeEmail)
    .add(MDMCode)
    .on("keyup", function () {
      if (
        calculatePersonInChargeNumber1.val().length >= 1 &&
        calculatePersonInChargeNumber2.val().length >= 1 &&
        calculatePersonInChargeNumber3.val().length >= 1 &&
        calculatePersonInChargeName.val().length >= 1 &&
        calculatePersonInChargeEmail.val().length >= 1 &&
        MDMCode.val().length >= 1
      ) {
        $(".upper_account_calculate_tab_btn").addClass("abled_btn_120").removeClass("disabled_btn_120").attr("disabled", false);
      } else {
        $(".upper_account_calculate_tab_btn").removeClass("abled_btn_120").addClass("disabled_btn_120").attr("disabled", true);
      }
    });

  // 할인 정보 탭

  $(`input:radio[name="used_unused_discount"]`).change(function () {
    if ($(`input:radio[name="used_unused_discount"]:checked`).val() == "used") {
      $(".modal_upper_account_registration .modal_upper_account_registration_discount_tab_content li:not(:first-child)").css({ display: "flex" });
    } else {
      $(".modal_upper_account_registration .modal_upper_account_registration_discount_tab_content li:not(:first-child)").css({ display: "none" });
    }
  });

  // 할인 정보 탭 할인율 100이하로 받게 설정

  $(".discount_input").on("propertychange change keyup paste input", function () {
    if ($(this).val() >= 101) {
      $(this).val(100);
    }
  });

  // API 정보 탭

  $(`input:radio[name="develop_API"]`).change(function () {
    if ($(`input:radio[name="develop_API"]:checked`).val() == "used") {
      $(".develop_API_input_box").css({ display: "flex" });
    } else {
      $(".develop_API_input_box").css({ display: "none" });
    }
  });

  $(`input:radio[name="operation_API"]`).change(function () {
    if ($(`input:radio[name="operation_API"]:checked`).val() == "used") {
      $(".operation_API_input_box").css({ display: "flex" });
    } else {
      $(".operation_API_input_box").css({ display: "none" });
    }
  });

  // 이벤트 등록 모달
  // 이미지업로드
  function mainImgReadFile(input) {
    if (input.files && input.files[0]) {
      let reader = new FileReader();

      reader.onload = function (e) {
        $("#driver_app_main_img_area").attr("src", e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
      $("#driver_app_main_img_view_area").css({ display: "block" });
    }
  }

  $("#driver_app_main_img_upload").change(function () {
    if ($("driver_app_main_img_upload").val() == "") {
      $("#driver_app_main_img_area").attr("src", "");
    }
    $("#driver_app_main_img_view_area").css({ display: "" });
    mainImgReadFile(this);
  });

  function bottomImgReadFile(input) {
    if (input.files && input.files[0]) {
      let reader = new FileReader();

      reader.onload = function (e) {
        $("#driver_app_bottom_img_area").attr("src", e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
      $("#driver_app_bottom_img_view_area").css({ display: "block" });
    }
  }

  $("#driver_app_bottom_img_upload").change(function () {
    bottomImgReadFile(this);
  });

  const orderEventToday = new Date();
  const ordereEventTodayCurrentDate =
    orderEventToday.getFullYear() + "-" + ("00" + (orderEventToday.getMonth() + 1)).toString().slice(-2) + "-" + ("00" + orderEventToday.getDate()).toString().slice(-2);
  $(".modal_event_start_date").attr("value", ordereEventTodayCurrentDate);
  $(".modal_event_end_date").attr("value", ordereEventTodayCurrentDate);
  $(".modal_event_start_time, .modal_event_end_time").on("propertychange change keyup paste input", function () {
    if ($(this).val() >= 59) {
      $(this).val(59);
    }
  });

  const modalEventGroupCheckAll = $("#event_modal_check_all");
  const modalEventGroupCheck1 = $("#event_modal_check_shipper");
  const modalEventGroupCheck2 = $("#event_modal_check_company");
  const modalEventGroupCheck3 = $("#event_modal_check_driver");
  const modalEventAppCheckAll = $("#event_modal_driver_app_location_check_all");
  const modalEventAppCheck1 = $("#event_modal_driver_app_location_check_main");
  const modalEventAppCheck2 = $("#event_modal_driver_app_location_check_bottom");
  modalEventGroupCheckAll.on("click", function () {
    if (modalEventGroupCheckAll.is(":checked")) {
      $(modalEventGroupCheck1).add(modalEventGroupCheck2).add(modalEventGroupCheck3).prop("checked", true);
    } else {
      $(modalEventGroupCheck1).add(modalEventGroupCheck2).add(modalEventGroupCheck3).prop("checked", false);
    }
  });
  modalEventGroupCheck1
    .add(modalEventGroupCheck2)
    .add(modalEventGroupCheck3)
    .on("click", function () {
      if (modalEventGroupCheck1.is(":checked") && modalEventGroupCheck2.is(":checked") && modalEventGroupCheck3.is(":checked")) {
        modalEventGroupCheckAll.prop("checked", true);
      } else {
        modalEventGroupCheckAll.prop("checked", false);
      }
    });

  modalEventAppCheckAll.on("click", function () {
    if (modalEventAppCheckAll.is(":checked")) {
      $(modalEventAppCheck1).add(modalEventAppCheck2).prop("checked", true);
    } else {
      $(modalEventAppCheck1).add(modalEventAppCheck2).prop("checked", false);
    }
  });
  modalEventAppCheck1.add(modalEventAppCheck2).on("click", function () {
    if (modalEventAppCheck1.is(":checked") && modalEventAppCheck2.is(":checked")) {
      modalEventAppCheckAll.prop("checked", true);
    } else {
      modalEventAppCheckAll.prop("checked", false);
    }
  });

  const eventTitleIpnut = $(".event_title_input");
  const eventUrlInput = $(".event_url_input");
  const eventLocationInputLeft = $(".event_location_input_left");
  const eventLocationInputTop = $(".event_location_input_top");
  const eventStartTime = $(".modal_event_start_time");
  const eventEndTime = $(".modal_event_end_time");
  const eventModalWidthInput = $(".event_modal_width_input");
  const eventModalHeightInput = $(".event_modal_height_input");

  $(`input:radio[name="event_type_radio"]`).change(function () {
    if ($(`input:radio[name="event_type_radio"]:checked`).val() == "URL") {
      $(".event_url").css({ display: "flex" });
      $(".event_content").css({ display: "none" });
    } else {
      $(".event_url").css({ display: "none" });
      $(".event_content").css({ display: "flex" });
    }
  });

  $(eventTitleIpnut)
    .add(eventLocationInputLeft)
    .add(eventLocationInputTop)
    .add(eventStartTime)
    .add(eventEndTime)
    .add(eventModalWidthInput)
    .add(eventModalHeightInput)
    .on("keyup", function () {
      if (
        eventTitleIpnut.val().length >= 1 &&
        eventLocationInputLeft.val().length >= 1 &&
        eventLocationInputTop.val().length >= 1 &&
        eventStartTime.val().length >= 1 &&
        eventEndTime.val().length >= 1 &&
        eventModalWidthInput.val().length >= 1 &&
        eventModalHeightInput.val().length >= 1
      ) {
        $(".modal_event_detail_btn").addClass("abled_btn_288").removeClass("disabled_btn_288").attr("disabled", false);
      } else {
        $(".modal_event_detail_btn").addClass("disabled_btn_288").removeClass("abled_btn_288").attr("disabled", true);
      }
    });

  // admin template 템플릿 등록 모달

  $(".alarm_title input").on("keyup", function () {
    if ($(".alarm_title input").val().length >= 1) {
      $(".template_registration_btn").addClass("abled_btn_288").removeClass("disabled_btn_288");
    } else {
      $(".template_registration_btn").addClass("disabled_btn_288").removeClass("abled_btn_288");
    }
  });

  // 운송사 즐겨찾기 등록 모달
  // 운송사 검색에 값이 있다면 등록 버튼 활성화
  $(".modal_company_fav_registration_input").on("keyup", function () {
    if ($(".modal_company_fav_registration_input").val().length >= 1) {
      $(".modal_company_fav_registration_btn").addClass("abled_btn_288").removeClass("disabled_btn_288").attr("disabled", false);
    } else {
      $(".modal_company_fav_registration_btn").addClass("disabled_btn_288").removeClass("abled_btn_288").attr("disabled", true);
    }
  });

  /* admin platform pay managing */
  /* 어드민 플랫폼 사용료 관리 */
  /* admin platform pay managing */
  const shipperPayBtn = $(".value_pay_shipper");
  const companyPayBtn = $(".value_pay_company");

  const shipperPayDisplay = $(".admin_platform_pay_shipper_container");
  const companyPayDisplay = $(".admin_platform_pay_company_container");

  // 페이지 로딩 시 첫 테이블 로딩 (화주)
  $("#admin_platform_pay_corporate_datatable").DataTable().destroy();
  $("#admin_platform_pay_corporate_datatable").DataTable({
    lengthChange: false,
    searching: false,
    ordering: false,
    info: true,
    scrollY: "260px",
    scrollX: false,
    paginate: false,

    language: {
      emptyTable: "데이터가 없습니다",
      info: "_TOTAL_",
    },
    oLanguage: {
      sInfoEmpty: "0",
    },
    dom: `<".admin_platform_pay_corporate_datatable_title"><".admin_platform_pay_corporate_datatable_sub_title">it`,
  });

  $(".admin_platform_pay_corporate_datatable_title").html(
    `<span class="admin_platform_pay_corporate_datatable_title noto-medium font-size-14 font-color-deep-black" style="float: left;">등록정보</span>`
  );
  $(".admin_platform_pay_corporate_datatable_sub_title").html(
    `<span class="admin_platform_pay_corporate_datatable_sub_title noto-regular font-size-14 font-color-grey" style="float: left;">Total : </span>`
  );

  $("#admin_platform_pay_location_datatable").DataTable().destroy();
  $("#admin_platform_pay_location_datatable").DataTable({
    lengthChange: false,
    searching: false,
    ordering: false,
    info: true,
    scrollY: "260px",
    scrollX: false,
    paginate: false,

    language: {
      emptyTable: "법인을 선택하세요",
      info: "_TOTAL_",
    },
    oLanguage: {
      sInfoEmpty: "0",
    },

    dom: `<".admin_platform_pay_location_datatable_title"><".admin_platform_pay_location_datatable_sub_title">it`,
  });

  $(".admin_platform_pay_location_datatable_title").html(
    `<span class="admin_platform_pay_location_datatable_title noto-medium font-size-14 font-color-deep-black" style="float: left;">등록정보</span>`
  );
  $(".admin_platform_pay_location_datatable_sub_title").html(
    `<span class="admin_platform_pay_location_datatable_sub_title noto-regular font-size-14 font-color-grey" style="float: left;">Total : </span>`
  );

  shipperPayBtn.add(companyPayBtn).on("click", function () {
    $(this).addClass("chip_active").removeClass("chip_default");
    shipperPayBtn.add(companyPayBtn).not(this).removeClass("chip_active").addClass("chip_default");

    if (shipperPayBtn.hasClass("chip_active")) {
      shipperPayDisplay.addClass("display").removeClass("hidden");
      companyPayDisplay.addClass("hidden").removeClass("display");

      // breadcrumbs change
      $(".admin_platform_pay_breadcrumbs_text").text("플랫폼 사용료 관리_화주");

      // Datatables load (화주-법인) - 좌하단 테이블
      $("#admin_platform_pay_corporate_datatable").DataTable().destroy();
      $("#admin_platform_pay_corporate_datatable").DataTable({
        lengthChange: false,
        searching: false,
        ordering: false,
        info: true,
        scrollY: "260px",
        scrollX: false,
        paginate: false,

        language: {
          emptyTable: "데이터가 없습니다",
          info: "_TOTAL_",
        },
        oLanguage: {
          sInfoEmpty: "0",
        },

        dom: `<".admin_platform_pay_corporate_datatable_title"><".admin_platform_pay_corporate_datatable_sub_title">it`,
      });

      $(".admin_platform_pay_corporate_datatable_title").html(
        `<span class="admin_platform_pay_corporate_datatable_title noto-medium font-size-14 font-color-deep-black" style="float: left;">등록정보</span>`
      );
      $(".admin_platform_pay_corporate_datatable_sub_title").html(
        `<span class="admin_platform_pay_corporate_datatable_sub_title noto-regular font-size-14 font-color-grey" style="float: left;">Total : </span>`
      );

      // Datatables load (화주-운송사) - 우하단 테이블
      $("#admin_platform_pay_location_datatable").DataTable().destroy();
      $("#admin_platform_pay_location_datatable").DataTable({
        lengthChange: false,
        searching: false,
        ordering: false,
        info: true,
        scrollY: "260px",
        scrollX: false,
        paginate: false,

        language: {
          emptyTable: "법인을 선택하세요",
          info: "_TOTAL_",
        },
        oLanguage: {
          sInfoEmpty: "0",
        },

        dom: `<".admin_platform_pay_location_datatable_title"><".admin_platform_pay_location_datatable_sub_title">it`,
      });

      $(".admin_platform_pay_location_datatable_title").html(
        `<span class="admin_platform_pay_location_datatable_title noto-medium font-size-14 font-color-deep-black" style="float: left;">등록정보</span>`
      );
      $(".admin_platform_pay_location_datatable_sub_title").html(
        `<span class="admin_platform_pay_location_datatable_sub_title noto-regular font-size-14 font-color-grey" style="float: left;">Total : </span>`
      );
    } else if (companyPayBtn.hasClass("chip_active")) {
      companyPayDisplay.addClass("display").removeClass("hidden");
      shipperPayDisplay.addClass("hidden").removeClass("display");

      // breadcrumbs change
      $(".admin_platform_pay_breadcrumbs_text").text("플랫폼 사용료 관리_운송사");

      // Datatables load (운송사)
      $("#admin_platform_pay_company_datatable").DataTable().destroy();
      $("#admin_platform_pay_company_datatable").DataTable({
        lengthChange: false,
        searching: false,
        ordering: false,
        info: true,
        scrollY: "260px",
        scrollX: true,
        paginate: false,

        language: {
          emptyTable: "데이터가 없습니다",
          info: "_TOTAL_",
        },
        oLanguage: {
          sInfoEmpty: "0",
        },

        dom: `<".admin_platform_pay_company_datatable_title"><".admin_platform_pay_company_datatable_sub_title">iltp`,
      });

      $(".admin_platform_pay_company_datatable_title").html(
        `<span class="admin_platform_pay_company_datatable_title noto-medium font-size-14 font-color-deep-black" style="float: left;">등록정보</span>`
      );
      $(".admin_platform_pay_company_datatable_sub_title").html(
        `<span class="admin_platform_pay_company_datatable_sub_title noto-regular font-size-14 font-color-grey" style="float: left;">Total : </span>`
      );
    }
  });

  // 테이블 클릭 시 줄 색상 변경
  $("#admin_platform_pay_company_datatable tbody tr").click(function (e) {
    const target = $(e.currentTarget);
    $("#admin_platform_pay_company_datatable tbody tr").not(target).removeClass("table_background");
    target.toggleClass("table_background");
  });

  $("#admin_platform_pay_corporate_datatable tbody tr").click(function (e) {
    const target = $(e.currentTarget);
    $("#admin_platform_pay_corporate_datatable tbody tr").not(target).removeClass("table_background");
    target.toggleClass("table_background");
  });

  /* admin calculate managing */
  /* 어드민 정산관리 페이지 */
  /* admin calculate managing */

  // 아래 테이블 number input only logic
  $(".admin_calculate_number_input")
    .add(".admin_calculate_percent_input")
    .on("propertychange change keyup paste input", function (event) {
      // number input check
      $(this).val(
        $(this)
          .val()
          // 0 ~ 9 까지만 입력
          .replace(/[^0-9]/g, "")
          // 세자리마다 콤마
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      );
    });

  // 아래 테이블 discount percent logic
  $(".admin_calculate_percent_input").on("propertychange change keyup paste input", function () {
    if ($(this).val() >= 101) {
      $(this).val(100);
    }
  });

  // 첫 로딩시 위 테이블 불러오기 (법인 - 화주)
  $("#admin_calculate_corporate_datatable").DataTable().destroy();
  $("#admin_calculate_corporate_datatable").DataTable({
    lengthChange: false,
    searching: false,
    ordering: false,
    info: true,
    scrollY: "260px",
    scrollX: true,
    paginate: false,

    language: {
      emptyTable: "데이터가 없습니다",
      info: "_TOTAL_",
    },
    oLanguage: {
      sInfoEmpty: "0",
    },

    dom: `<".admin_calculate_corporate_datatable_title"><".admin_calculate_corporate_datatable_sub_title">it`,
  });

  $(".admin_calculate_corporate_datatable_title").html(`<span class="admin_calculate_corporate_datatable_title noto-medium font-size-14 font-color-deep-black" style="float: left;">법인목록</span>`);
  $(".admin_calculate_corporate_datatable_sub_title").html(
    `<span class="admin_calculate_corporate_datatable_sub_title noto-regular font-size-14 font-color-grey" style="float: left;">Total : </span>`
  );

  // 첫 로딩시 화주 쪽 아래 테이블 불러오기
  $("#admin_calculate_corporate_payment_shipper_datatable").DataTable().destroy();
  $("#admin_calculate_corporate_payment_shipper_datatable").DataTable({
    autoWidth: false,
    lengthChange: false,
    searching: false,
    ordering: false,
    info: false,
    scrollY: "156px",
    scrollX: true,
    paginate: false,

    language: {
      emptyTable: "법인을 선택하세요",
      info: "_TOTAL_",
    },
    // Footer 총계 합산 로직
    footerCallback: function (row, data, start, end, display) {
      const api = this.api();

      // 콤마 없애기
      const intVal = function (i) {
        return typeof i === "string" ? i.replace(/[\,,]/g, "") * 1 : typeof i === "number" ? i : 0;
      };

      for (let i = 1; i <= 22; i++) {
        // 첫번재와 다섯번째는 input의 value값을 받아와야함
        if (i === 1 || i === 5) {
          const total = api
            .column(i)
            .nodes()
            .reduce(function (a, b) {
              return intVal(a) + intVal($("input", b).val());
            }, 0);
          const result = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          $(api.column(i).footer()).html(result);
        } else {
          // 그 외에는 일반적인 sum
          const total = api
            .column(i)
            .data()
            .reduce(function (a, b) {
              return intVal(a) + intVal(b);
            }, 0);
          const result = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          if (isNaN(total)) {
            $(api.column(i).footer()).html("-");
          } else {
            $(api.column(i).footer()).html(result);
          }
        }
      }
    },
  });

  // 법인, 사업장 chip button display change
  const calculateCorporate = $(".value_calculate_corporate");
  const calculateLocation = $(".value_calculate_location");
  const corporateTableContainer = $(".admin_calculate_corporate_datatable_container");
  const locationTableContainer = $(".admin_calculate_location_datatable_container");

  calculateCorporate.add(calculateLocation).on("click", function () {
    $(this).addClass("chip_active").removeClass("chip_default");
    calculateCorporate.add(calculateLocation).not(this).removeClass("chip_active").addClass("chip_default");

    if (calculateCorporate.hasClass("chip_active")) {
      // 법인 칩 버튼 클릭시 실행
      corporateTableContainer.addClass("display").removeClass("hidden");
      locationTableContainer.addClass("hidden").removeClass("display");

      // breadcrumbs change
      $(".admin_calculate_breadcrumbs_text").text("정산관리_법인");

      // 법인 테이블 로딩
      $("#admin_calculate_corporate_datatable").DataTable().destroy();
      $("#admin_calculate_location_datatable").DataTable().destroy();
      $("#admin_calculate_corporate_datatable").DataTable({
        lengthChange: false,
        searching: false,
        ordering: false,
        info: true,
        scrollY: "260px",
        scrollX: true,
        paginate: false,

        language: {
          emptyTable: "데이터가 없습니다",
          info: "_TOTAL_",
        },
        oLanguage: {
          sInfoEmpty: "0",
        },

        dom: `<".admin_calculate_corporate_datatable_title"><".admin_calculate_corporate_datatable_sub_title">it`,
      });

      $(".admin_calculate_corporate_datatable_title").html(
        `<span class="admin_calculate_corporate_datatable_title noto-medium font-size-14 font-color-deep-black" style="float: left;">법인목록</span>`
      );
      $(".admin_calculate_corporate_datatable_sub_title").html(
        `<span class="admin_calculate_corporate_datatable_sub_title noto-regular font-size-14 font-color-grey" style="float: left;">Total : </span>`
      );
    } else if (calculateLocation.hasClass("chip_active")) {
      // 사업장 칩 버튼 클릭시 실행
      locationTableContainer.addClass("display").removeClass("hidden");
      corporateTableContainer.addClass("hidden").removeClass("display");

      // breadcrumbs change
      $(".admin_calculate_breadcrumbs_text").text("정산관리_사업장");

      // 사업장 위 테이블 실행
      $("#admin_calculate_corporate_datatable").DataTable().destroy();
      $("#admin_calculate_location_datatable").DataTable().destroy();
      $("#admin_calculate_location_datatable").DataTable({
        lengthChange: false,
        searching: false,
        ordering: false,
        info: true,
        scrollY: "260px",
        scrollX: false,
        paginate: false,

        language: {
          emptyTable: "데이터가 없습니다",
          info: "_TOTAL_",
        },
        oLanguage: {
          sInfoEmpty: "0",
        },

        dom: `<".admin_calculate_location_datatable_title"><".admin_calculate_location_datatable_sub_title">it`,
      });

      $(".admin_calculate_location_datatable_title").html(`<span class="admin_calculate_location_datatable_title noto-medium font-size-14 font-color-deep-black" style="float: left;">법인목록</span>`);
      $(".admin_calculate_location_datatable_sub_title").html(
        `<span class="admin_calculate_location_datatable_sub_title noto-regular font-size-14 font-color-grey" style="float: left;">Total : </span>`
      );

      // 사업장 아래 테이블 실행
      $("#admin_calculate_location_payment_datatable").DataTable().destroy();
      $("#admin_calculate_location_payment_datatable").DataTable({
        autoWidth: false,
        lengthChange: false,
        searching: false,
        ordering: false,
        info: false,
        scrollY: "156px",
        scrollX: true,
        paginate: false,
        language: {
          emptyTable: "법인을 선택하세요",
        },
        // Footer 총계 합산 로직
        footerCallback: function (row, data, start, end, display) {
          const api = this.api();

          // 콤마 없애기
          const intVal = function (i) {
            return typeof i === "string" ? i.replace(/[\,,]/g, "") * 1 : typeof i === "number" ? i : 0;
          };

          for (let i = 6; i <= 20; i++) {
            // 일곱번째와 여덟번째는 input의 value값을 받아와야함
            if (i === 7 || i === 8) {
              const total = api
                .column(i)
                .nodes()
                .reduce(function (a, b) {
                  return intVal(a) + intVal($("input", b).val());
                }, 0);
              const result = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              $(api.column(i).footer()).html(result);
            } else {
              // 그 외에는 일반적인 sum
              const total = api
                .column(i)
                .data()
                .reduce(function (a, b) {
                  return intVal(a) + intVal(b);
                }, 0);
              const result = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              if (isNaN(total)) {
                $(api.column(i).footer()).html("-");
              } else {
                $(api.column(i).footer()).html(result);
              }
            }
          }
        },
      });
    }
  });

  // 정산 관리 법인 - row click event
  $("#admin_calculate_corporate_datatable tbody tr").on("click", function () {
    // '화주', '운송사' 구분에 따른 아래 테이블 교체
    const selector = $(this).children("td:nth-child(2)").text();

    if (selector === "화주") {
      $("#admin_calculate_corporate_payment_shipper_datatable").addClass("display").removeClass("hidden");
      $("#admin_calculate_corporate_payment_company_datatable").addClass("hidden").removeClass("display");

      $("#admin_calculate_corporate_payment_shipper_datatable").DataTable().destroy();
      $("#admin_calculate_corporate_payment_company_datatable").DataTable().destroy();
      $("#admin_calculate_corporate_payment_shipper_datatable").DataTable({
        autoWidth: false,
        lengthChange: false,
        searching: false,
        ordering: false,
        info: false,
        scrollY: "156px",
        scrollX: true,
        paginate: false,

        language: {
          emptyTable: "법인을 선택하세요.",
          info: "_TOTAL_",
        },

        // Footer 총계 합산 로직
        footerCallback: function (row, data, start, end, display) {
          const api = this.api();

          // 콤마 없애기
          const intVal = function (i) {
            return typeof i === "string" ? i.replace(/[\,,]/g, "") * 1 : typeof i === "number" ? i : 0;
          };

          for (let i = 1; i <= 22; i++) {
            // 첫번재와 다섯번째는 input의 value값을 받아와야함
            if (i === 1 || i === 5) {
              const total = api
                .column(i)
                .nodes()
                .reduce(function (a, b) {
                  return intVal(a) + intVal($("input", b).val());
                }, 0);
              const result = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              $(api.column(i).footer()).html(result);
            } else {
              // 그 외에는 일반적인 sum
              const total = api
                .column(i)
                .data()
                .reduce(function (a, b) {
                  return intVal(a) + intVal(b);
                }, 0);
              const result = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              if (isNaN(total)) {
                $(api.column(i).footer()).html("-");
              } else {
                $(api.column(i).footer()).html(result);
              }
            }
          }
        },
      });
    } else if (selector === "운송사") {
      $("#admin_calculate_corporate_payment_shipper_datatable").addClass("hidden").removeClass("display");
      $("#admin_calculate_corporate_payment_company_datatable").addClass("display").removeClass("hidden");

      $("#admin_calculate_corporate_payment_company_datatable").DataTable().destroy();
      $("#admin_calculate_corporate_payment_shipper_datatable").DataTable().destroy();
      $("#admin_calculate_corporate_payment_company_datatable").DataTable({
        autoWidth: false,
        lengthChange: false,
        searching: false,
        ordering: false,
        info: false,
        scrollY: "156px",
        scrollX: true,
        paginate: false,

        language: {
          emptyTable: "법인을 선택하세요",
          info: "_TOTAL_",
        },

        // Footer 총계 합산 로직
        footerCallback: function (row, data, start, end, display) {
          const api = this.api();

          // 콤마 없애기
          const intVal = function (i) {
            return typeof i === "string" ? i.replace(/[\,,]/g, "") * 1 : typeof i === "number" ? i : 0;
          };

          for (let i = 1; i <= 15; i++) {
            // 첫번재와 다섯번째는 input의 value값을 받아와야함
            if (i === 1 || i === 5) {
              const total = api
                .column(i)
                .nodes()
                .reduce(function (a, b) {
                  return intVal(a) + intVal($("input", b).val());
                }, 0);
              const result = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              $(api.column(i).footer()).html(result);
            } else {
              // 그 외에는 일반적인 sum
              const total = api
                .column(i)
                .data()
                .reduce(function (a, b) {
                  return intVal(a) + intVal(b);
                }, 0);
              const result = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              if (isNaN(total)) {
                $(api.column(i).footer()).html("-");
              } else {
                $(api.column(i).footer()).html(result);
              }
            }
          }
        },
      });
    }
  });
  // 법인, 사업장 테이블 클릭할때 줄 색상 변경 효과
  $("#admin_calculate_corporate_datatable tbody tr").click(function (e) {
    const target = $(e.currentTarget);
    $("#admin_calculate_corporate_datatable tbody tr").not(target).removeClass("table_background");
    target.toggleClass("table_background");
  });

  $("#admin_calculate_location_datatable tbody tr").click(function (e) {
    const target = $(e.currentTarget);
    $("#admin_calculate_location_datatable tbody tr").not(target).removeClass("table_background");
    target.toggleClass("table_background");
  });



 /* 어드민 채권 현황 페이지 */
  /* admin bond managing page */
  /* admin_bond.html */
  $('.admin_bond_amount').each(function () {
    const bond = $(this).text();
    return bond.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
  });
  
  // 첫 로딩시 datatable - 법인
  $("#admin_bond_corporate_datatable").DataTable({
    lengthChange: false,
    searching: false,
    ordering: false,
    info: true,
    scrollY: "520px",
    scrollX: true,
    language: {
      emptyTable: "데이터가 없습니다.",
      info: "_TOTAL_",
    },
    oLanguage: {
      sInfoEmpty: "0",
    },
    dom: `<".admin_bond_corporate_datatable_title"><".admin_bond_corporate_datatable_sub_title">it`,
  });

  $(".admin_bond_corporate_datatable_title").html(`<span class="admin_bond_corporate_datatable_title noto-medium font-size-14 font-color-deep-black" style="float: left;">법인목록</span>`);
  $(".admin_bond_corporate_datatable_sub_title").html(
    `<span class="admin_bond_corporate_datatable_sub_title noto-regular font-size-14 font-color-grey" style="float: left;">Total : </span>`);


    // 법인, 사업장 chip button display change
  const bondCorporate = $(".value_bond_corporate");
  const bondLocation = $(".value_bond_location");
  const corporateBondTableContainer = $(".admin_bond_corporate_datatable_container");
  const locationBondTableContainer = $(".admin_bond_location_datatable_container");

  bondCorporate.add(bondLocation).on("click", function () {
    $(this).addClass("chip_active").removeClass("chip_default");
    bondCorporate.add(bondLocation).not(this).removeClass("chip_active").addClass("chip_default");

    if (bondCorporate.hasClass("chip_active")) {
      // 법인칩 활성화시
      corporateBondTableContainer.addClass("display").removeClass("hidden");
      locationBondTableContainer.addClass("hidden").removeClass("display");

      // breadcrumbs change
      $(".admin_bond_breadcrumbs_text").text("채권 현황_법인");

      // 법인 테이블 불러오기
      $("#admin_bond_corporate_datatable").DataTable().destroy();
      $("#admin_bond_corporate_datatable").DataTable({
        lengthChange: false,
        searching: false,
        ordering: false,
        info: true,
        scrollY: "520px",
        scrollX: true,
        language: {
          emptyTable: "데이터가 없습니다.",
          info: "_TOTAL_",
        },
        oLanguage: {
          sInfoEmpty: "0",
        },
        dom: `<".admin_bond_corporate_datatable_title"><".admin_bond_corporate_datatable_sub_title">it`,
      });
    
      $(".admin_bond_corporate_datatable_title").html(`<span class="admin_bond_corporate_datatable_title noto-medium font-size-14 font-color-deep-black" style="float: left;">법인목록</span>`);
      $(".admin_bond_corporate_datatable_sub_title").html(
        `<span class="admin_bond_corporate_datatable_sub_title noto-regular font-size-14 font-color-grey" style="float: left;">Total : </span>`);
    
    

    } else if (bondLocation.hasClass("chip_active")) {
      // 사업장칩 활성화시
      corporateBondTableContainer.addClass("hidden").removeClass("display");
      locationBondTableContainer.addClass("display").removeClass("hidden");
      
      // breadcrumbs change
      $(".admin_bond_breadcrumbs_text").text("채권 현황_사업장");

      // 사업장 테이블 불러오기
      // 윗 테이블
      $("#admin_bond_location_datatable").DataTable().destroy();
      $("#admin_bond_location_datatable").DataTable({
        lengthChange: false,
        searching: false,
        ordering: false,
        info: true,
        scrollY: "260px",
        scrollX: false,
        language: {
          emptyTable: "데이터가 없습니다.",
          info: "_TOTAL_",
        },
        oLanguage: {
          sInfoEmpty: "0",
        },
        dom: `<".admin_bond_location_datatable_title"><".admin_bond_location_datatable_sub_title">it`,
      });
    
      $(".admin_bond_location_datatable_title").html(`<span class="admin_bond_location_datatable_title noto-medium font-size-14 font-color-deep-black" style="float: left;">법인목록</span>`);
      $(".admin_bond_location_datatable_sub_title").html(
        `<span class="admin_bond_location_datatable_sub_title noto-regular font-size-14 font-color-grey" style="float: left;">Total : </span>`);
      }
      // 사업장 테이블 불러오기
      // 아랫 테이블
      $("#admin_bond_location_sub_datatable").DataTable().destroy();
      $("#admin_bond_location_sub_datatable").DataTable({
        lengthChange: false,
        searching: false,
        ordering: false,
        info: false,
        scrollY: "156px",
        scrollX: false,
        language: {
          emptyTable: "법인을 선택하세요.",
          info: "_TOTAL_",
        },
        dom: `t`,
      });
  });

  // 사업장 윗 테이블 클릭시 로우 색깔 변경 효과 및 아랫 테이블 데이터 추가 
  $("#admin_bond_location_datatable tbody tr").click(function (e) {
    const target = $(e.currentTarget);
    $("#admin_bond_location_datatable tbody tr").not(target).removeClass("table_background");
    target.toggleClass("table_background");

    // 아랫 테이블 데이터 추가
    // 임시로 넣은 가짜 데이터입니다. datatable 템플릿에 따라서 데이터를 가져오시면 됩니다.
    $("#admin_bond_location_sub_datatable tbody").empty();
    $("#admin_bond_location_sub_datatable tbody").
    prepend(
      `<tr>
        <td>01</td>
        <td>수금완료</td>
        <td>a사업장</td>
        <td>5,000</td>
        <td>1,000,000</td>
        <td>2022-01-31</td>
        <td>001</td>
        <td>2022-01-01 ~ 2022-01-31</td>
        <td>
        <input class="input_width_120" type="date">
        </td>
        <td>
        <input class="admin_bond_number_input input_width_120" type="text">
        </td>
        <td>100,000</td>
      </tr>`

      );
      /*
        $("#admin_bond_location_sub_datatable").DataTable().destroy();
        $("#admin_bond_location_sub_datatable").DataTable({
          lengthChange: false,
          searching: false,
          ordering: false,
          info: false,
          scrollY: "156px",
          scrollX: false,
          language: {
            emptyTable: "법인을 선택하세요.",
            info: "_TOTAL_",
          },
          dom: `t`,
        });
      */
  });

  // 저장 버튼 활성화 기준
  $("#admin_bond_corporate_datatable tbody tr input")
  .add("#admin_bond_location_datatable tbody tr input")
  .add("#admin_bond_location_sub_datatable tbody tr input")
  .on("propertychange change keyup paste input", function () {
    $(".admin_bond_save_btn").addClass("abled_btn_288").removeClass("disabled_btn_288");
  });

  // 법인 테이블 number input only logic
  $(".admin_bond_number_input")
  .on("propertychange change keyup paste input", function () {
    // number input check
    $(this).val(
      $(this)
        .val()
        // 0 ~ 9 까지만 입력
        .replace(/[^0-9]/g, "")
        // 세자리마다 콤마
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    );
  });


  /* 어드민 메뉴 권한 관리 페이지 */
  /* admin menu authorization page */
  /* admin_menu_auth.html */
  // 권한 목록 테이블 (왼쪽)
  $("#admin_menu_auth_datatable").DataTable({
    lengthChange: true,
    lengthMenu: [30, 50, 100],
    searching: false,
    ordering: false,
    info: true,
    scrollY: "624px",
    scrollX: false,
    pagingType: "simple_numbers",
    language: {
      emptyTable: "데이터가 없습니다.",
      lengthMenu: "페이지 당 데이터 건수 _MENU_",
      info: "_TOTAL_",
      paginate: {
        next: ">",
        previous: "<",
      },
    },
    oLanguage: {
      sInfoEmpty: "0",
    },
    dom: `<".admin_menu_auth_datatable_title"><".admin_menu_auth_datatable_sub_title">iltp`,
  });

  $(".admin_menu_auth_datatable_title").html(`<span class="admin_menu_auth_datatable_title noto-medium font-size-14 font-color-deep-black" style="float: left;">권한목록</span>`);
  $(".admin_menu_auth_datatable_sub_title").html(
    `<span class="admin_menu_auth_datatable_sub_title noto-regular font-size-14 font-color-grey" style="float: left;">Total : </span>`
  );

  // 권한별 메뉴 설정 테이블 기본 설정
  if($("#admin_menu_auth_config_table tbody tr").length === 0){
    $("#admin_menu_auth_config_table tbody").prepend("<tr><td colspan='4' style='width: 916px'>권한코드를 선택하세요.</td></tr>");
  };

  // 권한목록 테이블 토글 클릭시 색상 변화 (왼쪽), 권한별 메뉴 내용 display
  $("#admin_menu_auth_datatable tbody tr").click(function (e) {
    const target = $(e.currentTarget);

    /*	<!-- 메뉴 권한 테이블 레이아웃이 확실치 않아 이 상태로 두었습니다. 수정하셔서 사용하면 됩니다. -->
						<!-- 체크박스는 id와 for의 값을 일치시켜 사용하시면 됩니다 --> */
    $("#admin_menu_auth_config_table tbody").empty();
    $("#admin_menu_auth_config_table tbody")
    .prepend(`
      <tr>
        <td rowspan="5">0000000</td>
        <td>메뉴명</td>
        <td>메뉴기능</td>
        <td>
          <input id="admin_menu_auth_1" type="checkbox" />
          <label for="admin_menu_auth_1"></label>
        </td>
      </tr>
      <tr>
        <td rowspan="4">메뉴명</td>
        <td>메뉴기능</td>
        <td>
          <input id="admin_menu_auth_2" type="checkbox" />
          <label for="admin_menu_auth_2"></label>
        </td>
      </tr>
      <tr>
        <td>메뉴기능</td>
        <td>
          <input id="admin_menu_auth_3" type="checkbox" />
          <label for="admin_menu_auth_3"></label>
        </td>
      </tr>
      <tr>
        <td>메뉴기능</td>
        <td>
          <input id="admin_menu_auth_4" type="checkbox" />
          <label for="admin_menu_auth_4"></label>
      </td>
    </tr>
    `);
     $(".admin_menu_auth_config_button").addClass("display").removeClass("hidden");


        
    $("#admin_menu_auth_datatable tbody tr").not(target).removeClass("table_background");
    target.toggleClass("table_background");
  });


});




// ///////////////// company js ///////////////////////
// ///////////////// company js ///////////////////////
// ///////////////// company js ///////////////////////

$(function () {
  // company login
  // submit
  $(".company_login").submit(function (event) {
    event.preventDefault();

    const companyLoginId = $(".company_login_id_input").val();
    const companyLoginPwd = $(".company_login_pwd_input").val();
    const companyLoginResult = $(".company_login_fail");
    const companyLoginFailText = "아이디 및 패스워드를 입력해주세요.";

    if (companyLoginId === "") {
      companyLoginResult.text(companyLoginFailText);
      $(".company_login_id_input").focus();
    } else if (companyLoginPwd === "") {
      companyLoginResult.text(companyLoginFailText);
      $(".company_login_pwd_input").focus();
    } else {
      // 로그인 로직 구현
    }
  });

  /* company join page section 1 */
  /* 운송사 - 회원가입 (1단계) */
  /* company_join_01.html */

  const nextButton = $(".company_join_next_button");
  const checkAll = $("#company_join_checkbox_all");
  const check1 = $("#company_join_checkbox_1");
  const check2 = $("#company_join_checkbox_2");
  const check3 = $("#company_join_checkbox_3");

  checkAll.on("click", function () {
    if (checkAll.is(":checked")) {
      $(check1).add(check2).add(check3).prop("checked", true);
      nextButton.addClass("active").removeClass("default");
    } else {
      $("#company_join_checkbox_1").add("#company_join_checkbox_2").add("#company_join_checkbox_3").prop("checked", false);
      nextButton.addClass("default").removeClass("active");
    }
  });

  check1
    .add(check2)
    .add(check3)
    .on("click", function () {
      if (check1.is(":checked") && check2.is(":checked") && check3.is(":checked")) {
        checkAll.prop("checked", true).addClass("active").removeClass("default");
        nextButton.addClass("active").removeClass("default");
      } else {
        checkAll.prop("checked", false).addClass("default").removeClass("active");
        nextButton.addClass("default").removeClass("active");
      }
    });

  // 약관보기 모달 띄우고 닫기
  $(".company_join_doc_1").click(function () {
    $(".modal_agreement_service_1").fadeIn(200);
    $("#modal_background").fadeIn(200);
    $("body").addClass("no-scroll");
  });

  $(".company_join_doc_2").click(function () {
    $(".modal_agreement_service_2").fadeIn(200);
    $("#modal_background").fadeIn(200);
    $("body").addClass("no-scroll");
  });

  $(".company_join_doc_3").click(function () {
    $(".modal_agreement_service_3").fadeIn(200);
    $("#modal_background").fadeIn(200);
    $("body").addClass("no-scroll");
  });

  $(".modal_agreement_service_btn_1").click(function () {
    $(".modal_agreement_service_1").fadeOut(200);
    $("#modal_background").fadeOut(200);
    $("body").removeClass("no-scroll");
  });

  $(".modal_agreement_service_btn_2").click(function () {
    $(".modal_agreement_service_2").fadeOut(200);
    $("#modal_background").fadeOut(200);
    $("body").removeClass("no-scroll");
  });

  $(".modal_agreement_service_btn_3").click(function () {
    $(".modal_agreement_service_3").fadeOut(200);
    $("#modal_background").fadeOut(200);
    $("body").removeClass("no-scroll");
  });

  /* company join page section 2 */
  /* 운송사 - 회원가입 (2단계) */
  /* company_join_02.html */
  // 아이디, 패스워드 정규표현식은 넣지 않았습니다
  let idCheck = false;
  let pwdCheck = false;
  const idCheckBtn = $(".company_join_id_check_button");
  const joinIdVal = $(".company_join_input_id");
  const idCheckResult = $(".company_join_input_result_id");
  // real-time id check
  $(joinIdVal).on("propertychange change keyup paste input", function () {
    let currentVal = $(this).val();
    if (currentVal !== "") {
      idCheckBtn.prop("disabled", false);
      idCheckBtn.addClass("active").removeClass("default");
      idCheckResult.text("");
      idCheck = false;
    } else {
      idCheckBtn.prop("disabled", true);
      idCheckBtn.addClass("default").removeClass("active");
      idCheck = false;
    }
  });

  // id search logic
  idCheckBtn.on("click", function (event) {
    event.preventDefault();
    // ID 중복 검색, ID 유효성 체크는 이쪽에서 하시면 됩니다.
    idCheckResult.text("사용 가능 계정").css("color", "#039be5");
    idCheck = true;
  });

  // pwd check logic
  const pwdInput = $(".company_join_input_pwd");
  const pwdInputAgain = $(".company_join_input_pwd_again");
  const pwdCheckResult = $(".company_join_input_result_pwd");
  const pwdCheckResultAgain = $(".company_join_input_result_pwd_again");
  $(pwdInput)
    .add(pwdInputAgain)
    .on("property change keyup paste input", function () {
      if (pwdInput.val().length === 0 || pwdInputAgain.val().length === 0) {
        // 패스워드 초기화시
        pwdCheckResult.text("");
        pwdCheckResultAgain.text("");
        pwdCheck = false;
      } else if (pwdInput.val().length >= 6 && pwdInputAgain.val().length >= 6) {
        // 패스워드 입력 글자 6자 이상일때만 작동하도록
        if (pwdInput.val() === pwdInputAgain.val()) {
          pwdCheckResultAgain.text("입력 패스워드 일치").css("color", "#039be5");
          pwdCheck = true;
        } else {
          pwdCheckResultAgain.text("패스워드가 일치하지 않습니다").css("color", "#a72b2a");
          pwdCheck = false;
        }

        // 여기에 패스워드 정규표현식을 써도 좋고 else if 조건 내 스코프를 수정하셔서 쓰셔도 됩니다
      }
    });

  // 다음 버튼 넘어가기 활성화
  $(pwdInput)
    .add(pwdInputAgain)
    .add(idCheckBtn)
    .on("property change keyup click keypress input", function () {
      if (idCheck && pwdCheck) {
        nextButton.attr("disabled", "false").addClass("active").removeClass("default");
      } else {
        nextButton.attr("disabled", "true").addClass("default").removeClass("false");
      }
    });

  /* company join page section 3 */
  /* 운송사 - 회원가입 (3단계) */
  /* company_join_03.html */

  let businessCheck = false;
  let telCheck = false;
  let managerPhoneCheck = false;
  let calculatePhoneCheck = false;

  // 이메일 확인 정규표현식은 넣지 않았습니다.
  // 주소 검색 버튼 클릭
  $(".company_join_search_address").click(function (e) {
    e.preventDefault();
    // 주소 검색 api 여기에 입력
  });

  // 사업자번호 max-length limit & real-time check
  const businessInput1 = $(".company_join_business_number_input_1");
  const businessInput2 = $(".company_join_business_number_input_2");
  const businessInput3 = $(".company_join_business_number_input_3");
  businessInput1.on("propertychange change keyup paste input", function () {
    if ($(this).val().length >= 3) {
      $(this).next().next().focus();
      $(this).val($(this).val().substring(0, 3));
    }
  });
  businessInput2.on("propertychange change keyup paste input", function () {
    if ($(this).val().length >= 2) {
      $(this).next().next().focus();
      $(this).val($(this).val().substring(0, 2));
    }
  });
  businessInput3.on("propertychange change keyup paste input", function () {
    if ($(this).val().length >= 6) {
      $(this).val($(this).val().substring(0, 6));
    }
  });

  $(businessInput1)
    .add(businessInput2)
    .add(businessInput3)
    .on("propertychange change keyup paste input", function (event) {
      // number input check
      $(this).val(
        $(this)
          .val()
          .replace(/[^0-9]/g, "")
      );

      // maxlength check
      if (businessInput1.val().length === 3 && businessInput2.val().length === 2 && businessInput3.val().length === 6) {
        $(".company_join_business_number_check").prop("disabled", false);
        $(".company_join_business_number_check").css("backgroundColor", "#a72b2a");
        // 임시로 넣은 기준입니다. 추후 삭제하고 로직 구현후 사용해주세요
        businessCheck = true;
      } else {
        $(".company_join_business_number_check").prop("disabled", true);
        $(".company_join_business_number_check").css("backgroundColor", "#dddddd");
        // 임시로 넣은 기준입니다. 추후 삭제하고 로직 구현후 사용해주세요
        businessCheck = false;
      }
    });

  // tel, fax real-time check
  const telInput1 = $(".company_join_phone_number_input_1");
  const telInput2 = $(".company_join_phone_number_input_2");
  const telInput3 = $(".company_join_phone_number_input_3");
  const faxInput1 = $(".company_join_fax_number_1");
  const faxInput2 = $(".company_join_fax_number_2");
  const faxInput3 = $(".company_join_fax_number_3");
  const managerPhoneInput1 = $(".company_join_manager_phone_number_1");
  const managerPhoneInput2 = $(".company_join_manager_phone_number_2");
  const managerPhoneInput3 = $(".company_join_manager_phone_number_3");
  const calculatePhoneInput1 = $(".company_join_calculate_phone_number_1");
  const calculatePhoneInput2 = $(".company_join_calculate_phone_number_2");
  const calculatePhoneInput3 = $(".company_join_calculate_phone_number_3");
  $(telInput1)
    .add(telInput2)
    .add(telInput3)
    .add(faxInput1)
    .add(faxInput2)
    .add(faxInput3)
    .add(managerPhoneInput1)
    .add(managerPhoneInput2)
    .add(managerPhoneInput3)
    .add(calculatePhoneInput1)
    .add(calculatePhoneInput2)
    .add(calculatePhoneInput3)
    .on("propertychange change keyup paste input", function () {
      // number input check
      $(this).val(
        $(this)
          .val()
          .replace(/[^0-9]/g, "")
      );

      // maxlength check
      if ($(this).val().length >= $(this).prop("maxlength")) {
        if ($(this).prop("maxlength") === 3) {
          $(this).next().next().focus();
          $(this).val($(this).val().substring(0, 3));
        } else if ($(this).prop("maxlength") === 4) {
          $(this).next().next().focus();
          $(this).val($(this).val().substring(0, 4));
        }
      }
    });

  /* 임시로 넣은 다음버튼 활성화 로직입니다. 활성화 로직을 따로 작성하신다면 삭제하셔도 무방합니다. */
  let telCheck1,
    telCheck2,
    telCheck3 = false;
  $(telInput1)
    .add(telInput2)
    .add(telInput3)
    .on("propertychange change keyup paste input", function () {
      if (telInput1.val().length === 2 || telInput1.val().length === 3) {
        telCheck1 = true;
      } else {
        telCheck1 = false;
      }
      if (telInput2.val().length === 3 || telInput2.val().length === 4) {
        telCheck2 = true;
      } else {
        telCheck2 = false;
      }
      if (telInput3.val().length === 4) {
        telCheck3 = true;
      } else {
        telCheck3 = false;
      }

      if (telCheck1 && telCheck2 && telCheck3) {
        telCheck = true;
      } else {
        telCheck = false;
      }
    });

  let managerPhoneCheck1,
    managerPhoneCheck2,
    managerPhoneCheck3 = false;
  $(managerPhoneInput1)
    .add(managerPhoneInput2)
    .add(managerPhoneInput3)
    .on("propertychange change keyup paste input", function () {
      if (managerPhoneInput1.val().length === 3) {
        managerPhoneCheck1 = true;
      } else {
        managerPhoneCheck1 = false;
      }
      if (managerPhoneInput2.val().length === 3 || managerPhoneInput2.val().length === 4) {
        managerPhoneCheck2 = true;
      } else {
        managerPhoneCheck2 = false;
      }
      if (managerPhoneInput3.val().length === 4) {
        managerPhoneCheck3 = true;
      } else {
        managerPhoneCheck3 = false;
      }

      if (managerPhoneCheck1 && managerPhoneCheck2 && managerPhoneCheck3) {
        managerPhoneCheck = true;
      } else {
        managerPhoneCheck = false;
      }
    });

  let calculatePhoneCheck1,
    calculatePhoneCheck2,
    calculatePhoneCheck3 = false;
  $(calculatePhoneInput1)
    .add(calculatePhoneInput2)
    .add(calculatePhoneInput3)
    .on("propertychange change keyup paste input", function () {
      if (calculatePhoneInput1.val().length === 3) {
        calculatePhoneCheck1 = true;
      } else {
        calculatePhoneCheck1 = false;
      }
      if (calculatePhoneInput2.val().length === 3 || calculatePhoneInput2.val().length === 4) {
        calculatePhoneCheck2 = true;
      } else {
        calculatePhoneCheck2 = false;
      }
      if (calculatePhoneInput3.val().length === 4) {
        calculatePhoneCheck3 = true;
      } else {
        calculatePhoneCheck3 = false;
      }

      if (calculatePhoneCheck1 && calculatePhoneCheck2 && calculatePhoneCheck3) {
        calculatePhoneCheck = true;
      } else {
        calculatePhoneCheck = false;
      }
    });

  const companyInput = $(".company_join_input_corp");
  // const locationInput = $(".company_join_input_location");
  const companyEmailInput = $(".company_join_input_email");
  const companyRepresentInput = $(".company_join_input_represent");
  const companyManagerInput = $(".company_join_input_manager");
  const companyManagerEmailInput = $(".company_join_input_manager_email");
  const companyCalculateInput = $(".company_join_input_calculate");
  const companyCalculateEmailInput = $(".company_join_input_calculate_email");

  $(telInput1)
    .add(telInput2)
    .add(telInput3)
    .add(managerPhoneInput1)
    .add(managerPhoneInput2)
    .add(managerPhoneInput3)
    .add(calculatePhoneInput1)
    .add(calculatePhoneInput2)
    .add(calculatePhoneInput3)
    .add(companyInput)
    .add(companyEmailInput)
    .add(companyRepresentInput)
    .add(companyManagerInput)
    .add(companyManagerEmailInput)
    .add(companyCalculateInput)
    .add(companyCalculateEmailInput)
    .on("propertychange change keyup paste input", function () {
      if (
        companyInput.val().length >= 1 &&
        companyEmailInput.val().length >= 1 &&
        companyRepresentInput.val().length >= 1 &&
        companyManagerInput.val().length >= 1 &&
        companyManagerEmailInput.val().length >= 1 &&
        companyCalculateInput.val().length >= 1 &&
        companyCalculateEmailInput.val().length >= 1 &&
        calculatePhoneCheck &&
        managerPhoneCheck &&
        businessCheck &&
        telCheck
      ) {
        nextButton.attr("disabled", "false").addClass("active").removeClass("default");
      } else {
        nextButton.attr("disabled", "true").addClass("default").removeClass("false");
      }
    });

  /* company join page section 4 */
  /* 운송사 - 회원가입 (4단계) */
  /* company_join_04.html */

  // uploaded file name display
  $("#ex_file1").change(function () {
    if ($(this).get(0).files.length !== 0) {
      const file = $("#ex_file1")[0].files[0].name;
      $(this).next("span").text(file);
    }
  });
  $("#ex_file2").change(function () {
    if ($(this).get(0).files.length !== 0) {
      const file = $("#ex_file2")[0].files[0].name;
      $(this).next("span").text(file);
    }
  });
  $("#ex_file3").change(function () {
    if ($(this).get(0).files.length !== 0) {
      const file = $("#ex_file3")[0].files[0].name;
      $(this).next("span").text(file);
    }
  });

  // join button active logic
  $("#ex_file1")
    .add("#ex_file2")
    .add("#ex_file3")
    .change(function () {
      if ($("#ex_file1").get(0).files.length !== 0) {
        if ($("#ex_file2").get(0).files.length !== 0 || $("#ex_file3").get(0).files.length !== 0) {
          $(".company_join_next_button").removeClass("default").addClass("active").attr("disabled", false);
        }
      }
    });

  /* 오더 관리 사이드 메뉴 - 운송사 */
  /* company side slide paging */
  /* company_order.html */
  $("#company_fav_car_datatable").DataTable({
    scrollY: "312px",
    scrollX: false,
    searching: false,
    lengthChange: false,
    info: true,
    paginate: false,

    language: {
      emptyTable: "데이터가 없습니다.",
      lengthMenu: "페이지당 데이터 건수 _MENU_",
      info: "_TOTAL_",
      zeroRecords: "해당 검색 데이터가 없습니다.",
    },

    oLanguage: {
      sInfoEmpty: "0",
    },

    // DOM custom for button, menu
    dom: `<".company_fav_car_total_title"><".company_fav_car_total_sub_title"><".company_fav_car_add_button">ilt`,
  });
  $(".company_fav_car_total_title").html(`<span class="company_fav_car_total_title noto-medium font-size-14 font-color-deep-black" style="float: left;">차량 즐겨찾기</span>`);
  $(".company_fav_car_total_sub_title").html(`<span class="company_fav_car_total_sub_title noto-regular font-size-14 font-color-grey" style="float: left;">Total : </span>`);
  $(".company_fav_car_add_button").html(`<button class="abled_btn_160" class="company_fav_car_add_button" style="float: right;">차량 즐겨찾기 추가</button>`);

  $("#company_fav_shipper_datatable").DataTable({
    scrollY: "156px",
    scrollX: false,
    searching: false,
    lengthChange: false,
    info: true,
    paginate: false,

    language: {
      emptyTable: "데이터가 없습니다.",
      lengthMenu: "페이지당 데이터 건수 _MENU_",
      info: "_TOTAL_",
      zeroRecords: "해당 검색 데이터가 없습니다.",
    },

    oLanguage: {
      sInfoEmpty: "0",
    },

    // DOM custom for button, menu
    dom: `<".company_fav_shipper_total_title"><".company_fav_shipper_total_sub_title"><".company_fav_shipper_add_button">ilt`,
  });
  $(".company_fav_shipper_total_title").html(`<span class="company_fav_shipper_total_title noto-medium font-size-14 font-color-deep-black" style="float: left;">운송사 즐겨찾기</span>`);
  $(".company_fav_shipper_total_sub_title").html(`<span class="company_fav_datatable_total_sub_title noto-regular font-size-14 font-color-grey" style="float: left;">Total : </span>`);
  $(".company_fav_shipper_add_button").html(`<button class="abled_btn_160" class="company_fav_shipper_add_button" style="float: right;">운송사 즐겨찾기 추가</button>`);


  // 상태에 따른 텍스트 색깔 변화
  const favVehicleStatus = $("#company_fav_car_datatable tbody tr td:first-child");
  $(favVehicleStatus).each(function () {
    const status = $(this).text();
    if (status === "운행") $(this).addClass("font-color-blue font-medium font-size-14");
    if (status === "종료") $(this).addClass("font-color-grey font-medium font-size-14");
  });

  const favVehicleAffiliation = $("#company_fav_car_datatable tbody tr td:nth-child(2) div:first-child")
  $(favVehicleAffiliation).each(function () {
    const status = $(this).text();
    if (status === "소속차량") $(this).addClass("font-color-blue font-medium font-size-14");
    else $(this).addClass("font-color-black font-medium font-size-14");
  });    

  $("#company_fav_car_datatable tbody tr td:nth-child(2) div:nth-child(2) ul span").addClass("font-regular font-color-black");

  const favVehicleComment = $("#company_fav_car_datatable tbody tr td:nth-child(2) div:last-child")
  $(favVehicleComment).each(function () {
    const status = $(this).text();
    if (status !== "-") $(this).addClass("font-medium font-color-deep-black font-size-14");
  });


  /* company favorite list */
  /* 운송사 - 즐겨찾기 관리 */
  /* company favorite list */
  // button&table inactive/active
  const companyFavBtn = $(".value_fav_company");
  const workerFavBtn = $(".value_fav_worker");
  const locationFavBtn = $(".value_fav_location");

  const companyFavSearchDiv = $(".company_fav_search_company_container");
  const workerFavSearchDiv = $(".company_fav_search_worker_container");
  const locationFavSearchDiv = $(".company_fav_search_location_container");

  const companyFavTable = $(".company_fav_table_company");
  const workerFavTable = $(".company_fav_table_worker");
  const locationFavTable = $(".company_fav_table_location");

  /* 즐겨찾기 페이지 데이터테이블 첫 실행 (운송사) */
  $("#company_fav_datatable_company").DataTable({
    scrollY: "520px",
    scrollX: false,
    searching: false,
    lengthChange: true,
    lengthMenu: [30, 50, 100],
    info: true,
    pagingType: "simple_numbers",

    language: {
      emptyTable: "데이터가 없습니다.",
      lengthMenu: "페이지당 데이터 건수 _MENU_",
      info: "_TOTAL_",
      zeroRecords: "해당 검색 데이터가 없습니다.",
      paginate: {
        next: ">",
        previous: "<",
      },
    },
    oLanguage: {
      sInfoEmpty: "0",
    },

    /* DOM custom for button, menu */
    dom: `<".company_fav_datatable_total_title"><".company_fav_datatable_total_sub_title"><".company_fav_data_add_button_company">iltp`,
  });

  $(".company_fav_datatable_total_title").html(`<span class="company_fav_datatable_total_title noto-medium font-size-14 font-color-deep-black" style="float: left;">등록정보</span>`);
  $(".company_fav_datatable_total_sub_title").html(`<span class="company_fav_datatable_total_sub_title noto-regular font-size-14 font-color-grey" style="float: left;">Total : </span>`);
  $(".company_fav_data_add_button_company").html(`<button class="abled_btn_120" class="company_fav_data_add_button_company" style="float: right;">추가</button>`);

  /* 칩 클릭에 따라 구분 칩 변경, 테이블 가져오기 */
  $(companyFavBtn)
    .add(workerFavBtn)
    .add(locationFavBtn)
    .on("click", function () {
      $(this).addClass("chip_active").removeClass("chip_default");
      companyFavBtn.add(workerFavBtn).add(locationFavBtn).not(this).removeClass("chip_active").addClass("chip_default");

      if (companyFavBtn.hasClass("chip_active")) {
        companyFavSearchDiv.addClass("display").removeClass("hidden");
        companyFavTable.addClass("display").removeClass("hidden");
        workerFavSearchDiv.add(locationFavSearchDiv).addClass("hidden").removeClass("display");
        workerFavTable.add(locationFavTable).addClass("hidden").removeClass("display");

        // breadcrumbs update
        $(".company_fav_breadcrumbs_text").text("즐겨찾기 관리_운송사");

        // 운송사 datatable load
        $("#company_fav_datatable_company").DataTable().destroy();
        $("#company_fav_datatable_company").DataTable({
          searching: false,
          scrollX: false,
          scrollY: "520px",
          lengthChange: true,
          lengthMenu: [30, 50, 100],
          info: true,
          pagingType: "simple_numbers",
          language: {
            emptyTable: "데이터가 없습니다.",
            lengthMenu: "페이지당 데이터 건수 _MENU_",
            info: "_TOTAL_",
            zeroRecords: "해당 검색 데이터가 없습니다.",
            paginate: {
              next: ">",
              previous: "<",
            },
          },
          oLanguage: {
            sInfoEmpty: "0",
          },
          /* DOM custom for button, menu */
          dom: `<".company_fav_datatable_total_title"><".company_fav_datatable_total_sub_title"><".company_fav_data_add_button_company">iltp`,
        });

        $(".company_fav_datatable_total_title").html(`<span class="company_fav_datatable_total_title noto-medium font-size-14 font-color-deep-black" style="float: left;">등록정보</span>`);
        $(".company_fav_datatable_total_sub_title").html(`<span class="company_fav_datatable_total_sub_title noto-regular font-size-14 font-color-grey" style="float: left;">Total : </span>`);
        $(".company_fav_data_add_button_company").html(`<button class="company_fav_data_add_button_company abled_btn_120" style="float: right;">추가</button>`);
        $.fn.DataTable.ext.pager.numbers_length = 5;
      } else if (workerFavBtn.hasClass("chip_active")) {
        workerFavSearchDiv.addClass("display").removeClass("hidden");
        workerFavTable.addClass("display").removeClass("hidden");
        companyFavSearchDiv.add(locationFavSearchDiv).addClass("hidden").removeClass("display");
        companyFavTable.add(locationFavTable).addClass("hidden").removeClass("display");

        // breadcrumbs update
        $(".company_fav_breadcrumbs_text").text("즐겨찾기 관리_기사");

        // 운송사 datatable load
        $("#company_fav_datatable_worker").DataTable().destroy();
        $("#company_fav_datatable_worker").DataTable({
          searching: false,
          scrollX: false,
          scrollY: "520px",
          lengthChange: true,
          lengthMenu: [30, 50, 100],
          info: true,
          pagingType: "simple_numbers",
          language: {
            emptyTable: "데이터가 없습니다.",
            lengthMenu: "페이지당 데이터 건수 _MENU_",
            info: "_TOTAL_",
            zeroRecords: "해당 검색 데이터가 없습니다.",
            paginate: {
              next: ">",
              previous: "<",
            },
          },
          oLanguage: {
            sInfoEmpty: "0",
          },
          /* DOM custom for button, menu */
          dom: `<".company_fav_datatable_total_title"><".company_fav_datatable_total_sub_title"><".company_fav_data_add_button_worker">iltp`,
        });

        $(".company_fav_datatable_total_title").html(`<span class="company_fav_datatable_total_title noto-medium font-size-14 font-color-deep-black" style="float: left;">등록정보</span>`);
        $(".company_fav_datatable_total_sub_title").html(`<span class="company_fav_datatable_total_sub_title noto-regular font-size-14 font-color-grey" style="float: left;">Total : </span>`);
        $(".company_fav_data_add_button_worker").html(`<button class="company_fav_data_add_button_worker abled_btn_120" style="float: right;">추가</button>`);
      } else if (locationFavBtn.hasClass("chip_active")) {
        locationFavSearchDiv.addClass("display").removeClass("hidden");
        locationFavTable.addClass("display").removeClass("hidden");
        companyFavSearchDiv.add(workerFavSearchDiv).addClass("hidden").removeClass("display");
        companyFavTable.add(workerFavTable).addClass("hidden").removeClass("display");

        // breadcrumbs update
        $(".company_fav_breadcrumbs_text").text("즐겨찾기 관리_상하차지");

        // 운송사 datatable load
        $("#company_fav_datatable_location").DataTable().destroy();
        $("#company_fav_datatable_location").DataTable({
          searching: false,
          scrollX: false,
          scrollY: "520px",
          lengthChange: true,
          lengthMenu: [30, 50, 100],
          info: true,
          pagingType: "simple_numbers",
          language: {
            emptyTable: "데이터가 없습니다.",
            lengthMenu: "페이지당 데이터 건수 _MENU_",
            info: "_TOTAL_",
            zeroRecords: "해당 검색 데이터가 없습니다.",
            paginate: {
              next: ">",
              previous: "<",
            },
          },
          oLanguage: {
            sInfoEmpty: "0",
          },
          dom: `<".company_fav_datatable_total_title"><".company_fav_datatable_total_sub_title"><".company_fav_data_add_button_location">iltp`,
        });

        $(".company_fav_datatable_total_title").html(`<span class="company_fav_datatable_total_title noto-medium font-size-14 font-color-deep-black" style="float: left;">등록정보</span>`);
        $(".company_fav_datatable_total_sub_title").html(`<span class="company_fav_datatable_total_sub_title noto-regular font-size-14 font-color-grey" style="float: left;">Total : </span>`);
        $(".company_fav_data_add_button_location").html(`<button class="company_fav_data_add_button_location abled_btn_120" style="float: right;">추가</=>`);
      }
    });

/* company notification managing */
/* 운송사 - 알림 사용료 관리 */
/* company_notify.html */

$(".notify_table tbody tr td input").change(function () {
  $(".notify_save_container button").addClass("abled_btn_288").removeClass("disabled_btn_288");
});
});

/* vehicle control page */
/* 차량 관제 페이지 */
/* vehicle_control.html */

$(function () {
  const vehicleTable = $("#vehicle_table").DataTable({
    scrollY: 720,
    scrollX: false,
    lengthChange: false,
    // 검색 기능 활성화, dom에서 없애기
    searching: true,
    // 정렬 기능 숨기기
    ordering: false,
    // 정보 표시 숨기기
    info: false,
    // 페이징 기능 숨기기
    paging: false,

    language: {
      emptyTable: "데이터가 없습니다.",
    },
    dom: `t`,
  });

  // 상태 버튼에 따라 데이터테이블 정렬해주는 기능
  $(".vehicle_filter_run_btn")
  .add(".vehicle_filter_end_btn")
  .add(".vehicle_filter_accident_btn")
  .on("click", function () {
    const status = $(this).children("span").text();
    vehicleTable.column(0).search(status).draw();
  });
  $(".vehicle_filter_all_btn").on("click", function () {
    vehicleTable.column(0).search("").draw();
  });



  // 차량관제 테이블 왼쪽 테두리 색깔 설정

  const tableStatus = $(".vehicle_control_container .vehicle_control_content .vehicle_table_container table.dataTable tbody tr td:first-child");
  $(tableStatus).each(function () {
    const textStatus = $(this).text();
    if (textStatus == "운행") {
      $(this).css({ borderLeft: "solid 4px #039BE5" }).addClass("font-medium font-color-blue font-size-14");
    } else if (textStatus == "종료") {
      $(this).css({ borderLeft: "solid 4px #BBBBBB" }).addClass("font-medium font-color-grey font-size-14");;
    } else if (textStatus == "사고") {
      $(this).css({ borderLeft: "solid 4px #A72B2A" }).addClass("font-medium font-color-red font-size-14");;
    } else if (textStatus == "전체") {
      $(this).css({ borderLeft: "solid 4px #FF9E22" });
    }
  });

  // 차량 status에 따른 지도 아래의 table 변환
  $("#vehicle_table tbody tr").click(function () {
    let statusText = $(this).children("td:nth-child(2)").children().children("div:nth-child(1)").children().children().text();
    let status = statusText.substring(0, 3);
    if (status === "-" || status === "운송대") {
      $("#map").css("height", "718px");
      $(".vehicle_control_info").addClass("display").removeClass("hidden");
      $("#vehicle_control_info_upper_wrapper").addClass("hidden").removeClass("display");
      $("#vehicle_control_info_lower_1").addClass("display").removeClass("hidden");
      $("#vehicle_control_info_lower_2").addClass("hidden").removeClass("display");
    } else if (status === "입차전") {
      $("#map").css("height", "502px");
      $(".vehicle_control_info").addClass("display");
      $(".vehicle_control_info").addClass("display").removeClass("hidden");
      $("#vehicle_control_info_upper_wrapper").addClass("display").removeClass("hidden");
      $(".vehicle_control_table_buttons").children("button:nth-child(1)").addClass("hidden").removeClass("display");
      $("#vehicle_control_info_lower_1").addClass("hidden").removeClass("display");
      $("#vehicle_control_info_lower_2").addClass("display").removeClass("hidden");
    } else if (status === "운송중") {
      $("#map").css("height", "502px");
      $(".vehicle_control_info").addClass("display").removeClass("hidden");
      $("#vehicle_control_info_upper_wrapper").addClass("display").removeClass("hidden");
      $(".vehicle_control_table_buttons").children("button:nth-child(1)").addClass("display").removeClass("hidden");
      $("#vehicle_control_info_lower_1").addClass("hidden").removeClass("display");
      $("#vehicle_control_info_lower_2").addClass("display").removeClass("hidden");
    }
  });

  // 차량 관제 텍스트 색깔 설정
  const tableCarStatus = $(".vehicle_control_container .vehicle_control_content .vehicle_table_container table.dataTable tbody tr td:nth-child(2) .vehicle_table_info div:first-child");
  const tableCarComment = $(".vehicle_control_container .vehicle_control_content .vehicle_table_container table.dataTable tbody tr td:nth-child(2) .vehicle_table_info div:last-child");
  $(tableCarStatus).add(tableCarComment).each(function () {
    const status = $(this).text();
    if (status !== "-") $(this).addClass("font-medium font-color-deep-black font-size 14");
    else $(this).addClass("font-medium font-color-grey"); 
  });

  $("#vehicle_table tbody tr").click(function (e) {
    const target = $(e.currentTarget);
    $("#vehicle_table tbody tr").not(target).removeClass("table_background");
    target.toggleClass("table_background");
  });


  // 차량 관제 모달
  // 차량 관제 모달
  // 차량 관제 모달

  $("#vehicle_control_info_upper").DataTable({
    scrollY: 180,
    scrollX: false,
    lengthChange: false,
    // 검색 기능 숨기기
    searching: false,
    // 정렬 기능 숨기기
    ordering: false,
    // 정보 표시 숨기기
    info: false,
    // 페이징 기능 숨기기
    paging: false,

    language: {
      emptyTable: "데이터가 없습니다.",
    },
  });

});




$(function () {
  let customerRegistration1 = false;
  let customerRegistration2 = false;

  function customerRegistrationImgUpload(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $(".customer_registration_img_area").attr("src", e.target.result).parent().css({ display: "flex" }).removeClass("hidden");
        customerRegistration2 = true;
        // 이미지 삭제 기능
        $(".customer_registration_img_view_area div img:first-child").click(function (e) {
          $(this).parent().addClass("hidden");
          customerRegistration2 = false;
          customerRegistrationBtnHandler();
        });
        customerRegistrationBtnHandler();
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  $("#customer_registration_img_upload").on("change", function () {
    customerRegistrationImgUpload(this);
  });

  const customerRegistrationInput = $(".customer_registration_input");
  $(customerRegistrationInput).on("propertychange change keyup paste input", function () {
    if (customerRegistrationInput.val().length >= 1) {
      customerRegistration1 = true;
    } else {
      customerRegistration1 = false;
    }
    customerRegistrationBtnHandler();
  });

  // 필수요소 input 과 이미지가 있을경우 버튼 활성화
  function customerRegistrationBtnHandler() {
    if (customerRegistration1 == true && customerRegistration2 == true) {
      $(".customer_registration_btn").addClass("abled_btn_288").removeClass("disabled_btn_288").attr("disabled", false);
    } else {
      $(".customer_registration_btn").removeClass("abled_btn_288").addClass("disabled_btn_288").attr("disabled", true);
    }
  }
});
