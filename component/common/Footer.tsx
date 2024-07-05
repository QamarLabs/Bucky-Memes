import { Box, Flex, Image } from '@chakra-ui/react';

const FooterNote = () => (
    <div className="font-body text-xs" >
      <p>© 2024 $BUCKY.</p>
      <p>
        <span>Powered and secured by </span>
        <span>
          <a
            className="underline"
            href="https://www.linkedin.com/in/ali-alhaddad/"
            target="_blank"
            rel="noreferrer noopener"
          >
            Qamar Labs LLC
          </a>
        </span>
      </p>
    </div>
  );
  

const Footer = () => (
  <footer style={{ marginTop: 'auto', position: 'absolute', bottom: 0 }}>
    <Flex
    flexDirection="column"
    >
        <Image src="/images/Bucky-Footer-Banner.jpg" alt="Bucky is Here to Stay" width="100vw" height="auto" />
      <Box flex="1">
        <Box px={6} pr={{ sm: 0 }}>
        
          <Box mb={16} display={{ base: 'none', sm: 'block' }}>
            <FooterNote />
          </Box>
        </Box>
      </Box>
    </Flex>
  </footer>
);

export default Footer;
