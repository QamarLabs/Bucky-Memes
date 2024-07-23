"use client";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useRef, useState } from "react";
import { BsDownload } from "react-icons/bs";
import { Layer, Stage, Image as KonvaImage, Text } from "react-konva";
import useImage from "use-image";

function ImageEditor() {
  const [image, setImage] = useState<string | undefined>("");
  const [text, setText] = useState("");
  const [textPosition, setTextPosition] = useState({ x: 5, y: 425 });
  const [memeTextFontFamily, setMemeTextFontFamily] = useState(
    `"Roboto Flex", sans-serif`
  );
  const [memeTextFontColor, setMemeTextFontColor] = useState("white");
  const inputRef = useRef<HTMLInputElement>(null);
  const resultImageRef = useRef<any>(null);

  const handleTextChange = (event: any) => {
    setText((event.target.value as string).toLocaleUpperCase() ?? "");
  };
  const handleMemeTextFontFamilyChange = (event: any) => {
    setMemeTextFontFamily(event.target.value);
  };
  const handleMemeTextColorChange = (event: any) => {
    setMemeTextFontColor(event.target.value);
  };

  const handleTextDragEnd = (event: any) => {
    setTextPosition({
      x: event.target.x(),
      y: event.target.y(),
    });
  };

  const validateMemeText = () => {
    let error;
    if (!text) {
      error = "Meme Text is required";
    }
    return error;
  };

  return (
    <div>
      <Formik
        initialValues={{}}
        onSubmit={async (values: any, actions: any) => {
          actions.setSubmitting(true);
          if (resultImageRef.current) {
            const dataURL = resultImageRef.current.toDataURL();
            const link = document.createElement("a");
            link.download = `${text}.png`;
            link.href = dataURL;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
          actions.resetForm();
          actions.setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form id="custom-meme">
            <FormControl>
              <Box
                mx="auto"
                mt={{ base: "10vh", md: "5vh" }}
                px={{ base: "0vw", sm: "5rem", md: "initial" }}
                height={{
                  base: "350px",
                  sm: "400px",
                  md: "500px",
                  lg: "500px",
                }}
                width={{ base: "100%", sm: "100%", md: "400px", lg: "400px" }}
              >
                <Stage
                  id="custom-meme-img"
                  width={400}
                  height={500}
                  ref={resultImageRef}
                >
                  <Layer>
                    {image && <URLImage src={image} />}
                    <Text
                      fontFamily={memeTextFontFamily}
                      text={text}
                      x={textPosition.x}
                      y={textPosition.y}
                      draggable
                      onDragEnd={handleTextDragEnd}
                      fontSize={24}
                      letterSpacing={5}
                      fontStyle="bold"
                      fill={memeTextFontColor}
                    />
                  </Layer>
                </Stage>
              </Box>
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
                size={{ base: "sm", md: "lg" }}
                color="white"
                id="image"
                onChange={(event) => {
                  const file = event.target.files![0];
                  const reader = new FileReader();

                  reader.onload = () => {
                    setImage(reader.result as string);
                  };
                  reader.readAsDataURL(file);
                }}
                fontSize="1.3rem"
              />
            </FormControl>
            <Field name="memeText" validate={validateMemeText}>
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.memeText && form.touched.memeText}
                  className="roboto-flex-text"
                >
                  <FormLabel
                    fontSize="1.5rem"
                    color="white"
                    htmlFor="name"
                    textAlign={{ base: "center", lg: "left" }}
                  >
                    Meme Text
                  </FormLabel>
                  <Input
                    {...field}
                    size="lg"
                    color="white"
                    id="name"
                    placeholder="Enter your name"
                    fontSize="1.3rem"
                    value={text}
                    onChange={handleTextChange}
                    ref={inputRef}
                  />
                  <FormErrorMessage>{form.errors.memeText}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field>
              {({ field, form }: any) => (
                <Box display="flex" flexDir={{ base: "column", md: "row" }}>
                  <FormControl
                    isInvalid={form.errors.memeText && form.touched.memeText}
                    className="roboto-flex-text"
                  >
                    <FormLabel
                      fontSize="1.5rem"
                      color="white"
                      htmlFor="name"
                      textAlign={{ base: "center", lg: "left" }}
                    >
                      Font Family of Text
                    </FormLabel>
                    <Select
                      color="white"
                      onChange={handleMemeTextFontFamilyChange}
                      value={memeTextFontFamily}
                      sx={{
                        "& option": {
                          color: "black",
                        },
                      }}
                    >
                      <option
                        style={{ fontFamily: `"Roboto Flex", sans-serif` }}
                        value={`"Roboto Flex", sans-serif`}
                      >
                        Bunky
                      </option>
                      <option
                        style={{
                          fontFamily: `'Times New Roman', Times, serif`,
                        }}
                        value="'Times New Roman', Times, serif"
                      >
                        Times New Roman
                      </option>
                      <option
                        style={{
                          fontFamily: `'Courier New', Courier, monospace`,
                        }}
                        value="'Courier New', Courier, monospace"
                      >
                        Courier New
                      </option>
                      <option
                        style={{ fontFamily: `Verdana, Geneva, sans-serif` }}
                        value="Verdana, Geneva, sans-serif"
                      >
                        Verdana
                      </option>
                      <option
                        style={{ fontFamily: `Georgia, serif` }}
                        value="Georgia, serif"
                      >
                        Georgia
                      </option>
                      <option
                        style={{
                          fontFamily: `'Comic Sans MS', 'Comic Sans', cursive`,
                        }}
                        value="'Comic Sans MS', 'Comic Sans', cursive"
                      >
                        Comic Sans MS
                      </option>
                    </Select>
                  </FormControl>
                  <FormControl
                    isInvalid={form.errors.memeText && form.touched.memeText}
                    className="roboto-flex-text"
                  >
                    <FormLabel
                      fontSize="1.5rem"
                      color="white"
                      htmlFor="name"
                      textAlign={{ base: "center", lg: "left" }}
                    >
                      Font Color of Text
                    </FormLabel>
                    <Select
                      color="white"
                      onChange={handleMemeTextColorChange}
                      value={memeTextFontColor}
                      sx={{
                        "& option": {
                          color: "black",
                        },
                      }}
                    >
                      <option
                        style={{ color: "white", backgroundColor: "black" }}
                        value={"white"}
                      >
                        White
                      </option>
                      <option
                        style={{ color: "black", backgroundColor: "white" }}
                        value={"black"}
                      >
                        Black
                      </option>
                      <option
                        style={{ color: "blue", backgroundColor: "white" }}
                        value={"blue"}
                      >
                        Blue
                      </option>
                      <option
                        style={{ color: "red", backgroundColor: "white" }}
                        value={"red"}
                      >
                        Red
                      </option>
                      <option
                        style={{ color: "purple", backgroundColor: "white" }}
                        value={"purple"}
                      >
                        Purple
                      </option>
                      <option
                        style={{ color: "#F3CE04", backgroundColor: "white" }}
                        value={"#F3CE04"}
                      >
                        Bucky Gold
                      </option>
                      <option
                        style={{ color: "silver", backgroundColor: "white" }}
                        value={"silver"}
                      >
                        Silver
                      </option>
                    </Select>
                  </FormControl>
                </Box>
              )}
            </Field>
            <Button
              isLoading={isSubmitting}
              mt={4}
              className="roboto-flex-text"
              type="submit"
            >
              Download Your Meme
              <BsDownload />
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

const URLImage = ({ src }: { src: string }) => {
  const [image] = useImage(src);
  return <KonvaImage   width={400} height={400} image={image} />;
};

export default ImageEditor;
