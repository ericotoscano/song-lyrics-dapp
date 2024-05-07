import { Heading, Input, TabPanel, Text, Textarea } from '@chakra-ui/react';

function Write({ setTitle, setLyrics }) {
  return (
    <TabPanel>
      <Heading fontSize={30}>Title</Heading>
      <Input onChange={(e) => setTitle(e.target.value)} placeholder="Type title here..." color="black" mt={2} size="md" w="500px" textAlign="left" p={6} bgColor="white" fontSize={20} />

      <Heading fontSize={30}>Lyrics</Heading>
      <Textarea onChange={(e) => setLyrics(e.target.value)} placeholder="Type lyrics here..." color="black" mt={2} size="md" w="500px" h="200px" textAlign="left" p={6} bgColor="white" fontSize={20} />
    </TabPanel>
  );
}

export default Write;
