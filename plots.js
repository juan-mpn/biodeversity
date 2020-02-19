function init() {
    var selector = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  })}
  
  init();

  function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);

  }

  function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      var PANEL = d3.select("#sample-metadata");
  
      PANEL.html("");
      PANEL.append("h6").text('ID: '+result.id);
      PANEL.append("h6").text('Location: '+result.location);
      PANEL.append("h6").text('Age: ' + result.age);
      PANEL.append("h6").text('Gender: ' + result.gender);
      PANEL.append("h6").text('Location: ' + result.location);
      PANEL.append("h6").text('BBTYPE: ' + result.bbtype);
      PANEL.append("h6").text('WFREQ: ' + result.wfreq);

    });
  }

  function buildCharts(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];

      var samples = data.samples;
      var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
      var yData = resultArray[0].otu_ids.slice(0,10)
      var xData = resultArray[0].sample_values.slice(0,10)
      var labels = resultArray[0].otu_labels.slice(0,10)
      var trace = {
        x: xData,
        y: yData,
        text: labels,
        orientation: 'h',
        width: 100,
        type: 'bar'

      };
      Plotly.newPlot("bar", [trace]);

      var trace1 = {
        x: xData,
        y: yData,
        size: xData,
        text: labels,
        mode: 'markers'
      };
      var layout = {
        title: 'Buble',
        height: 600,
        width: 500

      };
      Plotly.newPlot('bubble', [trace1], layout)

      var trace1 = {
        domain: {x: xData, y: yData},
        value: result.wfreq,
        title: {text: labels},
        type: "indicator",
        mode: 'gauge+number'
      };
    var layout = {
      title: 'Bellly Button Washing Frequency',
      height: 600,
      width: 500

    };
    Plotly.newPlot('gauge', [trace1], layout)

      console.log(resultArray[0]);
      console.log('trace'+trace);
      console.log('xdata'+xData);
      console.log('ydata'+yData);
    }); 
  }
