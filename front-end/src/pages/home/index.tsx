import React from "react";
import Table from "../../components/table";
import Modal from "../../components/modal"


export default function Home(){

    return(
      <>
          <div className="lg:text-center">
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                  Minhas Tafefas</p>
          </div>
          <Modal title={"Nova Tarefa"} />
         <Table />

      </>
    )
}