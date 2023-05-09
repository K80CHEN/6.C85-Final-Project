<script>
  import Question from "./helpers/Question.svelte";
  import Lollipop from "./graphs/Lollipop.svelte";
  import pathwayUserChoice from "./helpers/stores";
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
  {/if}
</div>
