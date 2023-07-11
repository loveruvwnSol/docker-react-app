import { Box, Center, IconButton, Text } from "@chakra-ui/react";
import { BiPencil } from "react-icons/bi";
import { AddPost } from "../organisms/AddPost";
import { useDisclosure } from "@chakra-ui/react";

export const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Center h={"100vh"} bg={"#EAF0F9"}>
      <Text fontWeight={"extrabold"} fontSize={44}>
        つぶやこう
      </Text>
      <Box ml={10}>
        <IconButton
          bg={"#560DE7"}
          icon={<BiPencil fill="white" size={24} />}
          aria-label={""}
          _hover={{ opacity: "0.7" }}
          borderRadius={"100%"}
          onClick={onOpen}
        />
      </Box>
      <AddPost isOpen={isOpen} onClose={onClose} />
    </Center>
  );
};
