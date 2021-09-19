WITH res AS (
    SELECT
        name,
        ST_Distance(
            ST_MakePoint(51.76628410000001, -2.2323242999999997) :: GEOGRAPHY,
            ref_point
        ) :: NUMERIC(9, 2) dist_m,
        ST_Y(ref_point :: GEOMETRY) lat,
        ST_X(ref_point :: GEOMETRY) lon,
        uid,
        description,
        photos,
        profileURL,
        key_value
    FROM
        users
    WHERE
        SUBSTRING(geohash4 FOR 3) = SUBSTRING('gcnqmpy2r' FOR 3)
)
SELECT
    name,
    dist_m,
    lat,
    lon
FROM
    res
WHERE
    dist_m < 50000
ORDER BY
    dist_m ASC
LIMIT
    200;