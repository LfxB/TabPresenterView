window.onload = function() {
	let video = document.getElementById("vid");

	//chrome.storage.local.get("streamKey", function (mediaStream) {
		//video.src = URL.createObjectURL(mediaStream);
		//document.body.appendChild(video);
		//video.play();
	//});

	var backgroundPage = chrome.extension.getBackgroundPage();
	try {
		video.srcObject = backgroundPage.getVideoStream();
	} catch (error) {
		video.src = URL.createObjectURL(backgroundPage.getVideoStream());
	}
	//document.body.appendChild(video);
	video.play();
};