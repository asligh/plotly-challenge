let data     = ''

let names    = ''
let metadata = ''
let samples  = ''


async function init() {
    const response = await fetch("./data/samples.json");
    data = await response.json();

    // Create an array of each country's numbers
    names    = Object.values(data.names);
    metadata = Object.values(data.metadata);
    samples  = Object.values(data.samples);

    first_id = bindDropdown(names);

    load_page(first_id);
}

//https://www.geeksforgeeks.org/how-to-create-a-dropdown-list-with-array-values-using-javascript/
function bindDropdown(names) {

    first_id = 0;

    ddl = document.getElementById('selDataset');

    for (i = 0; i < names.length; i++) 
    {

        if(i===0)
        {
            first_id = names[i];
        }

        let el = document.createElement("option");
        el.textContent = names[i];
        el.value = names[i];
        ddl.appendChild(el);
    }

    return first_id;
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

    let sample_instance = getSamplesByID(id);

    let otu_ids_bc        = sample_instance[otu_ids_idx].map(x=>'OTU ' + x.toString()).slice(0,10).reverse();;
    let otu_labels_bc     = sample_instance[otu_labels_idx].slice(0,10).reverse();
    let sample_values_bc  = sample_instance[sample_values_idx].slice(0,10).reverse();;

    //console.log(otu_ids_bc);
    //console.log(otu_labels_bc);
    //console.log(sample_values_bc);

    trace = [{
                x: sample_values_bc,
                y: otu_ids_bc,
                type: 'bar',
                text: otu_labels_bc,
                orientation:'h',
            }];

    Plotly.newPlot("bar", trace);
}

function showBubbleChart(id)
{
    const otu_ids_idx        = 0;
    const otu_labels_idx     = 1;
    const sample_values_idx  = 2;

    
    let sample_instance = getSamplesByID(id);

    let otu_ids       = sample_instance[otu_ids_idx];
    let otu_labels    = sample_instance[otu_labels_idx];
    let sample_values = sample_instance[sample_values_idx];

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
      
      Plotly.newPlot('bubble', trace);
}

function getSamplesByID(id) {

    let sample_data   = '';

    for (const [key, value] of Object.entries(samples)) {

        record_id = value["id"]; //value is the dict

        if (Number(record_id) === Number(id)) {

            console.log('The selected record id is ' + value["id"]);

            let otu_ids       = value["otu_ids"]
            let otu_labels    = value["otu_labels"]
            let sample_values = value["sample_values"]

            sample_data = [otu_ids,otu_labels,sample_values];

            break;
        }
    }   

    return sample_data;
}

function optionChanged(id) 
{
    load_page(id)
}

function load_page(id)
{
    showMetadata(id);
    showBarChart(id);
    showBubbleChart(id);
}

init();