// Basket Data Structure
// Each basket contains all the dynamic content for the basket-details page

const BASKETS_DATA = {
    'balanced-returns': {
        id: 'balanced-returns',
        title: 'Balanced Returns Fund',
        tagline: 'A perfect balance of growth and safety',
        returns: '12.5%',
        returnsSubtitle: '1 Year Rolling Return',
        holdingPeriod: '8+ months',
        minSip: '₹100/mo',
        minLumpsum: '₹500',
        annualReturn: 0.125, // For calculator

        // Descriptive content
        whatIsThis: 'A mix of growth-focused and stable investments that balance high returns with safety.',

        whyThisBasket: [
            'Balanced mix reduces big losses',
            'Better returns than only debt/FD',
            'Withdraw anytime after 8+ months',
            'Works well across market cycles'
        ],

        howItWorks: 'This basket automatically spreads your money across equity (for growth), debt (for stability), gold (for protection), and index funds (for market returns). The mix adjusts based on market conditions.',

        // Fund allocation (for fund capsules)
        funds: [
            { name: 'Equity Fund', allocation: 40, color: '#3B82F6' },
            { name: 'Debt Fund', allocation: 30, color: '#10B981' },
            { name: 'Gold Fund', allocation: 15, color: '#F59E0B' },
            { name: 'Index Fund', allocation: 15, color: '#8B5CF6' }
        ]
    },

    'tax-saver': {
        id: 'tax-saver',
        title: 'Tax Saver (ELSS)',
        tagline: 'Invest smartly and save tax under 80C',
        returns: '24.05%',
        returnsSubtitle: '1 Year Rolling Return',
        holdingPeriod: '3+ years',
        minSip: '₹500/mo',
        minLumpsum: '₹500',
        annualReturn: 0.2405, // For calculator

        whatIsThis: 'An Equity Linked Savings Scheme (ELSS) that offers tax deduction up to ₹1.5 lakh under Section 80C while providing equity-linked returns.',

        whyThisBasket: [
            'Save up to ₹46,800 in taxes',
            'Shortest lock-in among 80C options',
            'Equity-linked high returns',
            'Dual benefit of tax saving + wealth creation'
        ],

        howItWorks: 'This ELSS fund invests primarily in equity markets with a mandatory 3-year lock-in period. Your investment qualifies for tax deduction under Section 80C, while your money grows through equity exposure.',

        funds: [
            { name: 'HDFC ELSS Tax saver - Growth Plan', allocation: 100, color: '#10B981' }
        ]
    },

    'instant-withdrawal': {
        id: 'instant-withdrawal',
        title: 'Instant Withdrawal',
        tagline: 'Save safely, withdraw anytime instantly',
        returns: '5.45%',
        returnsSubtitle: '1 Year Rolling Return',
        holdingPeriod: '<1 month',
        minSip: '₹100/mo',
        minLumpsum: '₹500',
        annualReturn: 0.0545, // For calculator

        whatIsThis: 'A highly liquid fund that invests primarily in short-term debt instruments, allowing you to withdraw your money instantly without any lock-in or exit load.',

        whyThisBasket: [
            'Instant redemption anytime',
            'No lock-in period required',
            'Better than savings account',
            'Perfect for emergency funds'
        ],

        howItWorks: 'This basket invests in ultra-short-term debt securities and liquid instruments that can be converted to cash within 24 hours. Your money stays safe while earning steady returns.',

        funds: [
            { name: 'HDFC Overnight Fund - Growth', allocation: 100, color: '#06B6D4' }
        ]
    },

    'long-term-wealth': {
        id: 'long-term-wealth',
        title: 'Long-Term Wealth (3+ yrs)',
        tagline: 'Build long-term wealth. Best for 3+ years of saving',
        returns: '23.97%',
        returnsSubtitle: '1 Year Rolling Return',
        holdingPeriod: '3+ years',
        minSip: '₹100/mo',
        minLumpsum: '₹500',
        annualReturn: 0.2397, // For calculator

        whatIsThis: 'An aggressive growth fund that invests heavily in equities and high-growth sectors to maximize returns over the long term.',

        whyThisBasket: [
            'Highest potential returns',
            'Invests in top-performing stocks',
            'Diversified across growth sectors',
            'Best for long-term wealth creation'
        ],

        howItWorks: 'This basket allocates 70% to Multi Cap funds for diversified equity exposure and 30% to Balanced Advantage funds for stability during market corrections.',

        funds: [
            { name: 'Multi Cap Fund (70%)', allocation: 70, color: '#EC4899' },
            { name: 'Balanced Advantage Fund (30%)', allocation: 30, color: '#8B5CF6' }
        ]
    },

    'islamic-halal-ethical': {
        id: 'islamic-halal-ethical',
        title: 'Islamic Halal & Ethical',
        tagline: '100% Shariah-compliant, ethical & clean investing',
        returns: '15.16%',
        returnsSubtitle: '1 Year Rolling Return',
        holdingPeriod: '3+ years',
        minSip: '₹100/mo',
        minLumpsum: '₹500',
        annualReturn: 0.1516,

        whatIsThis: 'An ethical fund that invests only in Shariah-compliant companies, avoiding interest-based businesses, alcohol, tobacco, and other prohibited sectors.',

        whyThisBasket: [
            '100% Shariah-compliant investments',
            'Ethical and socially responsible',
            'Diversified across halal sectors',
            'Long-term wealth creation with values'
        ],

        howItWorks: 'This fund screens companies based on Islamic principles, investing only in businesses that align with Shariah guidelines while generating competitive returns.',

        funds: [
            { name: 'Tata Ethical Fund - Regular - Growth', allocation: 100, color: '#14B8A6' }
        ]
    },

    'safe-stable-fd': {
        id: 'safe-stable-fd',
        title: 'Safe & Stable – Better than FD',
        tagline: 'Better than FD — steady growth, zero drama',
        returns: '5.99%',
        returnsSubtitle: '1 Year Rolling Return',
        holdingPeriod: '1-3 years',
        minSip: '₹100/mo',
        minLumpsum: '₹500',
        annualReturn: 0.0599,

        whatIsThis: 'A debt fund that invests in high-quality banking and PSU bonds, offering better returns than fixed deposits with minimal risk.',

        whyThisBasket: [
            'Better returns than FD',
            'Very low risk profile',
            'Tax-efficient compared to FDs',
            'High credit quality investments'
        ],

        howItWorks: 'This fund invests in bonds issued by banks and public sector undertakings, providing stable returns with high safety of capital.',

        funds: [
            { name: 'HDFC Banking & PSU Debt - Growth', allocation: 100, color: '#3B82F6' }
        ]
    },

    'mid-term-balanced': {
        id: 'mid-term-balanced',
        title: 'Mid-Term Balanced (>2 yrs)',
        tagline: 'Balanced growth for 2+ year saving goals',
        returns: '19.86%',
        returnsSubtitle: '1 Year Rolling Return',
        holdingPeriod: '2-3 years',
        minSip: '₹100/mo',
        minLumpsum: '₹500',
        annualReturn: 0.1986,

        whatIsThis: 'A balanced fund designed for medium-term investment horizons, combining growth potential with risk management.',

        whyThisBasket: [
            'Ideal for 2-3 year goals',
            'Balanced risk-return profile',
            'Dynamic asset allocation',
            'Works well in various market cycles'
        ],

        howItWorks: 'This basket allocates 60% to Balanced Advantage funds for flexibility and 40% to Nifty 50 index for stable growth.',

        funds: [
            { name: 'Balanced Advantage Fund (60%)', allocation: 60, color: '#8B5CF6' },
            { name: 'Nifty 50 Index Fund (40%)', allocation: 40, color: '#3B82F6' }
        ]
    },

    'short-holding': {
        id: 'short-holding',
        title: 'Short Holding (1 yr)',
        tagline: 'Ideal for short-term saving (around 1 year)',
        returns: '20.83%',
        returnsSubtitle: '1 Year Rolling Return',
        holdingPeriod: '1-2 years',
        minSip: '₹100/mo',
        minLumpsum: '₹500',
        annualReturn: 0.2083,

        whatIsThis: 'A fund designed for short to medium-term goals, balancing growth with the flexibility to exit within 1-2 years.',

        whyThisBasket: [
            'Suitable for 1-2 year goals',
            'Higher allocation to stable funds',
            'Flexibility to withdraw early',
            'Good risk-adjusted returns'
        ],

        howItWorks: 'This basket allocates 80% to Balanced Advantage funds for stability and 20% to Nifty 50 for equity exposure.',

        funds: [
            { name: 'Balanced Advantage Fund (80%)', allocation: 80, color: '#8B5CF6' },
            { name: 'Nifty 50 Index Fund (20%)', allocation: 20, color: '#3B82F6' }
        ]
    },

    'low-tenure-deposit': {
        id: 'low-tenure-deposit',
        title: 'Low-tenure deposit (<1 yr)',
        tagline: 'Invest for short duration, Earn better than FD, withdraw anytime you need',
        returns: '6.47%',
        returnsSubtitle: '1 Year Rolling Return',
        holdingPeriod: '6-12 months',
        minSip: '₹100/mo',
        minLumpsum: '₹500',
        annualReturn: 0.0647,

        whatIsThis: 'A short-term investment option that provides better returns than savings accounts while keeping your money accessible.',

        whyThisBasket: [
            'Perfect for 6-12 month parking',
            'Better than savings account',
            'Low risk profile',
            'Easy withdrawal options'
        ],

        howItWorks: 'This basket combines 60% Overnight funds for liquidity and 40% Balanced Advantage for additional returns.',

        funds: [
            { name: 'Overnight Fund (60%)', allocation: 60, color: '#06B6D4' },
            { name: 'Balanced Advantage Fund (40%)', allocation: 40, color: '#8B5CF6' }
        ]
    },

    'ideal-students': {
        id: 'ideal-students',
        title: 'Ideal for Students',
        tagline: 'Save pocket money & learn to grow your investments',
        returns: '22.38%',
        returnsSubtitle: '1 Year Rolling Return',
        holdingPeriod: '3-5 years',
        minSip: '₹100/mo',
        minLumpsum: '₹500',
        annualReturn: 0.2238,

        whatIsThis: 'A growth-oriented fund perfect for students starting their investment journey with a long-term perspective.',

        whyThisBasket: [
            'Start with small amounts',
            'High growth potential',
            'Learn investing early',
            'Build wealth for future goals'
        ],

        howItWorks: 'This basket balances 50% in Balanced Advantage funds for stability and 50% in Large & MidCap funds for aggressive growth.',

        funds: [
            { name: 'Balanced Advantage Fund (50%)', allocation: 50, color: '#8B5CF6' },
            { name: 'Large & MidCap Fund (50%)', allocation: 50, color: '#EC4899' }
        ]
    },

    'ideal-housewives': {
        id: 'ideal-housewives',
        title: 'Ideal for Housewives',
        tagline: 'Easy, flexible savings for household needs',
        returns: '20.37%',
        returnsSubtitle: '1 Year Rolling Return',
        holdingPeriod: '2-3 years',
        minSip: '₹100/mo',
        minLumpsum: '₹500',
        annualReturn: 0.2037,

        whatIsThis: 'A balanced fund designed for homemakers looking to build wealth and achieve financial independence.',

        whyThisBasket: [
            'Start with small investments',
            'Build personal savings',
            'Financial independence',
            'Medium-term wealth creation'
        ],

        howItWorks: 'This basket allocates 70% to Balanced Advantage for stable growth and 30% to Nifty 50 for equity exposure.',

        funds: [
            { name: 'Balanced Advantage Fund (70%)', allocation: 70, color: '#8B5CF6' },
            { name: 'Nifty 50 Index Fund (30%)', allocation: 30, color: '#3B82F6' }
        ]
    },

    'ideal-senior-citizens': {
        id: 'ideal-senior-citizens',
        title: 'Ideal for Senior Citizens',
        tagline: 'Safer savings for regular income & peace of mind',
        returns: '20.83%',
        returnsSubtitle: '1 Year Rolling Return',
        holdingPeriod: '1-2 years',
        minSip: '₹100/mo',
        minLumpsum: '₹500',
        annualReturn: 0.2083,

        whatIsThis: 'A conservative fund designed for senior citizens prioritizing capital protection with reasonable returns.',

        whyThisBasket: [
            'Capital protection priority',
            'Regular return potential',
            'Low to moderate risk',
            'Suitable for retirement corpus'
        ],

        howItWorks: 'This basket allocates 80% to Balanced Advantage funds for stability and 20% to Nifty 50 for moderate growth.',

        funds: [
            { name: 'Balanced Advantage Fund (80%)', allocation: 80, color: '#8B5CF6' },
            { name: 'Nifty 50 Index Fund (20%)', allocation: 20, color: '#3B82F6' }
        ]
    },

    'ideal-salaried-people': {
        id: 'ideal-salaried-people',
        title: 'Ideal for Salaried People',
        tagline: 'Auto-invest from your salary, build long-term gains',
        returns: '21.61%',
        returnsSubtitle: '1 Year Rolling Return',
        holdingPeriod: '3-5 years',
        minSip: '₹100/mo',
        minLumpsum: '₹500',
        annualReturn: 0.2161,

        whatIsThis: 'A diversified basket designed for salaried professionals who want to systematically build wealth through automatic salary deductions.',

        whyThisBasket: [
            'Auto-invest from monthly salary',
            'Balanced risk across asset classes',
            'Tax saving through ELSS component',
            'Perfect for long-term wealth building'
        ],

        howItWorks: 'This basket combines 40% Hybrid Equity for balanced growth, 30% Multi Cap for diversification, 20% Banking & PSU Debt for stability, and 10% ELSS for tax benefits.',

        funds: [
            { name: 'HDFC Hybrid Equity (40%)', allocation: 40, color: '#F59E0B' },
            { name: 'Multi Cap Fund (30%)', allocation: 30, color: '#EC4899' },
            { name: 'Banking & PSU Debt (20%)', allocation: 20, color: '#3B82F6' },
            { name: 'ELSS Tax Saver (10%)', allocation: 10, color: '#10B981' }
        ]
    },

    'real-estate-fund': {
        id: 'real-estate-fund',
        title: 'Real Estate Fund',
        tagline: 'Invest in real estate without buying property',
        returns: '24.92%',
        returnsSubtitle: '1 Year Rolling Return',
        holdingPeriod: '5+ years',
        minSip: '₹100/mo',
        minLumpsum: '₹500',
        annualReturn: 0.2492,

        whatIsThis: 'A specialized fund that provides exposure to real estate and infrastructure sectors without the need to buy physical property.',

        whyThisBasket: [
            'Real estate exposure without property hassle',
            'High growth potential in infrastructure',
            'Lower investment vs buying property',
            'Liquid - withdraw anytime after 5 years'
        ],

        howItWorks: 'This basket allocates 60% to Infrastructure funds for real estate exposure, 30% to Large & MidCap for growth, and 10% to Banking & PSU Debt for stability.',

        funds: [
            { name: 'HDFC Infrastructure (60%)', allocation: 60, color: '#14B8A6' },
            { name: 'Large & MidCap Fund (30%)', allocation: 30, color: '#EC4899' },
            { name: 'Banking & PSU Debt (10%)', allocation: 10, color: '#3B82F6' }
        ]
    },

    'family-goals-fund': {
        id: 'family-goals-fund',
        title: 'Family Goals Fund',
        tagline: 'Save for marriage, education, home & family dreams',
        returns: '21.62%',
        returnsSubtitle: '1 Year Rolling Return',
        holdingPeriod: '3-5 years',
        minSip: '₹100/mo',
        minLumpsum: '₹500',
        annualReturn: 0.2162,

        whatIsThis: 'A balanced fund designed to help families save for major life goals like weddings, children\'s education, or buying a home.',

        whyThisBasket: [
            'Perfect for major family milestones',
            'Balanced risk for goal-based savings',
            'Flexible withdrawals when you need',
            'Steady growth for 3-5 year goals'
        ],

        howItWorks: 'This basket uses 100% Balanced Advantage strategy that dynamically adjusts between equity and debt based on market conditions, providing optimal risk-adjusted returns for your family goals.',

        funds: [
            { name: 'HDFC Balanced Advantage (100%)', allocation: 100, color: '#8B5CF6' }
        ]
    }
};

// Helper function to get basket by ID
function getBasketData(basketId) {
    return BASKETS_DATA[basketId] || BASKETS_DATA['balanced-returns']; // Fallback to balanced-returns
}

// Helper function to get all basket IDs
function getAllBasketIds() {
    return Object.keys(BASKETS_DATA);
}
