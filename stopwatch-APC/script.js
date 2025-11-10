document.addEventListener('DOMContentLoaded', () => {
  let stopwatchInterval, countdownInterval
  let stopwatchRunning = false, countdownRunning = false
  let stopwatchTime = 0
  let countdownTime = 0, countdownInitial = 0

  const stopwatchDisplay = document.getElementById('stopwatchDisplay')
  const countdownDisplay = document.getElementById('countdownDisplay')

  const startStopwatchBtn = document.getElementById('startStopwatch')
  const pauseStopwatchBtn = document.getElementById('pauseStopwatch')
  const resetStopwatchBtn = document.getElementById('resetStopwatch')

  if (startStopwatchBtn) {
    startStopwatchBtn.addEventListener('click', () => {
      if (!stopwatchRunning) {
        stopwatchRunning = true
        console.log('Stopwatch started')
        stopwatchInterval = setInterval(() => {
          stopwatchTime++
          if (stopwatchDisplay) stopwatchDisplay.textContent = formatTime(stopwatchTime)
        }, 1000)
      }
    })
  }

  if (pauseStopwatchBtn) {
    pauseStopwatchBtn.addEventListener('click', () => {
      if (stopwatchRunning) {
        stopwatchRunning = false
        clearInterval(stopwatchInterval)
        console.log('Stopwatch paused')
      }
    })
  }

  if (resetStopwatchBtn) {
    resetStopwatchBtn.addEventListener('click', () => {
      stopwatchRunning = false
      clearInterval(stopwatchInterval)
      stopwatchTime = 0
      if (stopwatchDisplay) stopwatchDisplay.textContent = '00:00:00'
      console.log('Stopwatch reset')
    })
  }

  document.getElementById('startCountdown').addEventListener('click', () => {
    const min = parseInt(document.getElementById('minutesInput').value) || 0
    const sec = parseInt(document.getElementById('secondsInput').value) || 0
    if ((min < 0 || sec < 0) || (min === 0 && sec === 0)) return
    if (!countdownRunning) {
      if (countdownTime === 0) {
        countdownTime = min * 60 + sec
        countdownInitial = countdownTime
      }
      countdownRunning = true
      console.log('Countdown started')
      countdownInterval = setInterval(() => {
        countdownTime--
        countdownDisplay.textContent = formatCountdown(countdownTime)
        if (countdownTime <= 0) {
          clearInterval(countdownInterval)
          countdownRunning = false
          alert('Countdown reached 00:00!')
          console.log('Countdown reached 00:00')
        }
      }, 1000)
    }
  })

  document.getElementById('pauseCountdown').addEventListener('click', () => {
    if (countdownRunning) {
      countdownRunning = false
      clearInterval(countdownInterval)
      console.log('Countdown paused')
    }
  })

  document.getElementById('resetCountdown').addEventListener('click', () => {
    countdownRunning = false
    clearInterval(countdownInterval)
    countdownTime = countdownInitial
    countdownDisplay.textContent = formatCountdown(countdownInitial)
    console.log('Countdown reset')
  })

  function formatTime(time) {
    const h = String(Math.floor(time / 3600)).padStart(2, '0')
    const m = String(Math.floor((time % 3600) / 60)).padStart(2, '0')
    const s = String(time % 60).padStart(2, '0')
    return `${h}:${m}:${s}`
  }

  function formatCountdown(time) {
    if (time < 0) time = 0
    const m = String(Math.floor(time / 60)).padStart(2, '0')
    const s = String(time % 60).padStart(2, '0')
    return `${m}:${s}`
  }

  document.addEventListener('keydown', e => {
    if (e.key === 's') {
      const el = document.getElementById('startStopwatch')
      if (el) el.click()
    }
    if (e.key === 'p') {
      const el = document.getElementById('pauseStopwatch')
      if (el) el.click()
    }
    if (e.key === 'r') {
      const el = document.getElementById('resetStopwatch')
      if (el) el.click()
    }
  })
})