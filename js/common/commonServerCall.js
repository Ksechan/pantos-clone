function callServerSyncJson(type, action, dataString, successFunction, setTimeout) {
	if (type == null || $.trim(type) == "") type = "GET";
	if (action == null || $.trim(action) == "") return;

	$.ajax({
		type : type,
		url : action,
		timeout : setTimeout,
		data : dataString,
		async : false,
		dataType : "json", //xml, html, json, script, text
		beforeSend : function(xmlHttpRequest) {
			xmlHttpRequest.setRequestHeader("AJAX", "true");
		},
		success : function(json) {
			successFunction(json);
		},
		error : function(xhr, status, e) {
			//console.log("xhr.statusText : " + xhr.statusText);
			console.log("xhr.status : " + xhr.status);
			
			if(xhr.status == 400 || xhr.status == 404) self.location = '/'; // 세션 끊어졌을 때
		}
	});
}

function callServerAsyncJson(type, action, dataString, successFunction, setTimeout) {
	if (type == null || $.trim(type) == "") type = "GET";
	if (action == null || $.trim(action) == "") return;
	
	$.ajax({
		type : type,
		url : action,
		timeout : setTimeout,
		data : dataString,
		async : true,
		dataType : "json", //xml, html, json, script, text
		beforeSend : function(xmlHttpRequest) {
			$(".ajaxLoading").removeClass("display-none");

			xmlHttpRequest.setRequestHeader("AJAX", "true");
		},
		success : function(json) {
			successFunction(json);
			
			//$(".ajaxLoading").addClass("display-none");
		},
		error : function(xhr, status, e) {
			//console.log("xhr.statusText : " + xhr.statusText);
			console.log("xhr.status : " + xhr.status);
			
			$(".ajaxLoading").addClass("display-none");
			
			if(xhr.status == 400 || xhr.status == 404) self.location = '/'; // 세션 끊어졌을 때
		},
		complete: function () {
			$(".ajaxLoading").addClass("display-none");
        }
	});
}

function closeProgressBar() {
	$(".ajaxLoading").addClass("display-none");
}

function callAjaxAsyncMultiObj(type, action, dataObj, successFunction, setTimeout) {
	if (type == null || $.trim(type) == "") type = "POST";
	if (action == null || $.trim(action) == "") return;

	$.ajax({
		type : type,
		url : action,
		timeout : setTimeout,
		contentType : "application/json",
		dataType : "json",
		data : JSON.stringify(dataObj),
		async : true,
		beforeSend : function(xmlHttpRequest) {
			$(".ajaxLoading").removeClass("display-none");
			
			xmlHttpRequest.setRequestHeader("AJAX", "true");
		},
		success: function(json) {
			successFunction(json);
			
			//$(".ajaxLoading").addClass("display-none");
		},
		error: function(xhr, status, e) {
			//alert("xhr.statusText : " + xhr.statusText);
			//alert("xhr.status : " + xhr.status);
			
			if(xhr.status == 400 || xhr.status == 404) self.location = '/'; // 세션 끊어졌을 때
		},
		complete: function () {
			$(".ajaxLoading").addClass("display-none");
        }
	});
}

function callAjaxAsyncFiles(type, action, dataObj, successFunction, setTimeout) {
	if (type == null || $.trim(type) == "") type = "POST";
	if (action == null || $.trim(action) == "") return;

	$.ajax({
		type : type,
		url : action,
		timeout : setTimeout,
		processData : false,
		contentType : false,
		dataType : "json",
		data : dataObj,
		async : true,
		beforeSend : function(xmlHttpRequest) {
			$(".ajaxLoading").removeClass("display-none");
			
			xmlHttpRequest.setRequestHeader("AJAX", "true");
		},
		success: function(json) {
			successFunction(json);
			
			//$(".ajaxLoading").addClass("display-none");
		},
		error: function(xhr, status, e) {
			//alert("xhr.statusText : " + xhr.statusText);
			//alert("xhr.status : " + xhr.status);
			
			$(".ajaxLoading").addClass("display-none");
			
			if(xhr.status == 400 || xhr.status == 404) self.location = '/'; // 세션 끊어졌을 때
		},
		complete: function () {
			$(".ajaxLoading").addClass("display-none");
        }
	});
}

function callAsyncExcelDownload(type, action, dataObj, successFunction) {
	if (type == null || $.trim(type) == "") type = "POST";
	if (action == null || $.trim(action) == "") return;

	var request = new XMLHttpRequest();
	request.open('POST', action, true);
	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	request.responseType = 'blob';
	//request.timeout = 60000 * 10;

	request.onload = function(e) {
		$(".ajaxLoading").addClass("display-none");

		var filename = "";
		var disposition = request.getResponseHeader('Content-Disposition');

		if(disposition && disposition.indexOf('attachment') !== -1) {
			var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
			var matches = filenameRegex.exec(disposition);

			if(matches != null && matches[1]) filename = decodeURI(matches[1].replace(/['"]/g, ''));
		}
		
		console.log("파일 명 : " + filename);

		if(this.status === 200) {
			var blob = this.response;

			if(window.navigator.msSaveOrOpenBlob) {
				window.navigator.msSaveBlob(blob, filename);
			}

			else {
				var downloadLink = window.document.createElement('a');
				var contentTypeHeader = request.getResponseHeader("Content-Type");

				downloadLink.href = window.URL.createObjectURL(new Blob([blob], { type: contentTypeHeader }));
				downloadLink.download = filename;
				document.body.appendChild(downloadLink);
				downloadLink.click();
				document.body.removeChild(downloadLink);
			}
			
			successFunction();
		}
	};
	
	request.send(dataObj);
}