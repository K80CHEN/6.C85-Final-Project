<!-- static histogram display when scrolled to position -->

<script>
  import * as d3 from "d3";
  import { onMount } from "svelte";
  var data = [30, 86, 168, 281, 303, 365];

  export let index;
  let isVisible = false;
  let container;

  // change index number to correspond to at which section this component gets displayed
  // remember index starts from 0

  $: if (index === 1) {
    isVisible = true;
  } else {
    isVisible = false;
  }

  onMount(() => {
    d3.select(container)
      .selectAll("div")
      .data(data)
      .enter()
      .append("div")
      .style("width", function (d) {
        return d + "px";
      })
      .text(function (d) {
        return d;
      });
  });
</script>

<div
  class="my_dataviz my_chart"
  class:visible={isVisible}
  bind:this={container}
/>

<style>
  .my_dataviz {
    /* position: absolute; */
    opacity: 0;
    visibility: hidden;
    transition: opacity 2s, visibility 2s;
  }

  .my_dataviz.visible {
    opacity: 1;
    visibility: visible;
  }

  .my_chart :global(div) {
    font: 10px sans-serif;
    background-color: steelblue;
    text-align: right;
    padding: 3px;
    margin: 1px;
    color: white;
  }
</style>
