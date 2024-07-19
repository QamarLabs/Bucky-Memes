import { Box, Text } from "@chakra-ui/react";
import ImageEditor from "../component/common/ImageEditor";

export default function CreateMemePage() { 
    return (
        <Box
        display="flex"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        paddingTop={{ base: '5vh', md: '5vh', lg: "10vh"}}
        marginBottom="10vh"
        minHeight="80vh"
        color="white"
      >
        <Text fontSize="2rem" className="roboto-flex-text" mt="2rem">
          Create your own Meme
        </Text>
        <ImageEditor />
    </Box>
    );
}
