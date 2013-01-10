/*
 * Purpose: 
 */

function getPrayerTime( name, id ){
	if( navigator.geolocation ){
		navigator.geolocation.getCurrentPosition( function(position){
			var paryerTime = new PrayTimes('ISNA');
			var times = paryerTime.getTimes(new Date(), [position.coords.latitude, position.coords.longitude], 'auto', 'auto', 'Float');
			document.getElementById( id ).innerHTML="Latitude:" + position.coords.latitude + "<br/>Longitude:" + position.coords.longitude + "<br/>"+name+" prayer time is: " + times.sunrise;
		}, function(error){
			geoErrorHandler(error, id);
		});
	}
}


/*
 * Purpose: Plays a music using jwplayer. 
 * 
 * Input Arguments:
 * -playerobj: cotains two fileds id, and path.
 *   --id: id of the element that is set as the container of 
 *         jwplayer. 
 *   --Path: path of the music file that we want to play.
 * 
 * Output Arugments:
 * -None.
 */
function playMusic( playerobj ){
	jwplayer( playerobj.id ).setup({
		//file: "./mp3/eyes.mp3",
		file: playerobj.path,
		height: 40,
        width: 250
	});
	jwplayer( playerobj.id ).play();
}


/*
 * Purpose: checks if it is time to play adhan
 * 
 * Input Arguments:
 * -playerobj: contains to fields id, and path. 
 *   --id: the id of the element that works as the wrapper for the music player
 *   --filePath: path of the adhan mp3 file
 * 
 * Output Arguments:
 * -None
 */
function checkPrayerTime( playerobj ){
	var repeat = setInterval(function(){
	//var systemTime = new Date();
	var paryerTime = new PrayTimes('ISNA');
	if( navigator.geolocation ){
		navigator.geolocation.getCurrentPosition( function(position){
			var times = paryerTime.getTimes(new Date(), [position.coords.latitude, position.coords.longitude], 'auto', 'auto', 'Float');
			for (var i in times){
				if( isAdhanTime( times[i] ) ){
					clearInterval( repeat );
					playMusic( playerobj );
				}
			}
		}, function(error){
			geoErrorHandler(error, id);
		});
	}
	}, 1000);
	
}




/*
 * Purpose:converts a time object to a float number equivalent.
 * 
 * Input Arguments:
 * -time: time object that needs to be converted.
 * 
 * Output Arguments:
 * -floatTime: float type time object.
 */
function convertTimeToFloat( time ){
	var floatTime = time.getHours() + time.getMinutes() / 60 + time.getSeconds() / 3600;
	return floatTime;
}

/*
 * Purpose: Checks if its adhan time
 * 
 * Input Arguments: 
 * -prayerTime: a prayerTime that we want to see if it is approached
 * 
 * Output Arguments:
 * - true if the prayer time is arrived, and false otherwise
 */
function isAdhanTime( prayerTime ){
	prayerTime = new Number( prayerTime );
	var localTime = new Date();
	
	/*
	 
	var madetime = new Date();
	madetime.setHours(6);
	madetime.setMinutes(27);
	localTime = convertTimeToFloat( madetime );
	
	*/
	
	localTime = convertTimeToFloat( localTime );
	
	if( ( prayerTime - localTime < 0 ) && ( localTime - prayerTime < 0.25 / 60 ) )
		return true;
	return false;
}




function checkPrayerTime2( playerobj ){
	var repeat = setInterval( function(){
	//var systemTime = new Date();
	var paryerTime = new PrayTimes('ISNA');
	if( navigator.geolocation ){
			var times = paryerTime.getTimes(new Date(), [43, -80], 'auto', 'auto', 'Float');
			for (var i in times){
				if( isAdhanTime( times[i] ) ){
					clearInterval( repeat );
					playMusic( playerobj );
				}
			}
	}
	}, 1000);
	
}
