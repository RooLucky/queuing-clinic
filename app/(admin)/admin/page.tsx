import { Activity, CheckCircle2, Clock3, UsersRound } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

const metrics = [
  { key: "waiting", label: "Waiting", icon: Clock3, tone: "text-amber-600" },
  { key: "serving", label: "In consultation", icon: Activity, tone: "text-primary" },
  { key: "completed", label: "Completed", icon: CheckCircle2, tone: "text-emerald-600" },
] as const;

export default async function AdminDashboardPage() {
  const [waiting, serving, completed, total] = await Promise.all([
    prisma.queueEntry.count({ where: { status: "WAITING" } }),
    prisma.queueEntry.count({ where: { status: "SERVING" } }),
    prisma.queueEntry.count({ where: { status: "COMPLETED" } }),
    prisma.queueEntry.count(),
  ]);

  const values = { completed, serving, waiting };

  return (
    <main className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8 sm:px-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <Badge className="mb-3" variant="outline">Today&apos;s clinic</Badge>
          <h1 className="text-3xl font-semibold tracking-tight">Queue overview</h1>
          <p className="mt-2 text-muted-foreground">
            A live snapshot of today&apos;s patient flow.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2 text-sm">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          Queue is live
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardDescription>Total checked in</CardDescription>
            <CardTitle className="text-3xl">{total}</CardTitle>
          </CardHeader>
          <CardContent>
            <UsersRound className="size-5 text-muted-foreground" />
          </CardContent>
        </Card>
        {metrics.map(({ icon: Icon, key, label, tone }) => (
          <Card key={key}>
            <CardHeader>
              <CardDescription>{label}</CardDescription>
              <CardTitle className="text-3xl">{values[key]}</CardTitle>
            </CardHeader>
            <CardContent>
              <Icon className={`size-5 ${tone}`} />
            </CardContent>
          </Card>
        ))}
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Doctor workload</CardTitle>
          <CardDescription>
            Doctor assignments will appear here as patients check in.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid min-h-52 place-items-center rounded-xl border border-dashed bg-muted/30 p-8 text-center">
            <div>
              <UsersRound className="mx-auto mb-3 size-8 text-muted-foreground" />
              <p className="font-medium">No doctor queues configured</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Add doctors and room assignments to start tracking workload.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
