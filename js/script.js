// Переменные со страницы \\
const button = document.querySelector('.cookie')

const cookieCounter = document.querySelector('#cookie-counter')

const cookiePerSec = document.querySelector('#cookie-per-sec')

const cookiePerClick = document.querySelector('#cookie-per-click')

const btnsUpgrade = document.querySelector('.btns-upgrade')

const btnResetData = document.querySelector('.reset-data')

const costsUpgrades = document.querySelectorAll('.cost-upgrade')

//  Переменные со страницы //



// Локальные переменные \\

let clickSize = 1

let countCookie = 0

let countCookiePerSec = 0

let priceUpgrades = [25, 150, 50, 300]

// Локальные переменные //



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
            if (countCookie >= priceUpgrades[0]) {

                changeCookieCount(-priceUpgrades[0])

                changeUpgradePrice(priceUpgrades, 0)

                changeCookiePerClick(1)
            } else {
                alert('Недостаточно печенек для покупки')
            }
        }

        // Кнопка +5 Печенька за клик // 150
        if (e.target.getAttribute('data-click-5') === '') {
            if (countCookie >= priceUpgrades[1]) {

                changeCookieCount(-priceUpgrades[1])

                changeUpgradePrice(priceUpgrades, 1)

                changeCookiePerClick(5)
            } else {
                alert('Недостаточно печенек для покупки')
            }
        }

        // Кнопка +1 Печенька за сек // 50

        if (e.target.getAttribute('data-sec-1') === '') {
            if (countCookie >= priceUpgrades[2]) {

                changeCookieCount(-priceUpgrades[2])

                changeUpgradePrice(priceUpgrades, 2)

                changeCookiePerSec(1)

            } else {
                alert('Недостаточно печенек для покупки')
            }
        }

        // Кнопка +5 Печенька за клик // 300
        if (e.target.getAttribute('data-sec-5') === '') {
            if (countCookie >= priceUpgrades[3]) {

                changeCookieCount(-priceUpgrades[3])

                changeUpgradePrice(priceUpgrades, 3)

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
    localStorage.setItem('CountCookie', countCookie)
}

function setCookieCount(count) {
    countCookie = count
    cookieCounter.textContent = countCookie
    localStorage.setItem('CountCookie', countCookie)
}

function changeCookiePerClick(count) {
    clickSize = clickSize + count
    cookiePerClick.textContent = clickSize
    localStorage.setItem('CookiePerClick', clickSize)
}
function changeCookiePerSec(count) {
    countCookiePerSec += count
    cookiePerSec.textContent = countCookiePerSec
    localStorage.setItem('CookiePerSec', countCookiePerSec)
}


function perSecond() {
    clickBtn(countCookiePerSec)
}

function getValuesLocalStorage() {
    if (localStorage.getItem('CountCookie')) {
        setCookieCount(+localStorage.getItem('CountCookie'))
    }
    if (localStorage.getItem('CookiePerClick')) {
        clickSize = +localStorage.getItem('CookiePerClick')
    }
    if (localStorage.getItem('CookiePerSec')) {
        countCookiePerSec = +localStorage.getItem('CookiePerSec')
        cookiePerSec.textContent = countCookiePerSec
    }
}

function changeUpgradePrice(list, index) {
    list[index] *= 2
    costsUpgrades[index].textContent = list[index]
}

function resetData() {
    clickSize = 1
    countCookie = 0
    countCookiePerSec = 0
    localStorage.clear()
    cookiePerClick.textContent = 1
    cookiePerSec.textContent = 0
}