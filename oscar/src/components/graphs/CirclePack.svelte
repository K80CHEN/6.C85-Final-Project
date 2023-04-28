<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";

  let data = [];
  let container;

  // load data this way:
  onMount(async () => {
    const response = await fetch("src/data/remit_service.json");
    // const response = await fetch("src/data/test.json");
    data = await response.json();
    // console.log(data);
    // set the dimensions and margins of the graph
    const width = 460;
    const height = 460;

    // append the svg object to the body of the page
    const svg = d3
      .select(container)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    // Color palette for continents?
    const color = d3
      .scaleOrdinal()
      .domain([
        "Wells Fargo",
        "Walmart2World",
        "Envios de Dinero G&T Continental",
        "Xpress Money",
        "Xoom",
        "Western Union",
        "Vigo",
        "Viane",
        "Viamericas",
        "Small World",
        "Ria",
        "Remitly",
        "Pangea",
        "MoneyGram",
        "La Nacional",
        "Intermex",
        "Go Vianex",
        "Ficohsa Express",
        "Dolex Dollar Express",
        "Casa de cambio Delgado",
        "Banrural Corp.",
        "Alante Financial",
      ])
      .range([
        "#e6194b",
        "#3cb44b",
        "#ffe119",
        "#4363d8",
        "#f58231",
        "#911eb4",
        "#46f0f0",
        "#f032e6",
        "#bcf60c",
        "#fabebe",
        "#008080",
        "#e6beff",
        "#9a6324",
        "#fffac8",
        "#800000",
        "#aaffc3",
        "#808000",
        "#ffd8b1",
        "#000075",
        "#808080",
        "#ffffff",
        "#000000",
        "#E6E6FA",
        "#D8BFD8",
        "#DDA0DD",
      ]);

    // Size scale for countries
    const size = d3.scaleLinear().domain([0, 300]).range([7, 55]); // circle will be between 7 and 55 px wide

    // create a tooltip
    const Tooltip = d3
      .select(container)
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px");

    // Three function that change the tooltip when user hover / move / leave a cell
    const mouseover = function (event, d) {
      Tooltip.style("opacity", 1);
    };
    const mousemove = function (event, d) {
      Tooltip.html(
        "<u>" + d.Firm + "</u>" + "<br>" + d.CountofFirm + " inhabitants"
      )
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
      .style("fill", (d) => color(d.CountofFirm))
      .style("fill-opacity", 0.8)
      .attr("stroke", "black")
      .style("stroke-width", 1)
      .on("mouseover", mouseover) // What to do when hovered
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)
      .call(
        d3
          .drag() // call specific function when circle is dragged
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      );

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

    // What happens when a circle is dragged?
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.03).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }
    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0.03);
      d.fx = null;
      d.fy = null;
    }
  });
</script>

<div bind:this={container} />
