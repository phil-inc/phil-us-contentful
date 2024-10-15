import React from "react";
import {
  Grid,
  Box,
  Title,
  TextInput,
  Button,
  Text,
  Group,
  Stack,
  Radio,
  Textarea,
  NumberInput,
  SimpleGrid,
} from "@mantine/core";
import type { FormValues } from "contexts/ChannelComparisionContext";
import { ChannelComparisionContext } from "contexts/ChannelComparisionContext";
import { IconArrowLeft, IconCheck } from "@tabler/icons";
import {
  CHANNEL_COMPARISION_API,
  HUBSPOT_CHANNEL_COMPARISION_URL,
} from "constants/api";
import { useScrollIntoView } from "@mantine/hooks";

import * as classes from "./information.module.css";
import CStepper from "./CStepper";

const Information = () => {
  const { stepper, form } = React.useContext(ChannelComparisionContext);
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>();
  const url = CHANNEL_COMPARISION_API;
  const [loading, setLoading] = React.useState(false);
  const [hutk, setHutk] = React.useState<string>("");
  const [isSubmitError, setIsSubmitError] = React.useState(false);

  React.useEffect(() => {
    scrollIntoView({ alignment: "start" });

    const hutk = document.cookie.replace(
      /(?:(?:^|.*;\s*)hubspotutk\s*=\s*([^;]*).*$)|^.*$/,
      "$1",
    );

    setHutk(hutk);
  }, []);

  const onSubmit = async (values: FormValues) => {
    try {
      setLoading(true);
      setIsSubmitError(false);

      const hubspotData = {
        fields: [
          {
            objectTypeId: "0-1",
            name: "firstname",
            value: values.yourName,
          },
          { objectTypeId: "0-1", name: "jobtitle", value: values.title },
          { objectTypeId: "0-2", name: "name", value: values.company },
          { objectTypeId: "0-1", name: "email", value: values.email },
          { objectTypeId: "2-9880972", name: "drug_name", value: values.brand },
          { objectTypeId: "2-9880972", name: "wac", value: values.brandWAC },
          {
            objectTypeId: "2-9880972",
            name: "dosage__wac_comments",
            value: values.fillPerPatient,
          },
          {
            objectTypeId: "2-9880972",
            name: "percentage_of_dispenses_utilize_a_manufacturer_uncovered_coupon",
            value: values.percentDispense,
          },
          {
            objectTypeId: "2-9880972",
            name: "percentage_of_formulary_coverage",
            value: values.percentFormulatoryCoverage,
          },
          {
            objectTypeId: "2-9880972",
            name: "opay_amount_covered",
            value: values.copayAmountCovered,
          },
          {
            objectTypeId: "2-9880972",
            name: "opay_amount_uncovered",
            value: values.copayAmountUncovered,
          },
          {
            objectTypeId: "2-9880972",
            name: "copay_amount_cash",
            value: values.copayAmountCash,
          },
          {
            objectTypeId: "2-9880972",
            name: "what_is_your_primary_pharmacy_",
            value: values.primaryPharmacy,
          },
          {
            objectTypeId: "2-9880972",
            name: "additional_refill_notes",
            value: values.concerns,
          },
          { objectTypeId: "2-9880972", name: "cycle", value: values.cycle },
          {
            objectTypeId: "2-9880972",
            name: "drug_name",
            value: values.drug_name,
          },
        ],
        context: {
          ...(hutk.length && { hutk }),
          pageUri: "https://phil.us/channel-comparision/",
          pageName: "Channel Comparision Page",
        },
      };

      // Submit to hubspot
      const hubspotRes = fetch(HUBSPOT_CHANNEL_COMPARISION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(hubspotData),
      });

      // Submit to capi
      const capiRes = fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      await Promise.all([hubspotRes, capiRes]);
      stepper.nextStep();
    } catch (error: unknown) {
      console.log(error);
      setIsSubmitError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid.Col
      ref={targetRef}
      p={0}
      span={{ base: 12, lg: "auto" }}
      className={classes.contentGrid}
      order={{ base: 12, lg: 1, md: 1, sm: 1 }}
    >
      <Box className={classes.content}>
        <Button
          className={classes.backButton}
          pl={0}
          mb={32}
          variant="subtle"
          leftSection={<IconArrowLeft />}
          onClick={stepper.prevStep}
        >
          Go back to edit
        </Button>

        <CStepper />

        <form onSubmit={form.onSubmit(onSubmit)}>
          <Title order={2} size={28} mb={16}>
            Details
          </Title>
          <SimpleGrid
            cols={{ base: 1, sm: 2 }}
            verticalSpacing={1}
            spacing="xs"
          >
            <TextInput
              classNames={{
                root: classes.rootWrapper,
                wrapper: classes.inputWrapper,
                label: classes.inputLabel,
                required: classes.inputLabel,
              }}
              label="Your Name*"
              radius={0}
              required
              withAsterisk={false}
              mb={48}
              {...form.getInputProps("yourName")}
            />
            <TextInput
              classNames={{
                root: classes.rootWrapper,
                wrapper: classes.inputWrapper,
                label: classes.inputLabel,
                required: classes.inputLabel,
              }}
              label="Title*"
              radius={0}
              required
              withAsterisk={false}
              mb={48}
              {...form.getInputProps("title")}
            />
          </SimpleGrid>

          <SimpleGrid
            cols={{ base: 1, sm: 2 }}
            verticalSpacing={1}
            spacing="xs"
          >
            <TextInput
              classNames={{
                root: classes.rootWrapper,
                wrapper: classes.inputWrapper,
                label: classes.inputLabel,
                required: classes.inputLabel,
              }}
              label="Brand"
              radius={0}
              mb={48}
              {...form.getInputProps("brand")}
            />
            <TextInput
              classNames={{
                root: classes.rootWrapper,
                wrapper: classes.inputWrapper,
                label: classes.inputLabel,
                required: classes.inputLabel,
              }}
              label="Company*"
              radius={0}
              required
              withAsterisk={false}
              mb={48}
              {...form.getInputProps("company")}
            />
          </SimpleGrid>

          <Group justify="apart" grow gap={40}>
            <NumberInput
              classNames={{
                root: classes.rootWrapper,
                wrapper: classes.inputWrapper,
                label: classes.inputLabel,
                required: classes.inputLabel,
              }}
              required
              withAsterisk={false}
              label="What is your brand’s WAC*"
              min={0}
              radius={0}
              mb={48}
              {...form.getInputProps("brandWAC")}
            />
          </Group>

          <Group justify="apart" grow gap={40}>
            <NumberInput
              classNames={{
                root: classes.rootWrapper,
                wrapper: classes.inputWrapper,
                label: classes.inputLabel,
                required: classes.inputLabel,
              }}
              required
              withAsterisk={false}
              min={0}
              label="Average number of fills per patient*"
              radius={0}
              mb={48}
              {...form.getInputProps("fillPerPatient")}
            />
          </Group>

          <Group justify="apart" grow gap={40}>
            <NumberInput
              classNames={{
                root: classes.rootWrapper,
                wrapper: classes.inputWrapper,
                label: classes.inputLabel,
                required: classes.inputLabel,
              }}
              required
              withAsterisk={false}
              label="Approximately what % of dispenses utilize an uncovered coupon? (put 0 if unknown):*"
              radius={0}
              max={100}
              min={0}
              mb={48}
              {...form.getInputProps("percentDispense")}
            />
          </Group>

          <Group justify="apart" grow gap={40}>
            <NumberInput
              classNames={{
                root: classes.rootWrapper,
                wrapper: classes.inputWrapper,
                label: classes.inputLabel,
                required: classes.inputLabel,
              }}
              max={100}
              min={0}
              label="Percentage of formulary coverage (approximate)?"
              radius={0}
              mb={48}
              {...form.getInputProps("percentFormulatoryCoverage")}
            />
          </Group>

          <Stack gap={0}>
            <Text size={"20px"} c="#525252">
              Manufacturer-sponsored copay offer ($)*
            </Text>
            <SimpleGrid
              cols={{ base: 1, sm: 3, xs: 1 }}
              verticalSpacing={{ base: 1 }}
              spacing="xs"
            >
              <NumberInput
                classNames={{
                  root: classes.rootWrapper,
                  wrapper: classes.inputWrapper,
                  label: classes.inputLabel,
                  required: classes.inputLabel,
                }}
                label="Covered*"
                required
                withAsterisk={false}
                radius={0}
                min={0}
                mb={48}
                {...form.getInputProps("copayAmountCovered")}
              />
              <NumberInput
                classNames={{
                  root: classes.rootWrapper,
                  wrapper: classes.inputWrapper,
                  label: classes.inputLabel,
                  required: classes.inputLabel,
                }}
                required
                withAsterisk={false}
                label="Uncovered*"
                min={0}
                radius={0}
                mb={48}
                {...form.getInputProps("copayAmountUncovered")}
              />
              <NumberInput
                classNames={{
                  root: classes.rootWrapper,
                  wrapper: classes.inputWrapper,
                  label: classes.inputLabel,
                  required: classes.inputLabel,
                }}
                required
                withAsterisk={false}
                label="Cash*"
                min={0}
                radius={0}
                mb={48}
                {...form.getInputProps("copayAmountCash")}
              />
            </SimpleGrid>
          </Stack>

          <Group justify="apart" grow gap={40} mb={20}>
            <Radio.Group
              classNames={{
                root: classes.radioGroup,
                label: classes.inputLabel,
                required: classes.inputLabel,
              }}
              name="primaryPharmacy"
              label="What is your primary pharmacy?*"
              withAsterisk={false}
              {...form.getInputProps("primaryPharmacy")}
            >
              <Group mt={8}>
                <Radio
                  classNames={{
                    radio: classes.radioButton,
                    icon: classes.radioIcon,
                    label: classes.radioLabel,
                  }}
                  required
                  icon={IconCheck as React.FC}
                  label="Retail"
                  value="Retail Pharmacy"
                />
                <Radio
                  classNames={{
                    radio: classes.radioButton,
                    icon: classes.radioIcon,
                    label: classes.radioLabel,
                  }}
                  required
                  icon={IconCheck as React.FC}
                  label="Specialty"
                  value="Specialty Pharmacy"
                />
                <Radio
                  classNames={{
                    radio: classes.radioButton,
                    icon: classes.radioIcon,
                    label: classes.radioLabel,
                  }}
                  required
                  icon={IconCheck as React.FC}
                  label="Digital"
                  value="Digital Pharmacy"
                />
              </Group>
            </Radio.Group>
          </Group>

          <Group justify="apart" grow gap={40}>
            <Textarea
              classNames={{
                root: classes.rootWrapper,
                wrapper: classes.inputWrapper,
                label: classes.inputLabel,
                required: classes.inputLabel,
              }}
              label="Current program concerns or pain points?"
              radius={0}
              mb={48}
              autosize
              minRows={2}
              maxRows={4}
              {...form.getInputProps("concerns")}
            />
          </Group>

          <Button
            variant="philDefault"
            type="submit"
            loading={loading}
            w={"auto"}
            mb={8}
          >
            Get my customized report
          </Button>
          {isSubmitError && (
            <Text size={"16px"} c="red">
              Error submitting form, please try again!
            </Text>
          )}
        </form>
        <Button
          className={classes.backButton}
          pl={0}
          mt={32}
          variant="subtle"
          leftSection={<IconArrowLeft />}
          onClick={stepper.prevStep}
        >
          Go back to edit
        </Button>
      </Box>
    </Grid.Col>
  );
};

export default Information;
