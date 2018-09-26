 /*
  * NagMap Reborn Live Preview
  * Developed by: João Carlos Rodrigues Ribeiro
  * 24/09/2018 - 01:08:20
  * See the project: https://github.com/jocafamaka/nagmapReborn
  */

function addLines(){
	for(host = 0 ; host < hostStatus.length ; host++){
		if(Array.isArray(hostStatus[host].parents)){
			for (var i = hostStatus[host].parents.length - 1; i >= 0; i--) {
				for (var ii = LINES.length - 1; ii >= 0; ii--) {
					if( (hostStatus[host].host_name == LINES[ii].host) && (hostStatus[host].parents[i] == LINES[ii].parent))
						LINES[ii].line.setMap(window.map);
				}          
			}
		}
	}
}

function removeLines(){
	for(host = 0 ; host < hostStatus.length ; host++){
		if(Array.isArray(hostStatus[host].parents)){
			for (var i = hostStatus[host].parents.length - 1; i >= 0; i--) {
				for (var ii = LINES.length - 1; ii >= 0; ii--) {
					if( (hostStatus[host].host_name == LINES[ii].host) && (hostStatus[host].parents[i] == LINES[ii].parent))
						LINES[ii].line.setMap(null);
				}          
			}
		}
	}
}

function changeIconStyle(style){
	iconRed.url= 'resources/img/icons/MarkerRedSt-'+ style +'.png';

  iconGreen.url= 'resources/img/icons/MarkerGreenSt-'+ style +'.png';

  iconOrange.url= 'resources/img/icons/MarkerOrangeSt-'+ style +'.png';

  iconYellow.url= 'resources/img/icons/MarkerYellowSt-'+ style +'.png';

  iconGrey.url= 'resources/img/icons/MarkerGreySt-'+ style +'.png';

  for(host = 0 ; host < hostStatus.length ; host++){
    if(hostStatus[host].status == 0){
     MARK[host].setIcon(iconGreen);
   }
   else if(hostStatus[host].status == 1){
     MARK[host].setIcon(iconYellow);
   }
   else if(hostStatus[host].status == 2){
     MARK[host].setIcon(iconOrange);
   }
   else if(hostStatus[host].status == 3){
     MARK[host].setIcon(iconRed);
   }
   else{
     MARK[host].setIcon(iconGrey);
   }
 }
}

function randomStatus(){
  hosts = {
    "Host_3": {
      "status": (Math.floor(Math.random() * 11) > 7)? Math.floor(Math.random() * 5) : 0,
      "time": "(elapsed time)"
    },
    "Host_1": {
      "status": (Math.floor(Math.random() * 11) > 7)? Math.floor(Math.random() * 5) : 0,
      "time": "(elapsed time)"
    },
    "Host_2": {
      "status": (Math.floor(Math.random() * 11) > 7)? Math.floor(Math.random() * 5) : 0,
      "time": "(elapsed time)"
    },
    "Host_10": {
      "status": (Math.floor(Math.random() * 11) > 7)? Math.floor(Math.random() * 5) : 0,
      "time": "(elapsed time)"
    },
    "Host_8": {
      "status": (Math.floor(Math.random() * 11) > 7)? Math.floor(Math.random() * 5) : 0,
      "time": "(elapsed time)"
    },
    "Host_11": {
      "status": (Math.floor(Math.random() * 11) > 7)? Math.floor(Math.random() * 5) : 0,
      "time": "(elapsed time)"
    },
    "Host_9": {
      "status": (Math.floor(Math.random() * 11) > 7)? Math.floor(Math.random() * 5) : 0,
      "time": "(elapsed time)"
    },
    "Host_7": {
      "status": (Math.floor(Math.random() * 11) > 7)? Math.floor(Math.random() * 5) : 0,
      "time": "(elapsed time)"
    },
    "Host_4": {
      "status": (Math.floor(Math.random() * 11) > 7)? Math.floor(Math.random() * 5) : 0,
      "time": "(elapsed time)"
    },
    "Host_6": {
      "status": (Math.floor(Math.random() * 11) > 7)? Math.floor(Math.random() * 5) : 0,
      "time": "(elapsed time)"
    },
    "Main_Host": {
      "status": 0,
      "time": "(elapsed time)"
    },
    "Host_5": {
      "status": (Math.floor(Math.random() * 11) > 7)? Math.floor(Math.random() * 5) : 0,
      "time": "(elapsed time)"
    }
  };

  return hosts;
};

function changeStyle(style){
  if(style == 0)
    map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
  if(style == 1)
    map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
  if(style == 2)
    map.setMapTypeId(google.maps.MapTypeId.TERRAIN);
  if(style == 3)
    map.setMapTypeId(MY_MAPTYPE_DARK);
};

function GetURLParameter(sParam)
{
  var sPageURL = window.location.search.substring(1);
  var sURLVariables = sPageURL.split('&');
  for (var i = 0; i < sURLVariables.length; i++) 
  {
    var sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] == sParam) 
    {
      return sParameterName[1];
    }
  }
};

function onInit(){

  var strictBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(-17.494563, -79.377880),
    new google.maps.LatLng(-1.047002, -31.444691)
    );
  google.maps.event.addListener(map, 'dragend', function () {
    if (strictBounds.contains(map.getCenter())) return;
    var c = map.getCenter(),
    x = c.lng(),
    y = c.lat(),
    maxX = strictBounds.getNorthEast().lng(),
    maxY = strictBounds.getNorthEast().lat(),
    minX = strictBounds.getSouthWest().lng(),
    minY = strictBounds.getSouthWest().lat();
    if (x < minX) x = minX;
    if (x > maxX) x = maxX;
    if (y < minY) y = minY;
    if (y > maxY) y = maxY;
    map.setCenter(new google.maps.LatLng(y, x));
    swal({
      type: 'warning',
      title: 'Limits :(',
      html: 'Due to the API usage quotas, some navigation and zoom limits have been defined.'
    });
  });

  $('select[name=style]').change(function(){ changeIconStyle($(this).val()); });

  $('select[name=lines]').change(function(){ ($(this).val() == 1)? addLines() : removeLines(); });

  $('select[name=mapS]').change(function(){ changeStyle($(this).val()); });

  MY_MAPTYPE_DARK = '';

  styledMapTypeDark = new google.maps.StyledMapType([{"elementType":"geometry","stylers":[{"color":"#212121"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#212121"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"color":"#757575"}]},{"featureType":"administrative.country","stylers":[{"visibility":"on"}]},{"featureType":"administrative.country","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"administrative.country","elementType":"labels.text.fill","stylers":[{"lightness":100}]},{"featureType":"administrative.locality","stylers":[{"visibility":"on"}]},{"featureType":"administrative.locality","elementType":"labels","stylers":[{"color":"#ffffff"},{"weight":0.5}]},{"featureType":"administrative.locality","elementType":"labels.icon","stylers":[{"visibility":"on"}]},{"featureType":"administrative.locality","elementType":"labels.text","stylers":[{"color":"#000000"}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"},{"lightness":100}]},{"featureType":"administrative.locality","elementType":"labels.text.stroke","stylers":[{"color":"#000000"},{"visibility":"on"},{"weight":4}]},{"featureType":"administrative.province","stylers":[{"visibility":"on"}]},{"featureType":"administrative.province","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"on"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.business","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#181818"}]},{"featureType":"poi.park","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"poi.park","elementType":"labels.text.stroke","stylers":[{"color":"#1b1b1b"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#2c2c2c"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#8a8a8a"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#373737"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#3c3c3c"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry","stylers":[{"color":"#4e4e4e"}]},{"featureType":"road.local","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"transit","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#3d3d3d"}]}]);

  map.mapTypes.set(MY_MAPTYPE_DARK, styledMapTypeDark );

  $('#loader2').css("opacity", "0");

  setTimeout(function(){
    $('#loader2').hide();
    swal({
      type: 'success',
      title: 'Welcome to NagMap Reborn!',
      text: 'Due to the limitation of architecture (user-side only) it was not possible to represent some of the features and options of NagMap Reborn, however through this page you can get a working idea of the NagMap Reborn.',
      footer: 'The data presented here are only demonstrative and generated in a random way, but the occurrences represent the real behavior of the application before the changes of the hosts.',
      confirmButtonText: 'OK'
    }); 
    if(GetURLParameter('icons'))
      changeIconStyle(GetURLParameter('icons'));

    if(GetURLParameter('lines'))
      (GetURLParameter('lines') == 1) ? addLines() : removeLines();

    if(GetURLParameter('type'))
      changeStyle(GetURLParameter('type'));
  }, 900);

  setTimeout(function(){
    swal({
      title: 'Get started right now:',
      html: '<br><center><a href="https://www.github.com/jocafamaka/nagmapReborn/" target="_blank" style="cursor: pointer;"><img title="Project on GitHub" src="resources/img/logo+GitBlack.svg" alt=""></a><center>',
      confirmButtonText: 'Close'
    });
  }, 60000);

};