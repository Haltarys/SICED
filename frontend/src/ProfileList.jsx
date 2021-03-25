import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProfileList = ({ profiles }) => {
  return (
    <DropdownButton
      id="dropdown-basic-button"
      title="Select a profile"
      size="lg"
    >
      {profiles &&
        profiles.map((profile) => (
          <Dropdown.Item
            key={profile.name}
            as={Link}
            to={`./profiles/${profile.name}`}
          >
            {profile.name}
          </Dropdown.Item>
        ))}
    </DropdownButton>
    // <Card>
    //   <Card.Header>
    //     <Nav variant="tabs" fill>
    //       {profiles &&
    //         profiles.map((profile) => (
    //           <Nav.Item key={profile.name}>
    //             <Nav.Link as={Link} to={'/profiles/' + profile.name}>
    //               {profile.name}
    //             </Nav.Link>
    //           </Nav.Item>
    //         ))}
    //     </Nav>
    //   </Card.Header>
    //   <Card.Body>
    //     <Switch>
    //       <Route exact path={path}>
    //         <h3>Please select a topic.</h3>
    //       </Route>
    //       <Route path={`${path}/:topicId`}>topic found</Route>
    //     </Switch>
    //   </Card.Body>
    // </Card>
  );
};

export default ProfileList;
