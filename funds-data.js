// NiveshPe - Extended Funds Data with Holdings Information
// Version 2 - Includes portfolio holdings data for My Funds page

const fundsDataV2 = {
    'hdfc-mid-cap': {
        name: 'HDFC Mid Cap Fund',
        category: 'Equity',
        subCategory: 'Mid Cap',
        fundType: 'Equity • Mid Cap',
        fundHouse: 'HDFC Mutual Fund',
        lockIn: 'No lock-in',

        // Holdings information (NEW)
        holdings: {
            investedAmount: 70000,       // Amount user invested
            currentValue: 95000,         // Current market value
            units: 435.8,                // Number of units held
            avgBuyPrice: 160.65,         // Average purchase NAV
            currentNAV: 218.10,          // Today's NAV (from funds-data.js)
            xirr: 30.5,                  // Annualized return
            absoluteGain: 25000,         // Gain in rupees
            percentageGain: 35.7,        // Gain in percentage
            dayChange: {                 // Today's performance
                absolute: 425,
                percentage: 0.45
            }
        },

        nav: '218.10',
        navDate: '22 Oct 2025',

        returns: {
            '1Y': { value: '+3%', label: '1 Year Returns' },
            '3Y': { value: '+27%', label: '3 Year CAGR' },
            '5Y': { value: '+30%', label: '5 Year CAGR' }
        }
    },

    'hdfc-small-cap': {
        name: 'HDFC Small Cap Fund',
        category: 'Equity',
        subCategory: 'Small Cap',
        fundType: 'Equity • Small Cap',
        fundHouse: 'HDFC Mutual Fund',
        lockIn: 'No lock-in',

        // Holdings information (NEW)
        holdings: {
            investedAmount: 53000,       // Amount user invested
            currentValue: 71250,         // Current market value
            units: 440.9,                // Number of units held
            avgBuyPrice: 120.18,         // Average purchase NAV
            currentNAV: 161.58,          // Today's NAV (from funds-data.js)
            xirr: 32.8,                  // Annualized return
            absoluteGain: 18250,         // Gain in rupees
            percentageGain: 34.4,        // Gain in percentage
            dayChange: {                 // Today's performance
                absolute: 320,
                percentage: 0.45
            }
        },

        nav: '161.58',
        navDate: '22 Oct 2025',

        returns: {
            '1Y': { value: '+2.4%', label: '1 Year Returns' },
            '3Y': { value: '+23%', label: '3 Year CAGR' },
            '5Y': { value: '+34%', label: '5 Year CAGR' }
        }
    },

    'hdfc-liquid-fund': {
        name: 'HDFC Liquid Fund',
        category: 'Debt',
        subCategory: 'Liquid',
        fundType: 'Debt • Liquid',
        fundHouse: 'HDFC Mutual Fund',
        lockIn: 'No lock-in',

        // Holdings information (NEW)
        holdings: {
            investedAmount: 33000,       // Amount user invested
            currentValue: 35625,         // Current market value
            units: 1268.4,               // Number of units held
            avgBuyPrice: 26.02,          // Average purchase NAV
            currentNAV: 28.09,           // Today's NAV (estimated)
            xirr: 7.5,                   // Annualized return
            absoluteGain: 2625,          // Gain in rupees
            percentageGain: 8.0,         // Gain in percentage
            dayChange: {                 // Today's performance
                absolute: 45,
                percentage: 0.13
            }
        },

        nav: '28.09',
        navDate: '22 Oct 2025',

        returns: {
            '1Y': { value: '+6.9%', label: '1 Year Returns' },
            '3Y': { value: '+6.8%', label: '3 Year CAGR' },
            '5Y': { value: '+6.9%', label: '5 Year CAGR' }
        }
    },

    'hdfc-balanced-advantage': {
        name: 'HDFC Balanced Advantage Fund',
        category: 'Hybrid',
        subCategory: 'Dynamic Asset Allocation',
        fundType: 'Hybrid • Balanced Advantage',
        fundHouse: 'HDFC Mutual Fund',
        lockIn: 'No lock-in',

        // Holdings information (NEW)
        holdings: {
            investedAmount: 28800,       // Amount user invested
            currentValue: 35625,         // Current market value
            units: 62.7,                 // Number of units held
            avgBuyPrice: 459.33,         // Average purchase NAV
            currentNAV: 567.93,          // Today's NAV (from funds-data.js)
            xirr: 22.5,                  // Annualized return
            absoluteGain: 6825,          // Gain in rupees
            percentageGain: 23.7,        // Gain in percentage
            dayChange: {                 // Today's performance
                absolute: 160,
                percentage: 0.45
            }
        },

        nav: '567.93',
        navDate: '22 Oct 2025',

        returns: {
            '1Y': { value: '+2.9%', label: '1 Year Returns' },
            '3Y': { value: '+20.8%', label: '3 Year CAGR' },
            '5Y': { value: '+23.8%', label: '5 Year CAGR' }
        }
    }
};

// Portfolio Summary Calculations
const portfolioSummaryV2 = {
    totalInvested: 184800,       // Sum of all invested amounts (70k + 53k + 33k + 28.8k)
    totalCurrent: 237500,        // Sum of all current values (95k + 71.25k + 35.625k + 35.625k)
    totalGain: 52700,            // Total absolute gain (25k + 18.25k + 2.625k + 6.825k)
    totalGainPercent: 28.5,      // Overall gain percentage
    xirr: 27.8,                  // Portfolio XIRR

    // Asset allocation across portfolio
    assetAllocation: {
        equity: 70.0,            // Equity percentage (Mid Cap + Small Cap)
        debt: 15.0,              // Debt percentage (HDFC Liquid)
        hybrid: 15.0             // Hybrid percentage (Balanced Advantage)
    },

    // Today's total change
    todayChange: {
        absolute: 950,           // Total gain today (425 + 320 + 45 + 160)
        percentage: 0.40         // Percentage change today
    },

    // Fund count by category
    fundCount: {
        total: 4,
        equity: 2,               // Mid Cap + Small Cap
        debt: 1,                 // Liquid
        hybrid: 1                // Balanced Advantage
    }
};

// SIPs Data - For Active SIPs Tab
const sipsData = [
    {
        id: 'sip-1',
        amount: 10000,
        frequency: 'monthly',
        nextDebit: '25th Nov',
        nextDebitFull: 'Next debit on 25th Nov',
        status: 'active',
        funds: [
            { id: 'hdfc-mid-cap', name: 'HDFC Mid Cap Fund' },
            { id: 'hdfc-small-cap', name: 'HDFC Small Cap Fund' },
            { id: 'hdfc-liquid-fund', name: 'HDFC Liquid Fund' }
        ]
    },
    {
        id: 'sip-2',
        amount: 5000,
        frequency: 'weekly',
        nextDebit: 'Monday',
        nextDebitFull: 'Every Monday',
        status: 'active',
        funds: [
            { id: 'hdfc-liquid-fund', name: 'HDFC Liquid Fund' }
        ]
    },
    {
        id: 'sip-3',
        amount: 150,
        frequency: 'daily',
        nextDebit: 'Daily',
        nextDebitFull: 'Daily',
        status: 'active',
        funds: [
            { id: 'hdfc-liquid-fund', name: 'HDFC Liquid Fund' }
        ]
    },
    {
        id: 'sip-4',
        amount: 8000,
        frequency: 'monthly',
        nextDebit: '5th Dec',
        nextDebitFull: 'Next debit on 5th Dec',
        status: 'active',
        funds: [
            { id: 'hdfc-balanced-advantage', name: 'HDFC Balanced Advantage Fund' },
            { id: 'hdfc-flexi-cap', name: 'HDFC Flexi Cap Fund' }
        ]
    },
    {
        id: 'sip-5',
        amount: 15000,
        frequency: 'monthly',
        nextDebit: '1st Dec',
        nextDebitFull: 'Next debit on 1st Dec',
        status: 'active',
        funds: [
            { id: 'hdfc-mid-cap', name: 'HDFC Mid Cap Fund' },
            { id: 'hdfc-small-cap', name: 'HDFC Small Cap Fund' },
            { id: 'hdfc-large-cap', name: 'HDFC Large Cap Fund' },
            { id: 'hdfc-focused-30', name: 'HDFC Focused 30 Fund' }
        ]
    },
    {
        id: 'sip-6',
        amount: 3000,
        frequency: 'monthly',
        nextDebit: '15th Nov',
        nextDebitFull: 'Skipped: 15th Nov',
        skippedDate: '15th Nov',
        status: 'skipped',
        funds: [
            { id: 'hdfc-mid-cap', name: 'HDFC Mid Cap Fund' }
        ]
    }
];

// Calculate SIP Summary
function calculateSIPSummary() {
    const summary = {
        monthly: 0,
        weekly: 0,
        daily: 0,
        active: 0,
        totalFunds: new Set()
    };

    sipsData.forEach(sip => {
        if (sip.status === 'active') {
            summary.active++;
            if (sip.frequency === 'monthly') summary.monthly += sip.amount;
            if (sip.frequency === 'weekly') summary.weekly += sip.amount;
            if (sip.frequency === 'daily') summary.daily += sip.amount;

            sip.funds.forEach(fund => summary.totalFunds.add(fund.id));
        }
    });

    return {
        ...summary,
        totalFunds: summary.totalFunds.size
    };
}

// Helper function to get fund data by slug (for add-funds.html)
function getFundData(slug) {
    // Return fund data if exists, otherwise return default fund
    return fundsDataV2[slug] || fundsDataV2['hdfc-mid-cap'];
}

// Export for use in my-funds-v2.html
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { fundsDataV2, portfolioSummaryV2, getFundData, sipsData, calculateSIPSummary };
}
