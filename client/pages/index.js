import React from 'react';
import MyPagination from '../components/pagination'
import Layout from '../components/Layout';
import ChipsContainer from '../components/ChipsContainer'
import { Layout as AntLayout, Row, Col, Checkbox } from 'antd';



function Home({}) {
  const [activePage, setActivePage] = React.useState(1);

  const scrollToRef = (ref) => {
    ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };
  
  const mixitRef = React.useRef(null);
  const scrollToTop = () => scrollToRef(mixitRef);

  React.useEffect(() => {
    setActivePage(1);
  }, []);


  return (
    <Layout>
      <AntLayout.Content>
        <ChipsContainer title="გამოცდილება">
            {[{id: 1, name: 'ula'}, {id: 2, name: 'asd'}].map((experience) => (
              <Col key={experience.id}>
                <Checkbox
                  className="checkbox-chips"
                  onChange={(e) =>
                    onExperienceCheckChanged(experience.id, e.target.checked)
                  }
                >{experience.name}</Checkbox>
              </Col>
            ))}
          </ChipsContainer>
        <MyPagination
            totalItems={100}
            activePage={activePage}
            onPageChange={(page) => {
            setActivePage(page);
            scrollToTop();
            }}
        />
      </AntLayout.Content>
    </Layout>
  );
}

export default Home;
