import {
  Accordion,
  Button,
  Card,
  Label,
  Select,
  TextInput,
  Textarea,
} from 'flowbite-react';
import AbiForm from '../components/AbiForm';
import { useState } from 'react';
import axios from 'axios';
import { FormikValues } from 'formik';

const PageHome = () => {
  const [contractAddress, setContractAddress] = useState('');
  const [selectedAbiTemplate, setSelectedAbiTemplate] = useState('');
  const [abis, setAbis] = useState<Record<string, any>>([]);
  const [customAbi, setCustomAbi] = useState('');

  const handleResult = (values: FormikValues, tx: any) => {
    alert(JSON.stringify(tx));
  };

  const isCustomAbi = selectedAbiTemplate === 'custom';

  return (
    <div className="container mx-auto">
      <div className="my-5 items-center">
        <Card className="mt-8 ">
          <div>
            <Label htmlFor="contractAddress" className={`font-semibold`}>
              Contract Address
            </Label>
            <TextInput
              id="contractAddress"
              name="contractAddress"
              onChange={(event) => {
                setContractAddress(event.target.value);
              }}
            />
          </div>
          <div>
            <Label htmlFor="templateAbi" className={`font-semibold`}>
              ABI template
            </Label>
            <Select
              id="templateAbi"
              name="templateAbi"
              onChange={async (event) => {
                const selectedTemplate = event.target.value;
                setSelectedAbiTemplate(event.target.value);
                if (selectedTemplate === 'custom') {
                  return;
                }

                const abis = await axios.get(
                  '/abis/' + selectedTemplate + '.json'
                );
                setAbis(abis?.data);
              }}
              value={selectedAbiTemplate}
            >
              <option selected disabled value="">
                -- select an abi template --
              </option>
              <option value="custom">Custom</option>
              <option value="erc20">erc20</option>
              <option value="erc721">erc721</option>
              <option value="erc1155">erc1155</option>
              <option value="dopewarsController">dopewars:Controller</option>
              <option value="dopewarsSwapmeet">dopewars:Swapmeet</option>
              <option value="dopewarsHustler">dopewars:Hustler</option>
            </Select>
          </div>

          <div>
            <Label htmlFor="abi" className={`font-semibold`}>
              ABI
            </Label>
            <Textarea
              disabled={!isCustomAbi}
              id="abi"
              name="abi"
              onChange={(event) => {
                setCustomAbi(event.target.value);
              }}
              value={isCustomAbi ? customAbi : JSON.stringify(abis)}
            />
            {isCustomAbi && (
              <Button onClick={() => setAbis(JSON.parse(customAbi))}>
                Set ABIs
              </Button>
            )}
          </div>

          {Array.isArray(abis) && (
            <Accordion>
              {abis
                .map((abi) => {
                  return abi.type === 'function' ? (
                    <Accordion.Panel>
                      <Accordion.Title>
                        <Label>{abi.name}</Label>
                      </Accordion.Title>
                      <Accordion.Content>
                        <AbiForm
                          abis={abis}
                          contractAddress={contractAddress}
                          functionName={abi.name}
                          afterSubmit={handleResult}
                        />
                      </Accordion.Content>
                    </Accordion.Panel>
                  ) : null;
                })
                .filter(Boolean)}
            </Accordion>
          )}
          <hr />
        </Card>
      </div>
    </div>
  );
};

export default PageHome;
