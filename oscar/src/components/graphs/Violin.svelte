<!-- ViolinChart.svelte -->
<script>
  import { onMount, afterUpdate } from "svelte";
  import * as d3 from "d3";
  import { freq_remesa } from "../../data/freq_remesa.js";

  export let data = freq_remesa[0]; // access the data for each month
  export let highlightedValue = null;

  let svg;

  function createChart() {
    // Set the dimensions and margins of the graph
    const margin = { top: 20, right: 30, bottom: 30, left: 40 },
      width = 600 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // Append the SVG object to the component
    d3.select(svg)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create a y scale
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data.values)])
      .range([height, 0]);

    // Create an x scale for the violin plot
    const x = d3.scaleBand().range([0, width]).domain([""]).padding(0.05);

    // Compute kernel density estimator
    const kde = kernelDensityEstimator(kernelEpanechnikov(7), y.ticks(40));
    const density = kde(data);

    // Create a yAxis
    const yAxis = d3.axisLeft(y);

    // Add the y-axis to the chart
    d3.select(svg)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)
      .call(yAxis);

    // Create the area generator for the violin
    const area = d3
      .area()
      .x0((d) => x("") + x.bandwidth() / 2 - d[1] / 2)
      .x1((d) => x("") + x.bandwidth() / 2 + d[1] / 2)
      .y((d) => y(d[0]))
      .curve(d3.curveCatmullRom);

    // Draw the violin plot
    d3.select(svg)
      .append("path")
      .datum(density)
      .attr("transform", `translate(${margin.left},${margin.top})`)
      .attr("fill", "#69b3a2")
      .attr("opacity", 0.8)
      .attr("stroke", "#000")
      .attr("stroke-width", 1)
      .attr("d", area);

    // Add the highlightedValue marker
    if (highlightedValue !== null) {
      d3.select(svg)
        .append("line")
        .attr("x1", margin.left)
        .attr("x2", width + margin.left)
        .attr("y1", y(highlightedValue))
        .attr("y2", y(highlightedValue))
        .attr("stroke", "red")
        .attr("stroke-width", 2);
    }
  }

  // Create the kernel density estimator
  function kernelDensityEstimator(kernel, X) {
    return function (V) {
      return X.map(function (x) {
        return [
          x,
          d3.mean(V, function (v) {
            return kernel(x - v);
          }),
        ];
      });
    };
  }

  // Epanechnikov kernel function
  function kernelEpanechnikov(k) {
    return function (v) {
      return Math.abs((v /= k)) <= 1 ? (0.75 * (1 - v * v)) / k : 0;
    };
  }

  function updateChart() {
    // Code to update the violin chart using D3
    // Make sure to update the highlighted value in the chart
  }

  onMount(() => {
    createChart();
  });

  afterUpdate(() => {
    updateChart();
  });
</script>

<svg bind:this={svg} width="600" height="400" />
