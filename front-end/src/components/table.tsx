import React, {useState} from "react";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'
import ModalDeleteData from "./modalConfirm";
import {useUser} from "../context/user";

export default function TableData(){
    const {user, tasks} = useUser();

    const [id, setId] = useState('');
    const [open, setOpen] = useState(false);

    function getModal(id){
        setId(id);
        setOpen(true)
    }

    return(
        <TableContainer>
            <ModalDeleteData id={id} open={open} setOpen={() => setOpen(false)}/>

            <Table variant='striped' colorScheme='gray'>
                <TableCaption>Tarefas de {user && user.name}</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Tarefa</Th>
                        <Th>Data</Th>
                        <Th isNumeric>Ações</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {tasks && tasks.map(t => (
                        <Tr key={t.id}>
                            <Td>{t.task}</Td>
                            <Td>{t.date}</Td>
                            <Td isNumeric >
                                <a href="#" onClick={() => getModal(t.id)}>Excluir</a>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>

            </Table>
        </TableContainer>
    )
}