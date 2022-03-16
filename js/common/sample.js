$(function () {
  $("select").niceSelect();

  // 모달창 오픈 버튼 클릭시
  $(".open_modal").click(function () {
    // 기본 display:none 에서 fadeIn으로 보이게끔 설정
    $("#modal_background").fadeIn(200);
    $(".modal").fadeIn(200);
    // 모달 뒷배경
    // 모달을 제외하고 스크롤이 안되게 설정
    $("body").addClass("no-scroll");
  });
  // 모달 닫기 버튼 클릭시
  $(".modal_header_close").click(function () {
    // 모달 등록 중 이탈 시 의사결정 모달

    $(".modal_devision").fadeIn(200);
    $(".modal").fadeOut(200);

    // 취소 클릭 시 다시 작성중인 모달로 돌아가기
    $(".modal_order_register_back").click(function () {
      $(".modal").fadeIn(200);
      $(".modal_devision").fadeOut(200);
    });
    // 등록 취소 클릭 시
    $(".modal_order_register_end").click(function () {
      $(".modal").fadeOut(200);
      $(".modal_devision").fadeOut(200);
      $("#modal_background").fadeOut(200);
      // 모달을 완전히 닫았을 경우 input 값 초기화
      $(".modal_order_register input").val("");
      // 작성이 되었을때 버튼활성화 되었던걸 다시 비활성화
      $(".modal_order_register_btn").attr("id", "disabled_btn_288").attr("disabled", true);
      $("body").removeClass("no-scroll");
    });
  });

  // input[type=date] default 오늘 날짜로 설정

  const today = new Date();
  const todayCurrentDate = today.getFullYear() + "-" + ("00" + (today.getMonth() + 1)).toString().slice(-2) + "-" + ("00" + today.getDate()).toString().slice(-2);
  $("input[type=date]").attr("value", todayCurrentDate);
});

// 기본 모달
// 기본 모달
$(function () {
  // 사용자 ID
  // 사용자 ID
  // 판토스가 입력될 경우 사용 가능 계정
  // 그 외엔 사용 불가 계정
  const checkIdBtn = $(".id_check_btn");
  const checkIdInput = $(".check_ID_input");
  const abeldId = $(".abled_id");
  const disableId = $(".disabled_id");
  let toggleCheckId = false;

  checkIdBtn.on("click", function (e) {
    e.preventDefault();
    if (checkIdInput.val() == "판토스") {
      disableId.css({ display: "none" });
      abeldId.css({ display: "block" });
      toggleCheckId = true;
    } else if (checkIdInput.val() != "판토스") {
      abeldId.css({ display: "none" });
      disableId.css({ display: "block" });
      toggleCheckId = false;
    }
  });

  // 사용자 PW
  // 사용자 PW
  // 사용자 PW
  const customerPW = $(".customer_PW");
  const PWCheck = $(".customer_PW_check");
  const customerPWComplete = $(".customer_PW_complete_dialog");
  const PWcheckComplete = $(".pw_check_dialog");
  const PWcheckError = $(".pw_error_dialog");

  $(customerPW)
    .add(PWCheck)
    .on("keyup", function () {
      if (customerPW.val().length >= 6) {
        customerPWComplete.show();
      } else {
        customerPWComplete.hide();
      }
      if (customerPW.val() == PWCheck.val() && PWCheck.val().length >= 6) {
        PWcheckError.hide();
        PWcheckComplete.show();
      } else if (customerPW.val() != PWCheck.val() && PWCheck.val().length >= 6) {
        PWcheckComplete.hide();
        PWcheckError.show();
      } else {
        PWcheckComplete.hide();
        PWcheckError.hide();
      }
    });

  // 체크박스 설정
  // 체크박스 설정
  // 체크박스 설정

  const sampleCheckAll = $("#sample_check_all");
  const sampleCheck1 = $("#sample_check_1");
  const sampleCheck2 = $("#sample_check_2");

  $(sampleCheckAll).on("click", function () {
    if (sampleCheckAll.is(":checked")) {
      $(sampleCheck1).add(sampleCheck2).prop("checked", true);
    } else {
      $(sampleCheck1).add(sampleCheck2).prop("checked", false);
    }
  });

  sampleCheckAll
    .add(sampleCheck1)
    .add(sampleCheck2)
    .on("click", function () {
      if (sampleCheck1.is(":checked") && sampleCheck2.is(":checked")) {
        sampleCheckAll.prop("checked", true);
      } else {
        sampleCheckAll.prop("checked", false);
      }
    });

  // 이미지 업로드 (파일 한개)
  // 이미지 업로드 (파일 한개)
  // 이미지 업로드 (파일 한개)

  // function singleImgUpload(input) {
  //   if (input.files && input.files[0]) {
  //     let reader = new FileReader();

  //     reader.onload = function (e) {
  //       // 이미지 경로가 들어갈 img태그의 클래스 & ID
  //       $(".img_single_area").attr("src", e.target.result);
  //     };
  //     reader.readAsDataURL(input.files[0]);
  //     // 이미지 경로가 들어갈 img태그의 클래스 & ID
  //     $(".img_single_view_area").css({ display: "block" });
  //   }
  // }
  // // 이미지 업로드 버튼 클릭시
  // $("#img_single_upload").change(function () {
  //   singleImgUpload(this);
  // });

  // 이미지 업로드 (파일 여러개)
  // 이미지 업로드 (파일 여러개)
  // 이미지 업로드 (파일 여러개)

  let ImgCount = 0;
  let ImgDeleteCount = 0;
  function multipleImgUpload(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        const closeSrc = "./images/icons/img_close_icon.svg";
        const img_radio = "<input type=" + "radio" + " id=" + "img_radio" + " name=" + "img_choise" + " value=" + "img" + "/>";
        const img_radio_label = "<label for=" + "img_radio" + "><span></span>대표이미지</label>";

        $(".img_multiple_view_area").append("<div><img class=" + "img_delete_btn" + ImgDeleteCount + " src=" + closeSrc + "><img src=" + e.target.result + "></div>");
        ImgDeleteCount++;

        // 이미지 삭제 기능
        $(".img_multiple_view_area div").append(img_radio);
        $(".img_multiple_view_area div img:first-child").click(function (e) {
          $(this).parent().remove();
          // console.log($(".img_delete_btn").parent().remove());
        });

        $(".img_multiple_view_area div:last-child")
          .append(img_radio_label)
          .find("input:radio, label")
          .each(function (index, attr) {
            $(this).attr("id", $(this).attr("id") + ImgCount);
            $(this).attr("for", $(this).attr("for") + ImgCount);
          });
      };
      reader.readAsDataURL(input.files[0]);
      ImgCount++;
    }
  }

  $("#img_multiple_upload").on("change", function () {
    multipleImgUpload(this);
  });

  // 도착 요청 일시 분 - 60분 미만으로 제한
  $(".limit_minute").on("propertychange change keyup paste input", function () {
    if ($(this).val() >= 59) {
      $(this).val(59);
    }
  });

  // 사업자번호 첫번째 인풋 3글자 입력 시 다음 input으로 focus
  // 두번째 인풋 2글자 입력 시 다음 input으로 focus

  const businessNumber1 = $(".business_number1");
  const businessNumber2 = $(".business_number2");
  const businessNumber3 = $(".business_number3");
  const businessNumberBtn = $(".business_number_btn");
  const abledBusinessNumber = $(".abled_business_number");
  const disabledBusinessNumber = $(".disabled_business_number");
  $(businessNumber1)
    .add(businessNumber2)
    .add(businessNumber3)
    .on("propertychange change keyup paste input", function () {
      if (businessNumber1.val().length >= 3) {
        businessNumber2.focus();
      }
      if (businessNumber2.val().length >= 2) {
        businessNumber3.focus();
      }
      if (businessNumber1.val().length >= 3 && businessNumber2.val().length >= 2 && businessNumber3.val().length >= 6) {
        businessNumberBtn.addClass("abled_btn_120").removeClass("disabled_btn_120").attr("disabled", false);
      } else {
        businessNumberBtn.addClass("disabled_btn_120").removeClass("abled_btn_120").attr("disabled", true);
      }
      $(businessNumberBtn).on("click", function (e) {
        e.preventDefault();
        if (businessNumber1.val().length >= 3 && businessNumber2.val().length >= 2 && businessNumber3.val().length >= 6) {
          abledBusinessNumber.show();
          disabledBusinessNumber.hide();
        } else {
          abledBusinessNumber.hide();
          disabledBusinessNumber.show();
        }
      });
    });

  // 연락처 첫번째 인풋 3글자 입력 시 다음 input으로 focus
  // 두번째 인풋 4글자 입력 시 다음 input으로 focus

  const phoneNumber1 = $(".phone_number1");
  const phoneNumber2 = $(".phone_number2");
  const phoneNumber3 = $(".phone_number3");
  $(phoneNumber1)
    .add(phoneNumber2)
    .add(phoneNumber3)
    .on("propertychange change keyup paste input", function () {
      if (phoneNumber1.val().length >= 3) {
        phoneNumber2.focus();
      }
      if (phoneNumber2.val().length >= 4) {
        phoneNumber3.focus();
      }
    });

  // 상차지 담당자 정보 연락처 자동 포커스
  // 상차지 담당자 정보 연락처 자동 포커스
  const loadingNumber1 = $(".loading_number1");
  const loadingNumber2 = $(".loading_number2");
  const loadingNumber3 = $(".loading_number3");
  $(loadingNumber1)
    .add(loadingNumber2)
    .add(loadingNumber3)
    .on("propertychange change keyup paste input", function () {
      if (loadingNumber1.val().length >= 3) {
        loadingNumber2.focus();
      }
      if (loadingNumber2.val().length >= 4) {
        loadingNumber3.focus();
      }
    });

  // 기본모달 끝
  // 기본모달 끝
});

// 샘플 모달 탭
// 샘플 모달 탭
// 샘플 모달 탭

$(function () {
  // 탭 다음 단계로 넘어가기

  // 각 탭마다 맨 위에 있는 input 에 한글자라도 작성되면
  // 버튼 활성화 되어 다음 단계로 넘어갈 수 있게끔 설정

  const nextBtn1 = $(".next_btn_1");
  const nextBtn2 = $(".next_btn_2");
  const nextBtn3 = $(".next_btn_3");
  const nextBtn4 = $(".next_btn_4");
  const nextBtn5 = $(".next_btn_5");
  const necessaryInput1 = $(".necessary_input1");
  const necessaryInput2 = $(".necessary_input2");
  const necessaryInput3 = $(".necessary_input3");
  const necessaryInput4 = $(".necessary_input4");
  const necessaryInput5 = $(".necessary_input5");
  $(necessaryInput1).on("propertychange change keyup paste input", function () {
    if (necessaryInput1.val().length >= 1) {
      $(".next_btn_1").addClass("abled_btn_132").removeClass("disabled_btn_132").attr("disabled", false);
    } else {
      $(".next_btn_1").removeClass("abled_btn_132").addClass("disabled_btn_132").attr("disabled", false);
    }
  });

  $(necessaryInput2).on("propertychange change keyup paste input", function () {
    if (necessaryInput2.val().length >= 1) {
      $(".next_btn_2").addClass("abled_btn_132").removeClass("disabled_btn_132").attr("disabled", false);
    } else {
      $(".next_btn_2").removeClass("abled_btn_132").addClass("disabled_btn_132").attr("disabled", false);
    }
  });

  $(necessaryInput3).on("propertychange change keyup paste input", function () {
    if (necessaryInput3.val().length >= 1) {
      $(".next_btn_3").addClass("abled_btn_132").removeClass("disabled_btn_132").attr("disabled", false);
    } else {
      $(".next_btn_3").removeClass("abled_btn_132").addClass("disabled_btn_132").attr("disabled", false);
    }
  });

  $(necessaryInput4).on("propertychange change keyup paste input", function () {
    if (necessaryInput4.val().length >= 1) {
      $(".next_btn_4").addClass("abled_btn_132").removeClass("disabled_btn_132").attr("disabled", false);
    } else {
      $(".next_btn_4").removeClass("abled_btn_132").addClass("disabled_btn_132").attr("disabled", false);
    }
  });

  $(necessaryInput5).on("propertychange change keyup paste input", function () {
    if (necessaryInput5.val().length >= 1) {
      $(".next_btn_5").addClass("abled_btn_132").removeClass("disabled_btn_132").attr("disabled", false);
    } else {
      $(".next_btn_5").removeClass("abled_btn_132").addClass("disabled_btn_132").attr("disabled", false);
    }
  });

  const discountRadio1 = $("#discount_radio1");
  const discountRadio2 = $("#discount_radio2");
  $(discountRadio1)
    .add(discountRadio2)
    .change(function () {
      if (discountRadio1.is(":checked")) {
        $(".last_btn").addClass("abled_btn_288").removeClass("disabled_btn_288").attr("disabled", false);
      } else {
        $(".last_btn").removeClass("abled_btn_288").addClass("disabled_btn_288").attr("disabled", true);
      }
    });

  $(".discount").on("propertychange change keyup paste input", function () {
    if (discountRadio2.is(":checked")) {
      if ($(".discount").val().length >= 1) {
        $(".last_btn").addClass("abled_btn_288").removeClass("disabled_btn_288").attr("disabled", false);
      } else {
        $(".last_btn").removeClass("abled_btn_288").addClass("disabled_btn_288").attr("disabled", true);
      }
    }
  });

  $(nextBtn1)
    .add(nextBtn2)
    .on("click", function (e) {
      e.preventDefault();
      $(".tabs li.on").removeClass("on").addClass("completion").attr("disabled", false).next().addClass("on");
      $(".tabs_area div.on").removeClass("on").next().addClass("on");
      $(".modal").css({ height: "680px" });
    });

  $(nextBtn3).on("click", function (e) {
    e.preventDefault();
    $(".tabs li.on").removeClass("on").addClass("completion").attr("disabled", false).next().addClass("on");
    $(".tabs_area div.on").removeClass("on").next().addClass("on");
    $(".modal").css({ height: "632px" });
  });

  $(nextBtn4)
    .add(nextBtn5)
    .on("click", function (e) {
      e.preventDefault();
      $(".tabs li.on").removeClass("on").addClass("completion").attr("disabled", false).next().addClass("on");
      $(".tabs_area div.on").removeClass("on").next().addClass("on");
      $(".modal").css({ height: "616px" });
    });

  // 모달 탭 마다 크기 변경
  $(".modal .tabs_area .tabs li a").on("click", function () {
    // if($(".modal .tabs_area .tabs li").hasClass("completion"))
    // 해당 요소를 클릭하는 내 자신의 index 번호를 가져온다. [0], [1]
    const tabIdx = $(".modal .tabs_area .tabs li a").index($(this));
    // 입력 완료된 (completion) 태그가 있는 탭만 선택 가능
    if ($(".modal .tabs_area .tabs li:eq(" + tabIdx + ")").hasClass("completion")) {
      // 기존에 적용되어 있는 on class 삭제
      $(".modal .tabs_area .tabs li").removeClass("on");
      $(".modal .tabs_area .tab_box").removeClass("on");
      // 다음 요소 클릭시 on class 추가
      $(".modal .tabs_area .tabs li:eq(" + tabIdx + ")").addClass("on");
      $(".modal .tabs_area .tab_box:eq(" + tabIdx + ")").addClass("on");

      if (tabIdx == 0) {
        $(".modal").css({ height: "872px" });
      } else if (tabIdx == 1 || tabIdx == 2) {
        $(".modal").css({ height: "680px" });
      } else if (tabIdx == 3) {
        $(".modal").css({ height: "632px" });
      } else if (tabIdx == 4 || tabIdx == 5) {
        $(".modal").css({ height: "616px" });
      }
    }
  });

  // 이력보기 토글 버튼
  const historyBtn = $(".history_btn");
  let historyBtnToggle = false;
  $(historyBtn).click(function (e) {
    e.preventDefault();
    if (historyBtnToggle == false) {
      $(".modal_table").removeClass("hidden");
      historyBtn.addClass("abled_btn_120_opacity").removeClass("abled_btn_120");
    } else {
      $(".modal_table").addClass("hidden");
      historyBtn.removeClass("abled_btn_120_opacity").addClass("abled_btn_120");
    }
    historyBtnToggle = !historyBtnToggle;
  });

  // 이력보기 테이블
  $("#modify_history").DataTable({
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

  // 파일 업로드
  $("#service_contract_upload").change(function () {
    console.log($(this));
    if ($(this).get(0).files.length !== 0) {
      const file = $("#service_contract_upload")[0].files[0].name;
      $(this).next().next("span").text(file);
    }
  });

  // 담당자 추가
  var clone = 1;
  $(".plus_in_charge_btn")
    .unbind("click")
    .bind("click", function (e) {
      e.preventDefault();

      if (clone < 5) {
        ++clone;
        $(".clone_input_box" + clone).removeClass("hidden");

        $(".clone_input_box" + clone + " .person_in_charge_delete_btn" + clone)
          .unbind("click")
          .bind("click", function (e) {
            if (clone > 1) {
              console.log(e.target);
              console.log(e.target.parentElement.parentElement.parentElement);
              console.log($(".clone_input_box" + clone).val());
              $(".clone_input_box" + clone).addClass("hidden");
              --clone;
            }
          });
      }
      console.log(clone);
    });

  const num = $(".in_charge_number1_1");
  const num2 = $(".in_charge_number2_1");
  const num3 = $(".in_charge_number3_1");
  $("num3").on("propertychange change keyup paste input", function () {
    console.log("asdf");
    const inputNum = $(".input_number input");
    inputNum.each(function (idx) {
      console.log("aa");
    });
  });

  // 회원정지 처리 승인과 미승인 에 따라 각각 회원정지구분과 사유입력 이 나오게 설정
  $(".account_status").change(function () {
    if ($(".account_status").val() == "승인") {
      $(".account_select").removeClass("hidden");
      $(".account_input").addClass("hidden");
    } else {
      $(".account_select").addClass("hidden");
      $(".account_input").removeClass("hidden");
    }
  });

  // 개발용 API 사용 의 미사용과 사용 radio버튼 클릭시
  $("input[name=API_radio]").change(function () {
    if ($("#API_radio2").is(":checked")) {
      $(".useToken").removeClass("hidden");
    } else {
      $(".useToken").addClass("hidden");
    }
  });

  // 할인사용여부
  $("input[name=discount_radio]").change(function () {
    if ($("#discount_radio2").is(":checked")) {
      $(".useDiscount").removeClass("hidden");
    } else {
      $(".useDiscount").addClass("hidden");
    }
  });

  $("input:text[numberonly]").on("propertychange change keyup paste input", function () {
    $(this).val(
      $(this)
        .val()
        .replace(/[^0-9]/g, "")
    );
  });

  function singleImgUpload(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $(".img_single_area").attr("src", e.target.result).parent().css({ display: "flex" }).removeClass("hidden");
        // 이미지 삭제 기능
        $(".img_single_view_area div img:first-child").click(function (e) {
          $(this).parent().addClass("hidden");
        });
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  $("#img_single_upload").on("change", function () {
    singleImgUpload(this);
  });
});
