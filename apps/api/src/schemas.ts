export const QuoteRequestSchema = {
	type: "object",
	properties: {
		amount: { type: "number", exclusiveMinimum: 0 },
		creditBand: { type: "string", enum: ["A", "B", "C", "D"] },
		state: { type: "string", minLength: 2, maxLength: 2 },
		procedure: { type: "string", minLength: 1 },
	},
	required: ["amount", "creditBand", "state", "procedure"],
	additionalProperties: false,
} as const;

const ApprovedOfferSchema = {
	type: "object",
	properties: {
		lender: { type: "string" },
		approved: { type: "boolean", const: true },
		apr: { type: "number" },
		termMonths: { type: "integer" },
		monthlyPayment: { type: "number" },
		reasonCodes: { type: "array", items: { type: "string" } },
	},
	required: [
		"lender",
		"approved",
		"apr",
		"termMonths",
		"monthlyPayment",
		"reasonCodes",
	],
	additionalProperties: false,
} as const;

const DeclinedOfferSchema = {
	type: "object",
	properties: {
		lender: { type: "string" },
		approved: { type: "boolean", const: false },
		reasonCodes: { type: "array", items: { type: "string" } },
	},
	required: ["lender", "approved", "reasonCodes"],
	additionalProperties: false,
} as const;

export const QuoteResponseSchema = {
	type: "object",
	properties: {
		offers: {
			type: "array",
			items: {
				oneOf: [ApprovedOfferSchema, DeclinedOfferSchema],
			},
		},
	},
	required: ["offers"],
	additionalProperties: false,
} as const;

export const ErrorResponseSchema = {
	type: "object",
	properties: {
		error: { type: "string" },
		message: { type: "string" },
	},
	required: ["error", "message"],
	additionalProperties: false,
} as const;
