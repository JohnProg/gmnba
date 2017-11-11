const router = require("express").Router();

router.use("/teams", require("./teamsRouter"));
// export
module.exports = router;
