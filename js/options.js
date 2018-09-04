function save_options() {
	var width = document.getElementById('width').value;
	var height = document.getElementById('height').value;
	
	chrome.storage.local.set({
		width_option: width,
		height_option: height
	}, function() {
		var status = document.getElementById('status');
		status.textContent = 'Options saved.';
		setTimeout(function() {
			status.textContent = '';
		}, 750);
	});
}

function restore_options() {
	chrome.storage.local.get({
		width_option: 1920,
		height_option: 1080
	}, function(options) {
		document.getElementById('width').value = options.width_option;
		document.getElementById('height').value = options.height_option;
	});
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);