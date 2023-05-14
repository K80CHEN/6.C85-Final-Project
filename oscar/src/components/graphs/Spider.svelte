<script>
  import RadarChart from "../helpers/radarChart";
  import * as d3 from "d3";
  import { onMount } from "svelte";

  onMount(() => {});

  /* Radar chart design (radarChart.js) created by Nadieh Bremer - VisualCinnamon.com */
  /* I re-wrote part of the code into D3.js V6 to use in this project*/

  //////////////////////////////////////////////////////////////
  //////////////////////// Set-Up //////////////////////////////
  //////////////////////////////////////////////////////////////

  const margin = { top: 10, right: 70, bottom: 40, left: 70 },
    width = 500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  //////////////////////////////////////////////////////////////
  ////////////////////////// Data //////////////////////////////
  //////////////////////////////////////////////////////////////

  var data = [
    [
      // MoneyGram
      {
        axis: "Less than one hour",
        value: 4.37,
      },
      {
        axis: "Same day",
        value: 2.66,
      },
      {
        axis: "Next day",
        value: 0,
      },
      {
        axis: "2 days",
        value: 0,
      },
      {
        axis: "3-5 days",
        value: 2.57,
      },
      {
        axis: "6 days or more",
        value: 0.59,
      },
    ],
    // Remitly
    [
      {
        axis: "Less than one hour",
        value: 4.36,
      },
      {
        axis: "Same day",
        value: 0,
      },
      {
        axis: "Next day",
        value: 0,
      },
      {
        axis: "2 days",
        value: 6.04,
      },
      {
        axis: "3-5 days",
        value: 3.01,
      },
      {
        axis: "6 days or more",
        value: 0,
      },
    ],
    //Ria
    [
      {
        axis: "Less than one hour",
        value: 4.11,
      },
      {
        axis: "Same day",
        value: 4.26,
      },
      {
        axis: "Next day",
        value: 5.14,
      },
      {
        axis: "2 days",
        value: 0,
      },
      {
        axis: "3-5 days",
        value: 0,
      },
      {
        axis: "6 days or more",
        value: 0,
      },
    ],
    // western union
    [
      {
        axis: "Less than one hour",
        value: 3.97,
      },
      {
        axis: "Same day",
        value: 0,
      },
      {
        axis: "Next day",
        value: 4.56,
      },
      {
        axis: "2 days",
        value: 0,
      },
      {
        axis: "3-5 days",
        value: 3.97,
      },
      {
        axis: "6 days or more",
        value: 0,
      },
    ],
    //Xoom
    [
      {
        axis: "Less than one hour",
        value: 4.86,
      },
      {
        axis: "Same day",
        value: 5.71,
      },
      {
        axis: "Next day",
        value: 0,
      },
      {
        axis: "2 days",
        value: 0,
      },
      {
        axis: "3-5 days",
        value: 0,
      },
      {
        axis: "6 days or more",
        value: 0,
      },
    ],
  ];

  //////////////////////////////////////////////////////////////
  //////////////////// Draw the Chart //////////////////////////
  //////////////////////////////////////////////////////////////

  const color = d3
    .scaleOrdinal()
    .range(["#94855f", "#ccb58a", "#76958d", "#707070", "#69a0a4"]);

  const radarChartOptions = {
    w: width,
    h: height,
    margin: margin,
    maxValue: 0.5,
    levels: 5,
    roundStrokes: true,
    color: color,
  };

  let container;
  //Call function to draw the Radar chart

  onMount(() => {
    RadarChart(container, data, radarChartOptions);
  });
</script>

<div id="radarChart" bind:this={container} />
