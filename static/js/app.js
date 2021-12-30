let data     = ''
let names    = ''
let metadata = ''
let samples  = ''

async function init() {
    const response = await fetch("./data/samples.json");
    data = await response.json();
    //console.log(data);

    // Create an array of each country's numbers
    names    = Object.values(data.names);
    metadata = Object.values(data.metadata);
    samples  = Object.values(data.samples);

    //console.log(samples)

    bindDropdown(names);


    //Plotly.newPlot("bar", null);



    // Create an array of music provider labels
    //const labels = Object.keys(data.us);

    // Make a note to comment on Object.entries

    // Display the default plot
    //const trace = [{
    // values: us,
    //labels: labels,
    //type: "pie"
    //}];

    //const layout = {
    // height: 600,
    //  width: 800
    //};

    //Plotly.newPlot("pie", trace, layout);

    // On change to the DOM
    document.querySelector("#selDataset").addEventListener("change", event => {

        // Initialize an empty array for the country's data
        //let data = [];

        //if (event.target.value == 'us') {
        //data = us;
        //}
        //else if (event.target.value == 'uk') {
        //data = uk;
        //}
        //else if (event.target.value == 'canada') {
        //data = canada;
        //}

        //Plotly.restyle("pie", "values", [data]);
    });
}

//https://www.geeksforgeeks.org/how-to-create-a-dropdown-list-with-array-values-using-javascript/
function bindDropdown(names) {
    ddl = document.getElementById('selDataset')

    for (i = 0; i < names.length; i++) {
        if (i === 0) ///build default option
        {
            let el = document.createElement("option");
            el.textContent = "";
            el.value = -1;
            ddl.appendChild(el);
        }

        let el = document.createElement("option");
        el.textContent = names[i];
        el.value = names[i];
        ddl.appendChild(el);
    }
}

function showMetadata(id) {
    let meta = getMetadataById(id);

    let sample_data_div = document.getElementById('sample-metadata');

    sample_data_div.innerHTML = '';

    for (const [key, value] of Object.entries(meta)) {
        const div = document.createElement("div");
        div.className = 'sample_meta';
        div.innerText = key + ":" + value;
        sample_data_div.appendChild(div);
    }
}

function getMetadataById(id) {
    let instance_metadata = '';

    //https://stackoverflow.com/questions/34913675/how-to-iterate-keys-values-in-javascript
    for (const [key, value] of Object.entries(metadata)) {
        record_id = value["id"]; //value is the dict

        if (Number(record_id) === Number(id)) {
            instance_metadata = value;
            break;
        }
    }
    return instance_metadata;
}

function showBarChart(id)
{
    const otu_ids_idx        = 0;
    const otu_labels_idx     = 1;
    const sample_values_idx  = 2;

    let sample_data = getSamplesByID(id);

    otu_ids       = sample_data[otu_ids_idx];
    otu_labels    = sample_data[otu_labels_idx];
    sample_values = sample_data[sample_values_idx];

    console.log(otu_ids);
    console.log(otu_labels);
    console.log(sample_values);

    trace = [{
                x: sample_values,
                y: otu_ids,
                type: 'bar',
                text: otu_labels,
                orientation:'h',
            }];

   //Display the default plot
    // const trace = [{
    //                    values: otu_ids,
    //                    labels: sample_values,
    //                    type: "bar"
    //                 }];

    //const layout = {
                       //height: 600,
                       //width: 800
                   //};

    Plotly.newPlot("bar", trace);
}

function getSamplesByID(id) {

    let sample_data   = '';

    for (const [key, value] of Object.entries(samples)) {

        record_id = value["id"]; //value is the dict

        if (Number(record_id) === Number(id)) {

            console.log('The selected record id is ' + value["id"]);

            let otu_ids       = value["otu_ids"].slice(0,10);
            let otu_labels    = value["otu_labels"].slice(0,10);
            let sample_values = value["sample_values"].slice(0,10);

            sample_data = [otu_ids,otu_labels,sample_values];

            break;
        }
    }   

    return sample_data;
}

function optionChanged(id) {
    if (id === -1) {
        reset_page();
    }
    else 
    {
        showMetadata(id);
        showBarChart(id)
    }
}

function reset_page() {
    alert("in reset page");
}

init();