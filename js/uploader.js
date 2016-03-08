$(document).ready(function() {
	//console.log(kendoUpload);
    $("#files").kendoUpload();

    document.getElementById('files').addEventListener('change', function(){
	    for(var i = 0; i<this.files.length; i++){
	        var file =  this.files[i];
	        // This code is only for demo ...
	        console.group("File "+i);
	        console.log("name : " + file.name);
	        console.log("size : " + file.size);
	        console.log("type : " + file.type);
	        console.log("date : " + file.lastModified);
	        console.groupEnd();
	    }
	}, false);

	var uploadfiles = document.querySelector('#submit-strategy');
	uploadfiles.addEventListener('click', function () {
		var files = [];
		$(".k-button").children("input").each(function(){if(this.files.length!==0){files.push(this.files[0])}});
		console.log(files);
	    for(var i=0; i<files.length; i++){
	        uploadFile(files[i]); // call the function to upload the file
	    }
	}, false);
});

function uploadFile(file){
    var url = 'server/index.php';
    var xhr = new XMLHttpRequest();
    var fd = new FormData();
    xhr.open("POST", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Every thing ok, file uploaded
            console.log(xhr.responseText); // handle response.
        }
    };
    fd.append("upload_file", file);
    xhr.send(fd);
}

