insert into users ( uid , name , description , photos , profileurl , ref_point , geohash4) 
VALUES ('uid', 'name', 'description', '[]', 'photoURL',ST_MakePoint(0.0, 0.0)::GEOGRAPHY ,'fpp');