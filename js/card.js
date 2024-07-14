document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.container');
    let cards = document.querySelectorAll('.card');
    let currentCardIndex = 0;

    const editButton = document.getElementById('editButton');
    const addButton = document.getElementById('addButton');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const deleteButton = document.querySelector('.deleteButton');

    // 初始显示第一张卡片，隐藏其余卡片
    cards.forEach((card, index) => {
        if (index === 0) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });

    // 点击编辑按钮时触发事件
    editButton.addEventListener('click', function() {
        const card = cards[currentCardIndex];
        let newH2Content = prompt('请输入新的标题：', card.querySelector('h2').textContent);
        if (newH2Content !== null && newH2Content.length > 20) {
            newH2Content = newH2Content.slice(0, 20);
        }
        card.querySelector('h2').textContent = newH2Content;

        let newPContent = prompt('请输入新的内容：', card.querySelector('p').textContent);
        if (newPContent !== null && newPContent.length > 120) {
            newPContent = newPContent.slice(0, 120);
        }
        card.querySelector('p').textContent = newPContent;
    });

    // 点击增加卡片按钮时触发事件
    addButton.addEventListener('click', function() {
        if (cards.length < 50) {
            const newCard = document.createElement('div');
            newCard.classList.add('card');
            newCard.innerHTML = `
                <h2>Card Title</h2>
                <p>This is a new card added dynamically.</p>
            `;
            container.insertBefore(newCard, container.firstChild); // 在第一个位置插入新卡片
            cards = document.querySelectorAll('.card'); // 更新 cards NodeList
            newCard.style.display = 'none'; // 新卡片默认隐藏
        } else {
            alert('已达到最大卡片数量限制（50张）。');
        }
    });

    // 点击删除按钮时触发事件
    deleteButton.addEventListener('click', function() {
        if (cards.length > 1) {
            container.removeChild(cards[currentCardIndex]); // 删除当前卡片
            cards = document.querySelectorAll('.card'); // 更新 cards NodeList
            if (currentCardIndex === cards.length) {
                currentCardIndex--;
            }
            cards[currentCardIndex].style.display = 'block'; // 显示前一张卡片
        } else {
            alert('不能删除，至少需要保留一张卡片。');
        }
    });

    // 点击上一张按钮时触发事件
    prevButton.addEventListener('click', function() {
        if (currentCardIndex > 0) {
            cards[currentCardIndex].style.display = 'none'; // 隐藏当前卡片
            currentCardIndex--;
            cards[currentCardIndex].style.display = 'block'; // 显示前一张卡片
        }
    });

    // 点击下一张按钮时触发事件
    nextButton.addEventListener('click', function() {
        if (currentCardIndex < cards.length - 1) {
            cards[currentCardIndex].style.display = 'none'; // 隐藏当前卡片
            currentCardIndex++;
            cards[currentCardIndex].style.display = 'block'; // 显示下一张卡片
        }
    });
});
