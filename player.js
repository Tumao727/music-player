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
    if (min < 10) {
        min = '0' + String(min)
    }
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

const nextSong = (() => {
    let songs = [
        '1.mp3',
        '2.mp3',
        '3.mp3',
    ]
    let index = 0
    return () => {
        index = (index + 1) % songs.length
        return songs[index]
    }
})()

const lastSong = (() => {
    let songs = [
        '1.mp3',
        '2.mp3',
        '3.mp3',
    ]
    let index = 0
    return () => {
        index = (index + songs.length - 1) % songs.length
        return songs[index]
    }
})()

const playLast = (audio) => {
    let last = e('#id-span-last')
    bindEvent(last, 'click', () => {
        let song = lastSong()
        audio.src = `music\\${song}`
        log(audio.src)
        audio.play()
    })
}

const playNext = (audio) => {
    let next = e('#id-span-next')
    bindEvent(next, 'click', () => {
        let song = nextSong()
        audio.src = `music\\${song}`
        log(audio.src)
        audio.play()
    })
}

const bindEvents = (a) => {
    audioPlayOrPause(a)
    showAudioTime(a)
    playLast(a)
    playNext(a)
}

const __main = () => {
    let a = e('#id-audio-player')
    bindEvents(a)
}

__main()