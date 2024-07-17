import { Box, Divider, Text } from "@chakra-ui/react";
import CreateMemeForm from "../component/common/CreateMemeForm";
import MemeCard from "../component/common/MemeCard";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { FormContext } from "../component/common/FormContext";
import { fetchRecentMemes } from "../services/fetchRecentMemes";

export default function AdminPage() {
  const [adminMemes, setAdminMemes] = useState([]);

  const getRecentCreatedMemes = useCallback(async () => {
    const recentMemes = await fetchRecentMemes();
    setAdminMemes(recentMemes);
  }, []);

  useEffect(() => {
    getRecentCreatedMemes();
  }, []);
  
  return (
    <Box
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      paddingTop="20vh"
      minHeight="80vh"
      color="white"
    >
      <Text fontSize="3rem" className="roboto-flex-text">
        Admin Panel
      </Text>
      <CreateMemeForm refreshAdminMemes={getRecentCreatedMemes} />
      {/* <Divider /> */}
      <Text fontSize="2rem" className="roboto-flex-text" mt="2rem">
        Recently Created Memes
      </Text>
      <Box textAlign={"center"} h="100vh" padding={{ base: "0", md: "15px" }}>
        {adminMemes && Array.isArray(adminMemes) ? (
          (adminMemes ?? []).map((m, mIdx) => <MemeCard key={mIdx} meme={m} />)
        ) : (
          <Text fontSize="1.25rem" className="roboto-flex-text">
            They are no recently created memes!
          </Text>
        )}
      </Box>
    </Box>
  );
}
