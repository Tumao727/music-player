const audioPlayOrPause = (audio) => {
    let button = e('#id-span-play')
    bindEvent(button, 'click', () => {
        if (audio.paused) {
            audio.play()
        } else {
            audio.pause()
        }
    })
}

const bindEvents = (a) => {
    audioPlayOrPause(a)
}

const __main = () => {
    let a = e('#id-audio-player')
    bindEvents(a)
}

__main()