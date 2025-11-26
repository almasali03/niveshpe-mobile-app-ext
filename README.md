# NiveshPe Mobile App Prototype

A complete mobile-first fintech application prototype showcasing SIP investments, mutual fund management, and UPI payment flows.

## 🚀 Features

### Investment Flows
- **SIP Creation**: Complete systematic investment plan setup with amount, frequency, and fund selection
- **Fund Withdrawal**: Multi-step withdrawal process with behavioral nudges and confirmation flows
- **UPI AutoPay**: Seamless payment method integration with major UPI apps

### User Experience
- **Mobile-First Design**: Optimized for mobile devices with iPhone frame simulation
- **Behavioral Nudges**: Smart prompts to encourage better investment decisions
- **Interactive UI**: Touch-friendly interfaces with haptic feedback
- **Real-time Calculations**: Dynamic projections and return calculations

## 📱 Application Flow

### 🏠 Homepage (`index.html`)
- Portfolio overview with current balance and XIRR
- Quick action buttons for Save More and Withdraw
- Feature cards for additional services

### 💰 SIP Creation Flow
1. **Add Funds** (`add-funds.html`) - SIP setup with amount, frequency, and pot selection
2. **UPI AutoPay** (`upi-autopay.html`) - Payment method selection and UPI setup
3. **Success** (`autopay-success.html`) - Confirmation with celebration animations

### 📤 Withdrawal Flow
1. **Fund Selection** (`withdraw-funds-step1-overlay.html`) - Choose funds to withdraw from
2. **Amount Entry** (`withdraw-funds-step2-v2.html`) - Enter amount with behavioral nudge overlay
3. **Confirmation** (`withdraw-funds-step3.html`) - Review details with built-in OTP verification
4. **Success** (`withdraw-funds-success.html`) - Transaction confirmation with timeline

## 🛠 Technical Implementation

### Frontend Technology
- **Pure HTML5/CSS3/JavaScript** - No frameworks, optimized for performance
- **CSS Custom Properties** - Consistent design system with reusable tokens
- **Mobile Responsive** - 380px × 820px iPhone frame with touch interactions
- **URL Parameters** - Seamless data flow between pages

### Design System
- **Color Palette**: Professional blue and green gradients
- **Typography**: Inter font family with consistent weight hierarchy
- **Spacing**: 8px-based spacing system (--space-xs to --space-2xl)
- **Components**: Reusable cards, buttons, and form elements

### User Experience Features
- **Haptic Feedback**: Vibration feedback for mobile interactions
- **Animations**: Smooth transitions and loading animations
- **Progressive Disclosure**: Information revealed progressively to reduce cognitive load
- **Behavioral Economics**: Nudges to promote good investment behavior

## 📂 Project Structure

```
niveshpe-mobile-app-prototype/
├── index.html                          # Homepage with portfolio overview
├── add-funds.html                      # SIP creation and fund setup
├── upi-autopay.html                   # UPI payment method selection
├── autopay-success.html               # SIP setup success page
├── withdraw-funds-step1-overlay.html  # Fund selection for withdrawal
├── withdraw-funds-step2-v2.html      # Amount entry with nudge overlay
├── withdraw-funds-step3.html         # Withdrawal confirmation with OTP
├── withdraw-funds-success.html       # Withdrawal success page
├── assets/                           # SVG icons for UPI apps
│   ├── phonepe-icon.svg
│   ├── google-pay-icon.svg
│   ├── paytm-icon.svg
│   └── bhim-icon.svg
├── screenshots/                      # App screenshots
└── README.md                         # Project documentation
```

## 🔧 Development

### Prerequisites
- Modern web browser with ES6+ support
- Local web server (optional, can run directly in browser)

### Running the App
1. Clone the repository
2. Open `index.html` in a web browser
3. Navigate through the flows using the interface

### Testing Flows
- **SIP Flow**: Homepage → Save More → Amount Setup → UPI Setup → Success
- **Withdrawal Flow**: Homepage → Withdraw → Select Fund → Enter Amount → Confirm → Success

## 📊 Key Metrics & Features

### Investment Features
- **Dynamic Projections**: Real-time SIP return calculations
- **Multiple Frequencies**: Daily, weekly, monthly SIP options
- **Fund Selection**: Curated mutual fund options
- **Goal-Based Pots**: Emergency funds, bike funds, etc.

### User Engagement
- **Behavioral Nudges**: 5-year growth projections during withdrawal
- **Visual Feedback**: Progress indicators and success animations
- **Smart Defaults**: Pre-selected optimal investment amounts
- **Education**: Contextual help and investment guidance

### Technical Performance
- **Fast Loading**: Optimized CSS and minimal JavaScript
- **Mobile Optimized**: Touch-first design with proper hit targets
- **Accessible**: Semantic HTML with proper contrast ratios
- **Responsive**: Consistent experience across different screen sizes

## 🎯 Business Logic

### SIP Investment Flow
- Minimum investment amounts with smart suggestions
- Frequency-based calculation engine
- Goal-based fund allocation
- UPI AutoPay integration for recurring payments

### Withdrawal Process
- Fund liquidity checks and processing times
- Exit load calculations and transparency
- Behavioral intervention with growth projections
- Multi-step confirmation for user protection

## 📈 Recent Updates

### Latest Commit Features
- **Complete Withdrawal Flow**: 4-step withdrawal process with nudge overlay
- **Behavioral Nudging**: Smart prompts showing 5-year growth potential
- **SIP Flow Refinements**: Improved spacing and user experience
- **Mobile Optimization**: Enhanced touch interactions and animations
- **Code Quality**: Comprehensive hygiene check and cleanup

### Previous Updates
- Initial SIP creation flow implementation
- UPI AutoPay integration
- Homepage portfolio overview
- Mobile-first responsive design
- Consistent design system implementation

## 🚀 Deployment

The prototype is designed to be easily deployable to any static hosting service:
- GitHub Pages
- Netlify
- Vercel
- Any web server supporting static files

## 📄 License

This is a prototype application for demonstration purposes.

---

**Built with ❤️ for modern investment experiences**