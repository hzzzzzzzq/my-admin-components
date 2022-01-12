import React, { useEffect } from "react";
import {
  Input,
  Select,
  Form,
  Checkbox,
  DatePicker,
  Switch,
  Button,
} from "antd";
import moment from "moment";

const { Item } = Form;
const { RangePicker, MonthPicker } = DatePicker;
const { Option } = Select;

const SearchBox = (props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    getInitailValue();
  });
  const getInitailValue = () => {
    // 默认数据处理
    const { fields, searchList } = props;
    if (fields) {
      searchList.forEach((item) => {
        switch (item.type) {
          case "DATE":
            form.setFieldsValue({ [item.key]: moment(fields[item.key]) });
            break;
          case "RANGEDATE":
            if (item.key.includes(",")) {
              const keyArr = item.key.split(",");
              if (fields[keyArr[0]] && fields[keyArr[1]]) {
                form.setFieldsValue({
                  [item.key]: [
                    moment(fields[keyArr[0]]),
                    moment(fields[keyArr[1]]),
                  ],
                });
              }
            }
            break;
          case "MONTH":
            if (fields[item.key]) {
              form.setFieldsValue({
                [item.key]: moment(fields[item.key], "YYYY-MM"),
              });
            }
            break;
          default:
            form.setFieldsValue({
              [item.key]: fields[item.key],
            });
            break;
        }
      });
    }
  };
  const onFinish = (values) => {
    // 提交
    props.searchSubmit(values);
  };

  const onReset = () => {
    // 重置
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
        const { label, key, placeholder, options = [], width = "120px" } = item;
        let itemObj = null;
        switch (item.type) {
          /**
           * name: 传入的 key 值，就是最后你传出时的值
           * label: 各个组件前面的名称
           * key: 给每一个 child 一个 key
           * placeholder: 输入提醒
           * options: select 选择项
           *    item: {
           *      id: '1', 传入/传出的值
           *      name: '选择器', 显示的值
           *    }
           *
           */
          case "INPUT":
            // 输入框
            itemObj = (
              <Item label={label} name={key} key={key}>
                <Input placeholder={placeholder} style={{ width }} />
              </Item>
            );
            break;
          case "SELECT":
            // 选择列表
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
          case "CHECKBOX":
            // 复选框
            itemObj = (
              <Item name={key} key={key} valuePropName="checked">
                <Checkbox>{label}</Checkbox>
              </Item>
            );
            break;
          case "SWITCH":
            // 开关
            itemObj = (
              <Item label={label} name={key} key={key} valuePropName="checked">
                <Switch />
              </Item>
            );
            break;
          case "DATE":
            // 时间选择
            itemObj = (
              <Item label={label} name={key} key={key}>
                <DatePicker />
              </Item>
            );
            break;
          case "RANGEDATE":
            // 时间范围选择
            itemObj = (
              <Item name={key} label={label} key={key}>
                <RangePicker />
              </Item>
            );
            break;
          case "MONTH":
            // 月份选择
            itemObj = (
              <Item name={key} label={label} key={key}>
                <MonthPicker />
              </Item>
            );
            break;

          default:
        }
        itemList.push(itemObj);
      });
    }
    return itemList;
  };
  return (
    <Form form={form} layout="inline" name="control-hooks" onFinish={onFinish}>
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
