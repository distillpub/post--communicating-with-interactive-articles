<script>
  export let example;
</script>

<style>

    figure {
        padding-bottom: 0em;
    }

    video {
        width: 100%;
    }

    .example-title {
		margin-bottom: 0.5em;
	}

	/* .example > a {
		border-bottom: none;
    } */
    
    @media (max-width: 1178px) {
        figure {
            padding-bottom: 1em;
        }
}

</style>

<figure>
    <video controls>
        <source src="images/example1.mov" type="video/mp4">
        Your browser does not support HTML5 video.
    </video>
    <!-- <div class="example-title"><a href={example.url}>{example.title}</a><d-cite key={example.bibtex}></d-cite></div> -->
    <figcaption>{example.caption}</figcaption>
</figure>