<script>
  import { onMount } from 'svelte';

    import { line } from "d3-shape";
    import { scaleLinear } from "d3-scale";
    import { max, range } from "d3-array";
    import { csv } from "d3-fetch";
    import { select, event } from "d3-selection";
    import Title from "./title.svelte";

    import uk from '../data/uk.json'
    import { feature, mesh }  from 'topojson';
    import { geoAlbers, geoPath } from 'd3-geo';

    let _svg;
    let _audio;
    let selectedBirdsong;
    let selectedPosition;

    const width = 1800;
    const height = 600;
    function getCirclePosition(circle) {
      var elem = circle;
      var parentElement = elem.parentElement;
      const crect = elem.getBoundingClientRect();
      const prect = parentElement.getBoundingClientRect();

      return {
        x: crect.x - prect.x,
        y: crect.y - prect.y
      };
    }


    const projection = geoAlbers()
        .center([0, 55.4])
        .rotate([4.4, 0])
        .parallels([50, 60])
        .scale(1200 * 5)
        .translate([width / 2, height / 2]);

    const path = geoPath()
        .projection(projection);

  let __circle;
	onMount(() => {

    const svg = select(_svg)
    // .attr("width", width)
    //     .attr("height", height);

      svg.selectAll(".subunit")
          .data(feature(uk, uk.objects.europe).features)
        .enter().append("path")
          .attr("class", function(d) { return "subunit " + d.id; })
          .attr("d", path);

      svg.append("path")
          .datum(mesh(uk, uk.objects.europe, function(a, b) { return a !== b && a.id !== "IRL"; }))
          .attr("d", path)
          .attr("class", "subunit-boundary");

      svg.append("path")
          .datum(mesh(uk, uk.objects.europe, function(a, b) { return a === b && a.id === "IRL"; }))
          .attr("d", path)
          .attr("class", "subunit-boundary IRL");

      csv('british-birdsong-dataset/birdsong_metadata.csv')
        .then((birdsongs) => {

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
                event.preventDefault();
                _audio && _audio.pause();
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

              __circle = _circle;
          })
        }).catch(e => {
          console.log('Birdsong error:', e)
        })
  })

  const handleSVGClick = () => {
    selectedBirdsong = null;
    select(_svg).selectAll('circle').transition().duration(100).attr('r', 10).attr('fill', 'hsl(200, 50%, 25%)')
    _audio && _audio.pause();
  }

</script>

<figure class="subgrid">
  <div id="wrapper" class="interactive-container">

      <Title
          titleText="Birdsongs on demand."
          subtitleText="Click on a circle below to call up a field recording of a birdsong."
      />
      <div>
        <div class="bird-container">
          <svg
            on:click|self={handleSVGClick}
            bind:this={_svg}
            viewBox={`0 0 ${width} ${height}`}
          ></svg>


          {#if selectedBirdsong}
            <div class="tooltip-text">
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
              <audio controls bind:this={_audio}>
                <source src={`british-birdsong-dataset/songs/songs/xc${selectedBirdsong.file_id}.flac`} type="audio/flac" >
              </audio>
            </div>
          {/if}
        </div>
      </div>

  </div>

  <figcaption style="grid-column: text;"><a class="figure-number" href="#details-vis">5</a>: Click any point to listen to a different bird's chirp.</figcaption>
</figure>


<style>

    #wrapper {
      grid-column: text;
    }

    .bird-container {
      position: relative;
      height: 60vh;
    }
    .bird-container svg {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      height: 60vh;
    }

    svg {
        width: 100%;
        background: white;
        border: 1px solid var(--gray-border);
      border-radius: var(--border-radius);
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

      top: 1em;
      left: 1em;
      width: 400px;
      max-width: calc(100% - 2em);

      border: solid 1px var(--gray-border);
      font-size: 14px;
      line-height: 16px;
      position: absolute;
      padding-left: 10px;
      padding-right: 10px;
      padding-bottom: 10px;
      padding-top: 5px;
      border-radius: var(--border-radius);

      /* from distill */
      background-color: rgba(250, 250, 250, 0.8);
      box-shadow: 0 0 7px rgba(0, 0, 0, 0.1);
      box-sizing: border-box;
      backdrop-filter: blur(2px);
      -webkit-backdrop-filter: blur(2px);

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
