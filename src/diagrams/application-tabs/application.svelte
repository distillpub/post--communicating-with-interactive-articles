<script>
	export let applicationData;
</script>

<style>

	.application {
		padding-top: 1.25em;
		padding-bottom: 0.5em;
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		grid-column-gap: 1em;
		grid-row-gap: 1em;
	}

	.left {
		grid-column-start: 1;
		grid-column-end: 8;
	}

	.right {
		grid-column-start: 8;
		grid-column-end: 13;
	}

	.bottom {
		grid-column-start: 1;
		grid-column-end: 13;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-column-gap: 1.5em;
	}

	.application-title {
		margin-top: 0;
	}

	/* .application-description {
	} */

	.application-opportunities, .application-challenges {
		grid-column-start: 8;
		grid-column-end: 13;
	}

	.opportunities-title, .challenges-title {
		margin-top: 0;
		margin-bottom: 1em;
	}

	.example-title {
		margin-bottom: 0.5em;
		/* height: 60px; */
	}

	ul {
		line-height: 1.2em;
	}

	li {
		margin-bottom: 0.5em;
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

	@media(max-width: 1000px) {
		.left, .right {
			grid-column: 1 / 13;
		}

		.right {
			display: flex;
		}

		.application-opportunities, .application-challenges {
			flex: 1;
		}
		
		.bottom {
			grid-template-columns: 1fr;
		}

		.example {
			display: grid;
			grid-template-columns: 2fr 3fr;
			grid-column-gap: 1em;
			margin-top: 0.5em;
			margin-bottom: 0.5em;
		}

		.example > a {
			grid-column: 1 / 2;
		}

		.example-text {
			grid-column: 2 / 4 
		}

    }
</style>

<div class="application">

	<div class="left">
		<h3 class="application-title">{applicationData.title}</h3>
		<div class="application-description">{applicationData.description}</div>
	</div>

	<div class="right">
		<div class="application-opportunities">
			<h4 class="opportunities-title">Opportunities</h4>
			<ul>
				{#each applicationData.opportunities as opportunity}
					<li>
						{opportunity}
					</li>
				{/each}
			</ul>
		</div>
		<div class="application-challenges">
			<h4 class="challenges-title">Challenges</h4>
			<ul>
				{#each applicationData.challenges as challenge}
					<li>
						{challenge}
					</li>
				{/each}
			</ul>
		</div>
	</div>

	<div class="bottom">
	{#each applicationData.examples as example}
		<div class="example">
			<a href={example.url}><img src="images/application-tabs/{example.image}" alt="Screen capture of example interactive article."/></a>
			<div class="example-text">
				<div class="example-title"><a href={example.url}>{example.title}</a><d-cite key={example.bibtex}></d-cite></div>
				<div class="example-description">{example.caption}</div>
			</div>
		</div>
	{/each}
	</div>
</div>
