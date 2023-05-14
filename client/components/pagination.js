import React from 'react';
import { Pagination } from 'antd';

const ITEMS_PER_PAGE = 9;

function MyPagination({totalItems, activePage, onPageChange}) {
  function handlePageChange(activePage) {
    onPageChange(activePage);
  }
  return (totalItems > ITEMS_PER_PAGE) && <Pagination
      style={{marginBottom: 16}}
      total={totalItems}
      current={activePage}
      pageSize={ITEMS_PER_PAGE}
      showSizeChanger={false}
      responsive={true}
      showTotal={false}
      onChange={handlePageChange}/>
}

export default MyPagination;