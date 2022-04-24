const button = document.querySelector('#button')

const cookieCounter = document.querySelector('#cookie-counter')

const cookiePerSec = document.querySelector('#cookie-per-sec')

const cookiePerClick = document.querySelector('#cookie-per-click')

const btnsUpgrade = document.querySelector('.btns-upgrade')

const btnResetData = document.querySelector('.reset-data')



let clickSize = 1

let countCookie = 0

let countCookiePerSec = 0



getValuesLocalStorage()




cookiePerClick.textContent = clickSize

// Кнопка печенька
button.addEventListener('click', () => {
    clickBtn(clickSize)
})



const perSecondInterval = setInterval(perSecond, 1000)


// Кнопки апгрейда
btnsUpgrade.addEventListener('click', (e) => {
    
    if (e.target.tagName === 'BUTTON') {
        // Кнопка +1 Печенька за клик // 25
        if (e.target.getAttribute('data-click-1') === '') {
            if (countCookie >= 25) {
                changeCookieCount(-25)
                changeCookiePerClick(1)
            } else {
                alert('Недостаточно печенек для покупки')
            }
        }

        // Кнопка +5 Печенька за клик // 150
        if (e.target.getAttribute('data-click-5') === '') {
            if (countCookie >= 150) {
                changeCookieCount(-150)
                changeCookiePerClick(5)
            } else {
                alert('Недостаточно печенек для покупки')
            }
        }

        // Кнопка +1 Печенька за сек // 50

        if (e.target.getAttribute('data-sec-1') === '') {
            if (countCookie >= 50) {
                changeCookiePerSec(1)
                changeCookieCount(-50)
            } else {
                alert('Недостаточно печенек для покупки')
            }
        }
        if (e.target.getAttribute('data-sec-5') === '') {
            if (countCookie >= 300) {
                changeCookieCount(-300)
                changeCookiePerSec(5)
            } else {
                alert('Недостаточно печенек для покупки')
            }
        }
    }
})

// Кнопка reset data

btnResetData.addEventListener('click', () => {
    resetData();
})




function clickBtn(clickSize) {
    changeCookieCount(clickSize)
    
} 

function changeCookieCount(count) {
    countCookie = countCookie + count
    cookieCounter.textContent = countCookie
    localStorage.setItem('countCookie', countCookie)
}

function setCookieCount(count) {
    countCookie = count
    cookieCounter.textContent = countCookie
    localStorage.setItem('countCookie', countCookie)
}

function changeCookiePerClick(count) {
    clickSize = clickSize + count
    cookiePerClick.textContent = clickSize
    localStorage.setItem('cookiePerClick', clickSize)
}
function changeCookiePerSec(count) {
    countCookiePerSec += count
    cookiePerSec.textContent = countCookiePerSec
    localStorage.setItem('cookiePerSec', countCookiePerSec)
}


function perSecond() {
    clickBtn(countCookiePerSec)
}

function getValuesLocalStorage() {
    if (localStorage.getItem('countCookie')) {
        setCookieCount(+localStorage.getItem('countCookie'))
    }
    if (localStorage.getItem('cookiePerClick')) {
        clickSize = +localStorage.getItem('cookiePerClick')
    }
    if (localStorage.getItem('cookiePerSec')) {
        countCookiePerSec = +localStorage.getItem('cookiePerSec')
        cookiePerSec.textContent = countCookiePerSec
    }
}

function resetData() {
    clickSize = 1
    countCookie = 0
    countCookiePerSec = 0
    localStorage.clear()
    cookiePerClick.textContent = 1
    cookiePerSec.textContent = 0
}