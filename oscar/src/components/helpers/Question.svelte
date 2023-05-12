<script>
  import { onMount } from "svelte";
  import pathwayUserChoice from "../helpers/stores.js";

  let choices = [
    "Tourist visa",
    "Work visa",
    "Student visa",
    "Foreign residence",
    "With papers from Mexico",
    "National identity document (CA-4 countries)",
    "Passport to a country that does not require a Visa",
    "On their own (irregular)",
    "With coyote (irregular)",
    "Migrant caravans (irregular)",
    "Refuge / Asylum",
    "Other",
  ];

  let selectedChoice = null;
  let hoveredChoice = null;

  let active = false;
  function selectChoice(choice) {
    pathwayUserChoice.set(choice);
    selectedChoice = choice;
  }
</script>

<div>
  <div class="callout">
    <span class="question">
      What do you think is the most commonly used pathway for Central American
      migrant workers to migrate to the US?
    </span>
  </div>
  <div class="choice-container">
    {#each choices as choice (choice)}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <button
        class="choice-button {selectedChoice === choice
          ? 'selected'
          : ''} {hoveredChoice === choice ? 'hover' : ''}"
        on:click={() => selectChoice(choice)}
        on:mouseenter={() => {
          if ((hoveredChoice = choice)) {
            active = true;
          }
        }}
        on:mouseleave={() => {
          hoveredChoice = null;
          active = false;
        }}
      >
        {choice}
      </button>
    {/each}
  </div>
</div>

<style>
  .question {
    margin: 20px 0;
  }

  .choice-container {
    max-width: 460px;
    margin: 0 auto;
    margin-bottom: 3rem;
  }
  .choice-button {
    width: 100%;
    text-align: left;
    padding: 10px 20px;
    margin: 0 auto;
    margin: 5px;
    border-radius: 5px;
    background-color: lightgrey;
    cursor: pointer;
    transition: background-color 0.3s;
    border: none;
    outline: none;
    font-family: "Domine";
    font-size: 0.9rem;
  }

  .choice-button.hover {
    background-color: #69a0a4;
  }

  .choice-button.selected {
    background-color: #69a0a4;
  }
  .callout {
    display: block;
    margin: 0 auto;
    text-align: left;
    overflow: visible;
    box-sizing: border-box;
    padding: 2rem;
    border: 1px solid var(--color-stroke-quaternary, #dfdfdf);
    color: var(--color-content-secondary, #363636);
    max-width: 460px;
    margin-bottom: 2rem;
  }
  .question {
    font-family: "Domine", serif;
    font-size: 1.0625rem;
    line-height: 1.5625rem;
    font-weight: 700;
  }
</style>
