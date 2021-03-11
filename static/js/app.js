function makePlots(id) {
    d3.json("samples.json").then (data =>{
        console.log(data)
        var values = data.samples[0].otu_ids;
        console.log(values)
        var x_value =  data.samples[0].sample_values.slice(0,10).reverse();
        console.log(x_value)
        var bubble_y_val = data.samples[0].sample_values;
        console.log(bubble_y_val)
        var hovertext =  data.samples[0].otu_labels.slice(0,10);
        console.log (hovertext)
        var bubble_text = data.samples[0].otu_labels;
        console.log(bubble_text)
    // Top 10 otu ids in reverse order 
        var OTU_top = (values.slice(0, 10)).reverse();
    // get the otu id's to the desired form for the plot
        var OTU_id = OTU_top.map(d => "OTU " + d);
        console.log(`OTU IDS: ${OTU_id}`)
    // Top 10 labels for the y-axis
        var labels =  hovertext.slice(0,10);
        console.log(`OTU_labels: ${labels}`)
        var trace = {
            x: x_value,
            y: OTU_id,
            text: labels,
            marker: {
            color: 'steelblue'},
            type:"bar",
            orientation: "h",
        };

        var data = [trace];

        var layout = {
            title: "Top 10 OTU",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 70,
                r: 50,
                t: 35,
                b: 50
            }
        };

    // create the bar plot
    Plotly.newPlot("bar", data, layout, {displayModeBar: false});
        
         // The bubble chart
         var trace1 = {
            x: values,
            y: bubble_y_val,
            mode: "markers",
            marker: {
                size: bubble_y_val,
                color: values
            },
            text:  bubble_text

        };
        
         
        var data_2 = [trace1];

        // set the layout for the bubble plot
        var layout_2 = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1500,
            margin: {
                l: 25,
                r: 50,
                t: 35,
                b: 50
            }
        };

    // create the bubble plot
    Plotly.newPlot("bubble", data_2, layout_2, {displayModeBar: false, scrollZoom: true});
    
    });
}

function displayMetadata(id) {
    //read in the json file
    d3.json("samples.json").then((data) => {
        //create a variable for the metadata
        var metadata = data.metadata;

        console.log(metadata)
        //filter the information by the ID
        var filter = metadata.filter(meta => meta.id.toString() === id)[0];
        //create a variable for the demographic table
        var demographics = d3.select("#sample-metadata");
        //empties the table
        demographics.html("");
        //information related to the ID will be entered into the demgraphic table
        Object.entries(filter).forEach((key) => {
            demographics.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
        });

    });
}

//this will handle the event change when we select a new ID
function optionChanged(id) {
    makePlots(id);
    displayMetadata(id);
}

//This will append the selected demographic information to the table
function init() {
    //create variable for the dropdown menu
    var dropdown = d3.select("#selDataset");
    //read in the metadata
    d3.json("samples.json").then((data) => {
        console.log(data)
        //append data to the dropdown menu
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });
        makePlots(data.names[0]);
        displayMetadata(data.names[0]);
    });
}

init();