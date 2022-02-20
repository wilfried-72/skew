// import module connection de la base de données
const connection = require("../../config/ConnectionDB");

//Creation du Constructeur profilUser pour exporter les fonctions dans ce model model
const Offer = function (offer) {
  (this.user_id = Number(offer.user_id)),
    (this.title = String(offer.title)),
    (this.type = String(offer.type)),
    (this.period = Number(offer.period)),
    (this.description = String(offer.description)),
    (this.profil = String(offer.profil))
};

const StatutCandidate = function (statutCandidate) {
  this.user_id = Number(statutCandidate.user_id),
    this.offre_id = Number(statutCandidate.offre_id),
    this.statut = Number(statutCandidate.statut)
};

// Get Offer  
Offer.getOffer = function (result) {
  // console.log("Method delete Model User", user);
  connection.getConnection(function (error, conn) {
    conn.query(
      `SELECT offer_id, user_id, title,type,period,description,profil, createDate 
      FROM offre`,
      (error, data) => {
        if (error) throw error;
        else result(null, data);
        // console.log('data', data)
      }
    );
    conn.release();
  });
};

//create offer
Offer.createOffer = function (offerObj, result) {
  // //Declarations des constantes de profilUserCompagnyObj pour mysql
  const {
    user_id,
    title,
    type,
    period,
    description,
    profil
  } = offerObj;
  connection.getConnection(function (error, conn) {
    conn.query(
      `INSERT INTO offre SET
      user_id=:user_id,
      title=:title,
      type=:type,
      period=:period,
      description=:description,
      profil=:profil
        `,
      { user_id, title, type, period, description, profil },
      (error, data) => {
        if (error) throw error;
        // ici on fait un select de la table user par l'ID en gradant que les colonnes id, mail, date update et date create
        conn.query(
          `SELECT offer_id, user_id, title,type,period,description,profil, createDate 
         FROM offre WHERE user_id = :user_id`,
          { user_id },
          (error, data) => {
            if (error) throw error;
            result(null, data);
            // Mettre fin à la connexion avec la db pour eviter que les data ne soit plus rendues au bout de 10 requetes (definit ds les options)
          }
        );
        // Mettre fin à la connexion avec la db pour eviter que les data ne soit plus rendues au bout de 10 requetes (definit ds les options)
        conn.release();
      }
    );
  });
};

// Delete offer
Offer.deleteOffer = function (id, result) {
  // console.log("Method delete Model User", user);
  connection.getConnection(function (error, conn) {
    conn.query(
      ` DELETE FROM offre
      WHERE offer_id  =:id`, { id },
      (error, data) => {
        if (error) throw error;
        // ici on fait un select de la table user par l'ID en gradant que les colonnes id, mail, date update et date create
        conn.query(
          `SELECT offer_id, user_id, title,type,period,description,profil, createDate 
         FROM offre`,
          (error, data) => {
            if (error) throw error;
            result(null, data);
            // Mettre fin à la connexion avec la db pour eviter que les data ne soit plus rendues au bout de 10 requetes (definit ds les options)
          }
        );
        // Mettre fin à la connexion avec la db pour eviter que les data ne soit plus rendues au bout de 10 requetes (definit ds les options)
        conn.release();
      }
    );
  });
};

// update statut candidat
StatutCandidate.updateCandidate = function (statutCandidateObj, result) {
  const {
    offre_id,
    statut,
    user_id,
  } = statutCandidateObj;

  connection.getConnection(function (error, conn) {
    conn.query(
      `
      UPDATE postuled 
      SET  statut= :statut
      WHERE user_id = :user_id AND offre_id=:offre_id;
    `, { statut, user_id, offre_id },
      (error, data) => {
        if (error) throw error;
        conn.query(
          `SELECT offer_id, user_id, title,type,period,description,profil, createDate 
         FROM offre`,
          (error, data) => {
            if (error) throw error;
            result(null, data);
          }
        );
        conn.release();
      }
    );
  });
};

// Ce qui nous permettra de pouvoir l'utiliser sur d'autre page
module.exports = { Offer, StatutCandidate };
