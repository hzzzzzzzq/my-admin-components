import { Input, Select, Form, Checkbox, DatePicker, Button } from 'antd';

const { Item } = Form;
const { RangePicker, MonthPicker } = DatePicker;
const { Option } = Select;

const SearchBox = (props) => {
  const [form] = Form.useForm();

  const getInitailValue = () => {
    const { fields } = props;

    return fields;
  };
  const onFinish = (values) => {
    console.log(values, 'submit');
  };

  const onReset = () => {
    if (props.onReset) {
      props.onReset();
    } else {
      form.resetFields();
    }
  };
  const initFormList = () => {
    const { searchList } = props;
    const itemList = [];
    if (searchList && searchList.length > 0) {
      searchList.forEach((item) => {
        const { label, key, placeholder, options = [], width = '120px' } = item;
        let itemObj = null;
        switch (item.type) {
          case 'INPUT':
            itemObj = (
              <Item label={label} name={key} key={key}>
                <Input placeholder={placeholder} style={{ width }} />
              </Item>
            );
            break;
          case 'SELECT':
            itemObj = (
              <Item label={label} name={key} key={key}>
                <Select placeholder={placeholder} style={{ width }}>
                  {options &&
                    options.length > 0 &&
                    options.map((select) => {
                      return (
                        <Option value={select.id} key={select.id}>
                          {select.name}
                        </Option>
                      );
                    })}
                </Select>
              </Item>
            );

            break;
          case 'CHECKBOX':
            itemObj = (
              <Item name={key} valuePropName="checked" key={key}>
                <Checkbox>{label}</Checkbox>
              </Item>
            );
            break;
          case 'RANGEPICKER':
            itemObj = (
              <Item name={key} label={label} key={key}>
                <RangePicker />
              </Item>
            );
          default:
        }
        itemList.push(itemObj);
      });
    }
    return itemList;
  };
  return (
    <Form
      form={form}
      layout="inline"
      name="control-hooks"
      onFinish={onFinish}
      initialValues={getInitailValue()}
    >
      {initFormList()}
      <Item>
        <Button type="primary" htmlType="submit">
          search
        </Button>
      </Item>
      <Item>
        <Button type="default" htmlType="button" onClick={onReset}>
          reset
        </Button>
      </Item>
      {/* <Item>
          <Button type="">导出Excel</Button>
        </Item> */}
    </Form>
  );
};

export default SearchBox;
