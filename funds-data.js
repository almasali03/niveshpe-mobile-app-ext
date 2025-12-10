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
            '1M': { value: '+2.8%', label: '1 Month Returns' },
            '6M': { value: '+12.5%', label: '6 Month Returns' },
            '1Y': { value: '+3%', label: '1 Year Returns' },
            '3Y': { value: '+27%', label: '3 Year CAGR' },
            '5Y': { value: '+30%', label: '5 Year CAGR' },
            'All': { value: '+7850%', label: 'Since Inception' }
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
            '1M': { value: '+3.5%', label: '1 Month Returns' },
            '6M': { value: '+15.2%', label: '6 Month Returns' },
            '1Y': { value: '+2.4%', label: '1 Year Returns' },
            '3Y': { value: '+23%', label: '3 Year CAGR' },
            '5Y': { value: '+34%', label: '5 Year CAGR' },
            'All': { value: '+9200%', label: 'Since Inception' }
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
            '1M': { value: '+0.5%', label: '1 Month Returns' },
            '6M': { value: '+3.2%', label: '6 Month Returns' },
            '1Y': { value: '+6.9%', label: '1 Year Returns' },
            '3Y': { value: '+6.8%', label: '3 Year CAGR' },
            '5Y': { value: '+6.9%', label: '5 Year CAGR' },
            'All': { value: '+180%', label: 'Since Inception' }
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
            '1M': { value: '+2.1%', label: '1 Month Returns' },
            '6M': { value: '+10.5%', label: '6 Month Returns' },
            '1Y': { value: '+2.9%', label: '1 Year Returns' },
            '3Y': { value: '+20.8%', label: '3 Year CAGR' },
            '5Y': { value: '+23.8%', label: '5 Year CAGR' },
            'All': { value: '+5680%', label: 'Since Inception' }
        }
    },

    'hdfc-large-cap': {
        name: 'HDFC Large Cap Fund',
        category: 'Equity',
        subCategory: 'Large Cap',
        fundType: 'Equity • Large Cap',
        fundHouse: 'HDFC Mutual Fund',
        lockIn: 'No lock-in',
        categoryRank: '#8 in Large Cap',

        nav: '845.32',
        navDate: '9 Dec 2025',

        defaultPeriod: '5Y',

        returns: {
            '1M': { value: '+3.1%', label: '1 Month Returns' },
            '6M': { value: '+13.4%', label: '6 Month Returns' },
            '1Y': { value: '+21.0%', label: '1 Year Returns' },
            '3Y': { value: '+19.5%', label: '3 Year CAGR' },
            '5Y': { value: '+21.0%', label: '5 Year CAGR' },
            'All': { value: '+8340%', label: 'Since Inception' }
        },

        chartData: {
            '1M': {
                labels: ['10 Nov', '11 Nov', '14 Nov', '15 Nov', '16 Nov', '17 Nov', '18 Nov', '21 Nov', '22 Nov', '23 Nov', '24 Nov', '25 Nov', '28 Nov', '29 Nov', '30 Nov', '1 Dec', '2 Dec', '5 Dec', '6 Dec', '7 Dec', '8 Dec', '9 Dec'],
                data: [820.15, 822.40, 819.85, 825.30, 828.65, 831.20, 827.95, 830.45, 833.80, 829.50, 835.60, 838.25, 834.90, 837.75, 840.30, 836.85, 841.50, 839.20, 842.65, 844.10, 843.25, 845.32]
            },
            '6M': {
                labels: ['10 Jun', '17 Jun', '24 Jun', '1 Jul', '8 Jul', '15 Jul', '22 Jul', '29 Jul', '5 Aug', '12 Aug', '19 Aug', '26 Aug', '2 Sep', '9 Sep', '16 Sep', '23 Sep', '30 Sep', '7 Oct', '14 Oct', '21 Oct', '28 Oct', '4 Nov', '11 Nov', '18 Nov', '25 Nov', '2 Dec', '9 Dec'],
                data: [745.20, 752.35, 748.90, 755.60, 762.45, 758.80, 765.30, 771.90, 768.25, 775.40, 782.15, 778.50, 785.60, 791.25, 787.90, 794.35, 800.50, 796.85, 803.40, 810.25, 806.70, 813.50, 819.30, 825.80, 832.15, 838.60, 845.32]
            },
            '1Y': {
                labels: ['Dec 2024', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec 2025'],
                data: [698.45, 705.30, 712.85, 720.50, 728.15, 735.90, 745.20, 758.80, 768.25, 787.90, 806.70, 832.15, 845.32]
            },
            '3Y': {
                labels: ['Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023', 'Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025'],
                data: [520.35, 535.80, 548.65, 562.40, 580.25, 598.70, 615.35, 632.90, 658.45, 685.20, 715.80, 745.60, 780.35, 810.50, 830.75, 845.32]
            },
            '5Y': {
                labels: ['2021', 'Jan 2021', 'Apr 2021', 'Jul 2021', 'Oct 2021', 'Jan 2022', 'Apr 2022', 'Jul 2022', 'Oct 2022', 'Jan 2023', 'Apr 2023', 'Jul 2023', 'Oct 2023', 'Jan 2024', 'Apr 2024', 'Jul 2024', 'Oct 2024', 'Jan 2025', 'Apr 2025', 'Jul 2025', 'Oct 2025', 'Dec 2025'],
                data: [380.25, 395.40, 410.85, 425.30, 438.65, 455.20, 470.35, 485.90, 498.25, 515.40, 535.80, 548.65, 562.40, 580.25, 598.70, 615.35, 632.90, 658.45, 685.20, 715.80, 780.35, 845.32]
            },
            'All': {
                labels: ['2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
                data: [10.00, 8.45, 12.35, 18.50, 16.85, 21.40, 28.65, 35.90, 42.35, 58.75, 78.25, 85.40, 105.65, 138.90, 185.50, 245.80, 310.45, 420.65, 580.25, 698.45, 845.32]
            }
        },

        performance: {
            comparison: {
                fund: '21.0%',
                benchmark: '19.8%',
                benchmarkName: 'NIFTY 50',
                category: '18.5%'
            },
            note: 'This fund has consistently outperformed its benchmark and category average over the past 5 years.'
        },

        overview: {
            objective: 'To generate long-term capital appreciation from a diversified portfolio of predominantly equity and equity-related instruments of large cap companies.',
            why: 'The fund follows a disciplined investment approach with focus on quality large-cap stocks that have sustainable competitive advantages and strong management teams.',
            whoShould: 'Investors seeking long-term wealth creation through investments in large-cap equity stocks and are willing to accept moderate to high risk.'
        },

        quickStats: {
            aum: '₹38,245 Cr',
            aumSubtext: 'Fund Size',
            expenseRatio: '0.82%',
            expenseSubtext: 'Direct Plan',
            exitLoad: '1%',
            exitSubtext: '< 1 year',
            fundAge: '18 Yrs',
            ageSubtext: 'Since 2007'
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
