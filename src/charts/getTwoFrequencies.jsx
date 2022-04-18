export function getTwoFrequencies(data, fieldX, fieldY) {
    //empty object is created
    const result = {
        fieldXLabels: [], fieldYLabels: [],
        finalCounts: [/*xValue {[yValueFrequency, otherYValueFrequency], otherXValue [] */]
    };

    //check that fields exist
    if (fieldX in data[0] && fieldY in data[0]) {

        let counts = {}
        //for every row 
        for (const row of data) {
            const currID = row["id_number"]


            //add that x category for that id number
            if (row[fieldX] != undefined && row[fieldX] != "") {
                //adds label if not already known
                if (!result.fieldXLabels.includes(row[fieldX])) {
                    result.fieldXLabels.push(row[fieldX])
                }

                //counts
                if (currID in counts) {
                    counts[currID].fieldX.push(row[fieldX])
                }
                else {
                    counts[currID] = { fieldX: [row[fieldX]] }
                }
            }

            //add that y category for that id number
            if (row[fieldY] != undefined && row[fieldY] != "") {
                if (!result.fieldYLabels.includes(row[fieldY])) {
                    result.fieldYLabels.push(row[fieldY])
                }

                if (currID in counts) {
                    if (fieldY in counts[currID]) {
                        counts[currID].fieldY.push(row[fieldY])
                    }
                    counts[currID].fieldY = [row[fieldY]]
                }
                else {
                    counts[currID] = { fieldY: [row[fieldY]] }
                }
            }

        }

        const matrix = countPairs(counts, result)
        result.finalCounts = fillEmptySpots(matrix)
        return result;
    }
    return null;
}

function countPairs(counts, result) {
    var matrix = makeEmptyArray(result.fieldYLabels.length, result.fieldXLabels.length)
    for (const study in counts) {
        var arr = counts[study].fieldX
        arr.forEach(
            categoryX => counts[study].fieldY.forEach(
                categoryY => {
                    const xNo = result.fieldXLabels.indexOf(categoryX)
                    const yNo = result.fieldYLabels.indexOf(categoryY)
                    if (typeof matrix[xNo] === 'undefined') {
                        matrix[xNo] = []
                    }

                    if (typeof matrix[xNo][yNo] === 'undefined') {
                        matrix[xNo][yNo] = 1;
                    }
                    else {
                        matrix[xNo][yNo]++;
                    }

                }
            )
        )
    }
    return matrix
}


function fillEmptySpots(matrix) {//with zeros
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            if (!matrix[i][j]) {
                matrix[i][j] = 0
            }
        }
    }
    return matrix
}


function makeEmptyArray(d1, d2) {
    var arr = [];
    for (let i = 0; i < d2; i++) {
        arr.push(new Array(d1));
    }
    return arr;
}