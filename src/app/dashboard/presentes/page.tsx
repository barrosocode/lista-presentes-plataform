"use client";

// Imports
import ConvidadosInterface from "@/interfaces/convidados-interface";
import PresentesConvidadosInterface from "@/interfaces/presentes-convidados-interface";
import PresentesInterface from "@/interfaces/presentes-interface";
import {readConvidados, readPresentes, readPresentesConvidados, readRoles} from "@/services/lista-api";
import {Box, Card, CardHeader, Chip, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {useEffect, useState} from "react";

// interface ItemListaInterface {
//     id: string;
//     name: string;
//     amount: number;
//     status: boolean;
//     convidados: ConvidadosInterface
// }

// Export
export default function Presentes() {
    // Objeto com os presentes
    const [presentes, setPresentes] = useState<PresentesInterface[]>([]);
    const [presentesConvidados, setPresentesConvidados] = useState<PresentesConvidadosInterface[]>([]);
    const [convidados, setConvidados] = useState<ConvidadosInterface[]>([]);
    // const [lista, setLista] = useState<ItemListaInterface[]>([]);

    // // Função para gerar a lista com os dados já recebidos
    // const generateList = () => {
    //     if (convidados && presentes && presentesConvidados) {
    //         const novaLista = presentes.map((e) => {
    //             return {
    //                 id: e.id,
    //                 name: e.name,
    //                 amount: e.amount,
    //                 status: e.status,

    //             };
    //         });

    //         setLista(novaLista); // Aqui definimos a lista completa de uma vez
    //     }
    // };

    // Chamada da função que lista os presentes
    useEffect(() => {
        // Chamada da função que lista os presentes
        async function fetchPresentes() {
            const data = await readPresentes();
            if (data) {
                setPresentes(data);
            }
        }
        // Chamada da função que lista os presentes assinados
        async function fetchPresentesConvidados() {
            const data = await readPresentesConvidados();
            if (data) {
                setPresentesConvidados(data);
            }
        }
        // Chamada da função que lista os convidados
        async function fetchConvidados() {
            const data = await readConvidados();
            if (data) {
                setConvidados(data);
            }
        }

        fetchPresentes();
        fetchPresentesConvidados();
        fetchConvidados();
    }, []);

    // Chama generateList quando os dados forem carregados
    useEffect(() => {
        async function fetchData() {
            const data = await readRoles();
            console.log(data);
        }

        fetchData();
    }, []);

    console.log(presentesConvidados);
    console.log(convidados);
    // console.log(lista);

    return (
        <Grid container padding={5}>
            <Grid container minWidth={"100%"}>
                <Grid size={12}>
                    <Typography variant="h3">Presentes</Typography>
                </Grid>
                <Grid size={12}>
                    <Typography variant="h5">Dashboard / Presentes</Typography>
                </Grid>
            </Grid>
            <Grid container minWidth={"100%"} marginY={3}>
                <Card sx={{minWidth: "100%"}}>
                    <CardHeader title="Presentes" />
                    <Grid container spacing={3} padding={3}>
                        <Box sx={{width: "100%", overflowX: "auto"}}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <Typography>Nome</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>Quantidade</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>Status</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>Convidado</Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {presentes.map((presente, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <Typography>{presente.name}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>{presente.amount}</Typography>
                                            </TableCell>
                                            {/* {presente.status ? (
                                                <>
                                                    <TableCell>
                                                        <Chip label="Disponível" color="success" variant="outlined" />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography>_______</Typography>
                                                    </TableCell>
                                                </>
                                            ) : (
                                                <>
                                                    <TableCell>
                                                        <Chip label="Indisponível" color="error" variant="outlined" />
                                                    </TableCell>
                                                    <TableCell>{convidados.find((element) => element.id == presentesConvidados.find((e) => e.presente == presente.id)?.convidado)?.name ?? "Convidado não identificado"} </TableCell>
                                                </>
                                            )} */}
                                            <TableCell>{presente.status ? <Chip label="Disponível" color="success" variant="outlined" /> : <Chip label="Indisponível" color="error" variant="outlined" />}</TableCell>
                                            <TableCell>
                                                <Typography>{presentesConvidados.filter((e) => e.presente == presente.id).map((presenteConvidado, index) => (!index ? convidados.find((e) => e.id == presenteConvidado.convidado)?.name : "/ " + convidados.find((e) => e.id == presenteConvidado.convidado)?.name))}</Typography>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Grid>
                </Card>
            </Grid>
        </Grid>
    );
}
