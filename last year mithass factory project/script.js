       // Global variables
        let currentUser = null;
        let isAdmin = false;
        let cart = [];
        let currentProductPage = 1;
        const productsPerPage = 6;
        let allProducts = [];
        let filteredProducts = [];
        let currentTestimonial = 0;
        let testimonialInterval;

        // Sample data
        const sampleProducts = [
            { id: "MI01", name: "Gulab Jamun", price: 250, category: "traditional", image: "Gulaab Jamun.jpeg", description: "Soft, melt-in-the-mouth milk solid balls soaked in sugar syrup." },
            { id: "MI02", name: "Rasgulla", price: 215, category: "traditional", image: "rasgulla.jpeg", description: "Spongy cottage cheese balls in light sugar syrup." },
            { id: "MI03", name: "Kaju Katli", price: 1200, category: "festive", image: "kaju katli.jpeg", description: "Thin diamond-shaped cashew fudge with silver leaf garnish." },
            { id: "MI04", name: "Besan Ladoo", price: 350, category: "traditional", image: "besan Ladoo.jpeg", description: "Round sweet balls made from gram flour, ghee, and sugar." },
            { id: "MI05", name: "Mysore Pak", price: 1280, category: "traditional", image: "mysore pak.jpeg", description: "Rich, ghee-dense sweet from South India with gram flour." },
            { id: "MI06", name: "Peda", price: 640, category: "festive", image: "peda.jpeg", description: "Soft milk-based sweet flavored with cardamom and saffron." },
            { id: "MI07", name: "Jalebi", price: 400, category: "traditional", image: "jalebi.jpeg", description: "Crispy, coiled sweet dipped in sugar syrup, served warm." },
            { id: "MI08", name: "Rasmalai", price: 250, category: "festive", image: "rasmalai.jpeg", description: "Soft cheese patties in sweetened, thickened milk." },
            { id: "MI09", name: "Soan Papdi", price: 640, category: "traditional", image: "son papdi.jpeg", description: "Flaky, fibrous sweet made with gram flour and sugar." },
            { id: "MI010", name: "Sugar-free Sweets", price: 700, category: "modern", image: "sugar free mithai.jpeg", description: "Range of diabetic-friendly sweets with natural sweeteners." },
            { id: "MI011", name: "Chocolate Barfi", price: 677, category: "modern", image: "chocolate barfi.jpeg", description: "Fusion sweet combining traditional barfi with rich chocolate." },
            { id: "MI012", name: "Dry Fruit Mix", price: 1980, category: "festive", image: "dry fruit mix mithai.jpeg", description: "Premium assortment of dry fruit-based sweets." },
            { id: "MI013", name: "Motichoor Ladoo", price: 775, category: "festive", image: "motichoor ladoo.jpeg", description: "Tiny fried gram flour balls shaped into round ladoos." },
            { id: "MI014", name: "Carrot pudding", price: 500, category: "modern", image: "carrot pudding.jpeg", description: "Layered sweet with cream and flavored milk solids." },
            { id: "MI015", name: "Ghevar", price: 850, category: "festive", image: "ghevar.jpeg", description: "Disc-shaped sweet made from flour and soaked in sugar syrup." },
            { id: "MI016", name: "Pista Burfi", price: 400, category: "traditional", image: "pistabarfi.jpeg", description: "Pistachio-based fudge with rich, nutty flavor." },
            { id: "MI017", name: "Coconut Ladoo", price: 629, category: "traditional", image: "coconut ladoo.jpeg", description: "Sweet coconut balls with cardamom and ghee." },
            { id: "MI018", name: "Kalakand", price: 235, category: "traditional", image: "kalakand.jpeg", description: "Milk cake with granular texture and mild sweetness." }
        ];

        const sampleTestimonials = [
            {
                name: "Harshit Sharma", text: "I’ve been ordering from Mithass Factory for all family occasions, and I’m always impressed. The sweets are fresh, flavorful, and of excellent quality. From traditional favorites to specialty items, everything is beautifully made. The staff is friendly, and the overall experience is smooth and enjoyable. Highly recommend!", rating: 5, image: "my ai generated image in anime.png" },

            { name: "Esha Bhardwaj", text: "As someone with diabetes, I appreciate their sugar-free range. It lets me enjoy traditional sweets without worry. Highly recommended!", rating: 5, image: "animated photo 4.jpeg" },

            { name: "Sumit Rai", text: "Their festival special boxes are a hit every Diwali. The packaging is beautiful and the sweets stay fresh for days.", rating: 4, image: "animated photo 3.jpeg" },

            { name: "Ashutosh Kumar Singh", text: "I ordered from Mithass Factory for my wedding, and they handled everything perfectly. The service was professional, the staff was courteous, and every detail was managed smoothly. Their sweets were absolutely delicious, beautifully presented, and every guest loved them. I highly recommend Mithass Factory for any special occasion or celebration.", rating: 5, image: "animated photo 1.jpeg" },

            { name: "Suraj Yadav", text: "The Mysore Pak here is authentic and takes me back to my childhood. Their traditional recipes are preserved perfectly.", rating: 5, image: "animated photo 2.jpeg" }
        ];

        const sampleGallery = [
            { name: "Diwali Special Box", season: "Festival Season", popularity: "Our most popular festive package with assorted traditional sweets", image: "diwali special gift.jpeg" },
            { name: "Summer Coolers", season: "Summer", popularity: "Refreshing milk-based sweets perfect for hot weather", image: "soft summer mithai.jpeg" },
            { name: "Wedding Collection", season: "All Year", popularity: "Premium sweets for wedding ceremonies and receptions", image: "collection of wedding sweets.jpeg" },
            { name: "Winter Specials", season: "Winter", popularity: "Ghee-rich sweets that provide warmth during cold months", image: "winter collection sweets.jpeg" },
            { name: "Sugar-Free Range", season: "All Year", popularity: "Healthy alternatives for health-conscious customers", image: "sugar free collection.jpeg" },
            { name: "Kids Special", season: "All Year", popularity: "Colorful, fun-shaped sweets loved by children", image: "kids special sweets.jpeg" }
        ];

        const sampleFAQs = [
            { question: "What are your shop timings?", answer: "We are open Monday to Saturday from 8:00 AM to 10:00 PM, and on Sundays from 9:00 AM to 9:00 PM." },
            { question: "Do you offer home delivery?", answer: "Yes, we offer home delivery across the city. Delivery charges may apply based on distance." },
            { question: "Do you have sugar-free options?", answer: "Yes, we have a dedicated range of sugar-free sweets made with natural sweeteners for health-conscious customers." },
            { question: "Can I place bulk orders for weddings or functions?", answer: "Absolutely! We specialize in bulk orders for weddings and functions. Please contact us at least one week in advance for large orders." },
            { question: "How do I store the sweets to keep them fresh?", answer: "Most sweets stay fresh for 3-4 days when stored in airtight containers in a cool, dry place. Some milk-based sweets should be refrigerated." },
            { question: "Do you accept online payments?", answer: "Yes, we accept UPI, credit/debit cards, and also offer cash on delivery options." }
        ];

        const sampleStaff = [
            { id: "MF001", name: "Rajesh Kumar", address: "123 Sweet Lane, Delhi", mobile: "9876543210", email: "rajesh@mithassfactory.com" },
            { id: "MF002", name: "Sunita Sharma", address: "456 Mithai Nagar, Delhi", mobile: "9876543211", email: "sunita@mithassfactory.com" },
            { id: "MF003", name: "Amit Patel", address: "789 Gulab Street, Delhi", mobile: "9876543212", email: "amit@mithassfactory.com" },
            { id: "MF004", name: "Priya Singh", address: "321 Peda Road, Delhi", mobile: "9876543213", email: "priya@mithassfactory.com" },
            { id: "MF005", name: "Vikram Reddy", address: "654 Barfi Avenue, Delhi", mobile: "9876543214", email: "vikram@mithassfactory.com" }
        ];

        // Initialize the website
        document.addEventListener('DOMContentLoaded', function() {
            // Hide loading screen after 2 seconds
            setTimeout(() => {
                document.getElementById('loadingScreen').style.opacity = '0';
                setTimeout(() => {
                    document.getElementById('loadingScreen').style.display = 'none';
                }, 500);
            }, 2000);

            // Initialize data
            allProducts = [...sampleProducts];
            filteredProducts = [...sampleProducts];
            
            // Load initial content
            loadProducts();
            loadTestimonials();
            loadGallery();
            loadFAQs();
            updateCartCount();
            
            // Set up testimonial slider auto-rotation
            startTestimonialSlider();
            
            // Set up event listeners
            setupEventListeners();
        });

        // Set up event listeners
        function setupEventListeners() {
            // Login button
            document.getElementById('loginBtn').addEventListener('click', function(e) {
                e.preventDefault();
                if (currentUser) {
                    logout();
                } else {
                    openModal('loginModal');
                }
            });

            // Cart button
            document.getElementById('cartIcon').addEventListener('click', function(e) {
                e.preventDefault();
                openModal('cartModal');
                updateCartDisplay();
            });

            // Login form submission
            document.getElementById('loginForm').addEventListener('submit', function(e) {
                e.preventDefault();
                const email = document.getElementById('loginEmail').value;
                const password = document.getElementById('loginPassword').value;
                const userType = document.querySelector('input[name="userType"]:checked').value;
                
                // Simple validation
                if (email && password) {
                    if (userType === 'admin') {
                        // Admin login
                        if (email === 'admin@mithass.com' && password === 'admin123') {
                            currentUser = { name: 'Admin', email: email };
                            isAdmin = true;
                            document.getElementById('loginBtn').textContent = 'Logout';
                            document.getElementById('adminSection').classList.add('active');
                            closeModal('loginModal');
                            showNotification('Admin login successful!', 'success');
                        } else {
                            showNotification('Invalid admin credentials!', 'error');
                        }
                    } else {
                        // User login
                        currentUser = { name: 'User', email: email };
                        isAdmin = false;
                        document.getElementById('loginBtn').textContent = 'Logout';
                        closeModal('loginModal');
                        showNotification('Login successful!', 'success');
                    }
                }
            });

            // Registration form submission
            document.getElementById('registerForm').addEventListener('submit', function(e) {
                e.preventDefault();
                const name = document.getElementById('registerName').value;
                const email = document.getElementById('registerEmail').value;
                const phone = document.getElementById('registerPhone').value;
                const password = document.getElementById('registerPassword').value;
                const confirmPassword = document.getElementById('registerConfirmPassword').value;
                
                if (password !== confirmPassword) {
                    showNotification('Passwords do not match!', 'error');
                    return;
                }
                
                // Simple registration
                currentUser = { name, email, phone };
                isAdmin = false;
                document.getElementById('loginBtn').textContent = 'Logout';
                closeModal('registerModal');
                showNotification('Registration successful! You are now logged in.', 'success');
            });

            // Forgot password form submission
            document.getElementById('forgotPasswordForm').addEventListener('submit', function(e) {
                e.preventDefault();
                const email = document.getElementById('forgotEmail').value;
                closeModal('forgotPasswordModal');
                showNotification(`Password reset link sent to ${email}`, 'success');
            });

            // Feedback form submission
            document.getElementById('feedbackForm').addEventListener('submit', function(e) {
                e.preventDefault();
                showNotification('Thank you for your feedback!', 'success');
                document.getElementById('feedbackForm').reset();
            });

            // Delivery form submission
            document.getElementById('deliveryForm').addEventListener('submit', function(e) {
                e.preventDefault();
                closeModal('deliveryModal');
                openModal('paymentModal');
            });

            // Card payment form submission
            document.getElementById('cardForm').addEventListener('submit', function(e) {
                e.preventDefault();
                processPayment();
            });

            // Testimonial navigation
            document.getElementById('prevTestimonial').addEventListener('click', showPrevTestimonial);
            document.getElementById('nextTestimonial').addEventListener('click', showNextTestimonial);
        }

        // Load products with pagination
        function loadProducts() {
            const container = document.getElementById('productsContainer');
            const pagination = document.getElementById('productsPagination');
            
            // Clear previous content
            container.innerHTML = '';
            
            // Calculate pagination
            const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
            const startIndex = (currentProductPage - 1) * productsPerPage;
            const endIndex = startIndex + productsPerPage;
            const pageProducts = filteredProducts.slice(startIndex, endIndex);
            
            // Create product cards
            pageProducts.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" class="product-img">
                    <div class="product-content">
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-price">₹${product.price} / kg</p>
                        <p class="product-description">${product.description}</p>
                        <button class="btn" onclick="addToCart('${product.id}')">Add to Cart</button>
                        ${isAdmin ? `<button class="btn" style="margin-top: 0.5rem; background-color: #dc3545;" onclick="removeProduct(${product.id})">Remove</button>` : ''}
                    </div>
                `;
                container.appendChild(productCard);
            });
            
            // Create pagination buttons
            pagination.innerHTML = '';
            for (let i = 1; i <= totalPages; i++) {
                const pageBtn = document.createElement('button');
                pageBtn.className = `page-btn ${i === currentProductPage ? 'active' : ''}`;
                pageBtn.textContent = i;
                pageBtn.addEventListener('click', () => {
                    currentProductPage = i;
                    loadProducts();
                });
                pagination.appendChild(pageBtn);
            }
        }

        // Filter and sort products
        function filterProducts() {
            const sortBy = document.getElementById('sortFilter').value;
            const category = document.getElementById('categoryFilter').value;
            
            // Apply category filter
            filteredProducts = allProducts.filter(product => {
                if (category === 'all') return true;
                return product.category === category;
            });
            
            // Apply sorting
            switch(sortBy) {
                case 'price-low':
                    filteredProducts.sort((a, b) => a.price - b.price);
                    break;
                case 'price-high':
                    filteredProducts.sort((a, b) => b.price - a.price);
                    break;
                case 'name':
                    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                default:
                    // Keep original order
                    break;
            }
            
            // Reset to first page and reload
            currentProductPage = 1;
            loadProducts();
        }

        // Load testimonials
        function loadTestimonials() {
            const slider = document.getElementById('testimonialSlider');
            slider.innerHTML = '';
            
            sampleTestimonials.forEach((testimonial, index) => {
                const slide = document.createElement('div');
                slide.className = 'testimonial-slide';
                slide.innerHTML = `
                    <div class="testimonial-text">"${testimonial.text}"</div>
                    <div class="testimonial-author">
                        <img src="${testimonial.image}" alt="${testimonial.name}" class="testimonial-img">
                        <div>
                            <div class="testimonial-name">${testimonial.name}</div>
                            <div class="testimonial-rating">${'★'.repeat(testimonial.rating)}${'☆'.repeat(5 - testimonial.rating)}</div>
                        </div>
                    </div>
                `;
                slider.appendChild(slide);
            });
            
            // Set initial position
            updateTestimonialPosition();
        }

        // Start testimonial slider auto-rotation
        function startTestimonialSlider() {
            testimonialInterval = setInterval(showNextTestimonial, 5000);
        }

        // Show next testimonial
        function showNextTestimonial() {
            currentTestimonial = (currentTestimonial + 1) % sampleTestimonials.length;
            updateTestimonialPosition();
        }

        // Show previous testimonial
        function showPrevTestimonial() {
            currentTestimonial = (currentTestimonial - 1 + sampleTestimonials.length) % sampleTestimonials.length;
            updateTestimonialPosition();
        }

        // Update testimonial slider position
        function updateTestimonialPosition() {
            const slider = document.getElementById('testimonialSlider');
            slider.style.transform = `translateX(-${currentTestimonial * 100}%)`;
        }

        // Load gallery items
        function loadGallery() {
            const container = document.getElementById('galleryContainer');
            container.innerHTML = '';
            
            sampleGallery.forEach(item => {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                galleryItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="gallery-img">
                    <div class="gallery-info">
                        <h4 class="gallery-title">${item.name}</h4>
                        <p><strong>Season:</strong> ${item.season}</p>
                        <p>${item.popularity}</p>
                    </div>
                `;
                container.appendChild(galleryItem);
            });
        }

        // Load FAQs
        function loadFAQs() {
            const container = document.querySelector('.faqs-container');
            container.innerHTML = '';
            
            sampleFAQs.forEach((faq, index) => {
                const faqItem = document.createElement('div');
                faqItem.className = 'faq-item';
                faqItem.innerHTML = `
                    <div class="faq-question" onclick="toggleFAQ(${index})">
                        <span>${faq.question}</span>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="faq-answer" id="faqAnswer${index}">
                        <p>${faq.answer}</p>
                    </div>
                `;
                container.appendChild(faqItem);
            });
        }

        // Toggle FAQ answer visibility
        function toggleFAQ(index) {
            const answer = document.getElementById(`faqAnswer${index}`);
            const isActive = answer.classList.contains('active');
            
            // Close all FAQs first
            document.querySelectorAll('.faq-answer').forEach(faq => {
                faq.classList.remove('active');
            });
            
            // Open clicked FAQ if it wasn't already active
            if (!isActive) {
                answer.classList.add('active');
            }
        }

        // Show feature page
        function showFeaturePage(pageNumber) {
            // Hide all pages
            document.querySelectorAll('.feature-page').forEach(page => {
                page.classList.remove('active');
            });
            
            // Show selected page
            document.getElementById(`featurePage${pageNumber}`).classList.add('active');
            
            // Update pagination buttons
            document.querySelectorAll('.features-pagination .page-btn').forEach((btn, index) => {
                if (index === pageNumber - 1) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }

        // Add product to cart
        function addToCart(productId) {
            if (!currentUser) {
                showNotification('Please login to add items to cart', 'error');
                openModal('loginModal');
                return;
            }
            
            const product = allProducts.find(p => p.id === productId);
            if (product) {
                const existingItem = cart.find(item => item.id === productId);
                
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        quantity: 1,
                        image: product.image
                    });
                }
                
                updateCartCount();
                showNotification(`${product.name} added to cart!`, 'success');
            }
        }

        // Update cart count display
        function updateCartCount() {
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            document.getElementById('cartCount').textContent = totalItems;
        }

        // Update cart display in modal
        function updateCartDisplay() {
            const container = document.getElementById('cartItems');
            const totalElement = document.getElementById('cartTotal');
            
            container.innerHTML = '';
            
            if (cart.length === 0) {
                container.innerHTML = '<p style="text-align: center;">Your cart is empty</p>';
                totalElement.textContent = '₹0';
                return;
            }
            
            let total = 0;
            
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>₹${item.price} × ${item.quantity}</p>
                    </div>
                    <div class="cart-item-price">₹${itemTotal}</div>
                `;
                container.appendChild(cartItem);
            });
            
            totalElement.textContent = `₹${total}`;
            document.getElementById('paymentTotal').textContent = `₹${total}`;
        }

        // Checkout process
        function checkout() {
            if (cart.length === 0) {
                showNotification('Your cart is empty!', 'error');
                return;
            }
            
            closeModal('cartModal');
            openModal('deliveryModal');
        }

        // Select payment method
        function selectPayment(method) {
            // Hide all payment methods
            document.getElementById('upiPayment').style.display = 'none';
            document.getElementById('cardPayment').style.display = 'none';
            document.getElementById('codPayment').style.display = 'none';
            
            // Show selected method
            switch(method) {
                case 'upi':
                    document.getElementById('upiPayment').style.display = 'block';
                    break;
                case 'card':
                    document.getElementById('cardPayment').style.display = 'block';
                    break;
                case 'cod':
                    document.getElementById('codPayment').style.display = 'block';
                    break;
            }
        }

        // Process payment
        function processPayment() {
            closeModal('paymentModal');
            
            // Generate random order ID
            const orderId = Math.floor(1000 + Math.random() * 9000);
            document.getElementById('orderId').textContent = orderId;
            
            // Clear cart
            cart = [];
            updateCartCount();
            
            // Show success modal after a short delay
            setTimeout(() => {
                openModal('successModal');
            }, 300);
        }

        // Admin functions
        function showAddProductForm() {
            const adminContent = document.getElementById('adminContent');
            adminContent.innerHTML = `
                <h4>Add New Product</h4>
                <form id="addProductForm" style="margin-top: 1rem;">
                    <div class="form-group">
                        <label for="newProductName">Product Name</label>
                        <input type="text" id="newProductName" required>
                    </div>
                    <div class="form-group">
                        <label for="newProductPrice">Price (per kg)</label>
                        <input type="number" id="newProductPrice" required>
                    </div>
                    <div class="form-group">
                        <label for="newProductCategory">Category</label>
                        <select id="newProductCategory" required>
                            <option value="traditional">Traditional</option>
                            <option value="festive">Festive</option>
                            <option value="modern">Modern</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="newProductDescription">Description</label>
                        <textarea id="newProductDescription" rows="3" required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="newProductImage">Image URL</label>
                        <input type="text" id="newProductImage" placeholder="https://example.com/image.jpg" required>
                    </div>
                    <button type="submit" class="btn">Add Product</button>
                </form>
            `;
            
            document.getElementById('addProductForm').addEventListener('submit', function(e) {
                e.preventDefault();
                
                const newProduct = {
                    id: allProducts.length + 1,
                    name: document.getElementById('newProductName').value,
                    price: parseInt(document.getElementById('newProductPrice').value),
                    category: document.getElementById('newProductCategory').value,
                    description: document.getElementById('newProductDescription').value,
                    image: document.getElementById('newProductImage').value || 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
                };
                
                allProducts.push(newProduct);
                filteredProducts = [...allProducts];
                loadProducts();
                
                showNotification('Product added successfully!', 'success');
                document.getElementById('addProductForm').reset();
            });
        }

        function showStaffManagement() {
            const adminContent = document.getElementById('adminContent');
            let staffHTML = `
                <h4>Staff Management</h4>
                <button class="btn" onclick="addStaffMember()" style="margin-bottom: 1rem;">Add New Staff</button>
                <table class="staff-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Mobile</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            
            sampleStaff.forEach((staff, index) => {
                staffHTML += `
                    <tr>
                        <td>${staff.id}</td>
                        <td>${staff.name}</td>
                        <td>${staff.address}</td>
                        <td>${staff.mobile}</td>
                        <td>${staff.email}</td>
                        <td class="table-actions">
                            <button class="table-btn edit" onclick="editStaff(${index})">Edit</button>
                            <button class="table-btn delete" onclick="deleteStaff(${index})">Delete</button>
                        </td>
                    </tr>
                `;
            });
            
            staffHTML += `
                    </tbody>
                </table>
            `;
            
            adminContent.innerHTML = staffHTML;
        }

        function addStaffMember() {
            const newId = `MF${(sampleStaff.length + 1).toString().padStart(3, '0')}`;
            sampleStaff.push({
                id: newId,
                name: 'New Staff Member',
                address: 'Address here',
                mobile: '987654321X',
                email: 'newstaff@mithassfactory.com'
            });
            
            showStaffManagement();
            showNotification('New staff member added. You can now edit details.', 'success');
        }

        function editStaff(index) {
            const staff = sampleStaff[index];
            const newName = prompt('Enter new name:', staff.name);
            if (newName) staff.name = newName;
            
            const newAddress = prompt('Enter new address:', staff.address);
            if (newAddress) staff.address = newAddress;
            
            const newMobile = prompt('Enter new mobile:', staff.mobile);
            if (newMobile) staff.mobile = newMobile;
            
            const newEmail = prompt('Enter new email:', staff.email);
            if (newEmail) staff.email = newEmail;
            
            showStaffManagement();
            showNotification('Staff details updated!', 'success');
        }

        function deleteStaff(index) {
            if (confirm('Are you sure you want to delete this staff member?')) {
                sampleStaff.splice(index, 1);
                showStaffManagement();
                showNotification('Staff member deleted!', 'success');
            }
        }

        function removeProduct(productId) {
            if (confirm('Are you sure you want to remove this product?')) {
                allProducts = allProducts.filter(p => p.id !== productId);
                filteredProducts = [...allProducts];
                loadProducts();
                showNotification('Product removed!', 'success');
            }
        }

        // Modal functions
        function openModal(modalId) {
            document.getElementById(modalId).classList.add('active');
        }

        function closeModal(modalId) {
            document.getElementById(modalId).classList.remove('active');
        }

        function showRegisterModal() {
            closeModal('loginModal');
            openModal('registerModal');
        }

        function showForgotPassword() {
            closeModal('loginModal');
            openModal('forgotPasswordModal');
        }

        function showFAQs() {
            closeModal('loginModal');
            openModal('faqsModal');
        }

        // Logout function
        function logout() {
            currentUser = null;
            isAdmin = false;
            document.getElementById('loginBtn').textContent = 'Login';
            document.getElementById('adminSection').classList.remove('active');
            showNotification('Logged out successfully!', 'success');
        }

        // Show notification
        function showNotification(message, type) {
            // Create notification element
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.textContent = message;
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: 5px;
                color: white;
                background-color: ${type === 'success' ? 'var(--success-color)' : '#dc3545'};
                z-index: 9999;
                animation: slideIn 0.3s ease;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            `;
            
            document.body.appendChild(notification);
            
            // Remove notification after 3 seconds
            setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 3000);
        }

        // Add CSS for notification animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    