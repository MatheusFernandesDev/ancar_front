import DataTable from "@/components/DataTable";
import NavBar from "@/components/NavBar";
import NavItem from "@/components/NavBar/NavItem";
import styles from "../../styles/User.module.css";
import { FiTag, FiList } from "react-icons/fi";
import { useToast } from "@chakra-ui/react";
import api from "@/services/api";
import { useEffect, useState } from "react";
import moment from "moment";

import { useRouter } from "next/router";

const Brand = () => {
  const toast = useToast();
  const router = useRouter();

  const filterOptions = [{ id: "description", name: `Descrição` }];

  const columns = [
    {
      name: "Data de criação",
      selector: "date",
      cell: (row) => moment(row.date).format("DD/MM/YYYY"),
    },
    { name: "Nome Questionário", selector: "name" },

    {
      name: "Descrição",
      selector: "description",
    },
  ];

  const actionColumn = [
    {
      name: "Vizualizar Perguntas",
      icon: <FiList />,
      action: (row) => {
        handlerAskins(row.id);
      },
    },
  ];

  // USE STATES
  const [data, setData] = useState([]);

  async function loadHandler() {
    try {
      const { data: response, status } = await api.get("/question", {
        validateStatus: (status) => status === 200 || status === 204,
      });

      if (status === 204 || !response) {
        setData([]);
      } else {
        setData(response.items);
      }
    } catch {
      toast({
        title: "Erro ao carregar Questionários",
        status: "error",
      });
    }
  }

  function handleDelete(id) {
    api
      .delete(`/question/${id}`)
      .then(() => {
        loadHandler();
        return toast({
          title: "Questionario Deletado com sucesso",
          status: "success",
        });
      })
      .catch(() => {
        return toast({
          title: "Error ao Deletar Questionario",
          status: "error",
        });
      });
  }

  function handleEdit(id) {
    router.push(`/questions/edit/${id}`);
  }

  function handlerAskins(id) {
    router.push(`/questions/answer/${id}`);
  }
  useEffect(() => {
    loadHandler();
  }, []);

  return (
    <NavBar flexDirection="column">
      <NavItem
        marginLeft="0"
        marginBottom="10px"
        backgroundColor="white"
        icon={FiTag}
        path="/questionnaire"
        justifyContent={{ base: "center", lg: "fit-content" }}
        className={styles.btnWidth}
        position="relative"
      >
        Criar Questionarios
      </NavItem>
      <DataTable
        Title={"Questionarios"}
        data={data}
        columns={columns}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        filterOptions={filterOptions}
        actionColumns={actionColumn}
        noFilter
        modalTitle={"Deletar Questionario"}
        modalInfo={"Tem certeza que Deseja Excluir o Questionario ?"}
      />
    </NavBar>
  );
};

export default Brand;
