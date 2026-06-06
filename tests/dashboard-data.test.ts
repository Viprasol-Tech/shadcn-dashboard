import { describe, it, expect } from "vitest";
import {
  recentActivity,
  statusVariant,
  stats,
  type ActivityRow,
} from "@/lib/dashboard-data";

describe("statusVariant", () => {
  it("maps each status to the expected badge variant", () => {
    expect(statusVariant("active")).toBe("default");
    expect(statusVariant("pending")).toBe("secondary");
    expect(statusVariant("churned")).toBe("destructive");
  });

  it("returns a value for every status in the data", () => {
    for (const row of recentActivity) {
      expect(["default", "secondary", "destructive"]).toContain(
        statusVariant(row.status),
      );
    }
  });
});

describe("dashboard data", () => {
  it("ships four headline stats", () => {
    expect(stats).toHaveLength(4);
  });

  it("uses unique invoice ids in recent activity", () => {
    const ids = recentActivity.map((r: ActivityRow) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
