// Переменные со страницы \\
const button = document.querySelector('.cookie')

const cookieCounter = document.querySelector('#cookie-counter')
const cookiePerSecCounter = document.querySelector('#cookie-per-sec')
const cookiePerClickCounter = document.querySelector('#cookie-per-click')

const btnResetData = document.querySelector('.reset-data')


const btnsUpgrade = document.querySelectorAll('.button-upgrade')

const countsUserValue = document.querySelectorAll('user-value-upgrade')

const pricesToUserValue = document.querySelectorAll('.price-user')
const pricesToOne = document.querySelectorAll('.price-1')

const btnsBuy = document.querySelectorAll('.button-buy')

const tabsCounts = document.querySelectorAll('.tab-count')

//  Переменные со страницы //



// Локальные переменные \\

let clickSize = 1

let countCookie = 0

let countCookiePerSec = 0

let defaultPriceUpgrades = [25, 150, 50, 300]

// Локальные переменные //



getValuesLocalStorage()

cookiePerClickCounter.textContent = clickSize



// Кнопка печенька
button.addEventListener('click', () => {
    clickBtn(clickSize)
})

const perSecondInterval = setInterval(perSecond, 1000)


// Кнопки апгрейда

console.log(btnsUpgrade[0])
btnsUpgrade[0].addEventListener('click', (e) => {
    if (e.target.classList.contains('tab-count')) {
        removeActiveClasses()
        e.target.classList.add('active')
    }
    }
)




// btnsUpgrade.addEventListener('click', (e) => {
//     if (e.target.tagName === 'BUTTON') {

        // // Кнопка +1 Печенька за клик // 25
        // if (e.target.getAttribute('data-click-1') === '') {
        //     if (countCookie >= defaultPriceUpgrades[0]) {

        //         changeCookieCount(-defaultPriceUpgrades[0])

        //         changeUpgradePrice(defaultPriceUpgrades, 0)

        //         changeCookiePerClick(1)
        //     } else {
        //         alert('Недостаточно печенек для покупки')
        //     }
        // }

        // // Кнопка +5 Печенька за клик // 150
        // if (e.target.getAttribute('data-click-5') === '') {
        //     if (countCookie >= defaultPriceUpgrades[1]) {

        //         changeCookieCount(-defaultPriceUpgrades[1])

        //         changeUpgradePrice(defaultPriceUpgrades, 1)

        //         changeCookiePerClick(5)
        //     } else {
        //         alert('Недостаточно печенек для покупки')
        //     }
        // }

        // // Кнопка +1 Печенька за сек // 50

        // if (e.target.getAttribute('data-sec-1') === '') {
        //     if (countCookie >= defaultPriceUpgrades[2]) {

        //         changeCookieCount(-defaultPriceUpgrades[2])

        //         changeUpgradePrice(defaultPriceUpgrades, 2)

        //         changeCookiePerSec(1)

        //     } else {
        //         alert('Недостаточно печенек для покупки')
        //     }
        // }

        // // Кнопка +5 Печенька за клик // 300
        // if (e.target.getAttribute('data-sec-5') === '') {
        //     if (countCookie >= defaultPriceUpgrades[3]) {

        //         changeCookieCount(-defaultPriceUpgrades[3])

        //         changeUpgradePrice(defaultPriceUpgrades, 3)

        //         changeCookiePerSec(5)

        //     } else {
        //         alert('Недостаточно печенек для покупки')
        //     }
        // }
//     }
// })

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
    cookiePerClickCounter.textContent = clickSize
    localStorage.setItem('CookiePerClick', clickSize)
}
function changeCookiePerSec(count) {
    countCookiePerSec += count
    cookiePerSecCounter.textContent = countCookiePerSec
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
        cookiePerSecCounter.textContent = countCookiePerSec
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
    cookiePerClickCounter.textContent = 1
    cookiePerSecCounter.textContent = 0
}

function removeActiveClasses(tabs) {
    tabs.forEach(tab => tab.classList.remove('active'));
}