import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

export default function Index({
  children,
  handleParams,
  modalTitle = "Modal Title",
  size,
  handleOpen,
  handleClose,
  handleFunction,
  hideSave,
  hideClose,
  saveText,
  closeText,
  isLoading,
  width,
  height,
  ...rest
}) {
  return (
    <Modal
      isCentered
      closeOnEsc
      allowPinchZoom
      scrollBehavior="inside"
      onClose={handleClose}
      size={size}
      isOpen={handleOpen}
      height={height}
    >
      <ModalOverlay />
      <ModalContent width={500} height={500}>
        <ModalHeader>{modalTitle}</ModalHeader>
        <ModalCloseButton />
        <ModalBody overflow="auto" position="relative" {...rest}>
          {children}
        </ModalBody>
        <ModalFooter display="flex" columnGap={3}>
          {!hideClose && (
            <Button
              isLoading={isLoading}
              onClick={handleClose}
              backgroundColor="#ddd"
            >
              {closeText || "Cancelar"}
            </Button>
          )}
          {!hideSave && (
            <Button
              isLoading={isLoading}
              onClick={() => {
                handleFunction(handleParams);
                handleClose();
              }}
              color="white"
              backgroundColor="#145DA0"
              _hover={{ backgroundColor: "#0D4172" }}
            >
              {saveText || "Confirmar"}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
