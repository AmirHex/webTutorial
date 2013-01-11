
function loadMapLibrary() {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyBciReWu1vsS0vcpruteCA48pC8Cs0CYok&sensor=false&callback=showStaticAddress";
  document.body.appendChild(script);
}

function getAddress( address ){
	
}

function showStaticAddress( address ) {
	var mycenter=new google.maps.LatLng( 43.65960972192819, -79.39695954322815);
	var mapOptions = {
	  zoom: 12,
	  center: mycenter,
	  disableDefaultUI: true,
	  mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
	var map = new google.maps.Map(document.getElementById("map"), mapOptions);
	
	
	
	//marker.setMap(map);
	
	var infowindow = new google.maps.InfoWindow({
		content:"<div style='font-size:12px;overflow:auto'>Take Elevator to fifth floor, and " +
				"look for a half circle in the main " +
				"hall!.</div>",
		maxWidth: "5"
	});
	
	
	var marker = new google.maps.Marker({
		position:mycenter,
		map: map,
		disableAutoPan:false
	});
	
	//infowindow.open(map,marker);
	
	google.maps.event.addListener(marker, 'mouseover', function(){
		  infowindow.open(map,marker);
	});
}