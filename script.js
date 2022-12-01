const nums = ['']
let operacao = null
let lastOp = false

const visorDiv = document.querySelector('#display-text')
const visor = document.querySelector('#text')

function num(n) {
    if (lastOp) {
        novoParagrafo()
        limpar()
        lastOp = false
    }
    if (n != '.' || nums[nums.length - 1].indexOf('.') === -1 && nums[nums.length - 1].length > 1) {
        if (nums[nums.length -1].length <= 20) {
            nums[nums.length -1] += n
        }
    } else {
        nums[nums.length -1] += '0.'
    }
    atualizar()

    console.log(nums)
    console.log(operacao)
}

function operation(op) {
    if (nums.length > 1) {
        igual()
    }
    if (nums.length === 1 && nums[0] === '' && op === '+') {
        nums[0] = '+'
    } else if (nums.length === 1 && nums[0] === '' && op === '-') {
        nums[0] = '-'
    } else {
        operacao = op
        novoParagrafo()
        nums.push('')
    }

    atualizar()
    lastOp  = false

    console.log(nums)
    console.log(operacao)
}

function pi() {
    nums[nums.length -1] = '3.14159265359'
    atualizar()
}

function igual() {
    if (nums[0] != '' && nums[1] != '' && operacao != null) {
        console.log('executado')

        novoParagrafo()
        switch(operacao) {
            case '+':
                nums.push(`${parseFloat(nums[0]) + parseFloat(nums[1])}`)
                break

            case '-':
                nums.push(`${parseFloat(nums[0]) - parseFloat(nums[1])}`)
                break

            case '×':
                nums.push(`${parseFloat(nums[0]) * parseFloat(nums[1])}`)
                break

            case '÷':
                nums.push(`${parseFloat(nums[0]) / parseFloat(nums[1])}`)
                break

            case 'yⁿ':
                nums.push(`${parseFloat(nums[0]) ** parseFloat(nums[1])}`)
                break

            case 'ⁿ√Y':
                nums.push(`${Math.pow(parseFloat(nums[0]), parseFloat(nums[1]))}`)
                break
        }
        console.log(nums)

        nums.splice(0, 2)
        lastOp = true

    } else if (nums.length > 1) {
        nums.splice(1)
    }
    operacao = null

    atualizar()

    console.log(nums)
    console.log(operacao)
}

function fatorial() {
    if (nums.length === 2) {
        if (nums[1] === '') {
            nums[1] = '0'
        }
        igual()  
        novoParagrafo()
    }
    if (nums[nums.length -1] != '') {
        let num = parseFloat(nums[nums.length -1])
        console.log(num)
        let total = num
        for (let i = num - 1; i > 1; i--) {
            total *= i
            console.log(total)
        }
        nums[nums.length -1] = `${total}`
        operacao = null
        console.log(nums)
        atualizar()
    }
}

function atualizar() {
    console.log(nums)
    console.log(operacao)

    if (nums.length === 1) {
        visor.innerHTML = nums[0]
    } else {
        visor.innerHTML = `${operacao} ${nums[1]}`
    }
}

function insertAfter(newElement, reference) {
    reference.parentNode.insertBefore(newElement, reference.nextSibling);
}

function novoParagrafo() {
    if (nums.length === 1) {
        let paragrafo = document.createElement("p")
        paragrafo.setAttribute('class', 'result')
        paragrafo.innerHTML = `${nums[0]}`
        insertAfter(paragrafo, visor)
    } else {
        let paragrafo = document.createElement("p")
        paragrafo.setAttribute('class', 'result')
        paragrafo.innerHTML = `${operacao} ${nums[1]}`
        insertAfter(paragrafo, visor)

        let linha = document.createElement('div')
        linha.setAttribute("class", "result")
        insertAfter(linha, visor)
    }
}

function limpar() {
    nums.splice(0)
    nums.push('')
    operacao = null
    let linhas = document.getElementsByClassName("result");
    for (let i = linhas.length - 1; i >= 0; i--)
    {
        linhas[i].remove()
    }
    atualizar()
}

function limparUltimo() {
    if (nums.length === 1) {
        if (nums[0] != '') {
            nums[0] = nums[0].substring(0, nums[0].length - 1)
        }
    } else if (nums.length === 2) {
        if (nums[1] === '') {
            nums.splice(1)
            operacao = null
        } else {
            nums[1] = nums[1].substring(0, nums[1].length -1)
        }
    }
    atualizar()
}

window.addEventListener('keydown', function(event) {
    let tecla = event.key.toLowerCase()
    console.log(tecla)

    if (!isNaN(tecla)) {
        num(tecla)
    }
    switch(tecla) {
        case '.':
            num('.')
            break

        case '+':
            operation('+')
            break

        case '-':
            operation('-')
            break
        
        case 'x':
        case '*':
            operation('×')
            break

        case '/':
            operation('÷')
            break

        case 'p':
            pi()
            break

        case '=':
        case 'enter':
            igual()
            break

        case 'backspace':
            limparUltimo()
            break

        case 'a':
        case 'c':
            limpar()
            break
        }
    })