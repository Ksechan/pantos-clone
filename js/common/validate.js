// 각 action별 confirm 함수
function confirmAction(vForm, sMode) {
	
	if(sMode = "") {	//각 action별 분기
		// 변수 세트 및 기타 치환작업
	} else if(sMode = "") {
	
	}
	return validateForm(vForm);
}

// 공통 validator 함수
function validateForm(vForm)
{
	var i, vElement;

	for(i = 0;i < vForm.elements.length;i++){ 
		vElement = vForm.elements[i];

		//////필수 항목을 체크한다.  
		if (vElement.getAttribute("required") != null) { 
			
			if(vElement.type == "TEXT" || vElement.type == "text" || 
			  vElement.tagName == "SELECT" || vElement.tagName == "select" || 
			  vElement.tagName == "TEXTAREA" || vElement.tagName == "textarea"){ 
				
				if(!CheckText(vElement, vElement.title, vForm)) return false;

				} else if(vElement.type == "PASSWORD" || vElement.type == "password"){ 
					if(!CheckText(vElement, vElement.title)) return false;

				} else if(vElement.type == "CHECKBOX" || vElement.type == "checkbox"){ 
					if(!CheckCheckbox(vForm, vElement, vElement.title)) return false;

				} else if(vElement.type == "RADIO" || vElement.type == "radio"){ 
					if(!CheckRadio(vForm, vElement, vElement.title)) return false;

				}
			}


		//////입력 페턴을 체크한다.
		if(vElement.getAttribute("pattern") != null && vElement.value.length > 0){ 
			if(!CheckPattern(vElement)) return false;
		} 
	}
	return true;
} 


//////각항목값의 유무를 검사한다.
function CheckText(vField, vName, vForm)
{ 
	if(vField.value.length < 1){ 
		//alert("'" + vName + "' 항목을 입력해주세요.");
		//Common.Dialog.alert({content: "'" + vName + "' 항목을 입력해주세요."});
		Common.Dialog.alert({content: "필수입력 항목을 확인 해 주세요."});

		if ( vField.tagName != "SELECT" && vField.tagName != "select" ) {
			vField.select();
		}
		try{
			vField.focus();
		}catch(e){
			
		}
		return false;
	}
	return true;
}

//////패턴을 검사한다.
function CheckPattern(vElement)
{ 
	switch(vElement.getAttribute("pattern")) {
		case "number":
			vPattern = /^[0-9]+$/;
			break;
		case "phone":
			vPattern = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;
			break;
		case "email":
			vPattern = /^[_a-zA-Z0-9-]+@[._a-zA-Z0-9-]+\.[a-zA-Z]+$/;
			break;
		case "domain":
			vPattern = /^[.a-zA-Z0-9-]+.[a-zA-Z]+$/;
			break;
		case "alpha":
			vPattern = /^[a-zA-Z]+$/;
			break;
		case "alphanum":
			vPattern = /^[a-zA-Z0-9]+$/;
			break;
		case "host":
			vPattern = /^[a-zA-Z-]+$/;
			break;
		case "notkor":
			vPattern = /[가-힣]/;
			break;
		case "koreng":
			vPattern = /^[가-힣a-zA-Z]*$/;
			break;
		case "koronly":
			vPattern = /^[가-힣]*$/;
			break;
	}
	if(!vPattern.test(vElement.value)){ 
		var vName = vElement.getAttribute("title") ? vElement.getAttribute("title") : vElement.getAttribute("name"); 
		//alert("'" + vName + "' 항목의 형식이 올바르지 않습니다.");
		alert('필수입력 항목을 확인 해 주세요.');
		vElement.select();
		vElement.focus();
		return false;
	} 
	return true;
} 

function CheckCheckbox(vForm, vField, vName)
{
	vFieldname = eval(vForm.name+'.'+vField.name);
	if (!vFieldname.checked){
		//alert("'" + vName + "' 항목을 선택해주세요.");
		alert('필수입력 항목을 확인 해 주세요.');
		try{
			vField.focus();
		}catch(e){}
		return false;
	}
	return true;
}

function CheckRadio(vForm, vField, vName)
{
	vFieldname = eval(vForm.name+'.'+vField.name);
	for (i=0;i<vFieldname.length;i++) {
		if (vFieldname[i].checked)
			return true;
	}
	//alert("'" + vName + "' 항목을 선택해주세요.");
	alert('필수입력 항목을 확인 해 주세요.');
	try{
		vField.focus();
	}catch(e){}
	return false;
} 

function SetRequired(vForm) {
	for (var j = 0;j < vForm.elements.length;j++) {   
		if (vForm.elements[j].getAttribute("required") != null) {
			vForm.elements[j].setAttribute("required") = "required";
		}
	} 
}

//////포커스 자동으로 옮기기
function check_focus(formName,formField1,formField2,len){ 
	var strfocus=document[formName][formField1].value.length;
	if(strfocus==parseInt(len)){
		if(event.keyCode == "8"){
		}else{document[formName][formField2].focus();}
	}
}

//////수자를 가격으로(,) 변환
function check_cost(cost){
    var tmpCost;
    var tmpintCost;
    var j;
    var k;

    tmpintCost=new String(cost.value);
    for(i=0;i<tmpintCost.length;i++) {
        tmpintCost = tmpintCost.replace(/,/,"");
    }

    j=0;
    k=tmpintCost.length % 3;
    for(i=0; i<=tmpintCost.length/3; i++){
        if(tmpCost){
            tmpCost = tmpCost+","+tmpintCost.substring(j, k);
        }else{
            tmpCost = tmpintCost.substring(j, k);
        }
        j=k;
        k+=3;
    }

    cost.value=tmpCost;
    cost.focus();
}

function displayBytes()
{
 var form = document.frm;


 var obj = document.getElementById('bytecheck');

 if (obj.value.bytes() > 60)
 { //80바이트를 넘기면
  if (event.keyCode != '8') //백스페이스는 지우기작업시 바이트 체크하지 않기 위해서
  {
   alert('80바이트까지 입력이 가능합니다.');
  }
  obj.value = obj.value.substring(0, obj.value.length-1);
 }

// document.all.display_bytes.innerHTML = form.bytecheck.value.bytes()+" byte";
form.bytecount.value=form.bytecheck.value.bytes()+" byte";
}

String.prototype.bytes = function()
{
 var str = this;
 var l = 0;
 for (var i=0; i<str.length; i++) l += (str.charCodeAt(i) > 128) ? 2 : 1;
 return l;
}