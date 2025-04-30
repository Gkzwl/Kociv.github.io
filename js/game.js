// 从 URL 参数中获取词库数据
        const urlParams = new URLSearchParams(window.location.search);
        const encodedWords = urlParams.get('words');
        if (!encodedWords) {
            alert('词库数据未找到，请返回开始页面重新上传！');
            window.location.href = 'index.html'; // 返回开始页面
        }
 
        // 解码词库数据
        const content = decodeURIComponent(encodedWords);
        const wordPairs = parseCsv(content); // 解析 CSV 文件
 
        // 游戏逻辑
        const board = document.getElementById('game-board');
        const scoreDisplay = document.getElementById('score');
        const timerDisplay = document.getElementById('timer');
        const restartGameButton = document.getElementById('restart-game');
        let selectedTiles = [];
        let score = 0;
        const boardSize = 8;
        const totalPairs = (boardSize * boardSize) / 2;
        const maxScore = totalPairs * 10; // 最高得分
        let timeLeft = 3 * 60; // 10分钟转换为秒
        let timer;
 
        // 解析 CSV 文件
        function parseCsv(content) {
            const lines = content.split('\n');
            const pairs = [];
            for (let i = 1; i < lines.length; i++) { // 跳过标题行
                const [chinese, english] = lines[i].split(',');
                if (chinese && english) {
                    pairs.push({ chinese: chinese.trim(), english: english.trim() });
                }
            }
            return pairs;
        }
 
        // 生成游戏板
        function createBoard() {
            board.innerHTML = ''; // 清空游戏板
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
 
            // 显示游戏板动画
            setTimeout(() => {
                board.classList.add('show'); // 添加 show 类以触发动画
            }, 100);
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
                playSound('click-sound'); // 播放点击音
 
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
                updateScoreDisplay(); // 更新得分显示
 
                // 检查是否所有配对都被消除
                if (checkAllPairsEliminated()) {
                    clearInterval(timer); // 清除计时器
                    const percentageScore = Math.floor((score / maxScore) * 100);
                    window.location.href = `game-over.html?score=${percentageScore}`; // 跳转到游戏结束页面
                }
            } else {
                tile1.classList.remove('selected');
                tile2.classList.remove('selected');
            }
            selectedTiles = []; // 清空已选中的图标
        }
 
        // 更新得分显示
        function updateScoreDisplay() {
            const percentageScore = Math.floor((score / maxScore) * 100);
            scoreDisplay.textContent = `得分: ${percentageScore}`;
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
 
        // 检查所有配对是否被消除
        function checkAllPairsEliminated() {
            const tiles = document.querySelectorAll('.tile');
            let visibleTiles = 0;
            tiles.forEach(tile => {
                if (tile.style.visibility !== 'hidden') {
                    visibleTiles++;
                }
            });
            return visibleTiles === 0; // 如果没有可见的瓷砖，说明所有配对都被消除
        }
 
        // 计时器函数
        function startTimer() {
            timer = setInterval(() => {
                timeLeft--;
                const minutes = Math.floor(timeLeft / 60);
                const seconds = timeLeft % 60;
                timerDisplay.textContent = `时间: ${minutes}:${seconds < 3 ? '0' : ''}${seconds}`;
 
                if (timeLeft <= 0) {
                    clearInterval(timer);
                    const percentageScore = Math.floor((score / maxScore) * 100);
                    window.location.href = `game-over.html?score=${percentageScore}`; // 跳转到游戏结束页面
                }
            }, 1000);
        }
 
        // 重新开始游戏
        restartGameButton.addEventListener('click', () => {
            window.location.href = 'index.html'; // 返回开始页面
        });
 
        // 初始化游戏板
        createBoard(); // 初始化游戏板
        startTimer(); // 启动计时器