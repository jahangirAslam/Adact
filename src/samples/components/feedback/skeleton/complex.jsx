import React, { useState } from "react";

import SyntaxHighlighter from "react-syntax-highlighter";
import { monoBlue } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { complex } from "./code.js";

import { Card, Row, Col, Skeleton, Button } from "antd";
import { RiCodeSSlashLine } from "react-icons/ri";

export default function ComplexSkeleton() {
  const [checkedCode, setCheckedCode] = useState(false);
  const [codeClass, setCodeClass] = useState(false);

  function toggleChecked() {
    setTimeout(() => setCodeClass(!codeClass), 100);
    setCheckedCode(!checkedCode);
  }

  return (
    <Card className="da-border-color-black-40">
      <Row>
        <Col className="da-mb-16" span={24}>
          <Row>
            <Col lg={12} span={20}>
              <h4>Complex combination</h4>
              <p className="da-mb-0 da-p1-body">
                Complex combination with avatar and multiple paragraphs.
              </p>
            </Col>

            <Col lg={12} span={4} className="da-text-right">
              <Button
                onClick={toggleChecked}
                type="text"
                icon={<RiCodeSSlashLine className="da-text-color-black-80" />}
              />
            </Col>
          </Row>
        </Col>

        <Col span={24}>
          <Skeleton avatar paragraph={{ rows: 4 }} />
        </Col>
      </Row>

      {checkedCode && (
        <SyntaxHighlighter
          language="javascript"
          className={`show-code da-mt-24 ${codeClass && "show-code-active"}`}
          style={monoBlue}
        >
          {complex}
        </SyntaxHighlighter>
      )}
    </Card>
  );
}