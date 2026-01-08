# Financing Offer Engine Demo

A small web application consisting of:

1. A **backend service** that evalutes finacing offers based on lender rules defined in a JSON file.
2. A **frontend UI** that allows a user to input a few fields and explore the resulting offers.

## Overview

This application consists of two main components:

1. **Backend API** - A Fastify-based REST API that evaluates financing offers based on lender rules defined in `lenders.json`
2. **Frontend Web App** - A React-based UI that allows users to input their information and view personalized financing offers

## Tech Stack

### Backend (`/apps/api`)

- **Runtime**: Node.js 24+
- **Framework**: Fastify 5
- **Language**: TypeScript (ESM)
- **Validation**: JSON Schema with Ajv
- **Testing**: Node.js native test runner

### Frontend (`/apps/web`)

- **Framework**: React 19
- **Build Tool**: Vite 7
- **Routing**: TanStack Router (file-based)
- **Forms**: TanStack Form
- **Styling**: Tailwind CSS 4
- **Validation**: Zod
- **UI Components**: Radix UI primitives + custom shadcn-style components

### Monorepo

- **Package Manager**: pnpm with workspaces
- **Build System**: Turbo

## Getting Started

### Prerequisites

- Node.js 24 or higher
- pnpm 10 or higher

### Installation

```bash
# Install dependencies
pnpm install
```

### Environment Setup

Create a `.env` file in `/apps/web/`:

```bash
VITE_API_URL=http://localhost:3000
```

An `.env.example` file is provided as a template.

### Running the Application

```bash
# Start both API and web dev servers
pnpm dev

# Or run them separately:
pnpm --filter api dev     # API on http://localhost:3000
pnpm --filter web dev     # Web on http://localhost:5173
```

### Building for Production

```bash
# Build all packages
pnpm build

# Build specific packages
pnpm --filter api build
pnpm --filter web build
```

### Linting

```bash
# Lint all packages
pnpm lint

# Lint specific packages
pnpm --filter api lint
pnpm --filter web lint
```

## API Documentation

### POST /quote

Evaluates financing offers from multiple lenders based on customer information.

**Request Body:**

```json
{
  "amount": 15000,
  "creditBand": "A",
  "state": "CA",
  "procedure": "implants"
}
```

**Field Definitions:**

- `amount` (number): Loan amount in dollars (1,000 - 50,000)
- `creditBand` (string): Credit band - "A" (720-850), "B" (660-719), "C" (620-659), "D" (300-619)
- `state` (string): Two-letter US state code
- `procedure` (string): Procedure type - "general", "implants", or "ortho"

**Response (200 OK):**

```json
{
  "offers": [
    {
      "lender": "Alpha",
      "approved": true,
      "apr": 7.9,
      "termMonths": 36,
      "monthlyPayment": 469.35,
      "reasonCodes": ["OK_AMOUNT", "OK_CREDIT"]
    },
    {
      "lender": "Bravo",
      "approved": false,
      "reasonCodes": ["DECLINE_PROCEDURE", "DECLINE_STATE"]
    }
  ]
}
```

**Reason Codes:**

- `OK_AMOUNT` - Amount within lender's limits
- `OK_CREDIT` - Credit band acceptable
- `OK_STATE` - State is serviced
- `DECLINE_AMOUNT` - Amount exceeds lender's maximum
- `DECLINE_CREDIT` - Credit band not acceptable
- `DECLINE_PROCEDURE` - Procedure not covered
- `DECLINE_STATE` - State not serviced

## Testing

### API Testing

Test the `/quote` endpoint with curl:

```bash
curl -X POST http://localhost:3000/quote \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 15000,
    "creditBand": "A",
    "state": "CA",
    "procedure": "implants"
  }'
```

### Manual Testing Checklist

- [ ] Form validation (all fields required, ranges enforced)
- [ ] Slider interaction (smooth movement, displays current value)
- [ ] Successful quote submission (approved offers display)
- [ ] Declined offers display with reason codes
- [ ] Network error handling (disconnect WiFi, test retry)
- [ ] Loading states (form disabled, spinner visible)
- [ ] Sorting offers (by APR, by monthly payment)
- [ ] Responsive layout (mobile, tablet, desktop)

## How It Works

### Lender Evaluation Logic

The backend evaluates each lender's rules defined in `lenders.json`:

1. **Amount Check**: Verifies loan amount is within lender's `maxAmount`
2. **Credit Check**: Ensures customer's credit band is in `allowedCreditBands`
3. **Procedure Check**: Confirms procedure is not in `disallowedProcedures`
4. **State Check**: Validates state is in `allowedStates`

If all checks pass, the offer is approved with the lender's APR and term.

### Monthly Payment Calculation

Uses the standard amortization formula:

```
M = P * [r(1 + r)^n] / [(1 + r)^n - 1]

Where:
- M = Monthly payment
- P = Principal (loan amount)
- r = Monthly interest rate (APR / 12 / 100)
- n = Number of months (term)
```

Special case: If APR is 0%, monthly payment = principal / term

## Assumptions and Shortcuts

1. No authentication or session management
2. No persistence of quote requests
3. No analytics
4. CORS is allowed for all origins
5. Used Claude Code to assist with API tests and frontend pages
6. Used Tailwind CSS for styling
7. Reused components from previous projects for styling
8. Used UI Kit components from Radix UI

## Future Improvements

### Backend

- [ ] Add database for persistence (quote history, lender configs)
- [ ] Implement caching layer (Redis) for lender rules
- [ ] Add comprehensive test suite (unit + integration tests)
- [ ] Implement API versioning (/v1/quote)
- [ ] Add monitoring and observability (metrics, logging)
- [ ] Support for promotional offers and dynamic APR adjustments
- [ ] Batch quote processing for multiple scenarios

### Frontend

- [ ] Add user authentication and quote history
- [ ] Save and share quote functionality
- [ ] Print/PDF export of offers
- [ ] Amortization schedule visualization
- [ ] A/B testing for form layouts
- [ ] Accessibility improvements (WCAG compliance)
- [ ] Mobile app version (React Native)
- [ ] Real-time offer updates via WebSocket
- [ ] Multi-language support
