<style>

    #wrapper {
        --outerBorder: 1px;
        --innerBorder: 0px;

        grid-column: text;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-gap: 0.5em;

        padding-top: 1rem;
        /* padding-bottom: 1rem; */
    }

    /* a {
        text-decoration: none !important;
        transition: box-shadow 0.35s, transform 0.35s;
        transform: scale(1.0);
        border-bottom: none;
    } */

    /* a:hover {
        transform: scale(1.04);
        box-shadow: 0px 1px 4px rgba(0,0,0,0.05);
        text-decoration: none !important;
    } */

    .item {
        /* border: 1px solid var(--gray-border); */
        /* border-radius: var(--outerBorder); */
        padding: var(--outerBorder);
        font-weight: 500;
        font-size: 0.8em;
        line-height: 1.2;
        /* color: rgba(0, 0, 0, 0.8); */
        /* height: 50px; */
        /* text-align: center; */
        /* border: solid 2px #999999; */

        /* color: #222222; */
        /* border: none; */
        /* border-radius: 25px; */
        padding: 0.7em 0.7em;
        min-height: 120px;
        /* background: hsl(0, 0%, 97%); */
        /* color: #666666; */
        /* transition: 0.35s color; */
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-decoration: none !important;
        color: #222222 !important;
    }

    .item .caption {
        color: var(--gray);
        font-weight: 400;
        padding-top: 0.25rem;
    }

    /* .item:hover {
        color: #222222;
    } */

    .blue-green {
        /* background: #00f260; fallback for old browsers */
        /* box-shadow: 5px 5px 0 #8AE395; */
        /* background: #8AE395; */
        border: solid 2px #5AD86A;
        color: #5AD86A;
        /* background: -webkit-linear-gradient(to top right, #00f260, #0575e6); /* Chrome 10-25, Safari 5.1-6 */
        /* background: linear-gradient(to top right, #00f260, #0575e6); W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        /* background: rgb(0, 236, 130); */
        /* -webkit-background-clip: text; */
        /* -webkit-text-fill-color: transparent; */
    }

    .red-orange {
        /* background: #fc4a1a;  fallback for old browsers */
        /* box-shadow: 5px 5px 0 #D1CA5B; */
        /* background: #D1CA5B; */
        border: solid 2px #C7BF38;
        color: #C7BF38;
        /* background: -webkit-linear-gradient(to top, #f7b733, #fc4a1a);  /* Chrome 10-25, Safari 5.1-6 */
        /* background: linear-gradient(to top, #f7b733, #fc4a1a); W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        /* background: rgb(0, 200, 255); */
        /* -webkit-background-clip: text; */
        /* -webkit-text-fill-color: transparent; */
    }

    .soft-blue {
        /* background: #74ebd5; fallback for old browsers */
        /* box-shadow: 5px 5px 0 #89E6F9; */
        /* background: #89E6F9; */
        border: solid 2px #73C4F5;
        color: #73C4F5;
        /* background: -webkit-linear-gradient(to left, #74ebd5, #acb6e5); /* Chrome 10-25, Safari 5.1-6 */
        /* background: linear-gradient(to left, #74ebd5, #acb6e5); W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        /* background: rgb(255, 106, 255); */
        /* -webkit-background-clip: text; */
        /* -webkit-text-fill-color: transparent; */
    }

    .argon {
        /* background: #03001e; fallback for old browsers */
        /* box-shadow: 5px 5px 0 #DF80F1; */
        /* background: #DF80F1; */
        border: solid 2px #DF80F1;
        color: #DF80F1;
        /* background: -webkit-linear-gradient(to bottom right, #03001e, #7303c0, #ec38bc, #fdeff9); /* Chrome 10-25, Safari 5.1-6 */
        /* background: linear-gradient(to bottom right, #03001e, #7303c0, #ec38bc, #fdeff9); W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        /* background: rgb(255, 124, 82); */
        /* -webkit-background-clip: text; */
        /* -webkit-text-fill-color: transparent; */
    }


    .sun {
        /* background: #e1eec3;  fallback for old browsers */
        /* box-shadow: 5px 5px 0 #E28765; */
        /* background: #E28765; */
        border: solid 2px #E28765;
        color: #E28765;
        /* background: -webkit-linear-gradient(to right, #f05053, #e1eec3);  /* Chrome 10-25, Safari 5.1-6 */
        /* background: linear-gradient(to right, #f05053, #e1eec3); W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        /* background: rgb(210, 204, 0); */
        /* -webkit-background-clip: text; */
        /* -webkit-text-fill-color: transparent; */
    }

    @media (max-width: 1180px) {
        #wrapper {
            grid-column: page;
            /* grid-template-columns: repeat(6, 1fr); */
        }
        .item {
            min-height: 120px;
            padding: 0.8rem;
        }
    }

    @media (max-width: 1000px) {
        .item {
            min-height: 90px;
        }

        .inner {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        #wrapper {
            grid-template-columns: repeat(6, 1fr);
        }

        .one { grid-column: 1/3;}
        .two { grid-column: 3/5;}
        .three { grid-column: 5/7;}
        .four { grid-column: 1/4;}
        .five { grid-column: 4/7;}
    }

    @media(max-width: 768px) {
        .item {
            height: auto;
            min-height: auto;
            padding: 0.5rem;
            font-size: 0.9em;
            /* border-top: none; */
            /* border-bottom: none; */
            /* border-right: none; */
        }

        #wrapper {
            grid-template-columns: 1fr;
            grid-column: page;
            grid-gap: 0.75em;
        }

        .one { grid-column: 1;}
        .two { grid-column: 1;}
        .three { grid-column: 1;}
        .four { grid-column: 1;}
        .five { grid-column: 1;}

        /* .blue-green, .red-orange, .soft-blue, .argon, .sun {
            border-width: 5px;
        } */


    }

    .inner {
        text-decoration: none !important;
        /* display: none; */
        /* background: white; */
        /* padding: var(--innerBorder);
        height: calc(100% - 2*var(--innerBorder)); */
        /* border-radius: calc(var(--border-radius) - var(--outerBorder)); */
    }

</style>

<div id="wrapper">

    <!-- <a class="one" href="#connecting-people-and-data"><div class="item blue-green"><div class="inner">Connecting People and Data. <span class="caption">More text here.</span></div></div></a>
    <a class="two" href="#making-systems-playful"><div class="item red-orange"><div class="inner">Making Systems Playful. <span class="caption">More text here.</span></div></div></a>
    <a class="three" href="#prompting-self-reflection"><div class="item soft-blue"><div class="inner">Prompting Self-Reflection. <span class="caption">More text here.</span></div></div></a>
    <a class="four" href="#personalizing-reading"><div class="item argon"><div class="inner">Personalizing Reading. <span class="caption">More text here.</span></div></div></a>
    <a class="five" href="#reducing-cognitive-load"><div class="item sun"><div class="inner">Reducing Cognitive Load. <span class="caption">More text here.</span></div></div></a> -->

    <div class="one"><div class="item blue-green"><div class="inner">Connecting People and Data. <div class="caption">Make data pleasant to work with. Happy readers are engaged readers.</div></div></div></div>
    <div class="two"><div class="item red-orange"><div class="inner">Making Systems Playful. <div class="caption">Run interactive simulations directly in the browser. No setup required.</div></div></div></div>
    <div class="three"><div class="item soft-blue"><div class="inner">Prompting Self-Reflection. <div class="caption">Help readers learn by asking them to reflect in a low pressure environment. </div></div></div></div>
    <div class="four" ><div class="item argon"><div class="inner">Personalizing Reading. <div class="caption">Let readers choose the content that is relevant to their own experience.</div></div></div></div>
    <div class="five"><div class="item sun"><div class="inner">Reducing Cognitive Load. <div class="caption">Use effective representations to make complex topics more intuitive.</div></div></div></div>
    
    <!-- <div class="item one blue-green"><div class="inner">Connecting People and Data</div></div>
    <div class="item two red-orange"><div class="inner">Making Systems Playful</div></div>
    <div class="item three soft-blue"><div class="inner">Prompting Self-Reflection</div></div>
    <div class="item four argon"><div class="inner">Personalizing Reading</div></div>
    <div class="item five sun"><div class="inner">Reducing Cognitive Load</div></div> -->
</div>
