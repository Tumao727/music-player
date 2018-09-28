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

const time = (timeLength) => {
    let min = Math.floor(timeLength / 60)
    let sec = Math.floor(timeLength % 60)
    // 调整时间展示格式
    if (sec < 10) {
        sec = '0' + String(sec)
    }
    let result = `${min}:${sec}`
    return result
}

const audioTime = (audio) => {
    let totalTime = audio.duration
    let currentTime = audio.currentTime

    let current = e('#id-span-current')
    let separator = e('#id-span-separator')
    let total = e('#id-span-total')

    current.innerHTML = time(currentTime)
    separator.innerHTML = ' / '
    total.innerHTML = time(totalTime)
}

const showAudioTime = (audio) => {
    let interval = 300
    setInterval(() => {
        audioTime(audio)
    }, interval)
}

const bindEvents = (a) => {
    audioPlayOrPause(a)
    showAudioTime(a)
}

const __main = () => {
    let a = e('#id-audio-player')
    bindEvents(a)
}

__main()