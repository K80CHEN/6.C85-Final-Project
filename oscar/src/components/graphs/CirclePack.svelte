<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";
  import { remit } from "../../data/remit_service.js";

  let data = [];
  let container;

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

    // create a tooltip
    const Tooltip = d3
      .select(container)
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("padding", "5px");

    // Three function that change the tooltip when user hover / move / leave a cell
    const mouseover = function (event, d) {
      Tooltip.style("opacity", 1);
    };
    const mousemove = function (event, d) {
      Tooltip.html(d.Firm + "<br>" + d.CountofFirm + " transactions")
        .style("left", event.x / 2 + 20 + "px")
        .style("top", event.y / 2 - 30 + "px");
    };
    var mouseleave = function (event, d) {
      Tooltip.style("opacity", 0);
    };

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
      .on("mouseover", mouseover) // What to do when hovered
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave);

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

<div bind:this={container} />
