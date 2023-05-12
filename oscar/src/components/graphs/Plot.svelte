<script>
  import {
    Runtime,
    Inspector,
  } from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
  import define from "https://api.observablehq.com/@ssiegmund/violin-plot-playground.js?v=3";
  new Runtime().module(define, (name) => {
    if (name === "chartTexture")
      return new Inspector(
        document.querySelector("#observablehq-chartTexture-607398ed")
      );
  });
</script>

<div>
  <div id="observablehq-chartTexture-607398ed" />
  <p>
    Credit: <a href="https://observablehq.com/@ssiegmund/violin-plot-playground"
      >violin plot playground by Sascha Siegmund</a
    >
  </p>

  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css"
  />
</div>
