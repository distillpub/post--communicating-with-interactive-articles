<script>

</script>

<style>
    #wrapper {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-gap: 1em;
    }

    a {
        text-decoration: none;
        transition: box-shadow 0.35s, transform 0.35s;
        transform: scale(1.0);
    }

    a:hover {
        transform: scale(1.04);
        box-shadow: 0px 1px 4px rgba(0,0,0,0.05);
    }

    .item {
        border: 1px solid var(--gray-border);
        border-radius: var(--border-radius);
        padding: 1em;
        font-weight: 600;
        font-size: 1em;
        color: rgba(0, 0, 0, 0.8);
        height: 150px;
    }

    @media(max-width: 768px) {
        #wrapper {
            grid-template-columns: 1fr;
        }

        .item {
            height: auto;
        }
    }
    
</style>

<div id="wrapper">
    <a href="#connecting-people-and-data"><div class="item">Connecting People and Data</div></a>
    <a href="#making-systems-playful"><div class="item">Making Systems Playful</div></a>
    <a href="#prompting-self-reflection"><div class="item">Prompting Self-Reflection</div></a>
    <a href="#personalizing-reading"><div class="item">Personalizing Reading</div></a>
    <a href="#reducing-cognitive-load"><div class="item">Reducing Cognitive Load</div></a>
</div>