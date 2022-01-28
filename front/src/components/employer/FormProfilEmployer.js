import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

// import image en static mais à voir pour aller chercher l'image dans le back plus tard
import imageEmployer from "assets/images/imageEmployor.png";
import { useDispatch } from "react-redux";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "50%",
  maxHeight: "50%",
});

export default function FormProfilEmployer() {
  // const dispatch = useDispatch()

  const [imgUpload, setImgUpload] = useState(imageEmployer);
  const [stateImgUpload, setStateImgUpload] = useState("")
  const [siret, setSiret] = useState("1");
  const [siren, setSiren] = useState("2");
  const [name, setname] = useState("3");
  const [adress, setAdress] = useState("4");
  const [zipCode, setZipCode] = useState("5");
  const [town, setTown] = useState("6");
  const [category, setCategory] = useState("5");


  const handleImageChange = (e) => {
    // console.log("fct changeImage");

    setStateImgUpload("Image non enregistrée")

    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setImgUpload(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const cancelFormProfil = () => {
    // console.log("Cancel upload");
    setImgUpload(imageEmployer);
    setStateImgUpload("")
    setSiret("1");
    setSiren("2");
    setname("3");
    setAdress("4");
    setZipCode("5");
    setTown("6");
    setCategory("5");
  };

  const sendFormProfil = async (e) => {
    console.log("Form waitsend");
    //empeche le formunliare d'etre submiter
    // console.log("event", e)
    e.preventDefault();

    const dataFormProfilEmployer = {
      siret,
      siren,
      name,
      adress,
      zipCode,
      town,
      category,
      imgUpload,
    };

    setStateImgUpload("")

    console.log("dataFormProfilEmployer", dataFormProfilEmployer);

    // await dispatch(addPosts(dataFormProfilEmployer))
  };

  return (
    <Grid
      container
      rowSpacing={1}
      direction="row-reverse"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
    >
      <Grid item md={6} xs={12} sm={12}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: { xs: "center", md: "space-around" },
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "center", md: "none" },
          }}
        >
          <Grid
            container
            rowSpacing={1}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12}>
              <Img alt="imageEmployer" src={imgUpload} />
              {{stateImgUpload} && (<Typography color={"red"}>{stateImgUpload}</Typography>)}
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                component="label"
                size="small"
                sx={{ bgcolor: "#2B2E30" }}
              >
                <Typography>Choisir une image</Typography>
                <TextField
                  sx={{ display: "none" }}
                  required
                  size="small"
                  id="upload-photo"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e)}
                />
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>

      <Grid item md={6} xs={12} sm={12}>
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid
            item
            xs={10}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextField
              required
              label="N° de Siret:"
              variant="outlined"
              size="small"
              sx={{ width: { xs: "100%", sm: "50%" } }}
              value={siret}
              onChange={(e) => setSiret(e.target.value)}
            />

            <Button
              variant="contained"
              size="small"
              sx={{
                bgcolor: "#DC143C",
                color: "white",
                ml: 2,
                my: 1,
              }}
            >
              {" "}
              Saisie par N° SIRET
            </Button>
          </Grid>

          <Grid item xs={10}>
            <TextField
              required
              label="N° de Siren:"
              variant="outlined"
              fullWidth
              size="small"
              value={siren}
              onChange={(e) => setSiren(e.target.value)}
            />
          </Grid>

          <Grid item xs={10}>
            <TextField
              required
              label="Nom de l'entreprise:"
              fullWidth
              variant="outlined"
              size="small"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
          </Grid>

          <Grid item xs={10}>
            <TextField
              required
              label="Adresse:"
              fullWidth
              variant="outlined"
              size="small"
              value={adress}
              onChange={(e) => setAdress(e.target.value)}
            />
          </Grid>

          <Grid item xs={10}>
            <TextField
              required
              label="Code postal:"
              fullWidth
              variant="outlined"
              size="small"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </Grid>

          <Grid item xs={10}>
            <TextField
              required
              label="Commune:"
              fullWidth
              variant="outlined"
              size="small"
              value={town}
              onChange={(e) => setTown(e.target.value)}
            />
          </Grid>

          <Grid item xs={10}>
            <TextField
              required
              label="Categorie:"
              fullWidth
              variant="outlined"
              size="small"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Grid>

          <Grid
            item
            xs={10}
            sx={{
              p: 1,
              display: "flex",
              justifyContent: { xs: "center", md: "end" },
            }}
          >
            <Button
              variant="contained"
              size="small"
              sx={{ bgcolor: "#DC143C", color: "white", m: 1 }}
              type="submit"
              onClick={(e) => sendFormProfil(e)}
            >
              Valider
            </Button>

            <Button
              variant="contained"
              size="small"
              sx={{ bgcolor: "gray", color: "white", m: 1 }}
              onClick={(e) => cancelFormProfil()}
            >
              Annuler
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
