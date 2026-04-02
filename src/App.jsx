import { useState } from "react";
import Form from "./components/Form";
import Preview from "./components/Preview";

function App() {
  const [data, setData] = useState({});

  return (
    <div>
      <Form setData={setData} />
      <Preview data={data} />
    </div>
  );
}

export default App;