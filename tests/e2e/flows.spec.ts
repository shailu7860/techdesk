import { expect, test } from "./fixtures";

test("navigate from home to a case study and back to work", async ({ page, isMobile }) => {
  await page.goto("/");
  if (isMobile) {
    await page.getByRole("button", { name: "Menu" }).click();
    const menu = page.getByRole("dialog", { name: "Menu" });
    await expect(menu).toBeVisible();
    await menu.getByRole("link", { name: "Work" }).click();
    await expect(menu).toBeHidden();
  } else {
    await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Work" }).click();
  }
  await expect(page).toHaveURL(/\/work$/);
  await page.getByRole("link", { name: "Stratos", exact: true }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/stratos/i);
  await expect(page.getByText("System architecture")).toBeVisible();
});

test("mobile menu closes with Escape and returns focus", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile only");
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Menu" });
  await trigger.click();
  await expect(page.getByRole("dialog", { name: "Menu" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "Menu" })).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("work index filters builds by industry", async ({ page }) => {
  await page.goto("/work");
  await page.getByRole("button", { name: "Healthcare" }).click();
  await expect(page).toHaveURL(/industry=healthcare/);
  const rows = page.locator("tbody tr");
  await expect(rows).toHaveCount(1);
  await expect(rows.first()).toContainText("Healthcare Dashboard");
});

test("industries tabs work with the keyboard", async ({ page, isMobile }) => {
  test.skip(isMobile, "keyboard flow");
  await page.goto("/");
  const first = page.getByRole("tab", { name: "Fintech" });
  await first.focus();
  await page.keyboard.press("ArrowDown");
  const second = page.getByRole("tab", { name: "Marketplaces" });
  await expect(second).toBeFocused();
  await expect(second).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toContainText("business exchange");
});

test("calculator: currency switch, then hand the estimate to the brief", async ({ page }) => {
  await page.goto("/contact#estimate");
  const est = page.locator("#estimate");
  await est.getByText("AI agent / chatbot / automation").click();
  await est.getByText("INR", { exact: true }).click();
  await expect(est.locator("output")).toHaveText("₹75k – ₹2.5L");
  await est.getByText("USD", { exact: true }).click();
  await expect(est.locator("output")).toHaveText("$2k – $6k");
  await est.getByRole("button", { name: "Send this to us" }).click();
  await expect(page).toHaveURL(/type=ai/);
  // Brief is prefilled: project type on step 2, estimate on step 3.
  await page.getByLabel("Your name").fill("Asha Rao");
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.getByLabel("Project type")).toHaveValue("AI agent / chatbot / automation");
  await page.getByLabel("What are you building?").fill("A WhatsApp agent that qualifies clinic leads.");
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.getByText("Your estimate")).toBeVisible();
});

test("brief: validation, then a successful submission", async ({ page }) => {
  let payload: Record<string, string> = {};
  await page.route("https://api.web3forms.com/submit", async (route) => {
    payload = route.request().postDataJSON();
    await route.fulfill({ json: { success: true } });
  });
  await page.goto("/contact");
  const brief = page.locator("#brief");
  await brief.getByRole("button", { name: "Continue" }).click();
  await expect(brief.getByRole("alert")).toBeVisible();
  await expect(brief.getByLabel("Your name")).toHaveAttribute("aria-invalid", "true");

  await brief.getByLabel("Your name").fill("Asha Rao");
  await brief.getByRole("button", { name: "Continue" }).click();
  await brief.getByLabel("Project type").selectOption("Web app / SaaS platform");
  await brief.getByLabel("What are you building?").fill("Booking platform for 12 clinics with reminders.");
  await brief.getByRole("button", { name: "Continue" }).click();
  await brief.getByText("AI agent or chatbot").click();
  await brief.getByRole("button", { name: "Continue" }).click();
  await brief.getByRole("textbox", { name: "Email" }).fill("asha@example.com");
  await brief.getByRole("button", { name: "Continue" }).click();
  await expect(brief.getByText("Booking platform for 12 clinics")).toBeVisible();
  await brief.getByRole("button", { name: "Transmit request" }).click();

  await expect(brief.getByRole("status")).toContainText("Thank you, Asha");
  expect(payload.access_key).toBe("e2e-key");
  expect(payload.name).toBe("Asha Rao");
  expect(payload.scope).toBe("AI agent or chatbot");
  expect(payload.botcheck).toBe("");
});

test("brief: network failure keeps answers and offers WhatsApp", async ({ page }) => {
  await page.route("https://api.web3forms.com/submit", (route) => route.abort("internetdisconnected"));
  await page.goto("/contact");
  const brief = page.locator("#brief");
  await brief.getByLabel("Your name").fill("Asha Rao");
  await brief.getByRole("button", { name: "Continue" }).click();
  await brief.getByLabel("Project type").selectOption("Something else");
  await brief.getByLabel("What are you building?").fill("An internal tool for our warehouse team.");
  for (let i = 0; i < 2; i++) await brief.getByRole("button", { name: "Continue" }).click();
  await brief.getByRole("textbox", { name: "Email" }).fill("asha@example.com");
  await brief.getByRole("button", { name: "Continue" }).click();
  await brief.getByRole("button", { name: "Transmit request" }).click();
  const alert = brief.getByRole("alert");
  await expect(alert).toContainText("couldn't reach the server");
  await expect(alert.getByRole("link", { name: "Send on WhatsApp" })).toHaveAttribute("href", /wa\.me/);
  await expect(brief.getByRole("button", { name: "Try again" })).toBeEnabled();
});

test("chat: answers from the assistant, then a human handoff when it is down", async ({ page }) => {
  let calls = 0;
  await page.route("https://chat.e2e.test/", async (route) => {
    calls++;
    const body = route.request().postDataJSON() as { messages: { role: string; content: string }[] };
    expect(body.messages.at(-1)?.role).toBe("user");
    if (calls === 1)
      await route.fulfill({ json: { reply: "We build AI agents, platforms and automation. <b>not html</b>" } });
    else await route.fulfill({ status: 503, json: { handoff: true } });
  });
  await page.goto("/");
  await page.getByRole("button", { name: /ask our ai assistant/i }).click();
  const chat = page.getByRole("dialog", { name: "Ask TechDesk" });
  await expect(chat).toBeVisible();
  await chat.getByRole("button", { name: "What do you build?" }).click();
  // Model output is rendered as text: the tag appears literally, no <b> element is created.
  await expect(chat.getByText("<b>not html</b>", { exact: false })).toBeVisible();
  await expect(chat.locator("b")).toHaveCount(0);

  await chat.getByLabel("Your message").fill("How much for a clinic app?");
  await chat.getByRole("button", { name: "Send" }).click();
  const handoff = chat.getByRole("alert");
  await expect(handoff).toContainText("unavailable");
  await expect(handoff.getByRole("link", { name: /whatsapp/i })).toHaveAttribute("href", /wa\.me.*clinic/);
  await page.keyboard.press("Escape");
  await expect(chat).toBeHidden();
});
