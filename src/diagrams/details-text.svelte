<script>

    import Title from "./title.svelte";

    const texts = [
        "Neural networks can approximate any function that exists. However, we do not have a guaranteed way to obtain such a neural network for every function.",
        "For any function, there is guaranteed to be a neural network with a finite number (but perhaps a large number) of neurons so that for every possible input, x, the network outputs a close approximation of the function's value f(x). However, we do not have any guarantees on how to train a neural network to learn the correct mapping parameters.",
        "From mathematical theory of artificial neural networks, the universal approximation theorem states that a feed-forward network with a single hidden layer containing a finite number (but perhaps a large number) of neurons can approximate continuous functions on compact subsets of R^n, as long as the activation function is bounded and continuous. While this says that a simple neural network can represent a wide variety of interesting functions under appropriate parameters, it does not describe how to algorithmically learn such parameters."
    ]

    let level = 0

</script>

<style>

    #wrapper {
        grid-column: text;
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

    label {
        padding-left: 10px;
        padding-right: 10px;
    }

    .slider-label {
        font-size: 12px;
        text-transform: uppercase;
        padding-top: 5px;
    }

    @media(max-width: 768px) {
      #wrapper {
          grid-column: screen;
      }
    }

</style>

<figure class="subgrid">
    <div id="wrapper" class="interactive-container">

        <Title
            titleText="The Universal Approximation Theorem in 3 levels of detail."
            subtitleText="Readers come with different backgrounds. What if our content could be tailored to their level of knowledge about certain topics?"
        />

        <div style="display:flex; text-align:center; justify-content: center; padding-bottom: 10px;">
            <div class="slider-label">Illustrative</div>
            <label>
                <input type=range bind:value={level} min=0 max=2 class="slider">
            </label>
            <div class="slider-label">Precise</div>
        </div>

        <p>{texts[level]}</p>

    </div>
    <figcaption style="grid-column: text;"><a class="figure-number" href="#details-text">8</a>: Drag the slider to display the theorem's statement in increasing levels of detail.</figcaption>
</figure>