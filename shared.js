const irBotModalHTML = `
    <!-- Subscription Pricing Modal -->
    <div id="irBotModal" class="modal-overlay">
        <div class="pricing-modal">
            <button class="close-modal-btn" onclick="closeSubModal()">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
            
            <div class="pricing-header">
                <div class="pricing-header-left">
                    <div class="pricing-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"></path>
                        </svg>
                    </div>
                    <div class="pricing-title-group">
                        <h2 class="pricing-title">Upgrade to Premium</h2>
                        <p class="pricing-subtitle">Unlock IR Chatbot and advanced threat intelligence features</p>
                    </div>
                </div>
            </div>

            <div class="pricing-banner">
                <svg viewBox="0 0 24 24" fill="none" stroke="#00BCD4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="banner-icon">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                <div class="banner-text">
                    <h4 class="banner-title">Premium Feature Required</h4>
                    <p class="banner-desc">You're trying to access <span class="cyan-text">IR Chatbot</span>. Upgrade to unlock this feature along with our complete threat intelligence suite.</p>
                </div>
            </div>

            <div class="pricing-cards">
                <!-- Professional Card -->
                <div class="pricing-card">
                    <h3 class="card-title">Professional</h3>
                    <p class="card-subtitle">Perfect for<br>individual<br>analysts</p>
                    <div class="card-price"><span class="cyan-text">$99</span>/month</div>
                    <ul class="card-features">
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="#00BCD4" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Real-time Alerts</li>
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="#00BCD4" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> SIEM Integration</li>
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="#00BCD4" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> IR Chatbot</li>
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="#00BCD4" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Email Analysis</li>
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="#00BCD4" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Basic API Access</li>
                    </ul>
                    <button class="btn-card-secondary" onclick="closeSubModal()">Get Started</button>
                </div>

                <!-- Enterprise Card (Popular) -->
                <div class="pricing-card popular">
                    <div class="popular-badge">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg> 
                        Most Popular
                    </div>
                    <h3 class="card-title">Enterprise</h3>
                    <p class="card-subtitle">For security<br>teams</p>
                    <div class="card-price"><span class="cyan-text">$299</span>/month</div>
                    <ul class="card-features">
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="#00BCD4" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Everything in Professional</li>
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="#00BCD4" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Unlimited Alert Rules</li>
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="#00BCD4" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Priority Support 24/7</li>
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="#00BCD4" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Full API Access</li>
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="#00BCD4" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Custom Integrations</li>
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="#00BCD4" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Multi-User Support</li>
                    </ul>
                    <button class="btn-card-primary" onclick="closeSubModal()">Get Started</button>
                </div>

                <!-- Enterprise Plus Card -->
                <div class="pricing-card">
                    <h3 class="card-title">Enterprise Plus</h3>
                    <p class="card-subtitle">For large<br>organizations</p>
                    <div class="card-price"><span class="cyan-text">Custom</span></div>
                    <ul class="card-features">
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="#00BCD4" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Everything in Enterprise</li>
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="#00BCD4" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Dedicated Account Manager</li>
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="#00BCD4" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Custom Threat Intelligence</li>
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="#00BCD4" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> On-premise Deployment</li>
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="#00BCD4" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> SLA Guarantees</li>
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="#00BCD4" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Training & Workshops</li>
                    </ul>
                    <button class="btn-card-secondary" onclick="closeSubModal()">Contact Sales</button>
                </div>
            </div>

            <div class="premium-features-section">
                <div class="section-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#00BCD4" stroke-width="2" class="sparkle-icon">
                        <path d="M12 2v20M17 5l-10 14M22 12H2M20 7L4 17"/>
                    </svg>
                    All Premium Features
                </div>
                <div class="features-grid">
                    <div class="feature-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#00BCD4" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        Real-time Threat Alerts &<br>Notifications
                    </div>
                    <div class="feature-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#00BCD4" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        Advanced SIEM<br>Integration (Splunk,<br>Sentinel)
                    </div>
                    <div class="feature-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#00BCD4" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        AI-Powered IR Chatbot<br>Assistant
                    </div>
                    <div class="feature-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#00BCD4" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        Custom Alert Rules &<br>Filters
                    </div>
                    <div class="feature-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#00BCD4" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        Email Header Deep<br>Analysis
                    </div>
                    <div class="feature-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#00BCD4" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        APT Group Intelligence<br>Feed
                    </div>
                    <div class="feature-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#00BCD4" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        Priority Support &<br>Consultation
                    </div>
                    <div class="feature-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#00BCD4" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        API Access for Automation
                    </div>
                    <div class="feature-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#00BCD4" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        Custom Threat<br>Intelligence Reports
                    </div>
                    <div class="feature-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#00BCD4" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        Multi-User Collaboration<br>Tools
                    </div>
                </div>
            </div>

            <div class="trust-badges">
                <div class="badge">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#00BCD4" stroke-width="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                    256-bit Encryption
                </div>
                <div class="badge">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#00BCD4" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    SOC 2 Compliant
                </div>
                <div class="badge">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#00BCD4" stroke-width="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                    99.9% Uptime SLA
                </div>
            </div>
        </div>
    </div>
`;

document.addEventListener('DOMContentLoaded', () => {
    // Inject the modal HTML into the page payload
    document.body.insertAdjacentHTML('beforeend', irBotModalHTML);

    // Close on clicking outside the modal content
    document.getElementById('irBotModal').addEventListener('click', function (e) {
        if (e.target === this) {
            closeSubModal();
        }
    });

});

window.openSubModal = function (e) {
    if (e) e.preventDefault();
    document.getElementById('irBotModal').classList.add('active');
};

window.closeSubModal = function () {
    document.getElementById('irBotModal').classList.remove('active');
};
