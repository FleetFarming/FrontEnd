import React, { useEffect, useState, useRef } from "react";
import BodyContainer from "../BodyContainer/index.js";
import {
  Stage,
  Layer,
  Rect,
  Circle,
  Transformer,
  Group,
  Text,
} from "react-konva";
import EditableText from "./component/EditableText/index";
import "./style.css";

console.log("this is konva stage: ", Stage, useRef);

const toolBox = { width: 360, height: 50, padding: 30 };
const rectangle = { width: 70, height: 40, default: 50 };
const circle = { radius: 20, default: 50 };
const square = { width: 40, height: 40, default: 50 };

const FarmPage = () => {
  const containerRef = useRef();
  const stageRef = useRef();
  const toolRectRef = useRef();
  const toolCirRef = useRef();
  const toolSquareRef = useRef();
  const transformerRef = useRef();
  const deleteRef = useRef();

  const [containerSize, setContainerSize] = useState(1000);
  // will set dynamic x,y later
  const [toolBoxPos, setToolBoxPos] = useState({ x: 0, y: 0 });
  const [toolRectPos, setToolRectPos] = useState({ x: 0, y: 0 });
  const [toolCirPos, setToolCirPos] = useState({ x: 0, y: 0 });
  const [toolSquarePos, setToolSquarePos] = useState({ x: 0, y: 0 });
  const [totalShapes, setTotalShapes] = useState([]);
  const [selectedShape, setSelectedShape] = useState("");
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    let position = containerRef.current.getBoundingClientRect();
    let tx = position.width - 400 - toolBox.padding;
    let ty = 20;
    setContainerSize(position.width);
    setToolBoxPos({ x: tx, y: ty });
    setToolSquarePos({ x: tx + 10, y: ty + 5 });
    setToolCirPos({
      x: tx + square.width + circle.radius + 20,
      y: ty + circle.radius + 5,
    });
    setToolRectPos({
      x: tx + square.width + circle.radius * 2 + 30,
      y: ty + 5,
    });

    console.log("transformer.current: ", transformerRef.current.boundBoxFunc);
    // transformerRef.current.boundBoxFunc((oldBB, newBB) => {
    //   console.log("transformerREf: ", transformerRef.current)
    //   if (Math.abs(newBB.width) > 200) {
    //     return oldBB;
    //   }
    //   return newBB;
    // });
    console.log("containerRef: ", position);
  }, []);

  // useEffect(() => {
  //   let transformer = transformerRef.current;
  //   const curShape = stageRef.current.findOne(`.${selectedShape}`);
  //   console.log("curShape: ", curShape);
  //   if (curShape) {
  //     transformer.attachTo(curShape);
  //   } else {
  //     console.log("detach");
  //     transformer.detach();
  //   }
  //   transformer.getLayer().batchDraw();
  // }, [selectedShape]);

  const handleStageClick = (e) => {
    // console.log("e.name: ", e.target.name());
    // setSelectedShape(e.target.name());
    let transformer = transformerRef.current;
    if (e.target === stageRef.current) {
      setShowDelete(false);
      transformer.detach();
      transformer.getLayer().batchDraw();
      return;
    }

    const selectedShape = e.target;

    // const curShape = stageRef.current.findOne(`.${selectedShape}`);
    // const curShape = selectedShape.parent;
    const curShape = selectedShape;
    console.log("curShape: ", curShape);
    if (curShape) {
      transformer.attachTo(curShape);
    } else {
      console.log("detach");
      transformer.detach();
    }
    transformer.getLayer().batchDraw();

    setShowDelete(false);
  };
  const handleOnContextMenu = (e) => {
    e.evt.stopPropagation();
    e.evt.preventDefault();
    console.log("handleOnContextMenu: ", e.target.name(), totalShapes);
    if (e.target === stageRef.current) return;

    let currentShapeName = e.target.name();
    setShowDelete(true);
    console.log("deleteRef: ", deleteRef);
    let containerRect = stageRef.current.container().getBoundingClientRect();
    deleteRef.current.style.position = "absolute";
    deleteRef.current.style.top =
      containerRect.top + stageRef.current.getPointerPosition().y + "px";

    deleteRef.current.style.left =
      containerRect.left + stageRef.current.getPointerPosition().x + "px";

    deleteRef.current.addEventListener("click", (e) => {
      console.log("hello click");
      let newTotalShapes = totalShapes.filter((shape) => {
        return shape.props.name != currentShapeName;
      });
      // .map((shape, i) => {
      //   console.log("map shape: ", shape)
      //   shape.props.name = `square-${i}`
      //   shape.props.children[0].name = `square-${i}`
      //   shape.props.children[1].name = `squareTxt-${i}`
      //   return shape
      // });
      console.log(newTotalShapes);
      transformerRef.current.detach();
      transformerRef.current.getLayer().batchDraw();
      setTotalShapes(newTotalShapes);
      setShowDelete(false);
    });
  };
  const handleOnTransform = (e) => {
    console.log("T: ", e.target);
    console.log("GroupX", e.target.x(), e.target.y());

    let old_x = e.target.parent.children[1].setAttrs({
      // scaleX: e.target.scaleX(),
      // scaleX: e.target.scaleY(),
      rotation: e.target.rotation(),
      x: e.target.x(),
      y: e.target.y(),
    });
    let layer = e.target.parent.children[1].getLayer();
    layer.draw();
    console.log(" e.target.parent.children[1]: ", e.target.parent.children[1]);
    // e.target.parent.children[1].attrs.y = e.target.scaleY();
    // console.log("rectX", e.target.children[0].scaleX());
    // console.log("textX", e.target.children[1].scaleX());
  };
  const onDragEnd = (shape) => {
    let newShape;
    if (shape === "square") {
      console.log("inside square");
      newShape = (
        // <Layer name={`square-${totalShapes.length + 1}`}>
        <Group
          draggable={true}
          name={`square-${totalShapes.length + 1}`}
          key={`rectKey-${totalShapes.length + 1}`}
          id={totalShapes.length + 1}
          x={toolSquareRef.current.attrs.x}
          y={toolSquareRef.current.attrs.y}
          width={square.width + square.default}
          height={square.height + square.default}
        >
          <Rect
            name={`square-${totalShapes.length + 1}`}
            width={square.width + square.default}
            height={square.height + square.default}
            fill={"green"}
            onClick={handleStageClick}
            onTransform={handleOnTransform}
          />
          <EditableText
            name={`squareTxt-${totalShapes.length + 1}`}
            text="Enter Text"
            x={10}
            y={10}
            stageRef={stageRef}
          />
        </Group>
        // {/* </Layer> */}
      );
    } else if (shape === "circle") {
      newShape = (
        // <Layer name={`squareLayer-${totalShapes.length + 1}`}>
        <Group
          key={`rectKey-${totalShapes.length + 1}`}
          name={`square-${totalShapes.length + 1}`}
          id={totalShapes.length + 1}
          x={toolCirRef.current.attrs.x}
          y={toolCirRef.current.attrs.y}
          draggable={true}
        >
          <Circle
            name={`square-${totalShapes.length + 1}`}
            radius={circle.radius + circle.default}
            fill={"green"}
            onClick={handleStageClick}
            onTransform={handleOnTransform}
          />
          <EditableText
            name={`squareTxt-${totalShapes.length + 1}`}
            text="Enter Text"
            x={-15}
            y={-10}
            stageRef={stageRef}
          />
        </Group>
        // </Layer>
      );
    } else {
      newShape = (
        // <Layer name={`squareLayer-${totalShapes.length + 1}`}>
        <Group
          key={`rectKey-${totalShapes.length + 1}`}
          name={`square-${totalShapes.length + 1}`}
          id={totalShapes.length + 1}
          x={toolRectRef.current.attrs.x}
          y={toolRectRef.current.attrs.y}
          draggable={true}
        >
          <Rect
            name={`square-${totalShapes.length + 1}`}
            width={rectangle.width + rectangle.default}
            height={rectangle.height + rectangle.default}
            fill={"green"}
            onClick={handleStageClick}
            onTransform={handleOnTransform}
          />
          <EditableText
            name={`squareTxt-${totalShapes.length + 1}`}
            text="Enter Text"
            x={10}
            y={10}
            stageRef={stageRef}
          />
        </Group>
        // </Layer>
      );
    }

    var shapes = totalShapes.map((d) => ({ ...d }));
    shapes.push(newShape);
    setTotalShapes(shapes);

    // return toolRect to original pos
    console.log("toolRectPos: ", shapes);
    toolSquareRef.current.position(toolSquarePos);
    toolCirRef.current.position(toolCirPos);
    toolRectRef.current.position(toolRectPos);
    // stageRef.current.draw();
  };

  return (
    <BodyContainer>
      <div ref={containerRef}>
        <Stage
          width={containerSize}
          height={window.innerHeight}
          ref={stageRef}
          onContextMenu={handleOnContextMenu}
          // name="stage"
          onClick={handleStageClick}
        >
          <Layer style={{ border: "1px solid black" }} id={"layer"}>
            <Rect
              // name="toolRect"
              x={toolBoxPos.x}
              y={toolBoxPos.y}
              width={toolBox.width + toolBox.padding}
              height={toolBox.height}
              stroke={"black"}
              stroke={1}
              // ref={toolSquareRef}
              draggable={false}
            />

            <Rect
              // name="toolRect"
              x={toolSquarePos.x}
              y={toolSquarePos.y}
              width={square.width}
              height={square.height}
              fill="red"
              draggable={true}
              ref={toolSquareRef}
              onDragEnd={() => {
                // create rect onDrag
                onDragEnd("square");
              }}
            />
            <Circle
              x={toolCirPos.x}
              y={toolCirPos.y}
              radius={circle.radius}
              // width={50}
              // height={50}
              fill="red"
              draggable={true}
              ref={toolCirRef}
              onDragEnd={() => {
                // create rect onDrag
                onDragEnd("circle");
              }}
            />
            <Rect
              // name="toolRect"
              x={toolRectPos.x}
              y={toolRectPos.y}
              width={rectangle.width}
              height={rectangle.height}
              fill="red"
              draggable={true}
              ref={toolRectRef}
              onDragEnd={() => {
                // create rect onDrag
                onDragEnd("rect");
              }}
            />
            {totalShapes.length > 0 ? totalShapes : null}
            <Transformer ref={transformerRef}></Transformer>
          </Layer>
        </Stage>
        {showDelete ? (
          <button ref={deleteRef} className="delete-button">
            Delete
          </button>
        ) : (
          ""
        )}
      </div>
    </BodyContainer>
  );
};

export default FarmPage;
