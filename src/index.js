// Hot reloading
import * as _unused from "raw-loader!./index.ejs";
// TODO: disable before publishing

import ResearchPracticeTable from "./diagrams/research-x-practice-table.svelte"
import TOC from "./diagrams/toc.svelte"
import ApplicationTabs from "./diagrams/application-tabs/application-tabs.svelte"
import Horse from "./diagrams/horse.svelte"
import ExampleTable from "./diagrams/example-table.svelte"
import examples from "./diagrams/video-examples.json"
import VideoExample from "./diagrams/video-example.svelte"

// lazily initialize any diagram below the fold. E.G:

// const exampleTag = document.getElementById("svelte-example-dfigure");
// let example;
// exampleTag.addEventListener("ready", () => {
	// const target = exampleTag.querySelector("#svelte-example-target");
	// example = new Example({ target });
// });

const researchPracticeTable = new ResearchPracticeTable({
	target: document.getElementById('research-x-practice')
});

const toc = new TOC({
	target: document.getElementById('toc')
});

const applicationTabs = new ApplicationTabs({
	target: document.getElementById('applications-tab')
});

const horse = new Horse({
	target: document.getElementById('horse')
});

const exampleTable = new ExampleTable({
	target: document.getElementById('example-table')
});

// video examples
new VideoExample({
	target: document.getElementById('example-wattenberg2016attacking'),
	props: { example: examples.find(example => example.bibtex === 'wattenberg2016attacking')}
})

new VideoExample({
	target: document.getElementById('example-2'),
	props: { example: examples.find(example => example.bibtex === 'wattenberg2016attacking') }
})

new VideoExample({
	target: document.getElementById('example-3'),
	props: { example: examples.find(example => example.bibtex === 'wattenberg2016attacking') }
})

new VideoExample({
	target: document.getElementById('example-4'),
	props: { example: examples.find(example => example.bibtex === 'wattenberg2016attacking') }
})

new VideoExample({
	target: document.getElementById('example-5'),
	props: { example: examples.find(example => example.bibtex === 'wattenberg2016attacking') }
})

new VideoExample({
	target: document.getElementById('example-6'),
	props: { example: examples.find(example => example.bibtex === 'wattenberg2016attacking') }
})

new VideoExample({
	target: document.getElementById('example-7'),
	props: { example: examples.find(example => example.bibtex === 'wattenberg2016attacking') }
})
