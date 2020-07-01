<script>
	import { Tabs, TabList, TabPanel, Tab } from './tabs/tabs.js';
	import Application from "./application.svelte"
	import applicationData from "./application.json"
</script>

<style>
	#hidden-cites {
		display: none;
	}
</style>

<Tabs>
	<TabList>
		{#each applicationData as application}
    	<Tab>
			{application.title}
		</Tab>
	{/each}
	</TabList>

	{#each applicationData as application}
    	<TabPanel>
			<Application applicationData={application} />
		</TabPanel>
	{/each}
</Tabs>

<div id="hidden-cites">
	{#each applicationData as application}
		{#each application.examples as example}
			<d-cite key={example.bibtex}></d-cite>
		{/each}
	{/each}
</div>