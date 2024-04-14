let mapOptions = {
    center:[51.110203, 17.032979],
    zoom:12
}

let map = new L.map('map' , mapOptions);

let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
map.addLayer(layer);


let apiKey = "aacfa879748e45b291751d430282f092",
    marker = null;


const addressSearchControl = L.control.addressSearch(apiKey, {
    position: 'topleft',

	//set it true to search addresses nearby first
    mapViewBias:true,

    //Text shown in the Address Search field when it's empty
    placeholder:"Enter an address here",

    // /Callback to notify when a user has selected an address
    resultCallback: (address) => {
		// If there is already a marker remove it
        if (marker) {
          	marker.remove();
        }
		//Prevent throwing Errors when the address search box is empty
		if (!address) {
				return;
		}
     	
		//add marker 
		marker = L.marker([address.lat, address.lon]).addTo(map);
		//Sets the view of the map (geographical center and zoom) with the given animation options.
        console.log([address.lat, address.lon]);
		map.setView([address.lat, address.lon], 20);
      },


      //Callback to notify when new suggestions have been obtained for the entered text
      suggestionsCallback: (suggestions) => {
        console.log(suggestions);
      }
});


map.addControl(addressSearchControl);

