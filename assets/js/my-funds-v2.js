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
        return `
            <div class="sip-list">
                <div class="sip-card">
                    <div class="sip-status"></div>
                    <div class="sip-amount">₹10,000</div>
                    <div class="sip-frequency">Monthly SIP</div>
                    <div class="sip-next">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                        </svg>
                        Next debit on 25th Sep
                    </div>
                    <div class="sip-funds">
                        Investing in 3 funds: Axis Midcap, SBI Small Cap, HDFC Liquid
                    </div>
                    <div class="sip-actions">
                        <button class="sip-action-btn">Edit</button>
                        <button class="sip-action-btn">Pause</button>
                        <button class="sip-action-btn">Stop</button>
                    </div>
                </div>
                <div class="sip-card">
                    <div class="sip-status"></div>
                    <div class="sip-amount">₹5,000</div>
                    <div class="sip-frequency">Weekly SIP</div>
                    <div class="sip-next">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                        </svg>
                        Every Monday
                    </div>
                    <div class="sip-funds">
                        Investing in HDFC Liquid Fund
                    </div>
                    <div class="sip-actions">
                        <button class="sip-action-btn">Edit</button>
                        <button class="sip-action-btn">Pause</button>
                        <button class="sip-action-btn">Stop</button>
                    </div>
                </div>
            </div>
        `;
    }

    getGoalsHTML() {
        const goals = [
            {
                icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"/></svg>',
                name: 'Dream Home', target: '₹15,00,000', achieved: '₹5,25,000', progress: 35, status: 'On track', statusClass: 'on-track', remaining: '3.5 years'
            },
            {
                icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.5 16,12.1 16,12.7V16.2C16,16.8 15.4,17.3 14.8,17.3H9.2C8.6,17.3 8,16.8 8,16.2V12.8C8,12.2 8.6,11.6 9.2,11.6V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,9.5V11.5H13.5V9.5C13.5,8.7 12.8,8.2 12,8.2Z"/></svg>',
                name: 'Child Education', target: '₹25,00,000', achieved: '₹3,75,000', progress: 15, status: 'On track', statusClass: 'on-track', remaining: '8 years'
            },
            {
                icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M5,11L6.5,6.5H17.5L19,11M17.5,16A1.5,1.5 0 0,1 16,14.5A1.5,1.5 0 0,1 17.5,13A1.5,1.5 0 0,1 19,14.5A1.5,1.5 0 0,1 17.5,16M6.5,16A1.5,1.5 0 0,1 5,14.5A1.5,1.5 0 0,1 6.5,13A1.5,1.5 0 0,1 8,14.5A1.5,1.5 0 0,1 6.5,16M18.92,6C18.72,5.42 18.16,5 17.5,5H6.5C5.84,5 5.28,5.42 5.08,6L3,12V20A1,1 0 0,0 4,21H5A1,1 0 0,0 6,20V19H18V20A1,1 0 0,0 19,21H20A1,1 0 0,0 21,20V12L18.92,6Z"/></svg>',
                name: 'New Car', target: '₹8,00,000', achieved: '₹4,80,000', progress: 60, status: 'Behind schedule', statusClass: 'behind', remaining: '1 year'
            }
        ];

        return `
            <div class="goals-list">
                ${goals.map(goal => `
                    <div class="goals-card">
                        <div class="goals-header">
                            <div class="goals-icon">${goal.icon}</div>
                            <div class="goals-info">
                                <div class="goals-name">${goal.name}</div>
                                <div class="goals-target">Target: ${goal.target}</div>
                            </div>
                        </div>
                        <div class="goals-amounts">
                            <div class="goals-achieved">${goal.achieved} achieved</div>
                            <div class="goals-percentage">${goal.progress}%</div>
                        </div>
                        <div class="goals-progress">
                            <div class="goals-progress-bar">
                                <div class="goals-progress-fill ${goal.statusClass}" style="width: ${goal.progress}%;"></div>
                            </div>
                        </div>
                        <div class="goals-footer">
                            <div class="goals-status ${goal.statusClass}">${goal.status}</div>
                            <div class="goals-timeline">${goal.remaining} remaining</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
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

    console.log('My Funds v2 page initialized with optimizations');
});