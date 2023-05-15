<script>
  import River from "./graphs/River.svelte";
  import Radial from "./graphs/Radial.svelte";
  import "@fontsource/libre-franklin";
  import "@fontsource/libre-franklin/600.css";
  import "@fontsource/domine/700.css";
  import "@fontsource/gelasio";
  import "@fontsource/gelasio/600.css";

  import PathwayWrapper from "./wrappers/PathwayWrapper.svelte";
  import Spin from "./graphs/Spin.svelte";
</script>

<div>
  <div class="text-block">
    <p class="myth-title">The Easy Road Less Traveled</p>
  </div>

  <div class="text-block">
    <p class="body-text">
      Accessing regular pathways to migrate to the United States can be an
      insurmountable challenge for Central American migrants. Despite a
      seemingly diverse array of migration options such as family-based
      immigration, employment-based visas, diversity visas, and humanitarian
      protection programs, the reality is that these pathways are increasingly
      difficult to navigate due to limited availability, strict eligibility
      criteria, long waiting periods, and complex application processes. In
      light of these obstacles, many Central American migrants find themselves
      with few viable options, either resorting to dangerous and irregular
      migration routes or facing the possibility of being indefinitely separated
      from their loved ones. Test your knowledge on migration routes below <span
        class="bolded"
      >
        by clicking on the option corresponding to your answer</span
      >.
    </p>
  </div>

  <PathwayWrapper />

  <div class="text-block">
    <p class="body-text">
      According to Michael A. Clemens' research paper, "Pathways for Labor
      Migration from Northern Central America: Five Difficult but Necessary
      Proposals," it is distressing to note that out of every 100 individuals
      from Northern Central America, only two have access to existing lawful
      migration channels. This means that the other 98 people have limited
      options and face significant challenges in seeking a better life
      elsewhere. They are left with no other choice but to endure the difficult
      conditions in their home countries or to embark on dangerous and often
      deadly journeys to find refuge in other nations. The lack of accessible
      and inclusive migration policies underscores the urgent need for systemic
      change to ensure that individuals seeking a better life are not forced
      into perilous situations.
    </p>
    <p class="body-text">
      When migrants decide whether they should embark on this journey, they
      cannot afford to look at the low probability of it and perform an in depth
      analysis because their family’s life depends on their success. They have
      to ‘gamble’ with their finances and future in hopes for a better life.
      Imagine you are in Central America and your only chance of survival is
      trying to migrate. <span class="bolded">
        Spin the wheel below to test your odds of making it to the U.S.
      </span>
    </p>
  </div>

  <div class="callout">
    <span class="question"
      >What do you think the odds are for a Central American migrant worker to
      make it to the U.S.?
    </span>
  </div>

  <Spin />

  <div class="text-block add-margin-top">
    <p class="body-text">
      Unfortunately, not being able to take a regular migration route and having
      to spin the wheels of fortune lead Central American migrants towards
      tragedy. Although often overlooked, the tragedies that befall migrants in
      their quest for a better life are not forgotten. The International
      Organization for Migration (IOM) established the Missing Migrants Project
      to document the incidents where migrants, including refugees and
      asylum-seekers, have perished at national borders or during the migration
      process to international destinations. This initiative was a response to
      the scattered reports of people dying or disappearing along migratory
      routes globally. We have endeavored to bring this data to life by
      highlighting how migrants, in pursuit of the American Dream, have lost
      their lives during their journey. The figure below will offer you an
      insight into some of these sad stories. Hover over some of the ‘towers’ to
      explore what happened to these migrants. Below the visualization you will
      find an in depth description of the visualization.
    </p>
  </div>

  <Radial />

  <div class="text-block add-margin-top">
    <span class="viz-footnote"
      >Title: Radial Visualization of Distance Traveled by Missing or Deceased
      Migrant Workers from Different Countries<br />
      Data Source: Missing Migrants Project by International Organization for Migration
    </span>

    <p class="body-text">
      The radial graph depicts each concentric ‘tower’, which comprises one or
      more migrants who began their journey towards the U.S. at the inner
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
  </div>

  <div class="callout">
    <span class="question"
      >How many Central American migrants are actually able to stay in the U.S.?
    </span>
  </div>

  <div class="text-block">
    <p class="body-text">
      Let's focus on the few migrants who successfully reach the US. The United
      States greatly benefits from the labor of immigrants, who play a crucial
      role in various industries, from agriculture to healthcare. However, this
      benefit is often one-sided, with many migrants facing challenges in
      accessing basic services and struggling to make ends meet. Additionally,
      obtaining legal status poses a significant challenge for many, leading to
      an inability to stay in the US for the long term. According to a survey by
      the World Food Program, around half of the migrants were not to stay in
      the US. The discourse around migration often revolves around financial
      gain, but it's important to recognize the complex factors driving
      migration, such as economic hardship, political instability, and violence,
      and approach the issue with empathy and understanding.
    </p>
    <p class="body-text">
      <span class="bolded">
        Take a look at the river depicted below. Each drop of the stream is a
        hard working migrant who has risked everything in pursuit of the
        American Dream. As you may notice, many of these hopeful water drops
        fall from their desired "stream of hope".</span
      >
    </p>
  </div>

  <River />

  <div class="text-block add-margin-top">
    <span class="viz-footnote"
      >Title: Unfulfilled Dreams - Visualizing Migrant Workers Who Were Unable
      to Remain in the U.S.<br />
      Credit: This data visualization was made with data contributed by the United
      Nations World Food Programme (WFP).</span
    >
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
  .bolded {
    font-weight: 600;
  }
</style>
