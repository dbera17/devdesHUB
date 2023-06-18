import React from 'react';
import Layout from '../components/Layout';
import { Button, Layout as AntLayout, Col, Checkbox, Drawer } from 'antd';
import ChipsContainer from '../components/ChipsContainer';
import SingleUser from '../components/SingleUser';

function Home({ people, directions, experienceList, employmentStatusList, skillsList }) {
  const [selectedDirections, setSelectedDirections] = React.useState({});
  const [selectedExperiences, setSelectedExperiences] = React.useState({});
  const [selectedEmploymentStatus, setSelectedEmploymentStatus] = React.useState({});
  const [selectedSkills, setSelectedSkills] = React.useState({});
  const [filterDrawerVisible, setFilterDrawerVisible] = React.useState(false);

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
      imageUrl={`https://mystrapi.ge${person.Profilepicture?.formats?.small?.url ??
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
      </AntLayout.Content>
    </Layout>
  );
}

export async function getStaticProps(ctx) {
  const res = await fetch('https://mystrapi.ge/limit=-1&published=true');
  let people = await res.json();

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
  return {
    props: { people: people, directions, experienceList, employmentStatusList, skillsList },
    revalidate: 60 * 15 // every 15 minutes
  };
}

export default Home;
