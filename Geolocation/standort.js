
var output = document.getElementById("standort");
var curlat;
var curlon;

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    
  } else { 
    output.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  output.innerHTML = "Ihr Breitengrad: " + position.coords.latitude
	+ ",  Ihr Laengengrad: " + position.coords.longitude + " (auf " 
	+ position.coords.accuracy + "m genau)";

	curlat = position.coords.latitude;
	curlon = position.coords.longitude;
	showDistanceBeuth();
	initMap();
}


function showDistanceBeuth()
{
	var beuthlon = 13.351617;
	var beuthlat = 52.545325;
	
	document.getElementById("entfernung").innerHTML = "Entfernung zur Beuth Hochschule: " + 
	getDistance(curlat, curlon, beuthlat, beuthlon) + " km";
}

function getDistance(lat1, lon1, lat2, lon2)
{
	var R = 6371; // Radius of the earth in km
  	var dLat = deg2rad(lat2-lat1);  // deg2rad below
  	var dLon = deg2rad(lon2-lon1); 
  	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
 	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  	var d = R * c; // Distance in km
  
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180);
}

function initMap() {
  // The location of current position
  var curPos = {lat: parseFloat(curlat), lng: parseFloat(curlon)};
  // The map, centered at current position
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 8, center: curPos});
  // The marker, positioned at curren position
  var marker = new google.maps.Marker({position: curPos, map: map});
}

getLocation();
