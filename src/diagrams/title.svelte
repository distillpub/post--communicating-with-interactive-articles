<script>
    export let titleText;
    export let subtitleText;
</script>

<style>

    #title {
        font-weight: 700;
        font-size: 20px;
    }

    #subtitle {
        margin-bottom: 1em;
        color: var(--gray);
    }

    /* div {
        text-align: center
    } */

    img {
        padding-right: 0.5em;
    }

</style>

<div>
    
    <!-- <div style="display: flex"> -->
        <!-- <img src="images/pointer.svg" alt="Pointer: interactive diagram."> -->
        <div id="title">{titleText}</div>
    <!-- </div> -->
    <div id="subtitle">{subtitleText}</div>
</div>