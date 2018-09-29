// 播放及暂停
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

// 显示当前播放时长与歌曲总长度
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

// 上一首 与 下一首 点击切换
const nextSong = (() => {
    let songs = [
        {
            song: 'music/1.mp3',
            pic: 'picture/1.jpg',
            name: 'Loser',
            singer: '米津玄師',
        },
        {
            song: 'music/2.mp3',
            pic: 'picture/2.jpg',
            name: 'DROP',
            singer: `ROOKiEZ is PUNK'D`,
        },
        {
            song: 'music/3.mp3',
            pic: 'picture/3.jpg',
            name: 'Terror',
            singer: 'まふまふ',
        },
    ]
    let index = 0
    return () => {
        index = (index + 1) % songs.length
        return songs[index]['song']
    }
})()

const lastSong = (() => {
    let songs = [
        {
            song: 'music/1.mp3',
            pic: 'picture/1.jpg',
            name: 'Loser',
            singer: '米津玄師',
        },
        {
            song: 'music/2.mp3',
            pic: 'picture/2.jpg',
            name: 'DROP',
            singer: `ROOKiEZ is PUNK'D`,
        },
        {
            song: 'music/3.mp3',
            pic: 'picture/3.jpg',
            name: 'Terror',
            singer: 'まふまふ',
        },
    ]
    let index = 0
    return () => {
        index = (index + songs.length - 1) % songs.length
        return songs[index]['song']
    }
})()

// 图片 上一张 与 下一张 切换
const nextPic = (() => {
    let songs = [
        {
            song: 'music/1.mp3',
            pic: 'picture/1.jpg',
            name: 'Loser',
            singer: '米津玄師',
        },
        {
            song: 'music/2.mp3',
            pic: 'picture/2.jpg',
            name: 'DROP',
            singer: `ROOKiEZ is PUNK'D`,
        },
        {
            song: 'music/3.mp3',
            pic: 'picture/3.jpg',
            name: 'Terror',
            singer: 'まふまふ',
        },
    ]
    let index = 0
    return () => {
        index = (index + 1) % songs.length
        return songs[index]['pic']
    }
})()

const lastPic = (() => {
    let songs = [
        {
            song: 'music/1.mp3',
            pic: 'picture/1.jpg',
            name: 'Loser',
            singer: '米津玄師',
        },
        {
            song: 'music/2.mp3',
            pic: 'picture/2.jpg',
            name: 'DROP',
            singer: `ROOKiEZ is PUNK'D`,
        },
        {
            song: 'music/3.mp3',
            pic: 'picture/3.jpg',
            name: 'Terror',
            singer: 'まふまふ',
        },
    ]
    let index = 0
    return () => {
        index = (index + songs.length - 1) % songs.length
        return songs[index]['pic']
    }
})()


const playLast = (audio, img) => {
    let last = e('#id-span-last')
    bindEvent(last, 'click', () => {
        let song = lastSong()
        audio.src = song
        audio.play()
        let pic = lastPic()
        img.src = pic
    })
}

const playNext = (audio, img) => {
    let next = e('#id-span-next')
    bindEvent(next, 'click', () => {
        let song = nextSong()
        audio.src = song
        audio.play()
        let pic = nextPic()
        img.src = pic
    })
}

// 随机播放
const randomNumber = (range) => {
    let number = Math.random() * range
    return Math.floor(number)
}

const randomSong = () => {
    var songs = [
        'music/1.mp3',
        'music/2.mp3',
        'music/3.mp3',
    ]
    let index = randomNumber(songs.length)
    return songs[index]
}

const random = (audio) => {
    let button = e('#id-span-random')
    bindEvent(button, 'click', () => {
        let status = audio.dataset.status
        // 若之前点过随机模式，则取消，改为默认的顺序播放
        if (status === 'random') {
            audio.dataset.status = 'order'
        // 若之前未点击过随机，则改为随机模式
        } else {
            audio.dataset.status = 'random'
        }
        bindEventEnded(audio)
    })
}

const randomPlay = (audio) => {
    bindEvent(audio, 'ended', () => {
        let song = randomSong()
        audio.src = song
        audio.play()
    })
}

// 循环播放
const loop = (audio) => {
    let button = e('#id-span-loop')
    bindEvent(button, 'click', () => {
        let status = audio.dataset.status
        // 若之前点过循环模式，则取消，改为默认的顺序播放
        if (status === 'loop') {
            audio.dataset.status = 'order'
            audio.loop = false
            // 若之前未点击过循环，则改为循环模式
        } else {
            audio.loop = true
            audio.dataset.status = 'loop'
        }
        bindEventEnded(audio)
    })
}

const loopPlay = (audio) => {
    bindEvent(audio, 'ended', () => {
        audio.play()
    })
}

// 顺序播放
const orderPlay = (audio) => {
    bindEvent(audio, 'ended', () => {
        let song = nextSong()
        audio.src = song
        audio.play()
    })
}

// 确定播放模式
const bindEventEnded = (audio) => {
    let s = audio.dataset.status
    if (s === 'order') {
        orderPlay(audio)
    }
    if (s === 'loop') {
        loopPlay(audio)
    }
    if (s === 'random') {
        randomPlay(audio)
    }
}

const playStatus = (audio) => {
    random(audio)
    loop(audio)
}

const bindEvents = (a, img) => {
    audioPlayOrPause(a)
    showAudioTime(a)
    playLast(a, img)
    playNext(a, img)
    playStatus(a)
    bindEventEnded(a)
}

const __main = () => {
    let a = e('#id-audio-player')
    let img = e('img')
    bindEvents(a, img)
}

__main()