import {
  Box,
  Button,
  Icon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import InputTypes from "./InputTypes";

export default function EditableDataTable({
  template = [],
  data,
  setData,
  actions,
  addDescription,
}) {
  const [tableData, setTableData] = useState(data);

  function add() {
    const newItem = {};

    newItem.id = null;

    if (tableData.length > 0) {
      const ids = tableData.map((item) => item.id);
      const newId = Number(Math.max.apply(null, ids)) + Number(1);
      newItem.id = newId;
    }

    if (tableData.length === 0) {
      newItem.id = 0;
    }

    if (newItem.id !== null) {
      template.forEach((item) => {
        newItem[item.reference] = item.defaultValue;
      });
      setTableData([...tableData, newItem]);
    }
  }

  function remove(id) {
    const newTableData = tableData.filter((item) => item.id !== id);
    setTableData(newTableData);
  }

  useEffect(() => {
    template.forEach((item) => {
      if (typeof item.defaultValue !== "function")
        template[item.reference] = item.defaultValue;
    });
    // setData(tableData)
  }, [tableData]);

  return (
    <Box width="100%" display="flex" flexDirection="column">
      <Box display="flex">
        {actions?.find((item) => item === "add") && (
          <Button
            leftIcon={<FiPlus />}
            backgroundColor="#145DA0"
            color="white"
            padding="10px 20px"
            border="none"
            margin="10px 0"
            fontWeight="bold"
            display="flex"
            alignItems="center"
            columnGap="5px"
            cursor="pointer"
            borderRadius="8px"
            onClick={() => add()}
            _hover={{ backgroundColor: "#0D4172" }}
          >
            {addDescription || `${t("ADD")} ${t("ITEM")}`}
          </Button>
        )}
      </Box>
      <Table borderCollapse>
        <Thead>
          <Tr borderCollapse="collapse" _odd={{ backgroundColor: "#ddd" }}>
            {template.map((item) => (
              <Th
                backgroundColor="#145DA0"
                color="white"
                borderCollapse="collapse"
                border="1px solid #333"
                padding="5px 10px"
                fontSize="15px"
              >
                {item.header}
              </Th>
            ))}
            {actions && (
              <Th
                backgroundColor="#145DA0"
                color="white"
                borderCollapse="collapse"
                border="1px solid #333"
                padding="5px 10px"
                fontSize="15px"
              >
                {t("ACTIONS")}
              </Th>
            )}
          </Tr>
        </Thead>
        <Tbody borderCollapse="collapse">
          {tableData &&
            tableData.map((item, key) => (
              <Tr
                borderCollapse="collapse"
                _odd={{ backgroundColor: "#ddd" }}
                key={key}
              >
                {template.map((field, key) => (
                  <Td
                    borderCollapse="collapse"
                    borderLeft="1px solid #333"
                    borderBottom="none"
                    padding="5px 10px"
                    p="0"
                    position="relative"
                    height="45px"
                    key={key}
                    backgroundColor="white"
                  >
                    {InputTypes[field.type]({
                      id: item.id,
                      tableData,
                      reference: field.reference,
                      setTableData,
                      options: field.options,
                      setData,
                      defaultValue: field?.defaultValue,
                      min: field?.min,
                      max: field?.max,
                      item,
                      attrs: item.attrs,
                    })}
                  </Td>
                ))}
                {actions && (
                  <Td
                    borderCollapse="collapse"
                    borderLeft="1px solid #333"
                    borderRight="1px solid #333"
                    borderBottom="none"
                    backgroundColor="white"
                    padding="5px 10px"
                    textAlign="center"
                  >
                    {actions?.find((item) => item === "remove") && (
                      <Icon
                        as={FiTrash}
                        cursor="pointer"
                        onClick={() => remove(item.id)}
                      />
                    )}
                  </Td>
                )}
              </Tr>
            ))}
        </Tbody>
      </Table>
    </Box>
  );
}
