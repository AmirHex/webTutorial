/*
 * Purpose: Displays the web-page via embedding it in 
 * an element with id value "id".
 * 
 * Input Argument:
 * -previewobj: consists of elements address, and id.
 *   --address: Address of the webpage. 
 *   --id: ID of the element to which we embed the content. 
 * 
 * Output Argument: 
 * - None
 */
function linkPreview( previewobj ){
	var content="<embed style='width:500pt;height300pt' src=" + previewobj.address + "></embed>";
	document.getElementById( previewobj.id ).innerHTML=content;
	
}

