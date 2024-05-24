import SongReportHeading from './SongReportHeading';
import SongwriterAccount from './SongwriterAccount';
import SongTitle from './SongTitle';
import SongLyrics from './SongLyrics';
import GoToDeposit from './GoToDeposit';

import { Box, Card, CardBody, CardHeader, Center, Stack, StackDivider, TabPanel } from '@chakra-ui/react';

function EncryptPanel({ accountFormatted, title, lyrics, lyricsByLine, isEncrypted, songSignature, setIsEncrypted, setSongSignature }) {
  return (
    <Box>
      <Center>
        <TabPanel>
          <Center>
            <Card w={480}>
              <CardHeader>
                <SongReportHeading />
              </CardHeader>

              <CardBody>
                <Stack divider={<StackDivider />} spacing="0">
                  <SongwriterAccount accountFormatted={accountFormatted} />
                  <SongTitle title={title} />
                  <SongLyrics lyricsByLine={lyricsByLine} />
                  <GoToDeposit title={title} lyrics={lyrics} isEncrypted={isEncrypted} songSignature={songSignature} setIsEncrypted={setIsEncrypted} setSongSignature={setSongSignature} />
                </Stack>
              </CardBody>
            </Card>
          </Center>
        </TabPanel>
      </Center>
    </Box>
  );
}

export default EncryptPanel;
