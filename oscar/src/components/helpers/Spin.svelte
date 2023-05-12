<script>
  import * as d3 from "d3";
  import { onMount } from "svelte";

  let chart;
  let question;

  var data = [
    {
      label: "You made it and are able to stay",
      value: 1,
      question: "Congratulations, you were the few. ",
    },
    {
      label: "You did not make it. ",
      value: 2,
      question: "You were eaten by a wolf. Want to try again? ",
    },
    {
      label: "You did not make it. ",
      value: 3,
      question: "You were scammed by the coyote. Want to try again?",
    },
    {
      label: "You did not make it. ",
      value: 4,
      question: "You were eaten by a wolf. Want to try again? ",
    },
    {
      label: "You did not make it",
      value: 5,
      question: "You were eaten by a wolf. Want to try again? ",
    },
    {
      label: "You did not make it",
      value: 6,
      question: "You were eaten by a wolf. Want to try again?",
    },
    {
      label: "You did not make it",
      value: 7,
      question: "You were eaten by a wolf. Want to try again?",
    },
    {
      label: "You did not make it",
      value: 8,
      question: "You were eaten by a wolf. Want to try again?",
    },
    {
      label: "You did not make it",
      value: 9,
      question: "You were eaten by a wolf. Want to try again?",
    },
    {
      label: "You did not make it",
      value: 10,
      question: "You were eaten by a wolf. Want to try again?",
    },
  ];

  let container;
  let svg;
  let vis;

  let padding = { top: 20, right: 40, bottom: 0, left: 0 },
    w = 500 - padding.left - padding.right,
    h = 500 - padding.top - padding.bottom,
    r = Math.min(w, h) / 2,
    rotation = 0,
    oldrotation = 0,
    picked = 100000,
    oldpick = [];

  onMount(() => {
    svg = d3
      .select(chart)
      .append("svg")
      .data([data])
      .attr("width", w + padding.left + padding.right)
      .attr("height", h + padding.top + padding.bottom);
    container = svg
      .append("g")
      .attr("class", "chartholder")
      .attr(
        "transform",
        "translate(" +
          (w / 2 + padding.left) +
          "," +
          (h / 2 + padding.top) +
          ")"
      );
    vis = container.append("g");

    const pie = d3
      .pie()
      .sort(null)
      .value((d) => {
        return 1;
      });
    // declare an arc generator function
    var arc = d3.arc().innerRadius(0).outerRadius(r);
    // select paths, use arc generator to draw
    var arcs = vis
      .selectAll("g.slice")
      .data(pie)
      .enter()
      .append("g")
      .attr("class", "slice");

    arcs
      .append("path")
      .attr("fill", "#69a0a4")
      .attr("d", (d) => arc(d))
      .style("stroke", "white")
      .style("stroke-width", "2px");

    // Add the text
    const labels = arcs
      .append("text")
      .attr("dy", "-0.3em") // Vertically center the text
      .attr("font-family", "gelasio") // Set the font family
      .attr("font-size", "0.8rem") // Set the font size
      .attr("transform", (d) => {
        d.innerRadius = 0;
        d.outerRadius = r;
        d.angle = (d.startAngle + d.endAngle) / 2;
        return (
          "rotate(" +
          ((d.angle * 180) / Math.PI - 90) +
          ")translate(" +
          (d.outerRadius - 10) +
          ")"
        );
      })
      .attr("text-anchor", "end")
      .text((d, i) => data[i].label);

    wrapText(labels, 5);

    function wrapText(text, maxWordsPerLine) {
      text.each(function () {
        const textElem = d3.select(this);
        const words = textElem.text().split(/\s+/);
        const n = words.length;
        const numWordsPerLine = Math.min(n, maxWordsPerLine);
        const lineHeight = 1.1; // ems

        textElem.text(""); // Clear the text

        for (let i = 0; i < n; i += numWordsPerLine) {
          const line = words.slice(i, i + numWordsPerLine).join(" ");
          const dy = i === 0 ? 0 : lineHeight;

          textElem
            .append("tspan")
            .attr("x", 0)
            .attr("dy", dy + "em")
            .text(line);
        }
      });
    }

    container.on("click", spin);

    //make arrow
    svg
      .append("g")
      .attr(
        "transform",
        "translate(" +
          (w + padding.left + padding.right) +
          "," +
          (h / 2 + padding.top) +
          ")"
      )
      .append("path")
      .attr("d", "M-" + r * 0.15 + ",0L0," + r * 0.05 + "L0,-" + r * 0.05 + "Z")
      .style({ fill: "black" });

    //draw spin circle
    container
      .append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 60)
      .style("fill", "#FFFFFF")
      .style("cursor", "pointer");
    //spin text
    container
      .append("text")
      .attr("x", 0)
      .attr("y", 10)
      .attr("text-anchor", "middle")
      .text("SPIN")
      .attr("font-family", "gelasio") // Set the font family
      .attr("font-size", "1rem"); // Set the font size
  });

  function rotTween(to) {
    var i = d3.interpolate(oldrotation % 360, rotation);
    return function (t) {
      return "rotate(" + i(t) + ")";
    };
  }
  let hasSpun = false;

  function spin(d) {
    if (hasSpun) {
      // alert("Too bad");
      showPopup();
      return;
    }
    container.on("click", null);
    //all slices have been seen, all done
    // console.log("OldPick: " + oldpick.length, "Data length: " + data.length);
    if (oldpick.length == data.length) {
      console.log("done");
      container.on("click", null);
      return;
    }
    var ps = 360 / data.length,
      pieslice = Math.round(1440 / data.length),
      rng = Math.floor(Math.random() * 1440 + 360);

    rotation = Math.round(rng / ps) * ps;

    picked = Math.round(data.length - (rotation % 360) / ps);
    picked = picked >= data.length ? picked % data.length : picked;

    if (oldpick.indexOf(picked) !== -1) {
      spin();
      return;
    } else {
      oldpick.push(picked);
    }
    rotation += 90 - Math.round(ps / 2);
    vis
      .transition()
      .duration(3000)
      .attrTween("transform", rotTween)
      .on("end", function () {
        //mark question as seen
        d3.select(".slice:nth-child(" + (picked + 1) + ") path").attr(
          "fill",
          "#707070"
        );
        //populate question
        d3.select("#question h1").text(data[picked].question);
        oldrotation = rotation;

        /* Get the result value from object "data" */
        // console.log(data[picked].value);

        /* Comment the below line for restrict spin to sngle time */
        container.on("click", spin);

        hasSpun = true;
      });
  }

  function showPopup() {
    // console.log("showing popup");
    const popup = d3
      .select(chart)
      .append("div")
      .attr("class", "popup")
      .text("Too bad, most migrant workers only get one chance");

    popup
      .style("display", "flex") // display as a flex container
      .style("justify-content", "center") // center horizontally
      .style("align-items", "center") // center vertically
      .style("position", "absolute")
      .style("top", "50%")
      .style("left", "50%")
      .style("width", "500px")
      .style("height", "500px")
      .style("transform", "translate(-50%, -50%)")
      .style("background-color", "rgba(255, 255, 255, 0.7)") // half-transparent white background
      .style("border", "none") // no border
      .style("border-radius", "10px") // rounded corners
      .style("padding", "20px")
      .style("z-index", "1000")
      .style("font-family", "gelasio") // Set the font family
      .style("font-size", "1.5rem"); // Set the font size

    // setTimeout(() => {
    //   popup.remove();
    // }, 10000);
  }

  function getRandomNumbers() {
    var array = new Uint16Array(1000);
    var scale = d3.scale.linear().range([360, 1440]).domain([0, 100000]);
    if (
      window.hasOwnProperty("crypto") &&
      typeof window.crypto.getRandomValues === "function"
    ) {
      window.crypto.getRandomValues(array);
      console.log("works");
    } else {
      //no support for crypto, get crappy random numbers
      for (var i = 0; i < 1000; i++) {
        array[i] = Math.floor(Math.random() * 100000) + 1;
      }
    }
    return array;
  }
</script>

<div>
  <div id="chart" bind:this={chart} />
  <div id="question" bind:this={question}><h1 /></div>
</div>

<style>
  #chart {
    position: relative;
  }
  #question h1 {
    font-family: "gelasio";
    font-size: 2rem;
    padding: 2rem;
  }
</style>
