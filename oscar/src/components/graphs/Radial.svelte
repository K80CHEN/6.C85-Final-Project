<script>
	import * as d3 from 'd3';
	import { missing } from '../../data/missing';
	
	const width = 750;
	const height = 750;

	const innerRadius = 50;
	const outerRadius = 350;

	const colorMain = '#690A12';

	const amountDomain = [-10, 35]
	const yRadial = d3.scaleLinear()
					  .range([innerRadius, outerRadius])
					  .domain(amountDomain);
	const xRadial = d3.scaleBand()
					  .range([Math.PI / 2 + 0.04, Math.PI / 2 + 2 * Math.PI - 0.1])
					  .align(0)
					  .domain(missing.data.map(d => d.index));
	
	let missingData = missing.data.map(function(d) { return {
												  id: d.index,
												  start: xRadial(d.index),
												  end: xRadial(d.index) + xRadial.bandwidth(),
												  in: yRadial(d.orig),
												  out: yRadial(d.found),
												  all: d,
												}; });
	const lineRotations = missing.data.map(d => ((xRadial(d.index) + xRadial.bandwidth() / 2) * 180) / Math.PI - 90);
	$: console.log(lineRotations);
	const arcGenerator = d3.arc()
						   .padAngle(0.15)
        		 		   .padRadius(innerRadius);
	const hoverGenerator = d3.arc()
							 .innerRadius(innerRadius)
							 .outerRadius(outerRadius + 3)
							 .padAngle(0.01)
							 .padRadius(innerRadius);
	const latitudes = [-2, 4, 10, 16, 22, 28, 34].map(function(d) { 
		const newLat = (d < 0) ? `${d * -1}°S` : `${d}°N`
		return {lat: newLat, loc: yRadial(d)}; 
	});

	// state trackers
	let hovered = -1; // index of the hovered arc, -1 when nothing is hovered
	let current;
	$: console.log(hovered);
	$: if (current !== undefined) console.log(current['Reported Month'], current['Incident year']);
</script>

<div class="visualization">
	<svg width={width} height={height}>
		<g transform={`translate(${width/2}, ${height/2 - 50})`}>
			{#if hovered !== -1 && current !== undefined}
				<text fill={'#690A12'} font-size="15px" text-anchor="middle">
					<tspan x="0" dy="1.2em">{`${current['Reported Month']} ${current['Incident year']}\n`}</tspan>
					<tspan x="0" dy="2.0em">
						{current['Number of Dead']} migrant{current['Number of Dead'] > 1 ? "s" : ""} from {current['Country of Origin']} 
					</tspan>
					<tspan x="0" dy="1.2em"> 
						{current['Number of Dead'] > 1 ? " were" : " was"} reported dead{current['Minimum Estimated Number of Missing'] > 0 ? ` and ${current['Minimum Estimated Number of Missing']} were reported missing` : ""}.
					</tspan>
				</text>
			{:else}
				<text fill={'#690A12'} font-size="15px" text-anchor="middle">
					<tspan x="0" dy="1.2em">Migrants that were</tspan>
					<tspan x="0" dy="1.2em">reported dead or missing</tspan>
					<tspan x="0" dy="1.2em">at the US-Mexico border</tspan>
					<tspan x="0" dy="2.0em">(2022-2023)</tspan>
				</text>
			{/if}
		</g>
		<g transform={`translate(${width/2}, ${height/2})`}>
			{#each missingData as data}
			<path 
				d={arcGenerator({startAngle: data.start, endAngle: data.end, innerRadius: data.in, outerRadius: data.out})}
				fill={colorMain}
			/>
			<path 
				d={hoverGenerator({startAngle: data.start, endAngle: data.end})}
				fill="transparent"
				on:mouseover={(event) => { hovered = data.id; current = data.all; }}
				on:focus={() => {}}
				on:blur={() => {}}
				on:mouseout={(event) => { hovered = -1; }}
			/>
			{/each}
			{#each lineRotations as rot}
			<g transform={`rotate(${rot})`} >
				<line x1=120 x2={yRadial(amountDomain[1] + 2)}
					y1=0 y2=0
					stroke="black"
					opacity=0.7
					stroke-width=0.15>
				</line>
			</g>
		{/each}
		</g>
		{#each latitudes as label}
			<circle
					cx={width/2} cy={height/2}
					fill="none"
					stroke="white"
					stroke-width="2"
					r={label.loc}
			></circle>
			<text x={width/2 + label.loc + 2} y={height/2}
				  fill="#690A12"
				  opacity=0.7
				  font-size="12px"
			>{label.lat}</text>
		{/each}
	</svg>
</div>


<style>
	.visualization {
		font: 25px sans-serif;
		margin-top: 0;
		text-align: middle;
	}
</style>
