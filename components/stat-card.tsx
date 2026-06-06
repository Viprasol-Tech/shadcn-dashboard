import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface StatCardProps {
  title: string;
  value: string;
  description: string;
  /** Percentage change, e.g. "+12.5%". Positive values render as default. */
  change: string;
  trend: "up" | "down";
}

export function StatCard({
  title,
  value,
  description,
  change,
  trend,
}: StatCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-3xl">{value}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-2">
        <Badge variant={trend === "up" ? "default" : "destructive"}>
          {change}
        </Badge>
        <span className="text-sm text-muted-foreground">{description}</span>
      </CardContent>
    </Card>
  );
}

export default StatCard;
