// eslint-disable-next-line
import React, { useRef, useEffect, useState } from "react";
import { Text } from "react-konva";
const EditableText = (props) => {
  const { name, text, x, y, stageRef } = props;
  const [editMode, setEditMode] = useState(false);
  const textRef = useRef();

  const handleOnTransform = (e) => {
    console.log("onTransform: ", e.target)
  }

  const handleDbClick = (e) => {
    console.log("e.name: ", e.target.name());

    setEditMode(true);
    let textNode = textRef.current;
    var textPosition = textNode.getAbsolutePosition();
    var stageBox = stageRef.current.container().getBoundingClientRect();
    var areaPosition = {
      x: stageBox.left + textPosition.x,
      y: stageBox.top + textPosition.y,
    };

    // create textarea and style it
    var input = document.createElement("input");
    console.log("textPosition: ", textNode, stageBox);

    document.body.appendChild(input);
    input.type = "text";
    input.value = textNode.text();
    input.style.position = "absolute";
    input.style.top = areaPosition.y + "px";
    input.style.left = areaPosition.x + "px";
    input.style.width = textNode.width();

    input.focus();
    input.addEventListener("keydown", function (e) {
      console.log("keydown: ", e);
      // hide on enter
      if (e.key === "Enter") {
        textNode.text(input.value);
        console.log("textNode: ", textNode)
        let layer = textNode.getLayer();
        layer.draw();
        document.body.removeChild(input);
      }
    });
  };
  return (
    <Text
      fontSize={14}
      ref={textRef}
      name={name}
      text={text}
      x={x}
      y={y}
      onTransform={handleOnTransform}
      onDblClick={handleDbClick}
    />
  );
};

export default EditableText;
