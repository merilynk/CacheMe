import { distanceBetween } from "geofire-common";
import getLocation from "./location";

export default async function getUserDistanceFromPost(postLat: number, postLong: number) {
    const loc = await getLocation();
    let currUserLat = loc?.coords.latitude as number;
    let currUserLong = loc?.coords.longitude as number;
    return Math.round(distanceBetween([currUserLat, currUserLong], [postLat, postLong]));
}