<script>
    import { getBibtexEntries } from "../util.js";
    
    let examples = getBibtexEntries()
    
    let hoverExampleIndex = -1;
    let hoverTitle = "Examplary Interactive Articles From Around the Web"
    let hoverAuthor = "Hover over an article for more information."
    let hoverJournal = ""
    let hoverYear = ""
    let hoverURL = ""

    function changeHoverIndex(i) {
        hoverExampleIndex = i
        changeHoverExampleData()
    }

    function changeHoverExampleData() {
        if (examples[hoverExampleIndex].entryTags.title !== undefined) {
            hoverTitle = examples[hoverExampleIndex].entryTags.title
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
        let hoverExampleIndex = -1;
        hoverTitle = "Examplary Interactive Articles From Around the Web"
        hoverAuthor = "Hover over an article for more information."
        hoverJournal = ""
        hoverYear = ""
    }

</script>

<style>

    #wrapper {
        display: grid;
        grid-template-columns: repeat(10, 1fr);
        grid-gap: 0.5rem;
        grid-column: page;
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

    #example-info {
        grid-column: text;
        padding-top: 1.5rem;
    }

    #example-info > p {
        margin: 0;
        font-size: 1rem;
    }

    #hover-title {
        text-transform: capitalize;
    }

    .ellipsis {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    @media (max-width: 1180px) {
        #wrapper {
            grid-column: screen;
            padding-left: 1rem;
            padding-right: 1rem;
        }
    }

    @media (max-width: 1000px) {
        #wrapper {
            grid-template-columns: repeat(6, 1fr);
            grid-column: screen;
            grid-gap: 0.325rem;
            padding-left: 16px;
            padding-right: 16px;
        }
    }

    @media(max-width: 768px) {

    }

</style>

<div id="wrapper">
    {#each examples as example, i}
        <a href={hoverURL} target="_blank">
            <img class='screenshot' src={example.entryTags.image} on:mouseover={() => changeHoverIndex(i)} on:mouseout={() => resetHoverExampleData()} alt={example.entryTags.title}>
        </a>
    {/each}
</div>

<div id="example-info">
    <p id="hover-title" class="ellipsis"><b>{hoverTitle}</b></p>
    <p class="ellipsis"><span id="hover-author">{hoverAuthor}</span> <i>{hoverJournal} {hoverYear}</i></p>
</div>
