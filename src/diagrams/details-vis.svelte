<script>

    import { line } from "d3-shape";
    import { scaleLinear } from "d3-scale";
    import { max, range } from "d3-array";
    import { csv } from "d3-fetch";
    import Title from "./title.svelte";

    const data = range(25).map(function(d, i) { return {"x": i, "y": Math.random() } })

    const width = 400;
    const height = 400;

    let x = scaleLinear()
        .domain([0, data.length-1])
        .range([0, width]);

    let y = scaleLinear()
        .domain([0, 1])
        .range([height, 0]);

    let lineChart = line()
        .x(function(d) { return x(d.x); })
        .y(function(d) { return y(d.y); });

    let linePath = lineChart(data)

</script>

<style>
    svg {
        width: 400px;
        height: 400px;
        border: 1px solid var(--gray-border);
    }

    path {
        fill: none;
        stroke: var(--orange);
        stroke-width: 1;
    }
</style>

<div>

    <Title
        titleText="[TK]."
        subtitleText="[TK]."
    />
    <svg>
        <g id="wrapper">
            <path d={linePath}>
        </g>
    </svg>

</div>