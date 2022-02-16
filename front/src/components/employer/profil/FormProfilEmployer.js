import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

import { useDispatch } from "react-redux";
import {
  getApiSiret,
  postFormProfilEmployer,
} from "store/actions/EmployerActions";
import NumberFormat from "react-number-format";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "50%",
  maxHeight: "50%",
});

//----------------------
// // Fonction pour formater les input siret siren et zipcode avec InputProps={{ inputComponent: NumberFormatCustom }}
const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;
  // console.log(props.name);

  let zipCodeFormat, siret, siren;
  if (props.name === "zipCode") zipCodeFormat = true;
  if (props.name === "siret") siret = true;
  if (props.name === "siren") siren = true;

  return (
    <div>
      {siret && (
        <NumberFormat
          {...other}
          getInputRef={ref}
          onValueChange={(zipCode) => {
            onChange({
              target: {
                name: props.name,
                value: zipCode.value,
              },
            });
          }}
          maxLength="14"
          isNumericString
        />
      )}

      {siren && (
        <NumberFormat
          {...other}
          getInputRef={ref}
          onValueChange={(zipCode) => {
            onChange({
              target: {
                name: props.name,
                value: zipCode.value,
              },
            });
          }}
          maxLength="9"
          isNumericString
        />
      )}

      {zipCodeFormat && (
        <NumberFormat
          {...other}
          getInputRef={ref}
          onValueChange={(zipCode) => {
            onChange({
              target: {
                name: props.name,
                value: zipCode.value,
              },
            });
          }}
          maxLength="5"
          isNumericString
        />
      )}
    </div>
  );
});
// //----------------------

// Fonction formulaire FormProfilEmployer
export default function FormProfilEmployer(props) {
  //declaration des constantes passées par les props
  const {
    dataProfilEmployer,
    dataApiSiret,
    profilNotEditabled,
    buttonProfilVisible,
  } = props;

  const dispatch = useDispatch();

  //constante pour mettre les input soit readOnly soit editable
  const inputProps = {
    readOnly: profilNotEditabled,
    disabled: profilNotEditabled,
  };

  // constante pour affiche les boutons si form editable
  const displayProps = buttonProfilVisible;
  let displayButton;

  if (displayProps === true) {
    displayButton = "";
  } else {
    displayButton = "none";
  }

  // Declaration des constantes pour le formulaire
  const [stateImgUpload, setStateImgUpload] = useState("");
  const [avatar, setAvatar] = useState("");
  const [name, setFactoryName] = useState("");
  const [siret, setSiret] = useState("");
  const [siren, setSiren] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [town, setTown] = useState("");
  const [category, setCategory] = useState("");

  // fonction set des useState
  const setUseState = () => {
    setStateImgUpload("")
    setAvatar(dataProfilEmployer.avatar);
    setSiret(dataProfilEmployer.siret);
    setSiren(dataProfilEmployer.siren);
    setFactoryName(dataProfilEmployer.name);
    setAddress(dataProfilEmployer.address);
    setZipCode(dataProfilEmployer.zipCode);
    setTown(dataProfilEmployer.town);
    setCategory(dataProfilEmployer.category);
  };

  // useEffect pour donner les datas par défault au form qui est à l'ecoute de l'etat du boton etidable dans parent
  useEffect(() => {
    // console.log("effect for useState form employer");
    setUseState();
  }, [profilNotEditabled]);

  // useEffect pour donner les datas par défault au form qui est à l'écoute du state du store dataProfilEmployer
  useEffect(() => {
    // console.log("effect for useState form employer");
    setUseState();
  }, [dataProfilEmployer]);


  // useEffect pour api Siret qui est à l'écoute du state du store dataApiSiret
  useEffect(() => {
    // console.log("use state dataApiSiret", dataApiSiret);
    //Condition si dataApiSiret n'est pas vide
    // si oui, on met les valeurs demmandées via l'API dans le formulaire
    if (dataApiSiret["id"]) {
      setSiren(dataApiSiret.siren);
      setFactoryName(dataApiSiret.unite_legale["denomination"]);
      setAddress(
        dataApiSiret.numero_voie +
        " " +
        dataApiSiret.type_voie +
        " " +
        dataApiSiret.libelle_voie
      );
      setZipCode(dataApiSiret.code_postal);
      setTown(dataApiSiret.libelle_commune);
      setCategory(dataApiSiret.unite_legale["categorie_entreprise"]);
    }
  }, [dataApiSiret]);

  // fonction get pour envoyer requete api pour saisie par n° de Siret
  const handleSendApiSiret = async (e) => {
    // console.log("Send Api Siret wait");
    //empeche le formunliare d'etre submiter
    // console.log("e", e)
    e.preventDefault();

    // console.log("N° de siret", siret);
    await dispatch(getApiSiret(siret));
  };

  // fonction pour la previsualisation de l'image
  const handleImageChange = (e) => {
    // console.log("fct changeImage");
    setStateImgUpload("Image non enregistrée");
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // fonction pour l'envoi du formulaire à la db
  const handleSendFormProfil = async (e) => {
    // console.log("Form waitsend");
    //empeche le formunliare d'etre submiter
    // console.log("e", e)
    e.preventDefault();

    if (!avatar) {
      setStateImgUpload("image obligatoire");
    } else {
      setStateImgUpload("");

      const dataFormProfilEmployer = {
        siret,
        siren,
        name,
        address,
        zipCode,
        town,
        category,
        avatar,
      };

      setStateImgUpload("");
      // console.log("dataFormProfilEmployer", dataFormProfilEmployer);
      await dispatch(postFormProfilEmployer(dataFormProfilEmployer));
    }
  };

  // fonction pour remettre formulaire par defaut (Cancel)
  const cancelFormProfil = () => {
    // console.log("Cancel upload", dataProfilEmployer);
    if (!dataProfilEmployer.avatar) {
      setStateImgUpload("image obligatoire");
    } else setStateImgUpload("");
    setUseState()
  };

  return (
    <Box component="form" onSubmit={(e) => handleSendFormProfil(e)}>
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
          width={"100%"}
          display={"flex"}
          justifyContent={{ xs: "center", md: "space-around" }}
          flexDirection={{ xs: "column", md: "row" }}
          alignItems={{ xs: "center", md: "none" }}
          marginBottom={2}
          >
            <Grid
              container
              rowSpacing={1}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12}>
                {avatar ? (<Img alt="imageEmployer" src={avatar} />) : (<Img />)} 
                {{ stateImgUpload } && (
                  <Typography color={"red"}>{stateImgUpload}</Typography>
                )}
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  component="label"
                  size="small"
                  sx={{ bgcolor: "#2B2E30", display: displayButton }}
                >
                  <Typography>Choisir une image</Typography>
                  <TextField
                    sx={{ display: "none" }}
                    size="small"
                    type="file"
                    inputProps={{ accept: 'image/*' }}
                    onChange={(e) => handleImageChange(e)}
                  />
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid item md={6} xs={12} sm={12}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Grid
              item
              xs={10}
              display={"flex"}
              flexDirection={{ xs: "column", md: "row" }}
              alignItems={"center"}  
            >
              <TextField
                required
                fullWidth
                label="N° de Siret:"
                variant="outlined"
                size="small"
                id="siret"
                value={siret || ""}
                name="siret"
                InputProps={{ inputComponent: NumberFormatCustom, inputProps }}
                onChange={(e) => {
                  setSiret(e.target.value);
                }}
              />

              <Button
                variant="contained"
                size="small"
                sx={{
                  bgcolor: "#DC143C",
                  color: "white",
                  ml: 1,
                  my: 1,
                  display: displayButton,
                  width: {sm: "140px", md:"160px"},
                  height: "40px",
                }}
                onClick={(e) => handleSendApiSiret(e)}
              >
                Saisie Auto.
              </Button>
            </Grid>

            <Grid item xs={10}>
              <TextField
                required
                label="N° de Siren:"
                variant="outlined"
                fullWidth
                size="small"
                name="siren"
                InputProps={{ inputComponent: NumberFormatCustom, inputProps }}
                value={siren || ""}
                onChange={(e) => setSiren(e.target.value)}
              />
            </Grid>

            <Grid item xs={10} >
              <TextField
                required
                label="Nom de l'entreprise:"
                fullWidth
                variant="outlined"
                size="small"
                value={name || ""}
                InputProps={{ inputProps }}
                onChange={(e) => setFactoryName((e.target.value).toUpperCase())}
              />
            </Grid>

            <Grid item xs={10}>
              <TextField
                required
                label="Adresse:"
                fullWidth
                variant="outlined"
                size="small"
                value={address || ""}
                InputProps={{ inputProps }}
                onChange={(e) => setAddress((e.target.value.toUpperCase()))}
              />
            </Grid>

            <Grid item xs={10}>
              <TextField
                required
                label="Code postal:"
                fullWidth
                variant="outlined"
                size="small"
                name="zipCode"
                value={zipCode || ""}
                InputProps={{ inputComponent: NumberFormatCustom, inputProps }}
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
                value={town || ""}
                InputProps={{ inputProps, }}
                onChange={(e) => setTown((e.target.value).toUpperCase())}
              />
            </Grid>

            <Grid item xs={10}>
              <TextField
                required
                label="Categorie:"
                fullWidth
                variant="outlined"
                size="small"
                value={category || ""}
                InputProps={{ inputProps }}
                onChange={(e) => setCategory((e.target.value).toUpperCase())}
              />
            </Grid>

            <Grid
              item
              xs={10}
              padding={1}
              display={"flex"}
              justifyContent={{xs: "center", md: "end"}}
            >
              <Button
                variant="contained"
                size="small"
                sx={{
                  bgcolor: "#DC143C",
                  color: "white",
                  m: 1,
                  display: displayButton,
                }}
                startIcon={<TaskAltIcon />}
                type="submit"
              >
                Valider
              </Button>

              <Button
                variant="contained"
                size="small"
                sx={{
                  bgcolor: "gray",
                  color: "white",
                  m: 1,
                  display: displayButton,
                }}
                startIcon={<HighlightOffIcon />}
                onClick={(e) => cancelFormProfil()}
              >
                Annuler
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}