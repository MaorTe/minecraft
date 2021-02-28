// --------------------- Landing page ----------------------
const landingPage = document.querySelector('#landing-page');
const startBtn = document.querySelector('.start-btn');
const restartBtn = document.querySelector('.restart-btn');
const resetBtn = document.querySelector('.reset-btn');

startBtn.addEventListener('click', startGame);
function startGame() {
	if (world.childElementCount === 0) {
		console.log(world.childElementCount);
		createMatrix();
	}
	landingPage.classList.add('hidden');
	resetWorld();
	world.addEventListener('click', handleclick);
}

// add event listener to restart the game button to go back to the landing page
restartBtn.addEventListener('click', restart);
function restart() {
	console.log(world.childElementCount);
	if (world.childElementCount === 0) {
		createMatrix();
	}
	landingPage.classList.remove('hidden');
	resetWorld();
	world.addEventListener('click', handleclick);
}

// --------------------- World Creation ----------------------
let worldMatrix = [];
let worldSize = 20;
// sync world size to css
document.documentElement.style.setProperty('--world-size', worldSize);
// world container
const world = document.querySelector('.world');

function createMatrix() {
	for (let row = 0; row < worldSize; row++) {
		worldMatrix[row] = [];
		for (let col = 0; col < worldSize; col++) {
			worldMatrix[row][col] = document.createElement('div');
			worldMatrix[row][col].setAttribute('data-row', row);
			worldMatrix[row][col].setAttribute('data-col', col);
			worldMatrix[row][col].classList.add('tile');
			// append to the world container:
			world.appendChild(worldMatrix[row][col]);
		}
	}
}

function createWorld() {
	worldShape = [
		[0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0],
		[0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 3, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0],
		[0, 3, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2],
		[5, 5, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0],
		[6, 6, 5, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0],
		[6, 6, 5, 0, 0, 0, 0, 3, 0, 5, 5, 0, 0, 0, 0, 0, 0, 3, 0, 0],
		[4, 4, 5, 5, 0, 0, 0, 3, 5, 5, 5, 5, 0, 0, 0, 0, 0, 3, 0, 0],
		[4, 4, 6, 5, 0, 0, 0, 5, 5, 4, 4, 5, 5, 0, 0, 0, 0, 3, 0, 0],
		[6, 6, 6, 5, 5, 5, 5, 5, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5],
		[6, 6, 6, 6, 6, 6, 6, 6, 4, 4, 4, 4, 6, 6, 6, 6, 6, 6, 6, 6],
		[6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
		[6, 6, 6, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 6, 6, 6, 6, 6, 6],
		[6, 6, 6, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 6, 6, 6, 6, 6, 6],
		[6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
	];

	for (let row = 0; row < worldSize; row++) {
		for (let col = 0; col < worldSize; col++) {
			switch (worldShape[row][col]) {
				case 0:
					worldMatrix[row][col].setAttribute('data-type', 'sky');
					break;
				case 1:
					worldMatrix[row][col].setAttribute('data-type', 'cloud');
					break;
				case 2:
					worldMatrix[row][col].setAttribute('data-type', 'leaves');
					break;
				case 3:
					worldMatrix[row][col].setAttribute('data-type', 'trunk');
					break;
				case 4:
					worldMatrix[row][col].setAttribute('data-type', 'rock');
					break;
				case 5:
					worldMatrix[row][col].setAttribute('data-type', 'grass');
					break;
				case 6:
					worldMatrix[row][col].setAttribute('data-type', 'dirt');
					break;
				default:
					break;
			}
		}
	}
}
// -------------------------------------------
function resetWorld() {
	createWorld();
	resetInventoryCount();
}

function resetInventoryCount() {
	obj = {};
	document
		.querySelectorAll('.inventory-item > span')
		.forEach((el) => (el.textContent = 0));
}
// -------------------------------------------

function MineableByTool(tool, tile) {
	if (
		(tool === 'shovel' && (tile === 'grass' || tile === 'dirt')) ||
		(tool === 'axe' && (tile === 'trunk' || tile === 'leaves')) ||
		(tool === 'pickaxe' && tile === 'rock')
	) {
		return true;
	} else if (
		tile === 'cloud' &&
		(tool === 'shovel' || tool === 'axe' || tool === 'pickaxe')
	)
		return true;
}
let obj = {};
function handleclick(e) {
	let tileSelected = e.target.getAttribute('data-type');
	if (document.querySelector('.selected')) {
		let selectedTool = document.querySelector('.selected');
		// if mineable ,increase
		if (MineableByTool(selectedTool.getAttribute('data-type'), tileSelected)) {
			if (tileSelected && tileSelected !== 'sky') {
				obj[tileSelected] = obj[tileSelected] + 1 || 1;
				const inventoryBlocks = document.querySelector(
					`[data-type = '${tileSelected}'] > span`
				);
				inventoryBlocks.textContent = obj[tileSelected];
			}
			tileSelected = e.target.setAttribute('data-type', 'sky');
		}
		PlaceTile(selectedTool, tileSelected, e);
	}
}

// using item
const inventory = document.querySelector('.inventory');
function PlaceTile(selectedTool, tileSelected, e) {
	if (
		selectedTool.classList.contains('inventory-item') &&
		tileSelected === 'sky'
	) {
		let tileToPlace = selectedTool.getAttribute('data-type');
		const inventoryBlockItems = document.querySelector(
			`[data-type = '${tileToPlace}'] > span`
		);
		if (tileSelected && inventoryBlockItems.textContent > '0') {
			inventoryBlockItems.style.userSelect = 'none';
			inventoryBlockItems.textContent = --obj[tileToPlace];
			tileSelected = e.target.setAttribute(
				'data-type',
				selectedTool.getAttribute('data-type')
			);
		}
	}
}

// selecting item from inventory
const inventoryItems = document.querySelector('.toolbar');
inventoryItems.addEventListener('click', SelectItemFromInventory);
function SelectItemFromInventory(e) {
	console.log('aaaa');
	const inventoryItem = document.querySelectorAll('.toolbar [data-type]');
	// console.log(inventoryItem);
	// if (e.target.classList.contains('toolbar')) {
	if (e.target.classList.contains('selected')) {
		e.target.classList.remove('selected');
	} else {
		inventoryItem.forEach((el) => el.classList.remove('selected'));
		e.target.classList.add('selected');
	}
	// }
}

// reset the game button
resetBtn.addEventListener('click', resetWorld);
