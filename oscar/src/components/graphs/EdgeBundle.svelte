<script>
    import * as d3 from "d3";
    import { results } from "../../data/results_collected";
    
    const width = 620;
    const height = 620;
    const defaultOpacity = 0.3;
    const radius = 300;
	const upperX = 60;
	const lowerX = -60;

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

    const labelOnCircle = function(index) {
        const angleDeg = 50 / list_label.length;
        const angleRad = angleDeg * Math.PI / 180;
        const x = radius*Math.cos(Math.PI/6 - index*angleRad);
        const y = radius*Math.sin(Math.PI/6 - index*angleRad);
        return {x: x, y: y}
    };

	const labelOnLine = function(index) {
		const y = upperX - index*(upperX - lowerX) / list_label.length;
		return {x: radius*2, y: y};
	}

    const hoverables = [];
	const captions = new Map();
    for (let i=4990; i < list_label.length + 4990; i++) {
        const circ = labelOnCircle(i - 4990);
        hoverables.push({'caption': list_label[i - 4990], 'id': i, 'x': circ.x, 'y': circ.y});
		captions.set(`x_${circ.x}_y_${circ.y}`, list_label[i-4990]);
    }
	
	function update(id) {
		d3.selectAll(id)
		  .style('stroke', colorScale(id))
		  .style('stroke-opacity', 0.15);
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
    let recorded_mouse_position = {x: 0, y: 0};
</script>
  
<div class="visualization">
    <svg {width} {height}>
    	<g transform="translate(310, 310)">
			{#each [...captions.entries()] as [id, label]}
				<g  stroke={(hovered === id || hovered === -1) ? colorScale(id) : '#808080'}
				    stroke-opacity={(hovered === id || hovered === -1) ? 0.15 : 0.05}
				    on:mouseover={(event) => {
						hovered = id;
					}}
					on:focus={() => {}}
					on:mouseout={(event) => {
						hovered = -1;
						recorded_mouse_position = {
							x: event.pageX,
							y: event.pageY
						};
					}}
					on:blur={() => {}}>
					{#each results[id] as data}
						<path
							d={d3line(data)}
							fill="none"
							stroke-width=1
						/>
					{/each}
				</g>
			{/each}
        	<!-- {#each results.data as data}
          		<path
					id={`x_${data[data.length-1].x}_y_${data[data.length-1].y}`}
            		d={d3line(data)}
            		fill="none"
            		stroke-width={1}
					on:mouseover={(event) => {
						hovered = `x_${data[data.length-1].x}_y_${data[data.length-1].y}`;
					}}
					on:focus={() => {}}
					on:mouseout={(event) => {
						hovered = -1;
						recorded_mouse_position = {
							x: event.pageX,
							y: event.pageY
						};
					}}
					on:blur={() => {}}
          		/>
        	{/each} -->
      	</g>
    </svg>
	<div
		class={hovered === -1 ? "tooltip-hidden": "tooltip-visible"}	
		style="left: {recorded_mouse_position.x}px; top: {recorded_mouse_position.y}px">
			{#if hovered !== -1}
				{captions.get(hovered)}
			{/if}
	</div>
</div>
  
<style>
    .visualization {
      font: 25px sans-serif;
      margin-top: 0;
      text-align: middle;
    }

	/* dynamic classes for the tooltip */
	.tooltip-hidden {
		visibility: hidden;
		font-family: "Libre Franklin", sans-serif;
		width: 100px;
		position: absolute;
	}

	.tooltip-visible {
		font: 12px sans-serif;
		font-family: "Libre Franklin", sans-serif;
		visibility: visible;
		background-color: #DEEDCF;
		border-radius: 10px;
		width: 100px;
		color: black;
		position: absolute;
		padding: 5px;
	}
</style>
  