function startQuiz() {
    // 1. 隱藏介紹部分
    const intro = document.getElementById('intro-wrapper');
    intro.style.transition = "opacity 0.5s ease";
    intro.style.opacity = "0";
    
    setTimeout(() => {
        intro.style.display = 'none';
        
        // 2. 顯示測驗部分
        const quiz = document.getElementById('quiz-wrapper');
        quiz.style.display = 'block';
        quiz.style.opacity = "0";
        
        // 平滑淡入效果
        setTimeout(() => {
            quiz.style.transition = "opacity 0.5s ease";
            quiz.style.opacity = "1";
        }, 10);
        
        // 3. 讓頁面滾動回頂部
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500);
}
