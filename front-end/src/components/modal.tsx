import React, {useState} from "react";
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
import Input from "./input";
import Api from "../Api";
import {useUser} from "../context/user";

export default function ModalData({title}){
    const [task, setTask] = useState<string>('');
    const [date, setDate] = useState<string>('');

    const {user, token, getTasks} = useUser();

    const { isOpen, onOpen, onClose } = useDisclosure()

    async function setForm(e){
        e.preventDefault()
        const formData = new FormData;

        formData.append('task', task);
        formData.append('date', date);
        formData.append('user_id', user.id);

        await Api.NewTask(formData, token);
        setTask('');
        setDate('');
        getTasks();
        onClose();
    }

    return (
        <div style={{textAlign:"right"}}>
            <Button
                colorScheme={'messenger'}
                onClick={onOpen}>
                {title}
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <form onSubmit={setForm}  method="POST">
                <ModalContent>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                            label={'Nome tarefa'}
                            type={'text'}
                            value={task}
                            onchange={(e : React.FormEvent<EventTarget>) => setTask(e.target.value)}
                        />
                        <br/>
                        <Input
                            label={'Data'}
                            type={'datetime-local'}
                            value={date}
                            onchange={(e : React.FormEvent<EventTarget>) => setDate(e.target.value)}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Fechar
                        </Button>
                        <Button type={'submit'} colorScheme='whatsapp' >Salvar</Button>
                    </ModalFooter>
                </ModalContent>
                </form>
            </Modal>
        </div>
    )
}