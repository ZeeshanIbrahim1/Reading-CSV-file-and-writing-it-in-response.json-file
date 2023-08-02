const fs = require('fs');
const csvFilePath = './data.csv'; 
const jsonFilePath = './outputAct.json';
const jsonData = {};
let processed = false;

function parsing(data) {
    let rows = data.split(/\r?\n/);
    let parsedData = rows.map(row => row.split(','));
    return parsedData;
}

function CreateOutput(jsonStr){
    if (processed) {
        return; 
    }
    fs.writeFile(jsonFilePath, jsonStr, (err) => {
              if (err) {
                console.error('Error writing JSON file:', err);
              } else {
                console.log(`Data has been converted and saved to ${jsonFilePath}`);
                processed = false;
}
    })}
function createJSON(data,jsonData){
    data.forEach((obj) => {
        const region_name = obj.region_name;
        const series_reference = obj.series_reference;

        if(!jsonData[region_name]){
            jsonData[region_name] = {
                "series_reference" : series_reference,
                "data":[]
            }
        }
        dataObj = {
            "period": obj.period,
                "filled jobs": obj['filled jobs'],
                "filled jobs revised": obj['filled jobs'],
                "filled jobs diff":  obj['filled jobs revised'],  
                "filled jobs % diff":  obj['filled jobs diff'],    
                "total_earnings":  obj.total_earnings,    
                "total earnings revised":  obj['total earnings revised'],    
                "earnings diff":  obj['earnings diff'],  
                "earnings % diff":  obj['earnings diff'],
        }
        jsonData[region_name].data.push(dataObj);

        
      });
      return jsonData;
}



function assigningHeader(data2, header) {
    // Here, data2 is an array of arrays containing the values of each row
    // And 'header' is an array representing the header row
    let result = [];
    for (let row of data2) {
        let obj = {};
        for (let i = 0; i < header.length; i++) {
            obj[header[i]] = row[i];
        }
        result.push(obj);
    }
    return result;
}


fs.readFile(csvFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
    } else {
        let parsedData = parsing(data);
        let header = parsedData.shift(); 
        let arr = assigningHeader(parsedData, header);
        let createdJSON = createJSON(arr,jsonData);
        let jsonStr = JSON.stringify(createdJSON,null,2);
        CreateOutput(jsonStr);
    }
});

