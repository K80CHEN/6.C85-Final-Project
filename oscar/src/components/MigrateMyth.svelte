<script>
  import River from "./graphs/River.svelte";
  import Radial from "./graphs/Radial.svelte";
  import "@fontsource/libre-franklin";
  import "@fontsource/libre-franklin/600.css"; // Weight 400.

  import "@fontsource/gelasio";
</script>

<div>
  <div class="text-block">
    <p class="myth-title">Myth #1 Migrating is "easy"</p>
  </div>

  <div class="text-block">
    <p class="body-text">
      The perception of how easy or difficult it is to migrate to the United
      States varies among Americans and is influenced by personal experience,
      political affiliation, and geographic location. While some believe that
      the current immigration system needs major changes, with 24% saying it
      should be completely rebuilt, according to a Pew Research Center survey
      conducted in 2019, others believe that it is relatively easy to migrate to
      the US due to the country's long history of welcoming immigrants and
      various pathways to legal immigration.
    </p>
    <p class="body-text">
      The idea that migration is a simple and straightforward process is a
      common misconception that glosses over the harsh realities and dangers
      experienced by individuals and families in pursuit of a better life. In
      recent years the US Immigration system has become more and more complex,
      bureaucratic, and creating long waiting times and significant financial
      costs. The journey to get to the US has also increased in difficulty.
    </p>
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
  </div>
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
    line-height: 1.3rem;
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
</style>
