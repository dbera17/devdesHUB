import React from 'react';
import MyPagination from '../components/pagination'
import Layout from '../components/Layout';
import { Layout as AntLayout } from 'antd';



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
