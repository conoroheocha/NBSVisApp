export function getCoordinates(arr) {
    let markers = []
    let currId = 0;
    if ("latitude" in arr[0] && "longitude" in arr[0]) {
        for (const item of arr) {
            currId += 1
            if (item.id_number.trim().length > 0 && item["latitude"] != "" && item["longitude"] != "") {
                markers.push({ id: currId, coordinates: [item["longitude"], item["latitude"]] })
            }
        }
    }
    return markers;
}