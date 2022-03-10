const { Offer, StatutCandidate } = require("../../models/employer/OfferModel");
const nodemailer = require("../../config/nodemailer");
const jwt = require("jsonwebtoken");
const checkValidContentToken = require("../../utils/checkValidContentToken");

class EmployerOfferControllers {
  //action GetDashboard by User id
  async getDashboard(req, res) {
    // console.log("GetDashboard Employeur");
    const decoded = jwt.decode(req.headers['authorization'], {complete: true})
    const id= decoded.payload.id
    // console.log("decoded", decoded)
    // console.log(
    //   "controller GetDashboard Employeur id ",
    //   req.headers.authorization
    // );
    // console.log("controller GetDashboard Employeur token id ",id);
    if (id) {
      try {
        //ici String est une coercion qui permet de typer la variable
        Offer.getDashboard(String(id), async (err, data) => {
          // console.log("data id res", data);
          //Si erreur alors affiche console log erreur et res.status
          if (err) {
            console.log("err", err),
              res.status(500).send({
                message: err.message || "Une erreur est survenue",
              });
            //sinon on envoi les datas retournées du model en format json (data ds controller= result ds model)
          } else {
            return res.json({
              method: req.method,
              status: "success",
              message: "info dashboard",
              dashboard: data,
              token:await checkValidContentToken.validContentToken(decoded.payload.mail)
            });
          }
        });
      } catch (error) {
        throw error;
      }
    } else res.json("Error Request");
  }

  //action GetOffer by User id
  async getOfferId(req, res) {
    // console.log("controller get Offer Employeur");
    const decoded = jwt.decode(req.headers['authorization'], {complete: true})
    const id= decoded.payload.id
    if (id) {
      try {
        //ici String est une coercion qui permet de typer la variable
        Offer.getOfferId(String(id), async (err, data) => {
          // console.log("dataid res", data);
          //Si erreur alors affiche console log erreur et res.status
          if (err) {
            console.log("err", err),
              res.status(500).send({
                message: err.message || "Une erreur est survenue",
              });
            //sinon on envoi les datas retournées du model en format json (data ds controller= result ds model)
          } else {
            return res.json({
              method: req.method,
              status: "success",
              message: "Mes offres",
              offers: data,
              token:await checkValidContentToken.validContentToken(decoded.payload.mail)
            });
          }
        });
      } catch (error) {
        throw error;
      }
    } else res.json("Error Request");
  }

  async createOffer(req, res) {
    // console.log("controller create offer Employeur");
    const decoded = jwt.decode(req.headers['authorization'], {complete: true})
    const id= decoded.payload.id
    if (id) {
      // console.log("post create offer", req.body);
      let offerObj = new Offer({
        ...req.body,
      });
      // console.log("post create offer profilUserObj ", offerObj);
      try {
        Offer.createOffer(offerObj, async (err, data) => {
          if (err) {
            console.log("err", err),
              res.status(500).send({
                message: err.message || "Une erreur est survenue",
              });
          } else {    
            return res.json({
              method: req.method,
              status: "success",
              message: "Votre offre a bien été publiée !",
              offers: data,
              token:await checkValidContentToken.validContentToken(decoded.payload.mail)
            });
          }
        });
      } catch (error) {
        throw error;
      }
    } else res.json("Error Request");

    // res.json({ message: "controller Create offer employer" });
  }

  async delOffer(req, res) {
    const decoded = jwt.decode(req.headers['authorization'], {complete: true})
    // console.log("controller del offer Employeur");
    try {
      //ici String est une coercion qui permet de typer la variable
      Offer.deleteOffer(String(req.params.id), async (err, data) => {
        // console.log("dataid res", data);
        //Si erreur alors affiche console log erreur et res.status
        if (err) {
          console.log("err", err),
            res.status(500).send({
              message: err.message || "Une erreur est survenue",
            });
          //sinon on envoi les datas retournées du model en format json (data ds controller= result ds model)
        } else {
          return res.json({
            method: req.method,
            status: "success",
            flash: "Del offer By Id !",
            message: "Votre offre a bien été supprimée !",
            offers: data,
            token:await checkValidContentToken.validContentToken(decoded.payload.mail)
          });
        }
      });
    } catch (error) {
      throw error;
    }
  }

  async updateCandidate(req, res) {
    // console.log("controller update statut Candidate", req.body,req.params.id);
    const decoded = jwt.decode(req.headers['authorization'], {complete: true})

    if (req.params.id && req.body.offer_id) {
      let isRetainLet;
      if (req.body.isRetain === true) isRetainLet = 1;
      if (req.body.isRetain === false) isRetainLet = 0;

      let statutCandidateObj = new StatutCandidate({
        user_id: req.params.id,
        offre_id: req.body.offer_id,
        statut: isRetainLet,
      });

      // console.log("controller update statut Candidate statutCandidateObj", statutCandidateObj);

      try {
        StatutCandidate.updateCandidate(statutCandidateObj, async (err, data) => {
          if (err) {
            console.log("err", err),
              res.status(500).send({
                message: err.message || "Une erreur est survenue",
              });
          } else {
            return res.json({
              method: req.method,
              status: "success",
              message: "Le status du candidat pour cette offre a été changé",
              offers: data,
              token:await checkValidContentToken.validContentToken(decoded.payload.mail)
            });
          }
        });
      } catch (error) {
        throw error;
      }
      // res.json({ message: "controller update user profil employer" });
    } else res.json("Error Request");
  }

  async createMessageCandidate(req, res) {
    // console.log("controller create message candidate", req.body)
    if (req.body.user_id) {
      nodemailer.SendEmailCandidate(req, res);
    } else res.json("Error Request");
  }

  // Plus utlisé dans l'application car getOffer All replace by getOffer id user
  // Utiliser pour test postman
  //action GetOffer All
  async getOffer(req, res) {
    // console.log("controller get Offer Employeur");

    try {
      //ici String est une coercion qui permet de typer la variable
      Offer.getOffer((err, data) => {
        // console.log("dataid res", data);
        //Si erreur alors affiche console log erreur et res.status
        if (err) {
          console.log("err", err),
            res.status(500).send({
              message: err.message || "Une erreur est survenue",
            });
          //sinon on envoi les datas retournées du model en format json (data ds controller= result ds model)
        } else {
          return res.json({
            method: req.method,
            status: "success",
            message: "Toutes les offres",
            offers: data,
          });
        }
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = EmployerOfferControllers;
