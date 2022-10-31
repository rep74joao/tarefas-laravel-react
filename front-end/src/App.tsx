import React, {Suspense} from 'react'
import 'react-toastify/dist/ReactToastify.css';
import {UserProvider} from "./context/user";
import {TaskProvider} from "./context/task";
import {
    BrowserRouter,
} from "react-router-dom";
import Router from "./routes";
import { ChakraProvider } from '@chakra-ui/react'

function App() {
    return (
   <>
       <ChakraProvider>
           <UserProvider>
                 <BrowserRouter>
                     <Suspense>
                         <Router />
                     </Suspense>
                 </BrowserRouter>
           </UserProvider>
       </ChakraProvider>
   </>
  )
}

export default App
