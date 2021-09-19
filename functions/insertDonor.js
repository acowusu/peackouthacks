const Geohash = require("ngeohash");

module.exports = function (
  db,
  { name, lat, lon, uid, description, photos, profileurl }
) {
  const geohash = Geohash.encode(lat, lon);

  return db.getRows(
    /*sql */ `
    insert into users ( uid , name , description , photos , profileurl , ref_point , geohash4) 
VALUES ($1, $2, $3, $4, $5,ST_MakePoint($6, $7)::GEOGRAPHY , SUBSTRING($8 FOR 3));
    `,
    [uid, name, description, { photos }, profileurl, lat, lon, geohash]
  );
};
