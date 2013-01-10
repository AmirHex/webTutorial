


/*
 * Purpose: Error Handler for functions that deal with location
 * 
 * Input Argument:
 * - err: the error object that contains the information
 * about the error. 
 * - id(optional): the id of the tag that you want to report the error information
 * 
 * Output Argument:
 * - None
 */
function geoErrorHandler( err, id ){
	switch( err.code ){
    case err.PERMISSION_DENIED:
      err.message = "User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      err.message = "Location information is unavailable.";
      break;
    case err.TIMEOUT:
      err.message = "The request to get user location timed out.";
      break;
    case err.UNKNOWN_ERROR:
      err.message = "An unknown error occurred.";
      break;
    }
	if( id.value ){
		document.getElementById( id ).innerHTML = err.message;
	}
}


/*
 * Purpose: Show the user's location in the 
 * element with the specified id.
 * 
 * Input Arguments:
 * - id: id of element to which we want to write the location 
 * coordinates.
 * 
 * Output Arguments:
 * -None
 */
function displayLocation( id ){
	if( id ){
		if( navigator.geolocation ){
			navigator.geolocation.getCurrentPosition( function(position){
				document.getElementById( id ).innerHTML="Latitude:" + position.coords.latitude + "<br/>Longitude:" + position.coords.longitude;
			}, function(error){
				geoErrorHandler(error, id);
			});
		}
	}
}