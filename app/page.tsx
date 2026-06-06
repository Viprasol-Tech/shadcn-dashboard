import { Sidebar } from "@/components/sidebar";
import { StatCard } from "@/components/stat-card";
import { Topbar } from "@/components/topbar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { stats, recentActivity, statusVariant } from "@/lib/dashboard-data";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar pathname="/" />

      <main className="flex-1 p-8">
        <Topbar
          title="Overview"
          description="Welcome back. Here is what is happening today."
        />

        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </section>

        <Card>
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
            <CardDescription>
              Latest invoices across your workspace.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="divide-y divide-border">
              {recentActivity.map((row) => (
                <li
                  key={row.id}
                  className="flex items-center justify-between py-3"
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{row.customer}</span>
                    <span className="text-xs text-muted-foreground">
                      {row.id}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant={statusVariant(row.status)}>
                      {row.status}
                    </Badge>
                    <span className="w-20 text-right font-medium">
                      {row.amount}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
