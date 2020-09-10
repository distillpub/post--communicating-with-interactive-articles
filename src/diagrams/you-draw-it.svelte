<script>
  import { onMount, onDestroy } from 'svelte';

  import { scaleLinear } from 'd3-scale';
  import { area } from 'd3-shape';
  import { axisBottom, axisLeft } from 'd3-axis';
  import { mean } from 'd3-array';
  import { select, mouse } from 'd3-selection';
  import { drag } from 'd3-drag';
  import { format } from 'd3-format';
  import { transition } from 'd3-transition';
  // import * as d3 from 'd3'
  // const { scaleLinear, area, axisBottom, axisLeft, mean, select, mouse, drag, format } = d3;


  import data from '../data/co2.json';
  import Title from './title.svelte';

  const clamp = (a, b, c) => {
    return Math.max(a, Math.min(b, c))
  }

  let _svg;

  let completed = false;


  const height = 400;
  const width = 700;

  const startYear = 1950;
  const cutoffYear = 1976;
  const endYear = 2014;

  let _reset = () => {};

	onMount(() => {

    const svg = select(_svg);

    svg.append('rect').attr('width', width).attr('height', height).attr('opacity', 0);

    const x = scaleLinear().domain([startYear, endYear]).range([0, width])
    const y = scaleLinear().domain([0, 10000]).range([height, 0])

    // const Area = area().x(d => x(d.year)).y1(d => y(d.total)).y0(y(0));
    const line = area().x(d => x(d.year)).y(d => y(d.total));

    const xAxis = axisBottom().scale(x);
    const yAxis = axisLeft().scale(y);

    //Append group and insert axis
    const xAxisG = svg.append("g").attr('class', 'x axis').attr("transform", "translate(0," + height + ")");
    const yAxisG = svg.append("g").attr('class', 'y axis');

    xAxisG.call(xAxis.ticks(5).tickFormat(format("d")));
    yAxisG.call(yAxis);

    const clipRect = svg.append('clipPath').attr('id', 'clip').append('rect')
      .attr('width', x(cutoffYear) - 2)
      .attr('height', height);


    const correctSel =  svg.append('g').attr('clip-path', 'url(#clip)')

    // correctSel.append('path').attr('class', 'area').attr('d', Area(data));
    correctSel.append('path').attr('class', 'line').attr('d', line(data));
    const yourDataSel = svg.append('path').attr('class', 'your-line');

    let yourData = data
      .map((d) => {
        return { year: d.year, total: d.total, defined: 0 }
      })
      .filter((d) => {
        if (d.year == cutoffYear) d.defined = true
        return d.year >= cutoffYear;
      })

    const circleData = yourData.slice(1).map((d) => {
      return d;
    })

    let circles = svg.selectAll('circle').data(circleData).enter().append('circle')
      .attr('cx', d => x(d.year))
      .attr('cy', d => y(5000))
      .attr('r', 2)
      .attr('fill', '#ddd')
      .attr('stroke', 'none');


    const reset = () => {
      completed = false
      clipRect.transition().duration(1000).attr('width', x(cutoffYear) - 2)

      yourData = data
      .map((d) => {
        return { year: d.year, total: d.total, defined: 0 }
      })
      .filter((d) => {
        if (d.year == cutoffYear) d.defined = true
        return d.year >= cutoffYear;
      })

      yourDataSel.attr('d', '');

       circles = svg.selectAll('circle').data(circleData).enter().append('circle')
      .attr('cx', d => x(d.year))
      .attr('cy', d => y(5000))
      .attr('r', 2)
      .attr('fill', '#ddd')
      .attr('stroke', 'none');


    }

    _reset = reset;

    var Drag = drag()
      .on('drag', function() {
        const pos = mouse(this)
        const year = clamp(cutoffYear+1, endYear, x.invert(pos[0]))
        const total = clamp(0, y.domain()[1], y.invert(pos[1]))

        yourData.forEach((d, i) => {
          if (Math.abs(d.year - year) < .5){
            d.total = total
            d.defined = true

            svg.selectAll('circle').filter((_d) => _d.year === d.year).remove();
          }
        })


        yourDataSel.attr('d', line.defined(d => d.defined)(yourData) )

        if (!completed && mean(yourData, d => d.defined) == 1){
          completed = true
          clipRect.transition().duration(1000).attr('width', x(endYear))
        }
      })

    svg.call(Drag)


  });
</script>

<style>

  #wrapper {
    grid-column: text;
  }

  svg {
    display: block;
    overflow: visible;
    cursor: crosshair;
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
    stroke: var(--orange);
    stroke-width: 3;
    stroke-dasharray: 5 5;
  }

  svg :global(.x.axis text, .y.axis text) {
    font-size: 1.625em;
  }

  .chartwrap {
    position: relative;
    max-width: 90%;
    margin: 0 auto 1em 3em;
    display: block;
    /* height: 400px; */
  }

  svg {
    display: block;
    width: 100%;
  }
  .caption-text {
    margin: 2em auto 0 auto;
    /* max-width: 300px; */
    /* font-size: 0.9em; */
    text-align: center;
  }

  .annotate {
    display: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .reset-button {
    text-decoration: underline;
    cursor: pointer;
    /* text-transform: uppercase; */
  }

  #not-completed-anno {
    position: absolute;
    top: 55%;
    left: 50%;
    font-size: 12px;
    /* color: #999999; */
    line-height: 1.2;
  }

  @media(max-width: 768px) {
    #wrapper {
      grid-column: screen !important;
		}
  }

  @media(max-width: 1000px) {
    #wrapper {
      grid-column: page;
    }
  }
</style>

<figure class="subgrid">
  <div id="wrapper" class="interactive-container">
    <Title
      titleText="Complete the trend of CO2 emissions from burning fossil fuels."
      subtitleText="Letting a reader first guess about data and only showing the ground truth afterwards challenges a reader's prior beliefs and has been shown to improve their recall of information."
    />
    <div class="chartwrap">
      <svg
        bind:this={_svg}
        viewBox={`0 0 ${width} ${height}`}
      >
      </svg>
      <div class="annotate">
        {#if !completed}
          <div id="not-completed-anno" class="figcaption">
            Make a guess for each year up until 2014 to reveal the true trend.
          </div>
        {/if}
      </div>
    </div>
    <div class="caption-text">
      {#if completed}
        <div on:click={() => _reset()}><span class="reset-button figcaption">Reset</span></div>
      {:else}
        <div class="figcaption" style="color: black; opacity: 0.5">
          <!-- Fill in the trend to see the actual data. -->
          Measured in metric tons of CO2.
        </div>
      {/if}
    </div>
  </div>
  <figcaption style="grid-column: text;"><a class="figure-number" href="#you-draw-it">5</a>: Click and drag to make your guess of the data's trend over time. Afterward, the real data will be revealed.</figcaption>
</figure>
