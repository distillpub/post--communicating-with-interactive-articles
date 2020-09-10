<script>
  import { onMount, onDestroy } from 'svelte';
  import raf from 'raf';
  import boids from 'boids';
  import Title from './title.svelte'

  let canvas;

  let stopped = false;
  let separationDistance = 60;
  let alignmentDistance = 180;
  let cohesionDistance = 180;
  let separationForce = 0.15;
  let alignmentForce = 0.5;
  let cohesionForce = 0.1;
  let boidCount = 100;

  const CANVAS_WIDTH = 634;
  const CANVAS_HEIGHT = 400;

  const clamp = (x, min, max) => {
    if (x < min) {
      return max + (x - min)
    }
    if (x > max) {
      return min + (x - max)
    }
    return x;
  }

  const boidRandom = (magnitude) => {
    return (Math.random() - 0.5) * 2 * magnitude;
  }

	onMount(() => {
    const ctx = canvas.getContext('2d');

    const flock = boids({
      boids: 500,              // The amount of boids to use
      speedLimit: 2,          // Max steps to take per tick
      accelerationLimit: 1,   // Max acceleration per tick
      separationDistance: separationDistance, // Radius at which boids avoid others
      alignmentDistance: alignmentDistance, // Radius at which boids align with others
      cohesionDistance: cohesionDistance,  // Radius at which boids approach others
      separationForce: separationForce,  // Speed to avoid at
      alignmentForce: alignmentForce,   // Speed to align with other boids
      cohesionForce: cohesionForce,     // Speed to move towards other boids
      attractors: []
    });

    let boidSize, boidColor;
    raf(function tick() {
      flock.separationDistance = separationDistance;
      flock.alignmentDistance = alignmentDistance;
      flock.cohesionDistance = cohesionDistance;
      flock.separationForce = separationForce;
      flock.alignmentForce = alignmentForce;
      flock.cohesionForce = cohesionForce;
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'black';
      ctx.save();
      ctx.translate(canvas.width/2, canvas.height/2);

      if (boidCount > flock.boids.length) {
        for (let i=0; i < (boidCount-flock.boids.length); i++) {
          flock.boids.push([boidRandom(canvas.width / 2), boidRandom(canvas.height / 2), boidRandom(10), boidRandom(10), boidRandom(5), boidRandom(5)])
        }
      } else if (boidCount < flock.boids.length) {
        flock.boids = flock.boids.slice(0, boidCount);
      }

      flock.tick();
      flock.boids.forEach((boid, i) => {
        boid[0] = clamp(boid[0], -canvas.width/2, canvas.width/2);
        boid[1] = clamp(boid[1], -canvas.height/2, canvas.height/2);
        boidSize = i === 0 ? 5 : 2;
        boidColor = i === 0 ? '#ff6600' : '#0f2e3d'
        ctx.fillStyle = boidColor;
        ctx.fillRect(boid[0], boid[1], boidSize, boidSize);
      });
      ctx.restore();
      if (!stopped) {
        raf(tick);
      }
    })
  });

  onDestroy(() => {
    stopped = true;
  })
</script>

<style>
  #wrapper {
    grid-column: text;
  }

	canvas {
    display: block;
    margin: 1em auto;
		width: auto;
		height: 100%;
    max-height: 50vh;
    max-width: 100%;
    border: 1px solid var(--gray-border);
    border-radius: var(--border-radius);
	}

  .controls {
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    font-size: 10px;
    text-transform: uppercase;
    text-align: center;
    justify-content: space-around;
  }

  .controls-bottom {
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    font-size: 10px;
    text-transform: uppercase;
    text-align: center;
    justify-content: space-between;
    margin-left: 2em;
    margin-right: 2em;
  }

  .controls-bottom {
    margin-bottom: 1.5em;
  }

  .slider {
      -webkit-appearance: none;
      appearance: none;
      outline: none;
      opacity: 0.7;
      -webkit-transition: .2s;
      transition: opacity .2s;
      height: 3px;
      border-radius: 2px;
      background-color: hsla(0, 0%, 0%, 0.2);
  }

  .slider:hover {
      opacity: 1;
  }

  .slider::-webkit-slider-thumb {
      -webkit-appearance: none; /* Override default look */
      appearance: none;
      cursor: pointer; /* Cursor on hover */
      top: -6px;
      left: -6px;
      width: 13px;
      height: 13px;
      background-color: var(--orange);
      border-radius: 50%;
  }

  .slider::-moz-range-thumb {
      top: -6px;
      left: -6px;
      width: 13px;
      height: 13px;
      background-color: var(--orange);
      cursor: pointer;
      border-radius: 50%;
  }

  .control {
    line-height: 1.3;
  }

  .control-label {
    user-select: none;
  }

  @media(max-width: 768px) {
    #wrapper {
      grid-column: screen !important;
      width: calc(100% - 2em);
    }

    .control {
      width: 30vw;
      /* flex: 1; */
    }

    .control input {
      width: 27.5vw;
      display: block;
      margin-top: 0.5em;
      /* flex: 1; */
    }

    .control-label {
      width: 20vw;
      margin: auto;
    }

    .slider::-webkit-slider-thumb {
        top: -8px;
        left: -8px;
        width: 15px;
        height: 15px;
    }

    .slider::-moz-range-thumb {
        top: -8px;
        left: -8px;
        width: 15px;
        height: 15px;
    }
  }

  @media(max-width: 1000px) {
    #wrapper {
        grid-column: page;
    }

    .controls-bottom {
      margin-left: 0em;
      margin-right: 0em;
    }

  }

</style>

<figure class="subgrid">

  <div id="wrapper" class="interactive-container">

    <div>
      <Title
        titleText="Interact with live simulations—no setup required."
        subtitleText="This Boids visualization models the movement of a flock of birds, and exposes parameters that a reader can manipulate to change the behavior of the simulation."
      />


      <div class="controls">
        <div class="control">
          Boid Count<br/>
            <input type=range bind:value={boidCount} min=1 max=500 class="slider" />
        </div>
      </div>
      <canvas
        bind:this={canvas}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
      ></canvas>
      <div class="controls-bottom">
        <div class="control">
          <div class="control-label">Separation Distance</div>
            <input type=range bind:value={separationDistance} min=1 max=500 class="slider" />
        </div>
        <div class="control">
          <div class="control-label">Alignment Distance</div>
            <input type=range bind:value={alignmentDistance} min=1 max=500 class="slider" />
        </div>
        <div class="control">
          <div class="control-label">Cohesion Distance</div>
            <input type=range bind:value={cohesionDistance} min=1 max=500 class="slider" />
        </div>
      </div>
      <div class="controls-bottom">
        <div class="control">
          <div class="control-label">Separation Force</div>
            <input type=range bind:value={separationForce} min=0.01 max=500 step=0.01 class="slider" />
        </div>
        <div class="control">
          <div class="control-label">Alignment Force</div>
            <input type=range bind:value={alignmentForce} min=0.01 max=500 step=0.01 class="slider" />
        </div>
        <div class="control">
          <div class="control-label">Cohesion Force</div>
            <input type=range bind:value={cohesionForce} min=0.01 max=500 step=0.01 class="slider" />
        </div>
      </div>
    </div>
  </div>

	<figcaption style="grid-column: text;"><a class="figure-number" href="#simulation-vis">4</a>: At the top, drag the slider to change the number of boids in the simulation. Underneath, adjust the different parameters to find interesting configurations.</figcaption>
</figure>