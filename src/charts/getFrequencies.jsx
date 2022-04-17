export function getFrequencies(arr, field) {
    const counts = {};
    if (field in arr[0]) {
        for (const item of arr) {
            if (item.id_number.trim().length > 0 && item[field] != "") {
                counts[item[field]] = counts[item[field]] ? counts[item[field]] + 1 : 1;
            }
        }
        return counts;
    }
    return null;
}
