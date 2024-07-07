function openModal(modalID) {
    document.getElementById(modalID).classList.remove('opacity-0');
    document.getElementById(modalID).classList.add('opacity-100');
    document.getElementById(modalID).classList.remove('pointer-events-none');
    document.body.classList.add('modal-active');
}

function closeModal(modalID) {
    document.getElementById(modalID).classList.remove('opacity-100');
    document.getElementById(modalID).classList.add('opacity-0');
    document.getElementById(modalID).classList.add('pointer-events-none');
    document.body.classList.remove('modal-active');
}

let slideIndex = 1;
let slideInterval;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
    resetSlideInterval();
}

function currentSlide(n) {
    showSlides(slideIndex = n);
    resetSlideInterval();
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let thumbnails = document.getElementsByClassName("thumbnail");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < thumbnails.length; i++) {
        thumbnails[i].className = thumbnails[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    thumbnails[slideIndex-1].className += " active";
}
function startSlideShow() {
    slideInterval = setInterval(function() {
        slideIndex++;
        showSlides();
    }, 5000);
}

function resetSlideInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
        plusSlides(1);
    }, 5000);
}

slideInterval = setInterval(() => {
    plusSlides(1);
}, 5000);
showSlides();
startSlideShow();

document.getElementById('commentForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const commentText = document.getElementById('commentText').value;
    if (commentText.trim() === '') {
        alert('コメントを入力してください。');
        return;
    }
    const commentList = document.getElementById('commentsList');
    const newComment = document.createElement('div');
    newComment.classList.add('bg-gray-100', 'p-2', 'rounded', 'mb-2');

    // ユーザー名と時間を取得
    const userName = '匿名ユーザー'; // 将来的にはログインしたユーザーの名前を取得
    const currentTime = new Date().toLocaleString();

    newComment.innerHTML = `<p><strong>${userName}</strong> (${currentTime})</p><p>${commentText}</p>`;
    commentList.appendChild(newComment);
    document.getElementById('commentText').value = '';
});

function shareOnSNS(platform) {
    const url = window.location.href;
    let shareURL = '';
    if (platform === 'twitter') {
        shareURL = `https://twitter.com/share?url=${encodeURIComponent(url)}`;
    } else if (platform === 'facebook') {
        shareURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    } else if (platform === 'line') {
        shareURL = `https://line.me/R/msg/text/?${encodeURIComponent(url)}`;
    }
    window.open(shareURL, '_blank');
}

// 支援フォームの送信イベント
document.getElementById('supportForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const amount = document.getElementById('amount').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    if (amount && name && email) {
        fetch('http://localhost:3001/api/donations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount, name, email })
        })
        .then(response => response.json())
        .then(data => {
            alert('支援が完了しました！');
            console.log(data);
        })
        .catch(error => {
            alert('支援に失敗しました。');
            console.error(error);
        });
    } else {
        alert('全ての項目を入力してください。');
    }
});

// お問い合わせフォームの送信イベント
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const message = document.getElementById('contactMessage').value;

    if (name && email && message) {
        fetch('http://localhost:3001/api/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, message })
        })
        .then(response => response.json())
        .then(data => {
            alert('お問い合わせを送信しました！');
            console.log(data);
        })
        .catch(error => {
            alert('お問い合わせの送信に失敗しました。');
            console.error(error);
        });
    } else {
        alert('全ての項目を入力してください。');
    }
});

// お問い合わせ機能
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const message = document.getElementById('contactMessage').value;

    if (name && email && message) {
        let inquiryHistory = JSON.parse(localStorage.getItem('inquiryHistory')) || [];
        const newInquiry = { date: new Date().toLocaleString(), name, email, message };
        inquiryHistory.push(newInquiry);
        localStorage.setItem('inquiryHistory', JSON.stringify(inquiryHistory));
        alert('お問い合わせを送信しました！');
    } else {
        alert('全ての項目を入力してください。');
    }
});
document.getElementById('supportForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const amount = document.getElementById('amount').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    if (amount && name && email) {
        const donation = {
            date: new Date().toLocaleString(),
            donor: name,
            amount: `¥${amount}`
        };

        // ローカルストレージに保存
        let donations = JSON.parse(localStorage.getItem('donations')) || [];
        donations.push(donation);
        localStorage.setItem('donations', JSON.stringify(donations));

        alert('ご支援ありがとうございます！');
    } else {
        alert('全ての項目を入力してください。');
    }
});

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const message = document.getElementById('contactMessage').value;

    if (name && email && message) {
        const contact = {
            date: new Date().toLocaleString(),
            name: name,
            email: email,
            message: message
        };

        // ローカルストレージに保存
        let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        contacts.push(contact);
        localStorage.setItem('contacts', JSON.stringify(contacts));

        alert('お問い合わせありがとうございます！');
    } else {
        alert('全ての項目を入力してください。');
    }
});

