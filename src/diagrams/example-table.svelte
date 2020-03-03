<script>
    import bibtexParse from 'bibtex-parse-js';
    import bibString from '../../static/bibliography.bib';

    let bibliography = bibtexParse.toJSON(bibString);

    // filter out all bibtex entries except interactive article examples
    let examples =  bibliography.filter(function(bibEntry) {
        return bibEntry.entryTags.howpublished === "web";
    });

    // coerice tag string into array of strings
    examples.forEach(citation => {
        if (citation.entryTags.tags) {
            citation.entryTags.tags = citation.entryTags.tags.split(',')
        }        
    });

    function sort() {
        // console.log('sort')
        examples.sort((a,b) => (a.entryTags.year > b.entryTags.year) ? 1 : ((b.entryTags.year > a.entryTags.year) ? -1 : 0)); 
        examples = examples
    }
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
</style>

<div>Number of citations: {bibliography.length}</div>
<div>Number of article examples: {examples.length}</div>

<div id="example-table-wrapper">
    <table id="research-x-practice-table">
        <thead>
            <tr>
            <th scope="col">Title</th>
            <th scope="col">Publication</th>
            <th scope="col" on:click={sort}>Year</th>
            </tr>
        </thead>
        <tbody>
            {#each examples as example}
                <tr>
                <td style="text-transform: capitalize">
                    <a href={example.entryTags.url}>{example.entryTags.title}</a>
                    <!-- <d-cite key={example.citationKey}></d-cite> -->
                </td>
                <td>{example.entryTags.journal}</td>
                <td>{example.entryTags.year}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
