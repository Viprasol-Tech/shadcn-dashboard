import { Sidebar } from "@/components/sidebar";
import { StatCard } from "@/components/stat-card";
import { Button } from "@/components/ui/button";
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
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
            <p className="text-sm text-muted-foreground">
              Welcome back. Here is what is happening today.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Export
            </Button>
            <Button size="sm">New report</Button>
          </div>
        </header>

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
