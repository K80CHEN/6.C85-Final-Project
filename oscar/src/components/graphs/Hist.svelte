<!-- Histogram.svelte -->
<script>
  import { afterUpdate, onMount } from "svelte";
  import * as d3 from "d3";

  export let highlightedValue = null;

  // Example data
  export let data = [
    34, 56, 78, 90, 23, 45, 67, 89, 12, 34, 56, 78, 90, 23, 45, 67, 89, 12, 34,
    56, 78, 90, 23, 45, 67, 89, 12, 34, 56, 78,
  ];

  let svg;

  function createHistogram() {
    console.log("hist component, ", highlightedValue);
    d3.select(svg).selectAll("*").remove();
    // Set the dimensions and margins of the graph
    const margin = { top: 20, right: 20, bottom: 30, left: 40 },
      width = 600 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // Create a y scale
    const y = d3.scaleLinear().range([height, 0]);

    // Create an x scale
    const x = d3
      .scaleLinear()
      .domain([d3.min(data), d3.max(data)])
      .range([0, width]);

    // Create a histogram generator
    const histogram = d3
      .histogram()
      .value((d) => d)
      .domain(x.domain())
      .thresholds(x.ticks(20));

    const bins = histogram(data);

    // Update y scale domain
    y.domain([0, d3.max(bins, (d) => d.length)]);

    // Append the SVG object to the component
    d3.select(svg)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create xAxis
    const xAxis = d3.axisBottom(x);

    // Create yAxis
    const yAxis = d3.axisLeft(y);

    // Add the x-axis to the chart
    d3.select(svg)
      .append("g")
      .attr("transform", `translate(${margin.left},${height + margin.top})`)
      .call(xAxis);

    // Add the y-axis to the chart
    d3.select(svg)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)
      .call(yAxis);

    // Draw the histogram bars
    d3.select(svg)
      .selectAll("rect")
      .data(bins)
      .join("rect")
      .attr("transform", `translate(${margin.left},${margin.top})`)
      .attr("x", (d) => x(d.x0) + 1)
      .attr("y", (d) => y(d.length))
      .attr("width", (d) => Math.max(0, x(d.x1) - x(d.x0) - 1))
      .attr("height", (d) => height - y(d.length))
      .style("fill", (d) => {
        // if the highlighted value falls in a bin
        if (
          highlightedValue !== null &&
          d.x0 <= highlightedValue &&
          d.x1 > highlightedValue
        ) {
          // set the bin bar color to red
          return "red";
        }
        // otherwise default bar color blue
        return "blue";
      });
  }

  onMount(() => {
    createHistogram();
  });

  $: createHistogram();
</script>

<svg bind:this={svg} width="600" height="400" />
