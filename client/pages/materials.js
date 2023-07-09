import React, { useState } from 'react';
import { Row, Col, Pagination } from 'antd';
import SingleMaterial from '../components/SingleMaterial';

function Materials() {
  const [activePage, setActivePage] = useState(1);
  const [materialsData, setMaterialsData] = useState([]);
  const itemsPerPage = 10; // Number of items to display per page
  const totalItems = materialsData.length;
  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = materialsData.slice(startIndex, endIndex);

  useEffect(() => {
    Axios.get('http://localhost:1337/materials').then((data) => {
        setMaterialsData(data);
    })
  }, []);

  const handlePageChange = (page) => {
    setActivePage(page);
    scrollToTop();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <h1>Materials</h1>
      <Row>
        {currentItems.map((material, index) => (
          <Col span={12} key={index}>
            <SingleMaterial
              thumbnail={material.thumbnail}
              title={material.title}
              category={material.category}
              description={material.description}
              link={material.link}
            />
          </Col>
        ))}
      </Row>
      <Row>
        <Col span={24} style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
          <Pagination
            current={activePage}
            total={totalItems}
            pageSize={itemsPerPage}
            onChange={handlePageChange}
          />
        </Col>
      </Row>
    </div>
  );
}

export default Materials;