import { createInertiaApp } from "@inertiajs/react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { initializeTheme } from "@/hooks/use-appearance";
import AppLayout from "@/layouts/app-layout";
import AuthLayout from "@/layouts/auth-layout";
import SettingsLayout from "@/layouts/settings/layout";

const rawAppName = import.meta.env.VITE_APP_NAME;
const appName =
    !rawAppName || rawAppName === "Laravel" || rawAppName === "parafia"
        ? "Parafia św. Wawrzyńca w Olbierzowicach"
        : rawAppName;

createInertiaApp({
    title: (title) => (title ? `${title} – ${appName}` : appName),
    layout: (name) => {
        switch (true) {
            case name.startsWith("auth/"):
                return AuthLayout;

            case name.startsWith("settings/"):
                return [AppLayout, SettingsLayout];

            case name === "Dashboard" || name.startsWith("admin/"):
                return AppLayout;

            default:
                return null;
        }
    },
    strictMode: true,
    withApp(app) {
        return (
            <TooltipProvider delayDuration={0}>
                {app}
                <Toaster />
            </TooltipProvider>
        );
    },
    progress: {
        color: "#c69b4f",
    },
});

// This will set light / dark mode on load...
initializeTheme();
