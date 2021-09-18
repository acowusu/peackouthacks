
-- Based on https://github.com/cockroachlabs-field/crdb-geo-tourist
DROP TABLE IF EXISTS users;
CREATE TABLE users
(
  id BIGSERIAL
  , uid TEXT
  , name TEXT
  , description TEXT
  , photos JSONB
  , profileURL TEXT
  , key_value TEXT[]
  , ref_point GEOGRAPHY
  , geohash4 TEXT -- First 4 characters of geohash, corresponding to a box of about +/- 20 km
  , CONSTRAINT "primary" PRIMARY KEY (geohash4 ASC, id ASC)
);
CREATE INDEX ON users USING GIN(ref_point);