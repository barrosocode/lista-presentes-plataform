"use client";
// Imports
import {createConvidado} from "@/services/lista-api";
import {Button, Card, CardHeader, TextField, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {useState} from "react";
import Swal from "sweetalert2";

// Export
export default function CreateConvidado() {
    // Constantes para atribuir valor ao nome
    const [name, setName] = useState<string>("");

    // Função para cadastrar convidado
    const cadastrarConvidado = async () => {
        // Tratar parâmetros da requisição
        const params = {
            name: name,
            confirmed: false,
        };

        // Realizar requisição
        try {
            const data = await createConvidado(params);

            if (data.id) {
                Swal.fire("Sucesso!", "Convidado cadastrado com sucesso", "success").then(() => {
                    window.location.href = "/dashboard/convidados";
                });
            } else {
                Swal.fire("Erro!", `Erro ao cadastrar convidado: ${JSON.stringify(data)}`, "error");
            }
        } catch (error) {
            Swal.fire("Erro!", `Erro ao cadastrar convidado: ${JSON.stringify(error)}`, "error");
        }
    };

    return (
        <Grid container padding={5}>
            <Grid container minWidth={"100%"}>
                <Grid size={12}>
                    <Typography variant="h3">Convidados</Typography>
                </Grid>
                <Grid size={12}>
                    <Typography variant="h5">Dashboard / Convidados / Cadastrar Convidado</Typography>
                </Grid>
            </Grid>
            <Grid container minWidth={"100%"} marginY={3}>
                <Card sx={{minWidth: "100%"}}>
                    <CardHeader title="Cadastrar Convidado" />
                    <Grid>
                        <Grid container minWidth={"100%"} padding={2} justifyContent={"center"}>
                            <Grid size={6}>
                                <Typography>Nome</Typography>
                                <TextField onChange={(e) => setName(e.target.value)} value={name} fullWidth />
                            </Grid>
                        </Grid>
                        <Grid container minWidth={"100%"} padding={2} justifyContent={"center"}>
                            <Grid size={3}>
                                <Button onClick={() => cadastrarConvidado()} variant="outlined" fullWidth sx={{borderColor: "#ca6234", color: "#ca6234"}}>
                                    Cadastrar
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
        </Grid>
    );
}
