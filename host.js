class SpaceHostModal {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 7;
        this.formData = {};
        
        this.initializeElements();
        this.bindEvents();
        this.updateUI();
    }
    
    initializeElements() {
        // Modal elements
        this.modalOverlay = document.getElementById('modalOverlay');
        this.becomeHostBtn = document.getElementById('becomeHostBtn');
        this.closeBtn = document.getElementById('closeBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.backBtn = document.getElementById('backBtn');
        this.doneBtn = document.getElementById('doneBtn');
        
        // Progress elements
        this.progressFill = document.getElementById('progressFill');
        this.currentStepSpan = document.getElementById('currentStep');
        
        // Steps
        this.steps = document.querySelectorAll('.step');
        this.confirmation = document.getElementById('confirmation');
    }
    
    bindEvents() {
        // Modal controls
        this.becomeHostBtn.addEventListener('click', () => this.openModal());
        this.closeBtn.addEventListener('click', () => this.closeModal());
        this.modalOverlay.addEventListener('click', (e) => {
            if (e.target === this.modalOverlay) this.closeModal();
        });
        
        // Navigation
        this.nextBtn.addEventListener('click', () => this.nextStep());
        this.backBtn.addEventListener('click', () => this.prevStep());
        this.doneBtn.addEventListener('click', () => this.closeModal());
        
        // Step-specific events
        this.bindStep1Events();
        this.bindStep2Events();
        this.bindStep3Events();
        this.bindStep4Events();
        this.bindStep5Events();
        this.bindStep6Events();
        this.bindStep7Events();
        
        // ESC key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modalOverlay.classList.contains('active')) {
                this.closeModal();
            }
        });
    }
    
    bindStep1Events() {
        const optionButtons = document.querySelectorAll('#step1 .option-btn');
        optionButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove selected class from all buttons
                optionButtons.forEach(b => b.classList.remove('selected'));
                // Add selected class to clicked button
                btn.classList.add('selected');
                // Store the value
                this.formData.hostType = btn.dataset.value;
                // Enable next button
                this.validateStep1();
            });
        });
    }
    
    bindStep2Events() {
        const contactInput = document.getElementById('contact');
        const googleBtn = document.querySelector('.google-btn');
        
        contactInput.addEventListener('input', () => this.validateStep2());
        googleBtn.addEventListener('click', () => {
            // Simulate Google login
            contactInput.value = 'user@gmail.com';
            this.formData.contact = 'user@gmail.com';
            this.formData.loginMethod = 'google';
            this.validateStep2();
        });
    }
    
    bindStep3Events() {
        const choiceButtons = document.querySelectorAll('#step3 .choice-btn');
        choiceButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                choiceButtons.forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                this.formData.listingChoice = btn.dataset.value;
                this.validateStep3();
            });
        });
    }
    
    bindStep4Events() {
        const radioButtons = document.querySelectorAll('#step4 input[name="spaceType"]');
        const description = document.getElementById('description');
        
        radioButtons.forEach(radio => {
            radio.addEventListener('change', () => {
                this.formData.spaceType = radio.value;
                this.validateStep4();
            });
        });
        
        description.addEventListener('input', () => {
            this.formData.description = description.value;
            this.validateStep4();
        });
    }
    
    bindStep5Events() {
        const addressInput = document.getElementById('address');
        addressInput.addEventListener('input', () => {
            this.formData.address = addressInput.value;
            this.validateStep5();
        });
    }
    
    bindStep6Events() {
        const amenityCheckboxes = document.querySelectorAll('#step6 input[type="checkbox"]');
        amenityCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.updateAmenities();
                this.validateStep6();
            });
        });
    }
    
    bindStep7Events() {
        const images = document.getElementById('images');
        const openingTime = document.getElementById('openingTime');
        const closingTime = document.getElementById('closingTime');
        const whyJoin = document.getElementById('whyJoin');
        
        images.addEventListener('change', () => {
            this.formData.images = Array.from(images.files);
            this.validateStep7();
        });
        
        openingTime.addEventListener('change', () => {
            this.formData.openingTime = openingTime.value;
            this.validateStep7();
        });
        
        closingTime.addEventListener('change', () => {
            this.formData.closingTime = closingTime.value;
            this.validateStep7();
        });
        
        whyJoin.addEventListener('input', () => {
            this.formData.whyJoin = whyJoin.value;
            this.validateStep7();
        });
    }
    
    updateAmenities() {
        const amenityCheckboxes = document.querySelectorAll('#step6 input[type="checkbox"]:checked');
        this.formData.amenities = Array.from(amenityCheckboxes).map(cb => cb.value);
    }
    
    openModal() {
        this.modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    closeModal() {
        this.modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
        // Reset form if needed
        // this.resetForm();
    }
    
    nextStep() {
        if (this.currentStep < this.totalSteps) {
            this.currentStep++;
            this.updateUI();
        } else {
            // Show confirmation
            this.showConfirmation();
        }
    }
    
    prevStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.updateUI();
        }
    }
    
    updateUI() {
        // Update progress bar
        const progress = (this.currentStep / this.totalSteps) * 100;
        this.progressFill.style.width = `${progress}%`;
        this.currentStepSpan.textContent = this.currentStep;
        
        // Show/hide steps
        this.steps.forEach((step, index) => {
            if (index + 1 === this.currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        
        // Update navigation buttons
        this.backBtn.style.display = this.currentStep > 1 ? 'block' : 'none';
        
        // Update next button text
        this.nextBtn.textContent = this.currentStep === this.totalSteps ? 'Submit' : 'Next';
        
        // Validate current step
        this.validateCurrentStep();
    }
    
    validateCurrentStep() {
        let isValid = false;
        
        switch (this.currentStep) {
            case 1:
                isValid = this.validateStep1();
                break;
            case 2:
                isValid = this.validateStep2();
                break;
            case 3:
                isValid = this.validateStep3();
                break;
            case 4:
                isValid = this.validateStep4();
                break;
            case 5:
                isValid = this.validateStep5();
                break;
            case 6:
                isValid = this.validateStep6();
                break;
            case 7:
                isValid = this.validateStep7();
                break;
        }
        
        this.nextBtn.disabled = !isValid;
        return isValid;
    }
    
    validateStep1() {
        const isValid = !!this.formData.hostType;
        this.nextBtn.disabled = !isValid;
        return isValid;
    }
    
    validateStep2() {
        const contactInput = document.getElementById('contact');
        const contact = contactInput.value.trim();
        const isValid = contact.length > 0 && (
            this.isValidEmail(contact) || this.isValidPhone(contact)
        );
        
        if (isValid) {
            this.formData.contact = contact;
        }
        
        this.nextBtn.disabled = !isValid;
        return isValid;
    }
    
    validateStep3() {
        const isValid = !!this.formData.listingChoice;
        this.nextBtn.disabled = !isValid;
        return isValid;
    }
    
    validateStep4() {
        const isValid = !!this.formData.spaceType && !!this.formData.description?.trim();
        this.nextBtn.disabled = !isValid;
        return isValid;
    }
    
    validateStep5() {
        const isValid = !!this.formData.address?.trim();
        this.nextBtn.disabled = !isValid;
        return isValid;
    }
    
    validateStep6() {
        // Step 6 is optional - user can proceed without selecting amenities
        const isValid = true;
        this.nextBtn.disabled = !isValid;
        return isValid;
    }
    
    validateStep7() {
        const isValid = !!(
            this.formData.images?.length > 0 &&
            this.formData.openingTime &&
            this.formData.closingTime &&
            this.formData.whyJoin?.trim()
        );
        this.nextBtn.disabled = !isValid;
        return isValid;
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }
    
    showConfirmation() {
        // Hide all steps
        this.steps.forEach(step => step.classList.remove('active'));
        
        // Show confirmation
        this.confirmation.style.display = 'block';
        
        // Hide navigation buttons
        this.nextBtn.style.display = 'none';
        this.backBtn.style.display = 'none';
        
        // Update progress to 100%
        this.progressFill.style.width = '100%';
        this.currentStepSpan.textContent = 'Complete';
        
        // Here you would normally submit the form data
        console.log('Form Data:', this.formData);
    }
    
    resetForm() {
        this.currentStep = 1;
        this.formData = {};
        
        // Reset all form inputs
        document.getElementById('contact').value = '';
        document.getElementById('description').value = '';
        document.getElementById('address').value = '';
        document.getElementById('images').value = '';
        document.getElementById('openingTime').value = '';
        document.getElementById('closingTime').value = '';
        document.getElementById('whyJoin').value = '';
        
        // Reset radio buttons and checkboxes
        document.querySelectorAll('input[type="radio"]').forEach(input => input.checked = false);
        document.querySelectorAll('input[type="checkbox"]').forEach(input => input.checked = false);
        
        // Reset selected states
        document.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
        
        // Hide confirmation and show step 1
        this.confirmation.style.display = 'none';
        this.nextBtn.style.display = 'block';
        
        this.updateUI();
    }
}

// Initialize the modal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SpaceHostModal();
});

// Add some smooth scrolling and additional UX enhancements
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add loading states for better UX
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function() {
            if (this.type === 'submit' || this.classList.contains('primary-btn')) {
                // Add a subtle loading effect
                const originalText = this.textContent;
                this.style.opacity = '0.8';
                setTimeout(() => {
                    this.style.opacity = '1';
                }, 200);
            }
        });
    });
    
    // Enhance form validation with visual feedback
    document.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() && this.checkValidity()) {
                this.style.borderColor = 'var(--success-color)';
            } else if (this.value.trim() && !this.checkValidity()) {
                this.style.borderColor = 'var(--error-color)';
            } else {
                this.style.borderColor = 'var(--neutral-200)';
            }
        });
        
        input.addEventListener('focus', function() {
            this.style.borderColor = 'var(--primary-color)';
        });
    });
});