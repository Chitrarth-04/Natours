

export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiY2hpdHJhcnRoMDQiLCJhIjoiY21ncW9tOGF2MWwyeTJrcjV3NWQ3c3JoeiJ9.gydZzpjz2HbBvMYDGGfY9Q';

  var map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/chitrarth04/cmgqshxf000ck01qsa87gg9xr', // style URL
    scrollZoom: false,
    // center: [-118.113491,34.111745],
    // zoom: 4
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // add popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
