<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";
  import { max, histogram } from "d3-array";
  import { freq_remesa } from "../../data/freq_remesa.js";

  //   const data = [
  //     { category: "A", values: [10, 20, 30, 40, 50] },
  //     { category: "B", values: [15, 25, 35, 45, 55] },
  //     // ...
  //   ];
  let data = freq_remesa;
  let containers = [];

  const globalMin = d3.min(data, (d) => d3.min(d.values));
  const globalMax = d3.max(data, (d) => d3.max(d.values));

  onMount(() => {
    for (let i = 0; i < data.length; i++) {
      createChart(containers[i], data[i], globalMin, globalMax);
    }
  });

  function createChart(container, chartData, globalMin, globalMax) {
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 200 - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;

    const xScale = d3
      .scaleBand()
      .domain([chartData.category])
      .range([0, width])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([globalMin, globalMax])
      .range([height, 0]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    const hist = histogram()
      .domain(yScale.domain())
      .thresholds(yScale.ticks(20));

    const maxDensity = max(hist(chartData.values), (h) => h.length);

    const kdeScale = d3
      .scaleLinear()
      .domain([0, maxDensity])
      .range([0, xScale.bandwidth() / 2]);

    const area = d3
      .area()
      .curve(d3.curveCatmullRom)
      .x0((d) => -kdeScale(d.length))
      .x1((d) => kdeScale(d.length))
      .y((d) => yScale(d.x0));

    const svg = d3
      .select(container)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis);

    svg.append("g").attr("class", "y-axis").call(yAxis);

    svg
      .append("path")
      .datum(hist(chartData.values))
      .attr("class", "violin")
      .attr("d", area)
      .attr("fill", "steelblue")
      .attr("stroke", "black");
  }

  let guess = 0;
</script>

<div class="chart-container">
  <input bind:value={guess}>
  <h1>Value entered: {guess}</h1>
  {#each data as item, i}
    <div bind:this={containers[i]} class="chart" />
  {/each}
</div>

<style>
  .chart-container {
    display: flex;
    flex-wrap: wrap;
    width: 600px;
    margin: 0 auto;
  }

  .violin {
    fill: steelblue;
    stroke: black;
  }
</style>
