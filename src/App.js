import React from 'react';
import { ChakraProvider, theme, Container, Flex } from '@chakra-ui/react';
import Searchbar from './components/searchbar';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Container maxW='container.xl' p={0} bg='whiteAlpha.100'>
        <Flex h='100vh'>
          <Searchbar />
        </Flex>
      </Container>
    </ChakraProvider>
  );
}

export default App;
