// Performance utilities
const throttle = (func, limit) => {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// DOM Cache
const DOM = {
    scrollContent: null,
    stickyHeader: null,
    portfolioValue: null,
    tabButtons: null,
    tabContents: null,
    tabIndicator: null,
    pullToRefresh: null,
    pullIndicator: null,
    fundList: null,
    initialized: false
};

// Initialize DOM references
function initDOM() {
    if (DOM.initialized) return;

    DOM.scrollContent = document.querySelector('.scroll-content');
    DOM.stickyHeader = document.getElementById('stickyHeader');
    DOM.portfolioValue = document.querySelector('.portfolio-value');
    DOM.tabButtons = document.querySelectorAll('.tab-btn');
    DOM.tabContents = document.querySelectorAll('.tab-content');
    DOM.pullToRefresh = document.querySelector('.pull-to-refresh');
    DOM.pullIndicator = document.querySelector('.pull-indicator');
    DOM.fundList = document.querySelector('.holdings-list');

    DOM.initialized = true;
}

// Tab Management
class TabManager {
    constructor() {
        this.currentTab = 0;
        this.tabNames = ['holdings', 'sips', 'goals'];
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.minSwipeDistance = 50;
    }

    init() {
        this.setupTabIndicator();
        this.attachEventListeners();
        this.handleInitialHash();
    }

    handleInitialHash() {
        // Check if there's a hash in the URL on page load
        const hash = window.location.hash;
        if (hash) {
            const tabName = hash.replace('#', '').replace('-tab', '');
            const tabIndex = this.tabNames.indexOf(tabName);
            if (tabIndex !== -1) {
                // Ensure page scroll is at top FIRST
                window.scrollTo(0, 0);
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;

                // Switch to the correct tab
                this.switchTab(tabIndex);

                // Reset scroll position of the scrollable content area
                if (DOM.scrollContent) {
                    DOM.scrollContent.scrollTop = 0;
                    // Also force it after a brief delay to handle any browser auto-scrolling
                    setTimeout(() => {
                        DOM.scrollContent.scrollTop = 0;
                        window.scrollTo(0, 0);
                    }, 50);
                }
            }
        }
    }

    setupTabIndicator() {
        const tabsNav = document.querySelector('.tabs-nav');
        if (!tabsNav.querySelector('.tab-indicator')) {
            const indicator = document.createElement('div');
            indicator.className = 'tab-indicator';
            tabsNav.appendChild(indicator);
            DOM.tabIndicator = indicator;
        }
        this.updateIndicator();
    }

    updateIndicator() {
        if (!DOM.tabIndicator || !DOM.tabButtons[this.currentTab]) return;

        const activeTab = DOM.tabButtons[this.currentTab];
        const { offsetLeft, offsetWidth } = activeTab;

        DOM.tabIndicator.style.left = `${offsetLeft}px`;
        DOM.tabIndicator.style.width = `${offsetWidth}px`;
    }

    switchTab(index) {
        if (index < 0 || index >= this.tabNames.length) return;

        // Update active states
        DOM.tabButtons.forEach((btn, i) => {
            btn.classList.toggle('active', i === index);
        });

        DOM.tabContents.forEach((content, i) => {
            content.classList.toggle('active', i === index);
        });

        this.currentTab = index;
        this.updateIndicator();

        // Load data for new tab
        this.loadTabData(this.tabNames[index]);
    }

    loadTabData(tabName) {
        const content = document.getElementById(`${tabName}-tab`);
        if (!content) return;

        // V2: Skip loading for holdings tab (already initialized by initializeHoldingsV2)
        if (tabName === 'holdings') {
            content.dataset.loaded = 'true';
            return;
        }

        // Show skeleton loaders initially for other tabs
        if (!content.dataset.loaded) {
            this.showSkeletonLoader(content, tabName);

            // Simulate data loading
            setTimeout(() => {
                this.hideSkeletonLoader(content);
                content.dataset.loaded = 'true';
            }, 800);
        }
    }

    showSkeletonLoader(container, type) {
        const skeletonCount = 3;
        let skeletonHTML = '';

        for (let i = 0; i < skeletonCount; i++) {
            skeletonHTML += `
                <div class="skeleton skeleton-fund-card">
                    <div class="skeleton skeleton-text"></div>
                    <div class="skeleton skeleton-text-small"></div>
                </div>
            `;
        }

        container.innerHTML = skeletonHTML;
    }

    hideSkeletonLoader(container) {
        // Re-render actual content
        const tabName = container.id.replace('-tab', '');
        if (tabName === 'holdings') {
            container.innerHTML = this.getHoldingsHTML();
        } else if (tabName === 'sips') {
            container.innerHTML = this.getSIPsHTML();
        } else if (tabName === 'goals') {
            container.innerHTML = this.getGoalsHTML();
        }
    }

    getHoldingsHTML() {
        return `
            <div class="holdings-list">
                ${this.generateHoldingsCards()}
            </div>
        `;
    }

    generateHoldingsCards() {
        const funds = [
            { name: 'HDFC Liquid Fund', type: 'Debt • Liquid', amount: '₹45,200', returns: '+12.3%', allocation: 15.8, trend: [10, 15, 12, 18, 20, 22, 25] },
            { name: 'Axis Midcap Fund', type: 'Equity • Mid Cap', amount: '₹1,20,000', returns: '+42.1%', allocation: 42.1, trend: [20, 25, 30, 28, 35, 40, 42] },
            { name: 'SBI Small Cap Fund', type: 'Equity • Small Cap', amount: '₹75,680', returns: '+38.5%', allocation: 26.5, trend: [15, 20, 18, 25, 30, 35, 38] },
            { name: 'ICICI Prudential ELSS', type: 'Equity • Tax Saver', amount: '₹44,540', returns: '+28.7%', allocation: 15.6, locked: 'Mar 2025', trend: [12, 15, 18, 20, 22, 25, 28] }
        ];

        return funds.map(fund => `
            <div class="holdings-card">
                <div class="holdings-header">
                    <div class="holdings-name">${fund.name}</div>
                    <div class="holdings-amount">${fund.amount}</div>
                </div>
                <div class="holdings-details">
                    <div class="holdings-info">${fund.type} • ${fund.locked || 'No lock-in'}</div>
                    <div class="holdings-returns">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M7 14l5-5 5 5z"/>
                        </svg>
                        <span>${fund.returns}</span>
                    </div>
                </div>
                <div class="holdings-allocation">
                    <div class="holdings-allocation-header">
                        <span class="holdings-allocation-label">Portfolio allocation</span>
                        <span class="holdings-allocation-value">${fund.allocation}%</span>
                    </div>
                    <div class="holdings-progress-bar">
                        <div class="holdings-progress-fill" style="width: ${fund.allocation}%;"></div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    generateSparklinePoints(data) {
        const max = Math.max(...data);
        const min = Math.min(...data);
        const range = max - min || 1;
        const step = 100 / (data.length - 1);

        return data.map((value, index) => {
            const x = index * step;
            const y = 40 - ((value - min) / range) * 40;
            return `${x},${y}`;
        }).join(' ');
    }

    getSIPsHTML() {
        // Calculate summary from data
        const summary = calculateSIPSummary();

        // Format amounts with Indian number formatting
        const formatAmount = (num) => {
            return '₹' + num.toLocaleString('en-IN');
        };

        // Render SIP summary section
        const summaryHTML = `
            <div class="sip-summary-section">
                <div class="sip-summary-header">
                    <h3 class="sip-summary-title">SIP Overview</h3>
                </div>

                <!-- Row 1: Frequency Amounts -->
                <div class="sip-summary-grid-amounts">
                    ${summary.monthly > 0 ? `
                    <div class="sip-summary-item">
                        <div class="sip-value">${formatAmount(summary.monthly)}</div>
                        <div class="sip-label">Monthly</div>
                    </div>
                    ` : ''}
                    ${summary.weekly > 0 ? `
                    <div class="sip-summary-item">
                        <div class="sip-value">${formatAmount(summary.weekly)}</div>
                        <div class="sip-label">Weekly</div>
                    </div>
                    ` : ''}
                    ${summary.daily > 0 ? `
                    <div class="sip-summary-item">
                        <div class="sip-value">${formatAmount(summary.daily)}</div>
                        <div class="sip-label">Daily</div>
                    </div>
                    ` : ''}
                </div>

                <!-- Row 2: Counts -->
                <div class="sip-summary-grid-counts">
                    <div class="sip-summary-item">
                        <div class="sip-value">${summary.active}</div>
                        <div class="sip-label">Active SIPs</div>
                    </div>
                    <div class="sip-summary-item">
                        <div class="sip-value">${summary.totalFunds}</div>
                        <div class="sip-label">Funds</div>
                    </div>
                </div>
            </div>
        `;

        // Render filter chips
        const filterHTML = `
            <div class="sip-filter-section">
                <button class="filter-chip active" data-filter="all">All</button>
                <button class="filter-chip" data-filter="monthly">Monthly</button>
                <button class="filter-chip" data-filter="weekly">Weekly</button>
                <button class="filter-chip" data-filter="daily">Daily</button>
                <button class="filter-chip" data-filter="skipped">Skipped</button>
            </div>
        `;

        // Render SIP cards
        const cardsHTML = sipsData.map(sip => {
            const isSkipped = sip.status === 'skipped';
            const statusText = isSkipped ? 'Skipped' : '';

            // Render fund chips
            const fundChipsHTML = sip.funds.map(fund =>
                `<span class="fund-chip">${fund.name}</span>`
            ).join('');

            // Menu actions based on status
            const menuActions = isSkipped ? `
                <button class="sip-menu-item" onclick="event.stopPropagation(); viewSIPDetails('${sip.id}')">View Details</button>
                <button class="sip-menu-item" onclick="event.stopPropagation(); editSIP('${sip.id}')">Edit</button>
                <button class="sip-menu-item danger" onclick="event.stopPropagation(); stopSIP('${sip.id}')">Stop</button>
            ` : `
                <button class="sip-menu-item" onclick="event.stopPropagation(); viewSIPDetails('${sip.id}')">View Details</button>
                <button class="sip-menu-item" onclick="event.stopPropagation(); editSIP('${sip.id}')">Edit</button>
                <button class="sip-menu-item" onclick="event.stopPropagation(); skipNextSIP('${sip.id}')">Skip Next</button>
                <button class="sip-menu-item danger" onclick="event.stopPropagation(); stopSIP('${sip.id}')">Stop</button>
            `;

            return `
                <div class="sip-card ${isSkipped ? 'skipped' : ''}" data-frequency="${sip.frequency}" data-status="${sip.status}" onclick="viewSIPDetails('${sip.id}')">
                    <div class="sip-header-actions">
                        <button class="sip-menu-icon" onclick="event.stopPropagation(); toggleSIPMenu(event, '${sip.id}')">⋮</button>
                        <div class="sip-status"></div>
                    </div>
                    <div class="sip-menu-popup" id="menu-${sip.id}">
                        ${menuActions}
                    </div>

                    <div class="sip-amount">${formatAmount(sip.amount)}</div>
                    <div class="sip-frequency">${sip.frequency.charAt(0).toUpperCase() + sip.frequency.slice(1)} SIP${statusText ? ' • ' + statusText : ''}</div>
                    <div class="sip-next">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                        </svg>
                        ${sip.nextDebitFull}
                    </div>
                    <div class="sip-fund-chips">
                        ${fundChipsHTML}
                    </div>
                </div>
            `;
        }).join('');

        return `
            ${summaryHTML}
            ${filterHTML}
            <div class="sip-list">
                ${cardsHTML}
            </div>
        `;
    }

    getGoalsHTML() {
        const goals = [
            {
                icon: '<img src="assets/favicon.png" alt="NiveshPe" style="width: 20px; height: 20px; object-fit: contain;">',
                iconBg: 'background: white; padding: 6px;',
                name: 'NiveshPe Wealth',
                amount: '₹6,200',
                duration: '5 years',
                category: 'custom',
                tenure: 5,
                iconName: 'trending_up',
                funds: [
                    { name: 'Parag Parikh Flexi Cap' },
                    { name: 'Axis Bluechip Fund' },
                    { name: 'ICICI Pru Tech Fund' }
                ]
            },
            {
                icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M5,11L6.5,6.5H17.5L19,11M17.5,16A1.5,1.5 0 0,1 16,14.5A1.5,1.5 0 0,1 17.5,13A1.5,1.5 0 0,1 19,14.5A1.5,1.5 0 0,1 17.5,16M6.5,16A1.5,1.5 0 0,1 5,14.5A1.5,1.5 0 0,1 6.5,13A1.5,1.5 0 0,1 8,14.5A1.5,1.5 0 0,1 6.5,16M18.92,6C18.72,5.42 18.16,5 17.5,5H6.5C5.84,5 5.28,5.42 5.08,6L3,12V20A1,1 0 0,0 4,21H5A1,1 0 0,0 6,20V19H18V20A1,1 0 0,0 19,21H20A1,1 0 0,0 21,20V12L18.92,6Z"/></svg>',
                iconBg: '',
                name: 'Bike Fund',
                amount: '₹3,000',
                duration: '2 years',
                category: 'car',
                tenure: 3,
                iconName: 'directions_car',
                funds: [
                    { name: 'Kotak Emerging Equity' }
                ]
            }
        ];

        let html = '<div class="goals-list">';

        // Generate simple goal cards
        goals.forEach(goal => {
            // Render fund chips
            const fundChipsHTML = goal.funds.map(fund =>
                `<span class="fund-chip">${fund.name}</span>`
            ).join('');

            // Build goal detail URL
            const goalUrl = `goal-detail.html?name=${encodeURIComponent(goal.name)}&category=${goal.category}&tenure=${goal.tenure}&icon=${goal.iconName}`;

            html += `
                <div class="goals-card" onclick="window.location.href='${goalUrl}'" style="cursor: pointer;">
                    <div class="goals-header-row">
                        <div class="goals-name-section">
                            <div class="goals-icon" style="${goal.iconBg}">
                                ${goal.icon}
                            </div>
                            <div class="goals-info-wrapper">
                                <div class="goals-name">${goal.name}</div>
                                ${goal.duration ? `
                                    <div class="goals-duration">
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.7L16.2,16.2Z"/>
                                        </svg>
                                        ${goal.duration}
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                        <div class="goals-amount">${goal.amount}</div>
                    </div>
                    ${goal.funds && goal.funds.length > 0 ? `
                        <div class="goals-fund-chips">
                            ${fundChipsHTML}
                        </div>
                    ` : ''}
                </div>
            `;
        });

        // Add New Goal card
        html += `
            <div class="goals-card add-goal-card" onclick="window.location.href='create-goal.html'">
                <div class="add-goal-content">
                    <div class="add-goal-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                        </svg>
                    </div>
                    <div class="add-goal-text">Add New Goal</div>
                </div>
            </div>
        `;

        html += '</div>';
        return html;
    }

    attachEventListeners() {
        // Tab click handling
        DOM.tabButtons.forEach((btn, index) => {
            btn.addEventListener('click', () => this.switchTab(index));
        });

        // Swipe handling for tabs
        const tabContainer = document.querySelector('.tabs-container');

        tabContainer.addEventListener('touchstart', (e) => {
            this.touchStartX = e.touches[0].clientX;
        }, { passive: true });

        tabContainer.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].clientX;
            this.handleSwipe();
        }, { passive: true });
    }

    handleSwipe() {
        const diff = this.touchStartX - this.touchEndX;

        if (Math.abs(diff) > this.minSwipeDistance) {
            if (diff > 0 && this.currentTab < this.tabNames.length - 1) {
                this.switchTab(this.currentTab + 1);
            } else if (diff < 0 && this.currentTab > 0) {
                this.switchTab(this.currentTab - 1);
            }
        }
    }
}

// Scroll Manager
class ScrollManager {
    constructor() {
        this.lastScrollTop = 0;
        this.stickyHeaderTrigger = 120; // Trigger when portfolio value starts disappearing
    }

    init() {
        if (!DOM.scrollContent) return;

        // Throttled scroll handler
        const handleScroll = throttle(() => {
            requestAnimationFrame(() => this.onScroll());
        }, 16);

        DOM.scrollContent.addEventListener('scroll', handleScroll, { passive: true });
    }

    onScroll() {
        const scrollTop = DOM.scrollContent.scrollTop;

        // Sticky header
        this.updateStickyHeader(scrollTop);

        // Portfolio value parallax
        this.updateParallax(scrollTop);

        // Track scroll direction
        this.lastScrollTop = scrollTop;
    }

    updateStickyHeader(scrollTop) {
        if (!DOM.stickyHeader) return;

        if (scrollTop > this.stickyHeaderTrigger) {
            DOM.stickyHeader.classList.add('visible');
        } else {
            DOM.stickyHeader.classList.remove('visible');
        }
    }

    updateParallax(scrollTop) {
        if (!DOM.portfolioValue) return;

        const maxScroll = 200;
        const scale = Math.max(0.8, 1 - (scrollTop / maxScroll) * 0.2);
        const opacity = Math.max(0.3, 1 - (scrollTop / maxScroll) * 0.7);

        DOM.portfolioValue.style.transform = `scale(${scale})`;
        DOM.portfolioValue.style.opacity = opacity;
    }
}

// Pull to Refresh
class PullToRefresh {
    constructor() {
        this.startY = 0;
        this.currentY = 0;
        this.pulling = false;
        this.threshold = 80;
        this.refreshing = false;
    }

    init() {
        if (!DOM.scrollContent) return;

        // Create pull to refresh element
        this.createPullElement();

        // Attach listeners
        DOM.scrollContent.addEventListener('touchstart', (e) => this.onTouchStart(e), { passive: true });
        DOM.scrollContent.addEventListener('touchmove', (e) => this.onTouchMove(e), { passive: false });
        DOM.scrollContent.addEventListener('touchend', (e) => this.onTouchEnd(e), { passive: true });
    }

    createPullElement() {
        if (!DOM.pullToRefresh) {
            const pullElement = document.createElement('div');
            pullElement.className = 'pull-to-refresh';
            pullElement.innerHTML = '<div class="pull-indicator"></div>';
            DOM.scrollContent.insertBefore(pullElement, DOM.scrollContent.firstChild);
            DOM.pullToRefresh = pullElement;
            DOM.pullIndicator = pullElement.querySelector('.pull-indicator');
        }
    }

    onTouchStart(e) {
        if (DOM.scrollContent.scrollTop === 0) {
            this.startY = e.touches[0].clientY;
            this.pulling = true;
        }
    }

    onTouchMove(e) {
        if (!this.pulling || this.refreshing) return;

        this.currentY = e.touches[0].clientY;
        const pullDistance = this.currentY - this.startY;

        if (pullDistance > 0 && DOM.scrollContent.scrollTop === 0) {
            e.preventDefault();

            const opacity = Math.min(pullDistance / this.threshold, 1);
            const rotation = pullDistance * 3;

            DOM.pullToRefresh.style.transform = `translateY(${Math.min(pullDistance * 0.5, 60)}px)`;
            DOM.pullIndicator.style.opacity = opacity;
            DOM.pullIndicator.style.transform = `rotate(${rotation}deg)`;

            if (pullDistance > this.threshold) {
                DOM.pullToRefresh.classList.add('visible');
            } else {
                DOM.pullToRefresh.classList.remove('visible');
            }
        }
    }

    onTouchEnd() {
        if (!this.pulling || this.refreshing) return;

        const pullDistance = this.currentY - this.startY;

        if (pullDistance > this.threshold) {
            this.refresh();
        } else {
            this.reset();
        }

        this.pulling = false;
    }

    refresh() {
        this.refreshing = true;
        DOM.pullToRefresh.classList.add('refreshing');

        // Haptic feedback
        if (navigator.vibrate) {
            navigator.vibrate(10);
        }

        // Simulate refresh
        setTimeout(() => {
            this.onRefreshComplete();
        }, 1500);
    }

    onRefreshComplete() {
        // Update data
        const activeTab = document.querySelector('.tab-content.active');
        if (activeTab) {
            const tabManager = window.tabManager;
            if (tabManager) {
                tabManager.loadTabData(activeTab.id.replace('-tab', ''));
            }
        }

        this.reset();
        this.refreshing = false;

        // Show success feedback
        this.showRefreshSuccess();
    }

    showRefreshSuccess() {
        // Create success message
        const success = document.createElement('div');
        success.className = 'refresh-success';
        success.textContent = 'Updated just now';
        success.style.cssText = `
            position: fixed;
            top: 120px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--color-green);
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            z-index: 100;
            animation: slideDown 0.3s ease;
        `;

        document.body.appendChild(success);

        setTimeout(() => {
            success.style.animation = 'slideUp 0.3s ease';
            setTimeout(() => success.remove(), 300);
        }, 2000);
    }

    reset() {
        DOM.pullToRefresh.classList.remove('visible', 'refreshing');
        DOM.pullToRefresh.style.transform = '';
        DOM.pullIndicator.style.opacity = '';
        DOM.pullIndicator.style.transform = '';
    }
}

// Touch Feedback Manager
class TouchFeedback {
    init() {
        // Use event delegation for better performance
        document.addEventListener('touchstart', (e) => {
            const touchable = e.target.closest('.touchable, .fund-card, .sip-card, .goal-card, .portfolio-action-btn, .nav-item, button');
            if (touchable) {
                touchable.classList.add('touching');

                // Haptic feedback for buttons
                if (touchable.tagName === 'BUTTON' && navigator.vibrate) {
                    navigator.vibrate(5);
                }
            }
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            const touchable = e.target.closest('.touchable, .fund-card, .sip-card, .goal-card, .portfolio-action-btn, .nav-item, button');
            if (touchable) {
                setTimeout(() => {
                    touchable.classList.remove('touching');
                }, 100);
            }
        }, { passive: true });
    }
}

// Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.metrics = {
            fps: 0,
            loadTime: 0,
            interactionTime: 0
        };
    }

    init() {
        // Monitor FPS
        this.monitorFPS();

        // Track load time
        this.trackLoadTime();

        // Monitor interactions
        this.monitorInteractions();
    }

    monitorFPS() {
        let lastTime = performance.now();
        let frames = 0;

        const measureFPS = () => {
            frames++;
            const currentTime = performance.now();

            if (currentTime >= lastTime + 1000) {
                this.metrics.fps = Math.round((frames * 1000) / (currentTime - lastTime));
                frames = 0;
                lastTime = currentTime;

                // Log if FPS drops below 30
                if (this.metrics.fps < 30) {
                    console.warn('Low FPS detected:', this.metrics.fps);
                }
            }

            requestAnimationFrame(measureFPS);
        };

        measureFPS();
    }

    trackLoadTime() {
        if (window.performance && window.performance.timing) {
            window.addEventListener('load', () => {
                const timing = window.performance.timing;
                this.metrics.loadTime = timing.loadEventEnd - timing.navigationStart;
                console.log('Page load time:', this.metrics.loadTime + 'ms');
            });
        }
    }

    monitorInteractions() {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.entryType === 'measure') {
                    console.log(`${entry.name}: ${entry.duration}ms`);
                }
            }
        });

        observer.observe({ entryTypes: ['measure'] });
    }

    measure(name, fn) {
        const startMark = `${name}-start`;
        const endMark = `${name}-end`;

        performance.mark(startMark);
        const result = fn();
        performance.mark(endMark);
        performance.measure(name, startMark, endMark);

        return result;
    }
}

// ===== V2 ENHANCEMENTS =====

// Holdings data and sorting
let holdingsData = [];
let currentSort = 'current-value';  // Default sort

// Initialize holdings from fundsDataV2
// Skeleton loader utilities
function showSkeletons() {
    const assetSkeleton = document.getElementById('asset-allocation-skeleton');
    const holdingsSkeleton = document.getElementById('holdings-skeleton-container');
    const assetSection = document.getElementById('asset-allocation-section');
    const sortSection = document.querySelector('.sort-filter-section');

    if (assetSkeleton) assetSkeleton.style.display = 'block';
    if (holdingsSkeleton) holdingsSkeleton.style.display = 'block';
    if (assetSection) assetSection.style.display = 'none';
    if (sortSection) sortSection.style.display = 'none';
}

function hideSkeletons() {
    const assetSkeleton = document.getElementById('asset-allocation-skeleton');
    const holdingsSkeleton = document.getElementById('holdings-skeleton-container');
    const assetSection = document.getElementById('asset-allocation-section');
    const sortSection = document.querySelector('.sort-filter-section');

    if (assetSkeleton) assetSkeleton.style.display = 'none';
    if (holdingsSkeleton) holdingsSkeleton.style.display = 'none';
    if (assetSection) assetSection.style.display = 'block';
    if (sortSection) sortSection.style.display = 'block';
}

function initializeHoldingsV2() {
    if (typeof fundsDataV2 === 'undefined') {
        console.error('fundsDataV2 not loaded');
        return;
    }

    // Show skeletons first
    showSkeletons();

    // Simulate data loading (800ms delay)
    setTimeout(() => {
        // Convert fundsDataV2 object to array
        holdingsData = Object.keys(fundsDataV2).map(key => {
            const fund = fundsDataV2[key];
            return {
                id: key,
                name: fund.name,
                fundType: fund.fundType,
                lockIn: fund.lockIn,
                isLocked: fund.isLocked || false,
                lockInDate: fund.lockInDate || null,
                currentValue: fund.holdings.currentValue,
                investedAmount: fund.holdings.investedAmount,
                absoluteGain: fund.holdings.absoluteGain,
                percentageGain: fund.holdings.percentageGain
            };
        });

        // Sort by default (Current Value - High to Low)
        sortHoldings(currentSort);

        // Hide skeletons and show actual content
        hideSkeletons();

        // Mark holdings tab as loaded to prevent regeneration
        const holdingsTab = document.getElementById('holdings-tab');
        if (holdingsTab) {
            holdingsTab.dataset.loaded = 'true';
        }
    }, 800);
}

// Generate holdings card HTML
function generateHoldingsCard(fund) {
    const isPositive = fund.absoluteGain >= 0;
    const gainClass = isPositive ? 'positive' : 'negative';
    const arrowPath = isPositive ? 'M7 14l5-5 5 5z' : 'M7 10l5 5 5-5z';
    const signSymbol = isPositive ? '+' : '';

    return `
        <div class="holdings-card" onclick="navigateToFundDetail('${fund.id}')">
            <button class="actions-menu-btn" onclick="toggleActionsMenu('${fund.id}', event)" aria-label="Quick actions">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="5" r="2"/>
                    <circle cx="12" cy="12" r="2"/>
                    <circle cx="12" cy="19" r="2"/>
                </svg>
            </button>
            <div class="actions-dropdown" id="actions-menu-${fund.id}" style="display: none;">
                <div class="actions-menu-item" onclick="handleBuyMore('${fund.id}', event)">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
                    </svg>
                    <span>Buy More</span>
                </div>
                <div class="actions-menu-item" onclick="handleRedeem('${fund.id}', event)">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"/>
                    </svg>
                    <span>Redeem</span>
                </div>
            </div>
            <div class="holdings-header">
                <div class="holdings-name">${fund.name}</div>
                <svg class="holdings-arrow" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                </svg>
            </div>

            <div class="holdings-type">
                ${fund.fundType} • ${fund.lockIn}
            </div>

            <div class="holdings-investment-row">
                <div class="investment-item">
                    <span class="investment-label">Current</span>
                    <span class="investment-value">₹${fund.currentValue.toLocaleString('en-IN')}</span>
                </div>
                <div class="investment-item">
                    <span class="investment-label">Invested</span>
                    <span class="investment-value">₹${fund.investedAmount.toLocaleString('en-IN')}</span>
                </div>
                <div class="investment-item">
                    <span class="investment-label">Returns</span>
                    <span class="investment-value ${gainClass}">${signSymbol}${fund.percentageGain}%</span>
                </div>
            </div>
        </div>
    `;
}

// Render holdings list
function renderHoldings() {
    const holdingsList = document.getElementById('holdingsList');
    if (!holdingsList) return;

    holdingsList.innerHTML = holdingsData.map(fund => generateHoldingsCard(fund)).join('');
}

// Sort holdings
function sortHoldings(sortBy) {
    currentSort = sortBy;

    switch(sortBy) {
        case 'current-value':
            holdingsData.sort((a, b) => b.currentValue - a.currentValue);
            break;
        case 'returns':
            holdingsData.sort((a, b) => b.percentageGain - a.percentageGain);
            break;
        case 'invested':
            holdingsData.sort((a, b) => b.investedAmount - a.investedAmount);
            break;
        case 'alphabetical':
            holdingsData.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            holdingsData.sort((a, b) => b.currentValue - a.currentValue);
    }

    renderHoldings();
}

// Navigate to fund detail page
function navigateToFundDetail(fundId) {
    // Haptic feedback
    if (navigator.vibrate) {
        navigator.vibrate(5);
    }

    // Navigate to fund-detail.html with fund parameter
    window.location.href = `fund-detail.html?fund=${fundId}`;
}

// Quick Actions Menu Functions
function toggleActionsMenu(fundId, event) {
    event.stopPropagation(); // Prevent card click

    const menu = document.getElementById(`actions-menu-${fundId}`);
    const allMenus = document.querySelectorAll('.actions-dropdown');

    // Close all other menus
    allMenus.forEach(m => {
        if (m.id !== `actions-menu-${fundId}`) {
            m.style.display = 'none';
        }
    });

    // Toggle current menu
    if (menu) {
        menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
    }
}

// Close menus when clicking outside
document.addEventListener('click', (event) => {
    if (!event.target.closest('.actions-menu-btn') && !event.target.closest('.actions-dropdown')) {
        const allMenus = document.querySelectorAll('.actions-dropdown');
        allMenus.forEach(menu => menu.style.display = 'none');
    }
});

// Action handlers
function handleBuyMore(fundId, event) {
    event.stopPropagation(); // Prevent card click

    // Close menu
    const menu = document.getElementById(`actions-menu-${fundId}`);
    if (menu) menu.style.display = 'none';

    // Haptic feedback
    if (navigator.vibrate) {
        navigator.vibrate(10);
    }

    // TODO: Implement Buy More functionality
    console.log(`Buy More action for fund: ${fundId}`);
    alert(`Buy More: ${fundId}\n\nThis would open the investment screen.`);
}

function handleRedeem(fundId, event) {
    event.stopPropagation(); // Prevent card click

    // Close menu
    const menu = document.getElementById(`actions-menu-${fundId}`);
    if (menu) menu.style.display = 'none';

    // Haptic feedback
    if (navigator.vibrate) {
        navigator.vibrate(10);
    }

    // TODO: Implement Redeem functionality
    console.log(`Redeem action for fund: ${fundId}`);
    alert(`Redeem: ${fundId}\n\nThis would open the redemption screen.`);
}

function handleViewDetails(fundId, event) {
    event.stopPropagation(); // Prevent card click

    // Close menu
    const menu = document.getElementById(`actions-menu-${fundId}`);
    if (menu) menu.style.display = 'none';

    // Navigate to fund detail
    navigateToFundDetail(fundId);
}

// Chart functionality removed - now handled in portfolio-allocation.html

// Immediately disable scroll restoration and reset scroll position BEFORE any rendering
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Force scroll to top immediately if coming from another page with hash
if (window.location.hash && document.readyState === 'loading') {
    // Use multiple strategies to ensure scroll reset happens
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
}

// Global SIP Functions

// Filter SIPs
function filterSIPs(filterType) {
    const sipCards = document.querySelectorAll('.sip-card');
    const filterChips = document.querySelectorAll('.filter-chip');

    // Update active filter chip
    filterChips.forEach(chip => {
        if (chip.dataset.filter === filterType) {
            chip.classList.add('active');
        } else {
            chip.classList.remove('active');
        }
    });

    // Show/hide cards based on filter
    sipCards.forEach(card => {
        const cardFrequency = card.dataset.frequency;
        const cardStatus = card.dataset.status;

        if (filterType === 'all') {
            card.style.display = 'block';
        } else if (filterType === 'skipped') {
            card.style.display = cardStatus === 'skipped' ? 'block' : 'none';
        } else {
            card.style.display = (cardFrequency === filterType && cardStatus === 'active') ? 'block' : 'none';
        }
    });
}

// Toggle SIP menu
function toggleSIPMenu(event, sipId) {
    event.stopPropagation();
    const menu = document.getElementById(`menu-${sipId}`);
    const allMenus = document.querySelectorAll('.sip-menu-popup');

    // Close all other menus
    allMenus.forEach(m => {
        if (m.id !== `menu-${sipId}`) {
            m.classList.remove('show');
        }
    });

    // Toggle current menu
    menu.classList.toggle('show');
}

// Close menus when clicking outside
document.addEventListener('click', () => {
    document.querySelectorAll('.sip-menu-popup').forEach(menu => {
        menu.classList.remove('show');
    });
});

// SIP Actions
// ======================================
// SIP Modal Functions
// ======================================

let currentSIPId = null;

// Edit SIP Modal
function editSIP(sipId) {
    currentSIPId = sipId;
    const sip = sipsData.find(s => s.id === sipId);
    if (!sip) return;

    // Populate form with current SIP data
    document.getElementById('sipAmount').value = sip.amount;
    document.getElementById('sipDate').value = sip.nextDebit;

    // Show modal
    const modal = document.getElementById('editSIPModal');
    modal.classList.add('show');

    // Close menu
    document.getElementById(`menu-${sipId}`).classList.remove('show');
}

function closeEditSIPModal() {
    const modal = document.getElementById('editSIPModal');
    modal.classList.remove('show');
    currentSIPId = null;
}

function saveEditSIP() {
    if (!currentSIPId) return;

    // Get form values
    const amount = parseInt(document.getElementById('sipAmount').value);
    const date = document.getElementById('sipDate').value;

    // Close edit modal
    closeEditSIPModal();

    // Store pending action and show OTP
    pendingAction = {
        type: 'edit',
        sipId: currentSIPId,
        data: {
            amount,
            date
        }
    };

    showOTPModal('edit');
}

// Skip Next SIP Modal
function skipNextSIP(sipId) {
    currentSIPId = sipId;
    const sip = sipsData.find(s => s.id === sipId);
    if (!sip) return;

    // Set skip date display
    document.getElementById('skipDateDisplay').textContent = sip.nextDebit;

    // Show confirmation modal
    const modal = document.getElementById('skipSIPModal');
    modal.classList.add('show');

    // Close menu
    document.getElementById(`menu-${sipId}`).classList.remove('show');
}

function closeSkipSIPModal() {
    const modal = document.getElementById('skipSIPModal');
    modal.classList.remove('show');
    currentSIPId = null;
}

function confirmSkipSIP() {
    if (!currentSIPId) return;

    const sip = sipsData.find(s => s.id === currentSIPId);
    if (!sip) return;

    // Close skip modal
    closeSkipSIPModal();

    // Store pending action and show OTP
    pendingAction = {
        type: 'skip',
        sipId: currentSIPId,
        data: {
            skipDate: sip.nextDebit
        }
    };

    showOTPModal('skip');
}

// Cancel/Stop SIP Modal
function stopSIP(sipId) {
    currentSIPId = sipId;

    // Show confirmation modal
    const modal = document.getElementById('cancelSIPModal');
    modal.classList.add('show');

    // Close menu
    document.getElementById(`menu-${sipId}`).classList.remove('show');
}

function closeCancelSIPModal() {
    const modal = document.getElementById('cancelSIPModal');
    modal.classList.remove('show');
    currentSIPId = null;
}

function confirmCancelSIP() {
    if (!currentSIPId) return;

    // Close cancel modal
    closeCancelSIPModal();

    // Store pending action and show OTP
    pendingAction = {
        type: 'stop',
        sipId: currentSIPId,
        data: {}
    };

    showOTPModal('stop');
}

// View SIP Details Modal
function viewSIPDetails(sipId) {
    const sip = sipsData.find(s => s.id === sipId);
    if (!sip) return;

    // Build details HTML
    const detailsHTML = `
        <div style="margin-bottom: 20px;">
            <div style="font-size: 28px; font-weight: 700; color: #111827; margin-bottom: 4px;">
                ₹${sip.amount.toLocaleString('en-IN')}
            </div>
            <div style="font-size: 14px; color: #6B7280;">
                ${sip.frequency.charAt(0).toUpperCase() + sip.frequency.slice(1)} SIP
            </div>
        </div>

        <div style="background: #F9FAFB; border-radius: 12px; padding: 16px; margin-bottom: 20px;">
            <div style="font-size: 13px; font-weight: 600; color: #111827; margin-bottom: 12px;">SIP Information</div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span style="color: #6B7280; font-size: 14px;">Status</span>
                <span style="color: ${sip.status === 'active' ? '#10B981' : '#F59E0B'}; font-weight: 600; font-size: 14px;">
                    ${sip.status === 'active' ? 'Active' : 'Paused'}
                </span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span style="color: #6B7280; font-size: 14px;">Frequency</span>
                <span style="color: #111827; font-weight: 500; font-size: 14px;">
                    ${sip.frequency.charAt(0).toUpperCase() + sip.frequency.slice(1)}
                </span>
            </div>
            <div style="display: flex; justify-content: space-between;">
                <span style="color: #6B7280; font-size: 14px;">Next Debit</span>
                <span style="color: #111827; font-weight: 500; font-size: 14px;">${sip.nextDebit}</span>
            </div>
        </div>

        <div style="margin-bottom: 12px;">
            <div style="font-size: 13px; font-weight: 600; color: #111827; margin-bottom: 8px;">Funds (${sip.funds.length})</div>
            <div style="display: flex; flex-direction: column; gap: 8px;">
                ${sip.funds.map(fund => `
                    <div style="padding: 12px; background: white; border: 1px solid #E5E7EB; border-radius: 8px; font-size: 14px; color: #111827;">
                        ${fund.name}
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    // Populate modal
    document.getElementById('sipDetailsContent').innerHTML = detailsHTML;

    // Show modal
    const modal = document.getElementById('viewDetailsModal');
    modal.classList.add('show');

    // Close menu
    document.getElementById(`menu-${sipId}`).classList.remove('show');
}

function closeViewDetailsModal() {
    const modal = document.getElementById('viewDetailsModal');
    modal.classList.remove('show');
}

// ======================================
// OTP Verification System
// ======================================

let pendingAction = null;

function showOTPModal(actionType) {
    // Update subtitle based on action
    const subtitle = document.getElementById('otpSubtitle');
    if (actionType === 'edit') {
        subtitle.textContent = 'Confirm SIP changes with the 4-digit code sent to your registered mobile';
    } else if (actionType === 'skip') {
        subtitle.textContent = 'Confirm skipping installment with the 4-digit code sent to your registered mobile';
    } else if (actionType === 'stop') {
        subtitle.textContent = 'Confirm stopping SIP with the 4-digit code sent to your registered mobile';
    }

    // Show OTP modal
    const modal = document.getElementById('otpOverlay');
    modal.classList.add('show');

    // Focus first OTP input
    setTimeout(() => {
        document.getElementById('otp1').focus();
    }, 300);
}

function closeOTPModal() {
    const modal = document.getElementById('otpOverlay');
    const otpModal = document.querySelector('.otp-overlay-modal');
    const backdrop = document.querySelector('.otp-overlay-backdrop');

    otpModal.style.animation = 'otpSlideDown 0.3s ease-out';
    backdrop.style.animation = 'otpFadeOut 0.3s ease-out';

    setTimeout(() => {
        modal.classList.remove('show');

        // Clear all inputs
        const otpInputs = document.querySelectorAll('.otp-input');
        otpInputs.forEach(input => {
            input.value = '';
            input.classList.remove('filled');
        });

        // Reset verify button
        const verifyBtn = document.getElementById('verifyOtpBtn');
        verifyBtn.classList.remove('enabled');

        // Reset animations
        otpModal.style.animation = '';
        backdrop.style.animation = '';

        // Clear pending action
        pendingAction = null;
    }, 300);
}

function verifyOTP() {
    const otpInputs = document.querySelectorAll('.otp-input');
    const otpValue = Array.from(otpInputs).map(input => input.value).join('');

    if (otpValue.length !== 4) return;

    // Close OTP modal
    closeOTPModal();

    // Execute pending action
    if (!pendingAction) return;

    if (pendingAction.type === 'edit') {
        // Apply edit changes
        const sipIndex = sipsData.findIndex(s => s.id === pendingAction.sipId);
        if (sipIndex !== -1) {
            sipsData[sipIndex].amount = pendingAction.data.amount;
            sipsData[sipIndex].nextDebit = pendingAction.data.date;
            sipsData[sipIndex].nextDebitFull = `Next debit on ${pendingAction.data.date}`;

            // Re-render
            refreshSIPList();

            // Show success toast
            showToast('SIP updated successfully');
        }
    } else if (pendingAction.type === 'skip') {
        // Apply skip
        const sipIndex = sipsData.findIndex(s => s.id === pendingAction.sipId);
        if (sipIndex !== -1) {
            sipsData[sipIndex].status = 'skipped';
            sipsData[sipIndex].skippedDate = pendingAction.data.skipDate;
            sipsData[sipIndex].nextDebitFull = `Skipped: ${pendingAction.data.skipDate}`;

            // Re-render
            refreshSIPList();

            // Show success toast
            showToast('SIP installment skipped successfully');
        }
    } else if (pendingAction.type === 'stop') {
        // Remove SIP from array
        const sipIndex = sipsData.findIndex(s => s.id === pendingAction.sipId);
        if (sipIndex !== -1) {
            sipsData.splice(sipIndex, 1);

            // Re-render
            refreshSIPList();

            // Show success toast
            showToast('SIP stopped successfully');
        }
    }

    pendingAction = null;
}

function resendOTP() {
    // Clear all inputs
    const otpInputs = document.querySelectorAll('.otp-input');
    otpInputs.forEach(input => {
        input.value = '';
        input.classList.remove('filled');
    });

    // Focus first input
    document.getElementById('otp1').focus();

    // Disable verify button
    document.getElementById('verifyOtpBtn').classList.remove('enabled');

    // Show feedback
    showToast('OTP sent successfully');
}

// Helper function to refresh SIP list
function refreshSIPList() {
    const sipsTab = document.getElementById('sips-tab');
    if (sipsTab) {
        const tabContent = window.tabManager.tabs.find(t => t.id === 'sips').content;
        sipsTab.innerHTML = tabContent.getSIPsHTML();

        // Re-initialize filter chips
        setTimeout(() => {
            const filterChips = document.querySelectorAll('.filter-chip');
            filterChips.forEach(chip => {
                chip.addEventListener('click', () => {
                    filterSIPs(chip.dataset.filter);
                });
            });
        }, 100);
    }
}

// Toast notification
function showToast(message) {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) existingToast.remove();

    // Create toast
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    toast.style.cssText = `
        position: absolute;
        bottom: 80px;
        left: 50%;
        transform: translateX(-50%);
        background: #111827;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        z-index: 2000;
        animation: toastSlideUp 0.3s ease;
    `;

    // Append to mobile-container or iphone-screen
    const container = document.querySelector('.iphone-screen') || document.body;
    container.appendChild(toast);

    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'toastSlideDown 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        closeEditSIPModal();
        closeSkipSIPModal();
        closeCancelSIPModal();
        closeViewDetailsModal();
    }
});

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    // Initialize DOM cache
    initDOM();

    // Initialize managers
    window.tabManager = new TabManager();
    window.scrollManager = new ScrollManager();
    window.pullToRefresh = new PullToRefresh();
    window.touchFeedback = new TouchFeedback();
    window.performanceMonitor = new PerformanceMonitor();

    // Initialize all systems
    window.tabManager.init();
    window.scrollManager.init();
    window.pullToRefresh.init();
    window.touchFeedback.init();
    window.performanceMonitor.init();

    // Initialize V2 features
    initializeHoldingsV2();

    // Initialize SIP filter chips
    setTimeout(() => {
        const filterChips = document.querySelectorAll('.filter-chip');
        filterChips.forEach(chip => {
            chip.addEventListener('click', () => {
                filterSIPs(chip.dataset.filter);
            });
        });
    }, 100);

    // Initialize OTP Input Handling
    const otpInputs = document.querySelectorAll('.otp-input');
    otpInputs.forEach((input, index) => {
        input.addEventListener('input', function(e) {
            const value = e.target.value;

            if (value && /^[0-9]$/.test(value)) {
                this.classList.add('filled');

                // Move to next input
                if (index < otpInputs.length - 1) {
                    otpInputs[index + 1].focus();
                }

                // Check if all inputs are filled
                checkOTPComplete();
            } else {
                this.classList.remove('filled');
                this.value = '';
            }
        });

        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && !this.value && index > 0) {
                otpInputs[index - 1].focus();
                otpInputs[index - 1].classList.remove('filled');
                otpInputs[index - 1].value = '';
            }
        });

        input.addEventListener('paste', function(e) {
            e.preventDefault();
            const pastedData = e.clipboardData.getData('text').replace(/\D/g, '');

            if (pastedData.length === 4) {
                otpInputs.forEach((inp, i) => {
                    if (pastedData[i]) {
                        inp.value = pastedData[i];
                        inp.classList.add('filled');
                    }
                });
                checkOTPComplete();
            }
        });
    });

    function checkOTPComplete() {
        const filledInputs = document.querySelectorAll('.otp-input.filled');
        const verifyBtn = document.getElementById('verifyOtpBtn');

        if (filledInputs.length === 4) {
            verifyBtn.classList.add('enabled');
        } else {
            verifyBtn.classList.remove('enabled');
        }
    }

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from { transform: translate(-50%, -20px); opacity: 0; }
            to { transform: translate(-50%, 0); opacity: 1; }
        }
        @keyframes slideUp {
            from { transform: translate(-50%, 0); opacity: 1; }
            to { transform: translate(-50%, -20px); opacity: 0; }
        }
        .touching {
            transform: scale(0.95) !important;
        }
    `;
    document.head.appendChild(style);

    console.log('My Funds v2 page initialized with Skip + OTP functionality');
});