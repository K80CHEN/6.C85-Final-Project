<!-- ViolinChart.svelte -->
<script>
  import { onMount, afterUpdate } from "svelte";
  import * as d3 from "d3";
  import { freq_remesa } from "../../data/freq_remesa.js";

  let svg;

  const data = freq_remesa;

  onMount(async () => {
    const margin = { top: 20, right: 30, bottom: 40, left: 50 },
      width = 1000 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    svg = d3
      .select(svg)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand()
      .range([0, width])
      .domain([
        "Every week or less",
        "Every fifteen days",
        "Each month",
        "Every two months",
        "Every three months",
        "Every six months",
        "Once a year",
        "On extraordinary occasions",
        "Other",
      ])
      .padding(0.05);
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    const y = d3.scaleLinear().domain([0, 1200]).range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    // Features of density estimate
    var kde = kernelDensityEstimator(kernelEpanechnikov(0.9), y.ticks(10));
    // y.ticks(50): 50 is a good starting number
    // The number you provide to y.ticks() should be set according to the level of granularity you want for your density estimates.
    // A higher number will result in more sample points and a potentially more detailed estimation, but also more computational work.

    // The number provided to kernelEpanechnikov() function is a parameter known as the bandwidth.
    // The bandwidth controls the width of the kernels (the "bumps"), which determines the level of smoothing applied to the density estimate.
    // A smaller bandwidth (like 0.1) would result in a narrower kernel,
    // which would make the density estimate more sensitive to small variations in the data (i.e., less smooth).
    // Compute the binning for each group of the dataset
    var sumstat = d3.rollup(
      data,
      (v) => kde(v.map((d) => d.values)), // Compute the density estimate for values
      (d) => d.category // Group by Species
    );

    // Convert the Map to an Array of objects for easier processing
    sumstat = Array.from(sumstat, ([key, value]) => ({ key, value }));
    // What is the biggest value that the density estimate reach?
    var maxNum = 0;
    for (let i in sumstat) {
      let allBins = sumstat[i].value;
      let kdeValues = allBins.map(function (a) {
        return a[1];
      });
      let biggest = d3.max(kdeValues);
      if (biggest > maxNum) {
        maxNum = biggest;
      }
    }

    // The maximum width of a violin must be x.bandwidth = the width dedicated to a group
    let xNum = d3
      .scaleLinear()
      .range([0, x.bandwidth()])
      .domain([-maxNum, maxNum]);

    // var color = d3
    //   .scaleOrdinal()
    //   .domain([
    //     "Every week or less",
    //     "Every fifteen days",
    //     "Each month",
    //     "Every two months",
    //     "Every three months",
    //     "Every six months",
    //     "Once a year",
    //     "On extraordinary occasions",
    //     "Other",
    //   ]) // Get unique species
    //   .range(["#69A0A4", "#707070"])
    //   .interpolate(d3.interpolateRgb);

    const my_categories = [
      "Every week or less",
      "Every fifteen days",
      "Each month",
      "Every two months",
      "Every three months",
      "Every six months",
      "Once a year",
      "On extraordinary occasions",
      "Other",
    ];
    var color = d3
      .scaleLinear()
      .domain([0, 8])
      .range(["#69A0A4", "#707070"])
      .interpolate(d3.interpolateRgb);

    // Add the shape to this svg!
    svg
      .selectAll("myViolin")
      .data(sumstat)
      .enter() // So now we are working group per group
      .append("g")
      .attr("transform", function (d) {
        return "translate(" + x(d.key) + " ,0)";
      }) // Translation on the right to be at the group position
      .append("path")
      .each(function (d) {
        console.log(d);
      }) // Log `d` for each element
      .datum(function (d) {
        return d.value;
      }) // So now we are working density per density
      .style("stroke", "none")
      // .style("fill", (d, i) => color(i))
      .style("fill", "#69A0A4")

      .attr(
        "d",
        d3
          .area()
          .x0(function (d) {
            return xNum(-d[1]);
          })
          .x1(function (d) {
            return xNum(d[1]);
          })
          .y(function (d) {
            return y(d[0]);
          })
          .curve(d3.curveCatmullRom) // This makes the line smoother to give the violin appearance. Try d3.curveStep to see the difference
      );

    // 2 functions needed for kernel density estimate
    function kernelDensityEstimator(kernel, X) {
      return function (V) {
        return X.map(function (x) {
          return [
            x,
            d3.mean(V, function (v) {
              return kernel(x - v);
            }),
          ];
        });
      };
    }
    function kernelEpanechnikov(k) {
      return function (v) {
        return Math.abs((v /= k)) <= 1 ? (0.75 * (1 - v * v)) / k : 0;
      };
    }
  });
</script>

<svg bind:this={svg} width="1000" height="400" />
