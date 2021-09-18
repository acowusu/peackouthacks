const Geohash = require("ngeohash");

module.exports = function (
  db,
  { name, lat, long, uid, description, photos, profileurl }
) {
  const geohash = Geohash.encode(lat, long);

  db.getRows(
    /*sql */ `
    INSERT INTO users (   uid , name , description , photos , profileurl ,
                         , ref_point , geohash4)
                         VALUES ($1, $2, $3, $4, $5,ST_MakePoint($6, $7)::GEOGRAPHY ,$8)
    `,
    [uid, name, description, photos, profileurl, lat, long, geohash]
  );
};
