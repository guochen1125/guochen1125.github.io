document.addEventListener('DOMContentLoaded', function() {
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
    }

    // 解析 CSV 数据为卡片数据格式
    function parseCSV(csv) {
        const lines = csv.trim().split('\n');
        const result = [];

        lines.forEach(line => {
            const [title, content] = line.split(',');
            result.push({ title: title.trim(), content: content.trim() });
        });

        return result;
    }

    // 创建卡片并显示
    function createCards() {
        cards.forEach((cardData, index) => {
            const newCard = document.createElement('div');
            newCard.classList.add('card');
            newCard.innerHTML = `
                <h2>${cardData.title}</h2>
                <p>${cardData.content}</p>
                <div class="card-index">${index + 1}/${cards.length}</div>
            `;
            container.insertBefore(newCard, prevButton.parentElement);
        });

        // 更新 cards NodeList
        cards = document.querySelectorAll('.card');
        updateCardDisplay();
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
    prevButton.addEventListener('click', function() {
        if (currentCardIndex > 0) {
            cards[currentCardIndex].style.display = 'none';
            currentCardIndex--;
            cards[currentCardIndex].style.display = 'block';
        }
    });

    // 点击下一张按钮时触发事件
    nextButton.addEventListener('click', function() {
        if (currentCardIndex < cards.length - 1) {
            cards[currentCardIndex].style.display = 'none';
            currentCardIndex++;
            cards[currentCardIndex].style.display = 'block';
        }
    });

    // 加载并显示 CSV 文件中的卡片数据
    loadCSV();
});
