<script>
  import Sankey from "./graphs/Sankey.svelte";
  import Violin from "./graphs/Violin.svelte";
  import EdgeBundle from "./graphs/EdgeBundle.svelte";
  import InputWrapper from "./wrappers/InputWrapper.svelte";
</script>

<div>
  <div class="text-block">
    <p class="myth-title">Tipping the Scales of Fortune</p>
  </div>

  <div class="text-block">
    <p class="body-text">
      There is a widespread belief among some Americans that migrant workers are
      able to send back large sums of money to their home countries, creating an
      impression of them as financial powerhouses supporting their families from
      afar. This overestimation often overlooks the reality that many migrant
      workers face low wages, long hours, and job insecurity, which limits their
      capacity to send substantial amounts back home. By perpetuating this
      misconception, we risk undermining the genuine struggles and sacrifices
      that migrant workers make, ultimately hindering a more accurate
      understanding of their experiences and contributions to both their host
      and home countries.
    </p>

    <div class="callout">
      <span class="question"
        >How much do you think a Central American migrant workers send back home
        every month in USD?
      </span>
    </div>

    <div class="text-block">
      <p class="body-text">
        We encourage you to take a guess first! After you enter your guess, we
        will show you how your guess compares to the actual distribution of the
        monthly remittances sent back to El Salvador, Honduras and Guatemala
      </p>
    </div>

    <InputWrapper />

    <div>
      <p class="body-text">
        We then asked our peers to estimate how much Central American migrants
        send back home on a monthly basis, here's a comparison between the
        actual and the guess distributions.
      </p>
    </div>


    <div class="text-block add-margin-top">
      
      <p class="body-text">
        The overestimation of the amounts migrant workers send back home can
        lead to several challenges and problems. It can paint an unrealistic
        picture of migrant workers as affluent and unaffected by economic
        struggles, potentially fostering resentment and misunderstanding among
        the general public. Policymakers might develop and implement policies
        based on inaccurate assumptions about the financial status and
        contributions of migrant workers, leading to ineffective or even harmful
        outcomes. Overestimating the financial power of migrant workers can
        reduce empathy for their struggles and challenges, discouraging public
        support for initiatives aimed at improving their working and living
        conditions.
      </p>
      <p class="body-text">
        The belief that migrant workers are sending large sums back home may
        lead to the assumption that their families do not require any additional
        assistance, potentially resulting in reduced support for social programs
        in their home countries. Overestimation of remittance amounts may shift
        attention away from the need to address labor rights and fair wages for
        migrant workers, perpetuating poor working conditions and exploitation.
      </p>
    </div>
  </div>

  <EdgeBundle />

  <div class="text-block add-margin-top">
    <span class="viz-footnote"
      >This data visualization was made with data contributed by the United
      Nations World Food Programme (WFP).</span
    >
  </div>

  <div class="text-block">
    <p class="body-text">
      Furthermore, we have visualized a typical budget allocation for migrants'
      family back in Central America. Additionally, it's important to highlight
      that while most recipient families may not be wealthy, they are not the
      poorest of the poor either. The high costs of international migration
      often prevent the poorest households from migrating and sending
      cross-border remittances. Consequently, remittances should not be seen as
      a substitute for government assistance, as they don't reach everyone,
      especially the most vulnerable populations.
    </p>
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
    line-height: 1.3rem;
    margin: 3rem 0;
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
  .add-margin-top {
    margin-top: 1.5rem;
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
