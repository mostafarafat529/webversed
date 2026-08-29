import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ApiDetails from "./apiDetails";
import { API_DETAILS } from "./apiDetailsData";

const toggle = () => screen.getByRole("button", { name: /api details/i });

describe("API_DETAILS data accuracy", () => {
  test("every tool has complete, non-empty metadata", () => {
    const tools = Object.keys(API_DETAILS);
    expect(tools.length).toBe(10);
    for (const id of tools) {
      const m = API_DETAILS[id];
      expect(m.provider).toBeTruthy();
      expect(m.method).toBeTruthy();
      expect(m.authentication).toBeTruthy();
      expect(m.apiKeyRequired).toBeTruthy();
      expect(m.input).toBeTruthy();
      expect(m.output).toBeTruthy();
      expect(m.response).toBeTruthy();
      expect(m.endpoint).toBeTruthy();
      expect(m.purpose).toBeTruthy();
      expect(m.steps.length).toBeGreaterThan(0);
      expect(m.flow.length).toBeGreaterThan(0);
      expect(JSON.stringify(m)).not.toMatch(/[0-9a-f]{20,}/i);
    }
  });
});

describe("ApiDetails accordion", () => {
  test("is closed by default, opens on click and exposes all metadata", () => {
    render(<ApiDetails meta={API_DETAILS.weather} />);
    expect(toggle()).toHaveAttribute("aria-expanded", "false");
    expect(toggle()).toHaveAttribute("aria-controls");
    expect(screen.queryByText(/how it works/i)).not.toBeInTheDocument();

    fireEvent.click(toggle());
    expect(toggle()).toHaveAttribute("aria-expanded", "true");
    expect(screen.getAllByText("WeatherAPI").length).toBeGreaterThan(0);
    expect(screen.getByText(/how it works/i)).toBeInTheDocument();
    expect(screen.getAllByText("GET").length).toBeGreaterThan(0);
  });

  test("shows clean keyless metadata for the jokes tool", () => {
    render(<ApiDetails meta={API_DETAILS.jokes} />);
    fireEvent.click(toggle());
    expect(screen.getAllByText("JokeAPI").length).toBeGreaterThan(0);
    expect(screen.getAllByText(/not required/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText("JSON").length).toBeGreaterThan(0);
  });

  test("collapses again: aria state closes and panel is removed", async () => {
    render(<ApiDetails meta={API_DETAILS.news} />);
    fireEvent.click(toggle());
    expect(toggle()).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(toggle());
    expect(toggle()).toHaveAttribute("aria-expanded", "false");
    await waitFor(
      () => expect(screen.queryByText(/how it works/i)).not.toBeInTheDocument(),
      { timeout: 3000 }
    );
  });

  test("toggle is a real <button>, so it is focusable for keyboard users", () => {
    render(<ApiDetails meta={API_DETAILS.textspeech} />);
    expect(toggle().tagName).toBe("BUTTON");
    toggle().focus();
    expect(document.activeElement).toBe(toggle());
  });
});