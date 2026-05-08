import { Suspense } from "react";
import { getOrCreateUser } from "@/lib/supabase/user-sync";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Trophy, Download, ExternalLink, Calendar, Award, Star } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

async function CertificatesContent() {
  const user = await getOrCreateUser();
  if (!user) return null;

  const supabase = await createClient();

  const { data: certificates } = await supabase
    .from("certificates")
    .select(`
      *,
      course:courses(title, category)
    `)
    .eq("user_id", user.user_id)
    .order("issued_at", { ascending: false });

  if (!certificates || certificates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8">
        <div className="relative">
          <div className="w-24 h-24 bg-amber-500/10 rounded-3xl flex items-center justify-center rotate-12 transition-transform hover:rotate-0 duration-500">
            <Trophy className="h-12 w-12 text-amber-500" />
          </div>
          <Star className="absolute -top-2 -right-2 h-6 w-6 text-amber-400 animate-pulse" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">No Certificates Yet</h1>
          <p className="text-muted-foreground max-w-sm mx-auto">
            Complete all lessons in a course to earn your official AI Teacher certificate of completion.
          </p>
        </div>
        <Button size="lg" className="rounded-xl shadow-xl shadow-primary/20" asChild>
          <Link href="/dashboard/courses">Continue Learning</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <header className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Certificates</h1>
        <p className="text-muted-foreground">Celebrate your achievements and share your expertise.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {certificates.map((cert) => (
          <Card key={cert.id} className="group relative overflow-hidden border-none bg-gradient-to-br from-background/80 to-muted/30 backdrop-blur-md shadow-2xl shadow-black/5 hover:shadow-primary/5 transition-all duration-500 rounded-[2rem]">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 h-48 w-48 rounded-full bg-primary/5 blur-3xl group-hover:bg-primary/10 transition-colors" />
            
            <CardHeader className="relative z-10 pb-2">
              <div className="flex justify-between items-start">
                <div className="bg-primary/10 p-3 rounded-2xl">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <Badge variant="outline" className="rounded-full border-primary/20 text-primary font-black uppercase tracking-widest text-[9px] px-3">
                  Verified
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="relative z-10 space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Course of Mastery</span>
                <CardTitle className="text-2xl font-black leading-tight tracking-tight text-foreground group-hover:text-primary transition-colors">
                  {cert.course?.title}
                </CardTitle>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Issued On</span>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
                    <Calendar className="h-3 w-3 text-primary/70" />
                    {format(new Date(cert.issued_at), "MMMM d, yyyy")}
                  </div>
                </div>
                <div className="flex flex-col gap-1 border-l border-border pl-6">
                  <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Recipient</span>
                  <div className="text-xs font-bold text-slate-300">
                    {user.first_name} {user.last_name}
                  </div>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <Button className="flex-1 rounded-xl font-bold h-12 shadow-lg shadow-primary/10 transition-all hover:scale-[1.02] active:scale-[0.98]">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
                <Button variant="outline" className="rounded-xl border-border/50 hover:bg-white/5 font-bold h-12 px-5">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function CertificatesSkeleton() {
  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[1, 2].map((i) => (
          <Skeleton key={i} className="h-72 rounded-[2rem]" />
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<CertificatesSkeleton />}>
      <CertificatesContent />
    </Suspense>
  );
}
