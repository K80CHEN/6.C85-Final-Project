<script>
  import CirclePack from "./graphs/CirclePack.svelte";
  import Spider from "./graphs/Spider.svelte";
</script>

<div>
  <div class="text-block">
    <p class="myth-title">
      The Remittance Relay: the Hurdles of Migrant Workers' Money Transfers
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

  <div class="text-block add-margin-top">
    <span class="viz-footnote"
      >Data Scource: Remittances Price Worldwide (2016 Q2 - 2022 Q3)</span
    >
    <p class="body-text">
      Contrary to popular belief, these services offer competitive fees and
      exchange rates. Our data shows that the average cost of sending $200
      through these providers is just 5.9% of the transaction amount,
      significantly lower than the 10-15% commonly cited. Furthermore,
      competition among providers has driven down fees in recent years,
      benefiting migrant workers and their families.
    </p>
    <p class="body-text">
      Money transfer services have also excelled in terms of speed and
      accessibility. Our findings indicate that 73.7% of transactions through
      these providers are completed within 24 hours, while 83% are processed
      within 48 hours. Additionally, these services boast an extensive global
      network, making it easy for recipients to access funds in rural and urban
      areas alike.
    </p>
  </div>

  <div class="callout">
    <span class="question"
      >Does this mean that sending remittances present no more challenges?
    </span>
  </div>

  <div class="text-block">
    <p class="body-text">
      Definitely not! While these bank alternatives have helped in reducing the
      cost and time it takes to send money across borders. However, it is
      important to note that migrant workers still face challenges when it comes
      to sending remittances.
    </p>
    <p class="body-text">
      A significant challenge faced by migrant workers when sending remittances
      is the lack of readily available information to compare the costs and
      features of various service providers. With numerous options in the
      market, each offering different fees, exchange rates, and transaction
      speeds, it can be an overwhelming task for migrant workers to identify the
      most affordable and efficient service tailored to their specific needs.
      This information asymmetry can lead to suboptimal decisions, causing
      workers to use more expensive or slower services than necessary.
    </p>
    <p class="body-text">
      For example, the radar chart below displays the most used bank and money
      transfer service provider’s average cost (as a percentage of the total
      amount sent $200) depending on when the money arrives. As we can see,
      MoneyGram provides a much smaller overall cost for sending and receiving
      remittances on the same day, whereas WesternUnion has the highest fees.
    </p>
  </div>

  <div class="radar-chart-group">
    <Spider />
  </div>
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

  .myth-title {
    font-size: 1.5rem;
    font-family: "Libre Franklin", sans-serif;
    font-weight: 600;
    line-height: 2rem;
    margin: 3rem 0;
  }

  .add-margin-top {
    margin-top: 1rem;
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
