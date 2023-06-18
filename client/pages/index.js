import React from 'react';
import ReactMixitup from 'react-mixitup';
import DsgnPagination from '../components/pagination';
import Layout from '../components/Layout';
import { Button, Layout as AntLayout, Row, Col, Checkbox, Drawer } from 'antd';
import ChipsContainer from '../components/ChipsContainer';
import SingleUser from '../components/SingleUser';
import { useMediaQuery } from '@react-hook/media-query'

const ITEMS_PER_PAGE = 9;

const Wrapper = React.forwardRef(({ children, style }, ref) => {
  return (
    <div
      style={{
        transition: 'height 0.5s ease',
        width: '100%',
        ...style,
      }}
      ref={ref}
    >
      {children}
    </div>
  );
});

const scrollToRef = (ref) => {
  ref.current.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
};

function Home({ people, directions, experienceList, employmentStatusList, skillsList }) {
  const isMobile = useMediaQuery('(max-width: 576px)');
  const [items, setItems] = React.useState(
    people.map((person) => person.id)
  );
  const [selectedDirections, setSelectedDirections] = React.useState({});
  const [selectedExperiences, setSelectedExperiences] = React.useState({});
  const [selectedEmploymentStatus, setSelectedEmploymentStatus] = React.useState({});
  const [selectedSkills, setSelectedSkills] = React.useState({});
  const [activePage, setActivePage] = React.useState(1);
  const [filterDrawerVisible, setFilterDrawerVisible] = React.useState(false);

  const mixitRef = React.useRef(null);
  const scrollToTop = () => scrollToRef(mixitRef);

  function onDirectionCheckChanged(directionId, checked) {
    setSelectedDirections({
      ...selectedDirections,
      [directionId]: checked,
    });
  }
  function onSkillCheckChanged(skill, checked) {
    setSelectedSkills({
      ...selectedSkills,
      [skill]: checked,
    });
  }
  function onExperienceCheckChanged(experienceId, checked) {
    setSelectedExperiences({
      ...selectedExperiences,
      [experienceId]: checked,
    });
  }
  function onEmploymentStatusCheckChanged(statusid, checked) {
    setSelectedEmploymentStatus({
      ...selectedEmploymentStatus,
      [statusid]: checked,
    });
  }

  React.useEffect(() => {
    setActivePage(1);
    let filteredIds = people;
    if (Object.values(selectedDirections).some((x) => x)) {
      filteredIds = filteredIds.filter(
        (person) => selectedDirections[person.direction?.id]
      );
    }
    if (Object.values(selectedExperiences).some((x) => x)) {
      filteredIds = filteredIds.filter(
        (person) => selectedExperiences[person.experience?.id]
      );
    }
    if (Object.values(selectedEmploymentStatus).some((x) => x)) {
      filteredIds = filteredIds.filter(
        (person) => selectedEmploymentStatus[person.employment_status?.id]
      );
    }
    if (Object.values(selectedSkills).some((x) => x)) {
      filteredIds = filteredIds.filter(
        (person) => person.skills.some(r => selectedSkills[r])
      );
    }
    filteredIds = filteredIds.map((person) => person.id);
    setItems(filteredIds);
  }, [selectedDirections, selectedExperiences, selectedEmploymentStatus, selectedSkills]);

  function renderCell({ key, style, ref }) {
    const person = people.find((person) => person.id === key);
    if (!person) {
      return null;
    }
    return <SingleUser
      key={person.id}
      style={style}
      rowRef={ref}
      imageUrl={`http://localhost:1337${person.Profilepicture?.formats?.small?.url ??
        person.Profilepicture?.url
        }`}
      Fullname={person.Fullname}
      directionName={person.direction?.Name}
      Location={person.Location}
      Summary={person.Summary}
      skills={person.skills}
      website1={person.website1}
      website2={person.website2}
    />
  }
  const renderCells = React.useCallback((items) => {
    return (
      <div>
        {items.map(({ key, ref, style }) => renderCell({ key, style, ref }))}
      </div>
    );
  });

  function paginateArray(array) {
    return array.slice(
      (activePage - 1) * ITEMS_PER_PAGE,
      activePage * ITEMS_PER_PAGE
    );
  }

  return (
    <Layout>
      <AntLayout.Content>
        <Drawer
          title="გაფილტვრა"
          placement="right"
          width={320}
          visible={filterDrawerVisible}
          onClose={() => setFilterDrawerVisible(false)}
          footer={
            <Button size="large" className="dark-button" block onClick={() => setFilterDrawerVisible(false)}>გაფილტვრა</Button>
          }>
          <ChipsContainer title="მიმართულება">
            {directions.map((direction) => (
              <Col key={direction.id}>
                <Checkbox
                  className="checkbox-chips"
                  onChange={(e) =>
                    onDirectionCheckChanged(direction.id, e.target.checked)
                  }
                >{direction.name}</Checkbox>
              </Col>
            ))}
          </ChipsContainer>
          <ChipsContainer title="შესაძლებლობები">
            {skillsList.map((skill) => (
              <Col key={skill.key}>
                <Checkbox
                  className="checkbox-chips"
                  onChange={(e) =>
                    onSkillCheckChanged(skill.key, e.target.checked)
                  }
                >{skill.text}</Checkbox>
              </Col>
            ))}
          </ChipsContainer>
          <ChipsContainer title="გამოცდილება">
            {experienceList.map((experience) => (
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
          <ChipsContainer title="დასაქმების სტატუსი">
            {employmentStatusList.map((status) => (
              <Col key={status.id}>
                <Checkbox
                  className="checkbox-chips"
                  onChange={(e) =>
                    onEmploymentStatusCheckChanged(status.id, e.target.checked)
                  }
                >{status.name}</Checkbox>
              </Col>
            ))}
          </ChipsContainer>
        </Drawer>
        <Row gutter={16}>
          <Col span={24} xl={6} md={7} style={{ marginBottom: 24 }}>
            {isMobile ?
              <Button size="large" className="dark-button" block onClick={() => setFilterDrawerVisible(true)}>ფილტრი</Button>
              :
              <>
                <ChipsContainer title="მიმართულება">
                  {directions.map((direction) => (
                    <Col key={direction.id}>
                      <Checkbox
                        className="checkbox-chips"
                        onChange={(e) =>
                          onDirectionCheckChanged(direction.id, e.target.checked)
                        }
                      >{direction.name}</Checkbox>
                    </Col>
                  ))}
                </ChipsContainer>
                <ChipsContainer title="შესაძლებლობები">
                  {skillsList.map((skill) => (
                    <Col key={skill.key}>
                      <Checkbox
                        className="checkbox-chips"
                        onChange={(e) =>
                          onSkillCheckChanged(skill.key, e.target.checked)
                        }
                      >{skill.text}</Checkbox>
                    </Col>
                  ))}
                </ChipsContainer>
                <ChipsContainer title="გამოცდილება">
                  {experienceList.map((experience) => (
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
                <ChipsContainer title="დასაქმების სტატუსი">
                  {employmentStatusList.map((status) => (
                    <Col key={status.id}>
                      <Checkbox
                        className="checkbox-chips"
                        onChange={(e) =>
                          onEmploymentStatusCheckChanged(status.id, e.target.checked)
                        }
                      >{status.name}</Checkbox>
                    </Col>
                  ))}
                </ChipsContainer>
              </>}
          </Col>
          <Col span={24} xl={18} md={17}>
            <Row>
              <Col style={{ width: '100%' }}>
                <ReactMixitup
                  renderCells={renderCells}
                  items={paginateArray(items)}
                  Wrapper={Wrapper}
                  ref={mixitRef}
                />
              </Col >
            </Row>
            <Row>
              <Col span={24} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <DsgnPagination
                  totalItems={items.length}
                  activePage={activePage}
                  onPageChange={(page) => {
                    setActivePage(page);
                    scrollToTop();
                  }}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </AntLayout.Content>
    </Layout>
  );
}

export async function getStaticProps(ctx) {
  // const res = await fetch('http://localhost:1337/api/developers');
  // let people = await res.json();
  let people = [];

  const directionsMap = {};
  const experiencesMap = {};
  const employmentStatusMap = {};
  const skillsMap = {};
  people.forEach(item => {
    if (!item.direction || directionsMap[item.direction.id]) {
      directionsMap[item.direction.id] += 1;
    } else {
      directionsMap[item.direction.id] = 1;
    }
    if (!item.experience || experiencesMap[item.experience.id]) {
      experiencesMap[item.experience.id] += 1;
    } else {
      experiencesMap[item.experience.id] = 1;
    }
    if (!item.employment_status || employmentStatusMap[item.employment_status.id]) {
      employmentStatusMap[item.employment_status.id] += 1;
    } else {
      employmentStatusMap[item.employment_status.id] = 1;
    }
    item.skills = (item.skills || '').split(';');
    item.skills.forEach(skill => {
      if (skillsMap[skill]) {
        skillsMap[skill] += 1;
      } else {
        skillsMap[skill] = 1;
      }
    })
  });
  const directions = people
    .map((item) => {
      if (item.direction && directionsMap[item.direction.id]) {
        const count = directionsMap[item.direction.id];
        directionsMap[item.direction.id] = null;
        return {
          id: item.direction.id,
          name: `${item.direction.Name} (${count})`,
          count: count
        };
      } else {
        return null;
      }
    })
    .filter((item) => item !== null)
    .sort((a, b) => b.count - a.count);
  const experienceList = people
    .map((item) => {
      if (item.experience && experiencesMap[item.experience.id]) {
        const count = experiencesMap[item.experience.id];
        experiencesMap[item.experience.id] = null;
        return {
          id: item.experience.id,
          name: `${item.experience.name} (${count})`,
          count: count
        };
      } else {
        return null;
      }
    })
    .filter((item) => item !== null)
    .sort((a, b) => b.count - a.count);

  const employmentStatusList = people
    .map((item) => {
      if (item.employment_status && employmentStatusMap[item.employment_status.id]) {
        const count = employmentStatusMap[item.employment_status.id];
        employmentStatusMap[item.employment_status.id] = null;
        return {
          id: item.employment_status.id,
          name: `${item.employment_status.name} (${count})`,
        };
      } else {
        return null;
      }
    })
    .filter((item) => item !== null)
    .sort((a, b) => b.count - a.count);

  const skillsList = Object.keys(skillsMap).map(skill => {
    return {
      key: skill,
      text: `${skill} (${skillsMap[skill]})`,
      count: skillsMap[skill]
    }
  }).sort((a, b) => b.count - a.count);
  function shuffle(array) {
    var copy = [],
      n = array.length,
      i;

    // While there remain elements to shuffle…
    while (n) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * array.length);

      // If not already shuffled, move it to the new array.
      if (i in array) {
        copy.push(array[i]);
        delete array[i];
        n--;
      }
    }

    return copy;
  }
  return {
    props: { people: shuffle(people), directions, experienceList, employmentStatusList, skillsList },
    revalidate: 60 * 15 // every 15 minutes
  };
}

export default Home;
