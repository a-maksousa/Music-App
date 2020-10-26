import React from "react";
import { Input, Menu, Segment } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";

const TabsMenu = (props) => {
  return (
    <div>
      <Menu pointing>
        {props.tabs.map((tabName) => {
          return (
            <Menu.Item
              icon={<Icon disabled name={tabName.icon} />}
              name={tabName.name}
              active={props.activeItem === tabName.name}
              onClick={(e, { name }) => props.setActiveItem(name)}
            />
          );
        })}

        <Menu.Menu position="right">
          <Menu.Item>
            <Input
              transparent
              icon={{ name: "search", link: true }}
              placeholder="Search ..."
            />
          </Menu.Item>
        </Menu.Menu>
      </Menu>

      <Segment attached="bottom">{props.children}</Segment>
    </div>
  );
};

export default TabsMenu;
