<script>
    export let index;
    let isVisible = false;
  
    $: if (index === 3) {
      isVisible = true;
    } else {
      isVisible = false;
    }
  
  </script>

  <iframe class = "HierearchyChart" title = "Demo Hierarchy Chart" class:visible={isVisible} width="100%" height="978" frameborder="0"
  src="https://observablehq.com/embed/@d3/hierarchical-bar-chart?cells=chart"></iframe>

  <style>
    .HierearchyChart {
      /* position: absolute; */
      opacity: 0;
      visibility: hidden;
      transition: opacity 2s, visibility 2s; 
    }
  
    .HierearchyChart.visible {
      opacity: 1;
      visibility: visible;
    }
  </style>