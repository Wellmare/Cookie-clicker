// Главная кнопка Печенька
const button = document.querySelector('.cookie')

// Главный счетчик печенек
const cookieCounter = document.querySelector('#cookie-counter')

// Счетчики с количеством куки за клик/сек
const cookiePerClickCounter = document.querySelector('#cookie-per-click')
const cookiePerSecCounter = document.querySelector('#cookie-per-sec')

// Кнопка ресета
const btnResetData = document.querySelector('.reset-data')

// Карточки с покупкой куки за клик/сек
const cardsWithBuyUpgrade = document.querySelectorAll('.button-upgrade')

// Количества Апгрейдов для покупки назначенное пользователем
const countsUpgradesPerUser = document.querySelectorAll('.user-value-upgrade')

// Цены Апгрейдов для покупки от пользователя
const pricesUpgradesPerUser = document.querySelectorAll('.price-user')

// Цены на 1 апгрейд
const pricesPerOneUpgrade = document.querySelectorAll('.price-1')

// Кнопки покупки апгрейдов
const btnsBuyUpgrade = document.querySelectorAll('.button-buy')

// Табы у карточки с покупкой за клик
const tabsCountPerClick = document.querySelectorAll('.tab-count-per-click')

// Табы у карточки с покупкой за секунду
const tabsCountPerSec = document.querySelectorAll('.tab-count-per-sec')

// Локальные переменные

let countCookie = 0
let clickSize = 1
let countCookiePerSec = 0
let priceUpgrades = [25, 50]

// Получение значений из Локального хранилища
getValuesLocalStorage()

// Изменение количества апгрейдов за раз
// Per click
changeCountUpgradeAtATime(
    countsUpgradesPerUser[0],
    pricesUpgradesPerUser[0],
    1,
    priceUpgrades[0]
)
// Per sec
changeCountUpgradeAtATime(
    countsUpgradesPerUser[1],
    pricesUpgradesPerUser[1],
    1,
    priceUpgrades[1]
)


// Добавление куки каждую секунду
const perSecondInterval = setInterval(() => {
    changeCookieCount(countCookiePerSec)
}, 1000)

// Нажатие на Кнопку печеньку
button.addEventListener('click', () => {
    changeCookieCount(clickSize)
})

// Нажатие на кнопку ресета
btnResetData.addEventListener('click', resetData)

// Нажатия на кнопки апгрейда

let countUpgradesForClick
cardsWithBuyUpgrade[0].addEventListener('click', (e) => {

        let countUpgrades
        let costOneUpgrade = priceUpgrades[0]

        // Если нажали на таб, то
        if (e.target.classList.contains('tab-count')) {

            if (e.target.textContent === 'MAX') {
                if (countCookie >= costOneUpgrade) {
                    countUpgradesForClick = 1
                    hideAllTab(tabsCountPerClick)
                    e.target.classList.add('active')
                    maxCountUpgrade(1, priceUpgrades[0], 0)
                } else {
                    alert('Недостаточно печенек для покупки')
                }
            } else {
                hideAllTab(tabsCountPerClick)
                e.target.classList.add('active')

                countUpgrades = +e.target.textContent
                costOneUpgrade = priceUpgrades[0]

                finalPrice = countUpgrades * costOneUpgrade
                console.log(countUpgrades, costOneUpgrade, finalPrice)

                changeCountUpgradeAtATime(
                    countsUpgradesPerUser[0],
                    pricesUpgradesPerUser[0],
                    countUpgrades,
                    costOneUpgrade
                )
            }
        }
        if (e.target.classList.contains('button-buy')) {
            if (countCookie >= +countsUpgradesPerUser[0].textContent * costOneUpgrade) {
                countUpgrades = +countsUpgradesPerUser[0].textContent
                changeCookieCount(-+countsUpgradesPerUser[0].textContent * costOneUpgrade)
                changeCookiePerClick(countUpgrades)

                costOneUpgrade *= 2
                changeCookiePerOneUpgrade(pricesPerOneUpgrade[0], costOneUpgrade, 0)

                changeCountUpgradeAtATime(
                    countsUpgradesPerUser[0],
                    pricesUpgradesPerUser[0],
                    countUpgrades,
                    costOneUpgrade
                )
                localStorage.setItem('PriceToOneClick', priceUpgrades[0])
            } else {
                alert('Недостаточно печенек для покупки')
            }
        }
    }
)


let countUpgradesForSec
cardsWithBuyUpgrade[1].addEventListener('click', (e) => {

    let countUpgrades
    let costOneUpgrade = priceUpgrades[1]

    // Если нажали на таб, то
    if (e.target.classList.contains('tab-count')) {

        if (e.target.textContent === 'MAX') {
            if (countCookie >= costOneUpgrade) {
                countUpgradesForSec = 1
                hideAllTab(tabsCountPerSec)
                e.target.classList.add('active')
                maxCountUpgrade(1, priceUpgrades[1], 1)
            } else {
                alert('Недостаточно печенек для покупки')
            }
        } else {
            hideAllTab(tabsCountPerSec)
            e.target.classList.add('active')

            countUpgrades = +e.target.textContent
            costOneUpgrade = priceUpgrades[1]

            finalPrice = countUpgrades * costOneUpgrade
            console.log(countUpgrades, costOneUpgrade, finalPrice)

            changeCountUpgradeAtATime(
                countsUpgradesPerUser[1],
                pricesUpgradesPerUser[1],
                countUpgrades,
                costOneUpgrade
            )
        }
    }
    if (e.target.classList.contains('button-buy')) {
        if (countCookie >= +countsUpgradesPerUser[1].textContent * costOneUpgrade) {
            countUpgrades = +countsUpgradesPerUser[1].textContent
            changeCookieCount(-+countsUpgradesPerUser[1].textContent * costOneUpgrade)
            changeCookiePerSec(countUpgrades)

            costOneUpgrade *= 2
            changeCookiePerOneUpgrade(pricesPerOneUpgrade[1], costOneUpgrade, 1)

            changeCountUpgradeAtATime(
                countsUpgradesPerUser[1],
                pricesUpgradesPerUser[1],
                countUpgrades,
                costOneUpgrade
            )
            localStorage.setItem('PriceToOneSec', priceUpgrades[1])
        } else {
            alert('Недостаточно печенек для покупки')
        }
    }
})

// * ФУНКЦИИ

function getValuesLocalStorage() {
    if (localStorage.getItem('CountCookie')) {
        setCookieCount(+localStorage.getItem('CountCookie'))
    }
    if (localStorage.getItem('CookiePerClick')) {
        clickSize = +localStorage.getItem('CookiePerClick')
        cookiePerClickCounter.textContent = clickSize
    }
    if (localStorage.getItem('CookiePerSec')) {
        countCookiePerSec = +localStorage.getItem('CookiePerSec')
        cookiePerSecCounter.textContent = countCookiePerSec
    }
    if (localStorage.getItem('PriceToOneClick')) {
        priceUpgrades[0] = localStorage.getItem('PriceToOneClick')
        changeCookiePerOneUpgrade(pricesPerOneUpgrade[0], priceUpgrades[0], 0)
    }
    if (localStorage.getItem('PriceToOneSec')) {
        priceUpgrades[1] = localStorage.getItem('PriceToOneSec')
        changeCookiePerOneUpgrade(pricesPerOneUpgrade[1], priceUpgrades[1], 1)
    }
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
    clickSize += count
    cookiePerClickCounter.textContent = clickSize
    localStorage.setItem('CookiePerClick', clickSize)
}

function changeCookiePerSec(count) {
    countCookiePerSec += count
    cookiePerSecCounter.textContent = countCookiePerSec
    localStorage.setItem('CookiePerSec', countCookiePerSec)
}

function resetData() {
    clickSize = 1
    countCookie = 0
    countCookiePerSec = 0
    localStorage.clear()
    cookiePerClickCounter.textContent = 1
    cookiePerSecCounter.textContent = 0
}

function hideAllTab(tabs) {
    tabs.forEach((tab) => tab.classList.remove('active'))
}

function changeCountUpgradeAtATime(
    placeCountEl,
    placePriceEl,
    count,
    priceToOne
) {
    placeCountEl.textContent = count
    placePriceEl.textContent = count * priceToOne
}

function changeCookiePerOneUpgrade(place, value, index) {
    place.textContent = value
    priceUpgrades[index] = value
}

function maxCountUpgrade(countUpgrades, costOneUpgrade, index) {
    while (countUpgrades * costOneUpgrade <= countCookie) {
        if ((countUpgrades + 1) * costOneUpgrade > countCookie) {
            changeCountUpgradeAtATime(
                countsUpgradesPerUser[index],
                pricesUpgradesPerUser[index],
                countUpgrades,
                costOneUpgrade
            )
            break
        } else {
            countUpgrades++
        }
    }
}