import { Settings as SettingsIcon } from "lucide-react";
import { UserProfile } from "@clerk/nextjs";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences.</p>
      </div>
      
      <div className="bg-background rounded-3xl border border-border overflow-hidden">
        <UserProfile routing="hash" />
      </div>
    </div>
  );
}
