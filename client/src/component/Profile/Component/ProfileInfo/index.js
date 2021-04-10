// eslint-disable-next-line
import React, { useEffect, useContext } from "react";
import { GlobalContext } from "../../../../context/GlobalState.js";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { plainTabsStylesHook } from "@mui-treasury/styles/tabs";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import CardMedia from "@material-ui/core/CardMedia";

import styled from "styled-components";
import { Card } from "@material-ui/core";

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
  const { profileData } = useContext(GlobalContext);
  const handleChange = (event, newValue) => {
    console.log("newValue: ", newValue);
    setValue(newValue);
  };
  const [dummyData, setDummyData] = React.useState([]);
  useEffect(() => {
    axios.get("https://picsum.photos/v2/list").then((res) => {
      console.log("res data: ", res.data);
      setDummyData(res.data.map((d) => ({ ...d })));
    });
  }, []);

  return (
    <div>
      <Tabs classes={tabsStyles} value={value} onChange={handleChange}>
        <Tab classes={tabItemStyles} value="about" label={"about"}></Tab>
        <Tab classes={tabItemStyles} value="gallery" label={"gallery"} />
        <Tab classes={tabItemStyles} value="farm" label={"farm"} />
      </Tabs>
      <TabPanel value={value} index="about">
        <GridContainer>
          <div>{profileData.profile_name}'s Farm</div>
          <div style={{ fontSize: "12px" }}>Founded in June 2020</div>
          <Divider style={{ margin: "15px 0px 15px 0px" }} component="div" />
          <div>Background</div>
          <div style={{ fontSize: "12px" }}>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and
            going through the cites of the word in classical literature,
            discovered the undoubtable source. Lorem Ipsum comes from sections
            1.10.32 and 1.10.33 of "de Finibus Bonorum
          </div>
          <Divider style={{ margin: "15px 0px 15px 0px" }} component="div" />
          <div>Available Crops</div>
          <ChipContainer style={{ margin: "15px 0px 15px 0px" }}>
            <Chip className="chip" size="small" label="Carrots" />
            <Chip className="chip" size="small" label="Tomatoes" />
            <Chip className="chip" size="small" label="Green Onions" />
            <Chip className="chip" size="small" label="Basils" />
            <Chip className="chip" size="small" label="Potatoes" />
            <Chip className="chip" size="small" label="Cabbage" />
          </ChipContainer>
          <Divider style={{ margin: "15px 0px 15px 0px" }} component="div" />
          <div>How to Contact</div>
          <div style={{ fontSize: "12px" }}>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
          </div>
        </GridContainer>
      </TabPanel>
      <TabPanel value={value} index="gallery" style={{ display: "flex" }}>
        <div style={{ display: "flex",flexWrap: "wrap" }}>
          {dummyData
            ? dummyData.map((d) => {
                return (
                  <div style={{ padding: "5px", flexDirection: "row" }}>
                    <img src={d.download_url} height={20} width={80} />
                  </div>
                );
              })
            : ""}
        </div>
      </TabPanel>
      <TabPanel value={value} index="farm">
        This is Farm
      </TabPanel>
    </div>
  );
};

export default ProfileInfo;
