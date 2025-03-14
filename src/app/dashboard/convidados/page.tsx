"use client";

// Imports
import {Card, CardHeader, Chip, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {readConvidados} from "@/services/lista-api";
import ConvidadosInterface from "@/interfaces/convidados-interface";
import {useEffect, useState} from "react";

// Export
export default function Convidados() {
    // Objeto com os convidados
    const [convidados, setConvidados] = useState<ConvidadosInterface[]>([]);
    const convidadosOrdenados = convidados.sort((a, b) => a.name.localeCompare(b.name));

    // Chamada da função e recebimento dos dados dos convidados
    useEffect(() => {
        async function fetchData() {
            const data = await readConvidados();
            if (data) {
                setConvidados(data); // Atualiza o estado com os dados
            }
        }

        fetchData();
    }, []);

    return (
        <Grid container padding={5}>
            <Grid container minWidth={"100%"}>
                <Grid size={12}>
                    <Typography variant="h3">Convidados</Typography>
                </Grid>
                <Grid size={12}>
                    <Typography variant="h5">Dashboard / Convidados</Typography>
                </Grid>
            </Grid>
            <Grid container minWidth={"100%"} marginY={3}>
                <Card sx={{minWidth: "100%"}}>
                    <CardHeader title="Convidados" />
                    <Grid container></Grid>
                    <Grid container spacing={3} padding={3}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <Typography variant="h6">Nome</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="h6">Confirmado</Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {convidadosOrdenados.map((convidado, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <Typography>{convidado.name}</Typography>
                                        </TableCell>
                                        <TableCell>{convidado.confirmed ? <Chip label="Sim" variant="outlined" color="success" /> : <Chip label="Não" variant="outlined" color="error" />}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Grid>
                </Card>
            </Grid>
        </Grid>
    );
}
