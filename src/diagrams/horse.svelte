<script>
    import { onDestroy } from 'svelte';

    let frameNumber = 1;
    let isPlaying = false;

    const numOfFrames = 11;
    const frameIntArray = Array.from(new Array(numOfFrames), (x,i) => i+1);

    let playInterval;

    function play() {
        if (!isPlaying) {
            isPlaying = true;
            playInterval = setInterval(() => {
                    frameNumber = frameNumber % numOfFrames;
                    frameNumber += 1;
                }, 100);            
        }
    }

    function pause() {
        isPlaying = false;
        clearInterval(playInterval)
    }

    function changeFrame(i) {
        pause()
        frameNumber = i;
    }

    play();

</script>

<style>
    
    #wrapper {
        margin-top: 1.5em;
        margin-bottom: 1.5em;
        /* border: 1px solid var(--gray-border); */
        /* border-radius: var(--border-radius); */
        /* padding: 0.5em; */
    }

    #frames {
		display: grid;
		grid-template-columns: repeat(11, 1fr);
        grid-column-gap: 0.2em;
        padding-top: 10px;
    }

    .frame {
        width: 100%;
        /* border-bottom: 5px solid white; */
        filter: brightness(60%);
        cursor: crosshair;
    }

    .active-frame {
        border-bottom: 3px solid var(--orange);
        padding-bottom: 2px;
        filter: brightness(100%);
    }

    #horse-wrapper {
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        grid-column-gap: 2em;
    }

    #horse {
        grid-column-start: 1;
        grid-column-end: 7;
        width: 100%;
    }

    #horse-controls {
        grid-column-start: 7;
        grid-column-end: 13;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: left;
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
    }

    button {
        border: none;
        padding: 0;
        cursor: pointer;
        outline: inherit;
        color: var(--orange);
    }

    @media(min-width: 768px) {
        #horse-controls {
            grid-column-start: 7;
            grid-column-end: 11;
        }
    }

</style>

<div id="wrapper">
    
    <div id="horse-wrapper">
        <img id="horse" src="images/horse/{frameNumber}.jpg" alt="Horse running."/>
        <div id="horse-controls">
            <figcaption>
                In 1878, Eadweard Muybridge settled Leland Stanford's hotly debated question of whether all four feet of a horse lifted off the ground during a trot using multiple cameras to capture motion in stop-motion photographs.
                This interactive graphic uses <i>user-controlled animation</i> to illustrate this finding.
             </figcaption>
             <!-- These images are from the horse Sallie Gardner, owned by Leland Stanford, running at a 1:40 pace over the Palo Alto track, on June 19th, 1878. -->
            <!-- <div> -->
            <!-- <br /> -->
            <div style="padding-bottom: 5px;">
                <label>
                    <input type=range bind:value={frameNumber} min=1 max=11 on:mousedown={pause} class="slider">
                </label>
            </div>
            <div>
                <button on:click={isPlaying ? pause : play}><i class="material-icons" style="font-size:48px;">{isPlaying ? "pause_circle_outline": "play_circle_outline"}</i></button>
            </div>
        </div>
    </div>
    <div id="frames">
        {#each frameIntArray as frameInt, i}
                <img src="images/horse/{frameInt}.jpg" alt="Horse running." class='{frameInt === frameNumber ? "frame active-frame": "frame"}' on:mouseover={() => changeFrame(i+1)}/>
        {/each}
    </div>
</div>