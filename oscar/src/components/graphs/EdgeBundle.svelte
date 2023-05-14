<script>
    import * as d3 from "d3";
    import { results } from "../../data/results_collected";
    
    const width = 620;
    const height = 620;
    const defaultOpacity = 0.3;
    const radius = 300;
	const upperX = 60;
	const lowerX = -60;

	let checks = ["x_259.8076211353316_y_149.99999999999997",
        		  "x_273.108882289844_y_124.14321735154174",
				  "x_283.8444470627251_y_97.1201826174963", 
				  "x_291.91346117394716_y_69.18476122273206",
				  "x_297.2401210094536_y_40.59938992503933",
				  "x_299.774385751269_y_11.632611377045015",
				  "x_299.49244748138045_y_-17.44344867314272",
				  "x_296.3969548430427_y_-46.35563784235212",
				  "x_290.51698815834175_y_-74.83234321739437"];
	
	// let checksEntry = Object.entries(checks);
	let selected = [];

	let labels = {"x_259.8076211353316_y_149.99999999999997": "Food purchase",
        "x_273.108882289844_y_124.14321735154174": "Health expenses",
        "x_283.8444470627251_y_97.1201826174963": "Education expenses", 
        "x_291.91346117394716_y_69.18476122273206": "Housing",
        "x_297.2401210094536_y_40.59938992503933": "Purchase of agricultural inputs",
        "x_299.774385751269_y_11.632611377045015": "Saving",
        "x_299.49244748138045_y_-17.44344867314272": "Payment of commitments abroad",
        "x_296.3969548430427_y_-46.35563784235212": "Payment of the sender's travel debt",
        "x_290.51698815834175_y_-74.83234321739437": "Other" };

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
</script>
  
<div class="visualization">
	<div>
		{#each checks as key}
			<label>
				<input type=checkbox bind:group={selected} name="selected" value={key}>
				{labels[key]}
			</label>
		{/each}	
	</div>
    <svg {width} {height}>
    	<g transform="translate(310, 310)">
			{#each [...captions.entries()] as [id, label]}
				<g  stroke={(selected.includes(id)) ? colorScale(id) : '#808080'}
				    stroke-opacity={(selected.includes(id)) ? 0.15 : 0.05}>
					{#each results[id] as data}	
						<path
							d={d3line(data)}
							fill="none"
							stroke-width=1
						/>
					{/each}
				</g>
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
  