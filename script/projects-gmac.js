var map;

var areacontainer=new Array(0); 
var points=new Array(0); 

areacontainer.push(points);

var areaMarkers=new Array(0);
var areaPath=new Array(0);
var areaPath2=new Array(0);
var polygon=new Array(0);

var temp_areaPath2;
var	temp_areaPath;
var temp_polygon;

var lineColor='#ff0000';
var fillColor='#00FF00';
var lineWidth=1;

var div_kmloutput=document.getElementById("div_outputkml"); 
var div_totalareas=document.getElementById("div_totalareas");

var kmlcoordinates="";
var arr_kmlcoordinates=new Array(0);

var mapDiv=document.getElementById('map');
var areaDiv=document.getElementById('area');
var areaDivkm=document.getElementById('areakm');
var areaDivacre=document.getElementById('areaacre');
var areaDivhectare=document.getElementById('areahectare');
var areaDivsnm=document.getElementById('sqnautmiles');
var areaDivm=document.getElementById('sqmiles');
var areaDivfeet=document.getElementById('areafeet');
var perimDiv=document.getElementById('div_currentperim');

var totalareaDiv=document.getElementById('totalarea');
var totalareaDivkm=document.getElementById('totalareakm');
var totalareaDivacre=document.getElementById('totalareaacre');
var totalareaDivhectare=document.getElementById('totalareahectare');
var totalareaDivsnm=document.getElementById('totalsqnautmiles');
var totalareaDivm=document.getElementById('totalsqmiles');
var totalareaDivfeet=document.getElementById('totalareafeet');
var totalperimDiv=document.getElementById('div_currenttotalperim');

var radiansPerDegree=Math.PI/180.0;
var degreesPerRadian=180.0/Math.PI;
var earthRadiusMeters=6367460.0;
var metersPerDegree=2.0*Math.PI*earthRadiusMeters/360.0;
var metersPerKm=1000.0;
var meters2PerHectare=10000.0;
var feetPerMeter=3.2808399;
var feetPerMile=5280.0;
var acresPerMile2=640;

var totalarea=0;
var totalperim=0;
var togglemarkers_mode=1;

var geocoder;
var staticmarker;
var grid;

function initialize() 
{
	var latlng = new google.maps.LatLng(0.0,0.0);
	var myOptions = {zoom:2,scaleControl: true,center:latlng,mapTypeId:google.maps.MapTypeId.HYBRID,draggableCursor:'crosshair',mapTypeControlOptions:{style:google.maps.MapTypeControlStyle.DROPDOWN_MENU}};
	map = new google.maps.Map(document.getElementById("map_canvas"),myOptions);
	google.maps.event.addListener(map, 'click', mapclick);
	
	areaDiv.innerHTML='0 m&sup2;';
	areaDivkm.innerHTML='0 km&sup2;';
	areaDivacre.innerHTML='0 acres';
	areaDivhectare.innerHTML='0 hectares';
	areaDivm.innerHTML='0 square miles';
	areaDivsnm.innerHTML='0 square nautical miles';	
	areaDivfeet.innerHTML='0 square feet';
	
	perimDiv.innerHTML='<h3>Current Perimeter</h3>';
	
	Display();
	
	if  (rt32!="0")
	{
		loadarea(rt32);
		fitzoomandpan();
	}
	
	if  (showareaid!="0")
	{
		loadarea(showareaid);
	}
	
	geocoder = new google.maps.Geocoder();
	
	//if there is a log, show the loged in menu
	if (username)
	{
		showloginmenu();
	}
	
	//get map div width...
	var width = document.getElementById("map_canvas").offsetWidth;
    //console.log(width);
	
	if (width < 500) {
		document.getElementById('map_canvas').style.height = "400px";
		//console.log("400");
	}
	else if (width >= 500 && width <= 1000){
		document.getElementById('map_canvas').style.height = "500px";
		//console.log("500");
	}
	else if (width > 1000){
		document.getElementById('map_canvas').style.height = "650px";
		//console.log("650");
	}
	else {
		document.getElementById('map_canvas').style.height = "500px";
		//console.log("500");
	}	
}

function ftn_togglegrid()
{
	if (grid)
	{
		grid.setMap(null);
		grid= null;
	}
	else{
		grid = new Graticule(map, true);
	}
}

function ftn_togglemarkers()
{
	togglemarkers_mode = !togglemarkers_mode;
	//console.log(togglemarkers_mode);
	Display();
}

function newarea()
{
	points=new Array(0);
	areacontainer.push(points);

	div_totalareas.style.display='block';
	
	totalperimDiv.innerHTML="<h3>Current Total Perimeter</h3>";

	Display();
	kmlcoordinates="";
	div_kmloutput.innerHTML="";
}

function mapclick(event)
{										  
	areacontainer[areacontainer.length-1].push(event.latLng);
	Display();
}

function DeleteLastPoint()
{
	if(areacontainer[areacontainer.length-1].length>0)
	areacontainer[areacontainer.length-1].length--;
	Display();
	div_kmloutput.innerHTML="";
}

function ClearAllPoints()
{
	areacontainer=new Array(0);
	//reset

	areaDiv.innerHTML='0 m&sup2;';
	areaDivkm.innerHTML='0 km&sup2;';
	areaDivacre.innerHTML='0 acres';
	areaDivhectare.innerHTML='0 hectares';
	areaDivm.innerHTML='0 square miles';
	areaDivsnm.innerHTML='0 square nautical miles';	
	areaDivfeet.innerHTML='0 square feet';
	
	perimDiv.innerHTML='<h3>Current Perimeter</h3>';
	
	//div_totalareas.style.visibility='hidden';
	div_totalareas.style.display='none';
	Display();
	kmlcoordinates="";
	arr_kmlcoordinates=new Array(0);
	div_kmloutput.innerHTML="";
	
	areaMarkers=new Array(0);
	areaPath=new Array(0);
	areaPath2=new Array(0);
	polygon=new Array(0);
	
	var points=new Array(0); 

	areacontainer.push(points);
}

function clearMap()
{
	if (areaMarkers) 
	{	
		for (i in areaMarkers) 
		{
			areaMarkers[i].setMap(null);
		}
	}
	
	if (areaPath.length>0) 
	{	
		for (i in areaPath) 
		{
			areaPath[i].setMap(null);
		}
	}
	
	if (areaPath2.length>0) 
	{	
		for (i in areaPath2) 
		{
			areaPath2[i].setMap(null);
		}
	}
	
	if (polygon.length>0) 
	{	
		for (i in polygon) 
		{
			polygon[i].setMap(null);
		}
	}
	
	//reset
	areaMarkers=new Array(0);
	areaPath=new Array(0);
	areaPath2=new Array(0);
	polygon=new Array(0);
}

function Display()
{
	clearMap();
	var temp_kmlcoordinates="";
	arr_kmlcoordinates=new Array(0);
	
	for(var j=0;j<areacontainer.length;++j)
	{	
		//If this area has more than 2 sides....
		if (areacontainer[j].length>2)
		{
			var cb_transparent=document.getElementById("cb_transparent");
			var opacity;
			if (cb_transparent.checked)
			{
				opacity=0;
			}
			else
			{
				opacity=0.5;
			}
			
			//the ployline
			temp_areaPath2 = new google.maps.Polyline({
				path: areacontainer[j],
				strokeColor: lineColor,
				strokeOpacity: 1.0,
				strokeWeight: lineWidth,
				geodesic: true,
				fillOpacity: 0.5
			});
			temp_areaPath2.setMap(map);
			areaPath2.push(temp_areaPath2);
			
			//the Polygon
			temp_polygon = new google.maps.Polygon({
				paths: areacontainer[j],
				strokeColor: lineColor,
				strokeOpacity: 1.0,
				strokeWeight: lineWidth,
				fillColor: fillColor,
				geodesic: true,
				fillOpacity: opacity,
				clickable: false
			  });
			
			 temp_polygon.setMap(map);
			 polygon.push(temp_polygon);
			 
			var perm=1000*temp_areaPath2.inKm();
						
			perimDiv.innerHTML='<h3>Current Perimeter</h3><p>'+perm.toFixed(3)+'m OR '+(perm*3.2808399).toFixed(3)+'feet</p>';
			
			  
			areaMeters2=PlanarPolygonAreaMeters2(areacontainer[j]);
			totalarea+=areaMeters2;
			totalperim+=perm;
			
			div_currenttotalperim.innerHTML='<h3>Current Total Perimeter</h3><p>'+totalperim.toFixed(3)+'m OR '+(totalperim*3.2808399).toFixed(3)+'feet</p>';
			
			//update display for area
			areaDiv.innerHTML=Areas(areaMeters2);
			areaDivkm.innerHTML=Areaskm(areaMeters2);
			areaDivacre.innerHTML=Areasacre(areaMeters2);
			areaDivhectare.innerHTML=Areashectare(areaMeters2);
			areaDivm.innerHTML=AreasMiles(areaMeters2);
			areaDivsnm.innerHTML=AreasNatMiles(areaMeters2);
			areaDivfeet.innerHTML=Areasfeet(areaMeters2);
			
			temp_kmlcoordinates="";
			
			for(var i=0;i<areacontainer[j].length;++i)
			{
				var marker=placeMarker(areacontainer[j][i],i,j);
				areaMarkers.push(marker);
				if (togglemarkers_mode)
				{
					marker.setMap(map);
				}
				temp_kmlcoordinates+=areacontainer[j][i].lng() + "," + areacontainer[j][i].lat() + ",0 ";
			}
			arr_kmlcoordinates.push(temp_kmlcoordinates);
		
		}
		else
		{
			//the ployline
			temp_areaPath = new google.maps.Polyline({
				path: areacontainer[j],
				strokeColor: lineColor,
				strokeOpacity: 1.0,
				strokeWeight: lineWidth,
				geodesic: true
			});
			temp_areaPath.setMap(map);	
			areaPath.push (temp_areaPath);
			
			areaDiv.innerHTML='0 m&sup2;';
			areaDivkm.innerHTML='0 km&sup2;';
			areaDivacre.innerHTML='0 acres';
			areaDivhectare.innerHTML='0 hectare';
			areaDivm.innerHTML='0 square miles';	
			areaDivsnm.innerHTML='0 square nautical miles';	
			areaDivfeet.innerHTML='0 square feet';
		
			//markers
			for(var i=0;i<areacontainer[j].length;++i)
			{
				var marker=placeMarker(areacontainer[j][i],i,j);
				areaMarkers.push(marker);
				if (togglemarkers_mode)
				{
					marker.setMap(map);
				}
			}
		
			var perm=1000*temp_areaPath.inKm();
			//perimDiv.innerHTML='<h3>Current Perimeter</h3> <br/> '+perm.toFixed(3)+'m OR '+(perm*3.2808399).toFixed(3)+'feet';	
			if (areacontainer[j].length>1)
			{
				perimDiv.innerHTML='<h3>Current Perimeter</h3> <br/> '+perm.toFixed(3)+'m OR '+(perm*3.2808399).toFixed(3)+'feet <br/><strong>Note: This is a 2 sided perimeter so twice the distance between the 2 points.</strong>';
			}
			else
			{
				perimDiv.innerHTML='<h3>Current Perimeter</h3>';
			}
		}
		
		//only provide KML for last polygon (the current one)	
		kmlcoordinates=temp_kmlcoordinates;
		
		
	}
	//update display for total area
	totalareaDiv.innerHTML=Areas(totalarea);
	totalareaDivkm.innerHTML=Areaskm(totalarea);
	totalareaDivacre.innerHTML=Areasacre(totalarea);
	totalareaDivhectare.innerHTML=Areashectare(totalarea);
	totalareaDivm.innerHTML=AreasMiles(totalarea);
	totalareaDivsnm.innerHTML=AreasNatMiles(totalarea);
	totalareaDivfeet.innerHTML=Areasfeet(totalarea);
	
	totalarea=0;
	totalperim=0;
}

function addlatlngin()
{
	
	var latlngin=document.getElementById('tb_latlngin').value;
	
	//check for a lat/lng input, if it is not need to geocode it...
	if (/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/.test(latlngin))
	{	
		var pointsplit=latlngin.split(",");
		var point=new google.maps.LatLng(parseFloat(pointsplit[0]), parseFloat(pointsplit[1]));
				
		MapClick(null,point);
		document.getElementById('tb_latlngin').value="";
	}
	else
	{
		geocoder.geocode( { 'address': latlngin}, function(results, status) 
		{
			if (status == google.maps.GeocoderStatus.OK) 
			{      				
				var point = results[0].geometry.location;
				MapClick(null,point);				
			} 
			else 
			{
				//alert("Geocode was not successful for the following reason: " + status);
				document.getElementById("btn_go").value="Not Found";
			}
   		});
		//document.getElementById('tb_latlngin').value="";
	}
}


function MapClick(overlay,point)
{
	temp =(String(point).split(','));
	
	temp[0]=stripCharacter(temp[0],'(');
	temp[1]=stripCharacter(temp[1],')');
	
	areacontainer[areacontainer.length-1].push(point);
	Display();
}


function MapClickLater(point)
{
}

function stripCharacter(words,character) {
	  var spaces = words.length;
	  for(var x = 1; x<spaces; ++x){
	   words = words.replace(character, "");   
	}
	 return words;
}
	
	
function GreatCirclePoints(p1,p2)
{
	var maxDistanceMeters=200000.0;
	var ps=[];
	if(p1.distanceFrom(p2)<=maxDistanceMeters)
	{
		ps.push(p1);
		ps.push(p2);
	}
	else
	{
		var theta1=p1.lng()*radiansPerDegree;
		var phi1=(90.0-p1.lat())*radiansPerDegree;
		var x1=earthRadiusMeters*Math.cos(theta1)*Math.sin(phi1);
		var y1=earthRadiusMeters*Math.sin(theta1)*Math.sin(phi1);
		var z1=earthRadiusMeters*Math.cos(phi1);
		var theta2=p2.lng()*radiansPerDegree;
		var phi2=(90.0-p2.lat())*radiansPerDegree;
		var x2=earthRadiusMeters*Math.cos(theta2)*Math.sin(phi2);
		var y2=earthRadiusMeters*Math.sin(theta2)*Math.sin(phi2);
		var z2=earthRadiusMeters*Math.cos(phi2);
		var x3=(x1+x2)/2.0;
		var y3=(y1+y2)/2.0;
		var z3=(z1+z2)/2.0;
		var r3=Math.sqrt(x3*x3+y3*y3+z3*z3);
		var theta3=Math.atan2(y3,x3);
		var phi3=Math.acos(z3/r3);
		var p3=new GLatLng(90.0-phi3*degreesPerRadian,theta3*degreesPerRadian);
		var s1=GreatCirclePoints(p1,p3);
		var s2=GreatCirclePoints(p3,p2);
		for(var i=0;i<s1.length;++i)
		ps.push(s1[i]);
		for(var i=1;i<s2.length;++i)
		ps.push(s2[i]);
	}
	return ps;
}


function Areas(areaMeters2)
{
	var areaHectares=areaMeters2/meters2PerHectare;
	var areaKm2=areaMeters2/metersPerKm/metersPerKm;
	var areaFeet2=areaMeters2*feetPerMeter*feetPerMeter;
	var areaMiles2=areaFeet2/feetPerMile/feetPerMile;
	var areaAcres=areaMiles2*acresPerMile2;
	
	//cut out long stuff
	//return areaMeters2.toPrecision(4)+' m&sup2; / '+areaHectares.toPrecision(4)+' hectares / '+areaKm2.toPrecision(4)+' km&sup2; / '+areaFeet2.toPrecision(4)+' ft&sup2; / '+areaAcres.toPrecision(4)+' acres / '+areaMiles2.toPrecision(4)+' mile&sup2;';
	
	return areaMeters2.toFixed(2)+' m&sup2; ';
}

function AreasMiles(areaMeters2)
{
	var areaHectares=areaMeters2/meters2PerHectare;
	var areaKm2=areaMeters2/metersPerKm/metersPerKm;
	var areaFeet2=areaMeters2*feetPerMeter*feetPerMeter;
	var areaMiles2=areaFeet2/feetPerMile/feetPerMile;
	var areaAcres=areaMiles2*acresPerMile2;
	
	//cut out long stuff
	//return areaMeters2.toPrecision(4)+' m&sup2; / '+areaHectares.toPrecision(4)+' hectares / '+areaKm2.toPrecision(4)+' km&sup2; / '+areaFeet2.toPrecision(4)+' ft&sup2; / '+areaAcres.toPrecision(4)+' acres / '+areaMiles2.toPrecision(4)+' mile&sup2;';
	
	return (areaKm2*0.38610).toFixed(2)+' square miles';
}

function AreasNatMiles(areaMeters2)
{
	var areaHectares=areaMeters2/meters2PerHectare;
	var areaKm2=areaMeters2/metersPerKm/metersPerKm;
	var areaFeet2=areaMeters2*feetPerMeter*feetPerMeter;
	var areaMiles2=areaFeet2/feetPerMile/feetPerMile;
	var areaAcres=areaMiles2*acresPerMile2;
	
	//cut out long stuff
	//return areaMeters2.toPrecision(4)+' m&sup2; / '+areaHectares.toPrecision(4)+' hectares / '+areaKm2.toPrecision(4)+' km&sup2; / '+areaFeet2.toPrecision(4)+' ft&sup2; / '+areaAcres.toPrecision(4)+' acres / '+areaMiles2.toPrecision(4)+' mile&sup2;';
	
	return (areaKm2*0.291181).toFixed(2)+' square nautical miles';
}

function Areaskm(areaMeters2)
{
	var areaHectares=areaMeters2/meters2PerHectare;
	var areaKm2=areaMeters2/metersPerKm/metersPerKm;
	var areaFeet2=areaMeters2*feetPerMeter*feetPerMeter;
	var areaMiles2=areaFeet2/feetPerMile/feetPerMile;
	var areaAcres=areaMiles2*acresPerMile2;
	
	//cut out long stuff
	//return areaMeters2.toPrecision(4)+' m&sup2; / '+areaHectares.toPrecision(4)+' hectares / '+areaKm2.toPrecision(4)+' km&sup2; / '+areaFeet2.toPrecision(4)+' ft&sup2; / '+areaAcres.toPrecision(4)+' acres / '+areaMiles2.toPrecision(4)+' mile&sup2;';
	
	return areaKm2.toFixed(2)+' km&sup2;';
}

function Areasacre(areaMeters2)
{
	var areaHectares=areaMeters2/meters2PerHectare;
	var areaKm2=areaMeters2/metersPerKm/metersPerKm;
	var areaFeet2=areaMeters2*feetPerMeter*feetPerMeter;
	var areaMiles2=areaFeet2/feetPerMile/feetPerMile;
	var areaAcres=areaMiles2*acresPerMile2;
	
	return areaAcres.toFixed(2)+' acres';
}

function Areashectare(areaMeters2)
{
	var areaHectares=areaMeters2/meters2PerHectare;
	var areaKm2=areaMeters2/metersPerKm/metersPerKm;
	var areaFeet2=areaMeters2*feetPerMeter*feetPerMeter;
	var areaMiles2=areaFeet2/feetPerMile/feetPerMile;
	var areaAcres=areaMiles2*acresPerMile2;
	
	return areaHectares.toFixed(2)+' hectares';
}

function Areasfeet(areaMeters2)
{
	var areaHectares=areaMeters2/meters2PerHectare;
	var areaKm2=areaMeters2/metersPerKm/metersPerKm;
	var areaFeet2=areaMeters2*feetPerMeter*feetPerMeter;
	var areaMiles2=areaFeet2/feetPerMile/feetPerMile;
	var areaAcres=areaMiles2*acresPerMile2;
	areaAcres=areaAcres*43560;
	//cut out long stuff
	//return areaMeters2.toPrecision(4)+' m&sup2; / '+areaHectares.toPrecision(4)+' hectares / '+areaKm2.toPrecision(4)+' km&sup2; / '+areaFeet2.toPrecision(4)+' ft&sup2; / '+areaAcres.toPrecision(4)+' acres / '+areaMiles2.toPrecision(4)+' mile&sup2;';
	
	return areaAcres.toFixed(2)+' feet&sup2;';
}


function SphericalPolygonAreaMeters2(points) {
    var totalAngle = 0.0;
    for (i = 0; i < points.length; ++i) {
        var j = (i + 1) % points.length;
        var k = (i + 2) % points.length;
        totalAngle += Angle(points[i], points[j], points[k])
    }
    var planarTotalAngle = (points.length - 2) * 180.0;
    var sphericalExcess = totalAngle - planarTotalAngle;
    if (sphericalExcess > 420.0) {
        totalAngle = points.length * 360.0 - totalAngle;
        sphericalExcess = totalAngle - planarTotalAngle
    } else if (sphericalExcess > 300.0 && sphericalExcess < 420.0) {
        sphericalExcess = Math.abs(360.0 - sphericalExcess)
    }
    return sphericalExcess * radiansPerDegree * earthRadiusMeters * earthRadiusMeters
}

function PlanarPolygonAreaMeters2(points)
{
	var a=0.0;
	for(var i=0;i<points.length;++i)
	{
		var j=(i+1)%points.length;
		var xi=points[i].lng()*metersPerDegree*Math.cos(points[i].lat()*radiansPerDegree);
		var yi=points[i].lat()*metersPerDegree;
		var xj=points[j].lng()*metersPerDegree*Math.cos(points[j].lat()*radiansPerDegree);
		var yj=points[j].lat()*metersPerDegree;
		a+=xi*yj-xj*yi;
	}
	return Math.abs(a/2.0);
}

function Angle(p1,p2,p3)
{
	var bearing21=Bearing(p2,p1);
	var bearing23=Bearing(p2,p3);
	var angle=bearing21-bearing23;
	if(angle<0.0)
	angle+=360.0;
	return angle;
}

function Bearing(from,to)
{
	var lat1=from.lat()*radiansPerDegree;
	var lon1=from.lng()*radiansPerDegree;
	var lat2=to.lat()*radiansPerDegree;
	var lon2=to.lng()*radiansPerDegree;
	var angle=-Math.atan2(Math.sin(lon1-lon2)*Math.cos(lat2),Math.cos(lat1)*Math.sin(lat2)-Math.sin(lat1)*Math.cos(lat2)*Math.cos(lon1-lon2));
	if(angle<0.0)
	{
		angle+=Math.PI*2.0;angle=angle*degreesPerRadian;
	}
	return angle;
}

function genkml_lastarea()
{
	if (kmlcoordinates!="")
	{
		var mySplitResult = kmlcoordinates.split(" ");
		var tmpkmlcoordinates;
		//alert (kmlcoordinates);
		tmpkmlcoordinates= kmlcoordinates+mySplitResult[0];
		//alert (kmlcoordinates);
		
		div_kmloutput.style.visibility='visible';
		
		var description=document.getElementById("area").innerHTML + " | "+document.getElementById("areakm").innerHTML + " | "+document.getElementById("areaacre").innerHTML + " | "+document.getElementById("areahectare").innerHTML + " | "+document.getElementById("areafeet").innerHTML + " |"+document.getElementById("sqmiles").innerHTML + " | "+document.getElementById("sqnautmiles").innerHTML;
	
		MakeKMLfile("Daft Logic Google Maps Area Calculator Tool",description,tmpkmlcoordinates,false);
	 }
}

function genkml()
{
	var str_multiarea="";
	
	for (i in arr_kmlcoordinates) 
	{
		kmlcoordinates=arr_kmlcoordinates[i];
	
		if (kmlcoordinates!="")
		{
			var mySplitResult = kmlcoordinates.split(" ");
			var tmpkmlcoordinates;
			tmpkmlcoordinates= kmlcoordinates+mySplitResult[0];
			
			div_kmloutput.style.visibility='visible';
					
			//multiple Areas seperated by hash 
			str_multiarea+="#" + tmpkmlcoordinates;
		 }		
	}
	
	
	//remove first #
	str_multiarea = str_multiarea.substring(1);
	
	var description="Daft Logic Area Calculator"
	
	if (arr_kmlcoordinates.length == 1)
	{
		description=document.getElementById("area").innerHTML + " | "+document.getElementById("areakm").innerHTML + " | "+document.getElementById("areaacre").innerHTML + " | "+document.getElementById("areahectare").innerHTML + " | "+document.getElementById("areafeet").innerHTML + " |"+document.getElementById("sqmiles").innerHTML + " | "+document.getElementById("sqnautmiles").innerHTML;
	}
	
	//console.log(str_multiarea);
	
	MakeKMLfile("Daft Logic Google Maps Area Calculator Tool",description,str_multiarea,true);
}


function MakeKMLfile(name,description,kmlcoordinates,bool_isitamultikml)
{
	var xmlHttp;
	
	try
	{
		// Firefox, Opera 8.0+, Safari
		xmlHttp=new XMLHttpRequest();
	}
	catch (e)
	{
		// Internet Explorer
		try
		{
			xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (e)
		{
			try
			{
				xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch (e)
			{
				alert("Your browser does not support AJAX!");
				return false;
			}
		}
	}
	
	xmlHttp.onreadystatechange=function()
	{
		if(xmlHttp.readyState==4)
		{
			
			var linktext="";
			
			if ((arr_kmlcoordinates.length>1)&&(bool_isitamultikml))
			{
				linktext="<h2><a href='downloads/kml/"+xmlHttp.responseText+"'>Download KML File Here</a></h2><a href='#' onclick='div_kmloutput.innerHTML=\"\";genkml_lastarea();return false;'>Only want the last area</a>?<br/>";
			}
			else
			{
				linktext="<h2><a href='downloads/kml/"+xmlHttp.responseText+"'>Download KML File Here</a></h2><br/>";
			}
			div_kmloutput.innerHTML=linktext;

		}
	};
	var randomnumber=Math.floor(Math.random()*9999);

	var params;
	params="rand="+randomnumber;
	params+="&name="+name;
	params+="&description="+description;
	params+="&kmlcoordinates="+kmlcoordinates;
	
	//console.log(params);
	
	xmlHttp.open("POST","includes/ajax/gmac-makekml3.php",true);

	//Send the proper header information along with the request
	xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	xmlHttp.send(params);	
}

function placeMarker(location,number,index) 
{
	var image = new google.maps.MarkerImage('https://www.daftlogic.com/images/gmmarkersv3/stripes.png',
	// This marker is 20 pixels wide by 32 pixels tall.
	new google.maps.Size(20, 34),
	// The origin for this image is 0,0.
	new google.maps.Point(0,0),
	// The anchor for this image is the base of the flagpole at 0,32.
	new google.maps.Point(9, 33));

	var marker = new google.maps.Marker({position:location,icon:image,draggable:true,title:location.toString()});
	
	var f = function(index,number)
	{
		return function()
		{
			areacontainer[index][number]=marker.position;
			Display();
		}
	};

	google.maps.event.addListener(marker,'dragend',f(index,number));
	google.maps.event.addListener(marker, 'rightclick', function() {
    	areacontainer[index].splice(number, 1);
		Display();
  	});
	

	return marker;
}

function placeMarkerStatic() 
{
	if (staticmarker)
	{
		staticmarker.setMap(null);
		staticmarker=null;
		document.getElementById("div_outputaddress").innerHTML="";
		return null;
	}
	else
	{
		//console.log("placeMarkerStatic");	
		var image = new google.maps.MarkerImage('https://www.daftlogic.com/images/gmmarkersv3/stripes.png',
		// This marker is 20 pixels wide by 32 pixels tall.
		new google.maps.Size(20, 34),
		// The origin for this image is 0,0.
		new google.maps.Point(0,0),
		// The anchor for this image is the base of the flagpole at 0,32.
		new google.maps.Point(9, 33));
	
		staticmarker = new google.maps.Marker({position:map.getCenter(),icon:image,draggable:true,map:map});
		
		
		var f = function()
		{
			return function()
			{
				//console.log("dragend");
				map.setCenter(staticmarker.position);
				ftn_estaddress();
			}
		};
	
		google.maps.event.addListener(staticmarker,'dragend',f());
	
		ftn_estaddress();
		
		return staticmarker;
	}
}

google.maps.Polyline.prototype.inKm = function(n)
{
	var a = this.getPath(n), len = a.getLength(), dist = 0;
	
	for(var i=0; i<len-1; i++)
	{
  		dist += a.getAt(i).kmTo(a.getAt(i+1));
		//alert (dist);
	}
	if (len>1)
	{
		dist += a.getAt(0).kmTo(a.getAt(len-1));
		//alert (dist);
	}
	return dist;
};

google.maps.LatLng.prototype.kmTo = function(a)
{
	var e = Math, ra = e.PI/180;
	var b = this.lat() * ra, c = a.lat() * ra, d = b - c;
	var g = this.lng() * ra - a.lng() * ra;
	var f = 2 * e.asin(e.sqrt(e.pow(e.sin(d/2), 2) + e.cos(b) * e.cos(c) * e.pow(e.sin(g/2), 2)));
	return f * 6378.137;
};

function ftn_estaddress() 
{
	geocoder.geocode({'latLng': map.getCenter()}, function(results, status) 
	{
		if (status == google.maps.GeocoderStatus.OK) 
		{
        	if (results[1]) 
			{
		  		document.getElementById("div_outputaddress").innerHTML=results[0].formatted_address;
        	}
      	} 
		else 
	  	{
			document.getElementById("div_outputaddress").innerHTML="[Not Found]";
      	}
	});
}


function ftn_exportlantlng()
{
	document.getElementById("div_exportlantlng").style.display = 'inline';
	var str_outputHTML;
	
	str_outputHTML='<br/><center><h2>Latitude Longitude Output</h2><textarea rows="6" cols="50">';
	
	
	for(var j=0;j<areacontainer.length;++j)
	{	
		//give a header for each area if there is more than 1
		if (areacontainer.length>1)
		{
			//A gap before the 2nd,3rd,4th ... areas
			if (j>2)
			{
				str_outputHTML+='\n';
			}
			str_outputHTML+='Area '+ (j+1) + '\n';
		}
		for(var i=0;i<areacontainer[j].length;++i)
		{
			str_outputHTML += areacontainer[j][i].lng() + "," + areacontainer[j][i].lat() + "\n";
		}
	}
	//remove last instance of \n
	str_outputHTML = str_outputHTML.substring(0, str_outputHTML.length - 2);
	
	str_outputHTML+='</textarea></center>';
	
	document.getElementById("div_exportlantlng").innerHTML = str_outputHTML;
}