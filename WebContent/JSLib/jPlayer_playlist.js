/*Purpose: creating an object that contains the necessary
 * information to make a playlist in jplayer. 
 * Input Arguments: 
 *  - selectors: selectors['name'] contains the name of the playlist 
 *  			selectors['jPlayer'] contains the ID of jPlayers main <div>, 
 *  			 , selectors['interface'] is the ID of <div> element in which 
 *  			 the playlist's interface will reside, and selectors['listname'] 
 *               contains the name of the list.
 *     playlist.
 */
function playList( selectors  ){
	this.name = selectors.name;
	this.jPlayer = selectors.jPlayer;
	this.interface = selectors.interface;
	//this.listname = selectors.listname;
	this.current = 0;     //index of the current song which is playing.
	this.Songs = new Array();    //Array that contains the songs info
	/*
	 * Purpose: add a song to the playlist and update what is shown
	 * Input Arguments:
	 *  -song: A JSON Element that contains the information about the song. 
	 */
	this.addSong = function( song ){
		if( ! this.findSong( song ) ){
			this.Songs.push( song );
			
			
		}
		if( this.Songs.length == 1 ){    //if the song is the first song added into the playlist, load it into jplayer
			this.setSong( 0 );
		}
		
		this.showPlaylist();
		
	};
	/*
	 * Purpose: search for a song and returns true if finds it in the playlist
	 * Input Arguments: 
	 *  -song: JSON element that contains the info of song.
	 */
	this.findSong = function( song ){
		for( var i = 0; i < this.Songs.length ; i++){
			for( p in song ){
				if( this.Songs[i][p] != song[p] ){
					break;
				} 
			}
			if( this.Songs[i][p] != song[p] ){    //if the last elements are the same it means that we have a match
				continue;
			}
			return true;
		}
		return false;
	};
	
	/*
	 * Purpose: Shows the current element in the list that is 
	 * about to be played and its following nine songs.  
	 */
	this.showPlaylist = function(){
		var playlist = "<ul>\n";
		$(".jp-title").html( this.Songs[this.current].name.toUpperCase() );    //shows the name of the current songs which is about to be played
		for( var i = this.current; i < Math.min(10 + this.current, this.Songs.length); i++ ){
			playlist = playlist + "<li class=\"playlist-item\" title=\"" + this.Songs[i].name + "-" + i + "\"> " + this.Songs[i].name + " by " + this.Songs[i].artist + " </li>\n";
		}
	    $(".jp-playlist").html(playlist);
	    /*$(".playlist-item").bind( 'click', function( event ){
	    	var title = event.target.title;
			var index = title.lastIndexOf("-");
			index = parseInt( title.slice( index + 1, title.length) );
			$("p").html( index );
			playList().playSong( index );
	    });*/
	  
	};
	/*
	 * Purpose: Delete the songs["index"] song from the list
	 * Input Arguments: 
	 * -index: index of song to be deleted from songs
	 */
	this.deleteSong = function( index ){
		this.Songs.splice( index, 1);
		this.showPlaylist();
	};
	/*
	 * Purpose: Play a song from the playlist
	 * Input arguments:
	 * -index: index of the song to be played in the Songs array
	 */
	this.playSong = function( index ){
		this.current = index;
		this.setSong( index );
		$("#" + this.jPlayer ).jPlayer("play");
		this.showPlaylist();
	};
	/*
	 * Purpose: Plays the next available song in the playlist
	 * Input arguments:
	 * -flag: if "1" loop through the playlist, else stop.
	 */
	this.nextSong = function( flag ){
		this.current ++;
		if( this.current == this.Songs.length ){    //if the songs in the playlist are finished we start playing the playlist from the top (if the repeat option is on)
			this.current = 0;
		}
		if( flag == 1 || this.current != 0 )
			this.playSong( this.current );
		
		
	};
	/*
	 * Purpose: Plays the previous available song in the playlist
	 * Input arguments:
	 * -flag: if "1" loop through the playlist else stop
	 */
	this.previousSong = function(  ){
		this.current --;
		if( this.current == -1 ){    //if the songs in the playlist are finished we start playing the playlist from the top (if the repeat option is on)
			this.current = 0;
		}
		this.playSong( this.current );
	};
	
	/*
	 * Purpose: Set the song for which index is provided into the jplayer
	 * Input arguments:
	 * -index: index of the song to be set
	 */
	this.setSong = function( index ){
		$("#" + this.jPlayer ).jPlayer("setMedia", { mp3: this.Songs[ index ].url} );
	};
}