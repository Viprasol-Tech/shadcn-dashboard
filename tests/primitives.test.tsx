import { describe, it, expect, vi } from "vitest";
import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

describe("<Input>", () => {
  it("renders with a default text type and forwards props", () => {
    render(<Input placeholder="Email" defaultValue="hi" />);
    const input = screen.getByPlaceholderText("Email") as HTMLInputElement;
    expect(input).toHaveAttribute("type", "text");
    expect(input.value).toBe("hi");
  });

  it("respects an explicit type and disabled state", () => {
    render(<Input type="email" disabled placeholder="e" />);
    const input = screen.getByPlaceholderText("e");
    expect(input).toHaveAttribute("type", "email");
    expect(input).toBeDisabled();
  });

  it("calls onChange when typed into", () => {
    const onChange = vi.fn();
    render(<Input placeholder="q" onChange={onChange} />);
    fireEvent.change(screen.getByPlaceholderText("q"), {
      target: { value: "abc" },
    });
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});

describe("<Tabs>", () => {
  function Example() {
    return (
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">Tab A</TabsTrigger>
          <TabsTrigger value="b">Tab B</TabsTrigger>
        </TabsList>
        <TabsContent value="a">Panel A</TabsContent>
        <TabsContent value="b">Panel B</TabsContent>
      </Tabs>
    );
  }

  it("shows only the default panel initially", () => {
    render(<Example />);
    expect(screen.getByText("Panel A")).toBeInTheDocument();
    expect(screen.queryByText("Panel B")).not.toBeInTheDocument();
  });

  it("switches panels when a trigger is clicked", () => {
    render(<Example />);
    fireEvent.click(screen.getByRole("tab", { name: "Tab B" }));
    expect(screen.getByText("Panel B")).toBeInTheDocument();
    expect(screen.queryByText("Panel A")).not.toBeInTheDocument();
  });

  it("marks the active trigger via aria-selected", () => {
    render(<Example />);
    expect(screen.getByRole("tab", { name: "Tab A" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  it("throws when a trigger is used outside Tabs", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<TabsTrigger value="x">x</TabsTrigger>)).toThrow(
      /within <Tabs>/,
    );
    spy.mockRestore();
  });
});

describe("<Dialog>", () => {
  it("renders nothing when closed", () => {
    render(
      <Dialog open={false} onOpenChange={() => {}}>
        <DialogTitle>Hidden</DialogTitle>
      </Dialog>,
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders content when open", () => {
    render(
      <Dialog open onOpenChange={() => {}}>
        <DialogTitle>Confirm</DialogTitle>
        <DialogDescription>Are you sure?</DialogDescription>
      </Dialog>,
    );
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
    expect(screen.getByText("Confirm")).toBeInTheDocument();
  });

  it("closes on overlay click and Escape", () => {
    const onOpenChange = vi.fn();
    render(
      <Dialog open onOpenChange={onOpenChange}>
        <DialogTitle>X</DialogTitle>
      </Dialog>,
    );
    fireEvent.click(screen.getByTestId("dialog-overlay"));
    expect(onOpenChange).toHaveBeenCalledWith(false);

    fireEvent.keyDown(document, { key: "Escape" });
    expect(onOpenChange).toHaveBeenCalledTimes(2);
  });
});

describe("<DropdownMenu>", () => {
  function Example({ onPick }: { onPick: () => void }) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={onPick}>Profile</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  it("is closed by default", () => {
    render(<Example onPick={() => {}} />);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Open" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("opens on trigger click and reveals items", () => {
    render(<Example onPick={() => {}} />);
    fireEvent.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Profile" })).toBeInTheDocument();
  });

  it("invokes the item handler and closes on select", () => {
    const onPick = vi.fn();
    render(<Example onPick={onPick} />);
    fireEvent.click(screen.getByRole("button", { name: "Open" }));
    fireEvent.click(screen.getByRole("menuitem", { name: "Profile" }));
    expect(onPick).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });
});
