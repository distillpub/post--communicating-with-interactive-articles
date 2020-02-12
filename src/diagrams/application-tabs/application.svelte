<script>
  export let applicationData;
</script>

<style>

	.application {
		padding: 1.5em;
		display: grid;
		grid-template-columns: repeat(8, 1fr);
		grid-column-gap: 2em;
	}

	.left {
		grid-column-start: 1;
		grid-column-end: 6;
	}

	.right {
		grid-column-start: 6;
		grid-column-end: 9;
	}

	.bottom {
		grid-column-start: 1;
		grid-column-end: 9;
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
		grid-column-start: 6;
		grid-column-end: 9;
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
		margin-bottom: 0.8em;
	}

	.example-description {
		font-size: 0.75em;
		line-height: 1.25em;
	}

	img {
		width: 100%;
		border: 1px solid var(--gray-border)
	}

	.example > a {
		border-bottom: none;
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
		<br>
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

	<br>

	<div class="bottom">
	{#each applicationData.examples as example}
		<div class="example">
			<a href={example.url}><img src="../../../diagrams/{example.image}"/></a>
			<div class="example-title"><a href={example.url}>{example.title}</a></div>
			<div class="example-description">{example.description}</div>
		</div>
	{/each}
	</div>
</div>
