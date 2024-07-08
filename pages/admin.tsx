import { Box, Text } from "@chakra-ui/react";
import CreateMemeForm from "../component/common/CreateMemeForm";


export default function AdminPage() {
    return (
        <Box
            display="flex"
            flexDir='column'
            justifyContent='center'
            alignItems='center'
            height='80vh'
            color='white'
        >
            <Text fontSize='3rem' className='roboto-flex-text'>
            Admin Panel
            </Text>
            <CreateMemeForm 
            
            />
        </Box>
    );
}
