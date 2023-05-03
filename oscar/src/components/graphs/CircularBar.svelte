<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";

  let container;
  let data = [
    {
      medio: "Tourist visa",
      value: 91,
    },
    {
      medio: "Work visa",
      value: 29,
    },
    {
      medio: "Student visa",
      value: 6,
    },
    {
      medio: "Foreign residence",
      value: 29,
    },
    {
      medio: "With papers from Mexico",
      value: 5,
    },
    {
      medio: "National identity document (CA-4 countries)",
      value: 91,
    },
    {
      medio: "Passport to a country that does not require a Visa",
      value: 37,
    },
    {
      medio: "On your own (irregular)",
      value: 313,
    },
    {
      medio: "With coyote (irregular)",
      value: 859,
    },
    {
      medio: "Migrant caravans (irregular)",
      value: 33,
    },
    {
      medio: "Refuge / Asylum",
      value: 4,
    },
    {
      medio: "Other",
      value: 45,
    },
  ];

  let data_guess = [
    {
      medio: "Tourist visa",
      value: 10,
    },
    {
      medio: "Work visa",
      value: 20,
    },
    {
      medio: "Student visa",
      value: 30,
    },
    {
      medio: "Foreign residence",
      value: 40,
    },
    {
      medio: "With papers from Mexico",
      value: 50,
    },
    {
      medio: "National identity document (CA-4 countries)",
      value: 60,
    },
    {
      medio: "Passport to a country that does not require a Visa",
      value: 70,
    },
    {
      medio: "On your own (irregular)",
      value: 80,
    },
    {
      medio: "With coyote (irregular)",
      value: 90,
    },
    {
      medio: "Migrant caravans (irregular)",
      value: 100,
    },
    {
      medio: "Refuge / Asylum",
      value: 110,
    },
    {
      medio: "Other",
      value: 120,
    },
  ];

  onMount(() => {
    const margin = { top: 100, right: 0, bottom: 0, left: 0 },
      width = 460 - margin.left - margin.right,
      height = 460 - margin.top - margin.bottom,
      innerRadius = 90,
      outerRadius = Math.min(width, height) / 2; // the outerRadius goes from the middle of the SVG area to the border

    // append the svg object
    const svg = d3
      .select(container)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr(
        "transform",
        `translate(${width / 2 + margin.left + 50}, ${height / 2})`
      );

    // X scale: common for 2 data series
    const x = d3
      .scaleBand()
      .range([0, 2 * Math.PI]) // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
      .align(0) // This does nothing
      .domain(data.map((d) => d.medio)); // The domain of the X axis is the list of states.

    // Y scale outer variable
    const y = d3
      .scaleRadial()
      .range([innerRadius, outerRadius]) // Domain will be define later.
      .domain([0, 900]); // Domain of Y is from 0 to the max seen in the data

    // Second barplot Scales
    const ybis = d3
      .scaleRadial()
      .range([innerRadius, 5]) // Domain will be defined later.
      .domain([0, 900]);

    // Add the bars
    svg
      .append("g")
      .selectAll("path")
      .data(data)
      .join("path")
      .attr("fill", "#69b3a2")
      .attr("class", "yo")
      .attr(
        "d",
        d3
          .arc() // imagine your doing a part of a donut plot
          .innerRadius(innerRadius)
          .outerRadius((d) => y(d.value))
          .startAngle((d) => x(d.medio))
          .endAngle((d) => x(d.medio) + x.bandwidth())
          .padAngle(0.01)
          .padRadius(innerRadius)
      );

    // Add the labels
    svg
      .append("g")
      .selectAll("g")
      .data(data)
      .join("g")
      .attr("text-anchor", function (d) {
        return (x(d.medio) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) <
          Math.PI
          ? "end"
          : "start";
      })
      .attr("transform", function (d) {
        return (
          "rotate(" +
          (((x(d.medio) + x.bandwidth() / 2) * 180) / Math.PI - 90) +
          ")" +
          "translate(" +
          (y(d.value) + 10) +
          ",0)"
        );
      })
      .append("text")
      .text((d) => d.medio)
      .attr("transform", function (d) {
        return (x(d.medio) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) <
          Math.PI
          ? "rotate(180)"
          : "rotate(0)";
      })
      .style("font-size", "11px")
      .attr("alignment-baseline", "middle");

    // Add the second series
    svg
      .append("g")
      .selectAll("path")
      .data(data_guess)
      .join("path")
      .attr("fill", "red")
      .attr(
        "d",
        d3
          .arc() // imagine your doing a part of a donut plot
          .innerRadius((d) => ybis(0))
          .outerRadius((d) => ybis(d.value))
          .startAngle((d) => x(d.medio))
          .endAngle((d) => x(d.medio) + x.bandwidth())
          .padAngle(0.01)
          .padRadius(innerRadius)
      );
  });
</script>

<div bind:this={container} />
