import React from "react";
import Button from "./Button";
import {
  FiPlus,
  FiMenu,
  FiRefreshCw,
  FiX,
  FiPaperclip,
  FiSave,
} from "react-icons/fi";
import { AiOutlineFileSearch } from "react-icons/ai";
import { Box } from "@chakra-ui/react";

export default function index({
  // JOKER
  jokerHandler,
  jokerButton,
  jokerTitle,
  jokerIcon,
  // BUTTONS
  hideAll = false,
  hideEdit,
  hideSave,
  showAttach,
  hideNew,
  hideList,
  hideReload,
  showCancel,
  showReport,
  // HANDLER
  editHandler,
  saveHandler,
  attachHandler,
  newHandler,
  listHandler,
  reloadHandler,
  cancelHandler,
  reportHandler,
  // LOAD
  progress,
  loadingText,
}) {
  return (
    <Box
      backgroundColor="#AE0025"
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="flex-start"
      borderTopLeftRadius="10px"
      borderTopRightRadius="10px"
      width="100%"
      height={{ base: "fit-content", lg: "" }}
    >
      {jokerButton && (
        <Button
          loadingText={loadingText}
          icon={jokerIcon}
          action={() => jokerHandler()}
          title={jokerTitle}
          isLoading={progress}
        />
      )}
      {hideAll ||
        (!hideSave && (
          <Button
            loadingText={loadingText}
            icon={<FiSave />}
            action={() => saveHandler()}
            title={"Salvar"}
            isLoading={progress}
          />
        ))}
      {hideAll ||
        (!hideEdit && (
          <Button
            loadingText={loadingText}
            icon={<FiSave />}
            action={() => editHandler()}
            title={"Editar"}
            isLoading={progress}
          />
        ))}
      {showAttach && (
        <Button
          loadingText={loadingText}
          icon={<FiPaperclip />}
          action={() => attachHandler()}
          title={"Upload"}
          isLoading={progress}
        />
      )}
      {hideAll ||
        (!hideNew && (
          <Button
            loadingText={loadingText}
            icon={<FiPlus />}
            action={() => newHandler()}
            title={t("Adicionar")}
            isLoading={progress}
          />
        ))}
      {hideAll ||
        (!hideList && (
          <Button
            loadingText={loadingText}
            icon={<FiMenu />}
            action={() => listHandler()}
            title={"Lista"}
            isLoading={progress}
          />
        ))}
      {hideAll ||
        (!hideReload && (
          <Button
            loadingText={loadingText}
            icon={<FiRefreshCw />}
            action={() => reloadHandler()}
            title={"Recarregar"}
            isLoading={progress}
          />
        ))}
      {showCancel && (
        <Button
          loadingText={loadingText}
          icon={<FiX />}
          action={() => cancelHandler()}
          title={"Cancelar"}
          isLoading={progress}
        />
      )}
      {/* {showReport && (
        <Button
          loadingText={loadingText}
          icon={<AiOutlineFileSearch />}
          action={() => reportHandler()}
          title={t("SEEREPORT")}
          isLoading={progress}
        />
      )} */}
    </Box>
  );
}
