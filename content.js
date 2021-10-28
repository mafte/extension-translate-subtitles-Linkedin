if (window.location.hostname == "www.linkedin.com") {
    console.log("Traduciendo subtitulos");

    window.onload = function () {

        /** Cambiamos el atributo de traduccion para permitirla */
        $("html").attr("translate", "yes");

        /** Presionamos el tab con la transcripcion */
        $(".classroom-layout__workspace-tab-container > button:nth-child(3)").trigger("click");
        var oldURL = "";
        var currentURL = window.location.href;
        console.log("oldURL:" + oldURL);
        console.log("currentURL:" + currentURL);


        function checkURLchange(currentURL) {

            if (currentURL != oldURL) {
                /** Presionamos el tab con la transcripcion */
                $(".classroom-layout__workspace-tab-container > button:nth-child(3)").trigger("click");

                setTimeout(function () {
                    $('.classroom-transcript__content .content-transcript-line').each(function (i, obj) {
                        let idTranscription = $(this).attr('aria-id');
                        let idTranscriptionSlice = idTranscription.replace('classroom-transcript-line-', '');
                        //Establecer atributos en segundos
                        $(this).attr('data-sg', Number(Number(idTranscriptionSlice) / 1000).toFixed());
                    })
                }, 1000);



                let videoE = document.getElementById("vjs_video_3_html5_api");
                if (videoE) {

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
                    `

                    var styleSheet = document.createElement("style");
                    styleSheet.type = "text/css";
                    styleSheet.innerText = styles;
                    document.head.appendChild(styleSheet);

                    $('.vjs-text-track-display').after('<div class="caption-custom"></div>');
                    
                    console.log("Sigue el proceso normal");


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

                oldURL = currentURL;
            }

            oldURL = window.location.href;
            setTimeout(function () {
                checkURLchange(window.location.href);
            }, 1000);
        }

        checkURLchange(currentURL);

        $(".classroom-toc-item__link").click(function () {
            var currentURL = window.location.href;
            checkURLchange(currentURL);
        });


    }


}