import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Box, Container, Image, Text, useToast } from "@chakra-ui/react";
import TextInput from "@/components/TextInput";
import DatePicker from "@/components/DatePicker";
import Button from "@/components/Button";
import Modal from "../../components/Modal";

import api from "../../services/api";
import SelectOption from "@/components/SelectOption";

const Questionnaire = () => {
  const toast = useToast();
  const router = useRouter();
  const [errors, setErrors] = useState([]);

  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  //PERGUNTAS
  const [question, setQuestion] = useState(-1);
  const [descriptionAsk, setDescriptionAsk] = useState("");
  const [questionsOptions, setQuestionsOpcoes] = useState([]);
  const [modal, setModal] = useState(false);

  function clearHandler() {
    setDate("");
    setName("");
    setDescription("");
    setDescriptionAsk(""), setQuestion(-1);
  }
  async function loadHandler() {
    const { data: response } = await api.get("/question", {
      validateStatus: (status) => status === 200 || status === 204,
    });
    const formatted = response.items.map((element) => {
      return {
        id: element.id,
        name: element.name,
      };
    });
    setQuestionsOpcoes(formatted);
  }

  function saveHandler() {
    api
      .post("/question", {
        date,
        name,
        description,
        validateStatus: (status) => {
          return (status = 200);
        },
      })
      .then(() => {
        clearHandler();
        toast({
          title: "Questionario Criado com Sucesso",
          status: "success",
        });
        router.push("/questions");
      })
      .catch((err) => {
        if (err.response?.data?.errors) {
          const responseErrors = err.response.data.errors;
          setErrors(responseErrors);
        }
        return toast({ title: "Error ao criar Questionario", status: "error" });
      });
  }

  function saveHandlerAsk() {
    api
      .post("/askins", {
        description: descriptionAsk,
        question_id: question,

        validateStatus: (status) => {
          return (status = 200);
        },
      })
      .then(() => {
        clearHandler();
        toast({
          title: "Pergunta Criada com Sucesso",
          status: "success",
        });
        setModal(false);
      })
      .catch((err) => {
        if (err.response?.data?.errors) {
          const responseErrors = err.response.data.errors;
          setErrors(responseErrors);
        }
        setModal(true);
        return toast({ title: "Error ao criar Pergunta", status: "error" });
      });
  }

  function handleOpenQuestionnaire() {
    router.push("/questions");
  }

  useEffect(() => {
    loadHandler();
  }, []);

  return (
    <Container height="100vh" centerContent rowGap={12}>
      <Box
        height="50px"
        width="100vw"
        backgroundColor="#AE0025"
        display="flex"
        justifyContent="center"
      ></Box>
      <Box display="flex" justifyContent={"center"} flexDirection={"column"}>
        <Image width={125} height={120} src={"/images/ancarlogo.jpg"} />
        <Box align="center">
          <Text fontSize={25} fontWeight={600} marginTop={"10px"}>
            Questionario
          </Text>
        </Box>
      </Box>

      <DatePicker
        onChange={(event) => setDate(event.target.value)}
        value={date}
        name_field={"DATA"}
        errors={errors}
        param={"date"}
      />
      <TextInput
        onChange={(event) => setName(event.target.value)}
        value={name}
        name_field={"Nome"}
        errors={errors}
        param={"name"}
      />
      <TextInput
        onChange={(event) => setDescription(event.target.value)}
        value={description}
        name_field={"Descrição"}
        errors={errors}
        param={"description"}
      />

      <Box
        display="flex"
        justifyContent="space-around"
        columnGap="15px"
        paddingBottom="20px"
      >
        <Button onClick={() => saveHandler()}>Criar Questionario </Button>
        <Button onClick={() => handleOpenQuestionnaire()}>Questionarios</Button>
        <Button onClick={() => setModal(true)}>Adicionar Perguntas</Button>
      </Box>
      <Modal
        modalTitle="Criar Perguntas"
        size={"xl"}
        width={"500px"}
        height={"300px"}
        handleOpen={modal}
        handleClose={() => setModal(false)}
        handleFunction={() => saveHandlerAsk()}
      >
        <SelectOption
          name_field={"Questionario"}
          value={question}
          options={questionsOptions}
          onChange={(event) => {
            setQuestion(event);
          }}
        />
        <TextInput
          onChange={(event) => setDescriptionAsk(event.target.value)}
          value={descriptionAsk}
          name_field={"Descrição"}
          errors={errors}
          param={"description"}
        />
      </Modal>
    </Container>
  );
};

export default Questionnaire;
