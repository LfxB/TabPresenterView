let EXTENSION_ID = chrome.runtime.id;
let WINDOW_ID = -44;
let videoStream = 0;
let capt_width = 1920;
let capt_height = 1080;

chrome.browserAction.onClicked.addListener(function (tab) {
	chrome.storage.local.get({
		width_option: 1920,
		height_option: 1080
	}, function (options) {
		capt_width = options.width_option;
		capt_height = options.height_option;
		/*alert(capt_width + ' x ' + capt_height);*/
	});

	//Check if stream window is already open
	chrome.windows.getAll({
		populate: true,
		windowTypes: ['popup']
	}, function (windows) {
		let windowid = -44;
		//windows.forEach(function (window) {
		for (let window of windows) {
			//window.tabs.forEach(function (tab) {
			//});
			for (let tab of window.tabs) {
				//collect all of the urls here, I will just log them instead
				//chrome.extension.getBackgroundPage().console.log(tab.url);
				//chrome.extension.getBackgroundPage().console.log(window.id);

				// if popup exists
				if (tab.url === "chrome-extension://" + EXTENSION_ID + "/html/presenterView.html") {
					//if (tab.url === "chrome-extension://fglicogalfcgcdelainlpfjlmgiifiho/html/presenterView.html") {
					windowid = window.id;
					WINDOW_ID = window.id;
					chrome.extension.getBackgroundPage().console.log(tab.url);
					break;
				}
			}
		}
		chrome.extension.getBackgroundPage().console.log(windowid);

		if (windowid != -44) {
			focusOnStreamWindow();
		} else {
			chrome.tabCapture.capture({
				audio: false,
				video: true,
				videoConstraints: {
					mandatory: {
						chromeMediaSource: 'tab',
						/*maxWidth: capt_width,*/
						/*maxHeight: capt_height,*/
						minFrameRate: 60,
						maxFrameRate: 64
					}
				}
			}, startCapture);
		}
	});
});

function startCapture(stream) {
	videoStream = stream;
	createStreamWindow();
}

function focusOnStreamWindow() {
	//TODO: Replace current stream with new stream, in the same window
	alert('Other stream exists - please close it first.');
	chrome.windows.update(WINDOW_ID, {
		focused: true
	}, function(window) {
		
	});
}

function createStreamWindow() {
	chrome.windows.create({
		type: 'popup',
		url: chrome.runtime.getURL("../html/presenterView.html")
	}, function (newWindow) {
		console.log(newWindow);
		WINDOW_ID = newWindow.id;
		chrome.windows.onRemoved.addListener(function (windowId) {
			if (windowId == newWindow.id) {
				stopVideoStream();
			}
		});
	});
}

function stopVideoStream() {
	videoStream.getVideoTracks()[0].stop();
}

function getVideoStream() {
	return videoStream;
}
