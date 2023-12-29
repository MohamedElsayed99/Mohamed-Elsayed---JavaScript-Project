
    var productCategories = ['All Categories', 'Electronics', 'Gaming', 'Photographer', 'Laptops', 'mouse'];

    var sliderContainer = document.getElementById('slider-container');
    var slides = ['images/1.jpg', 'images/2.jpg', 'images/3.jpg', 'images/4.jpg', 'images/5.jpg', 'images/6.jpg',
        'images/7.jpg', 'images/8.jpg'];

    var currentSlide = 0;

    function showSlides() {
        sliderContainer.innerHTML = '';
        slides.forEach((slide, index) => {
            var slideElement = document.createElement('div');
            slideElement.classList.add('slide');
            slideElement.innerHTML = `<img src="${slide}" alt="Slider Image ${index + 1}">`;
            sliderContainer.appendChild(slideElement);
        });
        sliderContainer.style.transform = `translateX(${-currentSlide * 100}%)`;
    }

    function nextSlide() {
        if (currentSlide < slides.length - 1) {
            currentSlide++;
        } else {
            currentSlide = 0;
        }
        showSlides();
    }

    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
        } else {
            currentSlide = slides.length - 1;
        }
        showSlides();
    }
    function initializePage() {
        showSlides();
        setInterval(nextSlide, 2000); 
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Initialize the session storage cart if it doesn't exist
    if (!sessionStorage.getItem('cart')) {
        sessionStorage.setItem('cart', JSON.stringify([]));
    }

    function updateCartCount() {
        var cartCount = document.getElementById('cartCount');
        var cart = JSON.parse(sessionStorage.getItem('cart')) || [];
        cartCount.innerText = cart.length.toString();

        cart.forEach(item => {
            var removeButton = document.getElementById(`remove${item.id}`);
            if (removeButton) {
                removeButton.addEventListener('click', function () {
                    removeFromCart(item.id);
                });
            }
        });
    }

    function displayHomePage() {
        var content = document.getElementById('content');
        var categoryButtons = document.getElementById('categoryButtons');
        productCategories.forEach(category => {
            var button = document.createElement('button');
            button.innerText = category;
            button.onclick = function () {
                filterProducts(category);
            };
            categoryButtons.appendChild(button);
        });

        content.innerHTML = '';
        for (var i = 1; i <= 8; i++) {
            var category = productCategories[i % productCategories.length];
            content.innerHTML += `
                <div class="card" id="product${i}" data-category="${category}">
                    <img src="./images/${i}.jpg" alt="Product ${i}">
                    <h3>Product ${i}</h3>
                    <p>Description of Product ${i}.</p>
                    <p>Category: ${category}</p>
                    <p>Price: $${i * 10}</p>
                    <button onclick="addToCart(${i}, ${i * 10})">Add to Cart</button>
                </div>`;
        }

        updateCartCount();
    }

    function addToCart(productId, price) {
        var product = {
            id: productId,
            name: `Product ${productId}`,
            description: `Description of Product ${productId}.`,
            category: document.getElementById(`product${productId}`).getAttribute('data-category'),
            price: price
        };

        var cart = JSON.parse(sessionStorage.getItem('cart'));
        cart.push(product);

        sessionStorage.setItem('cart', JSON.stringify(cart));

        alert(`Product ${productId} added to the cart with price $${price}!`);

        updateCartCount();
    }

    function displayShoppingCart() {
        var content = document.getElementById('content');
        content.innerHTML = '';

        var cart = JSON.parse(sessionStorage.getItem('cart')) || [];

        if (cart.length === 0) {
            content.innerHTML += '<p>Your shopping cart is empty.</p>';
        } else {
            cart.forEach(product => {
                content.innerHTML += `
                  <div class="cart-item">
                    <img src="images/${product.id}.jpg" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p>Category: ${product.category}</p>
                    <p>Price: $${product.price}</p>
                    <button onclick="removeCartItem(${product.id})">Remove</button>
                  </div>
                `;
            });
        }

        updateCartCount();
    }

    function removeCartItem(productId) {
        var cart = JSON.parse(sessionStorage.getItem('cart')) || [];
        var updatedCart = cart.filter(item => item.id !== productId);
        sessionStorage.setItem('cart', JSON.stringify(updatedCart));
        displayShoppingCart(); // Refresh the cart display
    }

    function filterProducts(selectedCategory) {
        var cards = document.getElementsByClassName('card');

        for (var card of cards) {
            var cardCategory = card.getAttribute('data-category');

            if (selectedCategory === 'All Categories' || cardCategory === selectedCategory) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        }
    }

    function validateLogin() {
        var emailInput = document.getElementById('email');
        var usernameInput = document.getElementById('username');
        var passwordInput = document.getElementById('password');

        var usernameRegex = /^[A-Z][a-zA-Z]{5,}$/;
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;


        if (!usernameInput.value.trim()) {
            document.getElementById('nameError').innerText = 'user name required.';
            return;
        }
        if (!emailInput.value.trim()) {
            document.getElementById('emailError').innerText = 'Email address required.';
            return;
        }
        if ( !passwordInput.value.trim()) {
            document.getElementById('passwordError').innerText = 'Password required.';
            return;
        }


        
        if (!usernameRegex.test(usernameInput.value)) {
            alert('Invalid username. Please start with alphabetical character and User Name Must be More than 5 Char and Without Any Number.');
            return;
        }
        if (!emailRegex.test(emailInput.value)) {
            alert('Invalid Email address.');
            return;
        }
        if (!passwordRegex.test(passwordInput.value)) {
            alert('Invalid password. Password must be at least 8 characters long and contain at least one letter and one number.');
            return;
        }

        alert('We Got Your Message Successfully');
        window.location.reload();
    }
     // Initial display
    displayShoppingCart();
   
    displayHomePage();

