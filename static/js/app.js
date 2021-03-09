function makePlots(id) {
    d3.json("samples.json").then (data =>{
        console.log(data)
        var values = data.samples[0].otu_ids;
        console.log(values)
        var labels =  data.samples[0].sample_values.slice(0,10).reverse();
        console.log(labels)
        var hovertext =  data.samples[0].otu_labels.slice(0,10);
        console.log (hovertext)
    // Top 10 otu ids in reverse order 
        var OTU_top = ( data.samples[0].otu_ids.slice(0, 10)).reverse();
    // get the otu id's to the desired form for the plot
        var OTU_id = OTU_top.map(d => "OTU " + d);
        console.log(`OTU IDS: ${OTU_id}`)
    // Top 10 labels for the y-axis
        var labels =  data.samples[0].otu_labels.slice(0,10);
        console.log(`OTU_labels: ${labels}`)
        var trace = {
            x: x_values,
            y: OTU_id,
            text: labels,
            marker: {
            color: 'blue'},
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
                l: 100,
                r: 100,
                t: 100,
                b: 100
            }
        };

    // create the bar plot
    Plotly.newPlot("bar", data, layout);
        
         // The bubble chart
         var trace1 = {
            x: data.samples[0].otu_ids,
            y: data.samples[0].sample_values,
            mode: "markers",
            marker: {
                size: data.samples[0].sample_values,
                color: data.samples[0].otu_ids
            },
            text:  data.samples[0].otu_labels

        };
        
         
        var data_2 = [trace1];

        // set the layout for the bubble plot
        var layout_2 = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1000
        };

    // create the bubble plot
    Plotly.newPlot("bubble", data_2, layout_2);
    
    });
}
