import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ApplicationForm } from "./ApplicationForm";

describe("ApplicationForm", () => {
  it("renders required fields", () => {
    render(
      <ApplicationForm
        onSave={vi.fn()}
        onCancel={vi.fn()}
      />
    );

    expect(screen.getByText("Company Name *")).toBeInTheDocument();
    expect(screen.getByText("Job Title *")).toBeInTheDocument();
    expect(screen.getByText("Application Date *")).toBeInTheDocument();
  });

  it("submits valid application data", async () => {
    const user = userEvent.setup();
    const onSave = vi.fn().mockResolvedValue(undefined);

    render(
      <ApplicationForm
        onSave={onSave}
        onCancel={vi.fn()}
      />
    );

    await user.type(
      screen.getByLabelText("Company Name *"),
      "Google"
    );

    await user.type(
      screen.getByLabelText("Job Title *"),
      "Software Engineer"
    );

    await user.click(
      screen.getByRole("button", { name: "Save Application" })
    );

    expect(onSave).toHaveBeenCalledWith(
      expect.objectContaining({
        companyName: "Google",
        jobTitle: "Software Engineer",
        status: "Applied",
      })
    );
  });

  it("calls onCancel when cancelled", async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();

    render(
      <ApplicationForm
        onSave={vi.fn()}
        onCancel={onCancel}
      />
    );

    await user.click(
      screen.getByRole("button", { name: "Cancel" })
    );

    expect(onCancel).toHaveBeenCalledOnce();
  });
});