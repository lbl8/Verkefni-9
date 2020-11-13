import L from 'leaflet';
import { format } from 'date-fns';

let map;

// Býr til popup á korti út frá geojson með content
export function createPopup(geojson) {
  // TODO
  return L.geoJSON(geojson, {
    style(feature) {
      return { color: feature.properties.color };
    },
  }).bindPopup((layer) => `
      <h2>${layer.feature.properties.title}</h2>
        <p>${format(layer.feature.properties.time, 'dd.MM.yyy kk:mm:ss')}</p>
        <a href="${layer.feature.properties.url}" target="_blank">Skoða nánar</a>
        `).addTo(map);
}

// Býr til Leaflet kort og setur miðju á (0, 0) í zoom level 2
export function init(el) {
  // TODO
  const option = {
    center: [0, 0],
    zoom: 2,
  };

  map = L.map(el, option);

  // Bætum við "tiles" frá OSM sem eru open source. Gætum líka
  // notað frá Google, mapbox eða fleirum en þyrftum þá aðgang
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
  }).addTo(map);
  return map;
}