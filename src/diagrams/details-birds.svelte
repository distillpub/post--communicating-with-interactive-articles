<script>
  import { onMount } from 'svelte';

    // import { line } from "d3-shape";
    // import { scaleLinear } from "d3-scale";
    // import { max, range } from "d3-array";
    // import { csv } from "d3-fetch";
    import Title from "./title.svelte";

    import uk from '../data/uk.json'
    import * as topojson from 'topojson';

    import * as d3 from 'd3';
    import 'd3-geo';

    let _svg;
    let selectedBirdsong;
    let selectedPosition;

    const width = 1800;
    const height = 800;
    function getCirclePosition(circle) {
      var elem = circle;
      return elem.getBoundingClientRect();
    }


    const projection = d3.geoAlbers()
        .center([0, 55.4])
        .rotate([4.4, 0])
        .parallels([50, 60])
        .scale(1200 * 5)
        .translate([width / 2, height / 2]);

    const path = d3.geoPath()
        .projection(projection);

	onMount(() => {

    const svg = d3.select(_svg)
    .attr("width", width)
        .attr("height", height);

      svg.selectAll(".subunit")
          .data(topojson.feature(uk, uk.objects.europe).features)
        .enter().append("path")
          .attr("class", function(d) { return "subunit " + d.id; })
          .attr("d", path);

      svg.append("path")
          .datum(topojson.mesh(uk, uk.objects.europe, function(a, b) { return a !== b && a.id !== "IRL"; }))
          .attr("d", path)
          .attr("class", "subunit-boundary");

      svg.append("path")
          .datum(topojson.mesh(uk, uk.objects.europe, function(a, b) { return a === b && a.id === "IRL"; }))
          .attr("d", path)
          .attr("class", "subunit-boundary IRL");

      d3.csv('british-birdsong-dataset/birdsong_metadata.csv')
        .then((birdsongs) => {
          console.log('birdsongs', birdsongs)

          let selectedCircle;
          birdsongs.forEach((birdsong) => {

            const xy = projection([+birdsong.longitute, +birdsong.latitude]);


            const _circle = svg.append('circle')
              .attr('cx', xy[0])
              .attr('cy', xy[1])
              .attr('r', 10)
              .attr('fill', 'hsl(200, 50%, 25%)')
              .on('mouseenter', () => {
                _circle.transition().duration(100).attr('r', 25).attr('fill', selectedBirdsong === birdsong ? 'green' : 'hsl(24, 100%, 50%)');
              })
              .on('click', () => {
                if (selectedBirdsong === birdsong) {
                  selectedCircle && selectedCircle.transition().duration(100).attr('r', 10).attr('fill', 'hsl(200, 50%, 25%)')
                  selectedBirdsong = null;
                } else {
                  selectedCircle && selectedCircle.transition().duration(100).attr('r', 10).attr('fill', 'hsl(200, 50%, 25%)')
                  selectedPosition = getCirclePosition(_circle.node());
                  selectedBirdsong = birdsong;
                  selectedCircle = _circle;
                  _circle.transition().duration(100).attr('fill', 'green');

                }
              })
              .on('mouseleave', () => {
                // selectedBirdsong = null;
                if (selectedBirdsong !== birdsong) {
                  _circle.transition().duration(100).attr('r', 10).attr('fill', 'hsl(200, 50%, 25%)')
                }
              })
          })
        }).catch(e => {
          console.log('bse', e)
        })
  })

</script>

<style>
    svg {
        width: 100%;
        height: 800px;
        /* border: 1px solid var(--gray-border); */
        background: white;
    }

    svg :global(path) {
        fill: #efefef;
        stroke: #333;
        stroke-width: 0.5;
    }
    svg :global(circle) {
      cursor: pointer;
    }

    .tooltip-text {
      border: solid 2px black;
      background: white;
      font-size: 14px;
      line-height: 16px;
    }

    .birdname {
      font-weight: bold;
      font-size: 16px;
      line-height: 20px;
    }

    .text-container {
      padding: 0.5em;
    }

    audio {
      display: block;
      width: 100%;
    }
</style>

<div class="interactive-container">

    <Title
        titleText="Birdsongs on demand."
        subtitleText="Click on a circle below to call up a field recording of a birdsong."
    />

    <svg
      bind:this={_svg}
      viewBox={`0 0 ${width} ${height}`}
    ></svg>


    {#if selectedBirdsong}
      <div class="tooltip-text" style={`position: absolute; left: ${selectedPosition.x - 100}px; top: ${window.scrollY + selectedPosition.y + 40}px;`}>
        <div class="text-container">
          <div class="birdname">
            {selectedBirdsong.english_cname}
          </div>
          <div>
            Type: {selectedBirdsong.type}
          </div>
          <div>
            Recording provided by {selectedBirdsong.who_provided_recording}
          </div>
        </div>
         <audio controls>
          <source src={`british-birdsong-dataset/songs/songs/xc${selectedBirdsong.file_id}.flac`} type="audio/flac" >
        </audio>
      </div>
    {/if}



</div>