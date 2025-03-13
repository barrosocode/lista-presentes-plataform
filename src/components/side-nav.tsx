// // Imports
// import {Card, Typography, IconButton} from "@mui/material";
// import Grid from "@mui/material/Grid2";
// import {ChevronLeft, ChevronRight} from "@mui/icons-material";

// // Props
// interface SideNavProps {
//     collapsed: boolean;
//     toggleCollapse: () => void;
// }

// // Component
// const SideNav = ({collapsed, toggleCollapse}: SideNavProps) => {
//     return (
//         <Grid container className={collapsed ? "collapsed" : ""}>
//             <Card sx={{minWidth: "100%", height: "100vh", borderRadius: 0}}>
//                 <Grid padding={2} display="flex" justifyContent="space-between" alignItems="center">
//                     <Typography>{collapsed ? "S" : "SideNav"}</Typography>
//                     <IconButton onClick={toggleCollapse} size="small">
//                         {collapsed ? <ChevronRight /> : <ChevronLeft />}
//                     </IconButton>
//                 </Grid>

//                 {/* Exemplo de conteúdo de navegação */}
//                 {!collapsed && (
//                     <Grid padding={2}>
//                         <Typography variant="body2">Item 1</Typography>
//                         <Typography variant="body2">Item 2</Typography>
//                         <Typography variant="body2">Item 3</Typography>
//                     </Grid>
//                 )}
//             </Card>
//         </Grid>
//     );
// };

// // Export
// export default SideNav;

// Imports
import {Card, Typography, IconButton} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {ChevronLeft, ChevronRight} from "@mui/icons-material";

// Props
interface SideNavProps {
    collapsed: boolean;
    toggleCollapse: () => void;
    isMobile: boolean;
}

// Component
const SideNav = ({collapsed, toggleCollapse, isMobile}: SideNavProps) => {
    return (
        <Grid container className={`${collapsed ? "collapsed" : ""} ${isMobile ? "mobile" : ""}`}>
            <Card sx={{minWidth: "100%", height: "100vh", borderRadius: 0}}>
                <Grid padding={2} display="flex" justifyContent="space-between" alignItems="center">
                    <Typography>{collapsed ? "S" : "SideNav"}</Typography>
                    <IconButton onClick={toggleCollapse} size="small">
                        {collapsed ? <ChevronRight /> : <ChevronLeft />}
                    </IconButton>
                </Grid>

                {/* Exemplo de conteúdo de navegação */}
                {!collapsed && (
                    <Grid padding={2}>
                        <Typography variant="body2">Item 1</Typography>
                        <Typography variant="body2">Item 2</Typography>
                        <Typography variant="body2">Item 3</Typography>
                    </Grid>
                )}
            </Card>
        </Grid>
    );
};

// Export
export default SideNav;
