import React from "react";
import {
  Box,
  Container,
  Flex,
  Grid,
  Text,
  Title, 
} from "@mantine/core";
import {
  ITextandTextColumns,
  ReferenceBodyType,
} from "types/section";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import * as classes from "./textandtext.module.css";

interface CheckIconProps {
    size: number;
    color: string;
  }
const CheckIcon = ({size, color}: CheckIconProps) => {
  return <svg  xmlns="http://www.w3.org/2000/svg" style={{minWidth: size, marginTop: '4px'}} width={size} height={size}  viewBox="0 0 24 24"  fill={color}  className="icon icon-tabler icons-tabler-filled icon-tabler-circle-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" /></svg>
}
type TextAndTextColumnsProps = {
  data: ITextandTextColumns;
};

const renderColumn = (column: ReferenceBodyType) => {
  if (column.references && column.references.length > 0) {
    return column.references.map((item) => (
        <Flex gap={8} key={item.id} className={classes.listCheckIcon}>
            <CheckIcon size={28} color="#00827E" />
            <Text ff={"Raleway"} fz={24} fw={700} >{item.heading}</Text>
        </Flex>
    ));
  }

  return documentToReactComponents(JSON.parse(column.raw));
};

const TextAndTextColumns = ({ data }: TextAndTextColumnsProps) => {
  const { heading, subHeadingText, leftColumn, rightColumn, addBorder } = data;

  return (
    <Container className="container" size={"xl"}>
      {addBorder && <hr className={classes.hr} />}
      <Box mb={100}>
        <Title order={2} ta={"center"} mb={20}>
          {heading}
        </Title>
        <Text ta={"center"}>{subHeadingText}</Text>
      </Box>

      <Grid gutter={48}>
        <Grid.Col span={{base: 12, md: 6 }}>{renderColumn(leftColumn)}</Grid.Col>
        <Grid.Col span={{base: 12, md: 6 }}>{renderColumn(rightColumn)}</Grid.Col>
      </Grid>
    </Container>
  );
};

export default TextAndTextColumns;
