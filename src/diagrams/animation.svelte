<script>
    import { onDestroy } from 'svelte';

    const numOfFrames = 11;
    let frameNumber = 1;
    let isPlaying = false;

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

    play();

</script>

<style>
    div {
        border: 1px solid var(--gray-border);
        border-radius: var(--border-radius);
    }

</style>

<div>
    <img id="horse" src="../../images/animation/{frameNumber}.jpg" alt="Horse running."/>
    <label>
        <input type=range bind:value={frameNumber} min=1 max=11 on:mousedown={pause}>
    </label>
    <button on:click={play}>play</button>
    {frameNumber}
</div>