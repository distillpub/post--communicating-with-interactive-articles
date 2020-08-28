<script>

    const parametricURL = "https://parametric.press/issue-01/the-myth-of-the-impartial-machine/";

</script>

<style>
    #parametric-wrapper {
        grid-column: page;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-gap: 1em;
    }

    img {
        width: 100%;
        border: 1px solid var(--gray-border);
    }

    .screenshot {
        border: none;
    }

    #image-1 { order: 1 }
    #image-2 { order: 2 }
    #image-3 { order: 3 }
    #image-4 { order: 4 }

    @media(max-width: 768px) {

        #parametric-wrapper {
            grid-template-columns: repeat(2, 1fr);
        }

        #image-3 {order: 4}

        #image-4 {order: 3}

    }

</style>

<figure class="subgrid">
    <div id="parametric-wrapper">
        <a class="screenshot" href={parametricURL} id="image-1">
            <img src="images/parametric/parametric-1.png" alt="" />
        </a>
        <a class="screenshot" href={parametricURL} id="image-2">
            <img src="images/parametric/parametric-2.png" alt="" />
        </a>
        <a class="screenshot" href={parametricURL} id="image-3">
            <img src="images/parametric/parametric-3.png" alt="" />
        </a>
        <a class="screenshot" href={parametricURL} id="image-4">
            <img src="images/parametric/parametric-4.png" alt="" />
        </a>
    </div>
    <figcaption style="grid-column: text;">
        <a class="figure-number" href="#parametric">9</a>: The <a href={parametricURL}>Myth of the Impartial Machine</a> was one of five articles published in <i>The Parametric Press</i>. The article used techniques like animation, data visualizations, explanatory diagrams, margin notes, and interactive simulations to explain how biases occur in machine learning systems.
    </figcaption>
</figure>
