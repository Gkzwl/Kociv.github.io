document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const scoreDisplay = document.getElementById('score');
    let selectedTiles = [];
    let score = 0;

    // 中文和英文对照表
    const wordPairs = [
        
		{ chinese: '起初', english: 'origibnally' },
		{ chinese: '方便', english: 'convenience' },
		{ chinese: '完全的', english: 'totally' },
		{ chinese: '沟通', english: 'communicate' },
		{ chinese: '普遍的', english: 'widespread' },
		{ chinese: '多功能的', english: 'multi-funciton' },
		{ chinese: '商务', english: 'commerce' },
		{ chinese: '使合并', english: 'integrate' },
		{ chinese: '互动', english: 'interaction' },
		{ chinese: '显然', english: 'apparently' },
		{ chinese: '阻塞', english: 'block' },
		{ chinese: '专注于', english: 'glue' },
		{ chinese: '访问存取', english: 'access' },
		{ chinese: '泄露', english: 'leakage' },
		{ chinese: '暗示', english: 'imply' },
		{ chinese: '害怕的', english: 'frighten' },
		{ chinese: '爵士乐', english: 'jazz,' },
		{ chinese: '复杂的', english: 'complicated,' },
		{ chinese: '保修期', english: 'cover' },
		{ chinese: '保修卡', english: 'guarantee card' },
		{ chinese: '立刻', english: 'instant' },
		{ chinese: '笔记本电脑', english: 'laptop' },
		{ chinese: '扫描', english: 'scan' },
		{ chinese: '安装', english: 'install' },
		{ chinese: '隐私', english: 'privacy' },
		{ chinese: '系统的', english: 'systematic' },
		{ chinese: '合作', english: 'collaboration' },
		{ chinese: '效率', english: 'efficency' },
		{ chinese: '解决方案', english: 'solution' },
		{ chinese: '平台', english: 'platform' },
		{ chinese: '企业', english: 'enterprise' },
		{ chinese: '操作系统', english: 'operating system' },
		{ chinese: '社交网络', english: 'social network' },
		{ chinese: '维护', english: 'maintenance' },
		{ chinese: '支付', english: 'delivery' },
		{ chinese: '安装', english: 'installation,' },
		{ chinese: '交换', english: 'exchange' },
		{ chinese: '收据', english: 'receipt' },
		{ chinese: '购买', english: 'purchase' },
		{ chinese: '合适的', english: 'suitable' },
		{ chinese: '压力', english: 'pressure' },
		{ chinese: '下载', english: 'download' },
		{ chinese: '文化', english: 'culture' },
		{ chinese: '深度', english: 'depth' },
		{ chinese: '优势', english: 'advantage' },
		{ chinese: '劣势', english: 'disadvantage' },
		{ chinese: '表达', english: 'express' },
		{ chinese: '提高', english: 'improve' },
		{ chinese: '压力', english: 'pressure' },
		 
    
    ];

    const boardSize = 8;
    const totalPairs = (boardSize * boardSize) / 2;

    // 生成游戏板
    function createBoard() {
        const tiles = [];
        for (let i = 0; i < totalPairs; i++) {
            const pair = wordPairs[i % wordPairs.length];
            tiles.push(pair.chinese); // 中文
            tiles.push(pair.english); // 英文
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
			playSound('click-sound');//播放点击音

            if (selectedTiles.length === 2) {
                setTimeout(checkMatch, 300);
            }
        }
    }

    // 检查是否匹配
    function checkMatch() {
        const [tile1, tile2] = selectedTiles;
        const text1 = tile1.textContent;
        const text2 = tile2.textContent;

        // 检查是否是中文和英文的对应关系
        if (isPair(text1, text2)) {
            tile1.style.visibility = 'hidden';
            tile2.style.visibility = 'hidden';
            score += 10;
			playSound('match-sound'); // 播放消除音效
            scoreDisplay.textContent = `得分: ${score}`;
        } else {
            tile1.classList.remove('selected');
            tile2.classList.remove('selected');
        }
        selectedTiles = []; // 清空已选中的图标
    }

    // 判断两个文本是否是中文和英文的对应关系
    function isPair(text1, text2) {
        for (const pair of wordPairs) {
            if (
                (pair.chinese === text1 && pair.english === text2) ||
                (pair.chinese === text2 && pair.english === text1)
            ) {
                return true;
            }
        }
        return false;
    }

    createBoard();
});