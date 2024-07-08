import { Badge, Box } from "@chakra-ui/react";
import { useContext, useRef, useState } from "react";
import { FormContext } from "./FormContext";
import { SmallCloseIcon } from "@chakra-ui/icons";

interface FeaturesFilterProps {
  selectFeatures?: boolean;
  removeFeatures?: boolean;
}

const FeaturesFilter = ({
  selectFeatures,
  removeFeatures,
}: FeaturesFilterProps) => {
  const { features, queryFeatures, handleSelectFeature, handleRemoveFeature } =
    useContext(FormContext);
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const startDrag = (e: any, ref: any) => {
    setIsDragging(true);
    setStartX(e.pageX - ref.current.offsetLeft);
    setScrollLeft(ref.current.scrollLeft);
  };

  const doDrag = (e: any, ref: any) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - startX) * 2; // scroll-fast
    ref.current.scrollLeft = scrollLeft - walk;
  };

  const stopDrag = () => {
    setIsDragging(false);
  };

  if (selectFeatures)
    return (
      <Box
        display="flex"
        overflowX="auto"
        css={{
          "&::-webkit-scrollbar": { display: "none" },
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        }}
        whiteSpace="nowrap"
        mb="10px"
        ref={scrollRef}
        onMouseDown={(e) => startDrag(e, scrollRef)}
        onMouseMove={(e) => doDrag(e, scrollRef)}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
      >
        {features &&
          features.map((feature) => (
            <Badge
              cursor="pointer"
              variant={queryFeatures.includes(feature) ? "ghost" : "outline"}
              id={feature}
              key={feature}
              onClick={handleSelectFeature(feature)}
              mr="1"
              fontSize="1em"
              borderRadius="full"
              px="2"
              boxShadow="inset 0 0 0px 1px white"
              className="roboto-flex-text"
            >
              {feature}
            </Badge>
          ))}
      </Box>
    );

  if (removeFeatures)
    return (
      <Box
        display="flex"
        overflowX="auto"
        css={{
          "&::-webkit-scrollbar": { display: "none" },
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        }}
        whiteSpace="nowrap"
        ref={scrollRef}
        onMouseDown={(e) => startDrag(e, scrollRef)}
        onMouseMove={(e) => doDrag(e, scrollRef)}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
      >
        {queryFeatures &&
          queryFeatures.map((qFeature) => (
            <Badge
              cursor="pointer"
              variant={"solid"}
              id={qFeature}
              key={`${qFeature}-selected`}
              onClick={handleRemoveFeature(qFeature)}
              mr="1"
              fontSize="1em"
              borderRadius="full"
              px="2"
              boxShadow="inset 0 0 0px 1px #FFA500"
              className="roboto-flex-text"
              fontWeight="bold !important"
              // fontWeight="100"
            >
              {qFeature}
              <SmallCloseIcon />
            </Badge>
          ))}
      </Box>
    );

  return <div />;
};

export default FeaturesFilter;
