import React from "react";
import { Input, Menu, Segment } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import { withRouter, useLocation } from "react-router-dom";

const TabsMenu = (props) => {
  const location = useLocation();
  const [activeItem, setActiveItem] = React.useState(location.pathname.replace(/\//g, ""));
  const handleMenuClick = (name, link) => {
    setActiveItem(name);
    props.history.push(link);
  };

  return (
    <div>
      <Menu pointing>
        {props.tabs.map((tabName) => {
          return (
            <Menu.Item
              icon={tabName.icon}
              name={tabName.name}
              active={activeItem === tabName.name}
              onClick={(e, { name }) => handleMenuClick(name, tabName.link)}
            />
          );
        })}

        <Menu.Menu position="right">
          <Menu.Item>
            <Input transparent icon={{ name: "search", link: true }} placeholder="Search ..." />
          </Menu.Item>
        </Menu.Menu>
      </Menu>

      <Segment attached="bottom">{props.children}</Segment>
    </div>
  );
};

export default withRouter(TabsMenu);
