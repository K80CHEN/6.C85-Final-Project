<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";
  import { remit } from "../../data/remit_service.js";

  let data = [];
  let container;
  let tooltip;

  // load data this way:
  onMount(async () => {
    data = remit;

    // console.log(data);
    // set the dimensions and margins of the graph
    const width = 640;
    const height = 500;

    // append the svg object to the body of the page
    const svg = d3
      .select(container)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    // Color palette
    const color = d3
      .scaleOrdinal()
      .domain(["Bank", "Money Transfer Operator"])
      .range(["#94855f", "#69a0a4"]);

    // Size scale for countries
    const size = d3.scaleLinear().domain([0, 300]).range([17, 85]); // circle will be between 7 and 55 px wide

    // Initialize the circle: all located at the center of the svg area
    var node = svg
      .append("g")
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("class", "node")
      .attr("r", (d) => size(d.CountofFirm))
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .style("fill", (d) => color(d.FirmType))
      .style("fill-opacity", 0.8)
      .on("mouseover", function (event, d) {
        d3.select(tooltip)
          .style("opacity", 1)
          .style("left", `${event.pageX}px`)
          .style("top", `${event.pageY}px`)
          .html(d.Firm + "<br>" + d.CountofFirm + " transactions");
      })
      .on("mousemove", function (event) {
        d3.select(tooltip)
          .style("left", `${event.pageX}px`)
          .style("top", `${event.pageY}px`);
      })
      .on("mouseout", function () {
        d3.select(tooltip).style("opacity", 0);
      });

    // Features of the forces applied to the nodes:
    const simulation = d3
      .forceSimulation()
      .force(
        "center",
        d3
          .forceCenter()
          .x(width / 2)
          .y(height / 2)
      ) // Attraction to the center of the svg area
      .force("charge", d3.forceManyBody().strength(0.1)) // Nodes are attracted one each other of CountofFirm is > 0
      .force(
        "collide",
        d3
          .forceCollide()
          .strength(0.2)
          .radius(function (d) {
            return size(d.CountofFirm) + 3;
          })
          .iterations(1)
      ); // Force that avoids circle overlapping

    // Apply these forces to the nodes and update their positions.
    // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
    simulation.nodes(data).on("tick", function (d) {
      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    });
  });
</script>

<div>
  <div class="tooltip" bind:this={tooltip} />
  <div bind:this={container} />

  <div class="check-box">
    <span class="check-box-input">
      <div class="check-box-color" style="background-color: #94855f" />
      Bank
    </span>
    <span class="check-box-input">
      <div class="check-box-color" style="background-color: #69a0a4" />
      Money Transfer Operator
    </span>
  </div>
</div>

<style>
  .tooltip {
    font: 12px sans-serif;
    font-family: "Libre Franklin", sans-serif;
    visibility: visible;
    background-color: #deedcf;
    border-radius: 10px;
    width: 100px;
    color: black;
    position: absolute;
    padding: 5px;
    opacity: 0;
  }
  .check-box {
    display: flex;
    width: 460px;
    margin: 0 auto;
    flex-direction: row;
    align-items: start;
    /* height: 100px; */
    text-align: start;
    flex-wrap: wrap;
    margin-bottom: 2rem;
  }
  .check-box-color {
    display: inline-block;
    width: 10px;
    height: 10px;
  }
  .check-box-input {
    font-family: "libre franklin", "sans serif";
    font-size: 0.8rem;
    margin-right: 10px;
    /* padding: 5px; */
  }
</style>
