<script>
    import { onMount } from 'svelte';
    import { getBibtexEntries } from "../util.js";
    
    let examples = getBibtexEntries()
    
    let hoverExampleIndex = -1;
    let hoverTitle = "Exemplary Interactive Articles From Around the Web."
    let hoverAuthor = "Select an article for more information."
    let hoverJournal = ""
    let hoverYear = ""
    let hoverURL = ""

    let isMobile = false;
    let mounted = false;
    onMount(() => {
        if (document.documentElement.clientWidth <= 720) {
            isMobile = true;
        }
        mounted = true;
    })

    function changeHoverIndex(i) {
        hoverExampleIndex = i
        changeHoverExampleData()
    }

    function changeHoverExampleData() {
        if (examples[hoverExampleIndex].entryTags.title !== undefined) {
            hoverTitle = '"' + examples[hoverExampleIndex].entryTags.title + '."'
        } else {
            hoverTitle = ""
        }

        if (examples[hoverExampleIndex].entryTags.author !== undefined) {
            hoverAuthor = examples[hoverExampleIndex].entryTags.author + '.'
        } else {
            hoverAuthor = ""
        }

        if (examples[hoverExampleIndex].entryTags.url !== undefined) {
            hoverURL = examples[hoverExampleIndex].entryTags.url
        } else {
            hoverURL = ""
        }

        if (examples[hoverExampleIndex].entryTags.year !== undefined) {
            hoverYear = examples[hoverExampleIndex].entryTags.year + '.'
        } else {
            hoverYear = ""
        }

        if (examples[hoverExampleIndex].entryTags.journal !== undefined) {
            hoverJournal = examples[hoverExampleIndex].entryTags.journal
            if (hoverYear !== "") {
                hoverJournal = hoverJournal + ','
            }
        } else {
            hoverJournal = ""
        }

    }

    function resetHoverExampleData() {
        hoverExampleIndex = -1;
        hoverTitle = "Exemplary Interactive Articles From Around the Web."
        hoverAuthor = "Select an article for more information."
        hoverJournal = ""
        hoverYear = ""
    }

</script>

<style>

    #mosaic-wrapper {
        display: grid;
        grid-template-columns: repeat(10, 1fr);
        grid-gap: 0.5rem;
        grid-column: page;
    }

    figure {
        margin-top: 1rem;
        margin-bottom: 0rem;
    }

    figcaption {
        margin-top: 0.75rem;
        /* margin-bottom: 0.75rem; */
        /* overflow: hidden; */
        height: 2rem;
        grid-column: text;
    }

    .screenshot {
        width: 100%;
		/* border: 1px solid var(--gray-border); */
        border: 1px solid rgb(229, 229, 229);
		transform: scale(1);
		transition: transform 0.2s;
	}

    img {
        display: block;
    }
	
	.screenshot:hover{
		z-index: 1000;
        transform: scale(2.5);
	}

    a:hover {
		z-index: 1000;
	}

    #hover-title {
        text-transform: capitalize;
        font-weight: 700
    }

    #hover-year, #hover-journal {
        font-style: italic;
    }

    /* .ellipsis {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .line-clamp {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;  
    } */

    @media (max-width: 1180px) {
        #mosaic-wrapper {
            grid-column: screen;
            padding-left: 1rem;
            padding-right: 1rem;
        }
        
        figcaption {
            height: 3rem;
        }
    }

    @media (max-width: 1000px) {
    }

    @media(max-width: 768px) {
        #mosaic-wrapper {
            grid-template-columns: repeat(6, 1fr);
            grid-column: screen;
            grid-gap: 0.325rem;
            padding-left: 16px;
            padding-right: 16px;
        }

        figcaption {
            height: 3.75rem;
        }
    }

</style>

<figure class="subgrid">

    <div id="mosaic-wrapper">

        {#if mounted && (!isMobile)}
            
            {#each examples as example, i}
                <a href={hoverURL} target="_blank">
                    <img class='screenshot' src={example.entryTags.image} on:mouseover={() => changeHoverIndex(i)} on:mouseout={() => resetHoverExampleData()} alt={example.entryTags.title}>
                </a>
            {/each}

        {:else if mounted && (isMobile)}

            {#each examples as example, i}
                <img class='screenshot' src={example.entryTags.image} on:mouseover={() => changeHoverIndex(i)} on:mouseout={() => resetHoverExampleData()} alt={example.entryTags.title}>
            {/each}

        {/if}

    </div>

    <figcaption>
        {#if mounted && (!isMobile)}
            <a class="figure-number" href="#mosaic">1</a>: <span id="hover-title">{hoverTitle}</span> <span id="hover-author">{hoverAuthor}</span> <span id="hover-journal">{hoverJournal}</span> <span id="hover-year">{hoverYear}</span>
        {:else if mounted && (isMobile)}
            <a class="figure-number" href="#mosaic">1</a>: <span id="hover-title">{hoverTitle}</span> <span id="hover-author">{hoverAuthor}</span> <span id="hover-journal">{hoverJournal}</span> <span id="hover-year">{hoverYear}</span>
            {#if hoverExampleIndex > -1}
                <a href={hoverURL} target="_blank">View article &#8599;</a>
            {/if}
        {/if}
    </figcaption>
    
</figure>
