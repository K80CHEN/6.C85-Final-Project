<script>
  //  currently not integrated in
  import * as d3 from "d3";

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
      return "fill: #C1121F; stroke: black";
    } else {
      return "fill: #69a0a4; stroke: black";
    }
  }
  let svg;

  $: if (selectedChoice) {
    // set the dimensions and margins of the graph
    cleanup();
    const margin = { top: 20, right: 30, bottom: 80, left: 280 },
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
      .style("text-anchor", "end")
      .style("font-family", "libre franklin");
    svg
      .append("text")
      .attr(
        "transform",
        "translate(" + width / 2 + " ," + (height + margin.top + 40) + ")"
      ) // Adjust the second part of the translate attribute as needed
      .style("text-anchor", "middle")
      .style("font-family", "libre franklin")
      .style("font-size", "0.8rem")
      .text("Number of reportings");
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
    svg
      .append("g")
      .call(d3.axisLeft(y))
      .style("font-family", "libre franklin")
      .style("font-size", "12px");

    svg
      .append("text")
      .attr("y", margin.top - 40) // Adjust as needed
      .attr("x", -40)
      .attr("dy", "1em")
      .style("text-anchor", "start")
      .style("font-family", "libre franklin")
      .style("font-size", "0.8rem")
      .text("Type of Pathways");
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
              ? `This was your guess. There are ${d.pathways_used} reportings of this pathway being used`
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
  <div class="caption-box">
    <p class="caption-text">
      The most commonly used pathway is with a coyote through irregular
      measures. A coyote is a person who smuggles immigrants across the
      Mexico-United States border. <br /><br />
      There were 1652 reportings on the main means that a Central American migrant
      used to migrate or attempt to migrate abroad the last time. Please note that
      these are number of reportings. One person could have more than one means to
      migrate. But the distribution should represent the pathways that were commonly
      taken.
    </p>
  </div>
</div>

<style>
  .caption-box {
    display: block;
    position: absolute;
    left: 80%;
    transform: translateY(-120%);
    border: 1px solid #707070;
    padding: 20px;
    width: 200px;
    text-align: left;
  }
  .caption-text {
    font-family: "gelasio";
    line-height: 1.1rem;
    font-size: 14px;
    transition: opacity 2s ease-in-out;
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
    font-size: 12px;
    font-family: "Libre Franklin", sans-serif;
    color: #999;
    text-align: start;
    margin-bottom: 2.5rem;
  }
</style>
