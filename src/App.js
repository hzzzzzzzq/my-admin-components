import "./App.css";

import SearchBox from "./components/SearchBox/searchBox";

function App() {
  const submit = (data) => {
    const obj = {};
    Object.entries(data).forEach(([k, v]) => {
      obj[k] = v;
    });
    console.log(obj);
  };
  const searchList = [
    { key: "input", label: "input", type: "INPUT", placeholder: "请输入姓名" },
    {
      key: "select",
      label: "select",
      type: "SELECT",
      options: [{ id: 1, name: "选择1" }],
    },
    {
      key: "checkBox",
      label: "chechBox",
      type: "CHECKBOX",
    },
    { key: "switch", label: "switch", type: "SWITCH" },
    {
      key: "firstTime,secondTime",
      label: "RangeTime",
      type: "RANGEDATE",
    },
    { key: "start,end", label: "RangeTime2", type: "RANGEDATE" },
    { key: "time", label: "Time", type: "DATE" },
    { key: "month", label: "Month", type: "MONTH" },
  ];
  const fields = {
    input: "1",
    select: 1,
    checkBox: true,
    firstTime: "2021-12-31",
    secondTime: "2022-12-20",
    month: "2022-11-10",
    time: "2021-10-10",
  };
  return (
    <div className="app">
      <SearchBox
        searchList={searchList}
        fields={fields}
        searchSubmit={submit}
      ></SearchBox>
    </div>
  );
}

export default App;
