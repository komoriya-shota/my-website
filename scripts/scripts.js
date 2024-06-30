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

let slideIndex = 0;
showSlides();

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let thumbnails = document.getElementsByClassName("thumbnail");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    for (i = 0; i < thumbnails.length; i++) {
        thumbnails[i].className = thumbnails[i].className.replace(" active-thumbnail", "");
    }
    slides[slideIndex-1].style.display = "block";
    thumbnails[slideIndex-1].className += " active-thumbnail";
    setTimeout(showSlides, 5000); // Change image every 5 seconds
}


document.getElementById('commentForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const commentText = document.getElementById('commentText').value;
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


