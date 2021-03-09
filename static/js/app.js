function makePlots(id) {
    d3.json("samples.json").then (data =>{
        console.log(data)
        var values = data.samples[0].otu_ids;
        console.log(values)
        var x_value =  data.samples[0].sample_values.slice(0,10).reverse();
        console.log(x_value)
        var hovertext =  data.samples[0].otu_labels.slice(0,10);
        console.log (hovertext)
    // Top 10 otu ids in reverse order 
        var OTU_top = ( values.slice(0, 10)).reverse();
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
            y: x_value,
            mode: "markers",
            marker: {
                size: x_value,
                color: values
            },
            text:  hovertext

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
    Plotly.newPlot("bubble", data_2, layout_2, {displayModeBar: false}, {scrollZoom: true});
    
    });
}

makePlots();