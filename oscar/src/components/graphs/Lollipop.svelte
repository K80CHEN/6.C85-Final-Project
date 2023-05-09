<script>
  //  currently not integrated in
  import * as d3 from "d3";
  import { onMount } from "svelte";
  import { onDestroy } from "svelte";

  export let selectedChoice;
  const data = [
    {
      migration_pathways: "Tourist visa",
      pathways_used: 95,
    },
    {
      migration_pathways: "Work visa",
      pathways_used: 29,
    },
    {
      migration_pathways: "Student visa",
      pathways_used: 7,
    },
    {
      migration_pathways: "Foreign residence",
      pathways_used: 32,
    },
    {
      migration_pathways: "With papers from Mexico",
      pathways_used: 9,
    },
    {
      migration_pathways: "National identity document (CA-4 countries)",
      pathways_used: 115,
    },
    {
      migration_pathways: "Passport to a country that does not require a Visa",
      pathways_used: 47,
    },
    {
      migration_pathways: "On their own (irregular)",
      pathways_used: 338,
    },
    {
      migration_pathways: "With coyote (irregular)",
      pathways_used: 893,
    },
    {
      migration_pathways: "Migrant caravans (irregular)",
      pathways_used: 38,
    },
    {
      migration_pathways: "Refuge / Asylum",
      pathways_used: 4,
    },
    {
      migration_pathways: "Other",
      pathways_used: 45,
    },
  ];

  let container;
  let tooltip;

  function circleStyle(d) {
    if (selectedChoice === d.migration_pathways) {
      return "fill: red; stroke: black";
    } else {
      return "fill: #69b3a2; stroke: black";
    }
  }
  let svg;

  $: if (selectedChoice) {
    // set the dimensions and margins of the graph
    cleanup();
    const margin = { top: 10, right: 30, bottom: 40, left: 240 },
      width = 800 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    svg = d3
      .select(container)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Parse the Data

    data.sort(function (b, a) {
      return a.pathways_used - b.pathways_used;
    });

    // Add X axis
    const x = d3.scaleLinear().domain([0, 900]).range([0, width]);
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Y axis
    const y = d3
      .scaleBand()
      .range([0, height])
      .domain(
        data.map(function (d) {
          return d.migration_pathways;
        })
      )
      .padding(1);
    svg.append("g").call(d3.axisLeft(y));

    // Lines
    svg
      .selectAll("myline")
      .data(data)
      .join("line")
      .attr("x1", x(0))
      .attr("x2", x(0))
      .attr("y1", function (d) {
        return y(d.migration_pathways);
      })
      .attr("y2", function (d) {
        return y(d.migration_pathways);
      })
      .attr("stroke", "grey");

    // Circles -> start at X=0
    svg
      .selectAll("mycircle")
      .data(data)
      .join("circle")
      .attr("cx", x(0))
      .attr("cy", function (d) {
        return y(d.migration_pathways);
      })
      .attr("r", "10")
      .attr("style", circleStyle)
      .on("mouseover", function (event, d) {
        d3.select(tooltip)
          .style("opacity", 1)
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 10}px`)
          .html(
            selectedChoice === d.migration_pathways
              ? `This was your choice. There are ${d.pathways_used} reportings of this pathway being used`
              : `There are ${d.pathways_used} reportings of this pathway being used`
          );
      })
      .on("mousemove", function (event) {
        d3.select(tooltip)
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 10}px`);
      })
      .on("mouseout", function () {
        d3.select(tooltip).style("opacity", 0);
      });

    // Change the X coordinates of line and circle
    svg
      .selectAll("circle")
      .transition()
      .duration(2000)
      .attr("cx", function (d) {
        return x(d.pathways_used);
      });

    svg
      .selectAll("line")
      .transition()
      .duration(2000)
      .attr("x1", function (d) {
        return x(d.pathways_used);
      });
  }

  function cleanup() {
    d3.select(container).selectAll("svg").remove();
  }
</script>

<div>
  <div class="tooltip" bind:this={tooltip} />
  <div class="lollipop" bind:this={container} />
</div>

<style>
  .lollipop text {
    font-family: "domine";
  }
  .tooltip {
    position: absolute;
    pointer-events: none;
    background-color: white;
    border: 1px solid black;
    border-radius: 5px;
    padding: 5px;
    opacity: 0;
    transition: opacity 0.2s;
    font-size: 8px;
    line-height: 10px;
    font-family: "Libre Franklin", sans-serif;
    color: #999;
    text-align: start;
    margin-bottom: 2.5rem;
  }
</style>
