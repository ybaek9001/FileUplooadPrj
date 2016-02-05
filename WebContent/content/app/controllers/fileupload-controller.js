var fileuploadModule = angular.module("fileupload-app", ["ngAnimate"]);

fileuploadModule.controller('fileupload-controller', function ($scope, $http) {
	$scope.dropboxClass="";
	$scope.dropboxText = "여기에 업로드할 파일을 드래그 하세요";
	
	/*var a = "a"; //자바스크립트는 undefined, null, "" 은 false로 인식
	var a1 = null;
	var a2 = 'hello';
	
	var b = a&&a1&&a2;
	
	alert(b);
	
	if(!a){
		alert("ok")
	};
	if(!!a)
		alert("sorry");
	*/
	
	var dropbox = document.querySelector(".dropbox");
	//처리되는 순서: dragenter->dragover->drop(or dragleave)
						
	
	dropbox.addEventListener("dragenter",function(event){
		event.stopPropagation();
		event.preventDefault();
		
		$scope.$apply(function(){
			$scope.dropboxText = "오케이~~";
		});	
		//dropbox.innerText = "오케이";
	});
	

	dropbox.addEventListener("dragleave",function(event){
		event.stopPropagation();
		event.preventDefault();
		
		$scope.$apply(function(){
			$scope.dropboxText = "여기에 업로드할 파일을 두세요~~!!!!!!!!!!!!!!!";
			$scope.dropboxClass="";
		});
		
		//dropbox.innerText = "오케이";
	});
	
	dropbox.addEventListener("dragover",function(event){
		event.stopPropagation();
		event.preventDefault();
		
		var valid = event.dataTransfer	//dataTransfer객체는 drag & drop 이벤트에서 사용할 수 있음 
					&& event.dataTransfer.types //types를 가지는  이벤트 객체있가 drag & drop이벤트 중인 지 확인
					&& event.dataTransfer.types.indexOf("Files")>=0; //  "Files"라는 타입이 인벤트 객체 안에 들어 있는지 확인
		$scope.$apply(function(){
			//$scope.dropboxText = event.dataTransfer.types;
			$scope.dropboxText = valid? "드롭하세요!": "유효한 파일이 아닙니다~~";
			$scope.dropboxClass = valid? "valid":"invalid";	
			//	ng-class="valid" 혹은 "invalid"로 되는데, 이것은 class="valid"라고 한 것처럼 자바스크립트나 css에서 적용되는 class로도 사용가능
		});
		//dropbox.innerText = "오케이";
	});
	
	dropbox.addEventListener("drop",function(event){
		event.stopPropagation();
		event.preventDefault();
		
		$scope.$apply(function(){
			$scope.files = event.dataTransfer.files;	
			for(var i=0;i<event.dataTransfer.files.length;i++)
				fnames[i]=event.dataTransfer.files[i].name;
		});
		
		//alert(files.length)
		/*var str ="";
		for(var i=0;i<files.length;i++)
			alert(files[i].name);*/
	});
	
	var fnames=[];
	
	$scope.fileSendClick = function(){
		var fd = new FormData();
		for(var i in $scope.files)
			fd.append("file",$scope.files[i]);
			
		//파일 업로드
		var xhr = new XMLHttpRequest();
		xhr.upload.addEventListener("progress", uploadProgress)
		xhr.addEventListener("load", uploadComplete);
		xhr.addEventListener("error", uploadFailed);
		xhr.open("POST", "../../../fileupload");
		xhr.send(fd);
	}
	
	function uploadProgress(event){
		$scope.$apply(function(){
			$scope.dropboxText=Math.round(event.loaded*100/event.total) + "%";
		})	
	}
	
	function uploadComplete(event){
		$scope.$apply(function(){
			$scope.remoteFiles = fnames;
		})
	}
	function uploadFailed(){
		alert("Fail!!");
	}
});