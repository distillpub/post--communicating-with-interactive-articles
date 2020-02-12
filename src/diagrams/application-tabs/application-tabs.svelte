<script>
	import { Tabs, TabList, TabPanel, Tab } from './tabs/tabs.js';
	import Application from "./application.svelte"
	import applicationData from "./application.json"
</script>

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