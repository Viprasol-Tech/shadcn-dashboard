import type { StatCardProps } from "@/components/stat-card";

export const stats: ReadonlyArray<StatCardProps> = [
  {
    title: "Total Revenue",
    value: "$45,231",
    description: "vs last month",
    change: "+20.1%",
    trend: "up",
  },
  {
    title: "Subscriptions",
    value: "2,350",
    description: "vs last month",
    change: "+12.5%",
    trend: "up",
  },
  {
    title: "Active Now",
    value: "573",
    description: "vs last hour",
    change: "-3.2%",
    trend: "down",
  },
  {
    title: "Sales",
    value: "12,234",
    description: "vs last month",
    change: "+8.0%",
    trend: "up",
  },
];

export interface ActivityRow {
  id: string;
  customer: string;
  status: "active" | "pending" | "churned";
  amount: string;
}

export const recentActivity: ReadonlyArray<ActivityRow> = [
  { id: "INV-1024", customer: "Acme Corp", status: "active", amount: "$1,200" },
  { id: "INV-1025", customer: "Globex", status: "pending", amount: "$540" },
  { id: "INV-1026", customer: "Initech", status: "churned", amount: "$0" },
  { id: "INV-1027", customer: "Umbrella", status: "active", amount: "$3,400" },
];

/** Map an activity status to a Badge variant. */
export function statusVariant(
  status: ActivityRow["status"],
): "default" | "secondary" | "destructive" {
  switch (status) {
    case "active":
      return "default";
    case "pending":
      return "secondary";
    case "churned":
      return "destructive";
  }
}
