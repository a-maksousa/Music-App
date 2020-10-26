import React from "react";
import { Input, Menu, Segment } from "semantic-ui-react";
const TabsMenu = (props) => {
  return (
    <div>
      <Menu attached="top" tabular>
        {props.tabs.map((tabName) => {
          return (
            <Menu.Item
              name={tabName}
              active={props.activeItem === tabName}
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
