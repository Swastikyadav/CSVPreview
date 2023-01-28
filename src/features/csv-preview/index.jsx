import React, { useState, useEffect } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Input, Upload, Button, Table, Empty, message } from "antd";
import styled from "styled-components";
import Papa from "papaparse";
import { useSelector, useDispatch } from 'react-redux';
import {
  setCSVData,
  selectCSVData,
  selectCSVHeads,
  clearCSVPreview,
} from "./csvPreviewSlice";

const BrowseSection = styled.section`
  margin: 40px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 400px;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    gap: 20px;
  }
`;

const Footer = styled.footer`
  margin-top: 40px;
`;

function CsvPreview() {
  const csvData = useSelector(selectCSVData);
  const csvHeads = useSelector(selectCSVHeads);
  const dispatch = useDispatch();

  const [messageApi, errorContextHolder] = message.useMessage();

  const [formula, setFormula] = useState("");
  const [formulaError, setFormulaError] = useState(false);

  const [formulaName, setFormulaName] = useState("");
  const [columnName, setColumnName] = useState("");
  const [newColumnName, setNewColumnName] = useState("");
  const [colValue, setColValue] = useState("");

  useEffect(() => {
    if (
      formula
      && !(formula.includes("SPLIT") || formula.includes("PADD"))
    ) {
      error();
    } else {
      const formulaArray = formula.split(",");
      setFormulaName(formulaArray[0]);
      setColumnName(formulaArray[1]);
      setNewColumnName(formulaArray[2]);
      setColValue(formulaArray[3]);
    }

    // eslint-disable-next-line
  }, [formulaError]);

  const columns = csvHeads.map((head) => {
    return {
      title: head,
      dataIndex: head,
      key: head,
    };
  });

  const formulaAppliedColumns = [...csvHeads, newColumnName].map((head, idx) => {
    if (head === newColumnName) {
      return {
        title: head,
        dataIndex: head,
        key: head,
        render: (_, colObj) => (
          <p
            style={{
              paddingLeft: formulaName === "PADD" ? `${colValue}px` : "",
            }}
          >
            {formulaName === "SPLIT"
              ? colObj[columnName].slice(0, colValue)
              : colObj[columnName]}
          </p>
        ),
      };
    }

    return {
      title: head,
      dataIndex: head,
      key: head,
    };
  });

  const formulaAppliedDataSource = csvData.map((data) => {
    return {
      ...data,
      [newColumnName]: "",
    };
  });

  const uploadProps = {
    name: "file",
    accept: ".csv",
    beforeUpload: (file) => {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        // Parse raw csv data into array data structure.
        const { data, meta: { fields } } = Papa.parse(e.target.result, { header: true });
        
        // Dispatch and set csv data in redux store
        dispatch(setCSVData({ data, fields }));
      };

      // Return false as we don't need to upload the csv file to server.
      return false;
    },
    onRemove: () => {
      setFormula("");
      setFormulaError(false);
      dispatch(clearCSVPreview());
    }
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'Please enter valid formula format!',
    });
  };

  return (
    <>
      {/* Floating error message */}
      {errorContextHolder}

      <h1>CSV TO JSON/CSV</h1>

      <BrowseSection>
        <Input
          size="large"
          placeholder="SPLIT,H_rid,Hrid_new,4"
          disabled={csvData.length ? false : true}
          value={formula}
          onChange={(e) => setFormula(e.target.value)}
          onBlur={(e) => setFormulaError((prevState) => !prevState)}
        />
        <Upload {...uploadProps}>
          <Button
            size="large"
            type="primary"
            icon={<UploadOutlined />}
          >
            Browse CSV Files
          </Button>
        </Upload>
      </BrowseSection>

      {
        csvData.length ? (
          <>
            <span>Original CSV Data</span>
            <Table
              columns={columns}
              dataSource={csvData}
              scroll={{ x: true }}
              // pagination={false}
            />

            {
              formulaName &&
              <>
                <span>Formula Applied CSV Data</span>
                <Table
                  columns={formulaAppliedColumns}
                  dataSource={formulaAppliedDataSource}
                  scroll={{ x: true }}
                  // pagination={false}
                />
              </>
            }
          </>
        ) : <Empty description="No CSV File Uploaded!" />
      }

      <Footer>
        Author:
        {" "}
        <a
          href="http://swastikyadav.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Swastik Yadav
        </a>
      </Footer>
    </>
  );
}

export default CsvPreview;