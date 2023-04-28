<script>
  import * as d3 from "d3";

  let mycontainer;
  const bank = [
    {
      SpeedActual: "Same day",
      FirmType: "Bank",
      CountofSpeedActual: 57,
    },
    {
      SpeedActual: "Next day",
      FirmType: "Bank",
      CountofSpeedActual: 1,
    },
    {
      SpeedActual: "Less than one hour",
      FirmType: "Bank",
      CountofSpeedActual: 99,
    },
    {
      SpeedActual: "2 days",
      FirmType: "Bank",
      CountofSpeedActual: 11,
    },
  ];

  const mts = [
    {
      SpeedActual: "Same day",
      FirmType: "Money Transfer Operator",
      CountofSpeedActual: 342,
    },
    {
      SpeedActual: "Next day",
      FirmType: "Money Transfer Operator",
      CountofSpeedActual: 95,
    },
    {
      SpeedActual: "Less than one hour",
      FirmType: "Money Transfer Operator",
      CountofSpeedActual: 757,
    },
    {
      SpeedActual: "6 days or more",
      FirmType: "Money Transfer Operator",
      CountofSpeedActual: 40,
    },
    {
      SpeedActual: "3-5 days",
      FirmType: "Money Transfer Operator",
      CountofSpeedActual: 246,
    },
    {
      SpeedActual: "2 days",
      FirmType: "Money Transfer Operator",
      CountofSpeedActual: 56,
    },
  ];

  // set the dimensions and margins of the graph
  const margin = { top: 30, right: 30, bottom: 70, left: 60 },
    width = 480 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  const svg = d3
    .select(mycontainer)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // X axis
  const x = d3
    .scaleBand()
    .range([0, width])
    .domain(bank.map((d) => d.SpeedActual))
    .padding(0.2);
  svg
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x));

  // Add Y axis
  const y = d3.scaleLinear().domain([0, 500]).range([height, 0]);
  svg.append("g").attr("class", "myYaxis").call(d3.axisLeft(y));

  // A function that create / update the plot for a given variable:
  function update(data) {
    var u = d3.select("svg").selectAll("rect").data(data);

    u.join("rect")
      .transition()
      .duration(1000)
      .attr("x", (d) => x(d.SpeedActual))
      .attr("y", (d) => y(d.CountofSpeedActual))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.CountofSpeedActual))
      .attr("fill", "#69b3a2");
  }

  // Initialize the plot with the first dataset
</script>

<div bind:this={mycontainer}>
  <button on:click={() => update(bank)}>Bank</button>
  <button on:click={() => update(mts)}>Money Transfer Service</button>
  <div id="btn-viz" />
</div>
