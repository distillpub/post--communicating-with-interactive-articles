<script>
  import { onMount, onDestroy } from 'svelte';

  // TODO - make sure we're just importing what is needed.
  // import * as d3 from 'd3';
  import { scaleLinear } from 'd3-scale';
  import { area } from 'd3-shape';
  import { axisBottom, axisLeft } from 'd3-axis';
  import { mean } from 'd3-array';
  import { select, mouse } from 'd3-selection';
  import { drag } from 'd3-drag';
  import Title from './title.svelte';

  const clamp = (a, b, c) => {
    return Math.max(a, Math.min(b, c))
  }

  let _svg;

  let completed = false;

  const data = [
    {"year": 2001,    "debt": 31.4},
    {"year": 2002,    "debt": 32.6},
    {"year": 2003,    "debt": 34.5},
    {"year": 2004,    "debt": 35.5},
    {"year": 2005,    "debt": 35.6},
    {"year": 2006,    "debt": 35.3},
    {"year": 2007,    "debt": 35.2},
    {"year": 2008,    "debt": 39.3},
    {"year": 2009,    "debt": 52.3},
    {"year": 2010,    "debt": 60.9},
    {"year": 2011,    "debt": 65.9},
    {"year": 2012,    "debt": 70.4},
    {"year": 2013,    "debt": 72.6},
    {"year": 2014,    "debt": 74.4},
    {"year": 2015,    "debt": 73.6},
  ]

  const height = 400;
  const width = 800;

	onMount(() => {

    const svg = select(_svg);

    svg.append('rect').attr('width', width).attr('height', height).attr('opacity', 0);

    const x = scaleLinear().domain([2001, 2015]).range([0, width])
    const y = scaleLinear().domain([0, 100]).range([height, 0])

    const Area = area().x(d => x(d.year)).y1(d => y(d.debt)).y0(y(0));
    const line = area().x(d => x(d.year)).y(d => y(d.debt));

    const xAxis = axisBottom().scale(x);
    const yAxis = axisLeft().scale(y);

    //Append group and insert axis
    const xAxisG = svg.append("g").attr('class', 'x axis').attr("transform", "translate(0," + height + ")");
    const yAxisG = svg.append("g").attr('class', 'y axis');

    xAxisG.call(xAxis);
    yAxisG.call(yAxis);

    const clipRect = svg.append('clipPath').attr('id', 'clip').append('rect')
      .attr('width', x(2008) - 2)
      .attr('height', height)

    const correctSel =  svg.append('g').attr('clip-path', 'url(#clip)')

    correctSel.append('path').attr('class', 'area').attr('d', Area(data));
    correctSel.append('path').attr('class', 'line').attr('d', line(data));
    const yourDataSel = svg.append('path').attr('class', 'your-line');

    const yourData = data
      .map((d) => {
        return { year: d.year, debt: d.debt, defined: 0 }
      })
      .filter((d) => {
        if (d.year == 2008) d.defined = true
        return d.year >= 2008;
      })

    var Drag = drag()
      .on('drag', function() {
        const pos = mouse(this)
        const year = clamp(2009, 2016, x.invert(pos[0]))
        const debt = clamp(0, y.domain()[1], y.invert(pos[1]))

        yourData.forEach((d) => {
          if (Math.abs(d.year - year) < .5){
            d.debt = debt
            d.defined = true
          }
        })

        yourDataSel.attr('d', line.defined(d => d.defined)(yourData) )

        if (!completed && mean(yourData, d => d.defined) == 1){
          completed = true
          clipRect.transition().duration(1000).attr('width', x(2015))
        }
      })

    svg.call(Drag)


  });
</script>

<style>

  div {
    padding: 3em 0 4em 0;
  }
  svg {
    display: block;
    margin: 0 auto;
    overflow: visible;
  }

  svg :global(.axis) {
    opacity: .5;
  }

  svg :global(.line) {
    fill: none;
    stroke: black;
    stroke-width: 3;
  }

  svg :global(.area) {
    fill: #eee;
  }

  svg :global(.your-line) {
    stroke: #f0f;
    stroke-width: 3;
    stroke-dasharray: 5 5;
  }

</style>

<div class="interactive-container">

  <Title
    titleText="Complete the trend for [TK]."
    subtitleText="Letting a reader first guess about data and only showing the ground truth afterwards challenges a reader's prior beliefs and has been shown to improve their recall of information."
  />

  <svg
    bind:this={_svg}
    width={width}
    height={height}
  ></svg>

</div>
