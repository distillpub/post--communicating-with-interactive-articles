<script>

</script>

<style>

    #wrapper {
        --outerBorder: 3px;
        --innerBorder: 15px;

        grid-column: middle;
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
        padding: var(--outerBorder);
        font-weight: 600;
        font-size: 1em;
        color: rgba(0, 0, 0, 0.8);
        height: 150px;
    }

    :global(.blue-green) {
        background: #00f260; /* fallback for old browsers */
        background: -webkit-linear-gradient(to top right, #00f260, #0575e6); /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to top right, #00f260, #0575e6); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        /* background: rgb(0, 236, 130); */
        /* -webkit-background-clip: text; */
        /* -webkit-text-fill-color: transparent; */
    }

    :global(.red-orange) {
        background: #fc4a1a;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to top, #f7b733, #fc4a1a);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to top, #f7b733, #fc4a1a); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        /* background: rgb(0, 200, 255); */
        /* -webkit-background-clip: text; */
        /* -webkit-text-fill-color: transparent; */
    }

    :global(.soft-blue) {
        background: #74ebd5; /* fallback for old browsers */
        background: -webkit-linear-gradient(to left, #74ebd5, #acb6e5); /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to left, #74ebd5, #acb6e5); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        /* background: rgb(255, 106, 255); */
        /* -webkit-background-clip: text; */
        /* -webkit-text-fill-color: transparent; */
    }

    :global(.argon) {
        background: #03001e; /* fallback for old browsers */
        background: -webkit-linear-gradient(to bottom right, #03001e, #7303c0, #ec38bc, #fdeff9); /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to bottom right, #03001e, #7303c0, #ec38bc, #fdeff9); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        /* background: rgb(255, 124, 82); */
        /* -webkit-background-clip: text; */
        /* -webkit-text-fill-color: transparent; */
    }

    :global(.sun) {
        background: #e1eec3;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #f05053, #e1eec3);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #f05053, #e1eec3); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        /* background: rgb(210, 204, 0); */
        /* -webkit-background-clip: text; */
        /* -webkit-text-fill-color: transparent; */
    }

    @media (max-width: 1180px) {
        #wrapper {
            grid-column: page;
            padding-left: 0;
            padding-right: 0;
        }
    }

    @media (max-width: 1000px) {
        #wrapper {
            grid-template-columns: repeat(12, 1fr);
            grid-column: page;
        }

        .one { grid-column: 1/5;}
        .two { grid-column: 5/9;}
        .three { grid-column: 9/13;}
        .four { grid-column: 1/7;}
        .five { grid-column: 7/13;}

        .item {
            height: 100px;
        }

        .inner {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
    }

    @media(max-width: 768px) {
        /* #wrapper {
            grid-template-columns: 1fr;
        } */

        .item {
            height: auto;
        }
    }
    
    .inner {
        background: white;
        padding: var(--innerBorder);
        height: calc(100% - 2*var(--innerBorder));
        border-radius: calc(var(--border-radius) - var(--outerBorder));
    }

</style>

<div id="wrapper">
    <a class="one" href="#connecting-people-and-data"><div class="item blue-green"><div class="inner">Connecting People and Data</div></div></a>
    <a class="two" href="#making-systems-playful"><div class="item red-orange"><div class="inner">Making Systems Playful</div></div></a>
    <a class="three" href="#prompting-self-reflection"><div class="item soft-blue"><div class="inner">Prompting Self-Reflection</div></div></a>
    <a class="four" href="#personalizing-reading"><div class="item argon"><div class="inner">Personalizing Reading</div></div></a>
    <a class="five" href="#reducing-cognitive-load"><div class="item sun"><div class="inner">Reducing Cognitive Load</div></div></a>
</div>