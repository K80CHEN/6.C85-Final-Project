<script>
	import * as d3 from 'd3';
    import { sankey as Sankey, sankeyLinkHorizontal} from "d3-sankey";
	import { remittance_use } from '../../data/remittance_uses';
	
	const width = 750;
	const height = 500;
    const defaultOpacity = 0.3;

	const sankey = Sankey()
                     .nodeId(d => d.id)
                     .nodeWidth(15)
                     .nodePadding(30)
                     .size([width, height])
    
    const nodes = remittance_use.data.map(function(d) { return {id: d.id, use: d.use}; });
    nodes.push({id: 9, use: 'Migrants'});
    const links = remittance_use.data.map(function(d) { return {source: 9, target: d.id, value: d.values}; });
    let graph = sankey({nodes: nodes, links: links});

    const linkGenerator = sankeyLinkHorizontal();

    const colors = ["#ad002d","#3addc5","#e600d2","#007203","#6b008e",
                    "#ffa834","#005da3","#e76800","#ceaeff","#003503",
                    "#ffa3d8","#00885c","#ac2600","#331a49","#8e6b00",
                    "#ffa7ad","#5d3a00","#d5c593","#6d0014","#ffa178"];
    const colorScale = d3.scaleOrdinal()
                         .domain(graph.nodes.map(d => d.id))
                         .range(colors);
	// state trackers
	let hovered = -1; // index of the hovered segment
	$: console.log(hovered);
</script>

<div class="visualization">
	<svg width={width} height={height}>
        <g transform="translate(0, 25)">
            <defs>
                {#each graph.links as data}
                {console.log(colorScale(data.source.id), colorScale(data.target.id))}
                <linearGradient id={`gradient_${data.source.id}_${data.target.id}`}
                                gradientUnits="userSpaceOnUse"
                                x1=0% y1=100%
                                x2=100% y2=100%>
                    <stop offset="0%" stop-color={colorScale(data.source.id)}/>
                    <stop offset="100%" stop-color={colorScale(data.target.id)}/>
                </linearGradient>
                {/each}
            </defs>
            <g>
                {#each graph.nodes as data}
                <rect x={data.x0} y={data.y0}
                    height={data.y1 - data.y0} width={data.x1 - data.x0}
                    fill={colorScale(data.id)}>
                </rect>
                <text x={data.x0 < width / 2 ? data.x1 + 6 : data.x0 - 6}
                        y={(data.y1 + data.y0)/2}
                        dy=0.35em
                        text-anchor={data.x0 < width / 2 ? "start" : "end"}
                        font-size="18px">
                    {(data.id === hovered) ? `${data.use}, ${data.value}` : data.use}
                </text>
                {/each}
            </g>
            {#each graph.links as data}
                {console.log(data.target.id)}
                <path d={linkGenerator(data)}
                      fill="none"
                      stroke={`url(#gradient_${data.source.id}_${data.target.id})`}
                      stroke-opacity={(hovered === data.target.id) ? 0.5 : defaultOpacity}
                      stroke-width={Math.max(1, data.width)}
                      on:mouseover={(event) => { hovered = data.target.id; }}
                      on:focus={() => {}}
                      on:mouseout={(event) => { hovered = -1; }}
                      on:blur={() => {}}>
                </path>
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
