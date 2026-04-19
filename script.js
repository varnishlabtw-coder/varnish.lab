// 1. 頁面切換邏輯
function startQuiz() {
    const intro = document.getElementById('intro-wrapper');
    const quiz = document.getElementById('quiz-wrapper');

    // 淡出介紹
    intro.style.transition = "opacity 0.5s ease";
    intro.style.opacity = "0";

    setTimeout(() => {
        intro.style.display = 'none';
        quiz.style.display = 'block';
        quiz.style.opacity = "0";
        
        // 滾動回頂部
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // 淡入測驗
        setTimeout(() => {
            quiz.style.transition = "opacity 0.5s ease";
            quiz.style.opacity = "1";
            initQuiz(); // 初始化測驗題目
        }, 50);
    }, 500);
}

// 2. 測驗題目資料 (範例)
const questions = [
    {
        question: "洗完臉後 30 分鐘，不擦任何保養品，您的皮膚感覺？",
        options: [
            { text: "感到緊繃、甚至有些脫皮", type: "dry" },
            { text: "非常舒適，沒有不適感", type: "normal" },
            { text: "T字部位開始泛油光", type: "combination" },
            { text: "全臉都感到油膩", type: "oily" }
        ]
    }
    // 您可以在此處加入更多題目...
];

function initQuiz() {
    const container = document.getElementById('question-container');
    // 這裡放入您原本 index.html 的題目產生邏輯
    // 以下為簡易範例
    let html = "";
    questions.forEach((q, index) => {
        html += `<div class="question">
            <p>${q.question}</p>
            ${q.options.map(opt => `<button class="option-btn">${opt.text}</button>`).join('')}
        </div>`;
    });
    container.innerHTML = html;
}
