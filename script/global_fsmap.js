var homeControlDiv;
var adNode = document.createElement('div');

function reversefsmap()
{
	document.getElementById('contenttext').style.display='inline';
	document.getElementById('previouscomments').style.display='inline';
	//document.getElementById('addcommentform').style.display='inline';
	document.getElementById('footer').style.display='inline';
	document.getElementById('map_canvas').style.height='500px';
	document.getElementById('map_canvas').style.width='100%';
	document.getElementById('map_canvas').style.position='relative';
	document.getElementsByClassName('major')[0].style.display='inline';

	window.scrollTo(0,0);
	
  	map.controls[google.maps.ControlPosition.TOP_RIGHT].forEach(function(element,index) 
	{
		if (element == homeControlDiv) 
		{
			map.controls[google.maps.ControlPosition.TOP_RIGHT].removeAt(0);
		}
	}); 
	
	adNode.style.display='none';	
}

function fsmap()
{	
	if (document.getElementById('map_canvas').style.height=='100%')
	{
			reversefsmap();
			return;
	}
	
	var mapcentre=map.getCenter();
	
	document.getElementById('contenttext').style.display='none';
	document.getElementById('previouscomments').style.display='none';
	//document.getElementById('addcommentform').style.display='none';
	document.getElementById('footer').style.display='none';
	document.getElementById('map_canvas').style.zIndex='999';
	document.getElementById('map_canvas').style.height='100%';
	document.getElementById('map_canvas').style.width='100%';
	document.getElementById('map_canvas').style.position='absolute';
	document.getElementById('map_canvas').style.top='0';
	document.getElementById('map_canvas').style.left='0';
	document.getElementsByClassName('major')[0].style.display='none';
	
	//IE doesnt like resize, other do
	if (!(/MSIE (\d+\.\d+);/.test(navigator.userAgent)))
	{
   		 google.maps.event.trigger(map, 'resize');	
	}

	window.scrollTo(0,0);
		
	// Create the DIV to hold the control and call the HomeControl() constructor
  	// passing in this DIV.
  	homeControlDiv = document.createElement('DIV');
  	var homeControl = new HomeControl(homeControlDiv, map);

  	homeControlDiv.index = 1;
  	map.controls[google.maps.ControlPosition.TOP_RIGHT].push(homeControlDiv);

	map.setCenter(mapcentre);
	
	var ad = '<ins class="adsbygoogle" style="display:inline-block;width:320px;height:100px" data-ad-client="ca-pub-0604146100849518" data-ad-slot="4710523608"></ins>';

	if (adNode.style.display=='none')
	{
		adNode.style.display='inline';	
	}
	else
	{	  	
		adNode.innerHTML = ad;
		// You can use another ControlPosition if you wish.
		map.controls[google.maps.ControlPosition.TOP_CENTER].push(adNode);
		google.maps.event.addListenerOnce(map, 'tilesloaded', function() 
		{
			(adsbygoogle = window.adsbygoogle || []).push({});
		});
	}
}

function HomeControl(controlDiv, map) {

  // Set CSS styles for the DIV containing the control
  // Setting padding to 5 px will offset the control
  // from the edge of the map
  controlDiv.style.padding = '5px';

  // Set CSS for the control border
  var controlUI = document.createElement('DIV');
  controlUI.style.backgroundColor = 'white';
  controlUI.style.borderStyle = 'solid';
  controlUI.style.borderWidth = '2px';
  controlUI.style.cursor = 'pointer';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to close full screen';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior
  var controlText = document.createElement('DIV');
  controlText.style.fontFamily = 'Arial,sans-serif';
  controlText.style.fontSize = '12px';
  controlText.style.paddingLeft = '4px';
  controlText.style.paddingRight = '4px';
  controlText.innerHTML = 'Close Full Screen';
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to Chicago
  google.maps.event.addDomListener(controlUI, 'click', function() {
    fsmap();
  });
}