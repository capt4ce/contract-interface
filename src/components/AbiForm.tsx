import type { Provider } from '@ethersproject/providers';
import type { Signer } from '@ethersproject/abstract-signer';
import { ethers } from 'ethers';
import { JsonFragment } from '@ethersproject/abi';
import { Field, Form, Formik, FormikValues } from 'formik';
import { useState } from 'react';
import { useWeb3 } from '../context/web3';
import { getContract } from '../helpers/contract';
import { Button, Label, TextInput } from 'flowbite-react';
import ButtonWithLoading from './ButtonWithLoading';
import { capitalizeFirstLetter } from '../helpers/string';

interface PropType {
  contractAddress: string;
  abis: ReadonlyArray<JsonFragment>;
  functionName: string;
  customSubmitButtonLabel?: string;
  initialValues?: FormikValues;
  disabledFields?: Record<string, boolean>;
  hideDisabledFields?: boolean;
  beforeSubmit?: (
    values: FormikValues,
    context?: { contractAddress: string; provider: Provider | Signer }
  ) => Promise<FormikValues>;
  afterSubmit?: (values: FormikValues, tx: any) => void | Promise<any>;
  additionalFields?: {
    name: string;
    fieldCustomization?: FieldCustomization;
  }[];
  fieldCustomizations?: Record<string, FieldCustomization>;
}

interface FieldCustomization {
  Component?: (props: any) => JSX.Element;
  label?: string;
}

const AbiForm = ({
  contractAddress,
  abis,
  functionName,
  initialValues = {},
  disabledFields = {},
  customSubmitButtonLabel,
  hideDisabledFields = true,
  beforeSubmit = (values) => Promise.resolve(values),
  afterSubmit = (values, tx) => {},
  additionalFields = [],
  fieldCustomizations,
}: PropType) => {
  const { provider } = useWeb3();

  const selectedAbi = abis.find(
    (abi) => abi.type === 'function' && abi.name === functionName
  );

  // to convert formik values to smart contract params
  const generateParams = (values: FormikValues) => {
    return selectedAbi?.inputs
      ? (selectedAbi?.inputs).map(({ name, type, components }) => {
          if (type !== 'tuple') return name ? values[name] || '' : '';

          const params: string[] = [];
          (components || []).forEach((component) => {
            const inputName = `${name}_${component.name}`;
            params.push(values[inputName]);
          });
          return params;
        })
      : [];
  };

  return !selectedAbi ? (
    <Label>functionName not found</Label>
  ) : (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, { resetForm }) => {
        try {
          const processedValues = await beforeSubmit(values, {
            contractAddress,
            provider,
          });

          const contract = getContract(
            abis,
            processedValues['newTxContractAddress'] || contractAddress,
            provider
          );

          const tx = await contract[functionName](
            ...generateParams(processedValues)
          );
          if (typeof tx?.wait === 'function') await tx.wait();
          await afterSubmit(values, tx);
        } catch (err) {
          alert(
            `error ${functionName}: ${
              (err as any)?.response?.data?.message || JSON.stringify(err)
            }`
          );
        }
      }}
    >
      {({ isSubmitting, resetForm }) => {
        let inputs = selectedAbi?.inputs || [];
        if (hideDisabledFields) {
          inputs = inputs.filter((input) => !disabledFields[input.name || '']);
        }

        return (
          <Form>
            {inputs.map(({ name, type, components }) =>
              type === 'tuple' &&
              Array.isArray(components) &&
              components.length > 0 ? (
                <>
                  {components.map((component) => {
                    const inputName = `${name}_${component.name}`;
                    return (
                      <AbiInput
                        name={inputName}
                        hide={hideDisabledFields && disabledFields[inputName]}
                        fieldCustomization={
                          fieldCustomizations?.[inputName || '']
                        }
                      />
                    );
                  })}
                </>
              ) : (
                <AbiInput
                  name={name || ''}
                  hide={hideDisabledFields && disabledFields[name || '']}
                  fieldCustomization={fieldCustomizations?.[name || '']}
                />
              )
            )}
            {additionalFields.map((additionalField) => (
              <AbiInput hide={false} {...additionalField} />
            ))}

            <div className="flex mt-3">
              {!!inputs.length && !!additionalFields.length && (
                <Button
                  onClick={() => {
                    resetForm(initialValues);
                  }}
                  color="light"
                  className="mr-1"
                >
                  Clear
                </Button>
              )}
              <ButtonWithLoading type="submit" isLoading={isSubmitting}>
                {customSubmitButtonLabel || capitalizeFirstLetter(functionName)}
              </ButtonWithLoading>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

const AbiInput = ({
  name,
  hide,
  fieldCustomization,
}: {
  name: string;
  hide: boolean;
  fieldCustomization?: FieldCustomization;
}) => {
  if (hide) return null;

  return (
    <div>
      <Label htmlFor={name} className={`font-semibold`}>
        {fieldCustomization?.label || name}
      </Label>
      <Field
        id={name}
        name={name}
        as={fieldCustomization?.Component || TextInput}
      />
    </div>
  );
};

export default AbiForm;
