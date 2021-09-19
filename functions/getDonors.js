const Geohash = require("ngeohash");

module.exports = function (db, lat, long, distance) {
  const geohash = Geohash.encode(lat, long);
  console.log(geohash);
  return db.getRows(
    /*sql */ `WITH q1 AS
                (
                    SELECT
                    name,
                    ST_Distance(ST_MakePoint($1, $2)::GEOGRAPHY, ref_point)::NUMERIC(9, 2) dist_m,
                    ST_Y(ref_point::GEOMETRY) lat,
                    ST_X(ref_point::GEOMETRY) lon,
                    
                    uid ,
                    description ,
                    photos ,
                    profileURL ,
                    key_value
                    FROM users
                    WHERE
                    SUBSTRING(geohash4 FOR 3) = SUBSTRING($3 FOR 3)
                ) SELECT * FROM q1
                  WHERE dist_m < $4
                  ORDER BY dist_m ASC
                  LIMIT 200
                    `,
    [lat, long, geohash, distance]
  );
};
