<script src="../helpers/d3-ForceEdgeBundling.js">
    import * as d3 from "d3";
    import { results } from "../../data/results";
    
    const width = 620;
    const height = 620;
    const defaultOpacity = 0.3;
    const radius = 300;
    
    const labelOnCircle = function(index) {
        const angleDeg = 50 / list_label.length;
        const angleRad = angleDeg * Math.PI / 180;
        const x = radius*Math.cos(Math.PI/6 - index*angleRad);
        const y = radius*Math.sin(Math.PI/6 - index*angleRad);
        return {x: x, y: y}
    };

	const list_label = [
		'Food purchase',
		'Health expenses',
		'Education expenses',
		'Housing',
		'Purchase of agricultural inputs',
		'Saving',
		'Payment of commitments abroad',
		'Payment of the sender\'s travel debt',
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
  
    const colors = ["#94855f", "#76958d", "#69a0a4", "#188977", "#0E4D64", "#BFE1B0", "#0A2F51", "#B29D4E", "#9F635D"];
    const colorScale = d3
      .scaleOrdinal()
      .domain(hoverables.map(v => `x_${v.x}_y_${v.y}`))
      .range(colors);
    // state trackers
    let hovered = -1; // index of the hovered segment
    // $: console.log(hovered);
</script>
  
<div class="visualization">
    <svg {width} {height}>
    	<g transform="translate(310, 310)">
        	{#each results.data as data}
          		<path
            		d={d3line(data)}
            		fill="none"
            		stroke={(hovered === `x_${data[data.length-1].x}_y_${data[data.length-1].y}` || hovered === -1) ? colorScale(`x_${data[data.length-1].x}_y_${data[data.length-1].y}`) : '#808080'}
            		stroke-opacity={0.15}
            		stroke-width={1}
					on:mouseover={(event) => {
						hovered = `x_${data[data.length-1].x}_y_${data[data.length-1].y}`;
					}}
					on:focus={() => {}}
					on:mouseout={(event) => {
						hovered = -1;
					}}
					on:blur={() => {}}
          		/>
        	{/each}
        	<!-- {#each hoverables as hover}
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
        	{/each} -->
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
  