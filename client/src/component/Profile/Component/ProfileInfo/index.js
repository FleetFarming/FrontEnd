// eslint-disable-next-line
import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { plainTabsStylesHook } from "@mui-treasury/styles/tabs";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";

import styled from "styled-components";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const GridContainer = styled.div`
  display: grid;
  grid-auto-columns: auto;
`;
const ChipContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  .chip {
    margin: 5px;
  }
`;

const ProfileInfo = () => {
  // const [tabIndex, setTabIndex] = React.useState("About");
  const [value, setValue] = React.useState("about");
  const tabsStyles = plainTabsStylesHook.useTabs();
  const tabItemStyles = plainTabsStylesHook.useTabItem();

  const handleChange = (event, newValue) => {
    console.log("newValue: ", newValue);
    setValue(newValue);
  };

  return (
    <div>
      <Tabs classes={tabsStyles} value={value} onChange={handleChange}>
        <Tab classes={tabItemStyles} value="about" label={"about"}></Tab>
        <Tab classes={tabItemStyles} value="gallery" label={"gallery"} />
        <Tab classes={tabItemStyles} value="farm" label={"farm"} />
      </Tabs>
      <TabPanel value={value} index="about">
        <GridContainer>
          <div>Anait's Awesome Farm</div>
          <div>Founded in June 2020</div>
          <Divider component="div" />
          <div>Background</div>
          <div>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and
            going through the cites of the word in classical literature,
            discovered the undoubtable source. Lorem Ipsum comes from sections
            1.10.32 and 1.10.33 of "de Finibus Bonorum
          </div>
          <Divider component="div" />
          <div>Available Crops</div>
          <ChipContainer>
            <Chip className="chip" size="small" label="Basic" />
            <Chip className="chip" size="small" label="Basic" />
            <Chip className="chip" size="small" label="Basic" />
            <Chip className="chip" size="small" label="Basic" />
            <Chip className="chip" size="small" label="Basic" />
            <Chip className="chip" size="small" label="Basic" />
            <Chip className="chip" size="small" label="Basic" />
          </ChipContainer>
          <Divider component="div" />
          <div>How to Contact</div>
        </GridContainer>
      </TabPanel>
      <TabPanel value={value} index="gallery">
        This is Gallery
      </TabPanel>
      <TabPanel value={value} index="farm">
        This is Farm
      </TabPanel>
    </div>
  );
};

export default ProfileInfo;
