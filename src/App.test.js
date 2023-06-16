import * as React from "react";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";

import App from "./App";
import userEvent from "@testing-library/user-event";

describe("App", () => {
  beforeEach(() => render(<App />));
  afterEach(() => cleanup());

  // Heading
  it("renders heading", () => {
    const heading = screen.getByText("What's your plan today ?");
    expect(heading).toBeInTheDocument();
  });

  // Input
  it("renders input box", () => {
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  // Button
  it("renders add button", () => {
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  // todos container
  it("renders Empty todo section", () => {
    const container = screen.getByTestId("todo-section");
    expect(container).toBeInTheDocument();
    expect(container).toBeEmptyDOMElement();
  });
});

describe("App functionality", () => {
  beforeEach(() => render(<App />));
  afterEach(() => cleanup());

  const getTodoList = () =>
    screen
      .getAllByTestId("todo-container")
      ?.map((item) => within(item).getByTestId("todo-content").textContent);

  it("checks input field value change", () => {
    const input = screen.getByTestId("todo-input");
    fireEvent.change(input, { target: { value: "go for walk" } });
    expect(input.value).toBe("go for walk");
  });

  it("adds todo item to the list", () => {
    const input = screen.getByTestId("todo-input");
    const button = screen.getByTestId("add-button");
    const userInput = "buy grocery";
    // implementation with fireEvent, below test includes similar implementation with userEvent
    fireEvent.change(input, { target: { value: userInput } });
    fireEvent.click(button);
    expect(getTodoList().findIndex((content) => content === userInput)).toBe(0); // Index of the first item should be 0
  });

  it("deletes item from the list", () => {
    const input = screen.getByTestId("todo-input");
    const todos = ["wake up", "buy bike", "return home"];
    const itemToDelete = "return home";
    for (const todo of todos) {
      userEvent.type(input, `${todo}{enter}`);
    }
    const removeButton = screen
      .getAllByTestId("todo-container")
      .filter(
        (item) =>
          within(item).getByTestId("todo-content").textContent === itemToDelete
      )
      .map((item) => within(item).getByTestId("remove-button"));

    expect(removeButton.length).toBeGreaterThan(0);
    userEvent.click(removeButton[0]);
    expect(getTodoList().includes(itemToDelete)).toBe(false); // Deleted item should not be present in the list
  });
});
