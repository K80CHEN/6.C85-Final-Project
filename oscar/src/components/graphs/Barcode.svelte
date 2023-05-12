<script>
  import { onMount, afterUpdate } from "svelte";
  import * as d3 from "d3";

  export let data;
  export let highlightedValue = null;

  let svg;

  onMount(() => {
    createBarcodePlot();
  });

  afterUpdate(() => {
    createBarcodePlot();
  });

  function createBarcodePlot() {
    console.log("Barcode: ", data);
    d3.select(svg).selectAll("*").remove();

    const height = 400;
    const width = 600;
    const margin = { top: 30, right: 30, bottom: 30, left: 30 };
    const chartHeight = height - margin.top - margin.bottom;
    const chartWidth = width - margin.left - margin.right;

    const y = d3
      .scaleLinear()
      .domain([0, data.length])
      .range([chartHeight, margin.top]);

    const x = d3
      .scaleLinear()
      .domain([d3.min(data), d3.max(data)])
      .range([margin.left, chartWidth]);

    const g = d3
      .select(svg)
      .attr("width", width)
      .attr("height", height)
      .append("g");

    g.selectAll("line")
      .data(data)
      .join("line")
      .attr("x1", (d) => x(d))
      .attr("y1", margin.top)
      .attr("x2", (d) => x(d))
      .attr("y2", chartHeight)
      .attr("stroke", (d) => (d === highlightedValue ? "red" : "#69b3a2"))
      .attr("stroke-width", 2);
  }

  //   $: if (svg) createBarcodePlot();
</script>

<svg bind:this={svg} />
