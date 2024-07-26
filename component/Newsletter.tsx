import { Box } from "@chakra-ui/react";
import dynamic from "next/dynamic";
const NewsletterComponent = dynamic(
  () => import("./common/NewsletterComponent"),
  { ssr: false }
);

const Newsletter = () => {
  return (
    <Box
      key="newsletterActivity"
      borderRadius="lg"
      boxShadow="md"
      display="inline-block"
      margin="5px"
      height="334px"
      width="300px"
      overflow="hidden"
      p="5"
      textAlign="left"
    >
      None of these activities tempt you? You can subscribe to our newsletter to
      be informed of our latest finds!
      <br />
      <br />
      <NewsletterComponent />
    </Box>
  );
};

export default Newsletter;
