document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const scoreDisplay = document.getElementById('score');
    let selectedTiles = [];
    let score = 0;

    const icons = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const boardSize = 8;
    const totalPairs = (boardSize * boardSize) / 2;

    // 生成游戏板
    function createBoard() {
        const tiles = [];
        for (let i = 0; i < totalPairs; i++) {
            tiles.push(icons[i % icons.length]);
            tiles.push(icons[i % icons.length]);
        }
        tiles.sort(() => Math.random() - 0.5);

        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                const tile = document.createElement('div');
                tile.classList.add('tile');
                tile.dataset.row = i;
                tile.dataset.col = j;
                tile.textContent = tiles[i * boardSize + j];
                tile.addEventListener('click', () => selectTile(tile));
                board.appendChild(tile);
            }
        }
    }
	
	
	
	 function playSound(id) {
        const sound = document.getElementById(id);
        sound.currentTime = 0;
        sound.play();
    }
	

    // 处理点击事件
    function selectTile(tile) {
        if (selectedTiles.length < 2 && !tile.classList.contains('selected')) {
            tile.classList.add('selected');
            selectedTiles.push(tile);
			playSound('click-sound');//播放点击音效
			
            if (selectedTiles.length === 2) {
                setTimeout(checkMatch, 300);
            }
        }
    }

    // 检查是否匹配
    function checkMatch() {
        const [tile1, tile2] = selectedTiles;
        if (tile1.textContent === tile2.textContent) {
            tile1.style.visibility = 'hidden';
            tile2.style.visibility = 'hidden';
            score += 10;
			playSound('match-sound'); // 播放消除音效
            scoreDisplay.textContent = `得分: ${score}`;
        } else {
            tile1.classList.remove('selected');
            tile2.classList.remove('selected');
        }
        selectedTiles = [];
    }
	createBoard();
	
});
