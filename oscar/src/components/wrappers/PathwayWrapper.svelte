<script>
  import Question from "../helpers/Question.svelte";
  import Lollipop from "../graphs/Lollipop.svelte";
  import pathwayUserChoice from "../helpers/stores";
  import { onDestroy } from "svelte";

  let choiceSelected = false;

  const unsubscribe = pathwayUserChoice.subscribe((value) => {
    if (value) {
      choiceSelected = true;
    }
  });

  onDestroy(() => {
    unsubscribe();
  });
</script>

<div>
  <Question />
  {#if $pathwayUserChoice}
    <Lollipop selectedChoice={$pathwayUserChoice} />
    <div class="text-block">
      <p class="body-text">
        <span class="viz-footnote">
          Data Scource: World Food Program <br />
          Credit: This data visualization was made with data contributed by the United
          Nations World Food Programme (WFP).
        </span>
      </p>
    </div>
  {/if}
</div>

<style>
  .text-block {
    display: block;
    margin: 0 auto;
    max-width: 460px;
    margin-bottom: 2rem;
  }
  .body-text {
    font-family: "Gelasio", serif;
    font-size: 17px;
    line-height: 1.6;
    text-align: justify;
    text-justify: inter-word;
  }
  span.viz-footnote {
    display: block;
    font-size: 11px;
    line-height: 16px;
    font-family: "Libre Franklin", sans-serif;
    color: #999;
    text-align: start;
    margin-bottom: 2.5rem;
  }
</style>
