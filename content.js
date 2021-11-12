if (window.location.hostname == "www.linkedin.com") {

    window.onload = function () {

        if ($('.classroom-media-screens').length != 0) {

            console.log("%cTraduciendo subtitulos by \"Translate Subtitles Linkedin\"", 'color:green;background:#eeffee;padding: .2rem 1rem;');


            /** Cambiamos el atributo de traduccion para permitirla */
            $("html").attr("translate", "yes");

            /** Presionamos el tab con la transcripcion */
            $(".classroom-layout__workspace-tab-container > button:nth-child(3)").trigger("click");

            /** Añadimos estilos necesarios */
            var styles = `
            .caption-custom{
                position: absolute;
                z-index: 1;
                bottom: 78px;
                pointer-events: none;
                -webkit-transition: bottom .5s ease-in-out;
                transition: bottom .5s ease-in-out;
                background: black;
                padding: .5rem 1rem;
            }

            .classroom-media-screens .classroom-transcript{
                visibility: hidden;
                position: fixed;
                top: 0;
                left: 0;
                pointer-events: none;
                width: 100vw;
                z-index: 999999;
            }

            .classroom-media-screens .classroom-transcript .t-16{font-size:10px;}
            `;

            var styleSheet = document.createElement("style");
            styleSheet.type = "text/css";
            styleSheet.innerText = styles;
            document.head.appendChild(styleSheet);

            $('.vjs-text-track-display').after('<div class="caption-custom"></div>');

            setTimeout(function () {
                checkURLchange();
            }, 500);


            // $(".classroom-toc-item__link").click(function () {
            //     setTimeout(function () {
            //         checkURLchange();
            //     }, 500);
            // });

        }
    }

    function checkURLchange() {

        /** Presionamos el tab con la transcripcion */
        $(".classroom-layout__workspace-tab-container > button:nth-child(3)").trigger("click");

        $('.classroom-transcript').prependTo('.classroom-layout');

        setTimeout(function () {
            $('.classroom-transcript__content .content-transcript-line').each(function (i, obj) {
                let idTranscription = $(this).attr('aria-id');
                let idTranscriptionSlice = idTranscription.replace('classroom-transcript-line-', '');
                //Establecer atributos en segundos
                $(this).attr('data-sg', Number(Number(idTranscriptionSlice) / 1000).toFixed());
            })
        }, 100);

        //Establecer el primer comentario en el video
        let firstComment = $("[data-sg='1']").text();
        $('.caption-custom').text(firstComment);

        let videoE = document.getElementById("vjs_video_3_html5_api");
        if (videoE) {

            videoE.addEventListener('timeupdate', (e) => {


                //let contentSubtitle = document.querySelector("[data-sg='" + String(Math.floor(e.target.currentTime)) +"']");
                let contentSubtitle = $("[data-sg='" + String(Math.floor(e.target.currentTime)) + "']").text();

                //let contentID = "[aria-id^='transcripts-component-line-" + String( (e.target.currentTime * 1000).toFixed() ) +"']";
                let textCaptionCurrent = $('.vjs-custom-captions-cue').text();


                if (contentSubtitle && (contentSubtitle != textCaptionCurrent)) {
                    $('.caption-custom').text(contentSubtitle);
                    //console.log(contentSubtitle);
                }

                if (videoE.currentTime > videoE.duration - 0.5) {
                    // 0.5 is seconds before end.
                    videoE.pause();
                }

            });
        }

    }

    let lastUrl = location.href;
    new MutationObserver(() => {
        const url = location.href;
        if (url !== lastUrl) {
            lastUrl = url;
            onUrlChange();
        }
    }).observe(document, {
        subtree: true,
        childList: true
    });


    function onUrlChange() {
        // console.log('URL changed!' + location.href);
        if ($('.classroom-media-screens').length != 0){
            checkURLchange();
        }
    }

}