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

  const CANVAS_WIDTH = 800;
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
      flock.tick();
      flock.boids.forEach((boid) => {
        boid[0] = clamp(boid[0], -canvas.width/2, canvas.width/2);
        boid[1] = clamp(boid[1], -canvas.height/2, canvas.height/2);
        ctx.fillRect(boid[0], boid[1], 2, 2)
        ctx.fillStyle = 'orange'
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
	canvas {
    display: block;
    margin: 1em auto;
		width: auto;
		height: 100%;
    max-height: 50vh;
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

  .slider {
      -webkit-appearance: none;
      appearance: none;
      outline: none;
      opacity: 0.7;
      -webkit-transition: .2s;
      transition: opacity .2s;
      height: 3px;
      border-radius: 3px;
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
      border-radius: 13px;
  }

  .slider::-moz-range-thumb {
      top: -6px;
      left: -6px;
      width: 13px;
      height: 13px;
      background-color: var(--orange);
      cursor: pointer;
  }

</style>

<div>

  <Title
    titleText="Interact with live simulations—no setup required."
    subtitleText="This Boids simulation models and visualizes the behavior of a flock of birds, and exposes parameters that a reader can manipulate to change the behavior of the simulation."
  />

  <div class="controls">
    <div class="control">
      Separation Distance<br/>
        <input type=range bind:value={separationDistance} min=1 max=500 class="slider">
    </div>
    <div class="control">
      Alignment Distance<br/>
        <input type=range bind:value={alignmentDistance} min=1 max=500 class="slider">
    </div>
    <div class="control">
      Cohesion Distance<br/>
        <input type=range bind:value={cohesionDistance} min=1 max=500 class="slider">
    </div>
  </div>
  <div class="controls">
    <div class="control">
      Separation Force<br/>
        <input type=range bind:value={separationForce} min=1 max=500 class="slider">
    </div>
    <div class="control">
      Alignment Force<br/>
        <input type=range bind:value={alignmentForce} min=1 max=500 class="slider">
    </div>
    <div class="control">
      Cohesion Force<br/>
        <input type=range bind:value={cohesionForce} min=1 max=500 class="slider">
    </div>
  </div>
  <canvas
    bind:this={canvas}
    width={CANVAS_WIDTH}
    height={CANVAS_HEIGHT}
  ></canvas>

</div>
