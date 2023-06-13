import { Button, Space, Tag, Typography } from 'antd';
import FadeIn from 'react-lazyload-fadein';
import { MdLocationOn } from 'react-icons/md';

function SingleUser({
  style,
  rowRef,
  imageUrl,
  Fullname,
  directionName,
  Location,
  Summary,
  skills,
  website1,
  website2
}) {
  return (
    <div
      ref={rowRef}
      style={{ ...style }}
      className="single_user"
    >
      <div className="box">
        <div>
          <div className="image">
            <FadeIn height={280} once={true} throttle={0} offset={700}>
              {(onload) => (
                <img
                  src={imageUrl}
                  onLoad={onload}
                  alt=""
                />
              )}
            </FadeIn>
          </div>
          <div className="user-content">
            <h3>{Fullname}</h3>
            <p>{directionName}</p>
            <div className="location">
              <MdLocationOn style={{ width: 20, height: 20 }} />
              <span>{Location}</span>
            </div>
            <div className="paragraph">
              <Typography.Paragraph ellipsis={{ rows: 4, expandable: false }}>{Summary}</Typography.Paragraph>
            </div>
            <div className="skills">
              {skills?.map((skill) => (
                <Tag key={skill}>{skill}</Tag>
              ))}
            </div>
          </div>
        </div>
        <Space style={{ width: '100%', justifyContent: 'space-evenly' }} className="card-buttons">
          {!!website1 ? getLinkButton(website1) : null}

          {!!website2 ? getLinkButton(website2) : null}
        </Space>
      </div>
    </div>
  )
}

function getLinkButton(link) {
  if (!link) {
    return null;
  }
  let hostname = '';
  try {
    hostname = extractHostname(link);
  } catch (err) { }
  const title = buttonTitles[hostname] ? buttonTitles[hostname] : 'Website';
  const className = buttonClasses[hostname] ? buttonClasses[hostname] : '';
  return <Button size="large" block href={link} target="_blank" className={className}>{title}</Button>
}

function extractHostname(url) {
  let s = (new URL(url)).hostname;
  s = s.replace(/^www\./, '');

  var parts = s.split('.');

  while (parts.length > 3) {
    parts.shift();
  }

  if (parts.length === 3 && ((parts[1].length > 2 && parts[2].length > 2) || (secondTLDs.indexOf(parts[1]) === -1) && firstTLDs.indexOf(parts[2]) === -1)) {
    parts.shift();
  }

  return parts.join('.');
}

const buttonTitles = {
  'facebook.com': 'Facebook',
  'twitter.com': 'Twitter',
  'github.com': 'Github',
  'toptal.com': 'Toptal',
  'fiverr.com': 'Fiverr',
  'freelancer.com': 'Freelancer',
  'upwork.com': 'Upwork',
  'linkedin.com': 'LinkedIn',
  'instagram.com': 'Instagram',
}

const buttonClasses = {
  'facebook.com': 'facebook',
  'twitter.com': 'twitter',
  'github.com': 'github',
  'toptal.com': 'toptal',
  'fiverr.com': 'fiver',
  'freelancer.com': 'freelancer',
  'upwork.com': 'upwork',
  'linkedin.com': 'linkedin',
  'instagram.com': 'instagram',
}

export default SingleUser;