<script>
  import { scaleLinear } from "d3-scale";
  import { tweened } from "svelte/motion";

  let data = [
    { foo: 4, bar: 1 },
    { foo: 6, bar: 7 },
    { foo: 9, bar: 5 },
    { foo: 2, bar: 4 },
    { foo: 8, bar: 2 },
    { foo: 9, bar: 9 },
    { foo: 5, bar: 3 },
    { foo: 3, bar: 8 },
    { foo: 1, bar: 6 },
  ];

  const tweenedX = tweened(data.map((d) => d.foo));
  const setFoo = function () {
    tweenedX.set(data.map((d) => d.foo));
  };
  const setBar = function () {
    tweenedX.set(data.map((d) => d.bar));
  };

  let width = 400;
  let height = 400;

  let xScale = scaleLinear().domain([0, 10]).range([0, width]);
  let yScale = scaleLinear().domain([0, 10]).range([height, 0]);

  export let index;

  let isVisible = false;

  $: if ((index === 0) | (index === 1)) {
    setFoo();
    isVisible = false;
  } else if (index === 2) {
    setBar();
    isVisible = true;
  } else {
    setFoo();
    isVisible = false;
  }
</script>

<div class="my_dataviz chart" class:visible={isVisible}>
  <svg {width} {height}>
    {#each data as d, index}
      <circle
        cx={xScale($tweenedX[index])}
        cy={yScale(d.bar)}
        r={15}
        fill="steelblue"
        stroke="#000000"
      />
    {/each}
  </svg>
</div>

<style>
  .chart {
    background: whitesmoke;
    width: 400px;
    height: 400px;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
    position: sticky;
    top: 10%;
    margin: auto;
  }
  .my_dataviz {
    /* position: absolute; */
    opacity: 0;
    visibility: hidden;
    transition: opacity 2s, visibility 1s;
  }

  .my_dataviz.visible {
    opacity: 1;
    visibility: visible;
  }
</style>
