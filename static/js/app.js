let data     = ''
let names    = ''
let metadata = ''
let samples  = ''
let sample_instance = ''

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

    sample_instance = getSamplesByID(id);

    otu_ids       = sample_instance[otu_ids_idx];
    otu_labels    = sample_instance[otu_labels_idx];
    sample_values = sample_instance[sample_values_idx];

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

function showBubbleChart(id)
{
    const otu_ids_idx        = 0;
    const otu_labels_idx     = 1;
    const sample_values_idx  = 2;

    otu_ids       = sample_instance[otu_ids_idx];
    otu_labels    = sample_instance[otu_labels_idx];
    sample_values = sample_instance[sample_values_idx];

    var trace = [{
        x: otu_ids,
        y: sample_values,
        text: ['A<br>size: 40', 'B<br>size: 60', 'C<br>size: 80', 'D<br>size: 100'],
        mode: 'markers',
        marker: {
          color: otu_ids,
          size: sample_values
        }
      }];
      
      //#endregionvar layout = {
        //showlegend: false,
       // height: 600,
       // width: 600
      //};
      
      Plotly.newPlot('bubble', trace);

}

function getSamplesByID(id) {

    let sample_data   = '';

    for (const [key, value] of Object.entries(samples)) {

        record_id = value["id"]; //value is the dict

        if (Number(record_id) === Number(id)) {

            console.log('The selected record id is ' + value["id"]);

            let otu_ids = value["otu_ids"].slice(0,10);

            otu_ids = otu_ids.map(x=>'OTU ' + x.toString()).reverse()

            let otu_labels    = value["otu_labels"].slice(0,10).reverse();
            let sample_values = value["sample_values"].slice(0,10).reverse();

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
        showBarChart(id);
        showBubbleChart(id);
    }
}

function reset_page() {
    alert("in reset page");
}

init();