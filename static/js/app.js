let data     = ''
let names    = ''
let metadata = ''
let samples  = ''

async function main() {
    const response = await fetch("./data/samples.json");
    data = await response.json();
    //console.log(data);
  
    // Create an array of each country's numbers
    names     = Object.values(data.names);
    metadata  = Object.values(data.metadata);
    samples   = Object.values(data.samples);

    console.log(samples)

    bindDropdown(names)
  
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
  function bindDropdown(names)
  {
    ddl = document.getElementById('selDataset')

    for (i=0;i<names.length;i++)
    {
        if(i === 0) ///build default option
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

  function showMetadata(id)
  {
     let meta = getMetadataById(id);

     let sample_data_div = document.getElementById('sample-metadata');

     sample_data_div.innerHTML='';

     for (const [key, value] of Object.entries(meta)) 
     {
        const div = document.createElement("div");
        div.className ='sample_meta';
        div.innerText = key + ":" + value;
        sample_data_div.appendChild(div);
    }
  }

  function getMetadataById(id)
  {
      let instance_metadata = '';

        //https://stackoverflow.com/questions/34913675/how-to-iterate-keys-values-in-javascript
        for (const [key, value] of Object.entries(metadata)) 
        {
            record_id = value["id"]; //value is the dict

            if(Number(record_id) === Number(id))
            {
                instance_metadata = value;
                break;
            }
        }
      return instance_metadata;
  }

  function optionChanged(id) 
  {
     if(id === -1)
     {
        reset_page();
     }
     else
     {
        showMetadata(id);
     }
  }

  function reset_page()
  {
      alert("in reset page");
  }
  
  main();