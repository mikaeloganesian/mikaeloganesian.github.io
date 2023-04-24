setInterval(function () {
	var obj = document.getElementById("compilator-input");
	obj = obj.value.split(" ");
	for (var j = 0; j < obj.length; j++) {
		obj[j] = obj[j] - 0;
	}
	var output = document.getElementById("compilator-output");
	output.value = obj[0] * obj[1] + 24 - obj[0];
}, 500);
