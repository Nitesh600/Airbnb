
	mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
        container: 'map',
        style: "mapbox://styles/mapbox/streets-v12", // container ID
        center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 9 // starting zoom
    });

    const marker  = new mapboxgl.Marker({color: "red"})
    .setLngLat(listing.geometry.coordinates)   // listing.geometry.coordinates
    .setPopup(new mapboxgl.Popup().setHTML(
        `<h5>${listing.title}</h5><p>Exact location provided after booking.</p>`)
    ) 
    .addTo(map);