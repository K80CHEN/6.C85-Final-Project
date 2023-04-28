<script>
  import { useD3 } from "../helpers/myd3helper";
  import * as d3 from "d3";

  let data = [
    { label: "A", value: 10 },
    { label: "B", value: 20 },
    { label: "C", value: 15 },
    { label: "D", value: 25 },
  ];

  function createSvg(svg) {
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
    const y = d3.scaleLinear().rangeRound([height, 0]);

    const g = d3
      .select(svg)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    x.domain(data.map((d) => d.label));
    y.domain([0, d3.max(data, (d) => d.value)]);

    g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("font-size", "10px");

    g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y))
      .selectAll("text")
      .style("font-size", "10px");

    g.selectAll(".axis path, .axis line")
      .attr("fill", "none")
      .attr("stroke", "#000")
      .attr("shape-rendering", "crispEdges");

    g.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.label))
      .attr("y", (d) => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.value))
      .style("fill", "steelblue");
  }

  function updateSvg(svg) {
    console.log("sdasdl;k");
  }
</script>

<svg use:d3={{ create: createSvg, update: updateSvg }} />

<style>
  .bar {
    fill: steelblue;
  }
  .axis {
    font-size: 10px;
  }
  .axis path,
  .axis line {
    fill: none;
    stroke: #000;
    shape-rendering: crispEdges;
  }
</style>
