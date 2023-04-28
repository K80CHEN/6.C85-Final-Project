<script>
  import { onMount } from "svelte";

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

  let chart = [];

  onMount(async () => {
    const response = await fetch("src/data/HH_size.json");
    const data = await response.json();
    chart = createBarChart(data);
  });

  function createBarChart(data) {
    if (!data || data.length === 0) {
      return [];
    }

    const maxValue = Math.max(...data.map((d) => d.Percentage));
    const chartHeight = 300; // Change this value to control the maximum height of the chart

    const scale = chartHeight / maxValue;

    return data.map((d) => {
      return {
        ...d,
        scaledValue: d.Percentage * scale,
      };
    });
  }
</script>

{#if chart && chart.length}
  <div class="bar-container" class:visible={isVisible}>
    {#each chart as { HHSize, scaledValue }}
      <div class="bar" style="height: {scaledValue}px;">
        <span>{HHSize}</span>
      </div>
    {/each}
  </div>
{:else}
  <p>Loading chart...</p>
{/if}

<style>
  .bar-container {
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    height: 300px;
    max-height: 300px; /* Change this value to control the maximum height of the chart */

    opacity: 0;
    visibility: hidden;
    transition: opacity 2s, visibility 2s;
  }

  .bar {
    width: 20px;
    background-color: steelblue;
    text-align: center;
    color: white;
  }

  .bar-container.visible {
    opacity: 1;
    visibility: visible;
  }
</style>
