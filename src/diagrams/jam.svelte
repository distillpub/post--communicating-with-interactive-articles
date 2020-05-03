<script>

    const explorables = [
        {
            title: "From Cells to Systems",
            image: "jam-1.png",
            url: "https://spaciecat.github.io/cells/"
        },
        {
            title: "The Taxi-cab Problem",
            image: "jam-2.png",
            url: "http://galgreen.com/TaxiCabProblem/"
        },
        {
            title: "Rendering Terrain",
            image: "jam-3.png",
            url: "https://lyrasolomon.github.io/terrain/"
        },
        {
            title: "Addition Math using Blocks",
            image: "jam-4.png",
            url: "https://samarthgulati.com/block-stack/"
        },
        {
            title: "Scales of the Solar System",
            image: "jam-5.png",
            url: "https://samarthgulati.com/solr-scale/"
        },
        {
            title: "Beat Basics",
            image: "jam-7.png",
            url: "https://megan-vo.github.io/basic-beats/"
        },
        {
            title: "Recamán Sequence",
            image: "jam-8.png",
            url: "https://xeniasuper.github.io/recaman-sequence/"
        },
        {
            title: "Reuleaux Polygons",
            image: "jam-6.png",
            url: "https://varun.ca/reuleaux-polygons/"
        }
    ]

</script>

<style>

    #jam-wrapper {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-gap: 1em;
        /* border: 1px solid var(--gray-bg); */
        padding-bottom: 20px;
    }

    /* .explorable {
        padding-bottom: 20px;
    } */

    img {
        width: 100%;
        border: 1px solid var(--gray-border);
    }

    .screenshot {
        border: none;
    }

    figure {
        margin-bottom: 0;
        margin-top: 0;
    }

    /* figcaption {
        text-align: center;
    } */

</style>

<figure id="jam-wrapper">
    {#each explorables as explorable}
        <figure class="explorable">
            <a class="screenshot" href={explorable.url}>
                <img src="images/jam/{explorable.image}" alt="" />
            </a>
            <figcaption><a href={explorable.url}>{explorable.title}</a></figcaption>
        </figure>
    {/each}
    <figcaption style="grid-column-start: 1; grid-column-end: 5; text-align: center">
        Example explorable explanations made in three weeks during the <a href="https://explorabl.es/jam/">Explorables Jam</a>.
    </figcaption>
</figure>