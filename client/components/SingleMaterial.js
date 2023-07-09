import React from 'react';
import { Card, Typography } from 'antd';
import PropTypes from 'prop-types';

const { Meta } = Card;

function SingleMaterial({ thumbnail, title, category, description, link }) {
  const handleClick = () => {
    if (link) {
      window.open(link, '_blank');
    } else {
      // Handle video opening logic here
    }
  };

  return (
    <Card
      hoverable
      cover={<img alt={title} src={thumbnail} />}
      onClick={handleClick}
    >
      <Meta title={title} description={category} />
      <Typography.Paragraph ellipsis={{ rows: 2 }}>{description}</Typography.Paragraph>
    </Card>
  );
}

SingleMaterial.propTypes = {
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string,
};

export default SingleMaterial;