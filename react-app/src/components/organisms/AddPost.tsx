import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
} from "@chakra-ui/react";
import React from "react";

type AddPostProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const AddPost: React.FC<AddPostProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>タイトル</FormLabel>
            <Input placeholder="タイトル" />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>つぶやこう</FormLabel>
            <Input placeholder="つぶやこう" />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            bg="#560DE7"
            mr={3}
            color={"white"}
            _hover={{ opacity: "0.7" }}
          >
            投稿
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
