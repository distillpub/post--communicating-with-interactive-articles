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
        /* box-shadow: 0px 1px 4px rgba(0,0,0,0.05); */
    }

    .item {
        /* border: 1px solid var(--gray-border); */
        border-radius: var(--border-radius);
        padding: 1em;
        font-weight: 600;
        font-size: 1em;
        color: rgba(0, 0, 0, 0.8);
        height: 150px;
    }

    .blue-green {
        background: #00f260; /* fallback for old browsers */
        background: -webkit-linear-gradient(to top right, #00f260, #0575e6); /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to top right, #00f260, #0575e6); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .red-orange {
        background: #fc4a1a;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to top, #f7b733, #fc4a1a);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to top, #f7b733, #fc4a1a); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .soft-blue {
          background: #74ebd5; /* fallback for old browsers */
        background: -webkit-linear-gradient(to left, #74ebd5, #acb6e5); /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to left, #74ebd5, #acb6e5); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .argon {
        background: #03001e; /* fallback for old browsers */
        background: -webkit-linear-gradient(to bottom right, #03001e, #7303c0, #ec38bc, #fdeff9); /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to bottom right, #03001e, #7303c0, #ec38bc, #fdeff9); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        color: white;
    }

    .sun {
        background: #e1eec3;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #f05053, #e1eec3);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #f05053, #e1eec3); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
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
    <a href="#connecting-people-and-data"><div class="item blue-green">Connecting People and Data</div></a>
    <a href="#making-systems-playful"><div class="item red-orange">Making Systems Playful</div></a>
    <a href="#prompting-self-reflection"><div class="item soft-blue">Prompting Self-Reflection</div></a>
    <a href="#personalizing-reading"><div class="item argon">Personalizing Reading</div></a>
    <a href="#reducing-cognitive-load"><div class="item sun">Reducing Cognitive Load</div></a>
</div>