const audioPlay = (audio) => {
    let button = e('#id-span-play')
    bindEvent(button, 'click', () => {
        audio.play()
    })
}

const audioPause = (audio) => {
    let button = e('#id-span-pause')
    bindEvent(button, 'click', () => {
        audio.pause()
    })
}

const bindEvents = (a) => {
    audioPlay(a)
    audioPause(a)
}

const __main = () => {
    let a = e('#id-audio-player')
    bindEvents(a)
}

__main()