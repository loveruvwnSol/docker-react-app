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
import React, { useState } from "react";

type Post = {
  id: number;
  title: string;
  text: string;
};

type AddPostProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const AddPost: React.FC<AddPostProps> = ({ isOpen, onClose }) => {
  const [post, setPost] = useState<Post[]>([]);
  const [id, setId] = useState<number>(1);
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");

  const handleSubmit = (event: { preventDefault: () => void }) => {
    if (title.match(/\S/g) && text.match(/\S/g)) {
      event.preventDefault();
      const data = { id, title, text };

      const r = fetch("http://localhost:8000/post", {
        method: "POST",
        body: JSON.stringify(data),
      });
      setTitle("");
      setText("");
      onClose();
      // await fetchTodo();
    } else {
      alert("please input any text");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>タイトル</FormLabel>
            <Input
              placeholder="タイトル"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>つぶやこう</FormLabel>
            <Input
              placeholder="つぶやこう"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            bg="#560DE7"
            mr={3}
            color={"white"}
            _hover={{ opacity: "0.7" }}
            onClick={handleSubmit}
          >
            投稿
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
