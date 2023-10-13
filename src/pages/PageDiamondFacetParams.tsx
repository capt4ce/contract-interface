import { ethers } from 'ethers';
import {
  Button,
  Card,
  Label,
  Radio,
  Table,
  TextInput,
  Textarea,
} from 'flowbite-react';
import { TableBody } from 'flowbite-react/lib/esm/components/Table/TableBody';
import { TableHead } from 'flowbite-react/lib/esm/components/Table/TableHead';
import { useState } from 'react';
import { textEllipsis } from '../helpers/string';

const FUNCTION_ACTIONS = ['Add', 'Replace', 'Remove', 'Ignore'];

const PageDiamondFacetParams = () => {
  const [facetAddress, setFacetAddress] = useState('');
  const [facetAbi, setFacetAbi] = useState('');

  const [facetFunctions, setFacetFunctions] = useState<FunctionAction[]>([]);
  const [facetParams, setFacetParams] = useState<any[]>([]);

  const processFacet = () => {
    const facetFunctions = getFacetFunctions(JSON.parse(facetAbi) as any[]);
    setFacetFunctions(getFacetFunctions(JSON.parse(facetAbi) as any[]));
    setFacetParams(getDiamondCutParams(facetAddress, facetFunctions));
  };

  const handleActionRadioChange = (
    idx: number,
    fn: FunctionAction,
    action: any
  ) => {
    const newFacetFunctions = [...facetFunctions];
    newFacetFunctions[idx] = { ...fn, action };
    setFacetFunctions(newFacetFunctions);
    setFacetParams(getDiamondCutParams(facetAddress, newFacetFunctions));
  };
  return (
    <div className="container mx-auto">
      <Card className="mt-8">
        <h5 className="text-l font-bold tracking-tight text-gray-900 dark:text-white">
          Generate params for Diamond Cut facet
        </h5>
        <Label>Facet Address</Label>
        <TextInput
          value={facetAddress}
          onChange={(e) => setFacetAddress(e.target.value)}
        />
        <Label>Facet ABI</Label>
        <Textarea
          value={facetAbi}
          onChange={(e) => setFacetAbi(e.target.value)}
        />
        <Button onClick={processFacet}>Process</Button>
      </Card>

      <div className="grid grid-cols-2">
        <div>
          <Card>
            <Table>
              <TableHead>
                <th>Function Name</th>
                <th>Action</th>
              </TableHead>
              <TableBody>
                {facetFunctions.map((fn, idx) => (
                  <tr>
                    <td>{textEllipsis(fn.functionName, 25, 0)}</td>
                    <td>
                      <div>
                        {FUNCTION_ACTIONS.map((action) => (
                          <span>
                            <Radio
                              id={`${fn.functionName}-${action}`}
                              name={fn.functionName}
                              value={action}
                              checked={fn.action === action}
                              onChange={(e) =>
                                handleActionRadioChange(idx, fn, e.target.value)
                              }
                            />
                            <Label htmlFor={`${fn.functionName}-${action}`}>
                              {action}
                            </Label>
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
        <div>
          <Card>
            <pre>{JSON.stringify(facetParams, null, '\t')}</pre>
          </Card>
        </div>
      </div>
    </div>
  );
};

type FunctionAction = {
  functionName: string;
  functionSignature: string;
  action: 'Add' | 'Replace' | 'Remove' | 'Ignore';
};

const getFacetFunctions = (abi: any[]): FunctionAction[] => {
  const functionInterface = new ethers.utils.Interface(abi);
  return Object.keys(functionInterface.functions).map((fn) => {
    return {
      functionName: fn,
      functionSignature: functionInterface.getSighash(fn),
      action: 'Add',
    };
  });
};

const getDiamondCutParams = (
  contractAddress: string,
  functionActions: FunctionAction[]
) => {
  const functionsToAdd = [];
  const functionsToReplace = [];
  const functionsToRemove = [];
  for (let functionAction of functionActions) {
    switch (functionAction.action) {
      case 'Ignore':
        break;
      case 'Replace':
        functionsToReplace.push(functionAction);
        break;
      case 'Remove':
        functionsToRemove.push(functionAction);
        break;
      default:
        functionsToAdd.push(functionAction);
        break;
    }
  }

  const facets = [];
  if (functionsToAdd.length > 0) {
    facets.push([
      contractAddress,
      0,
      functionsToAdd.map((functionToAdd) => functionToAdd.functionSignature),
    ]);
  }
  if (functionsToReplace.length > 0) {
    facets.push([
      contractAddress,
      1,
      functionsToReplace.map(
        (functionToAdd) => functionToAdd.functionSignature
      ),
    ]);
  }
  if (functionsToRemove.length > 0) {
    facets.push([
      contractAddress,
      2,
      functionsToRemove.map((functionToAdd) => functionToAdd.functionSignature),
    ]);
  }

  return [facets, ethers.constants.AddressZero, '0x'];
};

export default PageDiamondFacetParams;
