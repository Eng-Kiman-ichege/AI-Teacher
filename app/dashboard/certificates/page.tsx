import { Trophy } from "lucide-react";

export default function CertificatesPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center">
        <Trophy className="h-10 w-10 text-amber-500" />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Certificates</h1>
        <p className="text-muted-foreground max-w-sm">
          You haven't earned any certificates yet. Complete a course and pass the final exam to get certified!
        </p>
      </div>
    </div>
  );
}
