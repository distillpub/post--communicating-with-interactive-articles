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

    examples.forEach(citation => {
        // coerice tag string into array of strings
        citation.entryTags.tags = citation.entryTags.tags.split(',')

        // give examples with no jounal string with space
        if (!citation.entryTags.journal) {
            citation.entryTags.journal = " "
        }
    });

    function sort() {
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
        console.log(lastSortKey, sortKey, sortAsc)
    }

    // initial sort on load
    sort()

</script>

<style>
    #example-table-wrapper {
        /* height: 500px; */
        background-color: var(--gray-bg);
        border: 1px solid var(--gray-border);
        border-radius: var(--border-radius);
        margin-bottom: 1em;
        padding: 1.5em;
        /* overflow: scroll */
    }

    th:hover {
        cursor: pointer;
    }
</style>

<div>Number of citations: {bibliography.length}</div>
<div>Number of article examples: {examples.length}</div>

<div id="example-table-wrapper">
    <table id="research-x-practice-table">
        <thead>
            <tr>
            <th scope="col" on:click={() => {lastSortKey = sortKey; sortKey = "title"; sort()}}>Title</th>
            <th scope="col" on:click={() => {lastSortKey = sortKey; sortKey = "journal"; sort()}}>Publication</th>
            <th scope="col" on:click={() => {lastSortKey = sortKey; sortKey = "year"; sort()}}>Year</th>
            </tr>
        </thead>
        <tbody>
            {#each examples as example}
                <tr>
                <td style="text-transform: capitalize">
                    <a href={example.entryTags.url}>{example.entryTags.title}</a>
                    <!-- <d-cite key={example.citationKey}></d-cite> -->
                </td>
                <td>{example.entryTags.journal ? example.entryTags.journal : ""}</td>
                <!-- <td>{example.entryTags.tags}</td> -->
                <td>{example.entryTags.year}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
