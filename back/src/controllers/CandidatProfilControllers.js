// Import Model

// Import Module

require("dotenv").config();

class CandidatProfilControllers {
  async getProfil(req, res) {
    console.log("controller get Profil candidat");
    candidat({ message: "controller get profil candidat" });
  }

  async createProfil(req, res) {
    console.log("controller create Profil candidat");
    candidat({ message: "controller Create profil candidat" });
  }

  async updateProfil(req, res) {
    console.log("controller get Profil candidat");
    candidat({ message: "controller update profil candidat" });
  }





}

module.exports = candidatProfilControllers;
