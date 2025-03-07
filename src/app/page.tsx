"use client";

// Imports
import CircleImage from "@/components/circle-image";
import Presente from "@/components/presente";
import {Button, Card, CardHeader, MenuItem, Select, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {useEffect, useState} from "react";
import ConvidadosInterface from "@/interfaces/convidados-interface";
import {readConvidados, readPresentes, updateConvidado} from "../services/lista-api";
import PresentesInterface from "@/interfaces/presentes-interface";
import Swal from "sweetalert2";
import {blockBodyScroll, unblockBodyScroll} from "@/util/control-body-scroll";

// Export
export default function Home() {
    const [convidados, setConvidados] = useState<ConvidadosInterface[]>([]);
    const [presentes, setPresentes] = useState<PresentesInterface[]>([]);
    const [idConvidado, setIdConvidado] = useState<string>("");

    // UseEffect para ler convidados
    useEffect(() => {
        async function fetchData() {
            const data = await readConvidados();
            if (data) {
                setConvidados(data); // Atualiza o estado com os dados
            }
        }

        fetchData();
    }, []);

    // UseEffect para ler presentes
    useEffect(() => {
        async function fetchData() {
            const data = await readPresentes();
            if (data) {
                setPresentes(data); // Atualiza o estado com os dados
            }
        }

        fetchData();
    }, []);

    // Confirmar presença
    const confirmarPresenca = async (id: string) => {
        const convidado = convidados.find((convidado) => convidado.id === id);

        if (!convidado) {
            console.log("convidado não encontrado");
            blockBodyScroll();
            Swal.fire("Erro!", "Usuário não encontrado", "error");
            unblockBodyScroll();
        } else {
            const params = {name: convidado?.name, confirmed: true};
            try {
                const data = await updateConvidado(id, params);

                console.log(data);

                blockBodyScroll();
                Swal.fire("Sucesso!", "Presença confirmada com sucesso!", "success")
                    .then(unblockBodyScroll)
                    .then(() => {
                        window.location.reload();
                    });
            } catch (error) {
                blockBodyScroll();
                Swal.fire("Erro", `${error}`, "error");
                unblockBodyScroll();
            }
        }
    };

    return (
        <Grid container spacing={5} justifyContent={"center"} alignItems={"center"} style={{minWidth: "100%"}} padding={3}>
            <Grid container justifyContent={"center"} alignItems={"center"} style={{minWidth: "100%"}}>
                <CircleImage image="/logo.png" sizeFactor={0.3} />
            </Grid>
            <Grid container spacing={5} justifyContent={"center"} alignItems={"center"} style={{minWidth: "100%"}} padding={3}>
                <CircleImage image="/foto-principal.jpeg" sizeFactor={2} />
            </Grid>
            <Grid container spacing={5} justifyContent={"center"} alignItems={"center"} style={{minWidth: "100%"}}>
                <Typography textAlign={"center"} variant="h3">
                    Olá!
                    <br />
                    É com muita alegria que nós,
                    <br />
                    Gabriel e Beatriz,
                    <br />
                    Convidamos você para o nosso
                </Typography>
            </Grid>
            <Grid container spacing={5} justifyContent={"center"} alignItems={"center"} style={{minWidth: "100%"}}>
                <Typography className="titulo-especial" variant="h1" textAlign={"center"}>
                    Chá de Panela
                </Typography>
            </Grid>
            <Grid container spacing={5} justifyContent={"center"} alignItems={"center"} style={{minWidth: "100%"}}>
                <Typography textAlign={"center"} variant="h5">
                    10/05/2025
                    <br />
                    15h
                    <br />
                    Rua Francisco Canindé Figueiredo, 45, Centro, Goianinha
                </Typography>
            </Grid>
            <Grid container spacing={5} justifyContent={"center"} alignItems={"center"} style={{minWidth: "100%"}}>
                <Grid size={{lg: 3, md: 6, sm: 10}}>
                    <Card>
                        <CardHeader title={"Confirme sua presença"} sx={{textAlign: "center"}} />
                        <Grid padding={2}>
                            <Select
                                value={idConvidado}
                                onChange={(e) => {
                                    setIdConvidado(e.target.value);
                                }}
                                fullWidth
                                MenuProps={{disableScrollLock: true}} // ✅ Evita o deslocamento da página
                            >
                                <MenuItem value={""}>Nenhum</MenuItem>
                                {convidados
                                    .filter((convidado) => !convidado.confirmed)
                                    .map((convidado, index) => (
                                        <MenuItem key={index} value={convidado.id}>
                                            {convidado.name}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </Grid>
                        <Grid padding={2}>
                            <Button onClick={() => confirmarPresenca(idConvidado)} fullWidth variant="outlined" sx={{borderColor: "#ca6234", color: "#ca6234"}}>
                                Confirmar
                            </Button>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
            <Grid container spacing={5} justifyContent={"center"} alignItems={"center"} style={{minWidth: "100%"}}>
                <Typography variant="h3" textAlign={"center"}>
                    Lista de presentes
                </Typography>
            </Grid>
            <Grid container spacing={5} justifyContent={"center"} alignItems={"center"} style={{minWidth: "100%"}}>
                {presentes
                    .filter((presente) => presente.status)
                    .map((presente, index) => (
                        <Grid size={{lg: 4, md: 8, sm: 10}} key={index}>
                            <Presente presente={presente} convidados={convidados} />
                        </Grid>
                    ))}
            </Grid>
        </Grid>
    );
}
