<script>
	export let examples;
</script>
<style>

	.bottom {
		grid-column-start: 1;
		grid-column-end: 9;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-column-gap: 1.5em;
	}

    .example-title {
		margin-bottom: 0.5em;
		/* height: 60px; */
	}

    .example-description {
		font-size: 0.8em;
		line-height: 1.4em;
		color: var(--gray);
	}

	img {
		width: 100%;
		border: 1px solid var(--gray-border)
	}

	.example > a {
		border-bottom: none;
	}
        
</style>

<div class="bottom">
    <div class="example">
        <a href={example.url}><img src="images/application-tabs/{example.image}" alt=""/></a>
        <div class="example-title"><a href={example.url}>{example.title}</a><d-cite key={example.bibtex}></d-cite></div>
        <div class="example-description">{example.description}</div>
    </div>
</div>
