import React, {useEffect, useState} from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,Button
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'

import {useUser} from "../context/user";
import Api from "../Api";

export default function ModalDeleteData({id, open, setOpen}){

    const { isOpen, onOpen, onClose } = useDisclosure()

    const {token, getTasks} = useUser();


    useEffect(() => {
        if (open){
            onOpen();
        }
    },[open])

    async function del(){
        await Api.Delete(id, token);
        onClose();
        getTasks();
        setOpen();
    }

    function openModal(){
        onOpen();
    }

    return (
        <div style={{textAlign:"right"}}>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />

                <ModalContent>
                    <ModalHeader>Deseja excluir realmente essa tarefa?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Fechar
                        </Button>
                        <Button type={'button'} onClick={() => del()} colorScheme='whatsapp' >Sim</Button>
                    </ModalFooter>
                </ModalContent>

            </Modal>
        </div>
    )
}