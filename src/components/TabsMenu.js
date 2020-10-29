import React from "react";
import { Input, Menu, Segment } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import { withRouter, useLocation } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
const TabsMenu = (props) => {
  const location = useLocation();
  const [activeItem, setActiveItem] = React.useState(location.pathname.replace(/\//g, ""));
  const { handleSubmit, control } = useForm();

  const handleMenuClick = (name, link) => {
    setActiveItem(name);
    props.history.push(link);
  };
  const handleSearch = (data) => {
    alert(JSON.stringify(data));
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
            <form onSubmit={handleSubmit(handleSearch)}>
              <Controller as={<Input transparent placeholder="Search..." />} rules={{ required: true }} name="q" control={control} />
              <button className="fabutton">
                <Icon name="search" />
              </button>
            </form>
          </Menu.Item>
        </Menu.Menu>
      </Menu>

      <Segment attached="bottom">{props.children}</Segment>
    </div>
  );
};

export default withRouter(TabsMenu);
