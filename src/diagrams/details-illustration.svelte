<script>

    import Title from "./title.svelte";
    import fakeImage1 from "../../static/images/fake-images/fake-image-1.svg";
    import fakeImage2 from "../../static/images/fake-images/fake-image-2.svg";
    import fakeImage3 from "../../static/images/fake-images/fake-image-3.svg";
    import fakeImage4 from "../../static/images/fake-images/fake-image-4.svg";
    import { onMount, afterUpdate } from 'svelte';

    const fakeImages = [fakeImage1, fakeImage2, fakeImage3, fakeImage4]
    const numberOfAnnotationsPerImage = 3

    function assignAnnotations() {
        document.getElementById('annotation-1').onmouseover = () => changeSelectedAnnotation((selectedImage-1)*numberOfAnnotationsPerImage + 1)
        document.getElementById('annotation-2').onmouseover = () => changeSelectedAnnotation((selectedImage-1)*numberOfAnnotationsPerImage + 2)
        document.getElementById('annotation-3').onmouseover = () => changeSelectedAnnotation((selectedImage-1)*numberOfAnnotationsPerImage + 3)
        document.getElementById('annotation-1').onmouseout = () => changeAnnotationDisplay()
        document.getElementById('annotation-2').onmouseout = () => changeAnnotationDisplay()
        document.getElementById('annotation-3').onmouseout = () => changeAnnotationDisplay()
    }

    let selectedImage = 1;
    let selectedPoint = 0;
    let annotationDisplay = false

    onMount(() => {
        assignAnnotations()
    })

    afterUpdate(() => {
        assignAnnotations()
    })

    const noAnnotationMessage = "Select region for more information."

    const annotations = [
        "Straight hair looks painted.",
        "Unexpected teeth size, position, and quantity.",
        "Missing earring, and ear fringes are blurry, especially with overlapping hair.",
        "Asymmetric facial hair.",
        "Unexpected hairline and hair looks painted.",
        "Mismatched decision between missing earring and its shadow.",
        "Unresolved earring with breaks in continuity.",
        "Smoothed noise and out of place skin tones in skin tones in a shadow.",
        "Unresolved decision between skin wrinkles and eyelashes.",
        "Unexpected eye characteristics in second person.",
        "Unresolved decision between skin wrinkles and eyelashes.",
        "Unexpected mouth characteristics in third person."
    ]

    const karras2018 = "ICLR 2018"
    const karras2019 = "CVPR 2019"

    function changeSelectedAnnotation(i) {
        annotationDisplay = true
        selectedPoint = i-1
        hideFakeImage()
        setTimeout(() => {
            tapBackgroundToHideAnnotation()
        }, 500)
    }

    function changeSelectedImage(i) {
        selectedImage = i
    }

    function changeAnnotationDisplay() {
        annotationDisplay = false
        showFakeImage()
        dontTapBackgroundToHideAnnotation()
    }

    function tapBackgroundToHideAnnotation() {
        document.getElementById('fake-image-svg-container').onclick = () => changeAnnotationDisplay()
    }

    function dontTapBackgroundToHideAnnotation() {
        document.getElementById('fake-image-svg-container').onclick = () => {}
    }

    function hideFakeImage() {
        document.getElementById('fake-image').classList.add("hide")

        let selectedPointForSwitch = selectedPoint % 3

        switch (selectedPointForSwitch) {
            case 0:
                document.getElementById('mask-2').classList.add("remove")
                document.getElementById('mask-3').classList.add("remove")
                document.getElementById('annotation-2').classList.add("remove")
                document.getElementById('annotation-3').classList.add("remove")
                break;

            case 1:
                document.getElementById('mask-1').classList.add("remove")
                document.getElementById('mask-3').classList.add("remove")
                document.getElementById('annotation-1').classList.add("remove")
                document.getElementById('annotation-3').classList.add("remove")
                break;

            case 2:
                document.getElementById('mask-1').classList.add("remove")
                document.getElementById('mask-2').classList.add("remove")
                document.getElementById('annotation-1').classList.add("remove")
                document.getElementById('annotation-2').classList.add("remove")
                break;
        }
    }

    function showFakeImage() {
        // show main background image
        document.getElementById('fake-image').classList.remove("hide")

        // show annotations
        document.getElementById('annotation-1').classList.remove("remove")
        document.getElementById('annotation-2').classList.remove("remove")
        document.getElementById('annotation-3').classList.remove("remove")

        // show masks
        document.getElementById('mask-1').classList.remove("remove")
        document.getElementById('mask-2').classList.remove("remove")
        document.getElementById('mask-3').classList.remove("remove")

    }

</script>

<style>

    #wrapper {
        grid-column: text;
    }

    #thumbnail-wrapper {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-column-gap: 0.5em;
        /* height: 148px; */
    }

    .thumbnail {
        width: 100%;
        opacity: 0.4;
        /* border: 1px solid var(--gray-bg); */
    }

    .thumbnail-selected {
        /* border-color: black; */
        opacity: 0.8;
    }

    .thumbnail:hover {
        opacity: 1.0;
        cursor: pointer;
    }

    #grid-wrapper {
        display: grid;
        grid-template-columns: 7fr 4fr;
        grid-column-gap: 0.5rem;
    }

    #side-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    /* .ref {
		font-size: 0.8em;
		line-height: 1.5em;
        color: var(--gray);
        padding-bottom: 5px;
    } */

    #caption-wrapper {
        display: flex;
        /* flex-direction: column; */
        /* justify-content: center; */
        align-items: center;
    }

    .caption {
        /* border-left: 1px solid var(--gray-border); */
        padding: 5px 10px;
        /* border-radius: var(--border-radius); */
        /* font-size: 0.85rem; */
        color: var(--gray)
    }

    /* :global(#background) {
        fill-opacity:0
    } */

    :global(#annotation-1, #annotation-2, #annotation-3) {
        cursor: crosshair
    }

    /* :global(#fake-image) {
        opacity: 0.8;
    } */

    :global(.hide) {
        opacity: 0.5;
    }

    :global(.remove) {
        opacity: 0;
    }

    @media(max-width: 768px) {

        #grid-wrapper {
            grid-template-columns: 1fr;
        }

        #thumbnail-wrapper {
            grid-template-columns: repeat(4, 1fr);
        }

        .caption {
            padding-left: 0;
        }

        #wrapper {
          grid-column: screen !important;
        }

    }

    @media(max-width: 1000px) {
        #wrapper {
            grid-column: page;
        }
    }

</style>

<figure class="subgrid">
    <div id="wrapper" class="interactive-container">
        <Title
            titleText="What gives away a machine-generated image?"
            subtitleText="Interactivity on illustrations can help people get more context around certain objects that may not have clear and seperable boundaries."
        />

        <div id="grid-wrapper">
            <div>
                <div id="fake-image-svg-container">
                    {@html fakeImages[selectedImage-1]}
                </div>
            </div>
            <div id="side-wrapper">
                <div id="caption-wrapper">
                    <div class="caption">{annotationDisplay ? annotations[selectedPoint] : noAnnotationMessage}</div>
                </div>
                <div>
                    <!-- <div class="ref">Generated images from <d-cite key="karras2018progressive,karras2019style"></d-cite>.</div> -->
                    <div id="thumbnail-wrapper">
                        <div on:click={() => changeSelectedImage(1)}><img class={selectedImage === 1 ? "thumbnail-selected thumbnail" : "thumbnail"} src="images/fake-images/fake-image-1.jpg" alt="" /></div>
                        <div on:click={() => changeSelectedImage(2)}><img class={selectedImage === 2 ? "thumbnail-selected thumbnail" : "thumbnail"} src="images/fake-images/fake-image-2.jpg" alt="" /></div>
                        <div on:click={() => changeSelectedImage(3)}><img class={selectedImage === 3 ? "thumbnail-selected thumbnail" : "thumbnail"} src="images/fake-images/fake-image-3.jpg" alt="" /></div>
                        <div on:click={() => changeSelectedImage(4)}><img class={selectedImage === 4 ? "thumbnail-selected thumbnail" : "thumbnail"} src="images/fake-images/fake-image-4.jpg" alt="" /></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <figcaption style="grid-column: text;"><a class="figure-number" href="#details=illustration">6</a>: Choose between 1 of 4 machine-generated images and brush over the circle callouts to display a short message about each region. Generated images from <d-cite key="karras2018progressive,karras2019style"></d-cite>.</figcaption>
</figure>
