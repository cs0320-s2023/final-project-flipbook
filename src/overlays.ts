import { FeatureCollection } from "geojson";
import { FillLayer, SymbolLayer } from "react-map-gl";

//TODO: use these lines for mocking
// // Import the raw JSON file
// import rl_data from "./geodata/fullDownload.json";

// // you may need to rename the donwloaded .geojson to .json

/**
 * The interface for the list of annotations
 */
export interface AnnotationList {
  features: Annotation[];
  type: string;
}

/**
 * The interface for the annotation data
 */
export interface Annotation {
  text: string;
  lat: number;
  lon: number;
}

/**
 * Fetches the JSON data from the backend
 * @param args the arguments to pass to the backend
 * @returns a Promise<GeoJSON.FeatureCollection> that resolves to the JSON data
 */
function fetchJSONData(args: number[]) {
  return new Promise((resolve, reject) => {
    fetch(
      "http://localhost:3232/filter?minLat=" +
        args[0] +
        "&maxLat=" +
        args[1] +
        "&minLon=" +
        args[2] +
        "&maxLon=" +
        args[3]
    )
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      })
      .catch(console.error);
  }).catch(console.error);
}

/**
 * Fetches the Annotation data from the backend
 * @returns a Promise<AnnotationList> that resolves to the JSON data
 */
function fetchAnnotationData() {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:3232/getAnnotations")
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      })
      .catch(console.error);
  }).catch(console.error);
}

/**
 * Checks if the JSON data is a FeatureCollection
 * @param json the JSON data to check
 * @returns true if the JSON data is a FeatureCollection, false otherwise
 */
function isFeatureCollection(json: any): json is FeatureCollection {
  return json.type === "FeatureCollection";
}
/**
 * Checks if the JSON data is an AnnotationList
 * @param json the JSON data to check
 * @returns true if the JSON data is an AnnotationList, false otherwise
 */
function isAnnotationList(json: any): json is AnnotationList {
  return json.type === "annotationList";
}

/**
 * Fetches the GeoJSON data from the backend
 * @returns a Promise<GeoJSON.FeatureCollection | undefined> that resolves to the GeoJSON data
 */
export async function overlayData(): Promise<
  GeoJSON.FeatureCollection | undefined
> {
  let jsonData = await fetchJSONData([24, 48, -160, -60]);
  return isFeatureCollection(jsonData) ? jsonData : undefined;
}

const propertyName = "holc_grade";

/**
 * The layer that displays the GeoJSON data
 */
export const geoLayer: FillLayer = {
  id: "geo_data",
  type: "fill",
  paint: {
    "fill-color": [
      "match",
      ["get", propertyName],
      "A",
      "#5bcc04",
      "B",
      "#04b8cc",
      "C",
      "#e9ed0e",
      "D",
      "#d11d1d",
      "#ccc",
    ],
    "fill-opacity": 0.2,
  },
};

/**
 * Fetches the annotation data from the backend using the fetchAnnotationData
 * function, and checks if the data is an AnnotationList
 *
 * @returns the annotation data from the backend
 */
export async function annotationData(): Promise<AnnotationList | undefined> {
  let jsonData = await fetchAnnotationData();
  return isAnnotationList(jsonData) ? jsonData : undefined;
}
