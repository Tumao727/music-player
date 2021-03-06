// 创建 MusicPlayer 类来存储相关信息与方法
class MusicPlayer {
    constructor(index) {
        this.index = 0
        this.songs = [
            'music/1.mp3',
            'music/2.mp3',
            'music/3.mp3',
            'music/4.mp3',
            'music/5.mp3',
            'music/6.mp3',

        ]
        this.pictures = [
            'picture/1.jpg',
            'picture/2.jpg',
            'picture/3.jpg',
            'picture/4.jpg',
            'picture/5.jpg',
            'picture/6.jpg',
        ]
        this.names = [
            'Loser',
            'DROP',
            'Terror',
            'Ref:rain',
            'Again',
            'To the beginning',
        ]
        this.singers = [
            '米津玄師',
            `ROOKiEZ is PUNK'D`,
            'まふまふ',
            'Aimer',
            'YUI',
            'Kalafina',
        ]
    }
    
    // 上一首与下一首切换
    nextSong () {
        let songs = this.songs
        this.index = (this.index + 1) % songs.length
        return songs[this.index]
    }

    lastSong() {
        let songs = this.songs
        this.index = (this.index + songs.length - 1) % songs.length
        return songs[this.index]
    }

    // 图片上一张与下一张切换
    nextPic() {
        let pictures = this.pictures
        this.index = (this.index + 1) % pictures.length
        return pictures[this.index]
    }

    lastPic() {
        let pictures = this.pictures
        this.index = (this.index + pictures.length - 1) % pictures.length
        return pictures[this.index]
    }
}

// 播放及暂停
const audioPlayOrPause = (audio) => {
    let button = e('#id-span-play')
    bindEvent(button, 'click', () => {
        if (audio.paused) {
            button.classList.remove('fa-play')
            button.classList.add('fa-pause')
            audio.play()
        } else {
            button.classList.remove('fa-pause')
            button.classList.add('fa-play')
            audio.pause()
        }
    })
}

// 播放暂停时图标变化
const iconChange = () => {
    let button = e('#id-span-play')
    button.classList.remove('fa-play')
    button.classList.add('fa-pause')
}

// 进度条自动向前
const basebarAutoPlay = (audio) => {
    let progressbar = e('.progressbar')
    let played = audio.currentTime
    let total = audio.duration
    progressbar.style.width = `${played / total * 100}%`
}

// 点击改变进度条
const basebarControl = (audio) => {
    let basebar = e('.basebar')
    let progressbar = e('.progressbar')
    basebar.addEventListener('click', (event) => {
        let playedX = Number(event.offsetX)
        let total = audio.duration
        let time = playedX / 300 * total
        audio.currentTime = time
        let played = audio.currentTime
        progressbar.style.width = `${played / total * 100}%`
        // 改图标
        iconChange()
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
    let total = e('#id-span-total')

    current.innerHTML = time(currentTime)
    total.innerHTML = time(totalTime)
}

const showAudioTime = (audio) => {
    let interval = 300
    setInterval(() => {
        audioTime(audio)
        basebarAutoPlay(audio)
    }, interval)
}

// 点击切换歌曲与图片
const musicLast = (audio) => {
    let player = new MusicPlayer()
    let last = e('#id-span-last')
    bindEvent(last, 'click', function() {
        let song = player.lastSong()
        audio.src = song
        audio.play()
        // 改图标
        iconChange()
    })
}

const pictureLast = (img) => {
    let player = new MusicPlayer()
    let last = e('#id-span-last')
    let singer = e('#id-span-singer')
    let name = e('#id-span-name')
    bindEvent(last, 'click', function () {
        let pic = player.lastPic()
        img.src = pic
        // 修改歌曲与歌手信息
        singer.textContent = player.singers[player.index]
        name.textContent = player.names[player.index]
    })

}

const playLast = (audio, img) => {
    musicLast(audio)
    pictureLast(img)
}

const musicNext = (audio) => {
    let player = new MusicPlayer()
    let next = e('#id-span-next')
    bindEvent(next, 'click', function() {
        let song = player.nextSong()
        audio.src = song
        audio.play()
        // 改图标
        iconChange()
    })
}

const pictureNext = (img) => {
    let player = new MusicPlayer()
    let next = e('#id-span-next')
    let singer = e('#id-span-singer')
    let name = e('#id-span-name')
    bindEvent(next, 'click', function() {
        let pic = player.nextPic()
        img.src = pic
        singer.textContent = player.singers[player.index]
        name.textContent = player.names[player.index]
    })
}

const playNext = (audio, img) => {
    musicNext(audio)
    pictureNext(img)
}

// 随机播放
const randomNumber = (range) => {
    let number = Math.random() * range
    return Math.floor(number)
}

const randomSong = () => {
    let player = new MusicPlayer()
    let index = randomNumber(player.songs.length)
    let song = player.songs[index]
    let pic = player.pictures[index]
    let singer = player.singers[index]
    let name = player.names[index]
    return [song, pic, singer, name]
}

const random = (audio) => {
    let button = e('#id-span-random')
    bindEvent(button, 'click', () => {
        button.classList.toggle('clicked')
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
    let infos = randomSong()
    audio.src = infos[0]
    audio.play()
    let img = e('img')
    img.src = infos[1]
    let singer = e('#id-span-singer')
    singer.textContent = infos[2]
    let name = e('#id-span-name')
    name.textContent = infos[3]
}

// 循环播放
const loop = (audio) => {
    let button = e('#id-span-loop')
    bindEvent(button, 'click', () => {
        button.classList.toggle('clicked')
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
    let s = audio.src
    audio.src = s
}

// 顺序播放
const orderPlay = (audio) => {
    let img = e('img')
    let singer = e('#id-span-singer')
    let name = e('#id-span-name')
    let player = new MusicPlayer() 
    let song = player.nextSong()
    audio.src = song
    audio.play()
    let pic = player.pictures[player.index]
    img.src = pic
    singer.textContent = player.singers[player.index]
    name.textContent = player.names[player.index]
}


const bindEventCanPlay = (audio) => {
    bindEvent(audio, 'canplay', () => {
        audio.play()
        showAudioTime(audio)
    })
}

const bindEventEnded = (audio) => {
    let s = audio.dataset.status
    let button = e('#id-span-play')
    bindEvent(audio, 'ended', () => {
        button.classList.remove('fa-play')
        button.classList.add('fa-pause')
        if (s === 'order') {
            orderPlay(audio)
        }
        if (s === 'loop') {
            loopPlay(audio)
        }
        if (s === 'random') {
            randomPlay(audio)
        }
    })
}

const playStatus = (audio) => {
    random(audio)
    loop(audio)
}

const bindEvents = (a, img) => {
    audioPlayOrPause(a)
    showAudioTime(a)
    basebarControl(a)
    playLast(a, img)
    playNext(a, img)
    playStatus(a, img)
    bindEventCanPlay(a)
    bindEventEnded(a)
}

const __main = () => {
    let a = e('#id-audio-player')
    let img = e('img')
    bindEvents(a, img)
}

__main()