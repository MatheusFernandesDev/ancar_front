import NavBar from "@/components/NavBar";
import TextInput from "@/components/TextInput";
import { Box, Container, Text, useToast } from "@chakra-ui/react";
import api from "@/services/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import FormContent from "@/components/FormContent";
import DatePicker from "@/components/DatePicker";
import moment from "moment";
import DataTable from "@/components/DataTable";

const Answer = () => {
  const toast = useToast();
  const router = useRouter();
  const { id } = router.query;

  // USE STATE
  const [loading, setLoading] = useState(false);
  //
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState([]);
  const [questionId, setQuestionId] = useState(-1);
  const [answerId, setAnswerId] = useState(-1);

  const columns = [
    { name: "Pergunta Nº", selector: "a_id" },
    {
      name: "Descrição",
      selector: "a_description",
    },
  ];

  function clearHandler() {
    setName("");
    setDescription("");
  }

  function cancelHandler() {
    clearHandler();
    router.push("/questions");
  }

  async function loadHandler() {
    setLoading(true);
    try {
      const { data: response, status } = await api.get(
        `/question/${id}/askins`,
        {
          validateStatus: (status) => status === 200 || status === 204,
        }
      );

      if (status === 204 || !response.data || response.data.length === 0) {
        setData([]);
      } else {
        setData(response.data);
        setQuestionId(response.data[0].id);
        setAnswerId(response.data);
        setDescription(response.data[0].name);
      }
    } catch {
      toast({
        title: "Erro ao carregar Questionários",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  console.log(data);

  function updateHandler() {
    setLoading(true);
    api
      .put(`/question/${id}/askins`, {
        name,
        description,
        date,
      })
      .then(() => {
        clearHandler();
        loadHandler();
        return toast({
          title: "Questionario Editado com sucesso",
          status: "success",
        });
      })
      .catch(() => {
        return toast({ title: "Erro ao Editar Questionario", status: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleEdit(id) {
    router.push(`/questions/edit/${id}`);
  }
  function handleDelete(id) {
    api
      .delete(`/question/${questionId}/answer/${answerId}`)
      .then(() => {
        loadHandler();
        return toast({
          title: "Pergunta Deletada com sucesso",
          status: "success",
        });
      })
      .catch(() => {
        return toast({
          title: "Error ao Deletar Pergunta",
          status: "error",
        });
      });
  }

  // GET FUNCTIONS
  useEffect(() => {
    if (id) {
      loadHandler();
    }
  }, [id]);

  return (
    <NavBar>
      <FormContent
        editHandler={updateHandler}
        cancelHandler={cancelHandler}
        showCancel
        isLoading={loading}
        hideSave
        hideEdit
        hideNew
        hideList
        hideReload
      >
        <Container>
          <Text fontSize={25} fontWeight={600}>
            {` Questionário: ${description}`}
          </Text>
          <br />
        </Container>
        <DataTable
          data={data}
          columns={columns}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          // filterOptions={filterOptions}
          // actionColumns={actionColumn}
          noFilter
          modalTitle={"Deletar Pergunta"}
          modalInfo={"Tem certeza que Deseja Excluir A Pergunta ?"}
        />
      </FormContent>
    </NavBar>
  );
};

export default Answer;
