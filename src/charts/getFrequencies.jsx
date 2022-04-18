export function getFrequencies(arr, field, filter, filterField) {
    const counts = {};
    if (field in arr[0]) {
        for (const item of arr) {
            if (item.id_number.trim().length > 0 && item[field] != "" && item[filterField] == filter) {
                counts[item[field]] = counts[item[field]] ? counts[item[field]] + 1 : 1;
            }
        }

        const keys = Object.keys(counts)

        const values = Object.values(counts)
        const datasets = { data: values }
        const result = { labels: keys, datasets: [datasets] }
        return result;
    }
    return null;
}