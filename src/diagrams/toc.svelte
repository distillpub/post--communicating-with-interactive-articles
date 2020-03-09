<style>
    @media(max-width: 1000px) {
        :global(d-contents) {
            justify-self: start;
            align-self: start;
            grid-column-start: 2;
            grid-column-end: 6;
            padding-bottom: 0.5em;
            margin-bottom: 1em;
            padding-left: 0.25em;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            border-bottom-width: 1px;
            border-bottom-style: solid;
            border-bottom-color: rgba(0, 0, 0, 0.1);
        }
    }

    @media (min-width: 1000px) {
        :global(d-contents) {
            align-self: start;
            grid-column-start: 1;
            grid-column-end: 4;
            justify-self: end;
            padding-right: 3em;
            padding-left: 2em;
            border-right: 1px solid rgba(0, 0, 0, 0.1);
            border-right-width: 1px;
            border-right-style: solid;
            border-right-color: rgba(0, 0, 0, 0.1);
        }
    }

    @media (min-width: 1180px) {
        :global(d-contents) {
            grid-column-start: 1;
            grid-column-end: 4;
            justify-self: end;
            padding-right: 3em;
            padding-left: 2em;
            border-right: 1px solid rgba(0, 0, 0, 0.1);
            border-right-width: 1px;
            border-right-style: solid;
            border-right-color: rgba(0, 0, 0, 0.1);
        }
    }

    :global(d-contents nav h3) {
        margin-top: 0;
        margin-bottom: 1em;
    }

    :global(d-contents nav a) {
        color: rgba(0, 0, 0, 0.8);
        border-bottom: none;
        text-decoration: none;
    }

    :global(d-contents li) {
        list-style-type: none;
    }

    :global(d-contents ul) {
        padding-left: 1em;
    }

    :global(d-contents nav ul li) {
        margin-bottom: .25em;
    }

    :global(d-contents nav a:hover) {
        text-decoration: underline solid rgba(0, 0, 0, 0.6);
    }

    :global(d-contents nav ul) {
        margin-top: 0;
        margin-bottom: 6px;
    }

    :global(d-contents nav>div) {
        display: block;
        outline: none;
        margin-bottom: 0.5em;
    }

    :global(d-contents nav>div>a) {
        font-size: 13px;
        font-weight: 600;
    }

    :global(d-contents nav>div>a) {
        font-size: 13px;
        font-weight: 600;
    }

    :global(d-contents nav>div>a:hover,
    d-contents nav>ul>li>a:hover) {
        text-decoration: none;
    }
</style>

<nav class="l-text toc figcaption">
    <h3>Contents</h3>
    <div><a href="#introduction">Introduction</a></div>
    <div><a href="#applications">Applications</a></div>
    <div><a href="#experiment-1">The Theory and Practice of Interactive Articles</a></div>
    <ul>
      <li><a href="#improving-recall">Improving Recall</a></li>
      <li><a href="#improving-engagement">Improving Engagement</a></li>
      <li><a href="#enabling-experience">Enabling Experience</a></li>
      <li><a href="#reducing-cognitive-load">Reducing Cognitive Load</a></li>
      <li><a href="#personalization">Personalization</a></li>
    </ul>
    <div><a href="#critical-reflections">Critical Reflections</a></div>
    <div><a href="#challenges">Challenges of Interactive Writing</a></div>
    <div><a href="#discussion">Discussion</a></div>
</nav>
