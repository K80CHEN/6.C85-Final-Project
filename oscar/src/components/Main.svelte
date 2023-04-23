<script>
  import Scroller from "@sveltejs/svelte-scroller";
  import SimpleBar from "./graphs/SimpleBar.svelte";
  import ScatterTween from "./graphs/ScatterTween.svelte";
  let count, index, offset, progress;
</script>

<Scroller
  top={0.0}
  bottom={1}
  threshold={0.2}
  bind:count
  bind:index
  bind:offset
  bind:progress
  id="scroll"
>
  <div class="background" slot="background">
    <div class="graph">
      <SimpleBar {index} />
    </div>
    <div class="graph">
      <ScatterTween {index} />
    </div>
  </div>

  <div class="foreground" slot="foreground">
    <section class="step-section">This is the first section</section>
    <section class="step-section">Simple Bar Chart</section>
    <section class="step-section">Scatter plot tweened.</section>
    <section class="step-section">This is the 4 section.</section>
    <section class="step-section">This is the 5 section.</section>
    <section class="step-section">This is the 6 section.</section>
    <section class="step-section">This is the 7 section.</section>
    <section class="step-section">This is the 8 section.</section>
    <section class="step-section">This is the 9 section.</section>
  </div>
</Scroller>

<style>
  .background {
    position: -webkit-sticky;
    position: sticky;
    width: 100vw;
    margin: 0;
    background-color: #8a8a8a;
    z-index: 0;
    height: 80vh;
    display: flex;
    align-items: start;
    justify-content: start;
    padding-left: 30vw;
  }

  .graph {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80vh;
  }

  .foreground {
    position: relative;
    max-width: 30vw;
  }

  .step-section {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.2);
    padding: 20vh 0;
  }

  section {
    height: 40vh;
    text-align: center;
    max-width: 750px;
    color: white;
    padding: 1em;
    margin: 0 0 2em 0;
  }
</style>
