let currentQuestion = 1;
const totalQuestions = 3;
const answers = {};

// 皮膚類型的描述
const skinTypeDescriptions = {
    "油性": {
        title: "油性皮膚",
        description: `
            <strong>特徵:</strong>
            <ul>
                <li>皮膚油脂分泌旺盛</li>
                <li>毛孔粗大明顯</li>
                <li>容易出現粉刺和痘痘</li>
                <li>看起來容易發亮</li>
            </ul>
            <strong>護理建議:</strong>
            <ul>
                <li>選擇控油、清爽型的護膚品</li>
                <li>每週進行1-2次深層清潔面膜</li>
                <li>使用含有水楊酸或果酸的爽膚水</li>
                <li>定期去角質，保持毛孔暢通</li>
                <li>使用無油或低油脂的保濕產品</li>
            </ul>
        `
    },
    "乾性": {
        title: "乾性皮膚",
        description: `
            <strong>特徵:</strong>
            <ul>
                <li>皮膚容易感到緊繃</li>
                <li>毛孔細小不明顯</li>
                <li>容易出現乾紅和脫皮</li>
                <li>皮膚容易敏感</li>
            </ul>
            <strong>護理建議:</strong>
            <ul>
                <li>選擇滋潤、保濕型的護膚品</li>
                <li>使用溫和的潔面產品</li>
                <li>定期使用保濕面膜，每週2-3次</li>
                <li>加強保濕爽膚水和精華液</li>
                <li>使用富含油脂的乳液或精油</li>
            </ul>
        `
    },
    "混合": {
        title: "混合性皮膚",
        description: `
            <strong>特徵:</strong>
            <ul>
                <li>T字部位（額頭、鼻子、下巴）容易出油</li>
                <li>兩頰和眼睛周圍比較乾燥</li>
                <li>毛孔大小不一</li>
                <li>需要分區護理</li>
            </ul>
            <strong>護理建議:</strong>
            <ul>
                <li>分區護理很重要</li>
                <li>T字部位使用清爽型產品</li>
                <li>兩頰使用保濕型產品</li>
                <li>選擇質地清爽但保濕足夠的產品</li>
                <li>定期做針對性的護理</li>
            </ul>
        `
    },
    "中性": {
        title: "中性皮膚",
        description: `
            <strong>特徵:</strong>
            <ul>
                <li>油水平衡，皮膚狀態穩定</li>
                <li>毛孔大小均勻正常</li>
                <li>很少出現皮膚問題</li>
                <li>膚色均勻透亮</li>
            </ul>
            <strong>護理建議:</strong>
            <ul>
                <li>使用溫和、均衡的護膚品</li>
                <li>定期清潔和保濕即可</li>
                <li>使用基礎護膚三部曲：潔面、爽膚水、乳液</li>
                <li>定期做保濕面膜維持膚質</li>
                <li>注意防曬保護</li>
            </ul>
        `
    }
};

function showQuestion(questionNumber) {
    // 隱藏所有問題
    const questionBlocks = document.querySelectorAll('.question-block');
    questionBlocks.forEach(block => {
        block.classList.remove('active');
    });

    // 顯示當前問題
    const activeQuestion = document.querySelector(`[data-question="${questionNumber}"]`);
    if (activeQuestion) {
        activeQuestion.classList.add('active');
    }

    // 更新進度
    document.getElementById('progress').textContent = `${questionNumber} / ${totalQuestions}`;

    // 更新按鈕狀態
    updateButtons();

    // 還原上次選擇的答案
    restoreAnswer(questionNumber);
}

function updateButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');

    prevBtn.disabled = currentQuestion === 1;

    if (currentQuestion === totalQuestions) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'block';
    } else {
        nextBtn.style.display = 'block';
        submitBtn.style.display = 'none';
    }
}

function nextQuestion() {
    if (saveCurrentAnswer()) {
        if (currentQuestion < totalQuestions) {
            currentQuestion++;
            showQuestion(currentQuestion);
            window.scrollTo(0, 0);
        }
    }
}

function previousQuestion() {
    if (currentQuestion > 1) {
        saveCurrentAnswer();
        currentQuestion--;
        showQuestion(currentQuestion);
        window.scrollTo(0, 0);
    }
}

function saveCurrentAnswer() {
    const selected = document.querySelector(`input[name="question${currentQuestion}"]:checked`);
    if (!selected) {
        alert('請選擇一個答案再繼續');
        return false;
    }

    answers[currentQuestion] = {
        value: selected.value,
        type: selected.getAttribute('data-type')
    };

    return true;
}

function restoreAnswer(questionNumber) {
    if (answers[questionNumber]) {
        const radio = document.querySelector(`input[name="question${questionNumber}"][value="${answers[questionNumber].value}"]`);
        if (radio) {
            radio.checked = true;
        }
    }
}

function submitQuiz() {
    if (!saveCurrentAnswer()) {
        return;
    }

    // 計算皮膚類型
    const skinType = calculateSkinType();

    // 顯示結果
    showResult(skinType);
}

function calculateSkinType() {
    const typeCount = {};

    for (let i = 1; i <= totalQuestions; i++) {
        const type = answers[i].type;
        typeCount[type] = (typeCount[type] || 0) + 1;
    }

    // 找出出現次數最多的類型
    let maxType = '中性';
    let maxCount = 0;

    for (const [type, count] of Object.entries(typeCount)) {
        if (count > maxCount) {
            maxCount = count;
            maxType = type;
        }
    }

    return maxType;
}

function showResult(skinType) {
    const quizContent = document.getElementById('quizContent');
    const resultSection = document.getElementById('resultSection');
    const navigation = document.querySelector('.navigation');

    quizContent.style.display = 'none';
    resultSection.classList.add('show');
    navigation.style.display = 'none';

    const resultType = document.getElementById('resultType');
    const resultDescription = document.getElementById('resultDescription');

    const description = skinTypeDescriptions[skinType];
    resultType.textContent = description.title;
    resultDescription.innerHTML = description.description;
}

function resetQuiz() {
    // 重置狀態
    currentQuestion = 1;
    for (let key in answers) {
        delete answers[key];
    }

    // 清除所有選擇
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.checked = false;
    });

    // 隱藏結果，顯示問題
    document.getElementById('quizContent').style.display = 'block';
    document.getElementById('resultSection').classList.remove('show');
    document.querySelector('.navigation').style.display = 'flex';

    // 顯示第一題
    showQuestion(1);
    window.scrollTo(0, 0);
}

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    showQuestion(1);

    // 添加單選選項的快速選擇功能
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', function() {
            const radio = this.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
            }
        });
    });
});