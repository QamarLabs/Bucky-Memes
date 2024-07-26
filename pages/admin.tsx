/* eslint-disable react-hooks/exhaustive-deps */
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useCallback, useContext, useEffect, useState } from "react";

import AdminCreateMemeForm from "../component/common/AdminCreateMemeForm";
import { CustomPageLoader } from "../component/common/CustomLoader";
import FeaturesFilter from "../component/common/FeaturesFilter";
import { FormContext } from "../component/common/FormContext";
import MemeCard from "../component/common/MemeCard";
import deleteFeature from "../services/deleteFeature";
import deleteMeme from "../services/deleteMeme";
import { fetchDeletedMemes } from "../services/fetchDeletedMemes";
import { fetchRecentMemes } from "../services/fetchRecentMemes";
import validate from "../services/validate";

export default function AdminPage() {
  const toast = useToast();
  const { setQueryFeatures } = useContext(FormContext);
  const [passwordValidated, setPasswordValidated] = useState(false);
  const [passwordInStorage, setPasswordInStorage] = useState("");
  const [adminMemes, setAdminMemes] = useState([]);
  const [adminFeatures, setAdminFeatures] = useState([]);
  const [adminDeletedMemes, setAdminDeletedMemes] = useState([]);

  const [loadingPage, setLoadingPage] = useState(true);
  const getRecentCreatedMemes = useCallback(async () => {
    const { recentMemes, recentFeatures } = await fetchRecentMemes();
    setAdminMemes(recentMemes);
    setAdminFeatures(recentFeatures);
  }, []);

  const getDeletedMemes = useCallback(async () => {
    const deletedMemes = await fetchDeletedMemes();
    setAdminDeletedMemes(deletedMemes);
  }, []);
  async function checkPwd() {
    const pwdInStorage = window.localStorage.getItem("bucky-pwd");
    if (pwdInStorage) {
      const result = await validate(pwdInStorage);

      setPasswordValidated(result.validated);
      setPasswordInStorage(pwdInStorage);
    }
    console.log("Loading...");
  }

  const validatePwd = async (pwd: string) => {
    let error;
    if (!pwd) error = "Password is required";

    const result = await validate(pwd);

    if (result.validated) error = "Password is invalid";
    else setPasswordValidated(true);

    return error;
  };

  useEffect(() => {
    new Promise(async (resolve) => {
      await getRecentCreatedMemes();
      await checkPwd();
      resolve(true);
    })
      .then(() => getDeletedMemes())
      .finally(() => {
        setLoadingPage(false);
      });

    return () => {
      setQueryFeatures([]);
    };
  }, []);

  const deleteFeatureFunc = useCallback(
    (feat: string) => async (e: React.MouseEvent<HTMLSpanElement>) => {
      e.preventDefault();
      await deleteFeature(feat);
      toast({
        description: `Deleted features with feature of ${feat}!`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      await getRecentCreatedMemes();
    },
    []
  );

  const deleteMemeFunc = useCallback(
    (id: string) => async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      await deleteMeme(id);
      toast({
        description: `Deleted meme with id of ${id}!`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      await getRecentCreatedMemes();
    },
    []
  );

  if (loadingPage) return <CustomPageLoader />;

  return (
    <Box
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      paddingTop={{ base: "5vh", md: "10vh", lg: "20vh" }}
      minHeight="80vh"
      color="white"
    >
      <Text fontSize="3rem" className="roboto-flex-text">
        Admin Panel
      </Text>
      <AdminCreateMemeForm
        refreshAdminMemes={getRecentCreatedMemes}
        validatePwd={validatePwd}
        passwordInStorage={passwordInStorage}
        passwordValidated={passwordValidated}
        setPasswordValidated={setPasswordValidated}
      />
      {passwordValidated && (
        <>
          <Box px="5vw" display="flex" flexDir="column" width="99%">
            <Text fontSize="2rem" className="roboto-flex-text" mt="2rem">
              Recently Created Features
            </Text>
            {/* <Divider /> */}
            <FeaturesFilter
              featuresProp={adminFeatures}
              handleRemoveFeatureProp={deleteFeatureFunc}
              removeFeatures
            />
          </Box>
          <Accordion
            px="5vw"
            w="100vw"
            border="none"
            defaultIndex={0}
            allowToggle
          >
            <AccordionItem border="none">
              <AccordionButton>
                <Text fontSize="2rem" className="roboto-flex-text" mt="2rem">
                  Recently Created Memes
                  <AccordionIcon />
                </Text>
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Box
                  textAlign={"center"}
                  maxH="100vh"
                  w="100vw"
                  padding={{ base: "0", md: "15px" }}
                  overflowY="auto"
                >
                  {adminMemes && Array.isArray(adminMemes) ? (
                    <>
                      {(adminMemes ?? []).map((m, mIdx) => (
                        <MemeCard
                          deleteFunc={deleteMemeFunc}
                          key={mIdx}
                          meme={m}
                        />
                      ))}
                    </>
                  ) : (
                    <Text fontSize="1.25rem" className="roboto-flex-text">
                      They are no recently created memes!
                    </Text>
                  )}
                </Box>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton>
                <Text
                  fontSize="2rem"
                  className="roboto-flex-text"
                  mt="2rem"
                  textAlign="center"
                >
                  Recently Deleted Memes
                  <AccordionIcon />
                </Text>
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Box
                  textAlign={"center"}
                  maxH="100vh"
                  w="100vw"
                  padding={{ base: "0", md: "15px" }}
                >
                  {adminDeletedMemes && Array.isArray(adminDeletedMemes) ? (
                    (adminDeletedMemes ?? []).map((dM: any) => (
                      <MemeCard key={dM._id} meme={dM} />
                    ))
                  ) : (
                    <Text fontSize="1.25rem" className="roboto-flex-text">
                      They are no recently deleted memes!
                    </Text>
                  )}
                </Box>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </>
      )}
    </Box>
  );
}
