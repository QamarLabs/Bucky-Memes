"use client";
import { Box, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, Tooltip } from '@chakra-ui/react';
import { useContext } from 'react';

import { FormContext } from './FormContext';

const SizeSlider = () => {
  const { handleSizeImage, currentMinMax } = useContext(FormContext);

  return (
    <Box className="sliderFilter">
      <RangeSlider
        onChangeEnd={handleSizeImage}
        defaultValue={[0, 50]}
        min={0}
        max={100}
        step={1}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <RangeSliderThumb boxSize={8} index={0} />
        <RangeSliderThumb boxSize={8} index={1} />
        <Tooltip placement="top" hasArrow label={"test"}>
          <RangeSliderThumb boxSize={8} index={0}>
            <Box color="blue.600" as="span">{currentMinMax[0]}</Box>
          </RangeSliderThumb>
        </Tooltip>
        <Tooltip placement="top" hasArrow label={"test"}>
          <RangeSliderThumb boxSize={8} index={1}>
            <Box color="blue.600" as="span">{currentMinMax[1]}</Box>
          </RangeSliderThumb>
        </Tooltip>
      </RangeSlider>
    </Box>
  );
};

export default SizeSlider;
