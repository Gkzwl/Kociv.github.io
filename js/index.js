 document.getElementById('load-csv').addEventListener('click', () => {
            const file = document.getElementById('csv-file').files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const content = event.target.result;
                    const encodedContent = encodeURIComponent(content); // 编码词库数据
                    window.location.href = `game.html?words=${encodedContent}`; // 跳转到游戏页面
                };
                reader.readAsText(file);
            } else {
                alert('请先选择一个 CSV 文件！');
            }
			});