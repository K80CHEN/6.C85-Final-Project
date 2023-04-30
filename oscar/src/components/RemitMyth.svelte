<script>
  import CirclePack from "./graphs/CirclePack.svelte";
  import Speed from "./graphs/Speed.svelte";
  import Spider from "./graphs/Spider.svelte";
</script>

<div>
  <div class="text-block">
    <p class="myth-title">
      Myth #3: Migrant workers have few vehicles to send money back; it takes a
      long time and is very expensive.
    </p>
  </div>
  <div class="text-block">
    <p class="body-text">
      For years, the common perception has been that migrant workers struggle to
      find efficient and cost-effective methods to send money back to their
      families. However, our data-driven investigation into the remittance
      landscape tells a slightly different story.
    </p>
    <p class="body-text">
      Our analysis of the remittances price worldwide dataset from more than
      1700 transactions whose destination region is in Latin America &
      Caribbeans from 2016 Q2 to 2022 Q3, reveals that the majority (90%)
      actually utilize money transfer service providers, such as Western Union,
      MoneyGram, for their remittance needs.
    </p>
  </div>

  <CirclePack />

  <!-- <Speed /> -->
  <Spider />
</div>

<style>
  .text-block {
    display: block;
    margin: 0 auto;
    max-width: 460px;
    margin-bottom: 5rem;
  }
  .body-text {
    font-family: "Gelasio", serif;
    font-size: 17px;
    line-height: 1.6;
    text-align: start;
  }

  .myth-title {
    font-size: 1.5rem;
    font-family: "Libre Franklin", sans-serif;
    font-weight: 600;
    line-height: 2rem;
    margin: 3rem 0;
  }
</style>
