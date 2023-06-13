import { CaretDownOutlined, CaretUpOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { Button, Col, Row, Typography } from "antd";
import { useRef, useState } from "react";

function ChipsContainer({ children, title }) {
  const [expanded, setExpanded] = useState(false);
  const wrapperRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState('165px');
  function toggleExpanded() {
    setExpanded(!expanded);
    setMaxHeight(!expanded ? wrapperRef.current.clientHeight : '165px');
  }
  return (
    <div className="chips-container">
      <Typography.Title level={5} style={{ fontWeight: 'bold' }}>{title}</Typography.Title>
      <div className="chip-container-stack" style={{ maxHeight: maxHeight }}>
        <div ref={wrapperRef}>
          <Row gutter={[8, 16]}>
            {children}
          </Row>
        </div>
      </div>
      {wrapperRef.current?.clientHeight > 165 &&
        <Row>
          <Col span={24}>
            <Button size="large" className="dark-button" icon={expanded ? <CaretUpOutlined /> : <CaretDownOutlined />} block onClick={toggleExpanded}>მაჩვენე {expanded ? 'ნაკლები' : 'მეტი'}</Button>
          </Col>
        </Row>
      }
    </div>
  )
}

export default ChipsContainer;