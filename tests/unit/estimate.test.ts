import { describe, expect, it } from "vitest";
import { estimate, formatBand, formatMoney } from "../../src/lib/estimate";

describe("estimate", () => {
  it("returns the raw band with no add-ons", () => {
    expect(estimate("ai", "small", [], "INR")?.band).toEqual({ min: 75_000, max: 250_000 });
    expect(estimate("ai", "small", [], "USD")?.band).toEqual({ min: 2_000, max: 6_000 });
  });

  it("multiplies add-on factors and rounds to a readable step", () => {
    const e = estimate("web-app", "medium", ["design", "priority"], "USD");
    // 8000 × 1.15 × 1.25 = 11500 ; 25000 × 1.4375 = 35937.5 → 35900
    expect(e?.band).toEqual({ min: 11_500, max: 35_900 });
  });

  it("keeps large bands open-ended", () => {
    expect(estimate("web-app", "large", [], "INR")?.band.max).toBeNull();
    expect(formatBand(estimate("web-app", "large", [], "INR")!)).toBe("From ₹12L");
  });

  it("marks marketing as monthly", () => {
    expect(formatBand(estimate("marketing", "small", [], "USD")!)).toBe("$800 – $2k / month");
  });

  it("returns null for an unknown type", () => {
    expect(estimate("nope", "small", [], "USD")).toBeNull();
  });

  it("formats money the way each market reads budgets", () => {
    expect(formatMoney(150_000, "INR")).toBe("₹1.5L");
    expect(formatMoney(75_000, "INR")).toBe("₹75k");
    expect(formatMoney(3_500, "USD")).toBe("$3.5k");
    expect(formatMoney(800, "USD")).toBe("$800");
  });
});
