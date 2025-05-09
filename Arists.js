// // Lấy dữ liệu từ localStorage
// const artists = JSON.parse(localStorage.getItem('artistss')) || [];
// const featuredArtists = artists.filter(artist => artist.isFeatured);
// const allArtists = artists;

// // Lấy tất cả thẻ img trong Featured Artists Row
// const featuredImages = document.querySelectorAll('.artist-row-scroll .artist-card-row .featured-artist-img');
// // Lấy tất cả thẻ trong Featured Artists Grid
// const gridCards = document.querySelectorAll('.artist-grid .artist-card-grid');

// // Thay thế hình ảnh trong Featured Artists Row (chỉ ảnh, giữ tên bài hát)
// featuredImages.forEach((img, index) => {
//     if (featuredArtists[index] && featuredArtists[index].image) {
//         img.src = featuredArtists[index].image;
//         img.alt = featuredArtists[index].name;
//     }
// });

// // Thay thế hình ảnh và tên trong Featured Artists Grid
// gridCards.forEach((card, index) => {
//     const img = card.querySelector('.grid-artist-img');
//     const nameSpan = card.querySelector('.artist-name');
//     if (allArtists[index] && allArtists[index].image && allArtists[index].name) {
//         img.src = allArtists[index].image;
//         img.alt = allArtists[index].name;
//         nameSpan.textContent = allArtists[index].name;
//         // Cập nhật lớp active dựa trên isFeatured
//         card.classList.toggle('active', allArtists[index].isFeatured);
//     }
// });

function renderArtists() {
    const artistGrid = document.getElementById('artistGrid');
    artistGrid.innerHTML = '';

    // Lấy danh sách nghệ sĩ từ localStorage với key "artistss"
    const storedArtists = localStorage.getItem('artistss');
    const artists = storedArtists ? JSON.parse(storedArtists) : [];

    // Hiển thị mỗi nghệ sĩ thành 1 card
    artists.forEach((artist, index) => {
        const artistCard = document.createElement('div');
        artistCard.className = 'artist-card-grid';
        if (index === 0) artistCard.classList.add('active');

        artistCard.innerHTML = `
            <div class="artist-image-wrapper">
                <img class="grid-artist-img" src="${artist.image}" alt="${artist.name}" data-index="${index}">
            </div>
            <div class="artist-info">
                <span class="artist-name">${artist.name}</span>
            </div>
        `;

        artistGrid.appendChild(artistCard);
    });

    // Gắn sự kiện click cho tất cả ảnh
    const imageElements = document.querySelectorAll('.grid-artist-img');
    imageElements.forEach(img => {
        img.addEventListener('click', function () {
            const index = this.getAttribute('data-index');
            artists[index].views = (artists[index].views || 0) + 1; // tăng view
            localStorage.setItem('artistss', JSON.stringify(artists))
            // Nếu cần re-render hoặc cập nhật phần featured, gọi hàm tương ứng:
            // renderFeaturedArtists();
        });
    });
}

renderArtists();


function renderTop7Artists() {
    const top7ArtistList = document.getElementById('featuredArtistList');
    top7ArtistList.innerHTML = '';

    // Lấy dữ liệu từ localStorage
    const storedArtists = localStorage.getItem('artistss');
    const artists = storedArtists ? JSON.parse(storedArtists) : [];

    // Sắp xếp nghệ sĩ theo lượt view từ cao xuống thấp
    artists.sort((a, b) => b.views - a.views);

    // Lấy ra 7 nghệ sĩ có lượt view cao nhất
    const top7Artists = artists.slice(0, 7);

    // Hiển thị top 7 nghệ sĩ
    top7Artists.forEach(artist => {
        const artistRow = document.createElement('div');
        artistRow.className = 'artist-card-row';

        artistRow.innerHTML = `
            <div class="artist-image-wrapper">
                <img class="featured-artist-img" src="${artist.image}" alt="${artist.name}">
            </div>
            <div class="artist-info">
                <span class="artist-name">${artist.name}</span>
                <span class="artist-name">${artist.views} views</span>

               
            </div>
        `;

        top7ArtistList.appendChild(artistRow);
    });
}

// Gọi hàm để render top 7 nghệ sĩ
renderTop7Artists();




