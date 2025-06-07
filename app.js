import './router.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('App Initialized');

    // 공통 버튼 처리
    document.body.addEventListener('click', (e) => {
        if (e.target.matches('.global-button')) {
            alert('Global Button Clicked');
        }
    });
});
