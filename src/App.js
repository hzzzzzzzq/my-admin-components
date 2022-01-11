import './App.css';

import SearchBox from './components/SearchBox/searchBox';

function App() {
  const searchList = [
    { key: 'input', label: 'input', type: 'INPUT', placeholder: '请输入姓名' },
    {
      key: 'select',
      label: 'select',
      type: 'SELECT',
      options: [{ id: 1, name: '选择1' }],
    },
    {
      key: 'checkBox',
      label: 'chechBox',
      type: 'CHECKBOX',
    },
    { key: 'RANGEPICKER', name: 'RANGEPICKER', type: 'RANGEPICKER' },
  ];
  const fields = {
    input: '1',
    select: 1,
    checkBox: true,
  };
  return (
    <div className="app">
      <SearchBox searchList={searchList} fields={fields}></SearchBox>
    </div>
  );
}

export default App;
