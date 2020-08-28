// Hot reloading
// import * as _unused from "raw-loader!./index.ejs";
// TODO: disable before publishing

import ResearchPracticeTable from "./diagrams/research-x-practice-table.svelte"
import TOC from "./diagrams/toc.svelte"
import ApplicationTabs from "./diagrams/application-tabs/application-tabs.svelte"
import Horse from "./diagrams/horse.svelte"
import ExampleTable from "./diagrams/example-table.svelte"
import examples from "./diagrams/video-examples.json"
import VideoExample from "./diagrams/video-example.svelte"
import DetailsVis from "./diagrams/details-vis.svelte"
// import DetailsIllustration from "./diagrams/details-illustration.svelte"
import DetailsMath from "./diagrams/details-math.svelte"
import DetailsText from "./diagrams/details-text.svelte"
import SimulationVis from "./diagrams/simulation-vis.svelte"
import YouDrawIt from "./diagrams/you-draw-it.svelte"
import Jam from "./diagrams/jam.svelte"
import Parametric from "./diagrams/parametric.svelte"
import Teaser from "./diagrams/teaser.svelte"

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

const detailsVis = new DetailsVis({
	target: document.getElementById('details-vis')
});

// const detailsIllustration = new DetailsIllustration({
// 	target: document.getElementById('details-illustration')
// });


const detailsMath = new DetailsMath({
	target: document.getElementById('details-math')
});

const detailsText = new DetailsText({
	target: document.getElementById('details-text')
});

const simulationVis = new SimulationVis({
	target: document.getElementById('simulation-vis')
});

const youDrawIt = new YouDrawIt({
	target: document.getElementById('you-draw-it')
});

const jam = new Jam({
	target: document.getElementById('jam')
});

const parametric = new Parametric({
	target: document.getElementById('parametric')
});

const teaser = new Teaser({
	target: document.getElementById('teaser')
});

// video examples
new VideoExample({
	target: document.getElementById('goldenberg2019you'),
	props: { example: examples.find(example => example.bibtex === 'goldenberg2019you')}
})

new VideoExample({
	target: document.getElementById('case2014how'),
	props: { example: examples.find(example => example.bibtex === 'case2014how') }
})

new VideoExample({
	target: document.getElementById('badger2018extensive'),
	props: { example: examples.find(example => example.bibtex === 'badger2018extensive') }
})

new VideoExample({
	target: document.getElementById('webworks2009cutthroat'),
	props: { example: examples.find(example => example.bibtex === 'webworks2009cutthroat') }
})

new VideoExample({
	target: document.getElementById('barron2018designing'),
	props: { example: examples.find(example => example.bibtex === 'barron2018designing') }
})

new VideoExample({
	target: document.getElementById('sanderson2018visualizing'),
	props: { example: examples.find(example => example.bibtex === 'sanderson2018visualizing') }
})

new VideoExample({
	target: document.getElementById('popovich2018how'),
	props: { example: examples.find(example => example.bibtex === 'popovich2018how') }
})

new VideoExample({
	target: document.getElementById('matuschak2019quantum'),
	props: { example: examples.find(example => example.bibtex === 'matuschak2019quantum') }
})



const target = document.getElementById('details-illustration');
target.addEventListener('ready', () => {
	import('./diagrams/details-illustration.svelte').then(_Element => {
		console.log(_Element);
		new _Element.default({ target });
	});
})