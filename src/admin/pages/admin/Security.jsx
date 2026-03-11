import { useEffect, useState } from "react";
import { LogOut, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/admin/components/admin/PageHeader";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { adminApi } from "@/lib/adminApi";
import { useAdminAuth, ADMIN_EMAIL } from "@/contexts/AdminAuthContext";

const Security = () => {
  const navigate = useNavigate();
  const { logout } = useAdminAuth();
  const [loginActivity, setLoginActivity] = useState([]);
  const [loadingActivity, setLoadingActivity] = useState(true);
  const [activityError, setActivityError] = useState("");
  const [adminEmail, setAdminEmail] = useState(ADMIN_EMAIL);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [sessionTime, setSessionTime] = useState("30 minutos");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);

  const formatLoginDate = (value) => {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);
    return new Intl.DateTimeFormat("pt-PT", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }).format(date);
  };

  const loadLoginActivity = async () => {
    try {
      setLoadingActivity(true);
      setActivityError("");
      const result = await adminApi.listLoginActivity();
      const rows = Array.isArray(result) ? result : Array.isArray(result?.data) ? result.data : [];
      setLoginActivity(rows);
    } catch (e) {
      setActivityError(e instanceof Error ? e.message : "Falha ao carregar atividades de login");
      setLoginActivity([]);
    } finally {
      setLoadingActivity(false);
    }
  };

  useEffect(() => {
    void loadLoginActivity();

    // Try to prefill email from storage if available.
    if (typeof window !== "undefined") {
      const storedEmail = window.localStorage.getItem("admin:email") || window.sessionStorage.getItem("admin:email");
      if (storedEmail && storedEmail.includes("@")) {
        setAdminEmail(storedEmail);
      } else {
        setAdminEmail(ADMIN_EMAIL);
      }
    }
  }, []);
 
  const handleChangePassword = async () => {
    setPasswordError("");
    setPasswordSuccess("");
    if (!currentPassword.trim() || !newPassword.trim()) {
      setPasswordError("Preencha a palavra-passe atual e a nova palavra-passe.");
      return;
    }
    if (newPassword.trim().length < 6) {
      setPasswordError("A nova palavra-passe deve ter pelo menos 6 caracteres.");
      return;
    }
    try {
      setSavingPassword(true);
      await adminApi.changeAdminPassword({
        email: adminEmail.trim(),
        current_password: currentPassword,
        new_password: newPassword
      });
      setPasswordSuccess("Palavra-passe atualizada com sucesso.");
      setCurrentPassword("");
      setNewPassword("");
    } catch (e) {
      const message = e instanceof Error ? e.message : "Falha ao atualizar a palavra-passe";
      setPasswordError(message);
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="SeguranÃ§a do Admin"
        description="Gira autenticaÃ§Ã£o, sessÃµes e controlos de acesso."
        actions={
          <Button
            variant="outline"
            onClick={() => {
              logout();
              navigate("/", { replace: true });
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <Card className="border-border/60 bg-card/90">
          <CardHeader>
            <CardTitle className="font-display text-xl">Alterar palavra-passe</CardTitle>
            <CardDescription>Atualize as credenciais do admin.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border border-border/60 bg-background/70 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Login do Admin</p>
              <p className="text-sm font-medium">{adminEmail}</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Palavra-passe atual</label>
              <Input
                type="password"
                placeholder="********"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Nova palavra-passe</label>
              <Input
                type="password"
                placeholder="********"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Tempo de sessÃ£o</label>
              <Input
                placeholder="30 minutos"
                value={sessionTime}
                onChange={(e) => setSessionTime(e.target.value)}
              />
            </div>
            {passwordError ? <p className="text-sm text-destructive">{passwordError}</p> : null}
            {passwordSuccess ? <p className="text-sm text-emerald-600">{passwordSuccess}</p> : null}
            <Button disabled={savingPassword} onClick={() => void handleChangePassword()}>
              {savingPassword ? "A guardar..." : "Guardar palavra-passe"}
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-card/90">
          <CardHeader>
            <CardTitle className="font-display text-xl">Melhorias de seguranÃ§a</CardTitle>
            <CardDescription>ProteÃ§Ãµes opcionais para preparar o futuro.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border border-border/60 bg-background/70 p-3">
              <div>
                <p className="text-sm font-medium">AutenticaÃ§Ã£o de dois fatores</p>
                <p className="text-xs text-muted-foreground">VerificaÃ§Ã£o adicional de login</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border/60 bg-background/70 p-3">
              <div>
                <p className="text-sm font-medium">Sistema de perfis (futuro)</p>
                <p className="text-xs text-muted-foreground">Preparar acesso multi-admin</p>
              </div>
              <Switch />
            </div>
            <Button variant="outline" className="w-full">
              <ShieldCheck className="mr-2 h-4 w-4" />
              Rever polÃ­ticas
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/60 bg-card/90">
        <CardHeader>
          <CardTitle className="font-display text-xl">Registo de atividade de login</CardTitle>
          <CardDescription>Entradas recentes do admin.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>LocalizaÃ§Ã£o</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loadingActivity ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-sm text-muted-foreground">
                    A carregar atividade de login...
                  </TableCell>
                </TableRow>
              ) : activityError ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-sm text-destructive">
                    {activityError}
                  </TableCell>
                </TableRow>
              ) : loginActivity.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-sm text-muted-foreground">
                    Nenhuma atividade de login encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                loginActivity.map((entry, index) => {
                  const displayDate = formatLoginDate(
                    entry.date || entry.created_at || entry.logged_at || entry.timestamp
                  );
                  const location =
                    entry.location || entry.city || entry.store_name || entry.store || "-";
                  const statusValue = (entry.status || entry.result || entry.outcome || "Desconhecido").toString();

                  return (
                    <TableRow key={entry.id ?? index}>
                      <TableCell>{displayDate}</TableCell>
                      <TableCell>{location}</TableCell>
                      <TableCell>
                        <StatusBadge status={statusValue} label={entry.status_label || statusValue} />
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

var stdin_default = Security;
export {
  stdin_default as default
};
