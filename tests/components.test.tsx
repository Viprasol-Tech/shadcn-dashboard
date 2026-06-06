import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

describe("<Button>", () => {
  it("renders its children", () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole("button", { name: "Click me" }),
    ).toBeInTheDocument();
  });

  it("defaults to type=button and the default variant/size", () => {
    render(<Button>Go</Button>);
    const btn = screen.getByRole("button", { name: "Go" });
    expect(btn).toHaveAttribute("type", "button");
    expect(btn).toHaveAttribute("data-variant", "default");
    expect(btn).toHaveAttribute("data-size", "md");
  });

  it("applies variant and size classes", () => {
    render(
      <Button variant="destructive" size="lg">
        Delete
      </Button>,
    );
    const btn = screen.getByRole("button", { name: "Delete" });
    expect(btn).toHaveAttribute("data-variant", "destructive");
    expect(btn.className).toContain("bg-destructive");
    expect(btn.className).toContain("h-12");
  });

  it("renders the outline and ghost variants", () => {
    const { rerender } = render(<Button variant="outline">Edit</Button>);
    expect(screen.getByRole("button").className).toContain("border");
    rerender(<Button variant="ghost">Edit</Button>);
    expect(screen.getByRole("button").className).toContain("bg-transparent");
  });
});

describe("<Card>", () => {
  it("composes header, title and content", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Revenue</CardTitle>
        </CardHeader>
        <CardContent>$45,231</CardContent>
      </Card>,
    );
    expect(
      screen.getByRole("heading", { name: "Revenue" }),
    ).toBeInTheDocument();
    expect(screen.getByText("$45,231")).toBeInTheDocument();
  });
});

describe("<Badge>", () => {
  it("renders text with the chosen variant", () => {
    render(<Badge variant="secondary">active</Badge>);
    const badge = screen.getByText("active");
    expect(badge).toHaveAttribute("data-variant", "secondary");
  });
});
