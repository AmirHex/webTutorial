
function loadMapLibrary() {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyBciReWu1vsS0vcpruteCA48pC8Cs0CYok&sensor=false&callback=showStaticAddress";
  document.body.appendChild(script);
}

function getAddress( address ){
	
}

function showStaticAddress( address ) {
	var myCenter=new google.maps.LatLng(43,-80);
	var mapOptions = {
	  zoom: 8,
	  center: new google.maps.LatLng(43, -80),
	  mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("map"), mapOptions);
	var marker = new google.maps.Marker({
		position:myCenter
		});

	marker.setMap(map);
}