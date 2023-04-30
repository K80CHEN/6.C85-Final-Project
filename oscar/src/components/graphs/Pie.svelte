<script>
	import * as d3 from 'd3';
    const data = {"Domestic violence": 5.0, "Due to loss of land due to processes of land use change": 9.0, "For health: treatments, surgeries or medical consultations, medicines, etc.": 27.0, "For cultural reasons or custom": 30.0, "By the direct impact of a natural hazard": 39.0, "For study": 62.0, "Other": 67.0, "Deterioration of livelihoods due to natural hazards (floods, droughts, volcanic eruptions, hurricanes, plagues, etc.)": 85.0, "Unsafety": 99.0, "Family reunification": 133.0, "Adventure Turism": 157.0, "Lack of money to buy food": 370.0, "To send remittances": 385.0, "Lack of money to cover other basic needs (health, education, housing, clothing, services, etc.)": 526.0, "Unemployment": 660.0, "Search for a better job, salary or working conditions": 1785.0};

	// arc path and angle generator
	let arcGenerator = d3.arc()
						 .innerRadius(100)
						 .outerRadius(200)
                         .padAngle(0.01);
	let pieAngleGenerator = d3.pie().value( function(d) {return d[1]} );
	let arc_data = pieAngleGenerator(Object.entries(data));

	// color mapping function
	const arc_color = d3.scaleOrdinal()
                        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"])
		                .domain([0,3,6,9,12]);

	// state trackers
	let hovered = -1; // index of the hovered arc, -1 when nothing is hovered
	let recorded_mouse_position = { x: 0, y: 0 };
    $: console.log(hovered, recorded_mouse_position.x, recorded_mouse_position.y);
</script>

<div class="visualization">
    <div class={hovered === -1 ? "tooltip-hidden": "tooltip-visible"}>
        {#if hovered !== -1}
            {arc_data[hovered].data[0]}
        {/if}
    </div>
	<svg width="500" height="500">
		<g transform="translate(250, 250)">
			{#each arc_data as data, id}
			<path 
				d={arcGenerator({startAngle: data.startAngle,endAngle: data.endAngle})}
				fill={id === hovered ? "green": arc_color(data.data[0])}
				on:mouseover={(event) => { hovered = id; 
											recorded_mouse_position = {
									x: event.pageX,
									y: event.pageY
						}
				}}
				on:focus={() => {}}
				on:blur={() => {}}
				on:mouseout={(event) => { hovered = -1; }}
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

	/* dynamic classes for the tooltip */
	.tooltip-hidden {
		visibility: hidden;
        position: absolute;
		/* font-family: "Nunito", sans-serif;
		width: 200px;
		position: absolute; */
	}

	.tooltip-visible {
		/* font: 25px sans-serif;
		font-family: "Nunito", sans-serif; */
		visibility: visible;
        color: black;
        position: absolute;
		/* background-color: #f0dba8;
		border-radius: 10px;
		width: 200px;
		color: black;
		position: absolute;
		padding: 10px; */
	}
</style>
