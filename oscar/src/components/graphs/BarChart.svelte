<script>
  import { onMount } from "svelte";
  import { highlightedData } from "../helpers/stores";
  import * as d3 from "d3";

  let data = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  let svg;
  const width = 500;
  const height = 300;
  let componentMounted = false;

  onMount(() => {
    svg = d3.select(".chart").attr("width", width).attr("height", height);

    drawChart();
    componentMounted = true;
  });

  highlightedData.subscribe((value) => {
    if (componentMounted) {
      if (value && !data.includes(value)) {
        data.push(value);
        data.sort((a, b) => a - b);
        drawChart();
      }
    }
  });

  function drawChart() {
    const barWidth = width / data.length;
    const bars = svg.selectAll("rect").data(data);

    // Enter selection
    bars
      .enter()
      .append("rect")
      .attr("width", barWidth - 1)
      .attr("x", (d, i) => i * barWidth)
      .attr("y", (d) => 300 - d)
      .attr("height", (d) => d)
      .attr("fill", (d) => (d == $highlightedData ? "red" : "steelblue"))
      .merge(bars); // Merge with update selection

    // Update selection
    bars
      .attr("width", barWidth - 1)
      .attr("x", (d, i) => i * barWidth)
      .attr("y", (d) => 300 - d)
      .attr("height", (d) => d)
      .attr("fill", (d) => (d == $highlightedData ? "red" : "steelblue"));

    // Exit selection
    bars.exit().remove();
  }
</script>

<svg class="chart" />
