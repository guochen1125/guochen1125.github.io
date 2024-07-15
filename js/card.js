document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.container');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    let currentCardIndex = 0;
    let cards = []; // 存储卡片数据的数组

    // 异步加载并解析 CSV 文件
    async function loadCSV() {
        const response = await fetch('../cards_csv/test.csv'); // 替换为您的 CSV 文件路径
        const data = await response.text();
        cards = parseCSV(data);
        createCards();
        restoreBookmarkState(); // 加载保存的标记状态，确保在创建卡片后进行
    }

    // 解析 CSV 数据为卡片数据格式
    function parseCSV(csv) {
        const lines = csv.trim().split('\n');
        const result = [];

        lines.forEach(line => {
            const columns = line.split(',');
            const title = columns[0].trim();
            const content = columns.slice(1).map(col => col.trim()).join('<br>'); // 将剩余的列合并为正文段落

            result.push({ title: title, content: content, bookmarked: false });
        });

        return result;
    }

    // 在创建卡片时，为标记按钮添加点击事件处理程序
    function createCards() {
        cards.forEach((cardData, index) => {
            const newCard = document.createElement('div');
            newCard.classList.add('card');
            newCard.innerHTML = `
            <h2>${cardData.title}</h2>
            <div class="content hidden"><p>${cardData.content}</p></div>
            <div class="card-index">${index + 1}/${cards.length}</div>
            <button class="bookmark-btn ${cardData.bookmarked ? 'bookmarked' : ''}" data-index="${index}"></button>
        `;
            container.insertBefore(newCard, prevButton.parentElement);
        });

        // 更新 cards NodeList
        cards = document.querySelectorAll('.card');
        updateCardDisplay();

        // 添加点击事件监听器
        cards.forEach(card => {
            card.addEventListener('click', function () {
                const content = card.querySelector('.content');
                content.classList.toggle('hidden');
            });

            const bookmarkBtn = card.querySelector('.bookmark-btn');
            bookmarkBtn.addEventListener('click', function (event) {
                event.stopPropagation(); // 防止点击卡片时也触发该事件
                const index = parseInt(bookmarkBtn.getAttribute('data-index'));
                toggleBookmark(index);
            });
        });
    }

    // 标记或取消标记卡片
    function toggleBookmark(index) {
        cards[index].bookmarked = !cards[index].bookmarked;
        const bookmarkBtn = cards[index].querySelector('.bookmark-btn');
        bookmarkBtn.classList.toggle('bookmarked');
        saveBookmarkState(); // 保存标记状态到本地存储
    }

    // 保存标记状态到本地存储
    function saveBookmarkState() {
        const bookmarkedIndices = Array.from(cards).reduce((acc, card, index) => {
            if (card.bookmarked) {
                acc.push(index);
            }
            return acc;
        }, []);
        localStorage.setItem('bookmarkedIndices', JSON.stringify(bookmarkedIndices));
    }

    // 加载保存的标记状态
    function restoreBookmarkState() {
        const bookmarkedIndices = JSON.parse(localStorage.getItem('bookmarkedIndices')) || [];
        bookmarkedIndices.forEach(index => {
            if (index < cards.length) { // 确保索引在有效范围内
                cards[index].bookmarked = true;
                const bookmarkBtn = cards[index].querySelector('.bookmark-btn');
                bookmarkBtn.classList.add('bookmarked');
            }
        });
    }

    // 初始显示第一张卡片，隐藏其余卡片
    function updateCardDisplay() {
        cards.forEach((card, index) => {
            if (index === 0) {
                card.style.display = 'block'; // 显示第一张卡片
            } else {
                card.style.display = 'none'; // 隐藏其他卡片
            }
        });
    }

    // 点击上一张按钮时触发事件
    prevButton.addEventListener('click', function () {
        if (currentCardIndex > 0) {
            cards[currentCardIndex].style.display = 'none';
            currentCardIndex--;
            cards[currentCardIndex].style.display = 'block';
        }
    });

    // 点击下一张按钮时触发事件
    nextButton.addEventListener('click', function () {
        if (currentCardIndex < cards.length - 1) {
            cards[currentCardIndex].style.display = 'none';
            currentCardIndex++;
            cards[currentCardIndex].style.display = 'block';
        }
    });

    // 加载并显示 CSV 文件中的卡片数据
    loadCSV();
});
