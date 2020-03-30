<script>

    import Title from "./title.svelte";

    const texts = [
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum explicabo sapiente officia cum, laborum quasi provident, praesentium ab in adipisci suscipit labore optio numquam minima, dignissimos vero omnis. Nobis, debitis!",
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum explicabo sapiente officia cum, laborum quasi provident, praesentium ab in adipisci suscipit labore optio numquam minima, dignissimos vero omnis. Nobis, debitis! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum explicabo sapiente officia cum, laborum quasi provident, praesentium ab in adipisci suscipit labore optio numquam minima, dignissimos vero omnis. Nobis, debitis!"
    ]

    let level = 0

</script>

<style>

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

</style>

<div>

    <Title
        titleText="The Universal Approximation Theorem in 3 levels of detail."
        subtitleText="Readers come with different backgrounds. What if our content could be tailored to their level of knowledge about certain topics?"
    />

    <div style="display:flex">
        <div>Brief</div>
        <label>
            <input type=range bind:value={level} min=0 max=2 class="slider">
        </label>
        <div>Detailed</div>
    </div>

    <p>{texts[level]}</p>

</div>