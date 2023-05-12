<script src="../helpers/d3-ForceEdgeBundling.js">
    import * as d3 from "d3";
    import { results } from "../../data/results";
    
    const width = 1020;
    const height = 1020;
    const defaultOpacity = 0.3;
    const radius = 500;
    
    const labelOnCircle = function(index) {
        const angleDeg = 120 / list_label.length;
        const angleRad = angleDeg * Math.PI / 180;
        const x = radius*Math.cos(Math.PI/6 - index*angleRad);
        const y = radius*Math.sin(Math.PI/6 - index*angleRad);
        return {x: x, y: y}
    };

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

    const hoverables = [];
    for (let i=4990; i < list_label.length + 4990; i++) {
        const circ = labelOnCircle(i - 4990);
        hoverables.push({'caption': list_label[i - 4990], 'id': i, 'x': circ.x, 'y': circ.y});
    }

    var d3line = d3.line()
                   .x(function(d){ return d.x; })
                   .y(function(d){ return d.y; })
                   .curve(d3.curveBasis);
  
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
      <g transform="translate(510, 510)">
        {#each results.data as data}
          <path
            d={d3line(data)}
            fill="none"
            stroke={'#76958D'}
            stroke-opacity={0.15}
            stroke-width={1}
          />
        {/each}
        {#each hoverables as hover}
          <circle cx={hover.x} cy={hover.y} r={5}
					on:mouseover={(event) => {
						hovered = hover.id;
					}}
					on:focus={() => {}}
					on:mouseout={(event) => {
						hovered = -1;
					}}
					on:blur={() => {}}></circle>
			<text x={hover.x} y={hover.y} dy="0.35em"
            text-anchor={"end"}
            font-size="18px">{hover.id === hovered ? hover.caption : ''}</text>
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
  