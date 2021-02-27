import React from 'react';
import { Helmet } from 'react-helmet';
const MetaData = (title, description, keywords) => {
  return (
    <Helmet>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

MetaData.defaultProps = {
  title: 'FYD',
  description: 'Business to consumer.',
  keywords: 'gadgets, electronics, toys',
};

export default MetaData;
