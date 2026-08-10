import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the hero name", () => {
  render(<App />);
  expect(screen.getByRole("heading", { name: "Toni Mendoza", level: 1 })).toBeInTheDocument();
});
