import NavBar from "@/components/NavBar";
import TextInput from "@/components/TextInput";
import { Box, Container, Text, useToast } from "@chakra-ui/react";
import api from "@/services/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import FormContent from "@/components/FormContent";
import DatePicker from "@/components/DatePicker";
import moment from "moment";

const Edit = () => {
  const toast = useToast();
  const router = useRouter();
  const { id } = router.query;

  // USE STATE
  const [loading, setLoading] = useState(false);
  //
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  function clearHandler() {
    setName("");
    setDescription("");
    setDate("");
  }

  function cancelHandler() {
    clearHandler();
    router.push("/questions");
  }

  async function loadHandler() {
    setLoading(true);
    try {
      const { data: response } = await api.get(`/question/${id}`, {
        validateStatus: (status) => status === 200 || status === 204,
      });
      if (response) {
        setName(response.name);
        setDescription(response.description);
        setDate(moment(response.date).format("yyyy-MM-DD"));
      }
    } catch {
      return toast({
        title: "Error ao carregar Questionarios",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  function updateHandler() {
    setLoading(true);
    api
      .put(`/question/${id}`, {
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
        hideNew
        hideList
        hideReload
      >
        <Container centerContent>
          <Text fontSize={25} fontWeight={600}>
            Editar Questionario
          </Text>
        </Container>
        <br />
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fit,minmax(500px,1fr))"
          rowGap={5}
        >
          <DatePicker
            name_field={"Data"}
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </Box>
        <TextInput
          name_field={"Nome"}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <TextInput
          name_field={"Descrição"}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </FormContent>
    </NavBar>
  );
};

export default Edit;
