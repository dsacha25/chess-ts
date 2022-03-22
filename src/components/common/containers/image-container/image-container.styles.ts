import styled from "styled-components";
import { ImageContainerProps } from "./types";

export const Image = styled.div<ImageContainerProps>`
  width: ${({ width }) => (width ? width : "100%")};
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : "100%")};
  height: ${({ height }) => (height ? height : "100%")};
  background-image: ${({ url }) => url && `url(${url})`};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: ${({ radius }) => radius && radius};
  background-color: ${({ backgroundColor }) =>
    backgroundColor && backgroundColor};
  overflow: hidden;
  flex-shrink: 0;
`;
