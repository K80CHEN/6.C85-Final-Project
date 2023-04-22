<script>
  export let index;
  let container;
  let isVisible = false;

  $: if (index === 0) {
    isVisible = true;
  } else {
    isVisible = false;
  }
</script>

<img
  class="img2"
  class:visible={isVisible}
  bind:this={container}
  src="http://placehold.it/300x200"
  srcset="
	    http://placehold.it/300x200 300w"
  sizes="
	    
  70vw"
  alt="Placeholder"
/>

<style>
  .img2 {
    /* position: absolute; */
    opacity: 0;
    visibility: hidden;
    transition: opacity 2s, visibility 2s;
  }

  .img2.visible {
    opacity: 1;
    visibility: visible;
  }
</style>
