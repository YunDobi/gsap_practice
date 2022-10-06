import {useEffect, useRef, forwardRef} from "react";
import "./App.css"
import gsap from "gsap"

const Box = forwardRef(({ children }, ref) => {
  return <div className="box" ref={ref}>{children}</div>;
});

function Container({ children }) {
  return <div><Box>Don't Animate Me</Box></div>;
}

function App() {
  const box1 = useRef();
  const box2 = useRef();
  
  useEffect(() => {
    const boxes = [
      box1.current,
      box2.current,
    ];
    
    const ctx = gsap.context(() => {
      // Target the two specific elements we have forwarded refs to
      gsap.to(boxes, {
        x: 100,
        repeat: -1,
        repeatDelay: 1,
        yoyo: true
      });
    });
    
    return () => ctx.revert();
  }, []);
  
  return (
    <div className="app">
      <Box ref={box1}>Box</Box>
      <Container></Container>
      <Box ref={box2}>Box</Box>
    </div>
  );
}
export default App