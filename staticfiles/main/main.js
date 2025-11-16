// Карусель з фотографіями для product_detail.html
// На мобільній версії ховаємо .link
function hideLinksOnMobile() {
    var linkDivs = document.querySelectorAll('.link');
    if (window.innerWidth <= 600) {
        linkDivs.forEach(el => el.style.display = 'none');
    } else {
        linkDivs.forEach(el => el.style.display = '');
    }
}
hideLinksOnMobile();
window.addEventListener('resize', hideLinksOnMobile);   
document.addEventListener("DOMContentLoaded", function () {
    // Вибираємо всі зображення продукту і залишаємо тільки ті, які видимі
    const imgs = Array.from(document.querySelectorAll('.product-detail-img'))
        .filter(img => img.offsetParent !== null && img.src && img.src.length > 0);

    // Якщо немає або тільки 1 фото — карусель непотрібна
    if (imgs.length <= 1) {
        return;
    }

    // Створення контейнера для каруселі
    const carouselWrapper = document.createElement('div');
    carouselWrapper.className = 'custom-carousel-wrapper';
    carouselWrapper.style.position = 'relative';
    carouselWrapper.style.display = 'flex';
    carouselWrapper.style.alignItems = 'center';

    // Слайд-контейнер
    const slideContainer = document.createElement('div');
    slideContainer.className = 'custom-carousel-slide';
    slideContainer.style.flex = '1 1 auto';
    slideContainer.style.display = 'flex';
    slideContainer.style.justifyContent = 'center';
    slideContainer.style.alignItems = 'center';
    slideContainer.style.position = 'relative';

    // Створити стілочки без заднього фото, кольору, бекстайлу — тільки самі стрілки поверх фото
    const prevBtn = document.createElement('button');
    prevBtn.innerHTML = '&#8592;';
    prevBtn.className = 'custom-carousel-prev';
    prevBtn.style.position = 'absolute';
    prevBtn.style.left = '12px';
    prevBtn.style.top = '50%';
    prevBtn.style.transform = 'translateY(-50%)';
    prevBtn.style.border = 'none';
    prevBtn.style.background = 'none';
    prevBtn.style.color = 'inherit';
    prevBtn.style.fontSize = '2.3rem';
    prevBtn.style.cursor = 'pointer';
    prevBtn.style.padding = '0 8px';
    prevBtn.style.zIndex = 2;
    prevBtn.style.boxShadow = 'none';
    prevBtn.style.outline = 'none';

    const nextBtn = document.createElement('button');
    nextBtn.innerHTML = '&#8594;';
    nextBtn.className = 'custom-carousel-next';
    nextBtn.style.position = 'absolute';
    nextBtn.style.right = '12px';
    nextBtn.style.top = '50%';
    nextBtn.style.transform = 'translateY(-50%)';
    nextBtn.style.border = 'none';
    nextBtn.style.background = 'none';
    nextBtn.style.color = 'inherit';
    nextBtn.style.fontSize = '2.3rem';
    nextBtn.style.cursor = 'pointer';
    nextBtn.style.padding = '0 8px';
    nextBtn.style.zIndex = 2;
    nextBtn.style.boxShadow = 'none';
    nextBtn.style.outline = 'none';

    // Пагінація (кружечки)
    const pagination = document.createElement('div');
    pagination.className = 'custom-carousel-pagination';
    pagination.style.display = 'flex';
    pagination.style.justifyContent = 'center';
    pagination.style.gap = '10px';
    pagination.style.marginTop = '16px';

    // Контейнер, куди буде вставлена карусель (це .product-detail)
    const pdEl = document.querySelector('.product-detail');
    if (!pdEl) return;

    // Видалити всі img і вставити їх в карусель (slideContainer)
    imgs.forEach((img, idx) => {
        img.style.display = idx === 0 ? 'block' : 'none';
        img.style.marginRight = '0';  // Прибрати margin, щоб не їхати
        img.style.transition = 'opacity 0.45s';
        img.dataset.carouselIndex = idx.toString();
        slideContainer.appendChild(img);

        // Кружечок пагінації
        const dot = document.createElement('span');
        dot.className = 'custom-carousel-dot';
        dot.style.display = 'inline-block';
        dot.style.width = '14px';
        dot.style.height = '14px';
        dot.style.borderRadius = '50%';
        dot.style.background = (idx === 0) ? '#bbaf30' : '#ccc';
        dot.style.cursor = 'pointer';
        dot.style.transition = 'background 0.3s';
        dot.dataset.index = idx;
        pagination.appendChild(dot);
    });

    carouselWrapper.appendChild(prevBtn);
    carouselWrapper.appendChild(slideContainer);
    carouselWrapper.appendChild(nextBtn);
    pdEl.insertBefore(carouselWrapper, pdEl.firstChild);
    carouselWrapper.appendChild(pagination);

    let currentSlide = 0;
    function showSlide(n) {
        imgs.forEach((img, idx) => {
            img.style.display = (idx === n) ? 'block' : 'none';
            img.style.opacity = (idx === n) ? '1' : '0';
        });
        // Оновити активний dot
        pagination.querySelectorAll('.custom-carousel-dot').forEach((dot, idx) => {
            dot.style.background = (idx === n) ? '#bbaf30' : '#ccc';
        });
        currentSlide = n;
    }

    prevBtn.addEventListener('click', function () {
        showSlide((currentSlide - 1 + imgs.length) % imgs.length);
    });
    nextBtn.addEventListener('click', function () {
        showSlide((currentSlide + 1) % imgs.length);
    });

    pagination.querySelectorAll('.custom-carousel-dot').forEach(dot => {
        dot.addEventListener('click', function () {
            const idx = +this.dataset.index;
            showSlide(idx);
        });
    });

    // Swipe for mobile
    let startX = null, endX = null;
    slideContainer.addEventListener('touchstart', function (e) {
        startX = e.touches[0].clientX;
    });
    slideContainer.addEventListener('touchend', function (e) {
        endX = e.changedTouches[0].clientX;
        if (startX !== null && Math.abs(startX - endX) > 40) {
            if (endX < startX) {
                // swipe left
                showSlide((currentSlide + 1) % imgs.length);
            } else {
                showSlide((currentSlide - 1 + imgs.length) % imgs.length);
            }
        }
    });

    // Для малих екранів адаптуємо кнопки на фото
    function updateBtnPosition() {
        if (window.innerWidth < 900) {
            prevBtn.style.left = '6px';
            nextBtn.style.right = '6px';
            prevBtn.style.fontSize = '1.6rem';
            nextBtn.style.fontSize = '1.6rem';
            prevBtn.style.padding = '0 5px';
            nextBtn.style.padding = '0 5px';
        } else {
            prevBtn.style.left = '12px';
            nextBtn.style.right = '12px';
            prevBtn.style.fontSize = '2.3rem';
            nextBtn.style.fontSize = '2.3rem';
            prevBtn.style.padding = '0 8px';
            nextBtn.style.padding = '0 8px';
        }
    }
    updateBtnPosition();
    window.addEventListener('resize', updateBtnPosition);
});

