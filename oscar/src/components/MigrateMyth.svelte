<script>
  import River from "./graphs/River.svelte";
  import Radial from "./graphs/Radial.svelte";
  import "@fontsource/libre-franklin";
  import "@fontsource/libre-franklin/600.css";
  import "@fontsource/domine/700.css";

  import "@fontsource/gelasio";

  import PathwayWrapper from "./PathwayWrapper.svelte";

  import Spin from "./graphs/Spin.svelte";

</script>

<div>
  <div class="text-block">
    <p class="myth-title">The Easy Road Less Traveled</p>
  </div>

  <div class="text-block">
    <p class="body-text">
      The perception of how easy or difficult it is to migrate to the United
      States varies among Americans and is influenced by personal experience,
      political affiliation, and geographic location. According to the Cato
      Institute 2021 Immigration and Identity National Survey of 2,600 U.S.
      adults, more than two‐​thirds (67%) of Americans believe legally
      immigrating to the United States is “fairly difficult” while a third (33%)
      think it’s fairly easy. However, the perception of how difficult is fairly
      difficult varies vastly. We look at this from several dimensions.
    </p>
  </div>

  <PathwayWrapper />

  <div class="text-block">
    <p class="body-text">
      <span class="viz-footnote"> DATA SOURCE: WFP Central American </span>
    </p>
  </div>

  <div class="text-block">
    <p class="body-text">
      The United States offers a diverse array of pathways for individuals
      seeking to migrate, including family-based immigration, employment-based
      visas, diversity visas, and humanitarian protection programs such as
      asylum or refugee status. However, for many Central American migrants,
      accessing these pathways can prove to be challenging. Factors such as
      limited availability of visas, stringent eligibility criteria, lengthy
      waiting periods, and complex application processes often act as barriers
      to entry. As a result, Central American migrants may find themselves with
      limited options, resorting to irregular migration routes or facing
      prolonged separation from their families, underscoring the need for more
      accessible and inclusive migration policies.
    </p>
  </div>

  <Spin />
  <div class="callout">
    <span class="question"
      >How many Central American migrants did NOT make it to the U.S.?
    </span>
  </div>

  <div class="text-block add-margin-top">
    <p class="body-text">
      Although often overlooked, the tragedies that befall migrants in their
      quest for a better life are not forgotten. The International Organization
      for Migration (IOM) established the Missing Migrants Project to document
      the incidents where migrants, including refugees and asylum-seekers, have
      perished at national borders or during the migration process to
      international destinations. This initiative was a response to the
      scattered reports of people dying or disappearing along migratory routes
      globally. We have endeavored to bring this data to life by highlighting
      how migrants, in pursuit of the American Dream, have lost their lives
      during their journey.
    </p>
  </div>

  <Radial />

  <div class="text-block add-margin-top">
    <span class="viz-footnote"
      >"Vanishing Voyagers: Lives Lost and Missing in Migration" <br />
      DATA SOURCE: Missing Migrants Project by International Organization for Migration
    </span>

    <p class="body-text">
      The radial graph depicts each concentric ‘tower’, which comprises of one
      or more migrants who began their journey towards the U.S. at the inner
      tower’s latitude and vanished or perished upon reaching the outer tower’s
      latitude. The graph showcases the immense distances these migrants
      traveled, and how they came perilously close to their desired destination,
      the U.S., only to meet a tragic end. This representation was chosen
      because, like the radial towers, these migrants had a shared objective: to
      reach the U.S. and forge a new life, both for themselves and for their
      host country. The longer concentric towers evoke a sense of despair, akin
      to that of a marathon runner collapsing at the final mile, crushing her
      dreams and aspirations, despite her valiant efforts to that point.
    </p>

    <p class="body-text">
      The longer concentric towers evoke a sense of despair, akin to that of a
      marathon runner collapsing at the final mile, crushing her dreams and
      aspirations, despite her valiant efforts to that point.
    </p>
  </div>

  <div class="callout">
    <span class="question"
      >How many Central American migrants are actually able to stay in the U.S.?
    </span>
  </div>

  <div class="text-block">
    <p class="body-text">
      For a very long time, the first things that Americans associated with
      migration were economic gain, financial aid and jumping the southern
      border. But the journey to the U.S. is by no means a stroll through
      Central Park followed by financial gains and prosperity for migrants. The
      trip from Central America to the U.S.A. is treacherous and filled with
      risks and dangers. Given that migrants experience dire conditions in their
      home town, they are ready to put all their savings and even their life on
      the line for an opportunity for migrating to the U.S. Most migrants never
      make it successfully to the U.S., because of the low number of legal
      migration means, the restrictive border access and the dangers encountered
      during the migration trip.
    </p>
  </div>

  <River />

  <div class="text-block add-margin-top">
    <span class="viz-footnote"
      >The River of Squares: Visualizing the Plight of Migrants Forced to Return
      Home</span
    >
    <p class="body-text">
      According the survey done by the World Food Program, around 50% of the
      migrants never make it into the United States. Here we represent each
      migrant as an individual square, flowing through various stages of their
      journey. As migrants face the challenges and their eventual return,
      providing a humanizing perspective on the stories that lie hidden beneath
      the data, and serves as a compelling call to action for a more
      compassionate approach to migration policy and support services.
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
    text-align: start;
  }

  .myth-title {
    font-size: 1.5rem;
    font-family: "Libre Franklin", sans-serif;
    font-weight: 600;
    line-height: 1.3rem;
    margin: 3rem 0;
  }
  .add-margin-top {
    margin-top: 1rem;
  }
  .add-margin-top-max {
    margin-top: 5rem;
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
