import React, { useEffect, useState, useRef } from "react";
import BodyContainer from "../BodyContainer/index.js";
import { Stage, Layer, Rect, Transformer } from "react-konva";
console.log("this is konva stage: ", Stage, useRef);

const FarmPage = () => {
  const containerRef = useRef();
  const stageRef = useRef();
  const toolRectRef = useRef();
  const transformerRef = useRef();

  const [containerSize, setContainerSize] = useState(1000);
  const [toolRectPos, setToolRectPos] = useState({ x: 20, y: 20 });
  const [totalShapes, setTotalShapes] = useState([]);
  const [selectedShape, setSelectedShape] = useState("");

  useEffect(() => {
    console.log("containerRef: ", containerRef);
    setContainerSize(containerRef.current.offsetWidth);
  }, []);

  useEffect(() => {
    let transformer = transformerRef.current;
    const curShape = stageRef.current.findOne(`.${selectedShape}`);
    console.log("curShape: ", curShape);
    if (curShape) {
      transformer.attachTo(curShape);
    } else {
      console.log("detach");
      transformer.detach();
    }
    transformer.getLayer().batchDraw();
  }, [selectedShape]);

  const handleStageClick = (e) => {
    console.log("e.name: ", e.target.name());
    setSelectedShape(e.target.name());
  };

  const onDragEnd = (shape) => {
    let newShape;
    if (shape === "rect") {
      newShape = {
        id: totalShapes.length + 1,
        name: `rect-${totalShapes.length + 1}`,
        x: toolRectRef.current.attrs.x,
        y: toolRectRef.current.attrs.y,
        width: 50,
        height: 50,
        fill: "green",
        draggable: true,
      };
    } else if (shape === "circle") {

    }


    var shapes = totalShapes.map((d) => ({ ...d }));
    shapes.push(newShape);
    setTotalShapes(shapes);

    // return toolRect to original pos
    toolRectRef.current.position(toolRectPos);
    stageRef.current.draw();
  };

  return (
    <BodyContainer>
      <div ref={containerRef}>
        <Stage
          width={containerSize}
          height={window.innerHeight}
          ref={stageRef}
          // name="stage"
          onClick={handleStageClick}
        >
          <Layer>
            <Rect
              // name="toolRect"
              x={toolRectPos.x}
              y={toolRectPos.y}
              width={50}
              height={50}
              fill="red"
              draggable={true}
              ref={toolRectRef}
              onDragEnd={() => {
                // create rect onDrag
                onDragEnd("rect");
              }}
            />
            {totalShapes.length > 0
              ? totalShapes.map((eachRect, i) => {
                  return (
                    <Rect
                      key={`rectKey-${i}`}
                      id={eachRect.id}
                      name={eachRect.name}
                      x={eachRect.x}
                      y={eachRect.y}
                      width={eachRect.width}
                      height={eachRect.height}
                      fill={eachRect.fill}
                      draggable={eachRect.draggable}
                    />
                  );
                })
              : null}
            <Transformer ref={transformerRef}></Transformer>
          </Layer>
        </Stage>
      </div>
    </BodyContainer>
  );
};

export default FarmPage;
