<script>
  import River from "./graphs/River.svelte";
  import Radial from "./graphs/Radial.svelte";
  import "@fontsource/libre-franklin";
  import "@fontsource/libre-franklin/600.css"; // Weight 400.

  import "@fontsource/gelasio";
</script>

<div>
  <div class="text-block">
    <p class="myth-title">Myth #1 Migrating is easy</p>
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
      trip from Central America to the U.A. is treacherous and filled with risks
      and dangers. Even though migrants experience dire conditions in their home
      town and they are ready to put all their savings and even their life on
      the line for an opportunity of migrating to the U.S. Most migrants never
      make it successfully to the U.S.. Given the low number of legal migration
      means, the restrictive border access and the dangers encountered during
      the migration trip, less than 50% of those who try reach their
      destination.
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
      journey. As migrants face the challenges challenges migrants face and
      their eventual return, providing a humanizing perspective on the stories
      that lie hidden beneath the data, and serves as a compelling call to
      action for a more compassionate approach to migration policy and support
      services.
    </p>

    <p class="body-text">
      According to the data from International Organization for Migration's
      Missing Migrant project, more than xx ppl died. We visualized a bunch of
      ppl and we see many who traveled and made it so far but still went missing
      or dead. So sad :/
    </p>
  </div>
  <Radial />
  <div class="text-block add-margin-top">
    <span class="viz-footnote"
      >"Vanishing Voyagers: Lives Lost and Missing in Migration" <br />
      DATA SOURCE: Missing Migrants Project by International Organization for Migration
    </span>
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
