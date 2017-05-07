DROP TABLE IF EXISTS Notes CASCADE;

-- SCHEMA
CREATE TABLE Notes (

    -- General
    note_id SERIAL PRIMARY KEY,
    created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),

    -- Attributes
    document_id CHARACTER VARYING(255) NOT NULL REFERENCES Documents(document_id) ON UPDATE CASCADE ON DELETE CASCADE,
    note TEXT DEFAULT NULL

);
