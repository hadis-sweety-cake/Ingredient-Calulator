
var ratio = 2
var additionalCosts = 5000
var netWeight = 1000
var netCost = 0
var numberOfProducts = 0

function inputValidation(type) {

	let price = document.getElementById('price').value
	let weight = document.getElementById('weight').value
	let used = document.getElementById('used').value

	var aCosts = document.getElementById('additionalCostsSetting').value
	var r = document.getElementById('ratioSetting').value
	var nWeight = document.getElementById('netWeightSetting').value

	var numbers = /^[0-9]*\.?[0-9]+$/

	if (type == 1)
		var inputValue = [price, weight, used]
	else
		var inputValue = [aCosts, r, nWeight]

	var check = true
	inputValue.forEach(function(item, index) {
		if (!item.match(numbers)) {
			check = false
		}
	})
	
	return check
}

function numbersPrettify(number) {
	number = parseFloat(number).toFixed(1);
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getNumberOfNodes() {
	let tbody = document.getElementById('tbody')
	return tbody.childElementCount - 1
}

function decreaseNetCost(node) {
	var price = parseFloat(node.parentNode.childNodes[0].innerText.replace(',', ''))
	var weight = parseFloat(node.parentNode.childNodes[1].innerText.replace(',', ''))
	var used = parseFloat(node.parentNode.childNodes[2].innerText.replace(',', ''))
	netCost -= used * price / weight
}

function deleteRow() {
	if (getNumberOfNodes() == 1) {
		document.getElementById('calculatorRow').style.display = 'none'
		netCost = 0
	}
	
	decreaseNetCost(this)
	numberOfProducts --
	calculatorRow()
	this.parentNode.remove()
}

function calculatorRow() {
	var finalPrice = netCost * ratio + additionalCosts


	var unitPrice = finalPrice * 1000 / netWeight
	document.getElementById('netPrice').innerText = 'قیمت فروش: ' + numbersPrettify(finalPrice)
	document.getElementById('netWeight').innerText = 'قیمت هرکیلو: ' + numbersPrettify(unitPrice)
	document.getElementById('products').innerText = 'تعداد مواد: ' + numberOfProducts
}

function settingCloseButton() {
	document.getElementById('settingMenu').style.display = 'none'
}

function openSettingMenu() {
	document.getElementById('additionalCostsSetting').value = additionalCosts
	document.getElementById('ratioSetting').value = ratio
	document.getElementById('netWeightSetting').value = netWeight
	document.getElementById('settingMenu').style.display = 'block'	
}

function submitSetting() {
	
	if (!inputValidation(2)) {
		alert('مقادیر را به درستی وارد کنید!')
	}
	else {

		var aCosts = parseFloat(document.getElementById('additionalCostsSetting').value)
		var r = parseFloat(document.getElementById('ratioSetting').value)
		var nWeight = parseFloat(document.getElementById('netWeightSetting').value)

		netWeight = nWeight
		ratio = r
		additionalCosts = aCosts
	}
	calculatorRow()
	settingCloseButton()
}

function addRow() {

	if (!inputValidation(1)) {
		alert('مقادیر را به درستی وارد کنید!')
	}
	else {

		document.getElementById('calculatorRow').style.display = 'block'

		let price = document.getElementById('price').value
		let weight = document.getElementById('weight').value
		let used = document.getElementById('used').value

		let tbody = document.getElementById('tbody')

		let tr = document.createElement('tr')
		tr.id = 'T'
		let dataInput = document.getElementById('dataInput')

		let td2 = document.createElement('td')
		td2.setAttribute('scope', 'col')
		td2.innerText = numbersPrettify(price)

		let td3 = document.createElement('td')
		td3.setAttribute('scope', 'col')
		td3.innerText = numbersPrettify(weight)

		let td4 = document.createElement('td')
		td4.setAttribute('scope', 'col')
		td4.innerText = numbersPrettify(used)

		let td5 = document.createElement('td')
		td5.setAttribute('scope', 'col')
		td5.innerText = numbersPrettify(used * price / weight)

		let td6 = document.createElement('td')
		td6.setAttribute('scope', 'col')
		td6.setAttribute('class', 'delete')
		td6.addEventListener('click', deleteRow)
		var img = document.createElement('img')
		img.className = 'deleteRow'
		img.src = './static/image/trash.png'
		td6.setAttribute('data-toggle', "tooltip")
		td6.setAttribute('title', "حذف")
		td6.appendChild(img)

		tr.appendChild(td2)
		tr.appendChild(td3)
		tr.appendChild(td4)
		tr.appendChild(td5)
		tr.appendChild(td6)

		tbody.insertBefore(tr, dataInput)

		numberOfProducts ++
		netCost += used * price / weight
		calculatorRow()
	}
}

function clearInputs() {
	document.getElementById('price').value = ''
	document.getElementById('weight').value = ''
	document.getElementById('used').value = ''

	netCost = 0
	numberOfProducts = 0
	calculatorRow()
	document.getElementById('calculatorRow').style.display = 'none'
}

function deleteAllRows() {
	var removed = 1
	let tbody = document.getElementById('tbody')

	while (removed) {
		removed = 0
		tbody.childNodes.forEach(function(item, index) {
			if (item.id == 'T') {
				item.remove()
				removed = 1
			}
		})
	}
	clearInputs()
}