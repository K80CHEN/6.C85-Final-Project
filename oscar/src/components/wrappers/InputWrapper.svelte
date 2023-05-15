<script>
  import Input from "../helpers/Input.svelte";
  import Barcode from "../graphs/Barcode.svelte";
  import { writable, derived } from "svelte/store";
  import Violin from "../graphs/Violin.svelte";

  let data = [
    100, 75, 120, 400, 50, 200, 350, 16.9, 5.1, 25.4, 100, 100, 150, 150, 250,
    400, 100, 200, 50, 150, 150, 100, 150, 600, 100, 25.4, 33.8, 500, 400, 200,
    100, 150, 200, 250, 20.2, 10.1, 13.4, 11.8, 100, 60, 3.4, 200, 0.3, 200,
    200, 200, 150, 50, 120, 200, 200, 100, 400, 100, 150, 50, 100, 300, 100,
    500, 300, 200, 300, 225, 10.1, 16.8, 25.4, 13.2, 8.4, 25.4, 50.7, 12.7, 200,
    4.2, 100, 100, 300, 150, 100, 50, 150, 150, 400, 200, 100, 60, 100, 150,
    150, 100, 500, 200, 300, 350, 200, 8.4, 300, 5, 100, 25.4, 300, 300, 300,
    3.4, 100, 150, 75, 60, 300, 12.7, 50, 100, 100, 0.1, 2.5, 91.3, 16.8, 100,
    4.2, 3.4, 84.5, 230, 12.7, 62.5, 12.7, 33.8, 33.8, 16.9, 200, 6.3, 150, 350,
    800, 473.2, 169, 50.7, 101.4, 350, 59.2, 25.4, 3.4, 2.4, 10.1, 50, 100,
    10.1, 150, 60, 100, 150, 50, 300, 300, 150, 4, 38.9, 100, 400, 5.1, 405.6,
    84.5, 202.8, 16.9, 12.7, 25.4, 11.8, 23.7, 300, 500, 3.4, 25.4, 16.9, 2,
    3.4, 4, 2.4, 3.4, 3.4, 3.4, 23.5, 10.1, 75, 70, 100, 100, 200, 250, 200,
    23.7, 6.3, 59.2, 200, 2, 25.4, 1000, 30, 3.7, 280, 100, 800, 100, 100, 100,
    100, 100, 200, 150, 5, 16.8, 100, 100, 42.3, 33.8, 200, 1000, 12.7, 25.4,
    25.4, 25.4, 33.8, 13.5, 5, 3.7, 150, 100, 100, 8.4, 50, 200, 100, 200, 100,
    300, 150, 350, 200, 160, 150, 50, 200, 100, 100, 50, 200, 200, 300, 300, 50,
    50, 11.8, 100, 7.7, 500, 33.8, 50.7, 12.7, 500, 11.8, 100, 16.9, 100, 50,
    33.8, 13.5, 150, 50, 100, 100, 200, 200, 200, 500, 150, 20, 250, 50, 50,
    200, 300, 100, 500, 100, 100, 100, 300, 50.7, 12.7, 42.3, 50.7, 169, 3.4,
    6.7, 20.3, 16.9, 12.3, 200, 100, 50.7, 33.8, 59.2, 150, 5, 8.5, 59.2, 59.2,
    22, 11.8, 84.5, 50, 200, 200, 11.8, 25.4, 42.3, 7.4, 50, 20.2, 3.4, 50.7,
    2.4, 11.8, 12.7, 50, 2.5, 100,
  ];
  let highlightedValue = writable(null);
  let localData = [...data];

  function handleInputSubmit(value) {
    // Update the highlighted value
    highlightedValue.set(value);
    localData = [...data, value];
  }
  $: if ($highlightedValue !== null) {
    localData = [...data, $highlightedValue];
  }
</script>

<div>
  <Input onSubmit={handleInputSubmit} />
  {#if $highlightedValue !== null}
    <Barcode data={localData} highlightedValue={$highlightedValue} />

    <div class="text-block">
      <p class="body-text">
        From the World Food Program survey data, we counted 768 reportings of
        remittances that were sent back on a monthly basis. The barcode plot
        visualizes the distribution of the amounts of remittances. The average
        remittance amount is ~160 USD, the median is only ~100 USD.
      </p>
      <p class="body-text">
        The following violin plot visualizes the distrubution of remittances
        amount by different frequencies. Overall, most remittances are around
        $100 - $200 range, regardless of frequency it was sent back. As the
        frequency decreases, the amount sent back also decreases. Presumably
        migrant workers would want to send back remittances as frequent as
        possible, and for those who cannot afford to sent more frequently, their
        remittances amount might also be lower.
      </p>
    </div>

    <Violin />
    <div class="text-block">
      <span class="viz-footnote"
        >Title: Distribution of Remittance Amount (in USD) by Different
        Frequencies
        <br />
        Credit: These data visualizations were made with data contributed by the
        United Nations World Food Programme (WFP).</span
      >
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
