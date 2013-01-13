/*
 * Purpose: Initialize a google map on a <div> element 
 * and show the location with a given latitude and longitude on it.
 * 
 * Input Arguments:
 * -None.
 * 
 * Output Arguments:
 * -None.
 * 
 */
function initMap(){
	//alert('Inside init');
	var address={'LatLng':new google.maps.LatLng( 43.65960972192819, -79.39695954322815)};
	showStaticAddress( 'map', address );
}


/*
 * Purpose: adds a google map's api to the webpage. 
 * 
 * Input Argument: 
 * -None. 
 * 
 * Output Arguments:
 * -None.
 */
function loadMapLibrary() {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyBciReWu1vsS0vcpruteCA48pC8Cs0CYok&sensor=false&callback=initMap";
  document.body.appendChild(script);
}


/*
 * Purpose: Shows google map of a the static address "address" on a <div> element with 
 * id "id". 
 * 
 * Input Arguments:
 * -id: id of div element on which we want to show the map. 
 * -address: address of the location that we want to show. (for now we only use Latitude and longitude)
 * 
 * Output Arguments:
 * -None.
 */
function showStaticAddress( id, address ) {
	//var mycenter=new google.maps.LatLng( 43.65960972192819, -79.39695954322815);
	var mapOptions = {
	  zoom: 18,
	  center: address.LatLng,
	  disableDefaultUI: true,
	  streetViewControl:true,
	  mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
	//setting up the container
	var div = document.getElementById( id );
	div.style.visibility = "visible";
	var map = new google.maps.Map(div, mapOptions);
	
	
	
	
	//write directions for inside the building
	var infowindow = new google.maps.InfoWindow({
		content:"<div style='font-size:12px;overflow:auto'>Take Elevator to fifth floor, and " +
				"look for a half circle in the main " +
				"hall!.</div>",
		maxWidth: "5", 
		disableAutoPan:false
	});
	
	
	var marker = new google.maps.Marker({
		position:address.LatLng,
		map: map,
	});
	
	//infowindow.open(map,marker);
	
	google.maps.event.addListener(marker, 'click', function(){
		  infowindow.open(map,marker);
	});
}