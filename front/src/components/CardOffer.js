import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

export default function CardOffer(props) {
  const { listOffer } = props;

  return (
    <Card
      sx={{
        width: 300,
        border: "2px solid",
        borderColor: "black",
        borderRadius: 1,
        mb: 1,
        mx: 1,
      }}
    >
      <CardActionArea>
        {listOffer.badgeEmployor && (
          <VerifiedUserIcon
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              width: "40px",
              height: "auto",
              zIndex: 20,
              color: "#16B84E",
            }}
          />
        )}
        <CardMedia
          component="img"
          height="140"
          image={listOffer.image}
          alt="imageEmployer"
        />
        <CardContent>
          <Typography
            gutterBottom
            component="div"
            sx={{
              textTransform: "uppercase",
              textAlign: "center",
              height: 60,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {listOffer.titleOffer}
          </Typography>
          <Typography
            gutterBottom
            component="div"
            sx={{
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            {listOffer.nameEmployor}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "center", mt: 1 }}
          >
            Publié il y {listOffer.dateOfferDays} jours
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
          <VisibilityIcon
            sx={{
              width: "35px",
              height: "35px",
              color: "black",
              opacity: "0.8",
            }}
          />
        </CardActions>
      </CardActionArea>
    </Card>
  );
}