const zipForm = document.querySelector('#zipForm');

const updateCity = async (zip) => {
	const zipDeets = await getCity(zip);	
	const weatherObj = await getCurrentConditions(zipDeets);

	return {
		zipDeets,
		weatherObj
	};
};


zipForm.addEventListener('submit', event => {
	//Prevent default action
	event.preventDefault();

	const zipCode = zipForm.zipInput.value.trim();

	updateCity(zipCode)
	.then(data => updateUI(data))
	.catch(err => console.log(err));

});




// --------------------------   Old Weather App written in ES5 and with wunderground api that no longer works ---------------

// var apiURL, coords, tempf, tempc, description, iconUrl, zipcode, parsed_j;
// apiURL = "https://api.wunderground.com/api/6a56195971c2cdb2/geolookup/conditions/q/";


// //function for api and create map
// function api(weatherLocation){
// 	$.ajax({
//   			url : apiURL + weatherLocation + ".json",
//   			dataType : "jsonp",
//   			success : function(parsed_json) {
// 					parsed_j = parsed_json;
//   				var locationCity = parsed_json.location.city;
// 					var locationCountry = parsed_json.location.country;
//   				tempf = parsed_json.current_observation.temp_f;
// 					tempc = parsed_json.current_observation.temp_c;
// 					description = parsed_json.current_observation.weather;
// 					icon = parsed_json.current_observation.icon;
// 					iconUrl = "https://icons.wxug.com/i/c/i/"+icon+".gif";
// 					var location = ("<p>"+locationCity+", "+locationCountry+"</p>");
// 					var temp = ("<p><a id='degrees' class='fahrenheit'>"+tempf+"° F</a></p>");

// 					$("#weth").html(location+temp+"<p>"+description+"</p><p><img src='"+iconUrl+"' alt='"+description+"'</p>");
					
// 					//remove old map and create new map
// 					$("#localMap").remove();
// 					var img = new Image();
//     			img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" +weatherLocation + "&zoom=10&size=300x300&sensor=false";
// 					img.id = "localMap";
// 					var output = document.getElementById("out");
//     			output.appendChild(img);
// 				}
//   		});
// }

// // //function to find location and then load weather info
// function findMe() {
//   if (!navigator.geolocation){
//     $("#out").text("Geolocation is not supported by your browser");
//     return;
//   }

//   function success(position) {
// 		coords = position.coords.latitude+ "," +position.coords.longitude;
// 		//remove button after click
// 		$("#locateMe").remove();
		
// 		//ajax call to get weather from wunderground
// 		api(coords);
//   }

//   function error() {
//     $("#out").text("Unable to retrieve your location");
//   }

//   navigator.geolocation.getCurrentPosition(success, error);
// }

// // //form validation function
// function validateForm(x) {
//     if (x == "" || isNaN(x) || x > 99999 || x<00001) {
//         alert("Please Enter a Valid Zipcode");
//         return false;
//     }
// }

// $(document).ready(function(){
// 	//listener added for dynamically created F/C temperatures toggle
// 	document.body.addEventListener( 'click', function ( event ) {
// 			if( event.srcElement.id == 'degrees' ) {

// 						$('#degrees').toggleClass('celcius');
// 						$('#degrees').toggleClass('fahrenheit');

// 						if ($('#degrees').hasClass('fahrenheit')) {
// 							$('#degrees').text(tempf + "° F");
// 							return;
// 						}

// 						$('#degrees').text(tempc + "° C");
// 			}

// 			if(event.srcElement.id == 'locateMe') {
// 				findMe();
// 			}
// 		});
	
// 		// submit form with Enter key
// 	$('#zipcode').keypress(function(event) {
// 		// Number 13 is the "Enter" key on the keyboard
// 		if (event.keyCode === 13) {
// 			// Trigger the button element with a click
// 			$('#submitZip').click();
// 		}
// 	});
	
// 	//prevent form submission from reloading page
// 	$('#zipForm').submit(function(e) {
// 		e.preventDefault();
// 	});
	
// 	$("#submitZip").click(function(){
// 		zipcode = $("#zipcode").val();
// 		api(zipcode);
// 	});


// });