import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Tooltip,
  Box,
  Text,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import styles from "../../styles/DataTable.module.css";
import Actions from "./Actions";
import Pagination from "../Pagination";
import FilterComponent from "./FilterComponent";

import Modal from "../Modal";
import { FiEdit, FiTrash } from "react-icons/fi";

const DataTable = ({
  data = [],
  columns = [],
  actionColumns = [],
  handleEdit,
  handleDelete,
  subTitle,
  Title,
  filterOptions = [],
  noFilter,
  modalTitle,
  modalSize = "lg",
  modalInfo,
  modalLoading,
  ...rest
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userId, setUserId] = useState(-1);

  const [currentPage, setCurrentPage] = useState(0);
  const [filterSelect, setFilterSelect] = useState("");
  const [filterDescription, setFilterDescription] = useState("");

  const PER_PAGE = 10;
  const offset = currentPage * PER_PAGE;

  const pageCount = Math.ceil(data.length / PER_PAGE);

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  let currentData = [];
  const NoResults = (
    <Box
      backgroundColor={"white"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"80vh"}
    >
      Nenhum Registro Encontrado
    </Box>
  );
  currentData = data.slice(offset, offset + PER_PAGE).map((row) => (
    <Tr key={row.id}>
      {columns.map((column) => {
        return (
          <Td
            key={`${row.id}-${column.selector}`}
            textAlign="center"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            {column.cell ? column.cell(row) : row[column.selector]}
          </Td>
        );
      })}
      <Actions _hover={{ cursor: "default" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            columnGap: "20px",
          }}
        >
          {handleEdit && (
            <Tooltip label="Editar">
              <IconButton
                backgroundColor="#AE0025"
                color="#fff"
                icon={<FiEdit />}
                onClick={() => handleEdit(row.id)}
                _hover={{ backgroundColor: "#0D4172" }}
              />
            </Tooltip>
          )}
          {handleDelete && (
            <Tooltip label="Remover">
              <IconButton
                backgroundColor="#AE0025"
                color="#fff"
                icon={<FiTrash />}
                onClick={() => {
                  setUserId(row.id), onOpen();
                }}
                _hover={{ backgroundColor: "#0D4172" }}
              />
            </Tooltip>
          )}
          {actionColumns.map((columns) => {
            return (
              <Tooltip label={columns.name}>
                <IconButton
                  backgroundColor="#AE0025"
                  color="#fff"
                  icon={columns.icon}
                  onClick={() => columns.action(row)}
                  _hover={{ backgroundColor: "#0D4172" }}
                />
              </Tooltip>
            );
          })}
        </div>
      </Actions>
    </Tr>
  ));

  return (
    <>
      <Box
        display="flex"
        justifyContent={{ base: "space-evenly", md: "center" }}
        alignItems="center"
        marginBottom="10px"
        flexDirection={{ base: "column", md: "row" }}
        marginTop={{ base: "10px", md: "0" }}
      >
        <Box
          display="flex"
          alignItems="center"
          width="100%"
          columnGap="15px"
          fontSize={{ base: "auto", md: "20px" }}
          flexDirection={{ base: "column", md: "row" }}
          marginBottom={{ base: "10px", md: "0" }}
        >
          <Text fontSize={20} fontWeight={700}>
            {Title}
          </Text>
          {subTitle && subTitle}
        </Box>
        {!noFilter && data.length > 0 && (
          <Box>
            <FilterComponent
              textValue={filterDescription}
              onFilter={(e) => setFilterDescription(e.target.value)}
              selectValue={filterSelect}
              selectSetValue={setFilterSelect}
              options={filterOptions}
              onClear={() => setFilterDescription("")}
            />
          </Box>
        )}
      </Box>
      <Box width="100%">
        <TableContainer
          overflowX={"auto"}
          overflowY={"auto"}
          width="100%"
          {...rest}
        >
          {data.length > 0 ? (
            <>
              <Table
                variant={"unstyled"}
                height={"800px"}
                backgroundColor={"white"}
                borderRadius={"8px"}
                overflow={"auto"}
              >
                <Thead>
                  <Tr backgroundColor="#AE0025" color="#fff">
                    {columns.map((column) => (
                      <Th
                        key={column.name}
                        width={column.width ? column.width : "300px"}
                        fontSize="15px"
                        textOverflow="ellipsis"
                        fontWeight="bold"
                        textAlign="center"
                        _first={{ borderTopLeftRadius: "8px" }}
                        _last={{
                          borderTopRightRadius:
                            !handleEdit && !handleDelete ? "8px" : "",
                        }}
                      >
                        {column.name}
                      </Th>
                    ))}
                    {handleEdit && handleDelete && (
                      <Th
                        fontWeight={"bold"}
                        fontSize={"15px"}
                        borderTopRightRadius="8px"
                        textAlign="center"
                      >
                        Ações
                      </Th>
                    )}
                  </Tr>
                </Thead>
                <Tbody>{currentData}</Tbody>
              </Table>
            </>
          ) : (
            NoResults
          )}
        </TableContainer>
        <div className={styles.pagination}>
          <Pagination
            pageCount={pageCount}
            currentPage={currentPage}
            onPageChange={handlePageClick}
            previousLabel={<ArrowLeftIcon />}
            nextLabel={<ArrowRightIcon />}
            containerClassName={styles.paginationContainer}
            activeProps={styles.active}
          />
        </div>
      </Box>
      <Modal
        handleParams={userId}
        modalTitle={modalTitle}
        size={modalSize}
        handleOpen={isOpen}
        handleClose={onClose}
        handleFunction={handleDelete}
        isLoading={modalLoading}
      >
        {modalInfo}
      </Modal>
    </>
  );
};

export default DataTable;
