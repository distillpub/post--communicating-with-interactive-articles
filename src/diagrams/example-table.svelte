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
    console.log(examples)

</script>

<style>
    #example-table-wrapper {
        height: 500px;
        background-color: var(--gray-bg);
        border: 1px solid var(--gray-border);
        border-radius: var(--border-radius);
        margin-bottom: 1em;
    }
</style>

<div id="example-table-wrapper">
    {#each examples as example}
        <div>{example.entryTags.title}</div>
	{/each}
</div>
