"use client";

import * as React from "react";
import { Sidebar } from "@/components/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/toast";

const ROLES = ["Owner", "Admin", "Member", "Viewer"] as const;
type Role = (typeof ROLES)[number];

export default function SettingsPage() {
  const { toast } = useToast();
  const [name, setName] = React.useState("Viprasol Tech");
  const [email, setEmail] = React.useState("support@viprasol.com");
  const [role, setRole] = React.useState<Role>("Owner");

  return (
    <div className="flex min-h-screen">
      <Sidebar pathname="/settings" />

      <main className="flex-1 p-8">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
            <p className="text-sm text-muted-foreground">
              Manage your workspace, profile, and appearance.
            </p>
          </div>
          <ThemeToggle />
        </header>

        <Tabs defaultValue="profile" className="max-w-2xl">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="workspace">Workspace</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>
                  Update your personal account details.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <label className="flex flex-col gap-1.5 text-sm font-medium">
                  Display name
                  <Input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-sm font-medium">
                  Email
                  <Input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </label>
              </CardContent>
              <CardFooter className="justify-end">
                <Button
                  onClick={() =>
                    toast({
                      title: "Profile saved",
                      description: `Updated details for ${name}.`,
                      variant: "success",
                    })
                  }
                >
                  Save changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="workspace">
            <Card>
              <CardHeader>
                <CardTitle>Workspace</CardTitle>
                <CardDescription>
                  Control roles and team access.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <span>Your role</span>
                  <Badge>{role}</Badge>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger className="inline-flex h-8 items-center rounded-md border border-border px-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
                    Change role
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Assign role</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {ROLES.map((option) => (
                      <DropdownMenuItem
                        key={option}
                        onClick={() => {
                          setRole(option);
                          toast({ title: `Role set to ${option}` });
                        }}
                      >
                        {option}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                  Switch between light, dark, and system themes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ThemeToggle />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
