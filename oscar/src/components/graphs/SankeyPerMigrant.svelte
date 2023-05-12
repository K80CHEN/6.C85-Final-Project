<script>
  import * as d3 from "d3";
  import { sankey as Sankey, sankeyLinkHorizontal } from "d3-sankey";
  // import { remittance_use } from "../../data/remittance_uses";
  import { remittance_use } from "../../data/remit_per_migrant";

  const width = 750;
  const height = 10000;
  const defaultOpacity = 0.3;

  const sankey = Sankey()
    .nodeId((d) => d.id)
    .nodeWidth(15)
    .nodePadding(30)
    .size([width, height]);

  const nodes = remittance_use.data.map(function (d) {
    return { id: d.index, use: d.values };
  });
  const list_label = [
      'Food purchase',
      'Health expenses',
      'Expenses related \nto COVID-19',
      'Education expenses',
      'Payment of services',
      'Clothes and shoes',
      'Housing',
      'Housing rental fee',
      'Home purchase fee',
      'Purchase of agricultural inputs',
      'Business',
      'Saving',
      'Payment of commitments of members residing abroad',
      'Payment of the sender\'s travel debt',
      'Payment of other debts',
      'Other'
  ];
  for (let i=4990; i < list_label.length + 4990; i++) {
    nodes.push({ id: i, use: list_label[i - 4990] });
  }

  const links = remittance_use.data.map(function (d) {
    const link_per_migrant = [];
    for (const u of d.values) { link_per_migrant.push({ source: d.index, target: list_label.indexOf(u) + 4990, value: 1 }); }
    return link_per_migrant;
  }).flat();

  let graph = sankey({ nodes: nodes, links: links });

  const linkGenerator = sankeyLinkHorizontal();

  const colors = ["#94855f", "#ccb58a", "#76958d", "#db99b", "#69a0a4"];
  const colorScale = d3
    .scaleOrdinal()
    .domain(list_label.map((d) => list_label.indexOf(d) + 4990))
    .range(colors);
  // state trackers
  let hovered = -1; // index of the hovered segment
  // $: console.log(hovered);
</script>

<div class="visualization">
  <svg {width} {height}>
    <g transform="translate(0, 25)">
      <defs>
        {#each graph.links as data}
          <!-- {console.log(colorScale(data.source.id), colorScale(data.target.id))} -->
          <linearGradient
            id={`gradient_${data.source.id}_${data.target.id}`}
            gradientUnits="userSpaceOnUse"
            x1="0%"
            y1="100%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stop-color='#800020' />
            <stop offset="100%" stop-color={colorScale(data.target.id)} />
          </linearGradient>
        {/each}
      </defs>
      <g>
        {#each graph.nodes as data}
          <rect
            x={data.x0}
            y={data.y0}
            height={data.y1 - data.y0}
            width={data.x1 - data.x0}
            fill={(data.id < 4990)? '#800020' : colorScale(data.id)}
          />
          <!-- <text
            x={data.x0 < width / 2 ? data.x1 + 6 : data.x0 - 6}
            y={(data.y1 + data.y0) / 2}
            dy="0.35em"
            text-anchor={data.x0 < width / 2 ? "start" : "end"}
            font-size="18px"
          >
            {data.id === hovered ? `${data.use}, ${data.value}` : data.use}
          </text> -->
        {/each}
      </g>
      {#each graph.links as data}
        <!-- {console.log(data.target.id)} -->
        <path
          d={linkGenerator(data)}
          fill="none"
          stroke={`url(#gradient_${data.source.id}_${data.target.id})`}
          stroke-opacity={hovered === data.target.id ? 0.5 : defaultOpacity}
          stroke-width={Math.max(1, data.width)}
          on:mouseover={(event) => {
            hovered = data.target.id;
          }}
          on:focus={() => {}}
          on:mouseout={(event) => {
            hovered = -1;
          }}
          on:blur={() => {}}
        />
      {/each}
    </g>
  </svg>
</div>

<style>
  .visualization {
    font: 25px sans-serif;
    margin-top: 0;
    text-align: middle;
  }
</style>
