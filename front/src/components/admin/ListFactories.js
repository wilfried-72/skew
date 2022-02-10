// Les dernières offres publiées

/*------------MUI Imports-------------*/

import { styled } from "@mui/material/styles";
import { Card, Divider, List, Typography } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import { Icon } from "@iconify/react";
import { alpha } from "@mui/material/styles";
/*------------Styles-------------*/

// Style Card
const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter,
}));

// Style Icon
const IconWrapperStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
  marginBottom: theme.spacing(3),
  backgroundImage: `linear-gradient(135deg, ${alpha(
    theme.palette.primary.dark,
    0
  )} 0%, ${alpha(theme.palette.primary.dark, 0.24)} 100%)`,
}));

/*------------Export function-------------*/

export default function ListFactories(props) {
  const { listJobs } = props;
  const SliceJobs = listJobs.slice(0, 4);

  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon="mdi:offer" width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h4" component="div">
        Dernières offres ajoutées
      </Typography>
      {SliceJobs.map((job, index) => {
        // console.log("ListFactories", job);
        return (
          <List key={index} sx={{ width: "100%", maxWidth: 360 }}>
            <ListItem>
              <ListItemText
                disableTypography={false}
                inset={true}
                primary={job.title}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {job.type}
                    </Typography>
                    <Typography
                      sx={{ display: "inline", m: 1 }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {job.period}
                    </Typography>
                    <Divider />
                    {job.description}
                  </React.Fragment>
                }
              />
            </ListItem>
          </List>
        );
      })}
    </RootStyle>
  );
}
