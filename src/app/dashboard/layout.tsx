"use client";

// Imports
import SideNav from "@/components/side-nav";
import "@/app/dashboard/global.css";
import {useState, useEffect} from "react";
import {useMediaQuery, IconButton} from "@mui/material";
import {Menu as MenuIcon} from "@mui/icons-material";
import Grid from "@mui/material/Grid2";

// Exports
export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapse = () => setCollapsed(!collapsed);

    // Atualizar colapso quando mudar o tamanho da tela
    useEffect(() => {
        if (isMobile) {
            setCollapsed(true); // Minimizado por padrão no mobile
        } else {
            setCollapsed(false); // Aberto por padrão no desktop
        }
    }, [isMobile]);

    return (
        <div className={`dashboard-container ${collapsed ? "collapsed" : ""} ${isMobile ? "mobile" : ""}`}>
            <SideNav collapsed={collapsed} toggleCollapse={toggleCollapse} isMobile={isMobile} />
            <main className="dashboard-content">
                <Grid container justifyContent={"center"} minWidth={"100%"}>
                    <Grid size={{lg: 10, md: 10, sm: 11, xs: 12}}>{children}</Grid>
                </Grid>
            </main>

            {/* Botão flutuante para abrir o menu no mobile */}
            {isMobile && collapsed && (
                <IconButton className="floating-menu-btn" onClick={toggleCollapse} aria-label="Abrir menu" size="large">
                    <MenuIcon fontSize="inherit" />
                </IconButton>
            )}
        </div>
    );
}
