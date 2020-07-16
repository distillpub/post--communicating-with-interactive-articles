<script>
    import bibtexParse from 'bibtex-parse-js';
    import bibString from '../../static/bibliography.bib';

    let sortAsc = true;
    let sortKey = "title"
    let lastSortKey = ""

    let bibliography = bibtexParse.toJSON(bibString);

    // filter out all bibtex entries except interactive article examples
    let examples =  bibliography.filter(function(bibEntry) {
        return bibEntry.entryTags.howpublished === "web";
    });

    console.log('examples length', examples.length);

    examples.forEach(citation => {
        // coerice tag string into array of strings
        citation.entryTags.tags = citation.entryTags.tags.split(',')

        // give examples with no jounal string with space
        if (!citation.entryTags.journal) {
            citation.entryTags.journal = "Self published"
        }

        // publication/author format for table
        if (citation.entryTags.author) {
            let tempAuthor = citation.entryTags.author
            tempAuthor = tempAuthor.split(' and ')
            tempAuthor.forEach((author,i) => {
                author = author.split(',')
                tempAuthor[i] = author[1].trim() + ' ' + author[0].trim()
            });
            citation.entryTags.author = tempAuthor.join(', ')
        }
    });

    let sortIcon;
    function updateSortIcon() {
        if (sortAsc) {
            sortIcon = "arrow_downward"
        } else {
            sortIcon = "arrow_upward"
        }
    }

    function sort() {
        // if sorting by different column, always sort ascending
        if (lastSortKey !== sortKey) {
            sortAsc = true
            examples.sort((a,b) => (a.entryTags[sortKey] > b.entryTags[sortKey]) ? 1 : ((b.entryTags[sortKey] > a.entryTags[sortKey]) ? -1 : 0));
        } else {
            if (sortAsc) {
                sortAsc = false
                examples.sort((a,b) => (a.entryTags[sortKey] > b.entryTags[sortKey]) ? -1 : ((b.entryTags[sortKey] > a.entryTags[sortKey]) ? 1 : 0));
            } else {
                sortAsc = true
                examples.sort((a,b) => (a.entryTags[sortKey] > b.entryTags[sortKey]) ? 1 : ((b.entryTags[sortKey] > a.entryTags[sortKey]) ? -1 : 0));
            }
        }
        examples = examples
        updateSortIcon()
    }

    // initial sort on load
    sort()

</script>

<style>
    #example-table-wrapper {
        margin-bottom: 1em;
        grid-column: page;
    }

    table {
          /* border-collapse: collapse;  */
          height: 500px;
          display: block;
          overflow: scroll;
    }

    /* thead {
        position: sticky;
    } */

    tbody {
        /* overflow: scroll;
        display: block;
        height: 500px; */
    }

    th:hover {
        cursor: pointer;
    }

    i {
        vertical-align: -4px; /* hacky, center icons with table header */
        font-size: 18px;
    }

    th {
        white-space: nowrap;
    }

    #title-col {
        width: 500px;
    }

    /* tbody > tr:hover {
        background-color: #efefef;
    } */

    /* a {
        border-bottom: none;
    } */

    /* tr:nth-child(even) {
        background-color: #f2f2f2;
    } */

    /* td {
        border: none
    } */

    /* .link-icon:hover {
        color: var(--orange);
    } */

    @media(max-width: 1000px) {
        td, tr {
            font-size: 0.85em !important;
            line-height: 1.35em;
        }
    }
</style>

<figure class="subgrid">
    <div id="example-table-wrapper">
        <table id="research-x-practice-table">
            <thead>
                <tr>
                <th id="title-col" scope="col" on:click={() => {lastSortKey = sortKey; sortKey = "title"; sort()}}>Title <i class="material-icons">{sortKey === "title" ? sortIcon : ""}</i></th>
                <th scope="col" on:click={() => {lastSortKey = sortKey; sortKey = "journal"; sort()}}>Publication (or author) <i class="material-icons">{sortKey === "journal" ? sortIcon : ""}</i></th>
                <th scope="col" on:click={() => {lastSortKey = sortKey; sortKey = "tags"; sort()}}>Tags <i class="material-icons">{sortKey === "tags" ? sortIcon : ""}</i></th>
                <th scope="col" on:click={() => {lastSortKey = sortKey; sortKey = "year"; sort()}}>Year <i class="material-icons">{sortKey === "year" ? sortIcon : ""}</i></th>
                </tr>
            </thead>
            <tbody>
                {#each examples as example}
                    <tr>
                        <td style="text-transform: capitalize">
                            <a href={example.entryTags.url}>{example.entryTags.title}</a>
                            <!-- <i class="material-icons link-icon">arrow_forward</i> -->
                            <!-- <d-cite key={example.citationKey}></d-cite> -->
                        </td>
                        <td>{example.entryTags.journal !== "Self published" ? example.entryTags.journal : example.entryTags.author}</td>
                        <td>{example.entryTags.tags}</td>
                        <td>{example.entryTags.year}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>

    <figcaption style="grid-column: text;">
        <a class="table-number" href="#jam">2</a>: A sortable list of the published interactive articles we discussed in our article.
    </figcaption>
</figure>
