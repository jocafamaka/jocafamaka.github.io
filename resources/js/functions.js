 /*
  * NagMap Reborn Live Preview
  * Developed by: João Carlos Rodrigues Ribeiro
  * 24/09/2018 - 01:08:20
  * See the project: https://github.com/jocafamaka/nagmapReborn
  */

  function changeLines(add){
    for(host = 0 ; host < hostStatus.length ; host++){
      if(Array.isArray(hostStatus[host].parents)){
        for (var i = hostStatus[host].parents.length - 1; i >= 0; i--) {
          for (var ii = LINES.length - 1; ii >= 0; ii--) {
            if( (hostStatus[host].host_name == LINES[ii].host) && (hostStatus[host].parents[i] == LINES[ii].parent)){
              if(add)
                LINES[ii].line.setMap(window.map);
              else
                LINES[ii].line.setMap(null);
            }
          }   
        }
      }
    }
  };

  function changeIconStyle(style){
    if(style >= 0 && style <= 3){
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
  };

  function randomStatus(){
    hosts = {
      "Main_Host": {"status": 0, "time": "(elapsed time)"},
      "Host_1": {"status": -1, "time": "(elapsed time)"},
      "Host_2": {"status": -1, "time": "(elapsed time)"},
      "Host_3": {"status": -1, "time": "(elapsed time)"},
      "Host_4": {"status": -1, "time": "(elapsed time)"},
      "Host_5": {"status": -1, "time": "(elapsed time)"},
      "Host_6": {"status": -1, "time": "(elapsed time)"},
      "Host_7": {"status": -1, "time": "(elapsed time)"},
      "Host_9": {"status": -1, "time": "(elapsed time)"},
      "Host_10": {"status": -1, "time": "(elapsed time)"},
      "Host_11": {"status": -1, "time": "(elapsed time)"},
      "Host_12": {"status": -1, "time": "(elapsed time)"},
      "Host_13": {"status": -1, "time": "(elapsed time)"},
      "Host_14": {"status": -1, "time": "(elapsed time)"}
    };

    for(var i = 0; i < (Math.floor(Math.random() * 6) + 1) ; i++){
      var chosen = (Math.floor(Math.random() * 14) + 1);
      var ii = 0;
      for (var host in hosts){
        if(ii == chosen)
          hosts[host].status = Math.floor(Math.random() * 5);
        ii++;
      }
    }
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

  function changeSize(size){
    if(size >= 25 && size <= 50){
      $('#map').height(100-size + '%');
      $('#changesbar').height(size + '%');
    }
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

  function showMenu(){
    swal({
      title: 'MENU',
      input: 'radio',
      html: '<img style="opacity:0;with:0px;height:0px" class="load" src="">',
      showCancelButton: true,
      showConfirmButton: false,
      inputOptions:{
        '0': '<img class="al122x122 grow" title="Project on GitHub" onclick="window.open(\'https://github.com/jocafamaka/nagmapReborn\'); swal.close();" src="resources/img/ProjectIcon.png">',
        '1': '<img class="al122x122 grow" title="Change" onclick="change();" src="resources/img/RestartIcon.png">'
      }
    })
  };

  function change(){

    swal.mixin({
      input: 'radio',
      confirmButtonText: 'Next &rarr;',
      showCancelButton: false,
      progressSteps: ['1', '2', '3', '4']
    }).queue([
    {
      title: 'Select the style of the icons!',
      inputOptions:{
        '0': '<img class="al62x43 load caption" data-caption="Retro" title="Retro" src="resources/img/icons/select/IconsStyle-1.png">',
        '1': '<img class="al62x43 load caption" data-caption="With shadow" title="With shadow" src="resources/img/icons/select/IconsStyle-2.png">',
        '2': '<img class="al62x43 load caption" data-caption="With border" title="With border" src="resources/img/icons/select/IconsStyle-3.png">',
      },
      footer: ' ',
      inputValidator: (value) => {
        return !value && 'You need to choose something!'
      },
        onBeforeOpen: function(){$('.caption').click(function(){$('.swal2-footer').text($(this).data('caption'));});}
    },
    {
      title: 'Show line between parents?',
      inputOptions:{
        '1': '<img class="al142x100 load caption" data-caption="Show" title="Show" src="resources/img/lines/on.png">',
        '3': '<img class="al142x100 load caption" data-caption="Hide" title="Hide" src="resources/img/lines/off.png">',
      },
      footer: ' ',
      inputValidator: (value) => {
        return !value && 'You need to choose something!'
      },
        onBeforeOpen: function(){$('.caption').click(function(){$('.swal2-footer').text($(this).data('caption'));});}
    },
    {
      title: 'ChangesBar size on screen!',
      html: '<br><div id="tudo"><input id="ex6" type="text" data-slider-min="25" data-slider-tooltip="hide" data-slider-max="50" data-slider-step="1" data-slider-value="25" data-slider-orientation="vertical"/><div id="view"><div id="sizeView"><img class="al122x122 load" src="resources/img/styles/roadmap.png"><div id="changesBarView"><div class="line down"></div><div class="line crit"></div><div class="line war"></div></div></div></div></div>',
      footer: '25%',
      onBeforeOpen: function(){sizeBar=25;$("#ex6").slider({reversed : true});$("#ex6").on("change", function(slideEvt){$("#changesBarView").height((sizeBar = slideEvt.value.newValue) + '%');$('.swal2-footer').text(slideEvt.value.newValue + "%");});}
    },
    {
      title: 'Select map type/style!',
      inputOptions:{
        '0': '<img class="al122x122 load caption" data-caption="Roadmap" title="Roadmap type" src="resources/img/styles/roadmap.png">',
        '1': '<img class="al122x122 load caption" data-caption="Satellite" title="Satellite type" src="resources/img/styles/satellite.png"><br>',
        '2': '<img class="al122x122 load caption" data-caption="Terrain" title="Terrain type" src="resources/img/styles/terrain.png">',
        '3': '<img class="al122x122 load caption" data-caption="Dark custom style" title="Dark custom style" src="resources/img/styles/dark.png">',
      },
      footer: ' ',
      inputValidator: (value) => {
        return !value && 'You need to choose something!'
      },
      confirmButtonText: 'Finish',
      onBeforeOpen: function(){$('.caption').click(function(){$('.swal2-footer').text($(this).data('caption'));});}
    }
    ]).then((result) => {
      if (result.value) {
        var r = result.value;
        changeIconStyle(r[0]);
        (r[1] == 1) ? changeLines(true) : changeLines(false);
        changeSize(sizeBar);
        changeStyle(r[3]);
        swal({
          type: 'success',
          title: 'Finished!',
          html: '<br>All changes applied successfully.',
          confirmButtonText: 'OK'
        })
      }
    })
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

    MY_MAPTYPE_DARK = '';

    styledMapTypeDark = new google.maps.StyledMapType([{"elementType":"geometry","stylers":[{"color":"#212121"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#212121"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"color":"#757575"}]},{"featureType":"administrative.country","stylers":[{"visibility":"on"}]},{"featureType":"administrative.country","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"administrative.country","elementType":"labels.text.fill","stylers":[{"lightness":100}]},{"featureType":"administrative.locality","stylers":[{"visibility":"on"}]},{"featureType":"administrative.locality","elementType":"labels","stylers":[{"color":"#ffffff"},{"weight":0.5}]},{"featureType":"administrative.locality","elementType":"labels.icon","stylers":[{"visibility":"on"}]},{"featureType":"administrative.locality","elementType":"labels.text","stylers":[{"color":"#000000"}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"},{"lightness":100}]},{"featureType":"administrative.locality","elementType":"labels.text.stroke","stylers":[{"color":"#000000"},{"visibility":"on"},{"weight":4}]},{"featureType":"administrative.province","stylers":[{"visibility":"on"}]},{"featureType":"administrative.province","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"on"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.business","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#181818"}]},{"featureType":"poi.park","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"poi.park","elementType":"labels.text.stroke","stylers":[{"color":"#1b1b1b"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#2c2c2c"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#8a8a8a"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#373737"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#3c3c3c"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry","stylers":[{"color":"#4e4e4e"}]},{"featureType":"road.local","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"transit","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#3d3d3d"}]}]);

    map.mapTypes.set(MY_MAPTYPE_DARK, styledMapTypeDark );

    setTimeout(function(){
      swal({
        title: 'Get started right now:',
        html: '<br><center><a href="https://www.github.com/jocafamaka/nagmapReborn/" target="_blank" style="cursor: pointer;"><img class="al318x100" title="Project on GitHub" src="resources/img/logo+GitBlack.svg" alt=""></a><center>',
        confirmButtonText: 'Close'
      });
    }, 60000);

  };