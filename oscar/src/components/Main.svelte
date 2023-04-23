<script>
  import Scroller from "@sveltejs/svelte-scroller";
  import Wrapper1 from "./Wrapper1.svelte";
  import Wrapper2 from "./Wrapper2.svelte";
  import Map from "./Map.svelte";
  import Hist from "./graphs/Hist.svelte";

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
    <div class="chart">
      <!-- <Map {index} /> -->
    </div>
    <div class="chart">
      <Hist {index} />
    </div>
  </div>

  <div class="foreground" slot="foreground">
    <section class="step">This is the first section.</section>
    <section class="step">This is the second section.</section>
    <section class="step">This is the third section.</section>
    <section class="step">This is the 4 section.</section>
    <section class="step">This is the 5 section.</section>
    <section class="step">This is the 6 section.</section>
    <section class="step">This is the 7 section.</section>
    <section class="step">This is the 8 section.</section>
    <section class="step">This is the 9 section.</section>
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

  .foreground {
    position: relative;
    max-width: 30vw;
  }

  .step {
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
