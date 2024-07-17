import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import addImageToCloudinary from "../../services/cloudinary";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import validate from "../../services/validate";
import createMeme from "../../services/createMeme";
import FeaturesFilter from "./FeaturesFilter";
import { FormContext } from "./FormContext";
import { CustomPageLoader } from "./CustomLoader";

interface CreateMemeFormProps {
  refreshAdminMemes: Function;
}

function CreateMemeForm({ refreshAdminMemes }:  CreateMemeFormProps) {
  const { queryFeatures, setQueryFeatures } = useContext(FormContext);
  const toast = useToast();
  const [mounted, setMounted] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValidated, setPasswordValidate] = useState(false);
  const [passwordInStorage, setPasswordInStorage] = useState("");


  useEffect(() => {
    async function checkPwd() {
      setLoadingPage(true);
      const pwdInStorage = window.localStorage.getItem("bucky-pwd");
      if(pwdInStorage) {
        const result = await validate(pwdInStorage);
        
        setPasswordValidate(result.validated);
        setPasswordInStorage(pwdInStorage);    
      }
      setLoadingPage(false);
    }
    
    checkPwd();

    return () => {
      setQueryFeatures([]);
    }
  }, []);



  const togglePasswordVisibility = (e: any) => {
    e.stopPropagation();
    setShowPassword(!showPassword);
  };

  const validateName = (name: string) => {
    let error;
    if (!name) {
      error = "Name is required";
    }
    return error;
  };

  const validatePwd = async (pwd: string) => {
    let error;
    if (!pwd) error = "Password is required";

    const result = await validate(pwd);

    if (result.validated) error = "Password is invalid";
    else setPasswordValidate(true);

    return error;
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_PRESET!
    );
    const { cloudinaryId, cloudinaryUrl } = await addImageToCloudinary(
      formData
    );
    return { cloudinaryId, cloudinaryUrl };
  };

  if (loadingPage) return <CustomPageLoader />;

  return (
    <Formik
      initialValues={{ name: "", password: "", image: null, features: [] }}
      onSubmit={async (values, actions) => {
        actions.setSubmitting(true);
        const { cloudinaryId, cloudinaryUrl } = await uploadImage(
          values.image!
        );
        if (!cloudinaryId) throw new Error("Did not upload to cloudinary");

        if (!queryFeatures)
          throw new Error("Need to add a feature for the meme.");

        const data = {
          cloudinaryId,
          cloudinaryUrl,
          name: values.name,
          features: queryFeatures,
          createdDate: new Date()
        };

        await createMeme(data, passwordInStorage || values.password);
        setQueryFeatures([]);

        toast({
          title: "Meme created successfully!",
          description: `Name: ${values.name}, Image URL: ${cloudinaryUrl}`,
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top",
        });

        await refreshAdminMemes();
        actions.resetForm();
        actions.setSubmitting(false);
      }}
    >
      {({ setFieldValue, values, isSubmitting, setSubmitting }) => (
        <Form style={{ width: "600px" }}>
          {!passwordValidated ? (
            <Field
              name="password"
              validate={validatePwd}
              className="roboto-flex-text"
            >
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.password && form.touched.password}
                  className="roboto-flex-text"
                >
                  <FormLabel
                    fontSize="1.5rem"
                    color="white"
                    htmlFor="password"
                    textAlign={{ base: "center", lg: "left" }}
                  >
                    Password
                  </FormLabel>
                  <div style={{ position: "relative" }}>
                    <Input
                      {...field}
                      size="lg"
                      color="white"
                      id="password"
                      placeholder="Enter the password"
                      fontSize="1.3rem"
                      type={showPassword ? "text" : "password"}
                    />
                    <IconButton
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                      onClick={togglePasswordVisibility}
                      size="lg"
                      position="absolute"
                      top="50%"
                      right="0"
                      zIndex={100}
                      transform="translateY(-50%)"
                      type="button"
                      color="white"
                      _hover={{ background: "none" }}
                    />
                  </div>
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  <Button
                    mt={4}
                    className="roboto-flex-text"
                    type="button"
                    isLoading={isSubmitting}
                    onClick={async (e) => {
                      setSubmitting(true);
                      e.stopPropagation();
                      const validatePwdResponse = await validate(
                        values.password
                      );
                      setPasswordValidate(validatePwdResponse.validated);
                      setSubmitting(false);
                    }}
                  >
                    Validate Password
                  </Button>
                </FormControl>
              )}
            </Field>
          ) : (
            <>
              <Field name="name" validate={validateName}>
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={form.errors.name && form.touched.name}
                    className="roboto-flex-text"
                  >
                    <FormLabel
                      fontSize="1.5rem"
                      color="white"
                      htmlFor="name"
                      textAlign={{ base: "center", lg: "left" }}
                    >
                      Meme Name
                    </FormLabel>
                    <Input
                      {...field}
                      size="lg"
                      color="white"
                      id="name"
                      placeholder="Enter your name"
                      fontSize="1.3rem"
                    />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <FormControl>
                {values && values.image && (
                  <Image
                    alt={values.name}
                    src={values.image ?? ""}
                    height={300}
                    width={300}
                    sizes="(max-width: 800px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                )}
                <FormLabel
                  fontSize="1.5rem"
                  color="white"
                  htmlFor="image"
                  textAlign={{ base: "center", lg: "left" }}
                >
                  Upload Image
                </FormLabel>
                <Input
                  type="file"
                  size="lg"
                  color="white"
                  id="image"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setFieldValue("image", reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  fontSize="1.3rem"
                />
              </FormControl>
              <FormControl>
                <FormLabel
                  fontSize="1.5rem"
                  color="white"
                  htmlFor="image"
                  textAlign={{ base: "center", lg: "left" }}
                >
                  Features of Meme
                </FormLabel>
                <FeaturesFilter selectFeatures />
                <FeaturesFilter removeFeatures />
                {/* <FormErrorMessage></FormErrorMessage> */}
              </FormControl>
              <Button
                isLoading={isSubmitting}
                mt={4}
                className="roboto-flex-text"
                type="submit"
              >
                Create Meme
              </Button>
            </>
          )}
        </Form>
      )}
    </Formik>
  );
}

export default CreateMemeForm;
