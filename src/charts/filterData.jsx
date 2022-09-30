export function filterData(data, filter) {
    //check is there a filter
    //check if include exists

    var subData = data;

    if (filter !== undefined && filter.include !== undefined && filter.exclude !== undefined && (filter.include.length != 0 || filter.exclude.length != 0)) {

        //get the items where its included
        for (const filterItem of filter.include) {
            let key = Object.keys(filterItem)[0]
            //get lines where they match
            let validLines = subData.filter(res => res[key] && filterItem[key].includes(res[key]));

            //get all lines with those ids
            let validKeys = validLines.map(res => res.id_number);

            //only include those with their keys
            subData = subData.filter(res => validKeys.includes(res.id_number))
        }

    }

    //return now filter object
    return subData
}
